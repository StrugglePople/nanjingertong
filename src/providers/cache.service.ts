import { Injectable } from '@angular/core';
import {AppConfig} from "../app/app.config";
import {Buffer} from "buffer"

/*
  Generated class for the CacheService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CacheService {

  constructor(public app: AppConfig) {
  }

  get(key){
    let data = localStorage.getItem(this.app.hospitalId + '.' + key);
    if (!data) return null;
    data = new Buffer(data,'base64').toString();
    return data ? JSON.parse(data) : null;
  }

  set(key, data) {
    let str = JSON.stringify(data);
    str = new Buffer(str).toString('base64');
    localStorage.setItem(this.app.hospitalId + '.' + key, str);
  }

  removeKey(key) {
    localStorage.removeItem(this.app.hospitalId + '.' + key);
  }

  clear() {
    localStorage.clear();
  }

  /**********************导诊********************************/
  clearDiagnoseParam() {
    this.set('diagnose.option', {});
  }
  setDiagnoseParam(key, value) {
    let data = this.get('diagnose.option');
    data[key] = value;
    this.set('diagnose.option', data);
  }
  getDiagnoseParam(key) {
    let data = this.get('diagnose.option');
    return data[key];
  }

  /**********************挂号********************************/
  setClinicParam(key, value) {
    let param = this.get('cache.clinic.param') || {};
    param[key] = value;
    this.set('cache.clinic.param', param);
  }
  getClinicParam(key) {
    return this.get('cache.clinic.param')[key];
  }
  clearClinicParam() {
    this.set('cache.clinic.param', {});
  }
}
