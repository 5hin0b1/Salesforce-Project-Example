trigger CreateChildRecOnCon on Consultant__C (after insert) {

List<Past_Information__c> pastInfoList = new List<Past_Information__c>();
for(Consultant__C con: Trigger.new){
    if(con.Type__c=='Employee'){
        Past_Information__c pastInfo = new Past_Information__c();
        pastInfo.Consultant__C = con.Id;
        pastInfo.Company__c = 'TCS';
        pastInfoList.add(pastInfo);
    }
}
    insert pastInfoList;
}