import {Inject, Injectable} from '@angular/core';
import { Http, Headers, URLSearchParams} from '@angular/http';
import {LoadingController, Loading, Platform, DateTime} from 'ionic-angular';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AppConfig } from '../app/app.config'
import { Logger } from './logger'
import {DateService} from "./date.service";
import {WidgetService} from "./widget.service";
import {CacheService} from "./cache.service";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {ArrayObservable} from "rxjs/observable/ArrayObservable";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {Device} from "@ionic-native/device";
import * as CryptoJS from 'crypto-js/crypto-js';
/*
  Generated class for the HttpService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
/**
 * 请求服务
 */
@Injectable()
export class HttpService {
  private urls = {
    ajaxHospital: '/mobile/expand/getAgencyInfo',
    getMsgType: '/mobile/message/types',
    getMembers: '/mobile/patient/get/familyMembers/true/{?}/{this.app.hospitalId}',
    getCards: '/mobile/medicalcard/get/underAccount/{this.app.hospitalId}/{?}',
    getCardTypes : '/mobile/medicalcard/cardTypes/get/{this.app.hospitalId}',
    getPaperTypes: '/mobile/patient/get/paperType',
    //首页轮播配置
    getCarousel: '/outerInterface/carousel/getByHospitalId',
    doLogin: '/mobile/user/login',
    getForgetPwdSecCode: '/mobile/user/forgetpwd/verifycode/{?}',
    getRegisterSecCode: '/mobile/user/register/verifycode/{?}',
    loadContentInfo: '/mobile/more/hospitalNote/info',
    doRegister: '/mobile/user/register',
    doForgot: '/mobile/user/forgetpwd/reset',
    loadRollingLast:'/outerInterface/news/getByCatalogType/last',

    updateMember: '/mobile/patient/update',
    deleteMember: '/mobile/patient/unbind/{this.app.hospitalId}/{?}',
    addMember: '/mobile/patient/bind',
    deleteCard: '/mobile/medicalcard/unBind/{this.app.hospitalId}/{?}',
    addCard: '/mobile/medicalcard/bind',
    doChangePwd: '/mobile/user/updatepwd/new',
    getResetSecCode: '/mobile/user/reset/verifycode/{?}',
    doResetAccount: '/mobile/user/reset/{?}/{?}/{?}/{?}/{?}/{?}',
    //意见反馈
    submitFeedBack: '/mobile/more/suggestionFeedback/add',
    getFaqs: '/mobile/more/commonQuestion/{this.app.hospitalId}',

    loadHealthNewsCatalogs: '/outerInterface/catalog/get',
    loadHealthNewsCatalogsByParentId: '/outerInterface/catalog/getByParent',
    loadHealthNewsCatalogsByType: '/outerInterface/catalog/getByType',
    loadHealthNews: '/outerInterface/news/getByCatalog',
    loadHealthNewsDetail: '/outerInterface/news/getById',
    loadHealthNewsByType: '/outerInterface/news/getByCatalogType',
    //医院新闻
    loadHospitalNews: '/newsBulletin/getAllCatalog',
    loadHospitalNewsList: '/newsBulletin/getNewsBulletinByCatalogId',


    getYiGanResult: '/outerInterface/hbselftest',
    getCTCheckList: '/outerInterface/checklistitems',
    getCTCheckDetail: '/outerInterface/checklistitems/itemcontent',
    getBabyBloodType: '/outerInterface/babyBlood',

    getAppointmentOrRegOffline: '/mobile/report/regOffline',
    getAppointmentOrRegOnline: '/mobile/reports/regOnline/-1/-1/{?}/{?}',
    regDetail: '/mobile/reports/regRecord/detail/{?}',
    deleteRegRecord: '/mobile/guahao/record/delete/{?}', //businessNo
    tuihao: '/mobile/guahao/return/{this.app.hospitalId}/{?}', //applyId
    cancelYuyue: '/mobile/guahao/cancel/{?}/{?}', //businessNo
    getCheckInspect: '/mobile/reports/assayByPatient/-1/-1/{?}',
    getInspectDetailById: '/mobile/reports/assay/detail/{?}',
    getCheckup: '/mobile/reports/pacs/-1/-1/{?}',
    getCheckDetailById: '/mobile/reports/pacs/detail/{?}',
    getFee: '/mobile/report/expenseByPatient',
    getMedicine: '/mobile/reports/expenseByPatient/{this.app.hospitalId}/-1/{?}',
    getMedicineDetail: '/mobile/reports/expense/detail/{?}',
    getChufangRecord: '/mobile/reports/presByPatient/{this.app.hospitalId}/-1/{?}',
    getChufangRecordDetail: '/mobile/reports/prescription/detail/{this.app.hospitalId}/{?}',
    getCall: '/mobile/callnum/myCallNum/{?}/{this.app.hospitalId}',
    getVisitRecord: '/mobile/report/visitDoctor',

    // getDeptList: '/mobile/hospitals/reg/depts',
    getDeptList: '/mobile/hospital/{this.app.hospitalId}/depts/info',
    // getDeptList: '/mobile/hospital/{this.app.hospitalId}/depts/info',
    getAppointDeptList: '/mobile/hospital/-1/depts/reg/{?}',
    expertListBySchedule: '/mobile/hospital/{?}/experts/reg/{?}',
    expertListByDept: '/mobile/hospital/guidingDoctor/dept/experts',
    expertListByOneDay: '/mobile/schedule/hospital/{this.app.hospitalId}/dept/{?}/oneDay',
    deptsByExpert: '/mobile/hospital/{this.app.hospitalId}/get/underDepts/{?}',

    getScheduleForExpert: '/mobile/schedule/hospital/{?}/dept/{?}/expert/{?}/info',
    getTimeListBySchedule: '/mobile/schedule/nolist',
    getScheduleForDept: '/mobile/schedule/{?}/dept/{?}/info',
    canOrNotSubmit: '/mobile/guahao/apply/validate',
    commitReg: '/mobile/guahao/apply/new',
    confirmReg: '/mobile/guahao/confirm/new/{this.app.hospitalId}/{?}',

    paySummary: '/payment/getSummary',
    payTrade: '/payment/trade',
    getGuahaoState:'/mobile/guahao/status/{this.app.hospitalId}/{?}',

    addFavorites: '/mobile/more/favorites/add',
    cancelFavorites: '/mobile/more/favorites/cancel',
    getFavorites: '/mobile/more/favorites/list',
    testFavorites: '/mobile/more/favorites/test',

    getMessagesNum: '/mobile/message/unread/amount',
    getMessages: '/mobile/message/list',
    readMessage: '/mobile/message/read/{?}',
    deleteMessage: '/mobile/message/delete/{?}',

    myCallNum: '/mobile/callnum/myCallNum/{?}/{this.app.hospitalId}',

    billing: '/mobile/payment/bill/cur/list',
    billed: '/mobile/payment/bill/histroy/list',
    payForBill: '/mobile/payment/fund',

    getAllDepts: '/mobile/hospital/guidingDoctor/depts',
    getAllDeptsSchedule: '/mobile/hospital/-1/depts/reg/1',
    getAllDepts2: '/mobile/hospital/100352/static/dept/info',
    // getAllDepts2: '/mobile/admin/dept/load',
    getAllVisitDepts: '/mobile/hospital/{this.app.hospitalId}/depts/reg/1',
    getVisitByDept: '/outerInterface/getOutpatientSchedules',
    // getAllExperts: '/mobile/hospital/guidingDoctor/experts',
    getAllExpertsHasSchedule: '/mobile/hospital/reg/experts/-1',
    getAllExperts: '/mobile/hospital/100352/experts',
    getStaticExpertsByDept: '/mobile/hospital/{?}/experts/reg/{?}',
    getDeptDetailInfo: '/mobile/schedule/{?}/dept/{?}/info',

    getStaticExpertsByTitle: '/mobile/hospital/guidlingDoctor/experts/title',

    getDiagnoseFirstPart: '/mobile/guide/bodypart/first/{?}',
    getDiagnoseTwoPart: '/mobile/guide/bodypart/second/{?}/{?}',
    getSymptom: '/mobile/guide/symptoms/{?}',
    getDisease: '/mobile/guide/disease/matched/{?}',
    getDiseaseDetail: '/mobile/guide/disease/detail/{?}/matchedDept/{this.app.hospitalId}',

    getCardBalance: '/mobile/medicalcard/get/balance',
    cardRecharge: '/mobile/medicalcard/charge',
    cardRechargeResult: '/mobile/medicalcard/get/chargeResult',
    inHospitalInventory: '/mobile/reports/inPatientFee/{this.app.hospitalId}/-1/{?}',

    searchHotList: '/rest/search/hot/words',
    searchList: '/rest/search/app/word',
    searchResultList: '/rest/search/app/list',
    searchDept: '/rest/search/app/dept',
    searchDoctor: '/rest/search/app/doctor',
    // chargeRecords: '/mobile/special/queryInpatientChargeRecordWithBind',
    chargeRecords: '/mobile/medicalcard/get/chargeRecords',
    //院内导航
    getBuildingDetail: '/mobile/more/floorNavigation/{?}/{?}',
    getBuildingAll: '/mobile/more/floorNavigation/all',
    /*住院服务*/
    getZhuyuanHistory: '/mobile/special/getInpatien',
    getDayListRecord: '/mobile/report/inPatientFee',
    //
    serchPhysical: '/mobile/special/getPhyExamReport',
    //排队叫号
    getCallnum: '/mobile/callnum/realTimeList/{?}/{this.app.hospitalId}',
    getScheduleCllNumList: '/mobile/hospital/{this.app.hospitalId}/experts/reg/{?}',
    getCommonScheduleCllNum: '/mobile/callnum/realTimeNum/hospital/{this.app.hospitalId}/dept/{?}/10',



    /*满意度调查*/
    getInspectTopic: '/mobile/survey/get/topic',
    getInspectFirst: '/mobile/survey/get/subject/start',
    getInspect: '/mobile/survey/subject/{?}',
    commitInspect: '/mobile/survey/answer',
    getAllInspectQuestion:'/mobile/survey/subject/list',

    getAppVersion : '/mobile/more/version/current/{this.app.hospitalId}/{?}',

    bindPush: '/notify/push/bind',
    unBindPush: '/notify/push/unBind',

    provinceCode: '/mobile/patient/getAllProvinceInfo',
    cityCode: '/mobile/patient/getAllCityInfoBypCode',
    areaCode: '/mobile/patient/getAllAreaInfoBysCode',
    streetCode: '/mobile/patient/getAllStreetInfoByqCode',

    // address: '/mobile/more/{?}/address',

    //孕产保健
    getPreDate: '/edc/get', 		//获取预产期
    addPreDate: '/edc/add',  //新增预产期
    ajaxPregnantSituation: '/noticeSituations/situation/get',  //获取某医院的孕妇周变化情况概要
    ajaxPregnantNotice: '/noticeSituations/notice/get',  //获取某医院的孕妇月注意事项详情
    ajaxPregnantCheckSchedule: '/screening/schedules/get/sevenDay',  //查询中心日期前后三天（共7天）某医院的孕产检时间

    survey: '/mobile/survey/subject/list',
    surveyTopic: '/mobile/survey/get/topic',
    answer: '/mobile/survey/answer',
    // note: '/newsBulletin/getNewsBulletinById',
    //首页通知公告
    note: '/mobile/more/appNote',
    //南京儿童独有
    searcPriceItem:'/outerInterface/item/getItem',
    searcPriceSubItem:'/outerInterface/item/getItemCharge',
    //停车缴费
    searcParkingState:'/mobile/parking/getfreespacenum',
    getplatenobyaccount:'/mobile/parking/getplatenobyaccount',
    showParkingPay:'/mobile/parking/getparkingpaymentinfo',
    showParkingPayRecord:'/mobile/parking/parkingpaymentrecords',
    deletePlateno:'/mobile/parking/delete',
    addPlateno:'/mobile/parking/bind',
    parkingFund:'/mobile/parkingpayment/fund',
    getParkDistribution:'/mobile/parking/getfloorlist',



  };
  loadingIsOpen:any;
  loading:any;
  constructor(public http: Http, private app: AppConfig, private loadingCtrl: LoadingController,
              @Inject('DataService') public dataService, private logger: Logger,  private dateService: DateService,
              private widgetService: WidgetService, private cacheService: CacheService, private platform: Platform,
              private iab: InAppBrowser, public device: Device) {
  }
  private showLoading(content: any = ''): void {
    if(typeof content != 'string'){
      content = '';
    }
    if (!this.loadingIsOpen) {
      this.loadingIsOpen = true;
      this.loading = this.loadingCtrl.create({
        // dismissOnPageChange:true,
        content: content
      });
      this.loading.present();
    }else{
      this.loading.setContent(content);
    }
  };
  private hideLoading(): void {
    this.loadingIsOpen && this.loading.dismiss();
    this.loadingIsOpen = false;
  };
  //创建一个延时
  public setTimeoutmin(times){
    this.showLoading();
    setTimeout(()=>{
      this.hideLoading();
    },times)
  }
  private setURL(id, args) {
    let url = this.urls[id];
    if( typeof url === 'undefined' )
      throw "no url!";
    let matchs = url.match(/\{[a-zA-Z\.]+\}/g);
    for( let j in matchs ) {
      if (typeof matchs[j] !== 'string') continue;
      let evalStr = matchs[j].substr(1,matchs[j].length-2);
      url = url.replace(/\{[a-zA-Z\.]+\}/,eval(evalStr));
    }
    if (!args) return url;
    for(let i = 0; i < args.length ; i++ ) {
      if( url.indexOf('{?}') < 0 )
        break;
      url = url.replace(/\{\?\}/, args[i]+'');
    }
    //最后是否有/{?}
    if( url.lastIndexOf('/{?}') > -1 ) {
      url = url.substr(0, url.lastIndexOf('/{?}'));
    }
    return url;
  }
  //loaderFalse  不弹出失败信息   notHideLoad：请求成功之后不隐藏弹框
  public post(urlId: string, hasLoading: boolean | string, paramObj?: any, restParam?:any[], head?: string,loaderFalse?: boolean,notHideLoad?): Observable<any> {
    let url:string = this.setURL(urlId, restParam);

    let urlSearchParams = new URLSearchParams();
    if (paramObj) {
      for (let x in paramObj) {
        if (typeof paramObj[x] != 'object' && (paramObj[x] || paramObj[x] === 0)) {
          urlSearchParams.append(x, paramObj[x]);
        }
      }
    }
    if(!urlSearchParams.has('hospitalId')){
      urlSearchParams.append('hospitalId', String(this.app.hospitalId));
    }
    urlSearchParams.append('version', this.app.version);
    // urlSearchParams.append('isroot', "ts");
    urlSearchParams.append('deviceId', this.device.uuid ? this.device.uuid : 'dbd3842eb62159fa');

    url = head ? (head + url) : (this.app.url.mobile + url);
    if (hasLoading) {
      this.showLoading(hasLoading);
    }
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let headIndex = 0, urlSign = "";
    if(this.app.mode == "product"){
      headIndex = url.indexOf("/mobile-web-hero");
    }else {
      headIndex = url.indexOf("/hero-web");
    }
    if(!head && headIndex > 0){
      urlSign = this.app.mode == "product" ? '/mobile-web' + url.slice(headIndex+16) : '/mobile-web' + url.slice(headIndex+9);
      let arr:string[] = [], paramesObj:object = {};
      urlSearchParams.paramsMap.forEach(function (value, key) {
        arr.push(key);
      });
      arr.sort();
      arr.forEach(function (value) {
        paramesObj[value] = urlSearchParams.get(value);
      });
      let parameData = urlSign + JSON.stringify(paramesObj).replace(/"/g, "").replace(/\[]/g,"");
      let dataSign = CryptoJS.MD5(parameData);
      headers.append('Data-Sign',dataSign);
    }
    return this.http.post(url, urlSearchParams.toString(), {headers: headers})
      .map(res => {
        let obj = res.json();
        if(obj.content){
          obj = JSON.parse(this.decryptByAes(obj.content));
        }
        if (hasLoading) {
          if ((obj && obj.success) || loaderFalse) {
            if(!notHideLoad){
              this.hideLoading();
            }
          } else {
            let msg: string = '网络异常';
            if (obj) {
              msg = obj.errMsg;
            }
            this.showLoading(msg);
            setTimeout(() => {
              this.hideLoading();
            }, 2000);
            // loader.setDuration(2000);
          }
        }
        this.logger.log('======>url<=====' + url);
        this.logger.log('======>param<====' + urlSearchParams.toString());
        this.logger.log(obj);
        return obj;
      })
      .catch((error: Response) => {
        if (hasLoading) {
          this.showLoading('网络异常');
          // loader.setContent('网络异常');
          setTimeout(() => {
            this.hideLoading();
          }, 2000);
        }
        this.logger.log('======>url<=====' + url);
        this.logger.log('======>param<====' + JSON.stringify(paramObj));
        this.logger.log(error);
        return ArrayObservable.of('I')
        // return Observable.throw(new Error('连接服务器失败'));
      });
  }

  public postText(urlId: string, hasLoading: boolean | string, paramObj?: any, restParam?:any[], head?: string): Observable<any> {
    let url = this.setURL(urlId, restParam);

    let urlSearchParams = new URLSearchParams();
    if (paramObj) {
      for (let x in paramObj) {
        if (paramObj[x] || paramObj[x] === 0) {
          urlSearchParams.append(x, paramObj[x]);
        }
      }
    }
    urlSearchParams.append('hospitalId', String(this.app.hospitalId));
    urlSearchParams.append('version', this.app.version);
    urlSearchParams.append('deviceId', this.device.uuid ? this.device.uuid : 'xxx');

    url = head ? (head + url) : (this.app.url.mobile + url);
    let loader: Loading;
    if (hasLoading) {
      loader = this.loadingCtrl.create({
        dismissOnPageChange:true
      });
      if (typeof hasLoading == 'string') {
        loader.setContent(hasLoading);
      }
      loader.present();
    }

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(url, urlSearchParams.toString(), {headers: headers})
      .map(res => {
        loader.dismiss();
        return res;
      })
      .catch((error: Response) => {
        if (loader) {
          loader.setContent('网络异常');
          loader.setDuration(2000);
        }
        this.logger.log('======>url<=====' + url);
        this.logger.log('======>param<====' + JSON.stringify(paramObj));
        this.logger.log(error);
        return ArrayObservable.of('I')
        // return Observable.throw(new Error('连接服务器失败'));
      });
  }
  /**********************************业务请求*******************************************/

  /**
   * 加载banners
   * @param hasLoading 请求是否有菊花
   * @returns {Observable<any>}
   */

  public ajaxHospital(): Observable<any> {
    return this.post('ajaxHospital', true);
  }
  public loadBanners(hasLoading: boolean): Observable<any> {
    let oldCache = this.cacheService.get('cache.banner'),
      nowTime = this.dateService.format(new Date());
    if (oldCache && oldCache.time == nowTime && oldCache.data) {
      let sub = new ReplaySubject();
      sub.next(oldCache.data);
      return sub;
    }
    return this.post('getCarousel', hasLoading, '', [], this.app.url.cms);
  }

  /**
   * 通知公告
   * @returns {Observable<any>}
   */
  public note(): Observable<any> {
    return this.post('note', false);
  }
  /**
   * 进入app弹框提示
   * @returns {Observable<any>}
   */
  public loadRollingLast(): Observable<any>  {
    return this.post('loadRollingLast', false, {
      type:'ROLLING'
    }, [], this.app.url.cms);
  }
  /**********************************就诊卡充值start*******************************************/
  public getCardBalance(param,hasLoading): Observable<any> {
    return this.post('getCardBalance', true, param);
  }
  //

  public cardRechargeLimit(param): Observable<any> {
    return this.post('RechargeLimit', true, param);
  }
  public cardRecharge(param): Observable<any> {
    return this.post('cardRecharge', true, param);
  }
  /**
   * 获取就诊卡充值记录
   * @param patientId
   * @returns {Observable<any>}
   */
  getRechargeRecord(patientId): Observable<any> {
    let data = {
      patientIdStr: patientId,
      type:'MEDICAL_CARD_CHARGE'
    };
    return this.post('chargeRecords', true, data);
  }
  getRechargeRecordBycard(data): Observable<any> {
    return this.post('chargeRecords', true, data);
  }
  /**********************************就诊卡充值end*******************************************/
  /*********************住院服务start****************************/
  //住院记录
  getZhuyuanHistory(data): Observable<any> {
    return this.post('getZhuyuanHistory', true, data);
  }
  /**
   * 获取住院日清单
   * @param type （0：预约， 1：挂号）
   * @param patientId
   * @param yearMonth
   * @returns {Observable<any>}
   */
  getDayListRecord(data): Observable<any> {
    return this.post('getDayListRecord', true, data);
  }
  /*********************住院服务end****************************/
  /**********************************资讯相关start*******************************************/
  /**
   * 根据类型获取资讯列表
   * @param param 例子: {type: 'HEALTH', pageNum: 1, pageSize: 5}
   * @returns {Observable<any>}
   */
  public loadHealthNewsByType(param): Observable<any> {
    return this.post('loadHealthNewsByType', false, param, [], this.app.url.cms);
  }

  /**
   * 根据id获取资讯详情
   * @param id
   * @returns {Observable<any>}
   */
  loadHealthNewsDetail(id,paltform?): Observable<any>  {
    let data = {
      newsId: id
    };
    if(paltform){
      data['platformType'] = paltform;
    }
    return this.post('loadHealthNewsDetail', false, data, [], this.app.url.cms);
  }

  /**
   * 根据类型获取对应的类
   * @param type
   * @returns {Observable<any>}
   */
  loadCatalogKindByType(type,noLoad?): Observable<any> {
    return this.post('loadHealthNewsCatalogsByType', noLoad?false:true, {type: type}, [], this.app.url.cms);
  }

  /**
   * 根据大类id获取下面的小类列表
   * @param id
   * @returns {Observable<any>}
   */
  loadHealthNewsCatalogsByParentId(id): Observable<any> {
    return this.post('loadHealthNewsCatalogsByParentId', true, {parentId: id}, [], this.app.url.cms);
  }

  //根据id获取资讯列表
  loadCatalogList (option,noLoad?): Observable<any> {
    return this.post('loadHealthNews', noLoad?false:true, option, [], this.app.url.cms);
  }
  /**********************************资讯相关end*******************************************/
  /**********************************医院新闻start*******************************************/
  loadHospitalNews(): Observable<any> {
    return this.post('loadHospitalNews', true, null, [], this.app.url.aliyun);
  }
  loadHospitalNewsList (option): Observable<any> {
    return this.post('loadHospitalNewsList', true, option, [], this.app.url.aliyun);
  }
  /**********************************医院新闻end*******************************************/

  /**********************************医学工具start*******************************************/
  /**
   * 根据身高和重量获取结果
   * @param height
   * @param weight
   * @returns {left:距离条状图左边距离,bmiResult:bmi结果,sort:简要结论,tip:具体结论}
   */
  calculateResult(height, weight): any {
    let result = Number((weight/height/height * 10000).toFixed(0)),
      index = 0;
    for (let i = 0; i < this.dataService.bmi.sv.length; i++) {
      if(result >= this.dataService.bmi.sv[i][0] && result < this.dataService.bmi.sv[i][1]){
        index = i;
        break;
      }
    }
    let left = (result - 15) / 30 * 300;
    left = Number(left.toFixed(2));
    return {
      left: left,
      bmiResult: result,
      weight: weight,
      height: height,
      sort: this.dataService.bmi.sn[index],
      tip: this.dataService.bmi.tips[index]
    };
  }

  /**
   * 查询检验单解读
   * @param str 模糊匹配字符串
   * @returns {Observable<any>}
   */
  searchCheckSelf(str): Observable<any> {
    return this.post('getCTCheckList', true, {keyWord: str}, [], this.app.url.cms);
  }

  /**
   * 通过code获取检验单详情
   * @param code
   * @returns {Observable<any>}
   */
  searchCheckSelfDetail(code): Observable<any> {
    return this.post('getCTCheckDetail', true, {itemCd: code}, [], this.app.url.cms);
  }

  /**
   * 获取乙肝结果
   * @param param
   * @returns {Observable<any>}
   */
  searchHepatitis(param): Observable<any> {
    return this.post('getYiGanResult', true, param, [], this.app.url.cms);
  }

  //宝宝血型
  searchBlood(fatherBlood, motherBlood): Observable<any> {
    if(fatherBlood < 0 || motherBlood < 0){
      this.widgetService.toast('父亲和母亲的血型都不能为空');
      return;
    }
    let data = {
      "fatherBlood": fatherBlood + 1,
      "motherBlood": motherBlood + 1
    };
    return this.post('getBabyBloodType', true, data, [], this.app.url.cms);
  }
  /**********************************医学工具end*******************************************/

  /**********************************更多相关start*******************************************/
  /**
   * 根据type获取后台的动态信息
   * @param type
   * @returns {Observable<any>}
   */
  getHtmlInfo(type): Observable<any> {
    return this.post('loadContentInfo', true, {type: type});
  }

  /**
   * 获取常见问题，缓存1天
   */
  getFaqs(): Observable<any> {
    let faqs = this.cacheService.get('faqs'),
        nowTime = new Date().getTime();
    if (faqs && faqs.data && nowTime - faqs.time < this.dataService.time.MILLIS_1_DAY) {
      let sub = new ReplaySubject();
      sub.next(faqs.data);
      return sub;
    }
    return this.post('getFaqs', true);
  }

  getVersion(hasLoading,notHideLoad?): Observable<any> {
    let system = this.platform.is('ios') ? 'iphone' : 'android';
    function hasNewVersion(version: string, currentVersion: string): boolean{
      let hasNew = false,
          v1 = version.split('.'),
          v2 = currentVersion.split('.');

      for (let i = 0; i < 3; ++i) {
        if (Number(v1[i])> Number(v2[i])) {
          hasNew = true;
          break;
        } else if (Number(v1[i]) <  Number(v2[i])) {
          hasNew = false;
          break;
        }
      }
      return hasNew;
    }
    let sub = new ReplaySubject();
    this.post('getAppVersion', hasLoading, null, [system],this.app.url.assistant,null,notHideLoad)    //this.app.url.assistant
      .catch((error: Response) => {
        sub.next({
          isCatch: true
        });
        return Observable.throw(error);
      })
      .subscribe(json => {
        if (json.success) {
          let version = json.data.versionID;
          if (hasNewVersion(version, this.app.version)) {
            if(json.data.mustUpgrade === 'NO') {
              sub.next({
                isNew: true,
                isMust: false,
                version: version,
                url: json.data.versionUrl,
                content: json.data.content
              });
            } else {
              this.widgetService.alert('有新版本' +version + '需要更新:  ' + json.data.content,
                (val) => {
                  this.cacheService.removeKey('zhicall.app.deferUpdate');
                  let browser = this.iab.create(json.data.versionUrl, '_system');
                  browser.show();
                  sub.next({
                    isNew: true,
                    isMust: true,
                    version: version,
                    url: json.data.versionUrl,
                    content: json.data.content
                  });
                } );
            }
          } else {
            sub.next({
              isCatch: true,
            });
          }
        } else {
          sub.next({
            isCatch: true,
          });
        }
      });
    return sub;
  }

  /**
   * 意见反馈
   * @param content
   * @param mobile
   * @returns {Observable<any>}
   */
  feedBack(content, mobile): Observable<any> {
    let param = {content: content, phoneNum: mobile};
    return this.post('submitFeedBack', true, param);
  }
  /**********************************更多相关end*******************************************/

  /******************个人中心相关start******************/
  /**
   * 登录
   * @param mobile
   * @param password
   * @returns {Observable<any>}
   */
  login(mobile, password,notHideLoad?): Observable<any> {
    return this.post('doLogin', true, {mobileNo: mobile, password: password},null,null,null,notHideLoad);
  }
  bindPush(param): Observable<any> {
    return this.post('bindPush', false, param,null,this.app.url.notify,null,null);
  }
  unBindPush(param): Observable<any> {
    return this.post('unBindPush', false, param,null,this.app.url.notify,null,null);
  }
  /**
   * 注册
   * @param mobileNo
   * @param password
   * @param confirmPassword
   * @param verifyCode 手机验证码
   * @returns {Observable<any>}
   */
  register(mobileNo, password,confirmPassword,verifyCode): Observable<any> {
    return this.post('doRegister', true,
      {
        mobileNo: mobileNo,
        password: password,
        confirmPassword: confirmPassword,
        verifyCode: verifyCode
      });
  }
  /**
   * 获取验证码
   * @param type 类型（注册，忘记密码，账号...）
   * @param mobile
   * @param param （图片验证码）
   * @returns {Observable<any>}
   */
  securityCode(type, mobile, param?: any): Observable<any> {
    let urlId = 'get' + type.substr(0,1).toUpperCase() + type.substr(1) + 'SecCode';
    return this.post(urlId, true, param, [mobile])
  }

  /**
   * 忘记密码
   * @param mobileNo
   * @param newPassword
   * @param verifyCode 手机验证码
   * @returns {Observable<any>}
   */
  forgetPassword(mobileNo, newPassword, verifyCode): Observable<any> {
    let param = {
      mobileNo: mobileNo,
      newPassword: newPassword,
      confirmPassword: newPassword,
      verifyCode: verifyCode
    };
    return this.post('doForgot', true, param);
  }

  /**
   * 重置密码
   * @param oldPassword
   * @param newPassword
   * @param confirmPassword
   * @returns {Observable<any>}
   */
  resetPassword(oldPassword, newPassword, confirmPassword): Observable<any> {
    let param = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
      accountIdStr: this.app.session.id
    };
    return this.post('doChangePwd', true, param);
  }

