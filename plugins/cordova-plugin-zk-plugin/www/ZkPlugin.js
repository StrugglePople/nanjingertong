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
