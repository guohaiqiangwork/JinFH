/**
 * 启动装置
 * @module starter
 * @author czl
 * @time 2015/10/26
 */
define(['require', 'jquery', 'slimscroll', 'route_config','widget/http'],
    (require, $, slimscroll, route_config,http) => {
        "use strict";
        var http = null;
        var dateAdd = (date, interval, num) => {
            num = num || 0;
            switch (interval) {
                case 'y':
                    date.setFullYear(date.getFullYear() + num);
                    break;
                case 'q':
                    date.setMonth(date.getMonth() + num * 3);
                    break;
                case 'n':
                    date.setMonth(date.getMonth() + num);
                    break;
                case 'd':
                    date.setDate(date.getDate() + num);
                    break;
                case 'w':
                    date.setDate(date.getDate() + num * 7);
                    break;
                case 'h':
                    date.setHours(date.getHours() + num);
                    break;
                case 'm':
                    date.setMinutes(date.getMinutes() + num);
                    break;
                case 's':
                    date.setSeconds(date.getSeconds() + num);
                    break;
                case 'i':
                    date.setMilliseconds(date.getMilliseconds() + num);
                    break;
                default:
                    date.setMilliseconds(date.getMilliseconds() + num);
                    break;
            }
            return date;
        }

        /**
         * cookie的对象
         * @static
         */
        var cookie_service = {
            /**
             * 设置cookie
             * @param {String} key 键名
             * @param {String} value 键值
             * @param {Int} expires 过期时间（毫秒），可省略
             * @param {String} domain 域，可省略
             * @param {String} path 路径，可省略
             * @throws 参数错误
             */
            set(key, value, expires, domain, path) {
                var args = arguments,
                    size = args.length,
                    date = new Date();
                path = path || '/';
                domain = domain || '127.0.0.1';
                expires = dateAdd(date, 'i', expires || 0).toGMTString();

                switch (size) {
                    case 2:
                        document.cookie = key + "=" + encodeURIComponent(value) + ";path=/";
                        break;
                    case 3:
                        document.cookie = key + "=" + encodeURIComponent(value) + ";path=/; expires=" + expires;
                        break;
                    case 4:
                        document.cookie = key + "=" + encodeURIComponent(value) + ";expires=" + expires + ";domain=" + domain;
                        break;
                    case 5:
                        document.cookie = key + "=" + encodeURIComponent(value) + ";path=" + path + ";expires=" + expires + ";domain=" + domain;
                        break;
                    default:
                        throw new Error("设置cookie时参数错误！");

                }
            },

            /**
             * 获取cookie值
             * @param {String} key 键名
             * @return {String} cookie值,如果没有返回""
             */
            get(key) {
                var _cookie = document.cookie,
                    items = _cookie.split(";"),
                    item = [];
                for (var i = 0, size = items.length; i < size; i++) {
                    item = items[i].split("=");
                    if (key == $.trim(item[0]) && item.length == 2) {
                        return decodeURIComponent(item[1]);
                    }
                }
                return '';
            },

            /**
             * 删除cookie值
             * @param {String} key 键名
             * @param {String} domain 域
             * @param {String} path 路径
             */
            remove(key, domain, path) {
                this.set(key, '', path, domain, -1);
            }
        };
        /**
         * starter的对象
         * @static
         */
        var starter = {

            options: {
                navbarMenuSlimscroll: true, //in every page before app.js
                navbarMenuSlimscrollWidth: "3px", //滚动width
                navbarMenuHeight: "200px", //内菜单的高度

                animationSpeed: 300, //animation速度

                sidebarToggleSelector: "[data-toggle='offcanvas']",

                sidebarPushMenu: true,

                sidebarSlimScroll: true,

                sidebarExpandOnHover: false,
                //BoxRefresh Plugin
                enableBoxRefresh: true,
                //Bootstrap.js tooltip
                enableBSToppltip: true,
                BSTooltipSelector: "[data-toggle='tooltip']",

                enableFastclick: true,
                //Control Sidebar Options
                enableControlSidebar: true,
                controlSidebarOptions: {
                    //Which button should trigger the open/close event
                    toggleBtnSelector: "[data-toggle='control-sidebar']",
                    //The sidebar selector
                    selector: "#control-sidebar",
                    //Enable slide over content
                    slide: true
                },

                //Direct Chat plugin options
                directChat: {
                    //Enable direct chat by default
                    enable: true,
                    //The button to open and close the chat contacts pane
                    contactToggleSelector: '[data-widget="chat-pane-toggle"]'
                },
                //Define the set of colors to use globally around the website

                screenSizes: {
                    xs: 480,
                    sm: 768,
                    md: 992,
                    lg: 1200
                }
            },

            _init(data) {
                this.layout._createPage(data);
                this._bindEvent();
                this.layout.activate();
                //菜单
                menu_service._create();
                //this._tree('#sidebar');

                menu_service._handleUrl(true);

                //菜单缩放
                if (this.options.sidebarPushMenu) {
                    this.pushMenu.activate(this.options.sidebarToggleSelector);
                }

                this._initBrowserVersion();
                //菜单加载
                //route_config.innerRouterPage("/menu",$("#moreMenu"));
                //route_config.innerRouterPage("/shortcutmenu",$("#customMenus"));
                //route_config.innerRouterPage("/msg",$("#messages"));
                
                $.ajax({
                    url: '/reins/showMenu.do?actionType=showMenu',
                    type: 'GET',
                    success: function(data) {
                        console.log(data);
                        var navMenus = data;
                    }
                })
            },

            _initBrowserVersion() {
                var ua = window.navigator.userAgent;
                if (ua.indexOf('Trident') > -1) {
                    $.browsers = 'I';
                } else if (ua.indexOf('Chrome') > -1) {
                    $.browsers = 'C';
                } else if (ua.indexOf('Firefox') > -1) {
                    $.browsers = 'F';
                } else {
                    $.browsers = 'C';
                }
            },

            layout: {

                _createPage(data) {
                    //var html = $("#index-tmpl").render({ data: data });  
  
                    //$("#wrapper").html(html).show().addClass('in');
                    // var myTemplate = $.templates("#index-tmpl");
                    // myTemplate.link("#wrapper", { data: data });
						window.$.body = $('body'),
                        window.$.sidebar = $('#sidebar'),
                        window.$.wrapper = $(window, "#wrapper"),
                        window.$.content_wrapper = $('#content-wrapper'),
                        window.$.window = $(window),
                        window.$.breadcrumb = $('#breadcrumb'),
                        window.$.sidebar_menu = $('#sidebar-menu'),
                        window.$.main_header = $('#main-header'),
                        window.$.main_footer = $('#main-footer'),
                        window.$.main_content = $('#main-content'),
                        window.$.browsers = 'F',
                        window.$.main_sidebar = $('#main-sidebar');
                },

                activate(name) {

                    this.fix();
                    this.fixSidebar();

                    $.wrapper.resize(() => {
                        this.fix();
                        this.fixSidebar();
                    });
                },

                fix() {

                    var neg = $.main_header.outerHeight() + $.main_footer.outerHeight(),
                        window_height = $.window.height(),
                        sidebar_height = $.sidebar.height();

                    if ($.body.hasClass("fixed")) {
                        $.content_wrapper.css('min-height', window_height - $.main_footer.outerHeight());
                    } else {
                        var postSetWidth;
                        if (window_height >= sidebar_height) {
                            $.content_wrapper.css('min-height', window_height - neg);
                            postSetWidth = window_height - neg;
                        } else {
                            $.content_wrapper.css('min-height', sidebar_height);
                            postSetWidth = sidebar_height;
                        }

                        var controlSidebar = $(starter.options.controlSidebarOptions.selector);
                        if (typeof controlSidebar !== "undefined") {
                            if (controlSidebar.height() > postSetWidth)
                                $.content_wrapper.css('min-height', controlSidebar.height());
                        }

                    }
                },

                fixSidebar() {

                    if (!$.body.hasClass("fixed")) {
                        if (typeof $.fn.slimScroll != 'undefined') {
                            $.sidebar.slimScroll({ destroy: true }).height("auto");
                        }
                        return;
                    } else if (typeof $.fn.slimScroll == 'undefined' && window.console) {
                        window.console.error("错误: 固定布局的要求slimscroll插件!");
                    }
                    //Enable slimscroll for fixed layout
                    if (starter.options.sidebarSlimScroll) {
                        if (typeof $.fn.slimScroll != 'undefined') {
                            //Destroy if it exists
                            $.sidebar.slimScroll({ destroy: true }).height("auto");
                            //Add slimscroll
                            $.sidebar.slimscroll({
                                height: ($.window.height() - $.main_header.height()) + "px",
                                color: "rgba(0,0,0,0.2)",
                                size: "3px"
                            });
                        }
                    }
                }
            },



            pushMenu: {
                activate(toggleBtn) {

                    var screenSizes = starter.options.screenSizes;


                    $(toggleBtn).on('click', (e) => {
                        e.preventDefault();


                        if ($.window.width() > (screenSizes.sm - 1)) {
                            if ($.body.hasClass('sidebar-collapse')) {
                                $.body.removeClass('sidebar-collapse').trigger('expanded.pushMenu');
                            } else {
                                $.body.addClass('sidebar-collapse').trigger('collapsed.pushMenu');
                            }
                        } else {
                            if ($.body.hasClass('sidebar-open')) {
                                $.body.removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
                            } else {
                                $.body.addClass('sidebar-open').trigger('expanded.pushMenu');
                            }
                        }
                    });

                    $.content_wrapper.on('click', () => {

                        if ($.window.width() <= (screenSizes.sm - 1) && $.body.hasClass("sidebar-open")) {
                            $.body.removeClass('sidebar-open');
                        }
                    });


                    if (starter.options.sidebarExpandOnHover || ($.body.hasClass('fixed') && $.body.hasClass('sidebar-mini'))) {
                        this.expandOnHover();
                    }
                },

                expandOnHover() {
                    var screenWidth = starter.options.screenSizes.sm - 1;
                    //Expand sidebar on hover
                    $.main_sidebar.hover(() => {
                        if ($.body.hasClass('sidebar-mini') && $.body.hasClass('sidebar-collapse') && $.window.width() > screenWidth) {
                            this.expand();
                        }
                    }, () => {
                        if ($.body.hasClass('sidebar-mini') && $.body.hasClass('sidebar-expanded-on-hover') && $.window.width() > screenWidth) {
                            this.collapse();
                        }
                    });
                },

                expand() {
                    $.body.removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover');
                },

                collapse() {
                    if ($.body.hasClass('sidebar-expanded-on-hover')) {
                        $.body.removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');
                    }
                }
            },


            _bindEvent() {
                var _this = this;
                $.body.removeClass("hold-transition");
                if (this.options.navbarMenuSlimscroll && typeof $.fn.slimscroll != 'undefined') {
                    $(".navbar .menu").slimscroll({
                        height: this.options.navbarMenuHeight,
                        alwaysVisible: false,
                        size: this.options.navbarMenuSlimscrollWidth
                    }).css("width", "100%");
                }

                //Bootstrap tooltip
                if (this.options.enableBSToppltip) {
                    $.body.tooltip({
                        selector: this.options.BSTooltipSelector
                    });
                }

                //fast click
                /*if (this.options.enableFastclick && typeof FastClick != 'undefined') {
                    FastClick.attach(document.body);
                }*/

                $.window.on('hashchange', () => {
                    menu_service._handleUrl(false);
                });

                // $('#preProInfo, #img-circle').on('click', () => {
                //     require('widget/dialog').page({
                //         title: '个人信息修改',
                //         dialogSize: '',
                //         modal_width: false,
                //         loadUrl: contextPath + '/sys_user/edit_pre_profile'
                //     });
                // });

                $('#logout').on('click', () => {
                    localStorage.removeItem("JSESSIONID");
                    localStorage.removeItem("userCode");
                    window.location.href = './login.html';
                });
                $('#international-zh, #international-en').on('click', (event) => {
                    let v = $(event.currentTarget).data('val');
                    if (v == cookie_service.get('international')) {
                        return;
                    } else {
                        cookie_service.set('international', v);
                        window.location.reload();
                    }
                });
                //$('#international-' + _international).find('span').addClass('active-a');


            }
        };
        var menu_service = {

            options: {
                animationSpeed: 300,
                sidebar: '#moreMenu',
                shortcuts:'#customMenus',
                callLayout: null
            },

            _create(callLayout) {
            	
                if (callLayout && $.isFunction(callLayout)) {
                    tis.options.callLayout = callLayout;
                }
                this._bindEvent();
            },

            _show() {
                var $li = $.sidebar_menu.find('li.active');
                if ($li.length > 0) {
                    this._slideUpParent($li);
                }
                /*if (false) {
                    $.sidebar_menu.find("li.active").has("ul").children("ul").addClass("menu-open in");
                    $.sidebar_menu.find("li").not(".active").has("ul").children("ul").addClass("menu-open");
                   // $this.find("li.active").has("ul").children("ul").collapse("show");
                    $.sidebar_menu.find("li").not(".active").has("ul").children("ul").collapse("hide");
                } else {
                    //$.sidebar_menu.find('li.active').closest("ul").addClass("menu-open").closest('li').addClass("active");
                    //$.sidebar_menu.find("li.active").has("ul").children("ul").addClass("menu-open");
                    //$.sidebar_menu.find("li").not(".active").has("ul").children("ul").addClass("menu-open").show();
                }*/
            },

            _bindEvent() {
                $(document).on('click', this.options.sidebar + ' li a',
                    $.proxy(this._handleClickMenu, this));
                $(document).on('click', this.options.shortcuts + ' div a',
                    $.proxy(this._handleClickMenu, this));
                $.sidebar_menu.on('clickShow', $.proxy(this._show, this));
            },

            _slideUpParent($obj) {
                if (!$obj || $obj.length == 0)
                    return;

                var $ul = $obj.closest('ul');

                if ($ul.length > 0) {
                    this._slideUpParent($ul.addClass("menu-open").closest('li').addClass("active"));
                } else {
                    return;
                }
            },

            _handleClickMenu(event) {
                event.preventDefault();
                var _this = this,
                    $this = $(event.currentTarget),
                    animationSpeed = this.options.animationSpeed,
                    checkElement = $this.next();


                if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
                    checkElement.slideUp(animationSpeed, () => {
                        checkElement.removeClass('menu-open');

                    });
                    checkElement.parent("li").removeClass("active");
                } else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {

                    var parent = $this.parents('ul').first(),
                        $ul = parent.find('ul:visible:eq(0)').parent("li").removeClass('active').find('ul:visible:eq(0)').hide(),
                        $parent_li = $this.parent("li");

                    $ul.removeClass('menu-open');

                    checkElement.slideDown(animationSpeed, () => {

                        checkElement.addClass('menu-open');
                        //parent.find('li.active.treeview:eq(0)').removeClass('active');
                        $parent_li.addClass('active');
                        $.isFunction(_this.options.callLayout) && _this.options.callLayout.call(this);

                    });
                } else {

                    var parent = $this.parents('ul').first();
                    parent.find('ul').hide();
                    $.sidebar_menu.find('li.active').removeClass('active');
                    this._slideUpParent($this.parent().addClass('active'));
                    //$this.parents('ul').first().find('li.active').removeClass('active');
                    // $this.parent().addClass('active');
                    /*$this.closest('ul').addClass('menu-open');*/
                    //cookie_service.set('menu_cookie', $.trim($this.attr('data-router')));
                    _this._handleHash($this);
                }
            },

            _handleHash($obj) {
                if (window.location.search) {
                    window.location.href =
                        window.location.href.replace(window.location.search, '')
                        .replace(window.location.hash, '') + '#' + $obj.data('router');
                } else {
                    var hash = window.location.hash.replace('#', '');
                    window.location.hash = $obj.attr('data-router');
                    if (hash == $obj.data('router'))
                        $(window).trigger('hashchange');
                }
            },

            _handleUrl(o) {
                var url = location.hash.replace(/^#/, ''),
                    b = true,
                    $a;
                if (url) {
                    $a = $.sidebar_menu.find('a[data-router="' + url + '"]');
                } else {
                    url = $.trim(cookie_service.get('menu_cookie'));
                    if (!url || url == '')
                        return;
                    $a = $.sidebar_menu.find('a[data-router="' + url + '"]');
                    b = false;
                }
                if (o && $a && $a.length == 0) {
                    //cookie_service.set('menu_cookie',url);
                    //window.location.href && (window.location.href = window.location.href.substring(0, window.location.href.indexOf('#')));
                    //return;
                }

                if (b) {
                    if ($a.context.activeElement.attributes[2]!=null) {
                        document.title = $a.context.activeElement.attributes[2].nodeValue+ '-' + UtilMsg.headerTitle;
                    }
                    else{

                    document.title = UtilMsg.headerTitle; 
                    }
                    if ($a.data('cross-domain') !== true) {
                        route_config.go(url);
                    } else {
                        $.main_content.html('<iframe id="iframe-page" src="' + url + '"" frameborder="0" width="100%" height="100%"></iframe>')
                        var ifm = document.getElementById("iframe-page");
                        ifm.height = document.documentElement.clientHeight;
                    }
                    this._drawTitle($a);
                } else {
                    url && (window.location.hash = url);
                }
            },


            _drawTitle($obj) {
                var href = $obj.attr('data-router');

                $.breadcrumb.empty();
                if (href && href != '#' && href != '' && !$obj.parent().hasClass('active')) {
                    this._initMenuSelect(href);
                    //return;
                }

                $.breadcrumb.html(this._findParent($obj.parent()) + '<li class="active">' + ($obj.data('title') || '') + '</li>').show();
            },

            _findParent(p) {
                var pp = p.parent().parent(),
                    $a = pp.find('> a'),
                    title = $a.data('title'),
                    s = '',
                    b = '';

                if (title && title != '') {
                    if (pp.is('li')) {
                        b = this._findParent(pp);
                        if (b == '') {
                            s = '<li><i class="fa ' + $a.data('fa') + '"></i>&nbsp;' + title + '</li>';
                        } else {
                            s = b + '<li>' + title + '</li>';
                        }

                    } else {
                        s = '<li><i class="fa ' + $a.data('fa') + '"></i>&nbsp;' + title + '</li>';
                    }
                }
                return s;
            },

            _initMenuSelect(url) {
                var $a = $.sidebar_menu.find('a[data-router="' + url + '"]');

                if (url && $a.length > 0) {
                    $a.trigger('click', 'sl');
                    $.sidebar_menu.trigger('clickShow');
                    //this._drawTitle(url);
                }

            }
        };
        return starter;
    });
