define(['app', 'codes', 'config', 'menus'], function (app, codes, config, menus) {

    app.controller('InterfaceListCtrl', ['$scope', '$q', '$location', '$stateParams', '$filter', 'CodeService', 'ContractService'
        , function ($scope, $q, $location, $stateParams, $filter, codeService, contractService) {


            //查询合同列表
            $scope.searchContract = function(contAttr, keywords, pagination, user) {
                $scope.operation = 'contract.prop.searchContract';
                contractService.searchContract(contAttr, keywords, pagination, user).then(
                    function(data){
                        console.log("interface's searchContract method is coming ...");
                        $scope.contractList = data.data;
                        pagination.totalItems = data.total;
                    },
                    function(code){
                        throw(code);
                        //alert(message);
                    }
                );
            };


            var init = function(){
                $scope.options = {
                    pid: '1',
                    id: '1.1',
                    bsnsTyp: '0',
                    treatyType:'U'
                };

                //获取翻译对象
                $scope.codes = codes;
                $scope.menus = menus;

                //重置查询框中内容(合同)
                $scope.resetSearchBox = function(){
                    $scope.keywords = {
                        "tmpContNo":"",
                        "tmpContNoFlag":"=",
                        "contOutTypFlag" : '=',
                        "contOutTyp" : '',
                        "contNoFlag" : '=',
                        "contNo" : '',
                        "refNmeFlag" : '=',
                        "refNme" : '',
                        "contYearFlag" : '=',
                        "contYear" :'',
                        "contStatusFlag" : '=',
                        "contStatus" :'',
                        "ricomCdeFlag" : '=',
                        "ricomCde" : '',
                        "ttyLinkerFlag" : '=',
                        "ttyLinker" : ''
                    };
                };

                //分页对象
                $scope.pagination = {
                    totalItems:0,
                    pageIndex:1,
                    pageSize:10,
                    maxSize:8,
                    numPages:4,
                    previousText: config.pagination.previousText,
                    nextText: config.pagination.nextText,
                    firstText: config.pagination.firstText,
                    lastText: config.pagination.lastText
                };

                //重置条件查询框
                $scope.resetSearchBox();

                $scope.contAttr = 'prop';
                $scope.keywords = {

                };


                //查询列表框
                $scope.searchContract($scope.contAttr, $scope.keywords, $scope.pagination, {});
            };


            init();
        }]);
});