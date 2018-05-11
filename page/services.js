define(['angular',
    '../page/templates/service/olive.service.code',
    '../page/templates/service/olive.service.security',
    '../page/templates/service/olive.service.contract',
    '../page/templates/service/olive.service.relationship',
    '../page/templates/service/olive.service.reinsurer',
    '../page/templates/service/olive.service.retention',
    '../page/templates/service/olive.service.claim',
    '../page/templates/service/olive.service.event',
    '../page/templates/service/olive.service.interface',
    '../page/templates/service/olive.service.bill',
    '../page/templates/service/olive.service.facing',
    '../page/templates/service/olive.service.riskunit',
    '../page/templates/service/olive.service.handledeal',
    '../page/templates/service/olive.service.outquery',
    '../page/templates/service/olive.service.print',
    '../page/templates/service/olive.service.exportOut',
    '../page/templates/service/olive.service.settleInvoice',
    '../page/templates/service/olive.service.printInvoice',
    '../page/templates/service/olive.service.settle',//add by wl ���㵥���
    '../page/templates/service/olive.service.settleAcc',
    '../page/templates/service/olive.service.settleAcc',
    '../page/templates/service/olive.service.excessLoss',
    // '../page/templates/service/olive.service.postCodes',
    '../page/templates/service/olive.service.facultative'//临分
    
], function (angular) {
    angular.module('olive.service', [
        'olive.service.code',
        'olive.service.security',
        'olive.service.contract',
        'olive.service.relationship',
        'olive.service.reinsurer',
        'olive.service.retention',
        'olive.service.claim',
        'olive.service.event',
        'olive.service.interface',
        'olive.service.bill',
        'olive.service.facing',
        'olive.service.riskunit',
        'olive.service.handledeal',
        'olive.service.outquery',
        'olive.service.print',
        'olive.service.exportOut',
        'olive.service.settleInvoice',
        'olive.service.printInvoice',
        'olive.service.settle',//add by wl ���㵥���
        'olive.service.settleAcc',
        'olive.service.settleAcc',
        'olive.service.excessLoss',
        // 'olive.service.postCodes',
        'olive.service.facultative'
    ]);
});
