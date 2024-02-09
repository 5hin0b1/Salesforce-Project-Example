public with sharing class consultantLookupController {
    @AuraEnabled
    public static List<Consultant__c> getConsultants(){
        System.debug('Inside Method');
        return [SELECT Id,Name,Type__c FROM Consultant__c where Type__c = 'Employee'];
    }
}