trigger AvoidDeletionOfChildPastInfo on Past_Information__c (before delete) {
    //create a list of new consultant Ids which is having past information
    list<Id>conIds = new List<Id>();
    for(Past_Information__c pInfo: trigger.old){
        conIds.add(pInfo.Consultant__c);
    }
    //Create a map to store consultant IDs
    map<Id,Consultant__C> mapCon = new map<Id,Consultant__c>();
    //fire the Soql to get the data of consultant Id having past information
    for(Consultant__c con : [SELECT Id,Status__c,Type__c FROM Consultant__c WHERE Id IN: conIds]){
        mapCon.put(con.Id, con);
    }
    
    //Iterate through Past Information to find out records of required Criteria
    for(Past_Information__c pInfo : trigger.old){
        if(mapCon.get(pInfo.Consultant__c).Status__c == 'Approved' && 
        mapCon.get(pInfo.Consultant__c).Type__c == 'Employee'){
            pInfo.addError('You cannot delete this Record as the Consultant status is Approved and Type is Employee');
        }
    }
}
