import { Injectable } from '@angular/core';

/*
  Generated class for the DateService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
/**
 * 日期服务
 */
@Injectable()
export class DateService {

  constructor(){};

  getDate(strDate: string) {
    if (!strDate) return null;
    let thisDate:any = strDate.split('-'),
      date = new Date();
    date.setFullYear(thisDate[0]-0);
    date.setMonth(thisDate[1]-1);
    date.setDate(thisDate[2]-0);

    /*const formatDate = ( a: string ) =>  {
      // 格式化日期，获取今天的日期
      return parseInt(a, 10) - 1 + '';
    };
    let date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/, formatDate).match(/\d+/g) + ')');*/
    return date;
  }

  format (date: Date): string {
    return this.formatWithPatternDate('yyyy-mm-dd', date);
  }

  compare(d1: string, d2: string): number {
    d1 = d1.replace(/\-/gi,"/");
    d2 = d2.replace(/\-/gi,"/");
    let time1 = new Date(d1).getTime();
    let time2 = new Date(d2).getTime();
    if(time1 > time2){
      return 1;
    }else if(time1 == time2){
      return 0;
    }else{
      return -1;
    }
  }
  formatWithPatternDate (format: string, date: Date) {
    if (!date)
      return null;
    let look = function (m) { // Check whether a format character is doubled
        let n = 0;
        while (i + 1 < format.length && format.charAt(i + 1) === m) {
          n++;
          i++;
        }
        return n;
      },
      f1 = function (m, val, len) { // Format a number, with leading zero if necessary
        let n = '' + val;
        if (look(m)) {
          while (n.length < len) {
            n = '0' + n;
          }
        }
        return n;
      },
      i,
      output = '',
      literal = false;

    for (i = 0; i < format.length; i++) {
      if (literal) {
        if (format.charAt(i) === "'" && !look("'")) {
          literal = false;
        } else {
          output += format.charAt(i);
        }
      } else {
        switch (format.charAt(i)) {
          case 'd':
            output += f1('d', date.getDate(), 2);
            break;
          case 'o':
            output += f1('o', (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000, 3);
            break;
          case 'm':
            output += f1('m', date.getMonth() + 1, 2);
            break;
          case 'y':
            output += (look('y') ? date.getFullYear() : (date.getFullYear() % 100 < 10 ? '0' : '') + date.getFullYear() % 100);
            break;
          case 'h':
            var h = date.getHours();
            output += f1('h', (h > 12 ? (h - 12) : (h === 0 ? 12 : h)), 2);
            break;
          case 'H':
            output += f1('H', date.getHours(), 2);
            break;
          case 'i':
            output += f1('i', date.getMinutes(), 2);
            break;
          case 's':
            output += f1('s', date.getSeconds(), 2);
            break;
          case 'a':
            output += date.getHours() > 11 ? '下午' : '上午';
            break;
          case 'A':
            output += date.getHours() > 11 ? 'PM' : 'AM';
            break;
          case "'":
            if (look("'")) {
              output += "'";
            } else {
              literal = true;
            }
            break;
          default:
            output += format.charAt(i);
        }
      }
    }
    return output;
  }

  //根据生日获取年龄
  getAge(strBirthday): number {
    let returnAge,
        strBirthdayArr=strBirthday.split("-"),
        birthYear = Number(strBirthdayArr[0]),
        birthMonth = Number(strBirthdayArr[1]),
        birthDay = Number(strBirthdayArr[2]);

    let d = new Date(),
        nowYear = d.getFullYear(),
        nowMonth = d.getMonth() + 1,
        nowDay = d.getDate();

    if(nowYear == birthYear) {
      returnAge = 0;//同年 则为0岁
    } else {
      let ageDiff = nowYear - birthYear ; //年之差
      if(ageDiff > 0) {
        if(nowMonth == birthMonth) {
          let dayDiff = nowDay - birthDay;//日之差
          if(dayDiff < 0) {
            returnAge = ageDiff - 1;
          } else {
            returnAge = ageDiff ;
          }
        } else {
          let monthDiff = nowMonth - birthMonth;//月之差
          if(monthDiff < 0) {
            returnAge = ageDiff - 1;
          } else {
            returnAge = ageDiff ;
          }
        }
      } else {
        returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
      }
    }
    return returnAge;//返回周岁年龄
  }

  //根据年月日获取星期几
  getWeek(dateString){
    let date;
    let dateArray = dateString.split("-");
    date = new Date(dateArray[0], Number(dateArray[1]) - 1, dateArray[2]);
    return "星期" + "日一二三四五六".charAt(date.getDay());
  }


  formatYMD (date: Date,type:string): string {
    const formatLength = function (data) {
      return data-0 < 10 ? "0"+data:data;
    };
    const year: number = formatLength(date.getFullYear());
    const month: any = formatLength(date.getMonth() + 1);
    const day: any = formatLength(date.getDate());
    return year + type + month + type + day;
  }
}
