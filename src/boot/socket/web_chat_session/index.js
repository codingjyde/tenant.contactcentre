import ConversationStatus from "src/constants/conversation_status";
import SocketMessages from "src/constants/socket_messages";

import WebChatSession from "src/models/web_chat_session";

import { api } from "src/boot/axios";

const init = async function(socket) { 
    socket.on(SocketMessages.WEB_CHAT_SESSION, function(session){
        try {
            WebChatSession.insert({
                data: session
            })            
        } catch (error) {
            console.log(error);
        }
    })

    try {
        const status = ConversationStatus.INITIALISED || ConversationStatus.ACCEPTED || ConversationStatus.IN_PROGRESS
            || ConversationStatus.ABANDONED_BY_CONTACT || ConversationStatus.ABANDONED_BY_AGENT;
        const config = {
            method: 'get',
            url: `/webchatsessions/${ status }`,
            params: {
                page: 1,
                size: 2^32
            }
        };

        const response = await api(config);

        const data = response.data.items.map(x => {
            return {
                id: x.id,
                accountId: x.account,
                members: x.members,
                dateInitialised: x.dateInitialised,
                dateAccepted: x.dateAccepted,
                dateInProgress: x.dateInProgress,
                dateAbandoned: x.dateAbandoned,
                dateClosed: x.dateClosed,
                dateUpdated: x.dateUpdated,
                status: x.status,
                createdAt: x.createdAt,
                updatedAt: x.updatedAt,
            }
        });

        WebChatSession.insert({
            data
        });
    } catch (error) {
        console.log(error);
    }
} 

export default {
    init
}