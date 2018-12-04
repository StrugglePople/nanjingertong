package cordova.plugin.zk.plugin;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Handler;
import android.os.Message;

import com.alipay.sdk.app.PayTask;
import com.ewell.guahao.nanjingchildren.MainActivity;
import com.ewell.guahao.nanjingchildren.wxapi.WXPayEntryActivity;
import com.ewell.guahao.nanjingchildren.AndroidUnionPayPluginActivity;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

/**
 * This class echoes a string called from JavaScript.
 */
public class ZkPlugin extends CordovaPlugin {

  private static final String VERSION_NUMBER = "getVersionNumber";

  private static final String Map = "openMap";

  private static final String ALIPAY = "alipay";

  private static final String WXPAY = "wxpay";
  private static final String UNPay = "unionPay";
  private static final String BAIDUPUSH = "baidupush";
  private static final int SDK_PAY_FLAG = 1;
  private static final String KEEPALIVE = "keepAlive";
  public static CallbackContext keepCallbackContext;
  private CallbackContext wxCallbackContext;

  @Override
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    switch (action) {
      case VERSION_NUMBER:
        this.getVersionNumber(callbackContext); break;
      case Map:
        this.openMap((JSONObject) args.get(0), callbackContext); break;
      case ALIPAY:
        this.alipay((String)args.get(0), callbackContext); break;
      case WXPAY:
        this.wxpay((JSONObject) args.get(0), callbackContext); break;
      case UNPay:
        this.unionPay((String) args.get(0), callbackContext); break;
      case BAIDUPUSH:
        this.baidupush((String) args.get(0), callbackContext); break;
      case KEEPALIVE:
        this.keepAlive(callbackContext); break;
    }
    return true;
  }

  public void getVersionNumber(CallbackContext callbackContext) {
    try {
      PackageManager packageManager = this.cordova.getActivity().getPackageManager();
      callbackContext.success(packageManager.getPackageInfo(this.cordova.getActivity().getPackageName(), 0).versionName);
    } catch (Exception e) {
      callbackContext.success("N/A");
    }
  }
  /**
   * 打开地图
   * @param json
   * @param callbackContext
   */
  public void openMap(JSONObject json,  CallbackContext callbackContext) {
    try {
      String hospital = String.valueOf(json.get("hospital"));
      String lat = String.valueOf(json.get("lat"));
      String lon = String.valueOf(json.get("lon"));
      String address = String.valueOf(json.get("address"));
      if(isInstallByread("com.baidu.BaiduMap")){
        Intent intent = Intent.getIntent("intent://map/marker?location="+ lat + "," + lon +"&title=" + hospital + "&content="+ address +
          "&src=zhicall|zhicall#Intent;scheme=bdapp;package=com.baidu.BaiduMap;end");
        this.cordova.getActivity().startActivity(intent);
        callbackContext.success();
      } else if(isInstallByread("com.autonavi.minimap")){
        Intent intent = new Intent("android.intent.action.VIEW",
          android.net.Uri.parse("androidamap://viewMap?sourceApplication=appname&poiname="
            + hospital +"&lat="+ lat +"&lon="+ lon + "&dev=1"));
        intent.setPackage("com.autonavi.minimap");
        this.cordova.getActivity().startActivity(intent);
        callbackContext.success();
      } else {
        String invalidUrl = "http://app.zhicall.com/mobile-web/baidumap/baidumap.html?x=" + lat + "&y=" + lon;
        Intent intent = new Intent();
        intent.setAction("android.intent.action.VIEW");
        Uri content_url = Uri.parse(invalidUrl);
        intent.setData(content_url);
        this.cordova.getActivity().startActivity(intent);
      }
    } catch (Exception e) {

    }

  }

  private void alipay(String info, final CallbackContext callbackContext) {
    final String orderInfo = info;   // 订单信息
    Runnable payRunnable = new Runnable() {

      @Override
      public void run() {
        PayTask alipay = new PayTask(cordova.getActivity());
        Map<String, String> result = alipay.payV2(orderInfo, true);
        Map obj = new HashMap();
        obj.put("result", result);
        obj.put("callbackContext", callbackContext);
        Message msg = new Message();
        msg.what = SDK_PAY_FLAG;
        msg.obj = obj;
        payHandler.sendMessage(msg);
      }
    };
    // 必须异步调用
    Thread payThread = new Thread(payRunnable);
    payThread.start();
  }

  private void wxpay(JSONObject object, final CallbackContext callbackContext) throws JSONException{
    String appId = object.getString("payAppId");
    String nonceStr = object.getString("payNonceStr");
    String packageValue = object.getString("payPackage");
    String partnerId = object.getString("payPartnerid");
    String prepayId = object.getString("payPrepayid");
    String sign = object.getString("paySign");
    String timeStamp = object.getString("payTimestamp");
    String zhicallSerial = object.getString("zhicallSerial");
    try {
      Intent intent = new Intent().setClass(cordova.getActivity(), WXPayEntryActivity.class);
      intent.putExtra("appId", appId);
      intent.putExtra("nonceStr", nonceStr);
      intent.putExtra("packageValue", packageValue);
      intent.putExtra("partnerId", partnerId);
      intent.putExtra("prepayId", prepayId);
      intent.putExtra("sign", sign);
      intent.putExtra("timeStamp", timeStamp);
      intent.putExtra("zhicallSerial", zhicallSerial);

      this.cordova.startActivityForResult(this, intent, 1);
      this.wxCallbackContext = callbackContext;
    } catch (Exception e) {

    }

  }
  private void unionPay(String object, final CallbackContext callbackContext) throws JSONException{

    try {
      Intent intent = new Intent().setClass(cordova.getActivity(), AndroidUnionPayPluginActivity.class);
      intent.putExtra("tn", object);

      this.cordova.startActivityForResult(this, intent, 1);
      this.wxCallbackContext = callbackContext;
    } catch (Exception e) {

    }

  }
  private void baidupush(String object, final CallbackContext callbackContext) throws JSONException{
    Map map = new HashMap();
    map.put("channelId", MainActivity.channelId);
    map.put("userId", MainActivity.userId);
    JSONObject o = new JSONObject(map);
    callbackContext.success(o);
  }
  private void keepAlive(CallbackContext callbackContext){
    ZkPlugin.keepCallbackContext = callbackContext;
//    ZkPlugin.CourseCallback();
  }

  @SuppressLint("HandlerLeak")
  private Handler payHandler = new Handler() {
    @SuppressWarnings("unused")
    public void handleMessage(Message msg) {
      switch (msg.what) {
        case SDK_PAY_FLAG: {
          Map obj = (Map)msg.obj;
          CallbackContext callbackContext = (CallbackContext)obj.get("callbackContext");

          @SuppressWarnings("unchecked")
          PayResult payResult = new PayResult((Map<String, String>) obj.get("result"));
          /**
           对于支付结果，请商户依赖服务端的异步通知结果。同步通知结果，仅作为支付结束的通知。
           */
          String resultInfo = payResult.getResult();// 同步返回需要验证的信息
          String resultStatus = payResult.getResultStatus();
          // 判断resultStatus 为9000则代表支付成功
          if (resultStatus.equals("9000")) {
            // 该笔订单是否真实支付成功，需要依赖服务端的异步通知。
            callbackContext.success("9000");
          } else {
            // 该笔订单真实的支付结果，需要依赖服务端的异步通知。
            callbackContext.error(resultStatus);
          }
          break;
        }
        default:
          break;
      }
    };
  };

  /**
   * 判断是否安装目标应用
   * @param packageName 目标应用安装后的包名
   * @return 是否已安装目标应用
   */
  private boolean isInstallByread(String packageName) {
    return new File("/data/data/" + packageName).exists();
  }

  // onActivityResult为第二个Activity执行完后的回调接收方法
  @Override
  public void onActivityResult(int requestCode, int resultCode, Intent intent) {
    switch (resultCode) { // resultCode为回传的标记，我在第二个Activity中回传的是RESULT_OK
      case Activity.RESULT_OK:
        if(intent.getStringExtra("WXFlag").equals("false")){
          wxCallbackContext.error("2000"); //2000为未安装微信
        } else {
          String msg = intent.getStringExtra("msg");
          if ("9000".equals(msg)) {
            wxCallbackContext.success(msg);
          } else {
            wxCallbackContext.error(msg);
          }
        }
        break;
      case -2:
        String msg = intent.getStringExtra("msg");
        if ("9000".equals(msg)) {
          wxCallbackContext.success(msg);
        } else {
          wxCallbackContext.error(msg);
        }
      break;
      default:
        break;
    }
  }

}
