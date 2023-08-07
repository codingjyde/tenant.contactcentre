import decode from "jwt-decode";
import { LocalStorage } from "quasar";

const ACCESS_TOKEN_KEY = "JQbVzC78DsAMMiqhUVx8";
const REFRESH_TOKEN_KEY = "ZvkH2E7ERpstpK87iUVu";

export default {
    namespaced: true,
    state: function() {
        return {
            accessToken: LocalStorage.has(ACCESS_TOKEN_KEY) ? LocalStorage.getItem(ACCESS_TOKEN_KEY) : null,
            refreshToken: LocalStorage.has(REFRESH_TOKEN_KEY) ? LocalStorage.getItem(REFRESH_TOKEN_KEY) : null,
        }
    },
    mutations: {
        login: function(state, { accessToken, refreshToken }) {
            state.accessToken = accessToken;
            LocalStorage.set(ACCESS_TOKEN_KEY, accessToken);

            state.refreshToken = refreshToken;
            LocalStorage.set(REFRESH_TOKEN_KEY, refreshToken);
        },
        logout: function(state) {
            state.accessToken = null;
            LocalStorage.remove(ACCESS_TOKEN_KEY);

            state.refreshToken = null;
            LocalStorage.remove(REFRESH_TOKEN_KEY);
        }
    },
    actions: {
        login: function(context, { accessToken, refreshToken }) {
            context.commit("login", { accessToken, refreshToken });
        },
        logout: function(context) {
            context.commit("logout");
        },
    },
    getters: {
        accessToken: function(state) {
            return state.accessToken;
        },
        accessTokenExpiryDate: function(state) {
            if(state.accessToken) {
                return decode(state.accessToken).exp * 1000;
            }

            return 0;
        },
        accessTokenExpired: function(state) {
            if(state.accessToken) {
                return (decode(state.accessToken).exp * 1000) < new Date().getTime();
            }

            return false;
        },
        refreshToken: function(state) {
            return state.refreshToken;
        },
        refreshTokenExpiryDate: function(state) {
            if(state.refreshToken) {
                return decode(state.refreshToken).exp * 1000;
            }

            return 0;
        },
        refreshTokenExpired: function(state) {
            if(state.refreshToken) {
                return (decode(state.refreshToken).exp * 1000) < new Date().getTime();
            }

            return false;
        },
        isLoggedIn: function(state) {
            return state.accessToken && state.refreshToken;
        },
        firstName: function(state) {
            if(state.accessToken) {
                return decode(state.accessToken).firstName;
            }

            return "";
        },
        middleName: function(state) {
            if(state.accessToken) {
                return decode(state.accessToken).middleName;
            }

            return "";
        },
        surname: function(state) {
            if(state.accessToken) {
                return decode(state.accessToken).surname;
            }

            return "";
        },
        emailAddress: function(state) {
            if(state.accessToken) {
                return decode(state.accessToken).emailAddress;
            }

            return "";
        },
        requiresPasswordChange: function(state) {
            if(state.accessToken) {
                return decode(state.accessToken).requiresPasswordChange;
            }

            return false;
        },
        userId: function(state) {
            if(state.accessToken) {
                return decode(state.accessToken).userId;
            }

            return false;
        },
        organisationId: function(state) {
            if(state.accessToken) {
                return decode(state.accessToken).organisationId;
            }

            return false;
        },
        organisationName: function(state) {
            if(state.accessToken) {
                return decode(state.accessToken).organisationName;
            }

            return false;
        },
    }
}