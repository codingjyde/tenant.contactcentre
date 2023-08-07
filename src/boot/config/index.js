import { boot } from 'quasar/wrappers';

export default boot(({ app }) => {
    app.config.globalProperties.$config = {
        APP_NAME: process.env.APP_NAME,
    }
});