import * as dayjs from 'dayjs';
import { uid } from 'quasar';
import { boot } from 'quasar/wrappers';

export default boot(({ app }) => {
    app.config.globalProperties.$formatDate = function(input) {
        const today = dayjs();
        const temp = dayjs(input);
        
        if(today.format("DD MMM YYYY") === temp.format("DD MMM YYYY")) {
            return temp.format("h:mm a");
        }
    
        if(today.format("YYYY") === temp.format("YYYY")) {
            return temp.format("DD MMM h:mm a");        
        }
        
        return temp.format("DD MMM YYYY h:mm a");
    }

    app.config.globalProperties.$getUUID = function() {
        try {
            return uid().replace(/-/g, "");
        } catch (error) {
            console.log(error);
        }
    }
})
