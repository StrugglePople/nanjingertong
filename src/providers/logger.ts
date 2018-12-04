import { Injectable } from '@angular/core';

import { AppConfig } from '../app/app.config'

/*
  Generated class for the Logger provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
/**
 * 日志服务
 */
@Injectable()
export class Logger {
  constructor(private appConfig: AppConfig) {}

  //日志，debug模式下才打印
  log(message: any) {

    if (this.appConfig.mode == 'debug') {
      if (typeof message === 'string') {
        console.log(message);
      } else {
        console.log(JSON.stringify(message));
      }
    }
  }

}
