import { Model } from "@vuex-orm/core";

import Channel from "src/constants/channel";

import ChannelAccount from "../channel_account";
import ContactAccount from "../contact_account";
import ConversationItem from "../conversation_item";

export default class Conversation extends Model {
    static entity = "conversations";

    static fields() { 
        const self = this;

        return {
            id: self.attr(null),
            organisationId: self.attr(null),
            channelAccountId: self.attr(null),
            contactAccountId: self.attr(null),
            mergeId: self.attr(null),
            status: self.attr(null),
            createdAt: self.attr(null),
            updatedAt: self.attr(null),         
            
            channelAccount: self.belongsTo(ChannelAccount, "channelAccountId"),
            contactAccount: self.belongsTo(ContactAccount, "contactAccountId"),
            conversationItems: self.hasMany(ConversationItem, "conversationId"),
        }
    }

    get channelAccountValue () {
        const self = this;
        
        try {
            switch (self.channelAccount.type) {
                case Channel.EMAIL:
                    return self.channelAccount.data.address;
                case Channel.TELEPHONY:
                    return "";
                case Channel.WEB_CHAT:
                    return self.channelAccount.data.url;
            }    
        } catch (error) {
            console.log(error);
        }
    }

    get lastConversationItem () {
        const self = this;

        if(self.conversationItems && self.conversationItems.length > 0) {
            return self.conversationItems[self.conversationItems.length - 1];
        }

        return null;
    }

    get lastDateSent () {
        const self = this;

        if(self.lastConversationItem) {
            return self.lastConversationItem.dateSent;
        }

        return 0;
    }
}