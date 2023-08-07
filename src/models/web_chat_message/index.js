import { Model } from "@vuex-orm/core";

import WebChatSession from "../web_chat_session";

export default class WebChatMessage extends Model {
    static entity = "web_chat_messages";

    static fields() {
        const self = this;

        return {
            id: self.attr(null),
            sessionId: self.attr(null),
            content: self.attr(null),
            sender: self.attr(null),
            readReceipts: self.attr(null),
            type: self.attr(null),
            createdAt: self.attr(null),
            updatedAt: self.attr(null),
            

            session: self.belongsTo(WebChatSession, "sessionId"),
        }
    }

    get isRead() {
        return false;
    }
}