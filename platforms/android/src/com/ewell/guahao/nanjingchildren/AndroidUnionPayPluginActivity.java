package com.ewell.guahao.nanjingchildren;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Handler.Callback;
import android.os.Message;
import android.util.Log;
import com.unionpay.UPPayAssistEx;

public class AndroidUnionPayPluginActivity extends Activity implements Callback {
    private static final String LOG_TAG = "UnionPay";
    private Intent intentNew = null;


    private Context mContext = null;
    private final int mGoodsIdx = 0;
    private Handler mHandler = null;

    private static final int PLUGIN_VALID = 0;
    private static final int PLUGIN_NOT_INSTALLED = -1;
    private static final int PLUGIN_NEED_UPGRADE = 2;



    /*****************************************************************
     * mMode参数解释：
     *      "00" - 启动银联正式环境
     *      "01" - 连接银联测试环境
     *****************************************************************/
    private final String mMode = "00";

    String tn = null;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mContext = this;
     // “00” – 银联正式环境
     // “01” – 银联测试环境，该环境中不发生真实交易

     intentNew = this.getIntent();

     tn = intentNew.getStringExtra("tn");
     String serverMode = "00";
     int ret = UPPayAssistEx.startPay ( AndroidUnionPayPluginActivity.this, null, null, tn, serverMode);
     if( ret == UPPayAssistEx.PLUGIN_NOT_FOUND ){
    	 Log.i("union","银联控件没有安装");
     //安装Asset中提供的UPPayPlugin.apk
     // 此处可根据实际情况，添加相应的处理逻辑
     	boolean flag = UPPayAssistEx.installUPPayPlugin(AndroidUnionPayPluginActivity.this);

     	if(flag == true){
     		Log.i("union","银联控件安装完成----"+String.valueOf(flag));
//     		ret = UPPayAssistEx.startPay ( AndroidUnionPayPluginActivity.this, null, null, tn, serverMode);
     		finish();
     	}else{
     		Log.i("union","银联控件安装失败----"+String.valueOf(flag));
     		String msg = "安装银联控件失败，请重试";
     		Intent intent = new Intent();
            intent.putExtra("msg", msg);
            setResult(RESULT_OK, intent);

            finish();
     	}
     }

    }

    @Override
    public boolean handleMessage(Message msg) {
        Log.e(LOG_TAG, " " + "" + msg.obj);

        if (msg.obj == null || ((String) msg.obj).length() == 0) {
            AlertDialog.Builder builder = new AlertDialog.Builder(this);
            builder.setTitle("错误提示");
            builder.setMessage("网络连接失败,请重试!");
            builder.setNegativeButton("确定",
                    new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            dialog.dismiss();
                        }
                    });
            builder.create().show();
        } else {

            /*************************************************
             *
             *  步骤2：通过银联工具类启动支付插件
             *
             ************************************************/
            // mMode参数解释：
            // 0 - 启动银联正式环境
            // 1 - 连接银联测试环境
        	// UPPayAssistEx.startPayByJAR(AndroidUnionPayPluginActivity.this,PayActivity.class, null, null, tn, mMode);

        }

        return false;
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        /*************************************************
         *
         *  步骤3：处理银联手机支付控件返回的支付结果
         *
         ************************************************/
        if (data == null) {
            return;
        }

        String msg = "";
        /*
         * 支付控件返回字符串:success、fail、cancel
         *      分别代表支付成功，支付失败，支付取消
         */
        String str = data.getExtras().getString("pay_result");
        if (str.equalsIgnoreCase("success")) {
            msg = "9000";
        } else if (str.equalsIgnoreCase("fail")) {
            msg = "0000";
        } else if (str.equalsIgnoreCase("cancel")) {
            msg = "6001";
        }
        Intent intent = new Intent();
        intent.putExtra("msg", msg);
        setResult(-2, intent);

        finish();

    }

}
