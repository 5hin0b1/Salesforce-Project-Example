trigger AvoidConRecords on Consultant__c (before delete) {
    for(Consultant__c c : trigger.old){
        if(c.Status__c == 'Approved' && c.Type__c == 'Employee'){
            c.addError('You Cannot delete this Record');
        }
    }
}