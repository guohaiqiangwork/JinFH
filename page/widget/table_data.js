/**
 * 数据表格
 * @module table_data
 * @author czl
 * @time 2015/10/29
 */
define(['jquery', './template', './dialog', '../service/util_service', './http', 'route_config'],
    ($, template, dialog, util_service, http, route_config) => {

        var TableData = function(opt) {

            /**
             * TableData的选项
             * @type Object
             **/
            this.options = $.extend({
                view: {
                    pager: null, //分页对象
                    table_colnum: 0,
                    columns: [],
                    bts: [],
                    apiName: '', //查询url
                    table_tpl: '',
                    exporturl: null, //导出url
                    isAuto: false,
                    isExport: false, //是否要导出
                    isRightAway: false, //是否自动查询
                    exportCurrent: false, //导出当前页， true显示
                    exportAll: false, //导出查询结果，false显示
                    isPaning: true,
                    btnContent: null
                },
                list: {
                    sort_name: 'sort.id', //默认排序属性
                    sort: 'asc', //默认排序类型
                    page_size: 10, //每页默认行数
                    page_index: 0, //当前页
                    total_count: -1 //总数
                },
                server: {
                    isTdEvent: false,
                    isSort: true,
                    isAllSelect: true,
                    isPager: true,
                    isPagerShow: true //是否显示页脚
                },
                jq_object: {
                    $pan: $('#search-panel'),
                    $tablepager: null,
                    $table: null,
                    $tbody: null,
                    $toolbar: null,
                    $form: null,
                    $search: null,
                    $all_checkbox: null,
                    $ck: null
                },
                callback: {
                    callSearch() { //查询运行之前执行的方法，返回false终止查询，返回true正常执行
                        return true;
                    },
                    rowCallback: null,
                    allSelectCall: null,
                    showTableCall: null, //为null则组件渲染数据表格，为回调方法时交由回调方法执行
                    showCompletedCall: null //渲染数据表格完成后执行的方法
                }
            }, opt || {});

            /**
             * 导出按钮
             * @type Object
             **/
            this.$export = null;

            this.cacheColumns = [],
                this.isUserTp = false;
            this.col = [];
            this.order_index = 0;
        };

        /**
         * TableData的静态函数，标准：分页
         * @method show
         */
        TableData.show = function(options) {
            var table = new TableData(options);
            table._initTableData();
            return table;
        };

        /**
         * 数据表格的原型对象
         * @static
         */
        TableData.prototype = {

            /**
             * 初始化数据表格
             */
            _initTableData() {
                this._createTable();
                this._organizeData();
                this._createTableData();
            },

            /**
             * 初始化数据表格
             */
            _createTableData() {
                this._bindEvent();
                !this.isUserTp && this._initColumns();
                this.options.server.isSort && this._tableSort();
                this.options.server.isAllSelect && this._initAllSelect();
                this.options.view.isRightAway && this._showPage(0);
            },

            /**
             * 创建模数据表格
             */
            _createTable() {
                let $div = this.options.jq_object.$pan.find('div.list-table'),
                    trs = '',
                    bts = '',
                    d = {},
                    init, ck;

                if (this.options.view.btnContent)
                    bts = this.options.view.btnContent;
                if (this.options.view.bts && this.options.view.bts.length > 0) {
                    for (let j = 0, length = this.options.view.bts.length; j < length; j++) {
                        d = this.options.view.bts[j];
                        init = d.isCustom ? '' : ' init';
                        ck = d.isSelect ? ' ck ' : '';
                        bts += '<button id="' + (d.id || '') + '" data-router="' + (d.dataRouter || '') + '" data-alert-title="' + d.label + '"\
                        data-api-name="' + (d.dataApiName || '') + '" class="btn btn-danger btn-sm ' + ck + init + '" data-type="' + (d.dataType || '') + '">' + d.label + '</button>&nbsp;&nbsp;';
                    }
                }

                for (let j = 0, length = this.options.view.columns.length; j < length; j++) {
                    d = this.options.view.columns[j];
                    trs += '<th style="' + (d.style || '') + '">' + (d.label || '') + '</th>';
                }

                $div.html(template.parse(TableData.TABLE_TP, { bts: bts, trs: trs }));
            },

            /**
             * 整理数据
             */
            _organizeData() {
                this.isUserTp = this.options.view.columns && this.options.view.columns.length > 0 ? false : true,
                    this.options.jq_object.$form = this.options.jq_object.$form ? this.options.jq_object.$form : this.options.jq_object.$pan.find('form.searchform'),
                    this.options.jq_object.$tablepager = this.options.jq_object.$tablepager ? this.options.jq_object.$tablepager : this.options.jq_object.$pan.find('div.tablepager'),
                    this.options.jq_object.$table = this.options.jq_object.$table ? this.options.jq_object.$table : this.options.jq_object.$pan.find('table.searchtable'),
                    this.options.jq_object.$tbody = this.options.jq_object.$tbody ? this.options.jq_object.$tbody : this.options.jq_object.$table.find('tbody'),
                    this.options.jq_object.$thead = this.options.jq_object.$thead ? this.options.jq_object.$thead : this.options.jq_object.$table.find('thead'),
                    this.options.jq_object.$search = this.options.jq_object.$search ? this.options.jq_object.$search : this.options.jq_object.$form.find('.btn-search'),
                    this.options.jq_object.$toolbar = this.options.jq_object.$toolbar ? this.options.jq_object.$toolbar : this.options.jq_object.$pan.find('div.mailbox-controls');
                this._setTableDataColnum(this.options.jq_object.$thead.find('th').length);
            },

            _bindEvent() {
                !this.options.view.isAuto && this.options.jq_object.$search.on('click', () => {
                    if ($.isFunction(this.options.callback.callSearch) && !this.options.callback.callSearch.call(this)) {
                        return;
                    }
                    this._showPage(0, { showLoad: $(this) });
                });

                this.options.jq_object.$toolbar.find('button.init').each((i, n) => {
                    this._handleToolbarBtn($(n));
                })
            },

            _handleToolbarBtn($obj) {

                switch ($obj.data('type')) {

                    case 'create':
                        //绑定新增
                        $obj.on('click',
                            $.proxy(this._showAddRow, this, {
                                router: $obj.data('router'),
                                title: $obj.data('alert-title') || '新增'
                            }));
                        break;
                    case 'view':
                        //绑定查看
                        $obj.on('click',
                            $.proxy(this._showViewEditRow, this, {
                                router: $obj.data('router'),
                                r_type: 'view',
                                title: $obj.data('alert-title') || '查看',
                                id: $obj.data('id')
                            }));

                        break;
                    case 'update':
                        //绑定修改
                        $obj.on('click',
                            $.proxy(this._showViewEditRow, this, {
                                router: $obj.data('router'),
                                r_type: 'update',
                                title: $obj.data('alert-title') || '修改',
                                id: $obj.data('id')
                            }));
                        break;
                    case 'delete':
                        //绑定删除
                        $obj.on('click',
                            $.proxy(this._deleteRows, this, {
                                api_name: $obj.data('api-name')
                            }));
                        break;
                    default:
                        dialog.alert({
                            content: '请指定按钮操作类型。'
                        });
                        break;

                }
            },

            /**
             * 弹出模态窗口-显示新增页面
             */
            _showAddRow(obj) {
                var options = $.extend({
                    title: '新增记录', //模态窗口标题
                    router: '' //请求路由
                }, obj || {});

                if (options.router === '') {
                    dialog.alert({
                        content: '请设置路由。'
                    });
                    return;
                }

                dialog.page({
                    title: options.title,
                    stateParams: { pageType: 'add' },
                    type: 'GET',
                    loadUrl: options.router
                });
            },

            /**
             * 弹出模态窗口-显示查看和修改页面
             */
            _showViewEditRow(obj) {
                var options = $.extend({
                    title: '内容', //模态窗口标题
                    type: '0', //0：多选框；1：单选框
                    router: '', //请求地址
                    r_type: 'GET'
                }, obj || {});

                if (options.router === '') {
                    dialog.alert({
                        content: '请设置路由。'
                    });
                    return;
                }

                var checkData = this._getTableCheckData(options.type);

                if (checkData === '') {
                    dialog.alert({
                        content: '请选择要操作的记录。'
                    });
                    return false;
                }

                if (checkData.split(",").length > 1) {
                    dialog.alert({
                        content: '只能选择一条记录。'
                    });
                    return false;
                }

                dialog.page({
                    title: options.title,
                    type: 'GET',
                    stateParams: { pageType: options.r_type, id: checkData },
                    loadUrl: options.router,
                    r_data: { checkData: checkData }
                });
            },

            /**
             * 删除记录
             */
            _deleteRows(obj) {
                var options = $.extend({
                        type: '0', //0：多选框；1：单选框
                        api_name: '' //请求地址
                    }, obj || {}),
                    _this = this;

                if (options.api_name === '') {
                    dialog.alert({
                        content: '请设置apiName。'
                    });
                    return;
                }

                var checkData = this._getTableCheckData(options.type);

                if (!checkData || checkData === '') {
                    dialog.alert({
                        content: '请选择要删除的记录。'
                    });
                    return false;
                }
                dialog.confirm({
                    content: '确定删除吗?',
                    onSuerBefore() {
                        http.post({
                            apiName: options.api_name,
                            isMask: true,
                            urlParams: { ids: checkData },
                            success(data) {
                                dialog.alert({
                                    content: '删除成功。'
                                });
                                _this._showPage(0);
                            }
                        });
                    }
                });
            },

            _showPage(num, opt) {
                var _this = this;
                this.options.server.isAllSelect && this._initButton();
                opt && !!opt.auto && (num = parseInt(this.options.list.page_index));
                opt = opt ? opt : {};
                !opt.showLoad && (opt.showLoad = this.options.jq_object.$search);
                var urlParams = new Array();
                http.post({
                    apiName: this.options.view.apiName,
                    cache: false,
                    contentType: 'application/x-www-form-urlencoded',
                    ajaxType: '4',
                    xhrFields: {
                        withCredentials: true
                    },
                    data: util_service.serializeObject1($.merge($.merge(
                        [{ name: '_pageNo', value: num + 1 }, { name: '_pageSize', value: this.options.list.page_size }, { name: 'order[0][dir]', value: this.options.list.sort }, { name: 'order[0][column]', value: this.order_index }],
                        this.options.jq_object.$form.serializeArray()
                    ), this.col)),
                    //urlParams:urlParams,
                    isMask: true,
                    $btnShowLoad: opt.showLoad,
                    beforeSend(b, c) {
                        _this.options.jq_object.$tbody.html('<tr><td colspan="15"><i class="fa fa-cog fa-spin"></i> ' + UtilMsg.loading + '...</td></tr>');
                    },
                    success(data) {
                        _this._searchSuccess(data, num, opt);
                    },
                    error(msg, b, c, d) {
                        _this.options.jq_object.$tbody.html('<tr><td colspan="15"><i class="fa fa-warning txt-color-orangeDark"></i> ' + msg + '</td></tr>');
                    }
                });
                return this;
            },

            _searchSuccess(data, num, opt) {
                var _this = this,
                    _b = data.status == 200 || data.status == 0 ? true : false;
                if (!_b) {
                    this.options.view.isExport && this.$export && this.$export.length > 0 && this.$export.hide();
                    this.options.jq_object.$tbody.html('<tr><td colspan="' + this.options.view.table_colnum + '">' + (data.msg && data.msg != '' ? data.msg : data.message) + '</td></tr>');
                    return;
                }

                data.data = typeof(data.data) == 'object' ? data.data : JSON.parse(data.data);
                //TODO:this.options.list.total_count = data.data.totalCount;
                if (this.options.server.isPager) {
                    this.options.list.page_index = num;
                    //实例分页对象
                    if (!this.options.view.pager) {
                        this.options.view.pager = Pager.show({
                            container: this.options.jq_object.$tablepager,
                            total: data.data.totalCount,
                            page_size: this.options.list.page_size,
                            isPaning: this.options.view.isPaning,
                            onPageChanged(page, page_size) {
                                if (page_size) {
                                    _this.options.list.page_size = page_size;
                                }
                                _this._showPage(parseInt(page));
                            }
                        });
                        this.options.jq_object.$tablepager.closest('div.dt-bottom-row').show();
                    } else {
                        this.options.view.pager.setPageTotal(data.data.totalCount);
                    }
                    //显示页脚
                    this.options.view.pager.showPager(num);
                } else {
                    if (this.options.server.isPagerShow) {
                        this.options.jq_object.$tablepager.closest('div.dt-bottom-row').show();
                        if (this.options.jq_object.$tablepager.length > 0) {
                            this.options.jq_object.$tablepager.html('<div class="col-sm-6"><div class="dataTables_info" style="margin-bottom: 10px;padding-top: 10px;">共 ' + (data.totalCount || 0) + '条数据</div></div>');
                        }
                    }

                }
                if (data.data.totalCount > 0) {
                    if (!$.isFunction(this.options.callback.showTableCall)) {
                        var tp = !this.isUserTp ? this._initTemplate(data.data.data) : template.parse(this.options.view.table_tpl, data.data);
                        if ($.browsers == 'I') {
                            this.options.jq_object.$tbody.html(tp);
                        } else {
                            opt.animation = opt.animation ? opt.animation : 'fadeTo';

                            switch (opt.animation) {
                                case 'fade':
                                    this.options.jq_object.$tbody.css({
                                        display: 'none'
                                    }).html(tp).delay(50).fadeIn('slow');
                                    break;
                                case 'slide':
                                    this.options.jq_object.$tbody.css({
                                        display: 'none'
                                    }).html(tp).delay(50).slideDown('slow');
                                case 'fadeTo':
                                    this.options.jq_object.$tbody.css({
                                        display: 'none'
                                    }).html(tp).delay(50).fadeTo("normal", 1);
                                    break;
                                case 'left':
                                    this.options.jq_object.$tbody.css({
                                        display: 'none'
                                    }).html(tp).delay(50).show(600);
                                    break;
                                default:
                                    this.options.jq_object.$tbody.css({
                                        display: 'none'
                                    }).html(tp).delay(50).show();
                                    break;
                            }
                        }

                        !this.isUserTp && this._initTd(data.data);
                        $.isFunction(this.options.callback.showCompletedCall) && this.options.callback.showCompletedCall.call(this, data);
                    } else {
                        //_this.options.callback.showTableCall.call(this, data);
                    }

                    this.options.view.isExport && this._createExport();
                } else {
                    this.options.view.isExport && this.$export && this.$export.length > 0 && this.$export.hide();
                    this.options.jq_object.$tbody.html('<tr><td colspan="' + this.options.view.table_colnum + '">没有数据...</td></tr>');
                }
            },

            _tableSort() {
                var $ths = this.options.jq_object.$thead.find('th'),
                    col = [];

                $ths.each((i, n) => {
                    if (!$(n).data('name')) {
                        col.push({ name: 'columns[' + i + '][data]', value: '' });
                        return;
                    }
                    col.push({ name: 'columns[' + i + '][data]', value: $(n).data('name') });
                    $(n).attr('data-sort', '').attr('role', 'columnheader').addClass('sorting sort').attr('data-flag', '1');
                });
                this.col = col;
                this.options.jq_object.$thead.on('click', '.sort', (n) => {
                    if ($.isFunction(this.options.callback.callSearch) && !this.options.callback.callSearch.call(this)) {
                        return;
                    }
                    var $this = $(n.currentTarget),
                        index = $ths.index($this),
                        $th = this.options.jq_object.$thead.find('th[data-flag=0]');
                    $th.attr('data-flag', '1').removeClass('sorting_asc sorting_desc').addClass('sorting');
                    var sort_name = 'sort.' + $.trim($this.data('name')),
                        ds = $this.attr('data-sort'),
                        sort;
                    if (ds == '') {
                        $this.removeClass('sorting').addClass('sorting_asc'),
                            $th.attr('data-sort', ''),
                            $this.attr('data-sort', 'ascending'),
                            sort = 'asc';
                    } else if (ds == 'ascending') {
                        $this.removeClass('sorting').addClass('sorting_desc'),
                            $this.attr('data-sort', 'descending'),
                            sort = 'desc';
                    } else if (ds == 'descending') {
                        $this.removeClass('sorting').addClass('sorting_asc'),
                            $this.attr('data-sort', 'ascending'),
                            sort = 'asc';
                    }
                    $this.attr('data-flag', '0');
                    this.options.list.sort_name = sort_name,
                        this.options.list.sort = sort,
                        this.order_index = index;
                    this._showPage(this.options.list.page_index);
                });
            },

            _initButton() {
                if (!this.options.jq_object.$all_checkbox)
                    this.options.jq_object.$all_checkbox = this.options.jq_object.$thead.find('input.checkAll');
                if (!this.options.jq_object.$ck)
                    this.options.jq_object.$ck = this.options.jq_object.$toolbar.find('button.ck');
                this.options.jq_object.$ck.addClass('disabled').prop('disabled', true);
                this.options.jq_object.$all_checkbox.is(':checked') && this.options.jq_object.$all_checkbox.prop('checked', false);
            },

            _initAllSelect() {
                this.options.jq_object.$all_checkbox = this.options.jq_object.$thead.find('input.checkAll'),
                    this.options.jq_object.$ck = this.options.jq_object.$toolbar.find('button.ck').prop('disabled', true);

                if (this.options.jq_object.$all_checkbox.length > 0) {
                    this.options.jq_object.$tbody.on('click', 'input[type=checkbox]', (event, a, b) => {
                        if (event.hasOwnProperty('originalEvent')) {
                            var $this = $(event.currentTarget);

                            this.options.jq_object.$all_checkbox.is(':checked') && this.options.jq_object.$all_checkbox.prop('checked', false);
                            if (this.options.jq_object.$ck.length > 0) {
                                var $input = this.options.jq_object.$tbody.find('input[type=checkbox]:checked');
                                if ($input.length > 0) {
                                    this.options.jq_object.$ck.removeClass('disabled').prop('disabled', false);
                                } else {
                                    this.options.jq_object.$ck.addClass('disabled').prop('disabled', true);
                                }
                            }
                        }
                    });
                    this.options.jq_object.$all_checkbox.on('click', (n) => {
                        var $this = $(n.currentTarget),
                            b = true,
                            $input_e = this.options.jq_object.$tbody.find('input[type=checkbox]');

                        if ($this.is(':checked')) {
                            if ($input_e.length > 0) {
                                if (this.options.jq_object.$ck.length > 0) {
                                    this.options.jq_object.$ck.removeClass('disabled').prop('disabled', false);
                                }
                                $input_e.prop('checked', true);
                            }
                        } else {
                            if (this.options.jq_object.$ck.length > 0) {
                                this.options.jq_object.$ck.addClass('disabled').prop('disabled', true);
                            }
                            if ($input_e.length > 0) {
                                $input_e.prop('checked', false);
                            }
                            b = false;
                        }
                        $.isFunction(this.options.callback.allSelectCall) && this.options.callback.allSelectCall.call(this, b);
                    });
                } else {
                    this.options.jq_object.$tbody.on('click', 'input[type=radio]', (event, a, b) => {
                        var $this = $(event.currentTarget);

                        if ($this.is(':checked')) {
                            this.options.jq_object.$ck.removeClass('disabled').prop('disabled', false);
                        } else {
                            this.options.jq_object.$ck.addClass('disabled').prop('disabled', true);
                        }
                    });
                }
            },

            _initColumns() {
                var $ths = this.options.jq_object.$thead.find('th');
                for (var i = 0, len = this.options.view.columns.length; i < len; i++) {
                    this.cacheColumns.push(this.options.view.columns[i]);
                    if (this.options.view.columns[i] && this.options.view.columns[i].orderSequence) {
                        this.options.jq_object.$thead.find('th:eq(' + i + ')').attr('data-name', this.options.view.columns[i].orderName || this.options.view.columns[i].data);
                    }
                }
                this.cacheColumns;
            },

            _initTd(data) {
                var n = this.options.list.page_index * this.options.list.page_size;
                for (var i = 0, len = data.length; i < len; i++) {
                    $.isFunction(this.options.callback.rowCallback) && this.options.callback.rowCallback.call(this, this.options.jq_object.$tbody.find('tr:eq(' + i + ')'), data[i], i + n);
                }
            },

            _initTemplate(data) {
                var datas = [],
                    d = {},
                    n = this.options.list.page_index * this.options.list.page_size,
                    td, obj, _class;

                for (var i = 0, len = data.length; i < len; i++) {
                    for (var j = 0, length = this.cacheColumns.length; j < length; j++) {
                        d = this.cacheColumns[j];
                        if (!d)
                            continue;
                        _class = d.classs ? 'class=' + d.classs : '';
                        if (d.align && d.align == 'right') {
                            td = '<td ' + _class + 'style="text-align: right;">'
                        } else {
                            td = '<td ' + _class + '>';
                        }
                        if (j == 0) {
                            datas.push('<tr>')
                        }
                        if (!d.data) {
                            datas.push(td + '</td>');
                        } else {
                            if ($.isFunction(d.render)) {
                                datas.push(td + (d.render.call(this, data[i][d.data], data[i], i + n) || '&nbsp;') + '</td>');
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

            _createExport() {
                var _this = this,
                    str = '';

                if (this.$export && this.$export.length > 0) {
                    this.$export.show();
                    return;
                }
                if (this.options.view.exportCurrent) {
                    str += '<button type="button" data-isall="0" class="btn btn-default btn-sm btn-export"\
                     >' + UtilMsg.table_btn_export + '</button>'
                }
                if (!this.options.view.exportAll) {
                    str += '<button type="button" data-isall="1" class="btn btn-default btn-sm btn-export"\
                     >' + UtilMsg.table_btn_exportAll + '</button>'
                }

                if (str === '')
                    return;
                this.$export = $(str).appendTo(this.options.jq_object.$toolbar.find('div.btn-group'));

                this.$export.on('click', () => {
                    if (!this.options.view.exportApiName || this.options.view.exportApiName == '') {
                        dialog.alert({
                            content: UtilMsg.not_exporturl_tips
                        });
                        return;
                    }
                    let exporturl = route_config.api_service.get(this.options.view.exportApiName)
                    if (!exporturl || exporturl == '') {
                        dialog.alert({
                            content: UtilMsg.not_exporturl_tips
                        });
                        return;
                    }

                    var data = $.merge($.merge(
                            [{ name: "_pageSize", value: _this.options.list.page_size }, { name: "_pageNo", value: _this.options.list.page_index + 1 }, //* _this.options.list.page_size
                                { name: 'order[0][dir]', value: _this.options.list.sort }, { name: 'order[0][column]', value: _this.order_index }, { name: "isAll", value: $(this).data('isall') }
                            ],
                            _this.options.jq_object.$form.serializeArray()
                        ), _this.col),
                        da = [],
                        name, val;
                    for (var n in data) {
                        name = data[n].name;
                        val = data[n].value;
                        name && da.push(name + '=' + val);
                    }
                    //console.log(data);
                    window.open(exporturl + '?' + da.join('&'), "下载");

                });
            },

            /**
             * 获取选中的值
             * @param {String} type 0:checkbox 1:radio
             * @param {String} joinType 拼接的字符 默认','
             * @param {String} dataType 值取的属性
             * @returns {String} 结点不存在 null
             */
            _getTableCheckData(type, joinType, dataType) {
                type = (!type || type !== '1') ? '0' : type;
                return util_service._getCheckData(this.options.jq_object.$tbody, type, joinType, dataType);
            },

            _getTbody() {
                return this.options.jq_object.$tbody;
            },

            _setTableDataColnum(colnum) {
                colnum && (this.options.view.table_colnum = colnum);
            }

        };
        TableData.TABLE_TP = '<div class="dataTables_wrapper form-inline dt-bootstrap">\
                        <div class="row">\
                            <div class="col-sm-12">\
                                <div class="mailbox-controls">\
                                    <%=bts%>\
                                    <div class="pull-right">\
                                        <div class="btn-group">\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="row">\
                            <div class="col-sm-12">\
                                <div class="table-responsive mailbox-messages">\
                                <table class="table table-hover searchtable">\
                                        <thead>\
                                            <tr><%=trs%></tr>\
                                        </thead>\
                                        <tbody>\
                                        </tbody>\
                                    </table>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="row tablepager"></div>\
                    </div>';
        var id = 0;

        //var dialog = null;
        /**
         * Pager的对象
         **/
        var Pager = function(options) {

            this.id = null;

            this.options = $.extend({
                page: 0,
                totalpage: 1,
                total: 0,
                pageSize: 10,
                container: null,
                isPaning: true,
                isSelect: true,
                isJump: true,
                onPageChanged() {},
                toTop: true
            }, options);



        }

        Pager.TEMPLATE = '<% if(isSelect){ %><div class="col-sm-6">\
                        <div class="dataTables_info" role="status" aria-live="polite">\
                        <label>\
                        <%if(total == 0){%><%=total%><%=pager_datas%> <%}else{%><%=pager_from%> <%=(page*pageSize)+1%> <%=pager_row%><%if((page+1)*pageSize<total){%> <%=(page+1)*pageSize%> <%}else{%> <%=total%><%}%><%=pager_total%> <%=total%><%=pager_datas%><%}%>\
                            </label>\
                            <select style="height:28px;line-height:20px;padding: 0px 5px;" name="example1_length" aria-controls="example1" class="form-control input-sm">\
                                <option <%if(pageSize == 10){%> selected="selected"<%}%> value="10">10</option>\
                                <option <%if(pageSize == 20){%> selected="selected"<%}%> value="20">20</option>\
                                <option <%if(pageSize == 30){%> selected="selected"<%}%> value="30">30</option>\
                                <option <%if(pageSize == 50){%> selected="selected"<%}%> value="50">50</option>\
                            </select>\
                        </div>\
                    </div><% } %>\
                    <div class="<% if(isSelect){ %>col-sm-6<% }else{ %>col-sm-12 <%}%>">\
                        <div class="dataTables_paginate paging_simple_numbers" id="example2_paginate">\
                            <% if(isJump){ %><input type="text" value="<%=page+1%>" class="j-z form-control input-sm" style="margin-top: -26px;width: 35px;padding-left: 3px;padding-right: 3px;height: 28px;"><% } %>\
                            <ul class="pagination">\
                            <% if(isJump){ %><li class=""><a data-page="<%=(totalpage-1)%> href="javascript:;" class="j-go">GO</a></li><% } %>\
                            <% if(page > 0){ %>\
                                <li class="first paginate_button"><a data-page="0" href="javascript:;"  class="j-pager"><%=pager_homepage%></a></li>\
                                <li class="prev paginate_button previous"><a data-page="<%=(page-1)%>" href="javascript:;"  class="j-pager"><%=pager_previous%></a></li>\
                            <% }else{ %>\
                                <li class="first disabled paginate_button"><a href="javascript:;"><%=pager_homepage%></a></li>\
                                <li class="prev disabled paginate_button"><a href="javascript:;"><%=pager_previous%></a></li>\
                            <% } %>\
                            <% for(var i = startpage; i <= endpage; i ++){%>\
                                <% if(i == page){ %>\
                                    <li class="active paginate_button"><a href="javascript:;"><%=(i + 1)%></a></li>\
                                <% }else{ %>\
                                    <li class="paginate_button"><a href="javascript:;" data-page="<%=i%>" class="j-pager"><%=(i + 1)%></a></li>\
                                <% } %>\
                            <% } %>\
                            <% if(page < totalpage - 1){ %>\
                                <li class="next paginate_button"><a data-page="<%=(page+1)%>" href="javascript:;" class="j-pager"><%=pager_nextpage%></a></li>\
                                <li class="last paginate_button"><a data-page="<%=(totalpage-1)%>" href="javascript:;" class="j-pager"><%=pager_endpage%></a></li>\
                            <% }else{ %>\
                                <li class="next disabled paginate_button"><a href="javascript:;"><%=pager_nextpage%></a></li>\
                                <li class="last disabled paginate_button"><a href="javascript:;"><%=pager_endpage%></a></li>\
                            <% } %>\
                            </ul>\
                        </div>\
                    </div>';

        Pager.NOT_PAGING_TEMPLATE = '<div class="col-sm-6">\
                        <div class="dataTables_info" role="status" aria-live="polite"><%=pager_total%> <%=total%><%=pager_datas%>\
                        </div>\
                    </div>';

        /**
         * show静态方法(显示页码,每页大小选择)
         */
        Pager.show = function(options) {

            options = $.extend({}, options);

            return new Pager(options)._createPager();
        };

        /**
         * Pager的原型对象
         */
        Pager.prototype = {

            /**
             * 创建分页
             */
            _createPager() {
                this.id = 'pager_' + (++id);
                var $container = $(this.options.container);

                $container.on('click', '.j-pager', (n) => {
                    var page = parseInt($(n.currentTarget).data('page'));
                    if (page != this.options.page) {
                        this.options.onPageChanged.call(this, page);
                    }
                    //_this.options.toTop && Util._toScrollTop();
                    return false;
                }).on('change', 'select', (n) => {
                    this.setPageSize(parseInt($(n.currentTarget).val()));
                    /*_this.options.toTop && Util._toScrollTop();*/
                }).on('click', '.j-go', (n) => {
                    var page = (parseInt($container.find('input.j-z').val()) || 0) - 1;
                    if (page < 0) return;
                    var dPage = parseInt($(n.currentTarget).data('page')) || 0;
                    if (dPage < page) {
                        // if (!dialog)
                        //     dialog = require('./dialog');
                        dialog.alert({
                            content: '超过总页数：【' + (dPage + 1) + '】页,请重新输入。'
                        });
                        return;
                    }
                    if (page != this.options.page) {
                        this.options.onPageChanged.call(this, page);
                    }
                });

                return this;
            },

            /**
             * 显示分页
             */
            showPager(page) {
                if (!this.id) {
                    this._createPager();
                }

                if (!this.options.template) {
                    this.options.template = this.options.isPaning ? Pager.TEMPLATE : Pager.NOT_PAGING_TEMPLATE;
                }

                this.options.totalpage = Math.ceil(this.options.total / this.options.pageSize);
                this.options.page = Math.max(0, Math.min(page || 0, this.options.totalpage - 1));

                $(this.options.container).html(template.parse(this.options.template, {
                    page: this.options.page,
                    totalpage: this.options.totalpage,
                    total: this.options.total,
                    pageSize: this.options.pageSize,
                    isSelect: this.options.isSelect,
                    isJump: this.options.isJump,
                    startpage: Math.max(0, this.options.page - 2),
                    endpage: Math.min(this.options.page + 2, this.options.totalpage - 1),
                    pager_previous: UtilMsg.pager_previous,
                    pager_nextpage: UtilMsg.pager_nextpage,
                    pager_everypage: UtilMsg.pager_everypage,
                    pager_homepage: UtilMsg.pager_homepage,
                    pager_endpage: UtilMsg.pager_endpage,
                    pager_from: UtilMsg.pager_from,
                    pager_row: UtilMsg.pager_row,
                    pager_total: UtilMsg.pager_total,
                    pager_datas: UtilMsg.pager_datas
                }));
            },

            /**
             * 设置每页行数
             * @param {number} pageSize
             */
            setPageSize(pageSize) {
                if (this.options.pageSize != pageSize) {
                    this.options.pageSize = pageSize;
                    this.options.onPageChanged.call(this, 0, pageSize);
                }
            },

            /**
             * 设置总行数
             * @param {number} total
             */
            setPageTotal(total) {
                if (this.options.total != total) {
                    this.options.total = total;
                }
            }
        }
        return TableData;
    });
