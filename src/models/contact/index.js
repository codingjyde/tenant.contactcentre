import { Model } from "@vuex-orm/core";

import Conversation from "../conversation";
import ContactAccount from "../contact_account";

export default class Contact extends Model {
    static entity = "contacts";

    static fields() { 
        const self = this;

        return {
            id: self.attr(null),
            organisationId: self.attr(null),
            title: self.attr(null),
            firstName: self.attr(null),
            middleName: self.attr(null),
            surname: self.attr(null),
            gender: self.attr(null),
            createdAt: self.attr(null),
            updatedAt: self.attr(null),
            
            contactAccounts: self.hasMany(ContactAccount, "contactId")
        }
    }

    get name () {
        const self = this;

        if(self.firstName && self.surname) {
            return `${ self.firstName } ${ surname }`;
        }

        if(self.firstName) {
            return self.firstName;
        }

        if(self.surname) {
            return self.surname;
        }


        return "";
    }
}