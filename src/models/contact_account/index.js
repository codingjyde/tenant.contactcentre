import { Model } from "@vuex-orm/core";

import Contact from "../contact";
import Conversation from "../conversation";

export default class ContactAccount extends Model {
    static entity = "contact_accounts";

    static fields() { 
        const self = this;

        return {
            id: self.attr(null),
            organisationId: self.attr(null),
            contactId: self.attr(null),
            value: self.attr(null),
            isVerified: self.attr(null),
            type: self.attr(null),
            createdAt: self.attr(null),
            updatedAt: self.attr(null),    

            conversations: self.hasMany(Conversation, "contactAccountId"),    
            contact: self.belongsTo(Contact, "contactId")        
        }
    }

    get name () {
        const self = this;

        if(self.contact && self.contact.name) {
            return self.contact.name;
        }

        return self.value;
    }
}