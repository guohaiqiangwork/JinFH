define(['app', 'jquery'], function (app, $) {
    app.registerDirective('percentage2', ['$compile', '$timeout', function ($compile, $timeout) {
        return {
            restrict: 'AE',
            require: 'ngModel',
            link: function linkFn(scope, elm, attrs, ctrl) {
                $('input[type=number]').keypress(function(e) {
                    if (!String.fromCharCode(e.keyCode).match(/[0-9\.]/)) {
                        return false;
                    }
                });
                if(angular.isUndefined(attrs.size) || attrs.size === ""){
                    attrs.size = 20;
                }

                $(elm).hide()
                    .wrap('<div class="input-group-percentage"></div>')
                    // .after('<span class="input-group-addon">%</span>')
                    .after('<div class="percentage-preview" style="width: ' + attrs.size*22 + 'px">{{' + attrs.ngModel + '| formatPercent1 }}</div>')
                    .after('<span></span>');

                //console.log("------------attrs.size's is : " + attrs.size);
                var previewElm = $(elm).parent().find('.percentage-preview');

                $compile(previewElm.contents())(scope);

                var isValid = true;
                $(elm).on('blur',function(){
                    if(isValid){
                        previewElm.show();
                        $(elm).hide();
                    }
                });

                previewElm.on('click', function(){
                    previewElm.hide();
                    $(elm).show().focus();
                });

                var FLOAT_REGEXP = /^(\d+((\.|\,)\d{1,2})?)?$/;
                // var MAX = 100.0;
                var timeout;
                ctrl.$parsers.push (function (viewValue) {
                    $timeout.cancel(timeout);
                    if(viewValue) {
                        if (FLOAT_REGEXP.test(viewValue)) {
                            console.log(viewValue)
                            // if (parseFloat(viewValue) > MAX) {
                            //     isValid = false;
                            //     // ctrl.$setValidity('percentage', false);
                            //     ctrl.$setValidity('percentage-over', false);
                            //     return (viewValue);
                            // } else {
                                isValid = true;
                                ctrl.$setValidity('percentage2', true);
                                ctrl.$setValidity('percentage-over', true);
                                return parseFloat(viewValue.replace(',', '.'));

                            // }
                        } else {
                            if (viewValue.indexOf('.', viewValue.length - 1) !== -1) {
                                timeout = $timeout(function () {
                                    ctrl.$setValidity('percentage2', false);
                                    console.log('delay');
                                }, 1500)

                            } else {
                                ctrl.$setValidity('percentage2', false);
                            }
                            isValid = true;

                            return (viewValue);
                        }
                    }
                });
            }

        };
    }]);
});