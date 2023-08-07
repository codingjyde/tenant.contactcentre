import Conversation from "src/models/conversation";

export default function(x) {
    try {
        x.id = x._id;
        
        delete x._id;
        delete x.__v;

        if(x.organisation) {
            x.organisationId = x.organisation;
            delete x.organisation;
        }

        if(x.channelAccount) {
            x.channelAccountId = x.channelAccount;
            delete x.channelAccount;
        }

        if(x.contactAccount) {
            x.contactAccountId = x.contactAccount;
            delete x.contactAccount;
        }

        Conversation.insert({
            data : x
        });
    } catch (error) {
        console.log(error);
    }
} 