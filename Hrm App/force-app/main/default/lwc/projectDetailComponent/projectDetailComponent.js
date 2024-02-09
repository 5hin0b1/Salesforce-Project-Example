import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class ProjectDetailComponent extends NavigationMixin (LightningElement) {
    projectId;
    redirect = true;

    handleSuccess(event){
        event.preventDefault();
    this.projectId = event.detail.id;

    const evt = new ShowToastEvent({
        title: 'Success',
        message: 'Project Created Successfully',
        variant: 'success'
    });
    this.dispatchEvent(evt);
    if(this.redirect == true){
        this[NavigationMixin.Navigate]({
            type : 'standard__recordPage',
            attributes : {
                recordId : this.projectId,
                objectApiName : 'Project__c',
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