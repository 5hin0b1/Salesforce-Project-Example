import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin }from 'lightning/navigation';

export default class ClentDetailComponent extends NavigationMixin (LightningElement) {
    ClintId;
    redirect = true;

    handleSuccess(event){
        event.preventDefault();
        this.ClientId = event.detail.id;
        const evt = new ShowToastEvent({
            title: 'Success',
            message: 'Client Created Successfully',
            variant: 'success'
        });
        this.dispatchEvent(evt);
        if(this.redirect == truye){
            this[NavigationMixin.Navigate]({
                tyepe: 'standard__recordPage',
                attributes : {
                    recordId : this.ClientId,
                    objectApiName : 'Client__c'
                },
            });
        }
    }
    handleBack(){
        let cmpDef = {
            componentDef: "c:displayMultipleFields"
        };
        let encodeDef = btoa(JSON.stringify(cmpDef));
        this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
                url: "/one/one.app#" + encodeDef
            }
        });
    }
}