  /**
   * 重置账号
   * @param password
   * @param mobile
   * @param securityCode
   * @returns {Observable<any>}
   */
  resetAccount(password, mobile, securityCode): Observable<any> {
    return this.post('doResetAccount', true, null, [this.app.session.id, this.app.session.mobile,
      password, mobile, password, securityCode]);
  }

  /**
   * 获取地址列表
   * @param parentCode
   * @param callback
   */
  getAddress(parentType,parentCode,requestType): Observable<any> {
    let url = parentType;
    let data = {};
    if(requestType){
      data[requestType] = parentCode;
    }
    return this.post(url, true, data);
  }

  /**
   * 删除成员
   * @param id
   * @returns {Observable<any>}
   */
  deleteMember(id): Observable<any> {
    return this.post('deleteMember', true, null, [id]);
  }

  /**
   * 保存或更新成员信息
   * @param member
   * @returns {Observable<any>}
   */
  saveMember(member): Observable<any> {
    return this.post(member.id > 0 ? 'updateMember' : 'addMember', true, member);
  }

  /**
   * 获取卡类型
   */
  getCardTypes() {
    this.post('getCardTypes', false)
      .subscribe(json => {
        if (json.success) {
          let cardTypes = [];
          for(let i=0;i<json.data.length;i++){
            if(json.data[i].name == '住院号'){
              this.app.zyCardTypeId = json.data[i].id;
              continue;
            }
            cardTypes.push(json.data[i]);
          }
          this.cacheService.set('cache.cardTypes', cardTypes);
        }
      })
  }

