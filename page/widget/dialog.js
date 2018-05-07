/**
 * 模态窗口
 * @module dialog
 * @author czl
 * @time 2015/10/28
 */
define(['require', 'jquery', './template'], (require, $, template) => {
    "use strict";

    var id = 0;

    var route_config = null;
    /**
     * 模态窗口
     **/
    var Dialog = function(options) {

        /**
         * 模态窗口的id
         * @type String
         **/
        this.id = 'dialog_' + (++id);

        /**
         * 模态窗口的jq结构
         * @type Object
         **/
        this.$dialog = null;

        /**
         * 模态窗口的内容jq结构
         * @type Object
         **/
        this.$modal_body = null;

        /**
         * 模态窗口的开始结构
         * @type Object
         **/
        this.$model = null;

        /**
         * 控制模态窗口关闭的定时器
         * @type Number
         **/
        this.timer = null;


        /**
         * 模态窗口的选项
         * @type Object
         **/
        this.options = $.extend({
            isModalScroll: false,
            type: 'GET',
            isTransition: true,
            isShowHeader: true, //是否显示模态窗口头 true:显示
            isShowFooter: true, //是否显示模态窗口脚 true:显示
            isAutoClose: false, //是否自动关闭模态窗口，和autoCloseDelay参数联合使用 true:自动关闭
            isAutoPosit: true,
            isShowCloseBtn: true, //是否显示关闭按钮 true:显示
            isShowSuerBtn: true, //是否显示确认按钮 true:显示
            isShowCancelBtn: true, //是否显示取消按钮 true:显示
            isOnSuerClose: true, //点击确认按钮是否关闭 true:关闭

            onCreateAfter: null, //创建模态窗口时执行行的方法（模态窗口还没显示）
            onOpenAfter: null, //模态窗口打开之后时执行行的方法（模态窗口已经显示）
            onDestroyBefore: null, //销毁模态窗口之前执行行的方法（模态窗口已经关闭）
            onCloseBefore: null, //点击关闭按钮之后执行的方法（模态窗口还未关闭）
            onSuerBefore: null, //点击确认按钮之后执行的方法（模态窗口还未关闭）
            onCanceleBefore: null, //点击取消按钮之后执行的方法（模态窗口还未关闭）
            _showAfter: null, //请求后台页面成功后执行的方法

            title: '提示', //标题
            sureBtnText: '确 定', //确 定按钮标题
            cancelBtnText: '取 消', //取消按钮标题
            content: '', //显示的内容
            form: null, //关联确认按钮的form的id值

            stateParams: null, //页面请求参数
            titlePadding: '',
            autoCloseDelay: 2000, //多少毫秒自动关闭
            dialogSize: 'modal-sm', //模态窗口宽度 modal-lg:大 modal-sm:小  ，空字符串为:中  
            modal_width: null,
            zIndex: 1001,
            top: '',
            margin_left: '',
            max_height: '', //最大高度
            r_data: null //请求页面发送的数据

        }, options || {});

        /**
         * 模态窗口的实例
         * @type Object
         **/
        if (!Dialog.instances) {
            Dialog.instances = {};
        }
        Dialog.instances[this.id] = {
            instances: this,
            isModalScroll: options.isModalScroll
        }

    };

    Dialog.VERSION = '1.0.0';

    Dialog.TRANSITION_DURATION = 300;

    Dialog.TEMPLATE = '<div class="modal fade"  tabindex="-1" role="dialog" id="<%=id%>">\
                  <div class="modal-dialog <%=dialogSize%>" style="<%=modal_width%>">\
                    <div class="modal-content">\
                      <div class="modal-header" style="<%=isShowHeader%> <%=titlePadding%>">\
                        <button id="<%=id%>_close" style="<%=isShowCloseBtn%>" aria-label="Close" data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span></button>\
                        <h4 class="modal-title"><%=title%></h4>\
                      </div>\
                      <div class="modal-body">\
                        <%=content%>\
                      </div>\
                      <div class="modal-footer" style="<%=isShowFooter%>">\
                        <button id="<%=id%>_cancel" style="<%=isShowCancelBtn%>" class="btn btn-default btn-sm" type="button"><%=cancelBtnText%></button>\
                        <button id="<%=id%>_sure" form="<%=form%>" style="<%=isShowSuerBtn%>" class="btn btn-primary btn-sm" type="button"><%=sureBtnText%></button>\
                      </div>\
                    </div>\
                  </div>\
                </div>';

    Dialog.DETAILS_TEMPLATE = '<div class="row">\
                                <div class="col-lg-12" style="text-align:center"><i class="fa <%=icon%>"></i>&nbsp;<%=content%></div>\
                            </div>';

    Dialog.ICONS_TEMPLATE = {
        'warning': 'fa-warning',
        'success': 'fa-check',
        'error': 'fa-ban',
        'confirm': 'fa-envelope',
        'tips': 'fa-info'
    };

    Dialog.instances = {};

    /**
     * 销毁模态窗口
     **/
    Dialog.destroy = function() {
        for (var ins in Dialog.instances) {
            try {
                Dialog.instances[ins]._destroy();
            } catch (ex) {}
        }
        Dialog.instances = null;
    }

    /**
     * 关闭模态窗口
     **/
    Dialog.closeDialog = function(id) {
        if (!id || id === '')
            return;
        Dialog.instances[id] && Dialog.instances[id].instances && Dialog.instances[id].instances._close();
    }

    /**
     * 弹出询问模态窗口
     */
    Dialog.confirm = function(options) {

        options = $.extend({}, options);
        options.content = template.parse(Dialog.DETAILS_TEMPLATE, { icon: Dialog.ICONS_TEMPLATE.confirm, content: options.content || '' });

        var dialog = new Dialog(options);

        dialog._open();

        return dialog;
    };

    /**
     * 弹出通知模态窗口
     */
    Dialog.alert = function(options) {

        options = $.extend({
            isShowCancelBtn: false
        }, options);
        options.content = template.parse(Dialog.DETAILS_TEMPLATE, { icon: Dialog.ICONS_TEMPLATE.tips, content: options.content || '' });

        var dialog = new Dialog(options);

        dialog._open();

        return dialog;
    };

    /**
     * 弹出form模态窗口
     */
    Dialog.formData = function(options) {

        options = $.extend({}, options);

        var dialog = new Dialog(options);

        dialog._open();

        return dialog;
    };

    /**
     * 弹出页面
     */
    Dialog.page = function(options) {

        options = $.extend({
            isShowFooter: false,
            modal_width: '1100',
            isModalScroll: true
        }, options);

        var dialog = new Dialog(options);

        dialog._open();

        return dialog;
    };

    /**
     * 错误提示模态窗口
     */
    Dialog.error = function(options) {

        options = $.extend({
            dialogSize: 'modal-lg',
            modal_body: 'padding: 5px 0px 0px;',
            isShowCancelBtn: false
        }, options);

        var dialog = new Dialog(options);

        dialog._open();

        return dialog;
    };
    /**
     * 模态窗口的原型对象
     * @static
     */
    Dialog.prototype = {

        /**
         * 创建模态窗口
         */
        _create() {
            var _this = this,
                tpl = template.parse(Dialog.TEMPLATE, this._organizeData());

            $.body.append(tpl);

            !this.options.isAutoPosit && this._position();

            this.$dialog = $('#' + this.id);
            this.$modal = this.$dialog.find('div.modal-dialog');
            this.$modal_body = this.$modal.find('div.modal-body');

            if (_this.options.isOnSuerClose) {
                $('#' + _this.id + '_sure').one('click', () => {
                    $.isFunction(_this.options.onSuerBefore) && _this.options.onSuerBefore.call(_this);
                    _this._close();
                    return false;
                });
            } else {
                $('#' + _this.id + '_sure').on('click', () => {
                    $.isFunction(_this.options.onSuerBefore) && _this.options.onSuerBefore.call(_this);
                    return false;
                });
            }


            $('#' + _this.id + '_cancel').one('click', () => {
                $.isFunction(_this.options.onCanceleBefore) && _this.options.onCanceleBefore.call(_this);
                _this._close();
                return false;
            });

            $('#' + _this.id + '_close').one('click', () => {
                $.isFunction(_this.options.onCloseBefore) && _this.options.onCloseBefore.call(_this);
                _this._close();
                return false;
            });

            $.isFunction(this.options.onCreateAfter) && this.options.onCreateAfter.call(this);
        },

        /**
         * 整理数据
         */
        _organizeData() {
            var obj = {};

            obj.id = this.id,
                obj.isShowHeader = this.options.isShowHeader ? '' : 'display:none;',
                obj.isShowFooter = this.options.isShowFooter ? '' : 'display:none;',
                obj.isShowCloseBtn = this.options.isShowCloseBtn ? '' : 'display:none;',
                obj.isShowSuerBtn = this.options.isShowSuerBtn ? '' : 'display:none;',
                obj.isShowCancelBtn = this.options.isShowCancelBtn ? '' : 'display:none;',
                obj.modal_width = !this.options.modal_width ? '' : 'width:' + this.options.modal_width + 'px';
            obj.form = !this.options.form ? '' : this.options.form,


                obj = $.extend(this.options, obj);

            return obj
        },

        /**
         * 打开模态窗口
         */
        _open() {
            var _this = this;
            if (this.$dialog == null) {
                this._create();
            }
            this.options.isModalScroll && $.body.addClass('modal-open');
            this.$dialog.show().scrollTop(0).addClass('in');

            this.options.isTransition ? (this.$dialog.one('bsTransitionEnd', () => {
                    _this.$dialog.trigger('focus');
                }), this._emulateTransitionEnd(this.$dialog, Dialog.TRANSITION_DURATION)) :
                _this.$dialog.trigger('focus');

            if (this.options.loadUrl) {
                if (!route_config)
                    route_config = require('route_config');
                route_config.go(this.options.loadUrl, this.options.stateParams, {
                    $container: this.$modal_body,
                    type: this.options.type,
                    data: this.options.r_data,
                    isInitPage: true
                });
            }

            $.isFunction(this.options.onOpenAfter) && this.options.onOpenAfter.call(this);

            this.options.isAutoClose && this._addAutoClose();
        },

        /**
         * 关闭模态窗口
         */
        _close() {
            this.$dialog.removeClass('in');
            this.options.isTransition ? (this.$dialog.one('bsTransitionEnd', $.proxy(this._hideModal, this)),
                this._emulateTransitionEnd(this.$dialog, Dialog.TRANSITION_DURATION)) : this.hideModal();

            $.isFunction(this.options.onCloseAfter) && this.options.onCloseAfter.call(this);
        },

        /**
         * 隐藏模态窗口
         */
        _hideModal() {
            this.$dialog.hide();
            this._destroy();
        },

        /**
         * 定位
         */
        _position() {
            if (this.options.isAutoPosit) return;

            var topPos = $(document).scrollTop() || 0;

            if (topPos < 0) {
                topPos = 0;
            }

            this.$model.css({
                left: Math.floor(($window.width() - this.$model.width()) / 2) + 'px',
                top: Math.floor(($window.height() - this.$model.height()) / 2) + topPos + 'px'
            });
        },

        /**
         * 增加自动关闭
         */
        _addAutoClose() {
            var _this = this;
            if (_this.timer) {
                clearTimeout(_this.timer);
            }
            this.timer = setTimeout(() => {
                _this._close();
                clearTimeout(_this.timer);
            }, _this.options.autoCloseDelay);
        },

        /**
         * 取消自动关闭
         */
        _cancelAutoClose() {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
        },

        /**
         * 过渡
         * @param {Object} $obj jq对象
         * @param {Int} duration 过渡时间
         */
        _emulateTransitionEnd($obj, duration) {
            var called = false;

            $obj.one('bsTransitionEnd', () => {
                called = true;
            });

            var callback = function() {
                if (!called) $obj.trigger('bsTransitionEnd')
            }

            setTimeout(callback, duration)
            return $obj
        },

        /**
         * 销毁模态窗口
         */
        _destroy() {
            try {
                $.isFunction(this.options.onDestroyBefore) && this.options.onDestroyBefore.call(this);
                this.$dialog.remove();
                this.$dialog = null;
                this.options = null;
                Dialog.instances[this.id] = null;
                delete Dialog.instances[this.id];
                if ($.body.hasClass('modal-open')) {
                    var b = false;
                    for (var i in Dialog.instances) {
                        if (Dialog.instances[i].isModalScroll) {
                            b = true;
                            return;
                        }
                    }

                    !b && $.body.removeClass('modal-open');
                }

            } catch (_) {}
        }

    };

    /**
     * Mask的对象
     */
    var Mask = function(options) {

        this.options = $.extend({
            target: document.body,
            zIndex: 1050,
            opacity: 0.3,
            isShowImg: false,
            message: '&nbsp;正在加载...'
        }, options || {});

        this.$mask = null;
    };

    /**
     * show静态方法(显示页码,每页大小选择)
     */
    Mask.show = function(options) {

        options = $.extend({}, options);

        return new Mask(options)._show();
    };

    /**
     * Pager的原型对象
     */
    Mask.prototype = {

        /**
         * 创建遮罩
         */
        _create() {
            this.options.message = this.options.message && this.options.message != '' ? this.options.message : '&nbsp;正在加载...';
            var tpl = '<div class="mask">\
                <div class="slowmsg"><div class="ball"><img src="./img/loading.gif" />' + this.options.message + '</div></div>\
                </div>';

            this.$mask = $(tpl).appendTo($.body);

            return this;
        },

        /**
         * 显示遮罩
         */
        _show() {
            if (!this.$mask || this.$mask.length == 0) {
                this._create();
            }
            this.$mask.show();
            return this;
        },

        /**
         * 隐藏遮罩
         */
        _hide(obj) {
            this.$mask.hide();
            !obj && this._destroy();
        },

        /**
         * 销毁遮罩dom结构
         */
        _destroy() {
            this.$mask.remove();
            this.$mask = null;
            this.options = null;
        }

    };
    return {
        maskShow: Mask.show, //显示遮罩
        error: Dialog.error, //错误提示模态窗口
        page: Dialog.page, //弹出页面
        formData: Dialog.formData, //弹出form模态窗口
        alert: Dialog.alert, //弹出通知模态窗口
        confirm: Dialog.confirm, //弹出询问模态窗口
        closeDialog: Dialog.closeDialog, //关闭模态窗口
        destroy: Dialog.destroy //销毁模态窗口
    };
});
