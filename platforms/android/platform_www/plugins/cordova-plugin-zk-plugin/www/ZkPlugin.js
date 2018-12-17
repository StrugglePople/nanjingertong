cordova.define("cordova-plugin-zk-plugin.ZkPlugin", function(require, exports, module) {
  var exec = require('cordova/exec');

  exports.getVersionNumber = function(success, error) {
    exec(success, error, "ZkPlugin", "getVersionNumber");
  };

  exports.openMap = function(arg0, success, error) {
    exec(success, error, "ZkPlugin", "openMap", [arg0]);
  };

  exports.alipay = function(arg0, success, error) {
    exec(success, error, "ZkPlugin", "alipay", [arg0]);
  };

  exports.wxpay = function(arg0, success, error) {
    exec(success, error, "ZkPlugin", "wxpay", [arg0]);
  };
  exports.unionpay = function(arg0, success, error) {
    exec(success, error, "ZkPlugin", "unionPay", [arg0]);
  };
  exports.baidupush = function(arg0, success, error) {
    exec(success, error, "ZkPlugin", "baidupush", [arg0]);
  };
  exports.keepAlive = function (success, error) {
    exec(success, error, 'ZkPlugin', 'keepAlive', []);
  };

});
