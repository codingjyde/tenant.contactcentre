import { Model } from "@vuex-orm/core";

import Channel from "src/constants/channel";

import Conversation from "../conversation";
import WebChatSession from "../web_chat_session";

export default class ChannelAccount extends Model {
    static entity = "channel_accounts";

    static fields() { 
        const self = this;

        return {
            id: self.attr(null),
            organisationId: self.attr(null),
            name: self.attr(null),
            data: self.attr(null),
            type: self.attr(null),
            status: self.attr(null),
            createdAt: self.attr(null),
            updatedAt: self.attr(null),    
            
            conversations: self.hasMany(Conversation, "channelAccountId"),    
            sessions: self.hasMany(WebChatSession, "accountId")        
        }
    }

    get icon () {
        const self = this;

        switch (self.type) {
            case Channel.EMAIL:
                return "fa-solid fa-envelope";
            case Channel.WEB_CHAT:
                return "fa-solid fa-globe";
            case Channel.TELEPHONY:
                return "fa-solid fa-phone";
        }

        return "";
    }
}