import {Component, ElementRef, Inject, Input, Renderer2} from '@angular/core';
import {HttpService} from "../../providers/http.service";
import {WidgetService} from "../../providers/widget.service";
import {ValidateService} from "../../providers/validate.service";
import {CacheService} from "../../providers/cache.service";

/**
 * Generated class for the SecurityCode component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'security-code',
  template: '<button class="button security-code title-color-3" (click)="security()">获取验证码</button>'
})
export class SecurityCodeComponent {

  id: string;

  time?: number = 0;

  interval?: any;

  @Input() type: string;

  @Input() mobile: string;

  @Input() picVCode: string;

  constructor(public el: ElementRef, public httpService: HttpService, public widgetService: WidgetService,
              @Inject('DataService') public dataService, public validateService: ValidateService,
              public cacheService: CacheService, public render: Renderer2) {

  }

  ngAfterViewInit() {
    this.id = 'secrity.' + this.type;
    let lastime = this.cacheService.get(this.id),
        now = (new Date()).getTime();
    this.time = 0;
    if( lastime && now - lastime < 60000 ) {
      this.time = 60-Math.ceil( (now-lastime)/1000 );
      this.initBtnState();
      this.interval = setInterval(() => {
        this.time--;
        if (this.time == 0) {
          clearInterval(this.interval);
        }
        this.initBtnState();
      }, 1000);
    } else {
      this.initBtnState();
    }
  }

  //初始化按钮状态
  initBtnState() {
    let btn = this.el.nativeElement.querySelector('button');
    if (this.time == 0) {
      this.render.removeClass(btn, 'disabled');
      btn.innerHTML = '获取验证码';
    } else {
      this.render.addClass(btn, 'disabled');
      btn.innerHTML = this.time + '秒';
    }
  }

  //获取验证码
  security() {
    if (this.time > 0) {
      return;
    }
    if (!this.mobile) {
      this.widgetService.toast(this.dataService.msg.need_mobile);
      return;
    }
    if (!this.validateService.isMobile(this.mobile)) {
      this.widgetService.toast(this.dataService.msg.error_mobile);
      return;
    }
    let param = {};
    if (this.type == 'register') {
      if (!this.picVCode) {
        this.widgetService.toast(this.dataService.msg.no_img_result);
        return;
      }
      param = {imgVerifyCode: this.picVCode}
    }

    this.httpService.securityCode(this.type, this.mobile, param)
      .subscribe(json => {
        if (json.success) {
          this.widgetService.toast(json.errMsg);
          this.cacheService.set(this.id, new Date().getTime());
          this.time = 60;
          this.initBtnState();
          this.interval = setInterval(() => {
            this.time--;
            if (this.time == 0) {
              clearInterval(this.interval);
            }
            this.initBtnState();
          }, 1000);
        }
      });
  }

}
