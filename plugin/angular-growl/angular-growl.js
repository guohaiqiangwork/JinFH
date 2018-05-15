/**
 * angular-growl - v0.4.0 - 2013-11-19
 * https://github.com/marcorinck/angular-growl
 * Copyright (c) 2013 Marco Rinck; Licensed MIT
 */
angular.module("angular-growl", []), angular.module("angular-growl").directive("growl", ["$rootScope", function (a) {
    "use strict";
    return {
        restrict: "A",
        template: '<div class="growl">	<div class="growl-item alert" ng-repeat="message in messages" ng-class="computeClasses(message)">		<button type="button" class="close" ng-click="deleteMessage(message)">&times;</button>       <div ng-switch="message.enableHtml">           <div ng-switch-when="true" ng-bind-html="message.text"></div>           <div ng-switch-default ng-bind="message.text"></div>       </div>	</div></div>',
        replace: !1,
        scope: !0,
        controller: ["$scope", "$timeout", "growl", function (b, c, d) {
            function e(a) {
                b.messages =[];
                b.messages.push(a), a.ttl && -1 !== a.ttl && c(function () {
                    b.deleteMessage(a)
                }, a.ttl)
            }

            var f = d.onlyUnique();
            b.messages = [], a.$on("growlMessage", function (a, c) {
                var d;
                f ? (angular.forEach(b.messages, function (a) {
                    c.text === a.text && c.severity === a.severity && (d = !0)
                }), d || e(c)) : e(c)
            }), b.deleteMessage = function (a) {
                var c = b.messages.indexOf(a);
                c > -1 && b.messages.splice(c, 1)
            }, b.computeClasses = function (a) {
                return {
                    "alert-success": "success" === a.severity,
                    "alert-error": "error" === a.severity,
                    "alert-danger": "error" === a.severity,
                    "alert-info": "info" === a.severity,
                    "alert-warning": "warn" === a.severity
                }
            }
        }]
    }
}]), angular.module("angular-growl").provider("growl", function () {
    "use strict";
    var a = null, b = !1, c = "messages", d = "text", e = "severity", f = !0;
    this.globalTimeToLive = function (b) {
        a = b
    }, this.globalEnableHtml = function (a) {
        b = a
    }, this.messagesKey = function (a) {
        c = a
    }, this.messageTextKey = function (a) {
        d = a
    }, this.messageSeverityKey = function (a) {
        e = a
    }, this.onlyUniqueMessages = function (a) {
        f = a
    }, this.serverMessagesInterceptor = ["$q", "growl", function (a, b) {
        function d(a) {
            a.data[c] && a.data[c].length > 0 && b.addServerMessages(a.data[c])
        }

        function e(a) {
            return d(a), a
        }

        function f(b) {
            return d(b), a.reject(b)
        }

        return function (a) {
            return a.then(e, f)
        }
    }], this.$get = ["$rootScope", "$filter", function (c, g) {
        function h(a) {
            p && (a.text = p(a.text)), c.$broadcast("growlMessage", a)
        }

        function i(c, d, e) {
            var f, g = d || {};
            f = {text: c, severity: e, ttl: g.ttl || a, enableHtml: g.enableHtml || b}, h(f)
        }

        function j(a, b) {
            i(a, b, "warn")
        }

        function k(a, b) {
            i(a, b, "error")
        }

        function l(a, b) {
            i(a, b, "info")
        }

        function m(a, b) {
            i(a, b, "success")
        }

        function n(a) {
            var b, c, f, g;
            for (g = a.length, b = 0; g > b; b++) if (c = a[b], c[d] && c[e]) {
                switch (c[e]) {
                    case"warn":
                        f = "warn";
                        break;
                    case"success":
                        f = "success";
                        break;
                    case"info":
                        f = "info";
                        break;
                    case"error":
                        f = "error"
                }
                i(c[d], void 0, f)
            }
        }

        function o() {
            return f
        }

        var p;
        try {
            p = g("translate")
        } catch (q) {
        }
        return {
            addWarnMessage: j,
            addErrorMessage: k,
            addInfoMessage: l,
            addSuccessMessage: m,
            addServerMessages: n,
            onlyUnique: o
        }
    }]
});