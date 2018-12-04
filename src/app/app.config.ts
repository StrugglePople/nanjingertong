/**
 * Created by Administrator on 2017/5/10 0010.
 */
export class AppConfig {

  mode: string = 'product'; //debug:开发模式, product: 发布模式

  isInApp = false; //settingservice中会设置的

  hospitalId: number = 10035; //医院id 10035
  platform: string; //医院id 10035

  hospitalName: string = '南京市儿童医院'; //医院名字
  hospitalInfo: any ; //医院信息
  FIX_FACTOR = "zhicallM";

  url: any; //url集合，根据mode来确定是哪一个

  session: any = ''; //账户信息

  version:string = '3.1.0'; //版本号
  zyCardTypeId:any = ''; //住院号id

  windowListener = {
    message: 0
  };

  hospitalConfig = {
    noCard: true, //无卡预约
    twoLevelDept: 0, // 0:一级科室， 1：二级科室
    bindCard: 'CARDTYPE', //CARD:输入卡号，CARDTYPE：输入卡号和卡类型 CARDLIST：获取医院就诊卡列表（例：通大）
    supportCancelReg: 1,// 是否支持取消预约  0：不支持，1：支持
    supportCancelGua: 1, //是否支持退号  0：不支持，1：支持
    scheduleDaysForReg: 7, //预约天数
    isDeptTimePeriodSchedule: 1, // 0：为上下午  1：为时间段
    isExpertTimePeriodSchedule: 1, // 0：为上下午  1：为时间段
    from:0,                         //0:app 1:智康公众号 2:医院公众号 3:网页端 4：支付宝窗口  5：微信订阅号  6：微信服务号 7:自助机 9：第三方
    refreshRecord:0                  //记录详情返回记录列表是否刷新列表
  };

  baiduMapData = {
    guangzhou:{
      hospital: '南京儿童医院(广州路院区)',
      lat: '32.056415',
      lon: '118.785904',
      address: '南京市鼓楼区广州路72号'
    },
   hexi:{
     hospital: '南京儿童医院(河西院区)',
     lat: '31.988369',
     lon: '118.713741',
     address: '南京市建邺区江东南路8号'
   },
    hexiPark:{
      hospital: '南京河西儿童医院停车场',
      lat: '31.987903',
      lon: '118.7138',
      address: '南京市建邺区江东南路8号'
    }
  };
  constructor() {
    if(this.mode === 'debug'){
      this.url = {
        // mobile: 'http://172.16.30.33:8080/mobile-web',
        mobile: 'http://218.75.108.154:8818/hero-web',
        // mobile: 'http://172.16.10.215:8080/hero-web',
        // hexi: 'http://218.75.108.154:8818/hero-web',
        pay: 'http://paytest.zhicall.cn/pay-proxy',
        cms: 'http://218.75.108.154:8818/cms-web',
        assistant: 'http://218.75.108.154:8818/assistant-web',
        notify:'http://172.16.10.218:8086/notify-web',
        aliyun: 'http://218.75.108.154:8818/hero-web',
        // venus:'http://app.njch.com.cn:8081/venus-web'
        venus:'http://172.16.10.215:9999/helper-web'
      };
    }else if(this.mode === 'product'){
      this.url = {
        // mobile: 'http://app.njch.com.cn:8091/mobile-web',
        mobile: 'http://app.njch.com.cn:8091/mobile-web-hero',
        // hexi: 'http://app.njch.com.cn:8083/mobile-web',
        pay: 'http://pay.zhicall.cn/pay-proxy',
        cms: 'http://121.40.106.15:9090/cms-web',
        qn: 'http://o7of5kd2h.bkt.clouddn.com/',
        assistant: 'http://121.40.106.15:8080/assistant-web',
        notify: 'http://notify.zhicall.cn/notify-web',
        inHospital: 'http://inhospital.zhicall.cn:8099/inhospital-web',
        venus:'http://app.njch.com.cn:8091/helper-web'
      };
    }
  }
}
