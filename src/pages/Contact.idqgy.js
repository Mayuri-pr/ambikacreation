import { contacts } from 'wix-crm';
import { triggeredEmails } from 'wix-crm';

$w.onReady(function () {

    $w("#submit").onClick(() => {

        const contactInfo = {
            name: {
                first: $w("#fName").value,
                last: $w("#lName").value
            },
            emails: [{
            
            }]
        };

        contacts.appendOrCreateContact(contactInfo)
            .then((resolvedContact) => {
                if (resolvedContact) {
                    $w("#thanksText").show();
                    //send email to admin

               const MY_ID = "4d1eb054-a942-4c63-b6d0-a6238c5dd326"

triggeredEmails.emailMember('contactForm', MY_ID, {
  variables: {
        firstName: $w("#fName").value,
        lastName: $w("#lName").value,
        
  }
})

 .then(() => {
                            console.log("email sent")
                        })
                        .catch((err) => {
                            console.log("error", err)
                        })

                    //send email to contact
 triggeredEmails.emailContact('contactForm', resolvedContact.contactId, {
                            variables: {
                                firstName: $w("#fName").value,
                              
                                lastName: $w("#lName").value
                            }
                        })
                        .then(() => {
                            console.log("email sent")
                        })
                        .catch((err) => {
                            console.log("error", err)
                        })
                }
                console.log(resolvedContact);
            })
            .catch((error) => {
                console.error(error);
            });

    })

});