  /**
   * 获取身份类型
   */
  getPaperTypes() {
    this.post('getPaperTypes', false)
      .subscribe(json => {
        if (json.success) {
          this.cacheService.set('cache.paperTypes', json.data);
        }
      })
  }

  /**
   * 删除就诊卡
   * @param id
   * @returns {Observable<any>}
   */
  deleteCard(id): Observable<any> {
    return this.post('deleteCard', true, null, [id]);
  }

  /**
   * 新增卡
   * @param data 卡对象，具体字段看业务
   * @returns {Observable<any>}
   */
  saveCard(data): Observable<any> {
    return this.post('addCard', true, data);
  }

  /**
   * 判断是否关注医生
   * @param targetId
   * @returns {Observable<any>}
   */
  testAttention(targetId): Observable<any> {
    return this.post('testFavorites', false, {accountIdStr: this.app.session.id, targetId: targetId});
  }
  //关注
  addAttention(targetId, favoriesType): Observable<any> {
    return this.post('addFavorites', true, {accountIdStr: this.app.session.id, targetId: targetId, favoriesType: favoriesType});
  }

  //取消关注
  cancelAttention(id): Observable<any> {
    return this.post('cancelFavorites', true, {id: id});
  }
  //获取关注列表
  getAttentions(): Observable<any> {
    return this.post('getFavorites', true, {accountIdStr: this.app.session.id});
  }
  /**********************************个人中心相关end*******************************************/

