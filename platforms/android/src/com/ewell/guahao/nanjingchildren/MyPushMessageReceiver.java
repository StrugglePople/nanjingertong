package com.ewell.guahao.nanjingchildren;

import android.content.Context;

import com.baidu.android.pushservice.PushMessageReceiver;

import org.apache.cordova.PluginResult;
import org.json.JSONObject;

import java.util.List;

import cordova.plugin.zk.plugin.ZkPlugin;

/**
 * Created by Administrator on 2018/11/16.
 */

public class MyPushMessageReceiver extends PushMessageReceiver {
  @Override
  public void onBind(Context context, int errorCode, String appid,
                     String userId, String channelId, String requestId) {

    String responseString = "onBind errorCode=" + errorCode + " appid="
      + appid + " userId=" + userId + " channelId=" + channelId
      + " requestId=" + requestId;
    MainActivity.userId = userId;
    MainActivity.channelId = channelId;

    if (errorCode == 0) {
      // 绑定成功
    }
    // Demo更新界面展示代码，应用请在这里加入自己的处理逻辑
  }

  @Override
  public void onUnbind(Context context, int i, String s) {

  }

  @Override
  public void onSetTags(Context context, int i, List<String> list, List<String> list1, String s) {

  }

  @Override
  public void onDelTags(Context context, int i, List<String> list, List<String> list1, String s) {

  }

  @Override
  public void onListTags(Context context, int i, List<String> list, String s) {

  }

  @Override
  public void onMessage(Context context, String s, String s1) {

  }

  @Override
  public void onNotificationClicked(Context context, String s, String s1, String s2) {
    if (ZkPlugin.keepCallbackContext == null) return;
    JSONObject o = new JSONObject();
    try {
      o.put("type", "baiduPush");
    }catch (Exception e) {

    }
    PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, o);
    pluginResult.setKeepCallback(true);
    ZkPlugin.keepCallbackContext.sendPluginResult(pluginResult);
  }

  @Override
  public void onNotificationArrived(Context context, String s, String s1, String s2) {

  }
}
