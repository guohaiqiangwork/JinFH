/**
 * http
 * @module http
 * @author czl
 * @time 2016/09/21
 */

define(['require', 'jquery', './template', './dialog', '../service/util_service', 'jquery_form'],
    (require, $, template, dialog, util_service) => {
        "use strict";

        var route_config = null;

        /**
         * http
         **/
        var http = function(options) {

            /**
             * http5的选项
             * @type Object
             **/
            this.options = $.extend({
                apiName: '',
                pageUrl: '',
                url: '',
                timeout: 60000,
                ajaxType: null,
                params: null,
                urlParams: null,
                isMask: false,
                mask: null,
                maskMessage: null,
                defacltKey: null,
                key: '',
                async: true,
                cache: false, //
                type: 'GET', //
                dataType: 'JSON', //
                stateParams: null,
                $container: null,
                $btnShowLoad: null,
                isInitPage: false,
                xhrFields: {
                    withCredentials: true
                },
                $form: null

            }, options || {});

        };

        http.VERSION = '1.0.0';

        http.ROUTES = {};

        http.ERROR_TP = '<div class="error-page" style="width:350px;margin-top: -20px;">\
                        <h3><i class="fa fa-warning text-yellow" style="cursor: pointer;" id="error_a"></i> <%=msg%></h3>\
                    </div>\
                    <div class="row" id="error_pand" style="display:none;"><div class="col-md-12">\
                        <div class="alert" style="margin-bottom: 0px;color: #8a6d3b;background-color: #fcf8e3;border-color: #faebcc;max-height:300px;overflow-y:auto;">\
                        <%=detail%>\
                        </div>\
                    </div>\
                    </div>';
        /**
         * 加载页面
         **/
        http.loadPage = function(options) {
            options = $.extend({
                dataType: 'HTML',
                ajaxType: '1',
                cache: true
            }, options);
            new http(options)._organizeData();
        };

        /**
         * 加载页面
         **/
        http.get = function(options) {
            options = $.extend({
                ajaxType: '2',
                isMask: true,
            }, options);
            new http(options)._organizeData();
        };

        http.post = function(options) {
            options = $.extend({
                type: 'POST',
                ajaxType: '2',
                isMask: true,
            }, options);
            new http(options)._organizeData();
        };

        http.put = function(options) {
            options = $.extend({
                type: 'POST',
                ajaxType: '2',
                isMask: true
            }, options);
            new http(options)._organizeData();
        };

        http.deletes = function(options) {
            options = $.extend({
                type: 'POST',
                ajaxType: '2',
                isMask: true
            }, options);
            new http(options)._organizeData();
        };

        http.submit = function(options) {
            options = $.extend({
                ajaxType: '3',
                isMask: true
            }, options);

            new http(options)._organizeData();
        };

        http.alertError = function(xhr) {
            new http({}).alertError(xhr);
        };
        /**
         * http的原型对象
         * @static
         */
        http.prototype = {

            /**
             * 整理数据
             */
            _organizeData() {
                var obj = {};
                if (!route_config)
                    route_config = require('route_config');
                var d = this._computUrl(this.options.ajaxType == '1' ? this.options.pageUrl : route_config.api_service.get(this.options.apiName, this.options.params, this.options.cache, this.options.urlParams));
                if (!d.is_b) {
                    system.println('----- ajax请求重复,url=' + d.url + ' -----', 'http-_organizeData');
                    //console.log('----- ajax请求重复,url=' + d.url + ' -----');
                    return;
                }
                this.options.url = d.url;
                obj.url = d.url;
                if (!this.options.data) {
                    obj.data = {};
                } else {
                    if (typeof(this.options.data) == 'object') {
                        obj.data = JSON.stringify(this.options.data);
                    } else {
                        obj.data = this.options.data;
                    }
                }
                obj.cache = this.options.cache === undefined ? false : this.options.cache === true;
                obj.ajaxType = this.options.ajaxType;
                obj.async = this.options.async;
                obj.type = this.options.type;
                obj.dataType = this.options.dataType;
                obj.timeout = this.options.timeout;
                obj.beforeSend = $.proxy(this.beforeSend, this);
                obj.success = $.proxy(this.success, this);
                obj.complete = $.proxy(this.complete, this);
                obj.error = $.proxy(this.error, this);
                obj.contentType = this.options.contentType || 'application/json;charset=UTF-8';
                obj.xhrFields = this.options.xhrFields;
                //obj.contentType = 'application/json;charset=UTF-8';

                /*obj.beforeSend = this.options.beforeSend && $.isFunction(this.options.beforeSend) ?
                    this.options.beforeSend : $.proxy(this.beforeSend, this);
                obj.success = this.options.success && $.isFunction(this.options.success) ?
                    this.options.success : $.proxy(this.success, this);
                obj.complete = this.options.complete && $.isFunction(this.options.complete) ?
                    this.options.complete : $.proxy(this.complete, this);
                obj.error = this.options.error && $.isFunction(this.options.error) ?
                    this.options.error : $.proxy(this.error, this);*/

                this.request(obj);

            },

            request(obj) {
                if (this.options.ajaxType !== '3') {
                    $.ajax(obj);
                } else {
                    if (!this.options.$form || this.options.$form.length === 0) {
                        system.println('----- submit提交form获取失败,url=' + this.options.url + ' -----', 'http-request');
                        //console.log('----- submit提交form获取失败,url=' + this.options.url + ' -----');
                        return;
                    }
                    //obj.data = JSON.stringify(this.options.$form.serializeArray());
                    //$.ajax(obj);
                    this.options.$form.ajaxSubmit(obj);
                }
            },

            beforeSend(request) {
                localStorage.getItem("JSESSIONID");
                request.setRequestHeader("Authorization", "Arch6WithCloud "+localStorage.getItem("JSESSIONID"));
                //system.println('----- ajax请求开始,url=' + this.options.url + ' -----', 'http-beforeSend');
                console.log('----- ajax请求开始,url=' + this.options.url + ' -----');
                switch (this.options.ajaxType) {
                    case '1':
                        this.options.$container && this.options.$container.length > 0 &&
                            this.options.$container.html('<div class="row"><div class="col-md-12"><h2><i class="fa fa-cog fa-spin"></i> 加载中...</h2></div></div>');
                        break;
                    case '2':
                    case '4':
                    case '3':
                        if (this.options.$btnShowLoad && this.options.$btnShowLoad.length > 0) {
                            this.options.$btnShowLoad.button('loading');
                        }
                        if (this.options.isMask) {
                            this.options.mask = dialog.maskShow({
                                message: this.options.maskMessage
                            });
                        }
                        $.isFunction(this.options.beforeSend) && this.options.beforeSend.call(this);
                        break;
                    default:
                        break;
                }
            },

            complete() {
                http.ROUTES && http.ROUTES[this.options.key] && delete http.ROUTES[this.options.key];
                switch (this.options.ajaxType) {
                    case '2':
                    case '4':
                    case '3':
                        if (this.options.$btnShowLoad && this.options.$btnShowLoad.length > 0) {
                            this.options.$btnShowLoad.button('reset');
                        }

                        if (this.options.isMask) {
                            this.options.mask && this.options.mask._hide();
                        }
                        $.isFunction(this.options.complete) && this.options.complete.call(this);
                        break;
                    default:
                        break;
                }

            },

            success(data, b, c) {

                switch (this.options.ajaxType) {
                    case '1':
                        //system.println('----- ajax请求页面成功 -----', 'http-success');
                        //console.log('----- ajax请求页面成功 -----');
                        if (this.options.$container && this.options.$container.length > 0) {
                            if (this.options.component && this.options.component != '')
                                data += '<script>require(["' + this.options.component + '"], function (m) {\
                                m.initPage();if(m.params){if(m.copy_params){m.params = $.extend({defacltKey:"' + this.options.defacltKey + '"}, m.copy_params);}else{m.copy_params = $.extend({defacltKey:"' + this.options.defacltKey + '"}, m.params);}}});</script>';


                            if ($.browsers == 'I') {
                                this.options.$container.html(data);
                            } else {
                                this.options.$container.css({
                                    display: 'none'
                                }).html(data).delay(50).slideDown('slow');
                            }

                            this.options.isInitPage && util_service._initPage(this.options.$container);
                        }
                        break;
                    case '2':
                    case '3':
                        data = typeof data == 'object' ? data : JSON.parse(data);
                        if (data.data && data.data.code == '099')
                            window.location.href = './login.html';
                        //system.println('----- ajax请求数据成功,returnData: -----', 'http-success');
                        //system.println(data, 'http-success');
                        //console.log('----- ajax请求数据成功,returnData: -----');
                        //console.log(data);
                        if (data.status == 200 || data.status == 0) {
                            $.isFunction(this.options.success) && this.options.success.call(this, data || {});
                        } else {
                            if ($.isFunction(this.options.error)) {
                                let result = data && data.status;
                                this.options.error.call(this, this._computErrorMsg(data && data.status), data, b, c);
                            } else {
                                this.alertError(data);
                            }
                        }
                        break;
                    case '4':
                        data = typeof data == 'object' ? data : JSON.parse(data);
                        system.println(data.message);
                        if (data.data && data.data.code == '099')
                            window.location.href = './login.html';
                        //system.println('----- ajax请求数据成功,returnData: -----', 'http-success');
                        //system.println(data, 'http-success');
                        //console.log('----- ajax请求数据成功,returnData: -----');
                        //console.log(data);
                        if (data) {
                            $.isFunction(this.options.success) && this.options.success.call(this, data || {});
                        } else {
                            if ($.isFunction(this.options.error)) {
                                this.options.error.call(this, this._computErrorMsg(data && data.status), data, b, c);
                            } else {
                                this.alertError(data);
                            }
                        }
                        break;
                    default:
                        break;
                }
            },

            error(xhr, ajaxOptions, thrownError) {
                system.println('----- ajax请求失败 -----', 'http-error');
                //console.log('----- ajax请求失败 -----');
                switch (this.options.ajaxType) {
                    case '1':
                        if (this.options.$container && this.options.$container.length > 0) {
                            this.options.$container.html(this.handError(xhr));

                            $('#error_a').on('click', () => {
                                $('#error_pand').toggle();
                            });
                        }
                        break;
                    case '2':
                    case '4':
                        if (ajaxOptions != 'parsererror') {
                            if ($.isFunction(this.options.error)) {
                                this.options.error.call(this, this._computErrorMsg(xhr && xhr.status), xhr, ajaxOptions, thrownError);
                            } else {
                                if(xhr.status=='401'){
                                    window.location.href='/login.html';
                                }
                                else{
                                    this.alertError(xhr);
                                }
                            }

                        } else {
                            dialog.alert({
                                content: '数据异常，请刷新后重试'
                            });
                        }
                        break;
                    case '3':
                        if ($.isFunction(this.options.error)) {
                            this.options.error.call(this, this._computErrorMsg(xhr && xhr.status), xhr, ajaxOptions, thrownError);
                        } else {
                            this.alertError(xhr);
                        }
                    default:
                        break;
                }

            },

            handError(xhr) {
                var detail = xhr.exceptionText && xhr.exceptionText != '' ? xhr.exceptionText : null;

                detail = template.parse(http.ERROR_TP, {
                    msg: this._computErrorMsg(xhr && xhr.status),
                    detail: detail || xhr.responseText || xhr.statusText
                });
                return detail;
            },

            alertError(xhr) {
                dialog.error({
                    content: this.handError(xhr),
                    onCreateAfter() {
                        $('#error_a').on('click', () => {
                            $('#error_pand').toggle();
                        });
                    }
                });
            },

            /**
             * 设置url,增加路由
             * @param {String} url 请求地址
             * @return {Object} 处理后的url
             */
            _computUrl(url) {
                var key = "_" + encodeURIComponent(url).replace(/[\/\.%!?&=]/g, ""),
                    route = http.ROUTES[key],
                    mask = null,
                    obj = { is_b: true, url: url };
                this.options.key = key;
                if (route && url === route.url && route.request)
                    obj.is_b = false;

                if (obj.is_b) {
                    http.ROUTES[key] = { url: url, request: true };
                    //if (flag)
                    //    url += url.indexOf('?') > -1 ? '&_t=' + new Date().getTime() : '?_t=' + new Date().getTime();
                    obj.url = url;

                }
                return obj;
            },

            /**
             * 错误信息
             * @param {Int} status 错误码
             * @return {String} 返回错误信息
             */
            _computErrorMsg(status) {
                var msg;
                switch (status) {
                    case 404:
                        msg = UtilMsg.error_404;
                        break;
                    case 302:
                        msg = UtilMsg.error_302;
                        break;
                    case 401:
                        msg = UtilMsg.error_401;
                        break;
                    case 403:
                        msg = UtilMsg.error_403;
                        break;
                    case 500:
                        msg = UtilMsg.error_500;
                        break;
                    case 503:
                        msg = UtilMsg.error_503;
                        break;
                    case -1:
                        msg = UtilMsg.error__1;
                        break;
                    case "205":
                        msg = UtilMsg.error_401;
                        break;
                    default:
                        msg = UtilMsg.error_404;
                        break;
                }

                return msg;
            }

        };

        return {
            loadPage: http.loadPage,
            post: http.post,
            get: http.get,
            put: http.put,
            deletes: http.deletes,
            submit: http.submit,
            alertError: http.alertError
        };
    });
