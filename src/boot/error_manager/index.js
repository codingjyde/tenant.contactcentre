import { Notify } from 'quasar';
import { boot } from 'quasar/wrappers';

export default boot(({ app, router }) => {
    app.config.globalProperties.$handle = function(error) {
        let message = "";

        if(error.response && error.response.data) {
            if(error.response.data.errors) {
                message += "Please review these errors:<br/>";
                message += "<ul>";

                for (const e of error.response.data.errors) {
                    message += `<li>${ e.param }: ${ e.msg }</li>`;        
                }                
                
                message += "</ul>";
            } else if(error.response.data.message) {
                message = error.response.data.message;
            } else if(error.response.data.error) {
                message = error.response.data.error;
            } else {
                message = error.response.data;
            }
        } else if(error.message) {
            message = error.message;
        } 

        if(message === "jwt expired") {
            router.push("/login");
        } else {
            Notify.create({
                type: "negative",
                message,
                position: "center"
            });
        }
    }
});