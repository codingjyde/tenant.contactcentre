import { boot } from 'quasar/wrappers';
import { io } from "socket.io-client";
import { reactive } from "vue";

import itemInserted from './changes/item_inserted';

let socket = null;

const state = reactive({
    connected: false
});

export default boot(async ({ app, router, store }) => {
    const accessToken = store.getters["security/accessToken"];
    
    if(!accessToken) {
        return;
    }

    socket = io(process.env.SERVER_URL, {
        autoConnect: false,
        auth: {
            token: accessToken
        }
    });

    socket.state = state;

    socket.on("connect", () => {
        state.connected = true;
    });

    socket.on("disconnect", () => {
        state.connected = false;
    });

    socket.on("connect_error", (error) => {
        console.log(error);
    });

    itemInserted(socket);

    socket.connect();

    app.config.globalProperties.$socket = socket;
});

export { socket };