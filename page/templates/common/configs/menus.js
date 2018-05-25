define(
    {
        menu: {
            "1": {
                "id" : "reins.reinsout",
                "label": "比例分出",
                "url": "",
                "menus": {
                    "1.1": {
                        "id" : "reins.reinsout.ttyacc",
                        "label": "合同分出账务",
                        "url": "#/contracts/prop/1"
                    },
                    "1.2": {
                        "id" : "reins.reinsout.reinsOutQuery",
                        "label": "分保处理",
                        "url": "#/fromquerys/1"
                    },
                    "1.3": {
                        "id" : "reins.reinsout.enquery",
                        "label": "临分业务",
                        "url": "#/facings/business"
                    },
                    /*"1.4": {
                        "id" : "reins.reinsout.manualOut",
                        "label": "手工处理",
                        "url": "#/handledeal"
                    },*/
                    "1.5": {
                        "id" : "reins.reinsout.print",
                        "label": "单证打印",
                        "url": "#/prints"
                    },
                    /*"1.6": {
                        "id" : "reins.reinsout.exportOut",
                        "label": "合约对内单证导出",
                        "url": "#/exportOut"
                    },*/
                    "1.7": {
                        "id" : "reins.reinsout.accounting",
                        "label": "临分账务",
                        "url": "#/accountings"
                    }
                }
            },
            "2": {
                "id" : "reins.reinsin",
                "label": "比例分入",
                "url": "",
                "menus": {
                    "2.1": {
                        "id" : "reins.reinsin.ttyacc",
                        "label": "合同分入账务",
                        "url": "#/contracts/prop/2"
                    },
                    "2.2": {
                        "id" : "reins.reinsin.facacc",
                        "label": "临分分入账务",
                        "url": "#/facings/accounting/1"
                    }
                }
            },
            "3": {
                "id" : "reins.nonpropout",
                "label": "超赔分出",
                "url": "",
                "menus": {
//                    "3.1": {
//                        "id" : "reins.nonpropout.xfacacc",
//                        "label": "超赔临分账务",
//                        "url": "#/facings/accounting/2"
//                    },
                    "3.2": {
                        "id" : "reins.nonpropout.xlacc",
                        "label": "超赔合同账务",
                        "url": "#/contracts/nprop/bill"
                    },
                    "3.3": {
                        "id" : "reins.nonpropout.payback",
                        "label": "超赔摊回处理",
                        "url": "#/claims"
                    },
                    "3.4": {
                        "id" : "reins.nonpropout.payback.maintain",
                        "label": "超赔待摊处理",
                        "url": "#/claims/createInsurance"
                    },
                    "3.5": {
                        "id" : "reins.nonpropout.event.maintain",
                        "label": "事故分摊处理",
                        "url": "#/events"
                    },
                    "3.6": {
                        "id" : "reins.nonpropout.bill.maintain",
                        "label": "摊回帐务处理",
                        "url": "#/fxoBill"
                    }
                }
            },
            "4": {
                "id" : "reins.admin",
                "label": "系统管理",
                "url": "",
                "menus": {
                	"4.1": {
                		"id": "reins.product.treaty",
                        "label": "比例合同管理",
                        "url": "#/contracts/prop/admin"
                    },
                    "4.2": {
                    	"id": "reins.nonpropout.xtreaty",
                        "label": "非比例合同管理",
                        "url": "#/contracts/nprop/admin"
                    },
                    "4.3": {
                    	"id": "reins.product.treaty.level",
                        "label": "合同优先级",
                        "url": "#/relationships"
                    },
                    "4.4": {
                    	"id": "reins.product.managecode.accept",
                        "label": "再保人管理",
                        "url": "#/reinsurers"
                    },
                    /*"4.5": {
                    	"id": "reins.product.treaty.planmaintenance",
                        "label": "自留额管理",
                        "url": "#/retentions"
                    }*/
                }
            },
            //add by xujieyang 2018-03-12，结算管理
            "5": {
                "id" : "reins.settlement ",
                "label": "结算管理",
                "url": "",
                "menus": {
                	"5.1": {
                		"id": "reins.settlement.settle",
                        "label": "结算单生成",
                        "url": "#/accSettles"
                    },
                    "5.2": {
                		"id": "reins.settlement.settleAcc",
                        "label": "结算单处理",
                        "url": "#/settleAccs"
                    },
                    "5.3":{
                    	"id" : "reins.settlement.invoice",
                        "label": "发票录入",
                        "url": "#/settleInvoice"
                    },
                    "5.4":{
                    	"id" : "reins.settlement.printInvoices",
                        "label": "分入开票",
                        "url": "#/printInvoice"
                    }
                }
            },
            "6": {
                "id" : "reins.Xacc_xtreatyacc ",
                "label": "超赔合约账务",
                "url": "",
                "menus": {
                	"6.1": {
                		"id": "reins.Xacc_xtreatyacc.XYufuFeiAcc",
                        "label": "预付费账单",
                        "url":"#/XYufuFeiAccss"
                    },
                    "6.2": {
                		"id": "reins.Xacc_xtreatyacc.payment",
                        "label": "账单转收付",
                        "url":"#/paymentss"
                    }
                }
            },
            "7": {
                "id" : "reins.authority ",
                "label": "权限管理",
                "url": "",
                "menus": {
                	"7.1": {
                		 "id":"reins.allocation",
     		             "label":"岗位代码",
     		             "url":"#/postCode "
//                         "url":"/reins/permission.do?actionType=query "
                        },
                    "7.2": {
                    	 "id":"reins.grade",
                 		"label":"人员权限",
                        "url":"#/permission"

                         // "url":"/reins/permission/QueryUserGradeView.jsp "
                         }
                    
                }
            }
            
        } ,
        
     
        admin: {
            "0.001": {
                "id": "reins.product.treaty",
                "label": "比例合同管理",
                "url": "#/admin/contracts/prop/admin"
            },
            "0.002": {
                "id": "reins.nonpropout.xtreaty",
                "label": "非比例合同管理",
                "url": "#/admin/contracts/nprop/admin"
            },
            "0.003": {
                "id": "reins.product.treaty.level",
                "label": "合同关系",
                "url": "#/admin/relationships"
            },
            "0.004": {
                "id": "reins.product.managecode.accept",
                "label": "再保人管理",
                "url": "#/admin/reinsurers"
            },
            "0.005": {
                "id": "reins.product.treaty.planmaintenance",
                "label": "自留额管理",
                "url": "#/admin/retentions"
        } 
        
    }
    }
);