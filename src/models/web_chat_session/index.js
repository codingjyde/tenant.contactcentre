import { Model } from "@vuex-orm/core";

import ChannelAccount from "../channel_account";
import WebChatMessage from "../web_chat_message";

export default class WebChatSession extends Model {
    static entity = "web_chat_sessions";

    static fields() {
        const self = this;

        return {
            id: self.attr(null),
            channelAccountId: self.attr(null),
            members: self.attr([]),
            dateInitialised: self.attr(null),
            dateAccepted: self.attr(null),
            dateInProgress: self.attr(null),
            dateAbandoned: self.attr(null),
            dateClosed: self.attr(null),
            dateUpdated: self.attr(null),
            status: self.attr(null),
            createdAt: self.attr(null),
            updatedAt: self.attr(null),
            
            channelAccount: self.belongsTo(ChannelAccount, "channelAccountId"),
            messages: self.hasMany(WebChatMessage, "sessionId"),
        }
    }

    get lastMessage() {
        const self = this;

        if(self.messages) {
            if(self.messages.length > 0) {
                return self.messages[self.messages.length - 1];
            }
        }

        return "beta";
    }
}