  /******************信息记录查询start******************/
  /**
   * 获取检查记录
   * @param patientId
   * @param beginDate
   * @param endDate
   * @returns {Observable<any>}
   */
  getCheckup(patientId,yearMonth): Observable<any> {
    let data = {
      accountIdStr: -1,
      patientIdStr: patientId,
      yearMonth: yearMonth
      /*beginDate: beginDate,
      endDate: endDate*/
    };
    return this.post('getCheckup', true, data,[patientId]);
  }
  getCheckDetailById(id): Observable<any> {
    let data = {
      hospitalId: -1,
    };
    return this.post('getCheckDetailById', true, data,[id]);
  }
  /**
   * 获取检验记录
   * @param patientId
   * @param beginDate
   * @param endDate
   * @returns {Observable<any>}
   */
  getCheckInspect(patientId, yearMonth,reportCheckType): Observable<any> {
    let data = {
      accountIdStr: -1,
      patientIdStr: patientId,
      yearMonth: yearMonth,
      reportCheckType:reportCheckType
    };
    return this.post('getCheckInspect', true, data,[patientId]);
  }
  getInspectDetailById(id): Observable<any> {
    let data = {
      hospitalId: -1,
    };
    return this.post('getInspectDetailById', true, data,[id]);
  }
  /**
   * 获取费用信息（）
   * @param patientId
   * @param beginDate
   * @param endDate
   * @returns {Observable<any>}
   */
  getFeeForGFE(patientId, yearMonth): Observable<any> {
    let data = {
      accountIdStr: -1,
      patientIdStr: patientId,
      yearMonth: yearMonth
    };
    return this.post('getMedicine', true, data,[patientId]);
  }
  getFeeForGFEDetail(id): Observable<any> {
    return this.post('getMedicineDetail', true, null,[id]);
  }
  getChufangRecord(patientId, yearMonth): Observable<any> {
    let data = {
      accountIdStr: -1,
      patientIdStr: patientId,
      yearMonth: yearMonth
    };
    return this.post('getChufangRecord', true, data,[patientId]);
  }
  getChufangRecordDetail(id): Observable<any> {
    return this.post('getChufangRecordDetail', true, null,[id]);
  }
  getVisitRecord(patientId, beginDate, endDate): Observable<any> {
    let data = {
      isSurvey:0,
      accountIdStr: this.app.session.id,
      patientIdStr: patientId,
      beginDate: beginDate,
      endDate: endDate
    };
    return this.post('getVisitRecord', true, data, [patientId]);
  }
  /**
   * 获取线上预约挂号记录
   * @param type （0：预约， 1：挂号）
   * @param patientId
   * @param yearMonth
   * @returns {Observable<any>}
   */
  getAppointmentOrRegOnline(type, patientId, yearMonthDay): Observable<any> {
    let data = {
      accountIdStr: this.app.session.id,
      regType: type,
      patientIdStr: patientId,
      yearMonthDay: yearMonthDay,
      hospitalId:-1
    };
    return this.post('getAppointmentOrRegOnline', true, data,[patientId,type]);
  }
  /**
   * 获取线下预约挂号记录
   * @param type （0：预约， 1：挂号）
   * @param patientId
   * @param yearMonth
   * @returns {Observable<any>}
   */
  getAppointmentOrRegOffline(type, patientId, yearMonth): Observable<any> {
    let data = {
      accountIdStr: this.app.session.id,
      regType: type,
      patientIdStr: patientId,
      beginDate: yearMonth + '-01',
      endDate: yearMonth + '-31'
    };
    return this.post('getAppointmentOrRegOffline', true, data);
  }
  /**
   * 获取预约挂号记录详情
   * @param businessNO
   */
  getRegDetail(businessNO): Observable<any> {
    return this.post('regDetail', true, {zhpTradeId: businessNO},[businessNO]);
  }

