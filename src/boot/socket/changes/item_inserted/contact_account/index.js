import ContactAccount from "src/models/contact_account";

export default function(x) {
    try {
        x.id = x._id;
        
        delete x._id;
        delete x.__v;

        if(x.organisation) {
            x.organisationId = x.organisation;
            delete x.organisation;
        }

        ContactAccount.insert({
            data : x
        });
    } catch (error) {
        console.log(error);
    }
} 