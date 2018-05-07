/**
 * ajaxTable
 * @module ajaxTable
 * @author sxj
 * @time 2017/05/24
 */

define(['jquery','./http','jquery-datatable'],($,http) => {
	"use strict";

	var ajaxTable = {
		//简单的table调用
    _showTable($t,data,columns,rowcallback){
			var options = $.extend({
          'searching': false,
    			'ordering':  false,
    			'info': false,
    			'lengthChange': true,
          'autoWidth':false,
    			"paging": false,
    			'destroy':true,
    			"processing": false,
    			"oLanguage": {//国际语言转化
            "sEmptyTable": "无数据"
          }
      }, options || {});
			$.extend( $.fn.dataTable.defaults, options);
			return $t.DataTable({
				'data':data,
				'columns':columns,
				"rowCallback":rowcallback
			});
		},
		//复杂的有分页的调用
		_showTablePage($t,data,columns,rowcallback){
			var options = $.extend({
			  "dom": '<"top"pl>rt<"clear">',
  			"paging": true,
  			'destroy':true,
  			"processing": false,
        "lengthChange": true,//是否允许用户自定义显示数量
        "bPaginate": false, //翻页功能
        "bFilter": false, //列筛序功能
        "searching": false,//本地搜索
        "ordering": false, //排序功能
        "Info": true,//页脚信息
        "oLanguage": {//国际语言转化
           "oAria": {
               "sSortAscending": " - click/return to sort ascending",
               "sSortDescending": " - click/return to sort descending"
           },
           "sLengthMenu": "显示 _MENU_ 记录",
           "sEmptyTable": "无数据",
           "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录。",
           "sInfoEmpty": "当前显示0到0条，共0条记录",
           "sProcessing": "正在加载数据...",
           "oPaginate": {
               "sFirst": "首页",
               "sPrevious": " 上一页 ",
               "sNext": " 下一页 ",
               "sLast": " 尾页 "
           }
        }
      }, options || {});
			$.extend( $.fn.dataTable.defaults, options);
			return $t.DataTable({
				'data':data,
				'columns':columns,
				"rowCallback":rowcallback
			});
		},
    //复杂的有分页的调用,可定制每页行数，但不能手工选择
    _showTablePageEnsureRow($t,data,columns,rowCount,rowcallback){
      var options = $.extend({
        "dom": '<"top"pl>rt<"clear">',
        "paging": true,
        'destroy':true,
        "processing": false,
        "pageLength": rowCount,
        "lengthChange": false,//是否允许用户自定义显示数量
        "bPaginate": false, //翻页功能
        "bFilter": false, //列筛序功能
        "searching": false,//本地搜索
        "ordering": false, //排序功能
        "Info": true,//页脚信息
        "oLanguage": {//国际语言转化
           "oAria": {
               "sSortAscending": " - click/return to sort ascending",
               "sSortDescending": " - click/return to sort descending"
           },
           "sLengthMenu": "显示 _MENU_ 记录",
           "sEmptyTable": "无数据",
           "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录。",
           "sInfoEmpty": "当前显示0到0条，共0条记录",
           "sProcessing": "正在加载数据...",
           "oPaginate": {
               "sFirst": "首页",
               "sPrevious": " 上一页 ",
               "sNext": " 下一页 ",
               "sLast": " 尾页 "
           }
        }
      }, options || {});
      $.extend( $.fn.dataTable.defaults, options);
      return $t.DataTable({
        'data':data,
        'columns':columns,
        "rowCallback":rowcallback
      });
    },
    //复杂的有分页的调用(服务器模式)
    _showTablePageServerModel($t,columns,apiName,queryData,rowcallback){
      var options = $.extend({
        "dom": '<"top"pl>rt<"clear">',
        "paging": true,
        'destroy':true,
        "processing": false,
        "lengthChange": true,//是否允许用户自定义显示数量
        "bPaginate": false, //翻页功能
        "bFilter": false, //列筛序功能
        "searching": false,//本地搜索
        "ordering": false, //排序功能
        "Info": true,//页脚信息
        "oLanguage": {//国际语言转化
           "oAria": {
               "sSortAscending": " - click/return to sort ascending",
               "sSortDescending": " - click/return to sort descending"
           },
           "sLengthMenu": "显示 _MENU_ 记录",
           "sEmptyTable": "无数据",
           "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录。",
           "sInfoEmpty": "当前显示0到0条，共0条记录",
           "sProcessing": "正在加载数据...",
           "oPaginate": {
               "sFirst": "首页",
               "sPrevious": " 上一页 ",
               "sNext": " 下一页 ",
               "sLast": " 尾页 "
           }
        }
      }, options || {});
      $.extend( $.fn.dataTable.defaults, options);
      return $t.DataTable({
        "serverSide": true, //开启服务器处理模式
        'columns':columns,
        "rowCallback":rowcallback,
        "fnServerData": function(sSource, aoData, fnCallback){
          var params = {pageparams:aoData,queryparams:queryData};
          http.get({
            apiName: apiName,
            async: true,
            params: params,
            success: function success(data) {
                fnCallback && typeof fnCallback == 'function' && fnCallback(data.data);
            }
          });
        }
      });
    }
	};

	return ajaxTable;
});