  /**
   * 删除预约挂号记录
   * @param zhpTradeId
   * @returns {Observable<any>}
   */
  deleteRecord(zhpTradeId): Observable<any> {
    return this.post('deleteRegRecord', true, null, [zhpTradeId]);
  }

  /**
   * 挂号记录退号
   * @param zhpTradeId
   * @returns {Observable<any>}
   */
  tuihao(zhpTradeId): Observable<any> {
    return this.post('tuihao', true, null, [zhpTradeId]);
  }

  /**
   * 取消预约
   * @param zhpTradeId
   * @returns {Observable<any>}
   */
  cancelYuyue(hospitalId,zhpTradeId): Observable<any> {
    return this.post('cancelYuyue', true, null, [hospitalId,zhpTradeId]);
  }

  /**
   * 确认预约
   * @param zhpTradeId
   * @returns {Observable<any>}
   */
  confirmReg(zhpTradeId): Observable<any> {
    return this.post('confirmReg', true, null, [zhpTradeId]);
  }
  /*********************信息记录查询end****************************/
  deleteMessage(id): Observable<any> {
    return this.post('deleteMessage', true, null, [id]);
  }
  /****************医疗大数据start**************************/
  /**
   * 获取一级部位
   * @param partType （MAN or WOMAN）
   * @returns {any}
   */
  getDiagnoseFirstPart(partType): Observable<any> {
    let data = this.cacheService.get('diagnose.first.' + partType),
      now = new Date().getTime();
    if (data && (now - data.time < this.dataService.time.MILLIS_1_DAY)) {
      let sub = new ReplaySubject();
      sub.next({data:data.data, success: true, isCache: true});
      return sub;
    }
    return this.post('getDiagnoseFirstPart', true, null, [partType]);
  }

