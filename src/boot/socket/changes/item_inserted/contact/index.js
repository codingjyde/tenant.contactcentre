import Contact from "src/models/contact";

export default function(x) {
    try {
        x.id = x._id;
        
        delete x._id;
        delete x.__v;

        if(x.organisation) {
            x.organisationId = x.organisation;
            delete x.organisation;
        }

        Contact.insert({
            data : x
        });
    } catch (error) {
        console.log(error);
    }
} 