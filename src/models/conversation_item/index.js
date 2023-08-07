import { Model } from "@vuex-orm/core";

import Conversation from "../conversation";

export default class ConversationItem extends Model {
    static entity = "conversation_items";

    static fields() { 
        const self = this;

        return {
            id: self.attr(null),
            organisationId: self.attr(null),
            conversationId: self.attr(null),
            sender: self.attr(null),
            text: self.attr(null),
            html: self.attr(null),
            mode: self.attr(null),
            type: self.attr(null),
            dateSent: self.attr(null),
            createdAt: self.attr(null),
            updatedAt: self.attr(null), 
            
            conversation: self.belongsTo(Conversation, "conversationId"),    
        }
    }
}