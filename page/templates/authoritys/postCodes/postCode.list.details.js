define(['app',
    'config',
    'treeview'
], function (app, config, treeview) {
    app.registerController('postCodeDetailsCtrl', ['$scope', '$stateParams', 'PostCodesService', '$state',
        function ($scope, $stateParams, PostCodesService, $state) {
            $scope.codeData = JSON.parse($stateParams.id);
            console.log($scope.codeData);
            console.log($scope.codeData.flag);

            $scope.previousText = function () {
                $state.go('postCodes');
            };

            function treeview() {
                $scope.defaultData = getTree($scope.defaultData);
                $('#treeview-checkable').treeview({
                    data: $scope.defaultData,//展示数据
                    showIcon: true,
                    showCheckbox: true,//$scope.codeData.flag === 'view'? false : true,
                    levels: 1,
                    borderColor: false,
                    showBorder: false,
                    onhoverColor: 'white',
//
                    //点击选中
                    onNodeChecked: function (event, node) {
                        nodeChecked(event, node);

                        $scope.siblings = $('#treeview-checkable').treeview('getChecked', node.nodeId);
                        console.log($scope.siblings)
                        $('#checkable-output').prepend('<p>' + node.text + ' --被选中</p>');
                    },
                    // 点击取消选中
                    onNodeUnchecked: function (event, node) {
                        nodeUnchecked(event, node);
                        $scope.siblings = $('#treeview-checkable').treeview('getChecked', node.nodeId);
                        console.log($scope.siblings)
                        $('#checkable-output').prepend('<p>' + node.text + ' --被取消选中</p>');
                    }
                });
            }

            //保存
            $scope.saveTree = function (data) {
                if(!data.comCode){
                    alert('请输入归属机构！！');
                    return false;
                }
                var checkedTree = [];
                if ($scope.siblings) {
                    $.each($scope.siblings, function (index, sibing) {
                        checkedTree.push(sibing.taskCode);
                    });
                }else if($scope.codeData.flag === 'edit'){
                    var keywords = [];
                    checkedTree = getTreeChecked($scope.defaultData,keywords);
                }
                console.log(checkedTree);
                if ($scope.codeData.flag === 'add') {
                    console.log('add');
                    if(checkedTree.length===0){
                        alert('请至少选择一个岗位！');
                        return false;
                    }
                    PostCodesService.saveAddPostCodeDetails(checkedTree, data).then(
                        function (data) {
                            if(data.result==='susses'){
                                alert('保存成功！！');
                            }
                            console.log(data);
                        }, function (code) {
                            throw(code);
                        }
                    );
                }
                if ($scope.codeData.flag === 'edit') {
                    console.log('edit');
                    if(checkedTree.length===0){
                        alert('请至少选择一个岗位！');
                        return false;
                    }
                    PostCodesService.saveEditPostCodeDetails(checkedTree, data).then(
                        function (data) {
                            if(data.result==='susses'){
                                alert('保存成功！！');
                            }
                            console.log(data);

                        }, function (code) {
                            throw(code);
                        }
                    );
                }
            };
            var init = function () {
                //查看
                if ($scope.codeData.flag === 'view') {
                    PostCodesService.viewPostCodeDetails($scope.codeData.id).then(
                        function (data) {
                            $scope.defaultData = data.saaGradetaskList;
                            $scope.postDataList = data.saaGrade;
                            treeview();//展示tree

                        }, function (code) {
                            throw(code);
                        }
                    );
                }
                //新增
                if ($scope.codeData.flag === 'add') {
                    var keywords = {
                        rootTaskCode: 'reins'
                    };
                    $scope.postDataList = {
                        commonGrade:'1',
                        validStatus:'1'
                    };
                    PostCodesService.addPostCodeDetails(keywords).then(
                        function (data) {
                            $scope.defaultData = data.saaGradetaskList;
                            treeview();//展示tree

                        }, function (code) {
                            throw(code);
                        }
                    );
                }
                //配置
                if ($scope.codeData.flag === 'edit') {
                    PostCodesService.viewPostCodeDetails($scope.codeData.id).then(
                        function (data) {
                            $scope.defaultData = data.saaGradetaskList;
                            $scope.postDataList = data.saaGrade;
                            treeview();//展示tree

                        }, function (code) {
                            throw(code);
                        }
                    );
                }

            };

            init();

            //处理数据
            function getTree(datas) {
                $.each(datas, function (index, data) {
                    data.text = data.taskCName;
                    data.nodes = data.saaGradetaskList;
                    data.selectable = false;
                    //判断是否选中 intranetValue=1：true，0：false
                    data.state = {
                        checked: data.intranetValue === '1' ? true : false
                        // selected: data.intranetValue === '1' ? true : false
                    };

                    if (data.nodes) {
                        if (data.nodes.length > 0) {
                            getTree(data.nodes);
                        }
                    }

                });
                return datas;
            }
            //获取选中数据
            function getTreeChecked(datas,keyword) {
                $.each(datas, function (index, data) {
                   if(data.intranetValue==='1'){
                       keyword.push(data.taskCode);
                   }
                    if (data.saaGradetaskList) {
                        if (data.saaGradetaskList.length > 0) {
                            getTreeChecked(data.saaGradetaskList,keyword);
                        }
                    }
                });
                return keyword;
            }

            var nodeCheckedSilent = false;

            //选中
            function nodeChecked(event, node) {
                if (nodeCheckedSilent) {
                    return;
                }
                nodeCheckedSilent = true;
                checkAllParent(node);
                checkAllSon(node);
                nodeCheckedSilent = false;
            }

            var nodeUncheckedSilent = false;

            //取消选中
            function nodeUnchecked(event, node) {
                if (nodeUncheckedSilent)
                    return;
                nodeUncheckedSilent = true;
                uncheckAllParent(node);
                uncheckAllSon(node);
                nodeUncheckedSilent = false;
            }

            //选中全部父节点
            function checkAllParent(node) {
                $('#treeview-checkable').treeview('checkNode', node.nodeId, {silent: true});
                var parentNode = $('#treeview-checkable').treeview('getParent', node.nodeId);
                if (!("nodeId" in parentNode)) {
                    return;
                } else {
                    checkAllParent(parentNode);
                }
            }

            //取消全部父节点
            function uncheckAllParent(node) {
                $('#treeview-checkable').treeview('uncheckNode', node.nodeId, {silent: true});
                var siblings = $('#treeview-checkable').treeview('getSiblings', node.nodeId);
                var parentNode = $('#treeview-checkable').treeview('getParent', node.nodeId);
                if (!("nodeId" in parentNode)) {
                    return;
                }
                var isAllUnchecked = true;  //是否全部没选中
                for (var i in siblings) {
                    if (siblings[i].state.checked) {
                        isAllUnchecked = false;
                        break;
                    }
                }
                if (isAllUnchecked) {
                    uncheckAllParent(parentNode);
                }

            }

            //级联选中所有子节点
            function checkAllSon(node) {
                $('#treeview-checkable').treeview('checkNode', node.nodeId, {silent: true});
                if (node.nodes != null && node.nodes.length > 0) {
                    for (var i in node.nodes) {
                        checkAllSon(node.nodes[i]);
                    }
                }
            }

            //级联取消所有子节点
            function uncheckAllSon(node) {
                $('#treeview-checkable').treeview('uncheckNode', node.nodeId, {silent: true});
                if (node.nodes != null && node.nodes.length > 0) {
                    for (var i in node.nodes) {
                        uncheckAllSon(node.nodes[i]);
                    }
                }
            }
        }
    ]);

});