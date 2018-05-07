/**
 * 工具
 * @module util_service
 * @author czl
 * @time 2015/11/5
 */
define(['require', 'jquery', '../widget/template', 'datetimepicker'], (require, $, template) => {

    var dialog = null;
    var params = {};
    var route_config = null;
    var db_click = null;
    var simple_cache = null;

    var util = {
        logistics: {
            '1': 'https://m.kuaidi100.com/result.jsp?com=shunfeng&nu=', //顺风
            '2': 'https://m.kuaidi100.com/result.jsp?com=ems&nu=' //EMS
        },

        _initPage($container) {
            if (!$container || $container.length === 0) return;
            this._initInjectiontp($container);
            //this._closeDialog($container);

        },

        findSize(fileInput) {
            let byteSize = fileInput.files[0].size;
            return (Math.ceil(byteSize / 1024));
        },

        HTMLDecode(text) {
            if (!text || text == '')
                return '';
            var temp = document.createElement("div");
            temp.innerHTML = text;
            var output = temp.innerText || temp.textContent;
            temp = null;
            return output;
        },

        _initDateWidget($container) {
            var $this;
            $.each($container.find("input.form_date"), (i, n) => {
                $this = $(n);
                $this.datetimepicker({
                    format: $this.data('format') || 'yyyy-mm-dd',
                    minViewMode: "0",
                    autoclose: true,
                    clearBtn: $this.data('clear-btn') || false,
                    todayHighlight: true,
                    todayBtn: 'linked',
                    language: "zh-CN",
                    endDate: $this.data('end-date') ? new Date() : null
                }).on('changeDate', function(e) {
                    $(e.currentTarget).trigger('changeTime').trigger('blur');
                }).next('span').on('click', function() {
                    $(this).prev('input').trigger('focus');
                });
                // $this.datetimepicker({
                //     format: $this.data('format') || 'yyyy-mm-dd hh:ii:ss',
                //     autoclose: true,
                //     clearBtn : true,
                //     todayBtn: true
                // }).on('changeDate', (e) => {
                //     $(e.currentTarget).trigger('changeTime').trigger('blur');
                // }).next('span').on('click', (e) => {
                //     $(e.currentTarget).prev('input').trigger('focus');
                // });
            });
        },
        /**
         * 关闭模态窗口
         */
        _closeDialog($obj, flag) {
            if (!dialog)
                dialog = require('../widget/dialog');
            $obj = !flag ? $obj.find('button.btn-close') : $obj;
            $obj.on('click', (n) => {
                dialog.closeDialog($(n.currentTarget).closest('div.modal').attr('id'));
            });
        },

        /**
         * 查找物流H5地址
         * @param {String} type 类型
         */
        _logistics(type) {
            return this.logistics[type] || '';
        },

        /**
         * 中文编码
         * @param {object} obj 对象
         * @param {String} type 对象类型 1：对象，2：表单对象
         */
        _codeZhCnObject(obj, type) {
            if (typeof(obj) != "object")
                return obj;

            if (!type || type === '1') {
                for (var name in obj) {
                    if (/.*[\u4e00-\u9fa5]+.*$/.test(obj[name])) {
                        obj[name] = encodeURI(obj[name]);

                    }
                }
            } else {
                for (var name in obj) {
                    if (/.*[\u4e00-\u9fa5]+.*$/.test(obj[name].value)) {
                        obj[name].value = encodeURI(obj[name].value);

                    }
                }
            }

            return obj;
        },

        /**
         * 对象值渲染到指定容器的表单输入域(输入域的样式存在“no-render”，则不进行渲染)
         * @param {object} $obj 渲染的容器
         * @param {String} obj json对象
         */
        _renderJsonToForm($obj, obj) {
            if (typeof(obj) === 'object' && $obj && $obj.length > 0) {
                var $input;
                for (var name in obj) {
                    $input = $obj.find('select[name=' + name + '],input[name=' + name + '],input[textarea=' + name + ']');
                    $input && $input.length > 0 && !$input.hasClass('no-render') && this._voluationToForm($input, obj[name]);
                }
            }
        },

        serializeObject(obj) {
            var o = {};
            $.each(obj, function() {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        },

        serializeObject1(obj) {
            var o = '';
            $.each(obj, function() {
                if (this.value !== undefined&&this.value!=="") {
                    o += this.name + '=' + this.value + '&';
                } /*else {
                    o += this.name + '=' + '&';
                }*/
            });
            if (o.length > 0) o = o.substring(0, o.length - 1);
            return o;
        },

        _voluationToForm($obj, str) {
            switch ($obj.attr('type')) {
                case 'text':
                    $obj.val(str);
                    break;
                case 'radio':
                case 'checkbox':
                    var $this;
                    $obj.each((i, n) => {
                        $this = $(n);
                        $.trim($this.val()) === str && $this.prop('checked', true);
                    });
                    break;
                default:
                    if ($obj.is('select')) {
                        $obj.find('option[value="' + str + '"]').prop('selected', true);
                    } else if ($obj.is('textarea')) {
                        $obj.text(str);
                    }
                    break;

            }

        },

        /**
         * 获取选中的值
         * @param {object} $obj 结点
         * @param {String} type 0:checkbox 1:radio
         * @param {String} joinType 拼接的字符 默认','
         * @param {String} dataType 值取的属性
         * @returns {String} 
         */
        _getCheckData($obj, type, joinType, dataType) {
            if (!$obj || $obj.length == 0)
                return '';

            var param = '';

            if (type === '0') {
                joinType = !joinType ? ',' : joinType;

                $obj.find('input[type=checkbox]:checked').each((i, n) => {
                    param += !dataType ? $(n).val() + joinType : $(n).attr(dataType) + joinType;
                });

                return param && param.length > 0 ? param.substring(0, param.length - 1) : '';
            } else {
                param = !dataType ? $obj.find('input[type=radio]:checked').val() : $obj.find('input[type=radio]:checked').attr(dataType);

                return param;
            }


        },

        /**
         * readonly所有输入与域
         * @param $obj
         * @param type 0:查找form表单，1:使用当前注入的jq对象
         */
        _readonlyInput($obj, type) {
            if (!$obj || $obj.length === 0) return;

            $obj.find('select, input, textarea').each((i, n) => {
                util._handleReadonlyInput(n);
            });

        },

        _handleReadonlyInput(obj) {
            switch (obj.tagName) {
                case 'INPUT':
                    var $obj = $(obj);
                    switch ($obj.attr('type')) {
                        case 'text':
                            $obj.prop('readonly', true);
                            break;
                        case 'radio':
                        case 'checkbox':
                            $obj.prop('disabled', true);
                            break;
                    }
                    break;
                case 'TEXTAREA':
                    $(obj).prop('disabled', true);
                case 'SELECT':
                    var $t = $(obj);
                    $t.attr('name', '');
                    $t.prop('disabled', true);
                    $fm.append('<input type="hidden" name="' + $t.attr('name') + '" value="' + $t.attr('defaultValue') + '">');
                    break;
            }
        },

        /**
         * 初始化双击域
         */
        _initDbclick(obj) {
            var s = '',
                $this;
            if (!obj || obj.length == 0)
                return;
            obj.find('input.dbclick').each((i, n) => {
                $this = $(n);
                s = 'dblclick';
                if ($this.data('blur') && $this.data('blur') == '2')
                    s += ' blur';
                $this.on(s, () => {
                    // db_click.show({
                    //     ele: $(this)
                    // });
                });
            });


        },

        /**
         * 格式化数字
         * @param $obj input对象
         * @param isShow 是否是展示用 true=展示, false=非展示
         * @param type 1=金额, 2=重量 
         * @param l 小数点长度
         */
        _forAutoMatNum($obj, isShow, type, l) {
            if (!$obj || $obj.length == 0)
                return;

            var val = $.trim($obj.val()),
                b = true,
                decimal = $obj.data('decimal-length'),
                l = decimal || decimal == '0' ? parseInt(decimal) : l;

            if (val == '') {
                return;
            } else {
                if (val.indexOf('-') > -1) {
                    val = val.substring(1, val.length);
                    b = false;
                }
                val = val.replace(/,/g, '');
                if (!/(^[0-9]+$)|(^[0-9]+.[0-9]{1,}$)/.test(val)) {
                    $obj.val('');
                    return;
                }

                if (!isShow) {
                    if (/^0+\./.test(val)) {
                        val = val.replace(/^0+\./, '0.');
                    } else {
                        val != '0' && (val = val.replace(/^0+/g, ''), val == '' && (val = '0'));
                    }
                    val = this._forMatNumber(val, l);
                    val = val.replace(/,/g, '');
                    if (this._forMatPrice($obj, val, 16, l) != '0')
                        return;
                }

                val = this._forMatNumber(val, l);
            }

            !b && (val = '-' + val);
            $obj.val(val);
        },

        /**
         * 金额位数校验
         * @param $obj
         * @param precision 位数
         * @returns 
         */
        _forMatPrice($obj, val, precision, l) {
            var _this = this;
            //判断位数
            if (val.length > precision) {
                //位数超出
                //setTimeout(function(){
                if (!dialog)
                    dialog = require('../widget/dialog');
                !_this.d_alert && (_this.d_alert = dialog.alert({
                    content: '输入数据不能超出' + precision + '位，整数部分不能超出' + (precision - l - 1) + '位。',
                    lazyshow: true,
                    onCloseBefore() {
                        $obj.focus();
                        _this.d_alert = null;
                    }
                }));
                //}, 150);
                return "1";
            } else {
                return "0";
            }
        },

        /**
         * 数字千分位
         * @param num
         * @returns {String}
         */
        _forMatNumber(value, precision) {
            value = value + "";
            var pos = value.indexOf('.');
            if (pos > -1) {
                var firstValue = value.substring(0, pos);
                var lastValue = value.substring(pos + 1);
                var re = /(-?\d+)(\d{3})/;
                while (re.test(firstValue)) {
                    firstValue = firstValue.replace(re, "$1,$2");
                }
                value = firstValue + "." + lastValue;
            } else {
                var re = /(-?\d+)(\d{3})/;
                while (re.test(value)) {
                    value = value.replace(re, "$1,$2");
                }
            }
            if (precision != undefined && !isNaN(precision) && precision) {
                var pos = value.indexOf('.');
                if (pos == -1) {
                    value += ".";
                    pos = value.indexOf('.');
                }

                var len = value.length - pos - 1;
                if (len <= precision) {
                    for (var i = len; i < precision; i++) {
                        value += "0";
                    }
                } else {
                    value = value.substring(0, (value.length - len + precision));
                }

            }
            return value;
        },

        /**
         * 初始化下拉
         * @param $obj
         */
        _initSelect($obj) {
            var _this = this;

            $obj.find('select.sel').each((i, n) => {
                _this._initSelectOptions($(n));
            });
        },

        _initInjectiontp($obj) {
            if (!route_config)
                route_config = require('route_config');

            $obj.find('includepage').each((i, n) => {
                var $this = $(n),
                    url = $this.data('url'),
                    type = $this.data('type');

                route_config.forwardPage(url, {
                    $container: $this,
                    type: type,
                    stateParams: {},
                    data: {},
                    isInitPage: true
                });
            });
        },

        /**
         * data-simple 默认值 0 0：显示翻译；1：显示编码加翻译
         * data-withall 默认值 false false：不显示；true：显示“所有”
         * data-withselect 默认值 false false：不显示；true：显示“请选择”
         * data-defaultvalue 默认值 '' 选中默认值
         * data-iscache 默认值 1 是否选用缓存 1：是，2：否
         * data-url默认值 空  请求自定义的下拉时，赋值请求地址
         */
        _initSelectOptions($obj, obj) {
            var _this = this,
                isCache = $obj.data('iscache') || '1',
                cache = null,
                cacheKey = null,
                url = null;

            // 根据是否存在codeType属性来判断查询的缓存和请求后台的url
            var codeType = $obj.data('codetype'),
                simple = !$obj.data('simple') || $obj.data('simple') === '' ? '0' : $obj.data('simple');

            if (codeType && codeType !== '') {
                cache = CacheManager.getCodeTypeCache();
                url = _this._getCodeTypeUrl() + codeType;
                cacheKey = codeType;
                if (obj) {
                    url = url + '/' + obj;
                    cacheKey += ':' + obj;
                }
            } else {
                cache = CacheManager.getSelectCache();
                url = $obj.data('url');
                if (!url || url === '') {
                    return;
                }
                cacheKey = url;
                url = window._domain + url;
            }
            // 从缓存中查找
            var list = isCache == '1' ? cache.get(cacheKey) : null;

            if (null !== list) {
                _this._setSelectOptions($obj, list);
            } else if (url && url != '') {
                $.ajax({
                    type: 'POST',
                    async: false,
                    data: { simple: simple },
                    url: url,
                    datatype: 'json',
                    success(data) {
                        try {
                            list = eval(data);
                            isCache == '1' && cache.set(cacheKey, list);
                            _this._setSelectOptions($obj, list);
                        } catch (err) {

                        }
                    }
                });
            }
            return '';
        },

        _getCodeTypeUrl() {
            return window._domain + '/code_input/init_select/';
        },

        _setSelectOptions($selector, list) {
            // 下拉框最顶部是否包含空选项
            var withAll = $selector.data('withall'),
                withSelect = $selector.data('withselect'),
                defaultValue = $selector.data('defaultvalue'), // 下拉框默认选中的值             
                withValue = $selector.data('withvalue'), // 下拉框显示是否包含代码值，不配置时默认包含               
                mode = $selector.data('mode'), // 下拉框展现模式               
                style = $selector.data('style'); // 保存原始宽度

            $selector.empty();

            var mySelect = list.datas,
                startIndex = 1;

            if (withAll !== undefined) {
                startIndex = 0;
            }
            if (withSelect !== undefined) {
                startIndex = 0;
            }
            var firstValue;
            if (mode === 'readOnly') {
                $selector.prop('readonly', true);
            }
            if (mySelect) {
                for (var i = startIndex, len = mySelect.value.length; i < len; i++) {
                    if (mySelect.value) {
                        if (startIndex == '1') {
                            firstValue = mySelect.value[1];
                        }
                        if (mode === 'readOnly' && mySelect.value[i] !== defaultValue) {
                            if (mySelect.value[i] != firstValue) {
                                continue;
                            } else if (defaultValue != null && defaultValue !== '') {
                                continue;
                            }
                            //continue;
                        }
                        var op = '';
                        if (i === 0) {
                            if (withSelect) {
                                op += '<option value=""> ---请选择---</option>';
                            }
                        }
                        op += '<option value="' + mySelect.value[i] + '"';
                        if (mySelect.value[i] == defaultValue) {
                            op += ' selected="selected"';
                        }
                        op += '>';
                        if (withValue !== 'false' && i !== 0) {
                            //op += mySelect.value[i] + "&nbsp;-&nbsp;";
                        }
                        /*if(i === 0) {
                            if(withSelect) {
                                op += '---请选择---' + '</option>';
                            }else {
                                op += mySelect.content[i] + '</option>';
                            }
                        }else {
                            op += mySelect.content[i] + '</option>';
                        }*/
                        op += mySelect.content[i] + '</option>';
                        $selector.append($(op));
                    }
                }
            }
            // 恢复原始宽度
            if (style) {
                $selector.css('width', style);
            }

        }

    };

    /**
     * 缓存
     **/
    var SimpleCache = function(maxSize) {

        // 保存数据的map
        this.map = {};

        // 缓存的最大容量，默认缓存20个对象
        this.maxSize = 20;

        if (maxSize && maxSize !== '') {
            this.maxSize = maxSize;
        }

        // 当前缓存的容量
        this.size = 0;
    };

    SimpleCache.init = function(maxSize) {
        return new SimpleCache(maxSize);
    };

    SimpleCache.prototype = {

        /**
         * 根据key从缓存中取数据
         */
        get(key) {
            if (this.map.hasOwnProperty(key)) {
                var obj = this.map[key];

                obj.freq = obj.freq + 1;

                return obj.value;
            }

            return null;
        },

        /**
         * 保存数据到缓存,缓存容量到达上限后删除使用频率最低的
         */
        set(key, value) {
            this.map[key] = {
                value: value,
                freq: 0
            }

            this.size++;

            // 缓存容量到达上限后删除使用频率最低的
            if (this.size > this.maxSize) {
                var minKey = null,
                    minFreq = -1,
                    count = 0;
                for (var name in this.map) {
                    if (this.map.hasOwnProperty(name)) {
                        count++;
                        if (count == 1) {
                            minFreq = this.map[name].freq;
                            minKey = name;
                        }

                        if (this.map[name].freq < minFreq) {
                            minFreq = this.map[name].freq;
                            minKey = name;
                        }
                    }
                }

                delete this.map[minKey];
                this.size--;
            }
        },

        /**
         * 清空缓存
         */
        clear() {
            this.map = {};
            this.size = 0;
        }
    };
    /**
     * 缓存管理
     */
    var CacheManager = CacheManager || {
        /**
         * 获取下拉框缓存
         */
        getSelectCache() {
            return !window.selectCache ? (window.selectCache = SimpleCache.init(100)) : window.selectCache;
        },

        /**
         * 获取数据字典缓存
         */
        getCodeTypeCache() {
            return !window.codeTypeCache ? (window.codeTypeCache = SimpleCache.init(100)) : window.codeTypeCache;
        },
        /**
         * 获取用户名缓存
         */
        getUserNameCache() {
            return !window.userNameCache ? (window.userNameCache = SimpleCache.init(100)) : window.userNameCache;
        }
    };
    let cache = CacheManager.getCodeTypeCache();
    let orderStatusList = { //000-未完成办理 001-下单成功 002-受理中 003-已发货 004-持续还款中 005-交易完成 097-已逾期 098-配送失败 099-已取消
        datas: {
            value: ['', '001', '002', '003', '004', '010', '011', '097', '098', '099', '100'],
            content: ['所有', '下单成功', '支付成功/确认协议', '受理中', '已发货', '交易完成', '持续还款中', '已逾期', '配送失败', '已取消(会员)', '已取消(管理员)']
        }
    };
    cache.set('orderStatus', orderStatusList);

    util.cacheManager = CacheManager;

    return util;
});
