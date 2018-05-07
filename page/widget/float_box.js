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
     * 自定义窗口
     **/
    var FloatBox = function(options) {

        /**
         * 窗口的id
         * @type String
         **/
        this.id = 'float_box_' + (++id);

        /**
         * 窗口的结构
         * @type Object
         **/
        this.$float_box = null;

        /**
         * 窗口的内容
         * @type Object
         **/
        this.$float_box_body = null;

        /**
         * 窗口的标题
         * @type Object
         **/
        this.$float_box_title = null;


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
            style:'',

            stateParams: null, //页面请求参数
            dialogSize: '', 
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
        if (!FloatBox.instances) {
            FloatBox.instances = {};
        }
        FloatBox.instances[this.id] = {
            instances: this,
            isModalScroll: FloatBox.isModalScroll
        }

    };

    FloatBox.VERSION = '1.0.0';

    FloatBox.TRANSITION_DURATION = 300;

    FloatBox.TEMPLATE_HIS = '<div class="modal fade"  tabindex="-1" role="dialog" id="<%=id%>">\
                  <div class="<%=dialogSize%>" style="<%=modal_width%>">\
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
    FloatBox.TEMPLATE ='<div id="<%=id%>" class="panel panel-body float-box" style="z-index:9950;<%=style%>">\
                    <div class="btn btn-xs btn-float-box-close" style="float:right;">X</div>\
                    <div class="float-box-title"><span class="title-mark">| </span><font class="title-font"><%=title%></font>\
                    <hr class="hr-style"></div>\
                    <div class="content-style">\
                        <%=content%>\
                    </div>\
                </div>';
    FloatBox.BACKGROUND_TEMPLATE = '<div id="backgroundbody" style="background:#000;position:fixed;top:0;left:0;\
                        width:100%;height:100%;opacity:0.25;filter:alpha(opacity=25);overflow:hidden;z-index:9949;"></div>';
    FloatBox.DETAILS_TEMPLATE = '<div class="row">\
                                <div class="col-lg-12" style="text-align:center"><i class="fa <%=icon%>"></i>&nbsp;<%=content%></div>\
                            </div>';

    FloatBox.ICONS_TEMPLATE = {
        'warning': 'fa-warning',
        'success': 'fa-check',
        'error': 'fa-ban',
        'confirm': 'fa-envelope',
        'tips': 'fa-info'
    };

    FloatBox.instances = {};

    /**
     * 销毁模态窗口
     **/
    FloatBox.destroy = function() {
        for (var ins in FloatBox.instances) {
            try {
                FloatBox.instances[ins]._destroy();
            } catch (ex) {}
        }
        FloatBox.instances = null;
    }

    /**
     * 关闭窗口
     **/
    FloatBox.closeDialog = function(id) {
        if (!id || id === '')
            return;
        FloatBox.instances[id] && FloatBox.instances[id].instances && FloatBox.instances[id].instances._close();
    }
    /**
     * 弹出form窗口
     */
    FloatBox.formData = function(options) {

        options = $.extend({}, options);

        var dialog = new FloatBox(options);

        dialog._open();

        return dialog;
    };

    /**
     * 弹出页面
     */
    FloatBox.page = function(options) {

        options = $.extend({
            isShowFooter: false,
            modal_width: '100%',
            isModalScroll: true,
            closeCallBack:function(){}
        }, options);
        var float_box = new FloatBox(options);

        float_box._open();

        return float_box;
    };
    /**
     * 模态窗口的原型对象
     * @static
     */
    FloatBox.prototype = {

        /**
         * 创建模态窗口
         */
        _create() {
            var _this = this,
                tpl = template.parse(FloatBox.TEMPLATE, this._organizeData());
            $.body.append(tpl);
            if(!($("#backgroundbody").length>0))
            $.body.append(FloatBox.BACKGROUND_TEMPLATE);
            this.$float_box = $('#' + this.id);
            this.$float_box.css({
                display: 'none'
            }).delay(150).slideDown('slow');
            this.$float_box_body = this.$float_box.find('div.content-style');


        },

        /**
         * 整理数据
         */
        _organizeData() {
            var obj = {};

            obj.id = this.id;
            window.CloseFloatBoxFunction[obj.id] = this.options.closeCallBack;
            obj = $.extend(this.options, obj);

            return obj;
        },

        /**
         * 打开模态窗口
         */
        _open() {
            var _this = this;
            if (this.$float_box == null) {
                this._create();
            }
            var _id = this.id;
            if (this.options.loadUrl) {
                if (!route_config)
                    route_config = require('route_config');
                var _params = $.extend(this.options.stateParams || {}, {'float_box_id':_id});
                route_config.go(this.options.loadUrl, _params, {
                    $container: $("#"+this.id+" div.content-style"),
                    type: this.options.type,
                    data: this.options.r_data,
                    isInitPage: true
                });
            }
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
         * 销毁模态窗口
         */
        _destroy() {
            try {
                $.isFunction(this.options.onDestroyBefore) && this.options.onDestroyBefore.call(this);
                this.$dialog.remove();
                this.$dialog = null;
                this.options = null;
                FloatBox.instances[this.id] = null;
                delete FloatBox.instances[this.id];
                if ($.body.hasClass('modal-open')) {
                    var b = false;
                    for (var i in FloatBox.instances) {
                        if (FloatBox.instances[i].isModalScroll) {
                            b = true;
                            return;
                        }
                    }

                    !b && $.body.removeClass('modal-open');
                }

            } catch (_) {}
        }

    };

   
    return {
        error: FloatBox.error, //错误提示模态窗口
        page: FloatBox.page, //弹出页面
        formData: FloatBox.formData, //弹出form模态窗口
        alert: FloatBox.alert, //弹出通知模态窗口
        confirm: FloatBox.confirm, //弹出询问模态窗口
        closeDialog: FloatBox.closeDialog, //关闭模态窗口
        destroy: FloatBox.destroy //销毁模态窗口
    };
});
