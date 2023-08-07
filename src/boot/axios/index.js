import axios from 'axios';
import { boot } from 'quasar/wrappers';

axios.defaults.baseURL = process.env.SERVER_URL;
axios.defaults.headers = {
    "Content-Type": "application/json",
};

const api = axios.create();

export default boot(({ app, router, store }) => {
    api.interceptors.request.use(async function (config) {
        let accessToken = store.getters["security/accessToken"];
        let accessTokenExpired = store.getters["security/accessTokenExpired"];
        let refreshToken = store.getters["security/refreshToken"];
        let refreshTokenExpired = store.getters["security/refreshTokenExpired"];
        let userId = store.getters["security/userId"];

        // console.log("accessToken: ", accessToken);
        // console.log("accessTokenExpired: ", accessTokenExpired);
        // console.log("refreshToken: ", refreshToken);
        // console.log("refreshTokenExpired: ", refreshTokenExpired);
        // console.log("alpha");
        // if(accessTokenExpired) {
        //     if(refreshTokenExpired) {
        //         router.push("/login");
        //         return;
        //     } else {
        //         const response = await axios({
        //             url: `/refresh/${ userId }`,
        //             method: "post",
        //             data: {
        //                 token: refreshToken
        //             }
        //         });

        //         store.dispatch("security/login", response.data);
            
        //         accessToken = response.data.accessToken;
        //         refreshToken = response.data.refreshToken;
        //     }
        // }

        // console.log("beta");
        if(accessToken) {
            config.headers.authorization = `Bearer ${ accessToken }`;
        } else {
            delete config.headers.authorization;
        }
        
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    api.interceptors.response.use(function (response) {
        return response;
    }, async function (error) {
        const refreshToken = store.getters["security/refreshToken"];
        const refreshTokenExpired = store.getters["security/refreshTokenExpired"];
        const userId = store.getters["security/userId"];
        const refreshUrl = `${ process.env.SERVER_URL }/refresh/${ userId }`;

        const request = error.config;

        console.log(error.response.status);

        // if((error.response.status === 401) && (request.url === refreshUrl)) {
        //     return Promise.reject(error);
        // }

        if(((error.response.status === 401) || (error.response.status === 403)) && !request._retry) {
            request._retry = true;

            if(refreshTokenExpired || !refreshToken) {
                store.dispatch("security/logout");

                router.push("/login");

                return Promise.reject(error);
            }
            
            if(refreshToken) {
                const response = await axios({
                    url: refreshUrl,
                    method: "post",
                    data: {
                        token: refreshToken
                    }
                });
                
                if(response.status === 201) {
                    store.dispatch("security/login", response.data);

                    return axios(request);
                }
            }
        }

        return Promise.reject(error);
    });

    app.config.globalProperties.$api = api;
})

export { api }