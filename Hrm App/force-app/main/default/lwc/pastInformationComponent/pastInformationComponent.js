import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class PastInformationComponent extends NavigationMixin (LightningElement) {
    pastInfoId;
    redirect = true;

    handleSuccess(event){
        event.preventDefault();
    this.pastInfoId = event.detail.id;

    const evt = new ShowToastEvent({
        title: 'Success',
        message: 'Past Information Record Created Successfully',
        variant: 'success'
    });

    this.dispatchEvent(evt);
    if(this.redirect == true){
        this[NavigationMixin.Navigate]({
            type : 'standard__recordPage',
            attributes : {
                recordId : this.pastInfoId,
                objectApiName : 'Past_Information__c',
                actionName : 'view'
            },
        });
    }
    }

    handleBack(){
        let cmpDef ={
            componentDef: "c:displayMultipleFields" };

            let encodeDef = btoa(JSON.stringify(cmpDef));
            this[NavigationMixin.Navigate]({
                type: "standard__webPage",
                attributes: {
                    url: "/one/one.app" + encodeDef
                }
            });
    }
}