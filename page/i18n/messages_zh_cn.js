/**
 * 国际化-中文
 * @author 
 */
define(['jquery'], ($) => {
    var saless = {
        jobTitle: '简单分页展示',
        walkCountPlaceholder: '请输入walkCount',
        walkCountLabel: 'walkCount',
        jobContentPlaceholder: '请输入jobContent',
        jobContentLabel: '工作内容'
    };
    var goods = {
        goodsTitle: '商品列表',
        goodsName: '商品名称',
        goodsNamePlaceholder: '请输入商品名称',
        goodsStatus: '上下架状态'
    };
    var agents = {
        orderNamePlaceholder: '请输入订单客户姓名',
        phoneNoPlaceholder: '请输入电话号码',
        orderManageTitle: '订单管理',
        orderConfirmTitle: '订单受理',
        btnExport: '导出未受理的订单',
        btnBatchConfirm: '批量受理订单',
        orderName: '客户名称',
        phoneNo: '手机号码',
        dataSelect: '申请时间',
        orderListExport: '日期导出',
        distributionAdress: '配送地址',
        produceName: '商品名称',
        orderNo: '订单号',
        orderState: '订单状态',
        color: '颜色',
        orderPrice: '订单金额',
        accessory: '配置',
        lastTime: '最后状态变更时间',
        agentOrderShippmentTitle: '录入物流单号'
    };
    var basics = {
        headerTitle: "自主研发基础平台",
        btCreate: '新增',
        btView: '查看',
        btQuery: '查询',
        btQueryLoad: '查询中...',
        btUpdate: '修改',
        btDelete: '删除',
        btCustom1: '自定义按钮-通过模态窗口打开跳转',
        btCustom2: '自定义按钮-在指定的容器跳转',
        tableNumber: '序号',
        alert_submit: '确 定',
        alert_cancel: '取 消',
        alert_title: '提示',
        alert_numerror: '请输入正确格式',
        table_beyond_data: '查询的结果集过多，请输入更多的查询条件',
        table_not_data: '未查询到符合条件数据',
        table_delete_data: '删除成功',
        table_btn_export: '导出当前页',
        table_btn_exportAll: '导出查询结果',
        not_exporturl_tips: '请设置导出Url。',
        pager_previous: '上一页',
        pager_nextpage: '下一页',
        pager_homepage: '首页',
        pager_endpage: '未页',
        pager_everypage: '每页',
        pager_from: '从 ',
        pager_row: '行到',
        pager_total: '行/共',
        pager_datas: '条数据，',
        loading: '加载中',
        ajax_save_alert_title: '提示',
        ajax_save_alert_content: '是否保存?',
        error_404: '404，找不到请求api。',
        error_500: '500，服务器内部错误。',
        error_302: '302，没有权限访问。',
        error_403: '403，没有权限访问。',
        error_401: '401，没有权限访问。',
        error_503: '503，服务器过载或暂停维修。',
        error__1: '数据异常，请刷新后重试。',
        error: '数据异常，请刷新后重试。',
        error_timeout: '请求超时，请刷新后重试。',
        ajax_validatenum: '个域格式有错误',
        dbclick_title: '请选择',

        proposal_title: '顺丰速运',

        date_required: '必填字段',
        date_remote: '请修正该字段',
        date_email: '请输入正确格式的电子邮件',
        date_url: '请输入合法的网址',
        date_date: '请输入合法的日期',
        date_dateISO: '请输入合法的日期 (ISO).',
        date_number: '请输入合法的数字',
        date_digits: '只能输入整数',
        date_creditcard: '请输入合法的信用卡号',
        date_equalTo: '请再次输入相同的值',
        date_accept: '请输入拥有合法后缀名的字符串',
        date_maxlength: '请输入一个长度最多是 {0} 的字符串',
        date_maxlengthbit: '请输入一个长度最多是 {0} 的字节',
        date_minlength: '请输入一个长度最少是 {0} 的字符串',
        date_rangelength: '请输入一个长度介于 {0} 和 {1} 之间的字符串',
        date_range: '请输入一个介于 {0} 和 {1} 之间的值',
        date_max: '请输入一个最大为 {0} 的值',
        date_min: '请输入一个最小为 {0} 的值',
        date_stringEN: '只允许输入数字及字母',
        date_decimal: '只能输入数字(两位小数)',
        date_num: '只允许输入2位小数',
        date_kg: '只允许输入3位小数',
        date_pos: '不允许负数',
        date_phoneno: '输入的手机号码格式有误',
        date_byteRangeLength: '请确保输入的值在{0}-{1}个字节之间(一个中文字算2个字节)'
    };
    jQuery.extend(jQuery.validator.messages, {
        required: "必选字段",
        remote: "请修正该字段",
        email: "请输入正确格式的电子邮件",
        url: "请输入合法的网址",
        date: "请输入合法的日期",
        dateISO: "请输入合法的日期 (ISO).",
        number: "请输入合法的数字",
        digits: "只能输入整数",
        zdigits: "只能输入正整数",
        gnumber: '只能输入大于0的数据',
        creditcard: "请输入合法的信用卡号",
        equalTo: "请再次输入相同的值",
        accept: "请输入拥有合法后缀名的字符串",
        maxlength: jQuery.validator.format("请输入一个长度最多是 {0} 的字符串"),
        minlength: jQuery.validator.format("请输入一个长度最少是 {0} 的字符串"),
        rangelength: jQuery.validator.format("请输入一个长度介于 {0} 和 {1} 之间的字符串"),
        range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
        max: jQuery.validator.format("请输入一个最大为 {0} 的值"),
        min: jQuery.validator.format("请输入一个最小为 {0} 的值"),
        num: "请输入数字",
        kg: "请输入数字",
    });
    jQuery.validator.addMethod("num", function(value, element) {
        value = value.replace(/,/g, '').replace(/-/g, '');
        var l = $(element).data('decimal-length') ? parseInt(decimal) : 2,
            reg = new RegExp('(^[0-9]+$)|(^[0-9]+.[0-9]{' + l + '}$)');
        return this.optional(element) || value == '' || reg.test(value);
    });
    jQuery.validator.addMethod("kg", function(value, element) {
        value = value.replace(/,/g, '').replace(/-/g, '');
        var l = $(element).data('decimal-length') ? parseInt(decimal) : 3,
            reg = new RegExp('(^[0-9]+$)|(^[0-9]+.[0-9]{' + l + '}$)');
        return this.optional(element) || value == '' || reg.test(value);
    });
    jQuery.validator.addMethod("gnumber", function(value, element) {
        //var reg = new RegExp("^\d+(?:\.\d{1,2})?$");
        return this.optional(element) || value == '' || /^[1-9]\d*(\.\d{1,2})?$/.test(value);
    });
    jQuery.validator.addMethod("zdigits", function(value, element) {
        //var reg = new RegExp("^\d+(?:\.\d{1,2})?$");
        return this.optional(element) || value == '' || /^[1-9]\d*$/.test(value);
    });
    window.UtilMsg = $.extend({}, saless, basics, goods, agents);
});
