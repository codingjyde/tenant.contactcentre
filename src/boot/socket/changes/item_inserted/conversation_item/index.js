import ConversationItem from "src/models/conversation_item";

export default function(x) {
    try {
        x.id = x._id;
        
        delete x._id;
        delete x.__v;

        if(x.organisation) {
            x.organisationId = x.organisation;
            delete x.organisation;
        }

        if(x.conversation) {
            x.conversationId = x.conversation;
            delete x.conversation;
        }

        ConversationItem.insert({
            data : x
        });
    } catch (error) {
        console.log(error);
    }
} 