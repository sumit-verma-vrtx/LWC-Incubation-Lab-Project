import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CreateContact extends NavigationMixin(LightningElement) {
    @api accountId;
    formNotValid = false;
    recordSubmitHandler(event){
        event.preventDefault();
        const fields = event.detail.fields;
        fields.AccountId = this.accountId;
        //Validate Phone Number format
        var phoneNumber = fields.Phone;
        const regExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        var phone = regExp.test(phoneNumber);
        if (phone) {
            this.formNotValid = false;
            //submit the form
            this.template.querySelector('lightning-record-edit-form').submit(fields);
        } else {
            this.formNotValid = true;
        }
        
    }
    // Navigate to View Contact Page
    navigateToViewContactPage(event){
        console.log('event  '+event.detail.Id);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.id,
                objectApiName: 'Contact',
                actionName: 'view'
            },
        });
    }

}