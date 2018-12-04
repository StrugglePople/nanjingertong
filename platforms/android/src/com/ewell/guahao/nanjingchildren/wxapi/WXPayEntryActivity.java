package com.ewell.guahao.nanjingchildren.wxapi;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.tencent.mm.sdk.constants.ConstantsAPI;
import com.tencent.mm.sdk.modelbase.BaseReq;
import com.tencent.mm.sdk.modelbase.BaseResp;
import com.tencent.mm.sdk.modelpay.PayReq;
import com.tencent.mm.sdk.openapi.IWXAPI;
import com.tencent.mm.sdk.openapi.IWXAPIEventHandler;
import com.tencent.mm.sdk.openapi.WXAPIFactory;

public class WXPayEntryActivity extends Activity implements IWXAPIEventHandler{

	private static final String TAG = "WXPayEntryActivity";

    private IWXAPI api;

	private String APP_ID = "";

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);


        Intent thisIntent = this.getIntent();
        String appId = thisIntent.getStringExtra("appId");
        APP_ID = appId;
        String nonceStr = thisIntent.getStringExtra("nonceStr");
        String packageValue = thisIntent.getStringExtra("packageValue");
        String partnerId = thisIntent.getStringExtra("partnerId");
        String prepayId = thisIntent.getStringExtra("prepayId");
        String sign = thisIntent.getStringExtra("sign");
        String timeStamp = thisIntent.getStringExtra("timeStamp");
        String zhicallSerial = thisIntent.getStringExtra("zhicallSerial");
        Log.i("TAG","appId="+appId+"nonceStr="+nonceStr+"packageValue="+packageValue+"partnerId="+partnerId
        		+"prepayId="+prepayId+"sign="+sign+"timeStamp="+timeStamp+"zhlcallSerial"+zhicallSerial);
        api = WXAPIFactory.createWXAPI(this, appId);
        api.handleIntent(getIntent(), this);
        //api.registerApp(APP_ID);
       regToWx();

		PayReq req = new PayReq();
		req.appId = appId;
		req.partnerId = partnerId;
		req.prepayId = prepayId;
		req.nonceStr = nonceStr;
		req.timeStamp = timeStamp;
		req.packageValue = packageValue;
		req.sign = sign;
		boolean sendFlag = api.sendReq(req);
		String tag = "";
        if (true == sendFlag) {
            tag = "send true  发送微信成功";
            Log.i(TAG, tag);
        } else {
            tag = "send false 发送微信失败";
            Log.i(TAG, tag);
        }
    }

	@Override
	protected void onNewIntent(Intent intent) {
		super.onNewIntent(intent);
		setIntent(intent);
        api.handleIntent(intent, this);
	}

	@Override
	public void onReq(BaseReq req) {
	}


    //接受微信返回信息，并将状态发送到插件
	@Override
	public void onResp(BaseResp resp) {

		Log.i(TAG, "onPayFinish, errCode = " + resp.errCode);
		String msg = null;
		if (resp.getType() == ConstantsAPI.COMMAND_PAY_BY_WX) {
			Log.i(TAG, "resp.errCode======"+resp.errCode);
			String resultType = String.valueOf(resp.errCode);

			if (resultType.equals("0")) {
				msg = "9000";
			} else if (resultType.equals("-1")) {
				msg = "0000";
			} else if (resultType.equals("-2")){
				  msg = "6001";
			}

			 Intent intent = new Intent();
		     intent.putExtra("msg", msg);
		     intent.putExtra("WXFlag", "true");
		     setResult(RESULT_OK, intent);
		     finish();


		/*	AlertDialog.Builder builder = new AlertDialog.Builder(this);
			builder.setTitle("返回消息");
			builder.show();*/
		}


	}

private void regToWx() {

		api = WXAPIFactory.createWXAPI(this,APP_ID,true);
		boolean flag =  api.registerApp(APP_ID);
		Log.i(TAG, "flag======!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+flag);
		if(flag==false){
			Intent intent = new Intent();
			intent.putExtra("WXFlag", "false");
		    setResult(RESULT_OK, intent);
		    finish();
		}
	}
}