  /**
   * 获取二级部位
   * @param partCode 1级部位code
   * @param partType
   * @returns {any}
   */
  getDiagnoseTwoPart(partCode, partType): Observable<any> {
    let data = this.cacheService.get('diagnose.Two.' + partCode + '.' + partType),
      now = new Date().getTime();
    if (data && (now - data.time < this.dataService.time.MILLIS_1_DAY)) {
      let sub = new ReplaySubject();
      sub.next({data:data.data, success: true, isCache: true});
      return sub;
    }
    return this.post('getDiagnoseTwoPart', true, null, [partCode, partType]);
  }

  /**
   * 获取病症
   * @param partId 部位id
   * @returns {Observable<any>}
   */
  getSymptom(partId): Observable<any> {
    return this.post('getSymptom', true, null, [partId]);
  }

  /**
   * 获取病症结论
   * @param ids 病症id结合
   * @returns {Observable<any>}
   */
  getDisease(ids): Observable<any> {
    return this.post('getDisease', true, null, [ids]);
  }

  /**
   * 获取结论详情
   * @param id
   * @returns {Observable<any>}
   */
  getDiseaseDetail(id): Observable<any> {
    return this.post('getDiseaseDetail', true, null, [id]);
  }
  /****************医疗大数据end**************************/

  /****************预约挂号start**************************/
  /**
   * 获取排班科室列表
   * @returns {Observable<any>}
   */
  getDeptList(): Observable<any> {
    return this.post('getDeptList', true);
  }
  getAppointDeptList(appoitType?): Observable<any> {
    let data = {
      regType:appoitType == '1'?'RESERVATION':'REAL_TIME',
      expertType:'ALL',
      hospitalId:-1
    };
    return this.post('getAppointDeptList', true,data,[appoitType]);
  }
  /**
   * 根据日期获取排班
   * @param dept 科室对象
   * @param date 日期，可以为空
   * @returns {Observable<any>}
   */
  getExpertByScheduleList(dept, date,appointType?): Observable<any> {
    let urlId = 'expertListBySchedule',
      btnTitle = '预约';
    if(appointType == 'introduce'){
      urlId = 'expertListByDept'
    }
    return this.post(urlId, true, {
      expertType: 'ALL',
      regType: this.cacheService.getClinicParam('guahaoType') == 'SCHEDULE_REALTIME'?'REAL_TIME':'RESERVATION',
      deptId:dept.id,hospitalId:-1
    }, [dept.hospitalId,dept.id]);
  }

