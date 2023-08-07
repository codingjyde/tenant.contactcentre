import { boot } from 'quasar/wrappers';
import SimpleVueValidator from 'simple-vue3-validator';

export default boot(({ app }) => {
  app.use(SimpleVueValidator);
  app.config.globalProperties.$validator = SimpleVueValidator.Validator;
})
