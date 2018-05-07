/**
 * 国际化-中文
 * @author 
 */
define(['jquery'], ($) => {
    var saless = {
        walkCountPlaceholder: 'please input walkCount',
        walkCountLabel: 'walkCount',
        jobContentPlaceholder: 'please input jobContent',
        jobContentLabel: 'jobContent'
    };
    var agents = {
        orderConfirmTitle: 'order confirm list',
        btnBatchConfirm: 'batch confirm',
        btnExport: 'export order',
        btnBatchConfirm: 'batch confirm',
        orderName: 'name',
        phoneNo: 'phone number',
        distributionAdress: 'distribution adress',
        produceName: 'produce name',
        color: 'color',
        accessory: 'accessory'
    };
    var basics = {
        headerTitle: "taiping overseas",
        btCreate: 'newly added',
        btView: 'view',
        btQuery: 'query',
        btQueryLoad: 'query...',
        btUpdate: 'modify',
        btDelete: 'delete',
        btCustom1: 'custom button - open the jump through the modal window',
        btCustom2: 'custom button - jump in the specified container',
        tableNumber: 'num',
        alert_submit: 'determine',
        alert_cancel: 'cancel',
        alert_title: 'prompt',
        alert_numerror: 'please enter the correct format',
        table_beyond_data: 'the result set of the query is too many, please enter more query conditions',
        table_not_data: 'no qualified data was found',
        table_delete_data: 'delete success',
        table_btn_export: 'export current page',
        table_btn_exportAll: 'export query results',
        not_exporturl_tips: 'please set export Url.',
        pager_previous: 'previous page',
        pager_nextpage: 'next page',
        pager_homepage: 'home page',
        pager_endpage: 'last page',
        pager_everypage: 'each page',
        pager_from: 'from ',
        pager_row: 'line to',
        pager_total: 'line/total',
        pager_datas: 'data，',
        loading: 'in loading',
        ajax_save_alert_title: 'prompt',
        ajax_save_alert_content: 'save?',
        error_404: '404，request not found api.',
        error_500: '500，server internal error.',
        error_302: '302，no access permissions.',
        error_403: '403，no access permissions.',
        error_401: '401，no access permissions.',
        error_503: '503，server overload or pause maintenance.',
        error__1: 'data exception, refresh and retry.',
        error: 'data exception, refresh and retry.',
        error_timeout: 'request timeout, refresh and retry.',
        ajax_validatenum: 'domain format error',
        dbclick_title: 'please select',

        proposal_title: 'sf-express',

        date_required: 'mandatory field',
        date_remote: 'please correct this field',
        date_email: 'please enter the correct format of e-mail',
        date_url: 'please enter a valid url',
        date_date: 'please enter a valid date',
        date_dateISO: 'please enter a valid date (ISO).',
        date_number: 'please enter a valid number',
        date_digits: 'input integer only',
        date_creditcard: 'please enter a valid credit card number',
        date_equalTo: 'please enter the same value again',
        date_accept: 'please enter a string with a valid suffix',
        date_maxlength: 'Please enter a string with a maximum length of {0}',
        date_maxlengthbit: 'Please enter a byte with a length of up to {0}',
        date_minlength: 'please enter a string with a minimum length of {0}',
        date_rangelength: 'please enter a string of length between {0} and {1}',
        date_range: 'please enter a value between {0} and {1}',
        date_max: 'please enter a maximum value of {0}',
        date_min: 'please enter a minimum value of {0}',
        date_stringEN: 'enter only numbers and letters',
        date_decimal: 'can only enter numbers (two decimal)',
        date_num: 'allow only 2 decimal places',
        date_kg: 'allow only 3 decimal places',
        date_pos: 'negative number not allowed',
        date_phoneno: 'enter the phone number format error',
        date_byteRangeLength: 'Make sure that the input value is between {0}-{1} bytes (2 bytes in a Chinese text)'
    };
    jQuery.extend(jQuery.validator.messages, {
        required: "required field",
        remote: "please correct this field",
        email: "please enter the correct format of e-mail",
        url: "please enter a valid url",
        date: "please enter a valid date",
        dateISO: "please enter a valid date (ISO).",
        number: "please enter a valid number",
        digits: "input integer only",
        creditcard: "please enter a valid credit card number",
        equalTo: "please enter the same value again",
        accept: "please enter a string with a valid suffix",
        maxlength: jQuery.validator.format("please enter a string with a maximum length of {0}"),
        minlength: jQuery.validator.format("please enter a string with a minimum length of {0}"),
        rangelength: jQuery.validator.format("please enter a string of length between {0} and {1}"),
        range: jQuery.validator.format("please enter a value between {0} and {1}"),
        max: jQuery.validator.format("please enter a maximum value of {0}"),
        min: jQuery.validator.format("please enter a minimum value of {0}"),
        num: "please enter a number",
        kg: "please enter a number",
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
    window.UtilMsg = $.extend({}, saless, basics, agents);
});
