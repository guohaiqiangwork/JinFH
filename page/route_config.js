/**
 * 路由配置模块
 * @author
 * @time
 */
define(['jquery', 'widget/http'], ($, http) => {
    var api = new Array(0);
	
    api.logout = '/bpo/logout';
    api.is_login = '/verification/is_login';
    var api_service = {};

    var route_config = {
        api_service: api_service,
        router: {},
        defacltKey: null,
        state(obj) {
            if (obj) {
                var r = {};
                if(obj.viewNode==null){
                    obj.viewNode='main-content';
                }
                var pos = obj.path.lastIndexOf("/");
                if(pos>0){ //对于符合规则的自动进行惯例生成
                    var strModule = obj.path.substring(0,pos);
                    var strPage = obj.path.substring(pos+1);
                    if(obj.name==null)
                    {
                        obj.name=obj.path.replace(/\//g, "_");
                        if(obj.name.startsWith("_")){
                            obj.name=obj.name.substring(1);
                        }
                    }
                    if(obj.templateUrl==null)
                    {
                        obj.templateUrl='../page/templates' + obj.path+'.html';
                    }
                    if(obj.component==null)
                    {
                        obj.component='../page/templates' + strModule + '/js/'+strPage;
                    }
                }
                r[obj.path] = obj;
                obj.name && (r[obj.name] = obj); 
                Object.assign(this.router, r);
            }
            return this;
        },

        api(obj) {
            api_service.setApi(obj);
        },

        setStateParams(key, stateParams) {
            if (key && this.router[key]) {
                this.router[key].stateParams = stateParams
                if (key == this.router[key].name) {
                    this.router[this.router[key].path].stateParams = stateParams;
                } else {
                    this.router[key].name && (this.router[this.router[key].name].stateParams = stateParams);
                }

            }
        },

        getRouter(key) {
            var obj = null;
            if (this.router[key]) {
                obj = {
                    dom: '#' + this.router[key].viewNode,
                    templateUrl: this.router[key].templateUrl,
                    component: this.router[key].component
                }
            }
            return obj;
        },

        go(key, stateParams, opt) {
            if (key && key != '') {
                var obj = this.getRouter(key);
                this.defacltKey = key;
                if (obj) {
                    this.setStateParams(key, stateParams);
                    http.loadPage($.extend({
                        pageUrl: obj.templateUrl,
                        isInitPage: true,
                        type: 'GET',
                        defacltKey: key,
                        $container: obj.dom == 'main-content' ? null : $(obj.dom),
                        component: obj.component
                    }, opt || {}));
                } else {
                    console.log('-----异常：key值为' + key + '的路由不存在------');
                }
            } else {
                console.log('-----异常：key值为' + key + '------');
            }
        },
        innerRouterPage(routerKey,viewNode,params) {
        	//console.log('-----innerRouterPage------');
            var _params = $.extend(this.getStateParams(routerKey) || {},params || {});
            this.go(routerKey, _params, {
                $container: viewNode,
                isInitPage: true
            });
        },
        /**
         * 获取页面传输参数对像
         */
        getStateParams(key) {
            var params = {};
            if (!key || key == '') {
                key = this.defacltKey;
            }
            var obj = this.router[key];
            if (obj) {
                params = obj.stateParams || {};
            }
            return params;
        }
    }



    /**
     * 获取api
     * @method get
     * @param {String} cgi_name cgi名
     * @param {Object} params 参数 optional
     * @param {Bool} cache 是否使用cache, 默认false optional
     * @param {String} domain 域名  optional
     * @return {String} url地址
     */
    api_service.get = (api_name, params, cache, url_params, domain) => {
        var configUrl = api[api_name];
        var url = new Array(0);

		//通过Nginx代理转发，所有请求添加前缀"/api"
		url[0] = "/api" + configUrl; 
        if (!url) {
            console.log('请求的cgi：' + api_name + ' 不存在');
            return '';
        }
        //console.log(url);
        if (url_params && typeof url_params == "object") {
            var re;
            for (var name in url_params) {
                re = new RegExp('{' + name + '}', 'g');
                url[0] = url[0].replace(re, url_params[name]);
            }
        }
        if (params && url[0].indexOf("?") === -1) {
            url.push("?");
        }
        if (typeof params == "string") {
            url.push(params);
        } else if (typeof params == "object") {
            for (var key in params) {
                var temp = url.join("");
                if(temp.substring(temp.length-1,temp.length)=="?"){
                    url.push(key + "=" + params[key]);
                }
                else{
                    url.push("&" + key + "=" + params[key]);
                }
            }
        }
        /*if (cache) {
            if (url.join("").indexOf("?") === -1) {
                url.push("?t=" + new Date().getTime())
            } else {
                url.push("&t=" + new Date().getTime());
            }

        }*/
        var realUrl = url.join("");
        //console.log("Request URL="+realUrl);

        return realUrl;
    };

    api_service.setApi = (obj) => {
        api = Object.assign(api, obj || {});
    }
    return route_config;
});
