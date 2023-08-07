import { Model } from "@vuex-orm/core";

import WebChatSession from "../web_chat_session";

export default class WebChatAccount extends Model {
    static entity = "web_chat_accounts";

    static fields() { 
        const self = this;

        return {
            id: self.attr(null),
            organisationId: self.attr(null),
            name: self.attr(null),
            url: self.attr(null),
            clientId: self.attr(null),
            status: self.attr(null),
            createdAt: self.attr(null),
            updatedAt: self.attr(null),
            
            sessions: self.hasMany(WebChatSession, "accountId")
        }
    }
}