  /**
   * 根据科室获取对应的排班
   * @param dept
   * @returns {Observable<any>}
   */
  getScheduleListByDept(dept): Observable<any> {
    return this.post('getScheduleForDept', true, {
      fetchType: this.cacheService.getClinicParam('guahaoType'),
      hospitalId: dept.hospitalId,
      expertType: 'SPECIALIST'
    }, [dept.hospitalId,dept.id]);
  }
  /**
   * 根据科室医生获取对应的排班
   * @param dept
   * @param expert
   * @returns {Observable<any>}
   */
  getScheduleListByExpert(dept, expertId): Observable<any> {
    return this.post('getScheduleForExpert', true, {
      // fetchType: 'SCHEDULE_REALTIME',
      fetchType: this.cacheService.getClinicParam('guahaoType'),
      // regType: 'REAL_TIME',
      expertType: 'COMMON',
      hospitalId:-1
    }, [dept.hospitalId,dept.id, expertId]);
  }
  getTimeListBySchedule(scheduleId,hospitalId): Observable<any> {
    return this.post('getTimeListBySchedule', true, {
      scheduleId: scheduleId,
      hospitalId:hospitalId
    });
  }
  /**
   * 预约挂号（如果需要支付会返回支付相关数据）
   * @param data
   * @returns {Observable<any>}
   */
  //查询爽约次数
  canOrNotSubmit(data): Observable<any> {
    return this.post('canOrNotSubmit', true, data,null,null,true);
  }
  commitClinic(data): Observable<any> {
    return this.post('commitReg', true, data);
  }

  /**
   * 获取支付后的挂号状态
   * @param outTradeNo
   * @returns {Observable<any>}
   */
  getGuahaoStateForPay(outTradeNo): Observable<any> {
    return this.post('getGuahaoState', true, null, [outTradeNo]);
  }

  /**
   * 获取最后一级科室
   * @returns {Observable<any>}
   */
  getAllLastLevelDepts(): Observable<any> {
    return this.post('getAllDepts', true);
  }
  getAllDepts(haoSchedule?): Observable<any> {
    let url = haoSchedule?"getAllDeptsSchedule":"getAllDepts2";
    return this.post(url, true,{hospitalId:-1});
  }
  getAllVisitDepts(): Observable<any> {
    return this.post('getAllVisitDepts', true);
  }
  getVisitByDept(dept): Observable<any> {
    return this.post('getVisitByDept', true,{
      deptId:dept.id
    },null,this.app.url.venus);
  }
  getAllExperts(noLoader?,hasSchedule?): Observable<any> {
    let url = hasSchedule?"getAllExpertsHasSchedule":"getAllExperts";
    return this.post(url, noLoader?false:true,{hospitalId:-1});
  }
  //根据科室获取静态的专家列表
  getStaticExpertsByDept(deptId): Observable<any> {
    return this.post('getStaticExpertsByDept', true,{hospitalId:deptId.hospitalId}, [deptId.hospitalId,deptId.id]);
  }
  getDeptDetailInfo(deptId): Observable<any> {
    return this.post('getDeptDetailInfo', true,null, [deptId.hospitalId,deptId.id]);
  }
  /**
   * 根据医生id获取相应排班的科室列表
   * @param expertId
   * @returns {Observable<any>}
   */
  getDeptsByExpert(expertId): Observable<any> {
    return this.post('deptsByExpert', true, null, [expertId]);
  }
  /****************预约挂号end**************************/

  /****************支付start**************************/
  summary(partner_sign, trade_no, pay_platform): Observable<any> {
    return this.post('paySummary', true, {'partner_sign': partner_sign,
                                          'trade_no': trade_no,
                                          'pay_platform': pay_platform || ''}, [], this.app.url.pay);
  }
  trade(platform, tradeNo, partnerSign): Observable<any> {
    return this.post('payTrade', true, {'partner_sign': partnerSign,
                                        'trade_no': tradeNo,
                                        'pay_platform': platform || ''}, [], this.app.url.pay);
  }
  tradeText(platform, tradeNo, partnerSign): Observable<any> {
    return this.postText('payTrade', true, {'partner_sign': partnerSign,
      'trade_no': tradeNo,
      'pay_platform': platform || ''}, [], this.app.url.pay);
  }
  /**************************自助缴费start***************************/
  /**
   * 未支付的诊间费用
   * @param memberId
   * @param hasLoading
   * @returns {Observable<any>}
   */
  getBillingList(memberId): Observable<any> {
    return this.post('billing', true, {patientIdStr: memberId});
  }

