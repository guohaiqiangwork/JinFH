/**
 * 数据列表
 * @module data_model
 * @author czl
 * @time 2016/1/20
 */
define(['jquery', './template', './dialog', './http', '../service/util_service'],
    ($, template, dialog, http, util_service) => {

        var DataModel = function(opt) {

            /**
             * DataModel的选项
             * @type Object
             **/
            this.options = $.extend({
                apiName: '', //请求apiName
                columns: null, //数据模板
                data: null,
                isDelete: true,
                isDeleteLast: true, //默认值：true 最后一行数据是否允许删除 true:允许，false:不允许
                isAddBtn: true, //默认值：true 是否显示增加按钮  true:显示，false:不显示
                isRefreshBtn: false, //默认值：false 是否显示刷新按钮  true:显示，false:不显示
                isSort: false, //默认值：false 是否删除数据后重新排序  true:排序，false:不排序
                isRequestData: true, //默认值：true 是否请求数据  true:请求，false:不请求
                isSortName: false, //默认值：false 是否name重新进行排序  true:是，false:否
                isDefaultRow: false, //默认值：false 没有数据时是否默认一行  true:是，false:否
                $container: null, //jq容器
                $table_plus: null,
                $container: null,
                $table_plus: null,
                $table_refresh: null,
                $tbody: null,
                $thead: null,
                isSortAttrName: 'name'
            }, opt || {});

            this.lock = true;
        };

        DataModel.TABLE_TP = '<div class="col-lg-12 col-md-12 col-xs-12">\
                                        <table class="table table-bordered table-condensed table-model">\
                                            <thead>\
                                                <tr><%=trs%></tr>\
                                            </thead>\
                                            <tbody style="opacity: 1;"></tbody>\
                                        </table>\
                                    </div>\
                                    <div class="col-lg-12 col-md-12 col-xs-12 tool"></div>';

        /**
         * DataModel的静态函数
         * @method show
         */
        DataModel.show = function(options) {
            var data = new DataModel(options);
            data._initDataModel();
            return data;
        };

        /**
         * 数据表格的原型对象
         * @static
         */
        DataModel.prototype = {

            /**
             * 初始化数据表格
             */
            _initDataModel() {
                this._createTableData();
                this._organizeData();
                this._initBtn();
                this._initData();
            },

            _initData() {
                this._bindEvent();
                ((this.options.url && this.options.url != '' && this.options.isRequestData) || this.options.data) && this._showPage();
                this.lock && this.options.$table_plus && this.options.$table_plus.length > 0 && this.options.$table_plus.prop('disabled', true);

                this.options.isDefaultRow && (!this.options.data || this.options.data.length < 1) && util_service._initPage($(this._initTemplate([{}], true)).appendTo(this.options.$tbody))
            },

            /**
             * 整理数据
             */
            _organizeData() {
                this.options.$tool = this.options.$tool ? this.options.$tool : this.options.$container.find('div.tool'),
                    this.options.$tbody = this.options.$tbody ? this.options.$tbody : this.options.$container.find('tbody');
                this.options.$thead = this.options.$thead ? this.options.$thead : this.options.$container.find('thead');
                this.lock = this.options.url && this.options.url != '' ? true : false;
            },

            _initBtn() {
                if (!this.options.$tool || this.options.$tool.length == 0)
                    return;
                this.options.isAddBtn &&
                    (this.options.$table_plus = $('<button type="button" class="btn btn-primary btn-sm"><i class="fa fa-fw fa-plus"></i></button>')
                        .appendTo(this.options.$tool));
                this.options.isRefreshBtn && this.options.url && this.options.url != '' &&
                    (this.options.$table_refresh = $('<button type="button" class="btn btn-default btn-sm" style="margin-left: 5px;"><i class="fa fa-fw fa-refresh"></i></button>')
                        .appendTo(this.options.$tool));
                
            },

            _initSort() {
                this.options.$tbody.find('td.row').each((i, n) => {
                    $(n).find('span').text(i + 1);
                });
                let _this = this,
                    _t;
                this.options.isSortName && this.options.$tbody.find('tr').each((i, n) => {
                    $(n).find('input,select').each((j, t) => {
                        _t = $(t);
                        _t.attr(this.options.isSortAttrName, _t.data('name').replace('#', i));
                    });
                });
            },

            /**
             * 创建模数据表格
             */
            _createTableData() {

                let $div = this.options.$container,
                    trs = '',
                    d = {};

                for (let j = 0, length = this.options.columns.length; j < length; j++) {
                    d = this.options.columns[j];
                    trs += '<th style="' + (d.style || '') + '">' + (d.label || '') + '</th>';
                }


                $div.html(template.parse(DataModel.TABLE_TP, { trs: trs }));

            },

            _bindEvent() {
                var _this = this;

                this.options.$table_plus && this.options.$table_plus.on('click', () => {
                    !this.lock && util_service._initPage($(_this._initTemplate([{}], true)).appendTo(_this.options.$tbody));
                });

                this.options.isDelete && this.options.$tbody && this.options.$tbody.on('click', 'button.table-delete', (n) => {
                    if (!_this.options.isDeleteLast && _this.options.$tbody.find('tr').length == 1) {
                        dialog.alert({
                            content: '最后一行数据不允许删除'
                        });
                        return;
                    }

                    $(n.currentTarget).closest('tr').remove();
                    _this.options.isSort && _this._initSort();
                });

                this.options.$table_refresh && this.options.$table_refresh.on('click', () => {
                    dialog.confirm({
                        content: '是否刷新表格，刷新将清空当前数据',
                        onSuerBefore() {
                            _this._showPage();
                        }
                    });
                });
            },

            _showPage() {
                var _this = this;
                if (!this.options.data) {
                    http.post({
                        apiName: this.options.apiName,
                        beforeSend(b, c) {
                            _this.options.$tbody.html('<tr><td colspan="15"><i class="fa fa-cog fa-spin"></i> ' + UtilMsg.loading + '...</td></tr>');
                        },
                        success(data) {
                            _this._searchSuccess(data.datas);
                            _this.lock = false;
                            _this.options.$table_plus && _this.options.$table_plus.length > 0 && _this.options.$table_plus.prop('disabled', false);
                        },
                        error(msg, b, c, d) {
                            _this.options.$tbody.html('<tr><td colspan="15"><i class="fa fa-warning txt-color-orangeDark"></i> ' + msg + '</td></tr>');
                        }
                    });
                } else {
                    _this._searchSuccess({
                        data: this.options.data,
                        code: '1'
                    });
                    _this.lock = false;
                    _this.options.$table_plus && _this.options.$table_plus.length > 0 && _this.options.$table_plus.prop('disabled', false);
                }

            },

            _searchSuccess(data) {
                if (data.code && data.code !== '1') {
                    this.options.$tbody.html('<tr><td colspan="15">' + (data.msg && data.msg != '' ? data.msg : '数据异常') + '</td></tr>');
                    return;
                }
                if (data.data && data.data.length > 0) {
                    var tp = this._initTemplate(data.data);
                    if ($.browsers == 'I') {
                        this.options.$tbody.html(tp);
                    } else {
                        this.options.$tbody.css({
                            display: 'none'
                        }).html(tp).delay(50).fadeTo("normal", 1);
                    }
                    util_service._initPage(this.options.$tbody);
                    $.isFunction(this.options.showCompletedCall) && this.options.showCompletedCall.call(this, data);
                } else {
                    !this.options.isDefaultRow && this.options.$tbody.html('<tr><td colspan="15">没有数据...</td></tr>');
                }
            },

            _initTemplate(data, flag) {
                var datas = [],
                    d = {},
                    n = flag ? this.options.$tbody.find('tr').length || 0 : 0,
                    td, obj;

                for (var i = 0, len = data.length; i < len; i++) {
                    for (var j = 0, length = this.options.columns.length; j < length; j++) {
                        d = this.options.columns[j];
                        if (!d)
                            continue;
                        if (j == 0) {
                            datas.push('<tr>');
                            if (this.options) {
                                td = '<td class="row">';
                            } else {
                                td = this._cTd(d);
                            }

                        } else {
                            td = this._cTd(d);
                        }

                        if (!d.data) {
                            if (!d.render) {
                                datas.push(td + '</td>');
                            } else {
                                $.isFunction(d.render) &&
                                    datas.push(td + (d.render.call(this, '', data[i] || {}, i + n) || '&nbsp;') + '</td>');
                            }

                        } else {
                            if ($.isFunction(d.render)) {
                                datas.push(td + (d.render.call(this, data[i][d.data] || '', data[i] || {}, i + n) || '&nbsp;') + '</td>');
                            } else {
                                if (data[i][d.data] != '0') {
                                    obj = data[i][d.data] || '&nbsp;';
                                } else {
                                    obj = '0';
                                }
                                datas.push(td + obj + '</td>');
                            }
                        }
                        if (j == length) {
                            datas.push('</tr>')
                        }
                    }
                }
                return datas.join('');
            },

            _cTd(d) {
                var td;
                if (d.align && d.align == 'right') {
                    td = '<td style="text-align: right;">';
                } else {
                    td = '<td>';
                }
                return td;
            },

            getTbody() {
                return this.options.$tbody;
            }

        };

        return DataModel;
    });
