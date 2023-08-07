import ConversationStatus from "src/constants/conversation_status";
import SocketMessages from "src/constants/socket_messages";

import WebChatMessage from "src/models/web_chat_message";

import { api } from "src/boot/axios";

const init = async function({ socket, createdAt }) {
    socket.on(SocketMessages.WEB_CHAT_MESSAGE, async function(message){
        try {
            WebChatMessage.insert({
                data: message
            })    
        } catch (error) {
            console.log(error);
        }
    });

    try {
        const status = ConversationStatus.INITIALISED || ConversationStatus.ACCEPTED || ConversationStatus.IN_PROGRESS
            || ConversationStatus.ABANDONED_BY_CONTACT || ConversationStatus.ABANDONED_BY_AGENT;
        const config = {
            method: 'get',
            url: `/webchatmessages/${ status }/${ createdAt }`
        };

        const response = await api(config);

        const data = response.data.map(x => {
            return {
                id: x.id,
                sessionId: x.session.id,
                content: x.content,
                sender: x.sender,
                readReceipts: x.readReceipts,
                type: x.type,
                createdAt: x.createdAt,
                updatedAt: x.updatedAt,
            }
        });

        WebChatMessage.insert({
            data
        });

        return data;
    } catch (error) {
        console.log(error);
    }
} 

export default {
    init
}