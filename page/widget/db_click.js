/**
 * 双击域
 * @module db_click
 * @author czl
 * @time 2015/12/11
 */
define(['require', 'jquery', './template', './pager', './dialog'],
    (require, $, template, pager, dialog) => {
        "use strict";

        var http = null;
        
        /**
         * 模态窗口
         **/
        var DbClick = function(options) {
            /**
             * DbClick的选项
             * @property options
             * @type Object
             * data-isevent 默认值：1 是否手动赋值到指定的输入域 1：否，2：是
             * data-inputnum 默认值：2 显示输入域数量
             * data-page-size 默认值：7 每页行数
             * data-codetype 请求服务端的方法名（必填），对应的java为GuCodeInputAction.java, 
             * data-codemethod 请求服务端的入口方法名（必填），固定为query，入参java为SaaCodeInputAction.java的query方法
             * data-voluation 1#+‘输入域id’ 例data-voluation="1#id:2#id"
             * data-blur 默认值：1 是否失去焦点校验 2：是，1：否
             * data-notdataisshow 默认值：1 没有数据是否显示模框 1：显示，2：不显示
             * data-pagingselect 默认值：2 翻页选择 1：是，2：否
             * data-valtoinput 默认值：1 1:双击域的值放在第一个查询域；2：双击域的值放在第二个查询域
             * data-isalllist 默认值：2 2:没有选全表按钮，1：有选全表按钮
             * data-isalllist_value 默认值：'ALL' 选全表是输入域显示的记录
             * data-checkbox 默认值 1 2：显示Checkbox; 1:不显示
             * data-showpager 默认值：2 1：显示分页；2:超过10条时显示分页
             * data-stoponly 默认值：1 1：即使数据集唯一时也有选择框弹出 2:唯一时不弹出
             * data-thname 默认值：'代码:代码名称' 数据表格的表头名
             * data-inputname 默认值：'代码:代码名称' 查询输入域的名称
             * data-title 默认值：'请选择' 模态窗口标题名
             * data-precondition  前置查询条件属性id 例data-precondition="id,id1,id2"
             * data-hidevalue  隐藏查询条件
             * data-isforview 默认值：0 1:做展示处理，弹出的选择框有部分功能将禁用 0:不禁用
             * @private
             **/
            this.options = $.extend({
                isForView: '0', //1:做展示处理，弹出的选择框有部分功能将禁用
                codeMethod: '',
                codeType: '',
                apiName: '',
                animation: 'fadeTo',
                ele: null,
                joinStr: ',',
                precondition: '',
                title: '请选择',
                tdwidth: '20%',
                isblur: '1', //是否失去焦点校验 1：是，2：否
                notDataIsShow: '1', //没有数据是否显示模框 1：显示，2：不显示
                pagingSelect: '2', //翻页选择 1：是，2：否
                hideValue: '', //隐藏查询条件
                valtoinput: '1', //1:双击域的值放在第一个查询域；2：双击域的值放在第二个查询域
                isalllist: '2', //2:没有选全表按钮，1：有选全表按钮
                isalllist_value: 'ALL', //选全表是输入域显示的记录
                isEvent: '1', //2：选中后模拟触发selectExtend; 1:不触发
                isCheckbox: '1', //2：显示Checkbox; 1:不显示
                showpager: '2', //1：显示分页；2:超过10条时显示分页
                stopOnly: '1', //1：即使数据集唯一时也有选择框弹出
                page_size: 7, //每页默认行数
                page_index: 0, //当前页
                callBackClose() {}
            }, options || {});
            this.jq_table = null;
            this.cache_data = null;
            this.otherCondition = '';
            this.v = '';
            this.o_lable = {};
            this.cache_select_data = {};
            this.precondition = '';
            this.preconditionValue = '';
            this.pager = null;
            this.toolbar = null;

        };

        /**
         * DbclickArea类的静态函数
         * @method show
         **/
        DbClick.show = function(opt) {
            var options = $.extend({

            }, opt || {});

            return new DbClick(options)._initDbclickArea();
        };

        DbClick.VERSION = '1.0.0';

        DbClick.DBCLICKTP = '<div class="panel-body searchpanel" style="min-height: 300px;padding: 0px;">\
							<div class="row">\
							<form class="form-horizontal searchform">\
								<%if(num > 0){%>\
								<div class="col-lg-5 col-md-5 col-xs-12">\
									<div class="form-group" style="margin-bottom: 5px;">\
										<div class="col-md-4" style="padding-right: 0px;">\
											<label style="float:right;" class="control-label" for="clientName"><%=input_name[0]%></label>\
										</div>\
										<div class="col-md-8">\
											<input type="text" class="form-control input-sm" name="code" value="<%=frist%>">\
										</div>\
									</div>\
								</div>\
								<div class="col-lg-5 col-md-5 col-xs-12">\
									<%if(num > 1){%>\
									<div class="form-group" style="margin-bottom: 5px;">\
										<div class="col-md-4" style="padding-right: 0px;">\
											<label style="float:right;" class="control-label" for="clientName"><%=input_name[1]%></label>\
										</div>\
										<div class="col-md-8">\
											<input type="text" class="form-control input-sm" name="codeName" value="<%=two%>">\
										</div>\
									</div>\
									<%}%>\
								</div>\
								<div class="col-lg-2 col-md-5 col-xs-12">\
									<div class="form-group" style="margin-bottom: 5px;">\
											<button class="btn btn-primary btn-xs searchbutton" type="button">查询</button>\
									</div>\
								</div>\
								<%}%>\
							</form>\
						</div>\
						<div class="row panelsearch">\
							<%if(isCheckbox == "2" && pagingSelect == "1"){%>\
							<div class="col-lg-12 col-md-12 col-xs-12">\
								<ul class="paging-select cbSlide-con clearfix-ex"></ul>\
							</div><%}%>\
						<div class="col-lg-12 col-md-12 col-xs-12">\
						<div class="panel panel-info" style="margin-bottom: 0px;">\
							<div class="panel-heading" style="padding-top: 5px; padding-bottom: 5px;">\
								<h4 style="" class="panel-title">\
									<div class="btn-toolbar">\
										<button class="btn btn-primary btn-xs btn-clear" type="button">清除</button>\
										<%if(isCheckbox == "2"){%>\
										<button class="btn btn-primary btn-xs ck disabled sure" disabled="disabled" type="button">确认</button>\
										<%if(isalllist == "1"){%><button class="btn btn-primary btn-xs all" type="button">选全表</button><%}}%>\
									</div>\
								</h4>\
							</div>\
							<div class="table-responsive">\
								<table class="table table-bordered table-hover table-condensed alerttable searchtable <%if(isCheckbox != "2"){%>pointers<%}%>">\
									<thead>\
										<tr>\
											<%if(isCheckbox == "2"){%><th style="width:20px"><input type="checkbox" name="checkAll"></th><%}%>\
											<th style="width: <%=tdwidth%>"><%=th_name[0]%></th>\
											<th><%=th_name[1]%></th>\
										</tr>\
									</thead>\
									<tbody></tbody>\
								</table>\
							</div>\
							<div class="dt-bottom-row" style="padding-top: 2px; padding-bottom: 0px;"><div class="row tablepager"></div></div>\
						</div></div></div>\
					</div>';

        DbClick.DBCLICKTRTP = '<%for(var i=0,len=row.length;i<len;i++){%>\
								<tr data-id="<%=row[i].id%>">\
								<%if(isCheckbox == "2"){%><td><input type="checkbox" id="checkbox_db_<%=row[i].id%>" value="" data-name="<%=row[i].showLableOne%>" data-id="<%=row[i].id%>" name="alertcheckCode"></td><%}%>\
								<td><%=row[i].showLableOne%></td>\
								<td><%=row[i].showLableTwo%></td>\
							</tr>\
						<%}%>';

        DbClick.ULTP = '<%for(var i=0,len=data.length;i<len;i++){%>\
					<li id="li_<%=data[i].id%>" data-id="<%=data[i].id%>" class="cbAttr">\
					<a herf="javacript:;"><%=data[i].name%></a>\
					<a herf="javacript:;" class="cbDelete"></a></li><%}%>';

        /**
	@class DbClick.prototype
	@static
	**/
        DbClick.prototype = {

            /**
             * 方法入口
             */
            _initDbclickArea() {
                this._initData();
                this.precondition && this.precondition != '' && this._initPrecondition();
                this._initAppointInput();
                this._showTable();

                return this;
            },

            /**
             * 初始化参数
             */
            _initData() {
                if (!this.options.ele && this.options.ele.length == 0)
                    return;

                var name, s;

                var voluation = this.options.ele.data('voluation');

                s = voluation ? voluation.split(':') : null;
                if (s)
                    for (var i = 0, len = s.length; i < len; i++) {
                        name = s[i] ? s[i].split('#') : null,
                            name && name.length > 1 && (this.o_lable[name[0]] = name[1]);
                    }

                this.options.page_size = this.options.ele.data('page-size') ? parseInt(this.options.ele.data('page-size')) : this.options.page_size;
                this.isReadonly = this.options.ele.attr('readonly') === 'readonly' ? false : true;
                this.valtoinput = $.trim(this.options.ele.data('valtoinput')) || this.options.valtoinput;
                this.appointInput = this.options.ele.data('appointinput') ? $.trim(this.options.ele.data('appointinput')).split(':') : null;
                this.options.isForView = $.trim(this.options.ele.data('isforview')) || this.options.isForView;
                this.options.codeMethod = $.trim(this.options.ele.data('codemethod'));
                this.options.codeType = $.trim(this.options.ele.data('codetype'));
                this.options.stopOnly = $.trim(this.options.ele.data('stoponly')) || this.options.stopOnly;
                this.options.url += this.options.codeMethod || 'query';
                this.options.title = this.options.ele.data('title') ? this.options.ele.data('title') : '请选择';
                this.search_input_num = this.options.ele.data('inputnum') || this.options.ele.data('inputnum') == '0' ? parseInt(this.options.ele.data('inputnum')) : 2;
                this.search_input_name = this.options.ele.data('inputname') ? this.options.ele.data('inputname').split(':') : ['代码', '代码名称'];
                this.search_input_name.length < 2 && (this.search_input_name.push('代码名称'));
                this.show_th_name = this.options.ele.data('thname') ? this.options.ele.data('thname').split(':') : ['代码', '代码名称'];
                this.show_th_name.length < 2 && (this.show_th_name.push('代码名称'));
                this.precondition = this.options.ele.data('precondition') ? $.trim(this.options.ele.data('precondition')) : this.options.precondition;
                this.isShowPager = this.options.ele.data('showpager') ? $.trim(this.options.ele.data('showpager')) : this.options.showpager;
                this.tdwidth = this.options.ele.data('tdwidth') ? $.trim(this.options.ele.data('tdwidth')) : this.options.tdwidth;
                this.isCheckbox = this.options.ele.data('checkbox') ? $.trim(this.options.ele.data('checkbox')) : this.options.isCheckbox;
                this.isEvent = this.options.ele.data('isevent') ? $.trim(this.options.ele.data('isevent')) : this.options.isEvent;
                this.joinStr = this.options.ele.data('joinstr') ? $.trim(this.options.ele.data('joinstr')) : this.options.joinStr;
                this.isalllist = this.options.ele.data('isalllist') ? $.trim(this.options.ele.data('isalllist')) : this.options.isalllist;
                this.isalllist_value = this.options.ele.data('isalllist_value') ? $.trim(this.options.ele.data('isalllist_value')) : this.options.isalllist_value;
                this.hideValue = this.options.ele.data('hidevalue') ? $.trim(this.options.ele.data('hidevalue')) : this.options.hideValue;
                this.pagingSelect = this.options.ele.data('pagingselect') ? $.trim(this.options.ele.data('pagingselect')) : this.options.pagingSelect;
                this.notDataIsShow = this.options.ele.data('notdataisshow') ? $.trim(this.options.ele.data('notdataisshow')) : this.options.notDataIsShow;
                this.isblur = this.options.ele.data('blur') ? $.trim(this.options.ele.data('blur')) : this.options.isblur;
            },

            /**
             * 初始化查询参数
             */
            _initAppointInput() {
                if (this.appointInput) {
                    var len = this.appointInput.length;
                    len > 0 && (this.v = $.trim($('#' + this.appointInput[0]).val()).replace("*", "%"));
                    len > 1 && (this.otherCondition = $.trim($('#' + this.appointInput[1]).val()).replace("*", "%"));
                } else {
                    if (this.valtoinput == '2') {
                        this.otherCondition = $.trim(this.options.ele.val()).replace("*", "%");
                    } else {
                        this.v = $.trim(this.options.ele.val()).replace("*", "%");
                    }
                }
            },

            /**
             * 初始化查询参数
             */
            _initPrecondition() {
                var ids = this.precondition.split(',');
                this.precondition = '';
                for (var i = 0, len = ids.length; i < len; i++) {
                    this.preconditionValue += $.trim($('#' + ids[i]).val()) + ',';
                    this.precondition += $.trim($('#' + ids[i]).attr('name')) + ',';
                }
                this.precondition = this.precondition.length > 0 ? this.precondition.substring(0, this.precondition.length - 1) : '';
                this.preconditionValue = this.preconditionValue.length > 0 ? this.preconditionValue.substring(0, this.preconditionValue.length - 1) : '';
            },

            /**
             * 初始化查询成功后参数ID
             * @param data
             */
            _initSuccessData(data) {
                this.cache_data = {},
                    name = '';
                for (var i = 0, len = data.length; i < len; i++) {
                    data[i]['id'] = !data[i]['id'] ? i + '_' : data[i]['id'].replace(/[\/\.%!?&=]/g, "") + '_';
                    this.cache_data[data[i]['id']] = data[i];
                }
            },

            /**
             * 多选翻页初始化参数
             * @param id
             * @param type
             */
            _initPagingSelectData(id, type) {
                if (!id || id == '')
                    return;
                if (type) {
                    !this.cache_select_data[id] && (this.cache_select_data[id] = this.cache_data[id] || false);
                } else {
                    delete this.cache_select_data[id];
                }
            },

            /**
             * 多选翻页初始化选中项
             */
            _initCheckboxData() {
                this.cache_select_data && $.each(this.cache_select_data, () => {
                    $('#checkbox_db_' + this.id).prop('checked', true);
                });
            },

            _showTable() {
                //if(this.v != ''){
                /*	this._openAlert();
                }else{*/
                this._initAjax();
                //}
            },

            /**
             * 首次ajax查询，判断是否打开模态窗口
             */
            _initAjax() {
                var _this = this;
                if (!http)
                    http = require('./http');
                http.post({
                    apiName: this.options.apiName,
                    data: {
                        precondition: this.precondition,
                        preconditionValue: this.preconditionValue,
                        manySelect: this.isCheckbox,
                        hideValue: this.hideValue,
                        otherCondition: this.otherCondition,
                        rowsPerPage: this.options.page_size,
                        pageNo: 0,
                        fieldValue: this.v,
                        codeType: this.options.codeType
                    },
                    success(data) {
                        if ((data.datas.recordsTotal == 1 && _this.options.stopOnly != '1') || (data.datas.recordsTotal == 0 && _this.notDataIsShow != '1')) {
                            var v, c;
                            for (var n in _this.o_lable) {
                                v = data.datas.row[0] ? data.datas.row[0]['code' + n] : '';
                                c = $('#' + _this.o_lable[n]);
                                c && c.length > 0 && c.val(v || '');
                            }
                            _this.destroy();
                        } else {
                            _this._openAlert(data.datas);
                        }
                    },
                });
            },

            /**
             * 打开模态窗口，初始化jq对象
             * @param $obj
             */
            _initTableJqObject($obj) {
                this.jq_table = $obj.find('table.alerttable');
                this.jq_panelsearch = $obj.find('div.panelsearch');
                this.jq_paging_select = this.jq_panelsearch.find('ul.paging-select');
                this.jq_div = this.jq_table.closest('div.col-md-12');
                this.jq_form = $obj.find('form.searchform');
                this.jq_search = this.jq_form.find('button.searchbutton');
                this.jq_tbody = this.jq_table.find('tbody');
                this.jq_tablepager = $obj.find('div.tablepager');
                this.jq_oneinput = this.jq_form.find('input:eq(0)');
                this.toolbar = this.jq_panelsearch.find('div.btn-toolbar');
                this.jq_clear = this.toolbar.find('.btn-clear');
            },


            /**
             * 打开模态窗口
             * @param data
             */
            _openAlert(data) {
                var _this = this,
                    style_conter = '',

                    d = {
                        num: this.search_input_num,
                        tdwidth: this.tdwidth,
                        isCheckbox: this.isCheckbox,
                        input_name: this.search_input_name,
                        th_name: this.show_th_name,
                        isalllist: this.isalllist,
                        frist: this.v,
                        two: this.otherCondition,
                        pagingSelect: this.pagingSelect
                    };
                if (this.isShowPager != '2' || data.recordsTotal > 10) {
                    style_conter = 'padding-bottom: 0px;';
                }

                this.dialog = dialog.formData({
                    title: this.options.title,
                    content: template.parse(DbClick.DBCLICKTP, d),
                    isShowFooter: false,
                    titlePadding: 'padding-bottom: 2px; padding-top: 2px',
                    dialogSize: '',
                    modal_width: '490',
                    close_right: this.isReadonly,
                    position: this.pagingSelect == '1' ? 'position' : 'position',
                    style_conter: style_conter,
                    toTop: false,
                    modalDialogTop: this._computTop() + 'px',
                    onCreateAfter() {
                        _this._onCreatedBindEvent(this);
                        _this._showPage(0, data);
                    },
                    onCloseBefore() {
                        _this.destroy();
                    }
                });
                var $s = this.jq_form.find('input:first');
                $s.length > 0 ? $s.focus() : this.jq_clear.focus();
            },

            /**
             * 打开模态窗口绑定事件
             * @param obj
             */
            _onCreatedBindEvent(obj) {
                var _this = this,
                    $obj = $('#' + obj.id),
                    $this;
                this._initTableJqObject($obj);
                this.options.isForView != '1' && this.isCheckbox != '2' && this.jq_tbody.on('click', 'tr', () => {
                    $this = $(this);
                    var str_id = $this.data('id');

                    if (!str_id || str_id == '')
                        return;
                    if (_this.isEvent == '2') {
                        _this.options.ele.trigger('selectExtend', _this.cache_data[str_id || ''], '0');
                    } else {
                        if ($.isFunction(_this.options.callSelect)) {
                            _this.options.callSelect.call(_this, _this.cache_data[str_id || '']);
                        } else {
                            var v, c;
                            for (var n in _this.o_lable) {
                                v = _this.cache_data[str_id]['code' + n];
                                c = $('#' + _this.o_lable[n]);
                                c && c.length > 0 && c.val(v || '');
                            }
                        }
                    }
                    _this.isblur == '1' && _this.options.ele.select().trigger('blur');
                    _this.options.ele.trigger('change');
                    _this.dialog._close();
                    _this.destroy();
                });
                this.toolbar.on('click', 'button.sure', () => {
                    var $check = _this.jq_tbody.find('input[type=checkbox]:checked'),
                        d = [];
                    if (_this.pagingSelect == '1') {
                        $.each(_this.cache_select_data, () => {
                            d.push(this);
                        });
                    } else {
                        if ($check.length == 0) {
                            return;
                        }
                        $check.each(() => {
                            $this = $(this);
                            d.push(_this.cache_data[$this.data('id')]);
                        });
                    }
                    if (_this.isEvent == '2') {
                        _this.options.ele.trigger('selectExtend', d, '1');
                    } else {
                        if ($.isFunction(_this.options.callSelect)) {
                            _this.options.callSelect.call(_this, d);
                        } else {
                            _this._computSelectData(d);
                        }
                    }
                    _this.isblur == '1' && _this.options.ele.select().trigger('blur');
                    _this.options.ele.trigger('change');
                    _this.dialog._close();
                    _this.destroy();
                }).on('click', 'button.all', () => {
                    var c;
                    for (var n in _this.o_lable) {
                        c = $('#' + _this.o_lable[n]);
                        c && c.length > 0 && c.val(_this.isalllist_value);

                    }
                    _this.isblur == '1' && _this.options.ele.select().trigger('blur');
                    _this.options.ele.trigger('change');
                    _this.dialog._close();
                    _this.destroy();
                });
                this.jq_search.on('click', () => {
                    _this._showPage(0);
                });

                this.isCheckbox == '2' && this._tableAllSelect();
                this.isCheckbox == '2' && this.pagingSelect == '1' && this.jq_paging_select.on('click', 'a.cbDelete', () => {
                    var $li = $(this).closest('li');
                    $li.remove();
                    $('#checkbox_db_' + $li.data('id')).prop('checked', false);
                    _this._initButton();
                });
                this.jq_clear.on('click', () => {
                    var c;
                    for (var n in _this.o_lable) {
                        c = $('#' + _this.o_lable[n]);
                        c && c.length > 0 && c.val('');
                    }
                    _this.isblur == '1' && _this.options.ele.select().trigger('blur');
                    _this.options.ele.trigger('change');
                    _this.dialog._close();
                    _this.destroy();
                });
            },

            /**
             * 
             */
            _bindEven() {
                var _this = this;
                this.jq_search.on('click', () => {
                    _this._showPage(0);
                });
            },

            /**
             * 初始化按钮
             */
            _initButton() {
                var $allselect = this.jq_table.find('th').find('input[name=checkAll]');
                $allselect.is(':checked') && $allselect.prop('checked', false);
                if (this.pagingSelect == '1' && this.jq_paging_select.find('li').length > 0) {
                    return;
                }
                this.toolbar.find('.ck').addClass('disabled').prop('disabled', true);
            },

            /**
             * 显示table
             */
            _showPage(num, o_data) {
                var _this = this;
                this.isCheckbox == '2' && this._initButton();
                if (!o_data) {
                    this._computInput();
                    if (!http)
                        http = require('./http');
                    http.post({
                        apiName: this.options.apiName,
                        data: {
                            precondition: this.precondition,
                            preconditionValue: this.preconditionValue,
                            otherCondition: this.otherCondition,
                            hideValue: this.hideValue,
                            manySelect: this.isCheckbox,
                            fieldValue: this.v,
                            rowsPerPage: this.options.page_size,
                            pageNo: num * this.options.page_size,
                            codeType: this.options.codeType
                        },
                        beforeSend(b, c) {
                            _this.jq_search.button('loading');
                        },
                        complete(b, c) {
                            _this.jq_search.button('reset');
                        },
                        success(data) {
                            data.datas.data && _this._searchSuccess(data.datas.data, num);
                        }
                    });
                } else {
                    this._searchSuccess(o_data.data, num);
                }
            },

            /**
             * 第二次查询成功后执行的操作
             * @param data
             * @param num
             */
            _searchSuccess(data, num) {
                var _this = this;
                _this.options.page_index = num;
                if (data.recordsTotal > 0) {
                    this._initSuccessData(data.row);
                    //实例分页对象
                    if (this.isShowPager != '2' || data.recordsTotal > 10) {
                        if (!_this.pager) {
                            _this.pager = pager.show({
                                container: _this.jq_tablepager,
                                total: data.recordsTotal,
                                page_size: _this.options.page_size,
                                toTop: false,
                                isSelect: false,
                                isJump: false,
                                //tpType : '1',
                                //isPaning: _this.options.view.isPaning,
                                onPageChanged(page, page_size) {
                                    if (page_size) {
                                        _this.options.page_size = page_size;
                                    }
                                    _this._showPage(parseInt(page) || 0);
                                }
                            });
                        } else {
                            _this.pager.setPageTotal(data.recordsTotal);
                        }
                        _this.jq_tablepager.closest('div.dt-bottom-row').show();
                        //显示页脚
                        _this.pager.showPager(num);
                    } else {
                        _this.jq_tablepager.closest('div.dt-bottom-row').hide();
                    }
                    data.isCheckbox = this.isCheckbox;
                    var tp = template.parse(DbClick.DBCLICKTRTP, data);
                    switch (this.options.animation) {
                        case 'fade':
                            _this.jq_tbody.css({
                                display: 'none'
                            }).html(tp).delay(50).fadeIn('slow');
                            break;
                        case 'slide':
                            _this.jq_tbody.css({
                                display: 'none'
                            }).html(tp).delay(50).slideDown('slow');
                        case 'fadeTo':
                            _this.jq_tbody.css({
                                display: 'none'
                            }).html(tp).delay(50).fadeTo("normal", 1);
                            break;
                        case 'left':
                            _this.jq_tbody.css({
                                display: 'none'
                            }).html(tp).delay(50).show(600);
                            break;
                        default:
                            _this.jq_tbody.css({
                                display: 'none'
                            }).html(tp).delay(50).show();
                            break;
                    }
                    _this.pagingSelect == '1' && _this._initCheckboxData();
                } else {
                    _this.jq_tbody.html('<tr><td colspan="3">' + UtilMsg.table_not_data + '</td></tr>');
                }
            },

            /**
             * 计算多选-确认的数据
             * @param obj
             */
            _computSelectData(obj) {
                var d = {},
                    s, v, c;
                for (var i = 0, len = obj.length; i < len; i++) {
                    for (var n in this.o_lable) {
                        s = 'code' + n;
                        if (!d[s])
                            d[s] = '';
                        d[s] += obj[i][s] + this.joinStr;
                        if (i == (len - 1)) {
                            c = $('#' + this.o_lable[n]);
                            c && c.length > 0 && c.val(d[s].substring(0, (d[s].length - 1)));
                        }
                    }
                }
            },

            /**
             * 全选
             */
            _tableAllSelect() {
                var _this = this,
                    $allselect = this.jq_table.find('th').find('input[name=checkAll]'),
                    $input;
                if ($allselect.length > 0) {
                    this.jq_tbody.on('click', 'input[type=checkbox]', (event, a, b) => {
                        if (event.hasOwnProperty('originalEvent')) {
                            var $this = $(this),
                                $ck = _this.toolbar.find('.ck');
                            $allselect.is(':checked') && $allselect.prop('checked', false);
                            if ($ck.length > 0) {
                                if (_this.pagingSelect == '1') {
                                    _this._createMuchSelect($this, $this.is(':checked'));
                                    $input = _this.jq_paging_select.find('li');
                                } else {
                                    $input = _this.jq_tbody.find('input:checked');
                                }
                                if ($input.length > 0) {
                                    $ck.removeClass('disabled').prop('disabled', false);
                                } else {
                                    $ck.addClass('disabled').prop('disabled', true);
                                }
                            }
                        }
                    });
                    $allselect.on('click', () => {
                        var $this = $(this),
                            $ck = _this.toolbar.find('.ck'),
                            $input = _this.jq_tbody.find('input[type=checkbox]');
                        if ($this.is(':checked')) {
                            $input.prop('checked', true);
                            if ($ck.length > 0) {
                                if (_this.pagingSelect == '1') {
                                    _this._createMuchSelect($input, true);
                                    if (_this.jq_paging_select.find('li').length == 0)
                                        return;
                                }
                                $ck.removeClass('disabled').prop('disabled', false);
                            }
                        } else {
                            $input.prop('checked', false);
                            if ($ck.length > 0) {
                                if (_this.pagingSelect == '1') {
                                    _this._createMuchSelect($input, false);
                                    if (_this.jq_paging_select.find('li').length > 0)
                                        return;
                                }
                                $ck.addClass('disabled').prop('disabled', true);
                            }
                        }
                    });
                }
            },

            /**
             * 创建翻页多选标签
             * @param objs
             * @param type
             */
            _createMuchSelect(objs, type) {
                if (!objs || objs.length == 0)
                    return;

                var _this = this,
                    d = [],
                    $this, id;

                objs.each(() => {
                    $this = $(this);
                    id = $this.data('id');
                    if (!type) {
                        $('#li_' + id).remove();
                        _this._initPagingSelectData(id, false);
                    } else {
                        $('#li_' + id).remove();
                        d.push({ id: id, name: $this.data('name') });
                        _this._initPagingSelectData(id, true);
                    }
                });
                type && this.jq_paging_select.append(template.parse(DbClick.ULTP, { data: d }));
            },

            /**
             * 
             */
            _computInput() {
                this.v = $.trim(this.jq_form.find('input:first').val());
                this.otherCondition = $.trim(this.jq_form.find('input:eq(1)').val());
            },

            /**
             * 计算模态窗口位置
             * @returns
             */
            _computTop() {
                var offset = this.options.ele.offset(),
                    top = offset.top - 260;

                return top < 50 ? offset.top : top;
            },

            /**
             * 销毁
             * @method destroy
             **/
            destroy() {
                try {
                    $.isFunction(this.options.callBackClose) && this.options.callBackClose.call(this);
                    Util.dbclickArea && (Util.dbclickArea = null);
                    this.dialog = null;
                    this.jq_table.remove(),
                        this.jq_table = null;
                    this.options = null;
                } catch (_) {}
            }
        }

        return DbClick;
    });
