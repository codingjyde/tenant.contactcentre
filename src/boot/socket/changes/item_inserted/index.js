import SocketMessages from "src/constants/socket_messages";

import channelAccount from "./channel_account";
import contact from "./contact";
import contactAccount from "./contact_account";
import conversation from "./conversation";
import conversationItem from "./conversation_item";

export default function(socket) {
    try {
        socket.on(SocketMessages.ITEM_INSERTED, ({ collectionName, data, id }) => {
            console.log({ collectionName, data, id });

            switch (collectionName) {
                case "app_channel_accounts":
                    channelAccount(data);
                    break;
                case "app_contacts":
                    contact(data);
                    break;
                case "app_contact_accounts":
                    contactAccount(data);
                    break;
                case "app_conversations":
                    conversation(data);
                    break;
                case "app_conversation_items":
                    conversationItem(data);
                    break;
            }
        });
    } catch (error) {
        console.log(error);
    }
}