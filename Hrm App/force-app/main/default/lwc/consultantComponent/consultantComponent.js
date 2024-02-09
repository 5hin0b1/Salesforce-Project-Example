import { LightningElement, api } from 'lwc';
import getConsultants from '@salesforce/apex/ConsultantLookupController.getConsultants';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class ConsultantComponent extends NavigationMixin(LightningElement) {
    @api consultantId;
    ConsultantData;
    redirect = true;

    handleChange(event) {
        let targetId = event.target.value;
        console.log('targetId: ' + targetId); 
        getConsultants({})
            .then((data) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Data Loaded',
                        message: 'Lookup Data Loading Successfully',
                        variant: 'success',
                    })
                );
            })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Data Not Loading',
                        message: 'Lookup Data Not Found ' + error.message,
                        variant: 'error',
                    })
                );
            });
    }

    handleSuccess(event) {
        event.preventDefault();
        this.consultantId = event.detail.id;

        const evt = new ShowToastEvent({
            title: 'Success',
            message: 'Consultant Record Created Successfully', 
            variant: 'success',
        });

        this.dispatchEvent(evt);
        if (this.redirect == true) {
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: this.consultantId, 
                    actionName: 'view', 
                },
            });
        }
    }

    handleBack() {
        let cmpDef = { componentDef: 'c.displayMultipleFields' };
        let encodeDef = btoa(JSON.stringify(cmpDef));
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/one/one.app#' + encodeDef,
            },
        });
    }
}