  /**
   * 诊间费用历史记录
   * @param yearMonth
   * @param memberId
   * @returns {Observable<any>}
   */
  getBilledList(memberId,yearMonth): Observable<any> {
    return this.post('billed', true, {patientIdStr: memberId, yearMonth: yearMonth});
  }
  /**
   * 诊间费用去支付，后台返回调用支付相关信息
   * @param mergerPaymentIds 诊间单子集合 ids： ,分隔
   * @param patientId 病人id
   * @param payType //1，就诊卡等预付卡支付 2，支付宝、银联等第三方支付,要配置
   * @returns {Observable<any>}
   */
  payForBill(id): Observable<any>{
    return this.post('payForBill', true, {businessNO:id});
  }

  /**************************自助缴费end***************************/

  /**************************院内导航start***************************/
  getBuildingDetail(buildingId,hospitalId): Observable<any> {
    return this.post('getBuildingDetail', true, {hospitalId:hospitalId}, [hospitalId,buildingId]);
  }
  getBuildingAll(): Observable<any> {
    return this.post('getBuildingAll', true);
  }
  /**************************院内导航end***************************/

  /**************************妇幼保健 start**********************/
  getPreDate(id): Observable<any> {
    return this.post('getPreDate', true, {memberId: id}, [], this.app.url.inHospital);
  }

  addPreDate(id, mc, lmp): Observable<any> {
    return this.post('addPreDate', true, {memberId: id, mc: mc, lmp: lmp}, [], this.app.url.inHospital);
  }

  ajaxPregnantSituation(pregnantWeek): Observable<any> {
    return this.post('ajaxPregnantSituation', true, {pregnantWeek: pregnantWeek}, [], this.app.url.inHospital);
  }

  ajaxPregnantNotice(pregnantMonth): Observable<any> {
    return this.post('ajaxPregnantNotice', true, {pregnantMonth: pregnantMonth}, [], this.app.url.inHospital);
  }

  ajaxPregnantCheckSchedule(memberId): Observable<any> {
    return this.post('ajaxPregnantCheckSchedule', true, {memberId: memberId, queryDate: this.dateService.format(new Date())}, [], this.app.url.inHospital);
  }
  /**************************妇幼保健 end**********************/

  /**************************满意度调查 start**********************/
  surveyTopic(): Observable<any> {
    return this.post('surveyTopic', true);
  }
  survey(topicId): Observable<any> {
    return this.post('survey', true, {topicId: topicId});
  }
  answer(data): Observable<any> {
    return this.post('answer', true, data);
  }
  /**************************满意度调查 end**********************/


  //消息中心
  getMessages(params): Observable<any> {
    return this.post('getMessages', true, params);
  }
  readMessage(id): Observable<any> {
    return this.post('readMessage', false, null,[id]);
  }
  getMessagesNum(params): Observable<any> {
    return this.post('getMessagesNum', false,params);
  }


  /**************************排队叫号 start**********************/
  getCallnum(): Observable<any> {
    return this.post('getCallnum', true,null,[this.app.session.id]);
  }
  getScheduleCllNumList(id): Observable<any> {
    return this.post('getScheduleCllNumList', true,null,[id]);
  }
  getCommonScheduleCllNum(id): Observable<any> {
    return this.post('getCommonScheduleCllNum', true,null,[id]);
  }
  /**************************排队叫号 end**********************/


  /**************************南京儿童 start**********************/
  searcPriceItem(): Observable<any> {
    return this.post('searcPriceItem', true, {agencyId:this.app.hospitalId}, [], this.app.url.cms);
  }

  searcPriceSubItem(id): Observable<any> {
    return this.post('searcPriceSubItem', true, {itemId:id}, [], this.app.url.cms);
  }



  //停车缴费

  searcParkingState(): Observable<any> {
    return this.post('searcParkingState', true, {hospitalId:100351},null,this.app.url.hexi);
  }
  getplatenobyaccount(): Observable<any> {
    return this.post('getplatenobyaccount', true, {hospitalId:100351,accountIdStr: this.app.session.id},null,this.app.url.hexi);
  }
  showParkingPay(data): Observable<any> {
    data.hospitalId = 100351;
    return this.post('showParkingPay', true, data,null,this.app.url.hexi);
  }
  showParkingPayRecord(): Observable<any> {
    let data = {
      hospitalId : 100351,
      accountIdStr :this.app.session.id,
      mobileNo :this.app.session.mobile
    };
    return this.post('showParkingPayRecord', true, data);
  }
  deletePlateno(data): Observable<any> {
    data.hospitalId = 100351;
    return this.post('deletePlateno', true, data);
  }
  addPlateno(data): Observable<any> {
    data.accountIdStr = this.app.session.id;
    data.mobileNo = this.app.session.mobile;
    data.hospitalId = 100351;
    return this.post('addPlateno', true, data);
  }
  parkingFund(data): Observable<any> {
    data.accountIdStr = this.app.session.id;
    data.hospitalId = 100351;
    return this.post('parkingFund', true, data);
  }
  getParkDistribution(): Observable<any> {
    return this.post('getParkDistribution', true, {hospitalId:100351},null,this.app.url.hexi);
  }

  /**************************南京儿童 end**********************/

  //des加解密
  encryptByDES(message, key) {
    let keyHex = CryptoJS.enc.Utf8.parse(key);
    let encrypted = CryptoJS.DES.encrypt(message, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString().replace(/\//g,"@").replace(/\+/g,"$").replace(/=/g,"*");
  }
//  aes 解密
  decryptByAes(ciphertext) {
    const formatDate = this.dateService.formatYMD(new Date(),"");
    let key = formatDate + '10035@zc';
    let iv = formatDate + '10035@cz';
    key = CryptoJS.enc.Latin1.parse(key);
    iv=CryptoJS.enc.Latin1.parse(iv);
    let decrypted = CryptoJS.AES.decrypt(ciphertext, key, {iv: iv, padding: CryptoJS.pad.ZeroPadding});
    return CryptoJS.enc.Utf8.stringify(decrypted);
  }
}
