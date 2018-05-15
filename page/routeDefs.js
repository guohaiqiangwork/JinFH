define(['app'
    ], function(app) {
    app.registerProvider(
        'routeDefs',
        [
            '$stateProvider',
            '$urlRouterProvider',
            '$couchPotatoProvider',
            '$locationProvider',
            '$provide',
            function (
                $stateProvider,
                $urlRouterProvider,
                $couchPotatoProvider
                ) {

                this.$get = function() {
                    // this is a config-time-only provider
                    // in a future sample it will expose runtime information to the app
                    return {};
                };

                $urlRouterProvider
                    .when('', '/');

                $urlRouterProvider.otherwise('/dashboard');

                $stateProvider
                    .state('dashboard', {
                        url: '/dashboard',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['/reins/page/templates/dashboard/dashboard.ctrl.js'])
                        },
                        views:{
                            'main': {
                                templateUrl: '/reins/page/templates/dashboard/dashboard.tpl.html',
                                controller: 'DashboardCtrl'
                            }
                        }
                    })
                    
                    //分出查询 xujieyang
                    .state('fromquery', {
                        url: '/fromquerys/:bizType',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['/reins/page/templates/fromquery/fromquery.list.ctrl.js'])
                        },
                        views: {
                            main: {
                                templateUrl: '/reins/page/templates/fromquery/fromquery.list.tpl.html',
                                controller: 'FromQueryListCtrl',
                                
                            }
                        }
                    })
                    
                    //临汾手工账单拆分 xjy
                    	.state('accounting', {
                        url: '/accountings',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['/reins/page/templates/linfenAccounting/linfenAccounting.list.ctr.js'])
                        },
                        views: {
                            main: {
                                templateUrl: '/reins/page/templates/linfenAccounting/linfenAccounting.list.tpl.html',
                                controller: 'AccountingFromQueryListCtrl',
                                
                            }
                        }
                    })  
                    //end
                    //发票录入,查询 ad by xjy 2018-03-12 
                    .state('settleInvoices', {
                        url: '/settleInvoice',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['/reins/page/templates/settleInvoice/settleInvoice.list.ctrl.js'])
                        },
                        views: {
                            'main': {
                                templateUrl: '/reins/page/templates/settleInvoice/reinsSettleInvoiceEntry.list.tpl.html',
                                controller: 'SettleInvoiceListCtrl'
                                
                            }
                        }
                    })
                    
                    
                     //发票录入,录入发票 ad by xjy 2018-03-15 
                    .state('settleInvoice_in', {
                        url: '/invoiceEdit/:chargeoffPkgNo/:freinsCode/:operation',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['/reins/page/templates/settleInvoice/editor/enterInvoice.edit.ctrl.js'])
                        },
                        views: {
                            'main': {
                                templateUrl: '/reins/page/templates/settleInvoice/editor/reinsEnterInvoice.input.html',
                                controller: 'SettleInvoiceEditCtrl'
                                
                            }
                        }
                    })
                    
                     //开票查询
                    .state('printInvoices', {
                        url: '/printInvoice',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['/reins/page/templates/printInvoice/printInvoice.list.ctrl.js'])
                        },
                        views: {
                            main: {
                                templateUrl: '/reins/page/templates/printInvoice/printInvoice.list.tpl.html',
                                controller: 'PrintInvoiceListCtrl'
                            }
                        }
                    })
                    
                    .state('printInvoiceEdit', {
                        url:'/printInvoiceEdit/:pkgNo/:payCode/:operation',

                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['/reins/page/templates/printInvoice/editor/printInvoice.edit.ctrl.js'])
                        },
                        views: {
                        	main: {
                                templateUrl:'/reins/page/templates/printInvoice/editor/printInvoice.input.html',
                                controller: 'PrintInvoiceEditCtrl'
                            }
                        }
                    })
                    //add by wl 20180312 增加结算单生成  begin
                    .state('accSettle', {
                        url: '/accSettles',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['/reins/page/templates/settle/settle.list.ctrl.js'])
                        },
                        views: {
                            'main': {
                                templateUrl: '/reins/page/templates/settle/reinsSettleEntry.list.tpl.html',
                                controller: 'SettleListCtrl',
                            }
                        }
                    })
                     //add by renshuai 20180316  结算单处理
                    .state('settleAcc', {
                        url: '/settleAccs',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['/reins/page/templates/settle/reinsSettleAcc.list.ctrl.js'])
                        },
                        views: {
                            main: {
                                templateUrl: '/reins/page/templates/settle/reinsSettleAcc.list.tpl.html',
                                controller: 'SettleAccCtrl',
                            }
                        }
                    })
                   
                      //结算单 查看(view) add by renshusai
                    .state('settleAcc.operation', {
                        url: '/:settleNo/:operation',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['/reins/page/templates/settle/editor/reinsSettleAcc.editor.ctrl.js'])
                        },
                        views: {
                            operation: {
                                templateUrl: '/reins/page/templates/settle/editor/reinsSettleAcc.editor.tpl.html',
                                controller: 'SettleAccEditorCtrl'
                            }
                        }
                    })

                   
                    
                     //add by wl 20180312 增加结算单生成  end
                    //合同列表
                    //合同列表 add by wl 20180207 begin
                    // mode  1:   2:
                    .state('contract', {
                        url: '/contracts/:contAttr/:mode',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['/reins/page/templates/contract/contract.list.ctrl.js'])
                        },
                        views:{
                            'main': {
                                templateUrl: '/reins/page/templates/contract/contract.list.tpl.html',
                                controller: 'ContractListCtrl'
                            }
                        }
                    })

                     //新增(new)
                    .state('contract.new', {
                        url: '/:contOutTyp/:operation',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['/reins/page/templates/contract/editor/contract.editor.ctrl.js'])
                        },
                        views: {
                            operation: {
                                templateUrl: '/reins/page/templates/contract/editor/contract.editor.tpl.html',
                                controller: 'ContractEditorCtrl'
                            }
                        }
                    })
                    //查看(view)，编辑(edit)，复制(copy)，续转(transfer)，删除合同(delete)
                    .state('contract.operation', {
                        url: '/:operation',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['/reins/page/templates/contract/editor/contract.editor.ctrl.js'])
                        },
                        views: {
                            operation: {
                                templateUrl: '/reins/page/templates/contract/editor/contract.editor.tpl.html',
                                controller: 'ContractEditorCtrl'
                            }
                        }
                    })
                 

                    //合同关系查询
                    .state('relationship', {
                        url: '/relationships',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['/reins/page/templates/relationship/relationship.list.ctrl.js'])
                        },
                        views: {
                        	'main': {
                                templateUrl: '/reins/page/templates/relationship/relationship.list.tpl.html',
                                controller: 'RelationshipListCtrl'
                            }
                        }
                    })

                    //合同关系 查看(view)，编辑(edit),删除(delete)
                    .state('relationship.operation', {
                        url: '/:relationshipNo/:operation',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['/reins/page/templates/relationship/editor/relationship.editor.ctrl.js'])
                        },
                        views: {
                            operation: {
                                templateUrl: '/reins/page/templates/relationship/editor/relationship.editor.tpl.html',
                                controller: 'RelationshipEditorCtrl'
                            }
                        },
                        onEnter:function(){
                        }

                    })
                    //合同关系 新增(new)
                    .state('relationship.new', {
                        url: '/:operation',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['/reins/page/templates/relationship/editor/relationship.editor.ctrl.js'])
                        },
                        views: {
                            operation: {
                                templateUrl: '/reins/page/templates/relationship/editor/relationship.editor.tpl.html',
                                controller: 'RelationshipEditorCtrl'
                            }
                        },
                        onEnter:function(){
                        }

                    })                   
                    
                    //再保人查询
                    .state('reinsurer', {
                        url: '/reinsurers',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['/reins/page/templates/reinsurer/reinsurer.list.ctrl.js'])
                        },
                        views: {
                        	'main': {
                                templateUrl: '/reins/page/templates/reinsurer/reinsurer.list.tpl.html',
                                controller: 'ReinsurerListCtrl'
                            }
                        }
                    })
                     //再保人 查看(view)，编辑(edit),删除(delete)
                    .state('reinsurer.operation', {
                        url: '/:reinsurerNo/:operation',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['/reins/page/templates/reinsurer/editor/reinsurer.editor.ctrl.js'])
                        },
                        views: {
                            operation: {
                                templateUrl: '/reins/page/templates/reinsurer/editor/reinsurer.editor.tpl.html',
                                controller: 'ReinsurerEditorCtrl'
                            }
                        }
                    })
                    
                     .state('reinsEditRecord', {
                        url: '/reinsEditRecords/:reinsurerNo',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['/reins/page/templates/reinsurer/editor/reinsurer.edit.record.ctrl.js'])
                        },
                        views: {
                        	'main': {
                                templateUrl: '/reins/page/templates/reinsurer/editor/reinsurer.edit.record.tpl.html',
                                controller: 'ReinsurerEditRecordCtrl'
                            }
                        }
                    })
                    
                     .state('reinsEditMessage', {
                        url: '/reinsEditMessages/:reinsCode/:changeTimes',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['/reins/page/templates/reinsurer/editor/reinsurer.edit.message.ctrl.js'])
                        },
                        views: {
                        	'main': {
                                templateUrl: '/reins/page/templates/reinsurer/editor/reinsurer.edit.record.message.html',
                                controller: 'ReinsurerEditMessageCtrl'
                            }
                        }
                    })
                    
                    //系统管理
                    .state('admin', {
                        url: '/admin',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['/reins/page/templates/admin/admin.main.ctrl.js'])
                        },
                        views: {
                            main: {
                                templateUrl: '/reins/page/templates/admin/admin.main.tpl.html',
                                controller: 'AdminMainCtrl'
                            }
                        }
                    })
                    
                    //临分业务（inquiry）
                    .state('inquiry', {
                       url: '/facings/:operations',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['/reins/page/templates/inquiry/inquiry.list.ctrl.js'])
                        },
                        views: {
                            'main': {
                                templateUrl: '/reins/page/templates/inquiry/inquiry.list.tpl.html',
                                controller: 'InquiryListCtrl'
                            }
                        }
                    })
                    
                    /*.state('inquiryn', {
                        url: '/facingsn/:certiNo/:operation',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['/reins/page/templates/inquiry/inquiry.detail.modal.ctrl.js'])
                        },
                        views: {
                        	main: {
                                templateUrl: '/reins/page/templates/inquiry/inquiry.detail.modal.tpl.html',
                                controller: 'InquiryDetailModalCtrl'
                            }
                        }
                    }) */                             
                    //单证打印
                    .state('print', {
                        url: '/prints',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['/reins/page/templates/print/print.prop.list.ctrl.js'])
                        },
                        views:{
                            'main': {
                                templateUrl: '/reins/page/templates/print/print.prop.list.tpl.html',
                                controller: 'PrintListCtrl'
                            }
                        }
                    })
                    //超赔-预付费
                    .state('XYufuFeiAccs', {
                        url: '/XYufuFeiAccss',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['/reins/page/templates/excessLoss/premiumAdjust/QueryXTreatyResult.list.ctrl.js'])
                        },
                        views:{
                            'main': {
                                templateUrl: '/reins/page/templates/excessLoss/premiumAdjust/QueryXTreatyResult.list.tpl.html',
                                controller: 'queryXTreaty'
                            }
                        }
                    })
                    //超赔-账单转收付
                    .state('payments', {
                        url: '/paymentss',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['/reins/page/templates/excessLoss/XTreatyTransfer/VerifyOverview.list.ctrl.js'])
                        },
                        views:{
                            'main': {
                                templateUrl: '/reins/page/templates/excessLoss/XTreatyTransfer/VerifyOverview.list.tpl.html',
                                controller: 'queryXTreatyBill'
                            }
                        }
                    })
                    //超赔打印账单
                    .state('XYufuFeiAccs_genAcc(', {
                        url: '/XYufuFeiAccss_genAcc(/:treatyNo/:accType/:accPeriod',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['/reins/page/templates/excessLoss/premiumAdjust/XTreatyPrint.list.ctrl.js'])
                        },
                        views: {
                            main: {
                                templateUrl: '/reins/page/templates/excessLoss/premiumAdjust/XTreatyPrint.list.ctrl.html',
                                controller: 'XTreatyPrint'
                            }
                        }
                    })
                    //权限管理---岗位代码
                    .state('postCodes', {
                        url: '/postCode',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['/reins/page/templates/authoritys/postCodes/postCode.list.index.js'])
                        },
                        views: {
                            main: {
                                templateUrl: '/reins/page/templates/authoritys/postCodes/postCode.list.index.html',
                                controller: 'postCodeIndex'
                            }
                        }
                    })
                    //新增岗位代码  新增(new)
                    .state('postCodesnew', {
                        url: '/postCode/:operation',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['/reins/page/templates/authoritys/postCodes/postCode.list.addpush.js'])
                        },
                        views: {
                        	main: {
                                templateUrl: '/reins/page/templates/authoritys/postCodes/postCode.list.addpush.html',
                                controller: 'postCodeAddPush'
                            }
                        },
                        onEnter:function(){
                        }

                    }) ;
            }
        ]
    );
});