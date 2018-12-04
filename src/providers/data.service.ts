/*
  Generated class for the DataService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
/**
 * 一些业务数据常量
 */
export interface AppConstant  {
  msg;
  time;
  bmi;
  hepatitisB;
  blood;
  diagnose;
}

export const APP_CONSTANT: AppConstant = {
  msg: {
    need_real_name: '请输入真实姓名',
    error_name: '请输入长度为2~32位的姓名,且不能包含空格',
    need_mobile: '请输入手机号',
    need_pwd: '请输入密码',
    need_scode: '请输入验证码',
    hasSpace: '不能有空格',
    error_mobile: '手机号错误',
    error_scode: '验证码错误',
    error_idCard: '身份证号码错误',
    error_pwd: '请输入6~16位英文或数字密码',
    login_success: '登录成功',
    no_old_pwd: '请输入旧密码',
    no_new_pwd: '请输入新密码',
    no_new_mobile: '请输入新手机号',
    no_re_pwd: '请输入确认密码',
    mobileNo_error: '手机号格式错误',
    pwd_not_equal_re_pwd: '两次密码输入不一致',
    can_not_include_space: '内容中不能包含空格',
    no_request_data: '没有获取到数据',
    no_read_register_protocol: '请阅读用户协议',
    no_img_result: '请输入图片中结果'
  },
  time: {
    MILLIS_1_SEC: 1000,
    MILLIS_1_MIN: 60000,
    MILLIS_10_MIN: 600000,
    MILLIS_HALF_HOUR: 1800000,
    MILLIS_1_HOUR: 3600000,
    MILLIS_1_DAY: 86400000
  },
  bmi: {
    sv: [[15, 18.5], [18.5, 24], [24, 28], [28, 36], [36, 45]],
    sn: ['偏瘦', '正常', '偏胖', '肥胖', '重度肥胖'],
    tips: ['您的体重状况为：偏瘦。根据本计算，您目前的体重低于正常范围，请适当调整饮食结构，增加富含营养的食物摄入（如蔬菜水果、鱼类等），加强锻炼。必要时请就医，检查有无患慢性全身性消耗性疾病（如贫血、慢性萎缩性胃炎、恶性肿瘤、糖尿病、结核病等）可能。',
      '您的体重状况为：正常。根据本计算，您目前的体重在健康范围内，患心血管疾病、糖尿病、高血压、高血脂等疾病风险较低，请继续保持。',
      '您的体重状况为：偏胖。根据本计算，您目前的体重稍高于正常范围，请适当运动，调整饮食结构，补充富含膳食纤维的食物（如蔬菜水果、粗粮杂粮、豆类及菌藻类食物），减少不必要的高热量食物（如蛋糕、饮料、酸奶等）摄入。同时，您患心血管疾病、糖尿病、高血压、高血脂等疾病的风险较高，请定期检查。',
      '您的体重状况为：肥胖。根据本计算，您目前属于肥胖，请定日定量运动，调整饮食结构，补充富含膳食纤维的食物（如蔬菜水果、粗粮杂粮、豆类及菌藻类食物），减少不必要的高热量食物（如蛋糕、饮料、酸奶等）摄入。必要时及时就医，检查有无心血管疾病、高血压、高胆固醇等疾病。',
      '您的体重状况为：重度肥胖。根据本计算，您目前属于重度肥胖，可能引起高血压、糖尿病、痛风等疾病，并发其他疾病的风险也高于非肥胖者。建议先去医院进行一次彻底的体检，然后寻求专业的减肥机构来减肥。健康无价，加油哦！']
  },
  //乙肝
  hepatitisB: [
    {
      title: '乙肝表面抗原（HBsAg）',
      property: 'hBsAg'
    },
    {
      title: '乙肝表面抗体（抗-HBs）',
      property: 'antiHBs'
    },
    {
      title: '乙肝e抗原（HBeAg）',
      property: 'hBeAg'
    },
    {
      title: '乙肝e抗体（抗-HBe）',
      property: 'antiHBe'
    },
    {
      title: '乙肝核心抗体（抗-HBc）',
      property: 'antiHBc'
    }
  ],
  //血型
  blood: ['A', 'B', 'O', 'AB'],
  diagnose: {
    ageItems: [
      {
        text: '成人',
        woman: 'WOMAN',
        man: 'MAN',
        value: 'adult'
      },
      {
        text: '13-17',
        woman: 'THIRTEEN_SEVENTEEN_WOMAN',
        man: 'THIRTEEN_SEVENTEEN_MAN',
        value: 'child'
      },
      {
        text: '7-12',
        woman: 'SEVEN_TWELVE_WOMAN',
        man: 'SEVEN_TWELVE_MAN',
        value: 'child'
      },
      {
        text: '3-6',
        woman: 'THREE_SIX_WOMAN',
        man: 'THREE_SIX_MAN',
        value: 'child'
      },
      {
        text: '0-2',
        woman: 'ZERO_TWO_WOMAN',
        man: 'ZERO_TWO_MAN',
        value: 'child'
      }
    ],
    imgItems: [
      {
        orientation: 'front',
        sex: 'man',
        type: 'adult',
        parts: [
          {
            part: 'head',
            partCode: '01',
            x: '6.5rem',
            y: 0,
            width: '5.5rem',
            height: '8rem'
          },
          {
            part: 'left-arm',
            partCode: '06',
            x: '1rem',
            y: '8rem',
            width: '4.7rem',
            height: '17.6rem'
          },
          {
            part: 'right-arm',
            partCode: '06',
            x: '13.6rem',
            y: '8rem',
            width: '4rem',
            height: '17.6rem'
          },
          {
            part: 'breast',
            partCode: '02',
            x: '5.5rem',
            y: '8rem',
            width: '7.6rem',
            height: '6.4rem'
          },
          {
            part: 'belly',
            partCode: '03',
            x: '5.5rem',
            y: '14.4rem',
            width: '7.6rem',
            height: '5.1rem'
          },
          {
            part: 'pelvic',
            partCode: '05',
            x: '4.7rem',
            y: '19.5rem',
            width: '9.1rem',
            height: '4.8rem'
          },
          {
            part: 'leg',
            partCode: '07',
            x: '4.7rem',
            y: '24rem',
            width: '9.1rem',
            height: '18.8rem'
          }
        ]
      },
      {
        orientation: 'back',
        sex: 'man',
        type: 'adult',
        parts: [
          {
            part: 'head',
            partCode: '01',
            x: '6.5rem',
            y: 0,
            width: '5.5rem',
            height: '8rem'
          },
          {
            part: 'left-arm',
            partCode: '06',
            x: '1rem',
            y: '8rem',
            width: '4.7rem',
            height: '17.6rem'
          },
          {
            part: 'right-arm',
            partCode: '06',
            x: '13.6rem',
            y: '8rem',
            width: '4rem',
            height: '17.6rem'
          },
          {
            part: 'back',
            partCode: '04',
            x: '5.5rem',
            y: '8rem',
            width: '7.6rem',
            height: '11.5rem'
          },
          {
            part: 'pelvic',
            partCode: '05',
            x: '4.7rem',
            y: '19.5rem',
            width: '9.1rem',
            height: '4.8rem'
          },
          {
            part: 'leg',
            partCode: '07',
            x: '4.7rem',
            y: '24rem',
            width: '9.1rem',
            height: '18.8rem'
          }
        ]
      },
      {
        orientation: 'front',
        sex: 'woman',
        type: 'adult',
        parts: [
          {
            part: 'head',
            partCode: '01',
            x: '6.5rem',
            y: 0,
            width: '5.5rem',
            height: '8rem'
          },
          {
            part: 'left-arm',
            partCode: '06',
            x: '1rem',
            y: '8rem',
            width: '4.7rem',
            height: '17.6rem'
          },
          {
            part: 'right-arm',
            partCode: '06',
            x: '13.6rem',
            y: '8rem',
            width: '4rem',
            height: '17.6rem'
          },
          {
            part: 'breast',
            partCode: '02',
            x: '5.5rem',
            y: '8rem',
            width: '7.6rem',
            height: '6.4rem'
          },
          {
            part: 'belly',
            partCode: '03',
            x: '5.5rem',
            y: '14.4rem',
            width: '7.6rem',
            height: '5.1rem'
          },
          {
            part: 'pelvic',
            partCode: '05',
            x: '4.7rem',
            y: '19.5rem',
            width: '9.1rem',
            height: '4.8rem'
          },
          {
            part: 'leg',
            partCode: '07',
            x: '4.7rem',
            y: '24rem',
            width: '9.1rem',
            height: '18.8rem'
          }
        ]
      },
      {
        orientation: 'back',
        sex: 'woman',
        type: 'adult',
        parts: [
          {
            part: 'head',
            partCode: '01',
            x: '6.5rem',
            y: 0,
            width: '5.5rem',
            height: '8rem'
          },
          {
            part: 'left-arm',
            partCode: '06',
            x: '1rem',
            y: '8rem',
            width: '4.7rem',
            height: '17.6rem'
          },
          {
            part: 'right-arm',
            partCode: '06',
            x: '13.6rem',
            y: '8rem',
            width: '4rem',
            height: '17.6rem'
          },
          {
            part: 'back',
            partCode: '04',
            x: '5.5rem',
            y: '8rem',
            width: '7.6rem',
            height: '11.5rem'
          },
          {
            part: 'pelvic',
            partCode: '05',
            x: '4.7rem',
            y: '19.5rem',
            width: '9.1rem',
            height: '4.8rem'
          },
          {
            part: 'leg',
            partCode: '07',
            x: '4.7rem',
            y: '24rem',
            width: '9.1rem',
            height: '18.8rem'
          }
        ]
      },
      {
        orientation: 'front',
        sex: 'man',
        type: 'child',
        parts: [
          {
            part: 'head',
            partCode: '01',
            x: '6.8rem',
            y: 0,
            width: '7.5rem',
            height: '9.4rem'
          },
          {
            part: 'left-arm',
            partCode: '06',
            x: '0.5rem',
            y: '9.4rem',
            width: '5.3rem',
            height: '14rem'
          },
          {
            part: 'right-arm',
            partCode: '06',
            x: '15.1rem',
            y: '8rem',
            width: '5.5rem',
            height: '14rem'
          },
          {
            part: 'breast',
            partCode: '02',
            x: '6.8rem',
            y: '9.4rem',
            width: '7.5rem',
            height: '6rem'
          },
          {
            part: 'belly',
            partCode: '03',
            x: '6.8rem',
            y: '15.4rem',
            width: '7.5rem',
            height: '4.8rem'
          },
          {
            part: 'pelvic',
            partCode: '05',
            x: '5.8rem',
            y: '20.2rem',
            width: '9.4rem',
            height: '5.1rem'
          },
          {
            part: 'leg',
            partCode: '07',
            x: '5.8rem',
            y: '25.4rem',
            width: '9.4rem',
            height: '13.4rem'
          }
        ]
      },
      {
        orientation: 'back',
        sex: 'man',
        type: 'child',
        parts: [
          {
            part: 'head',
            partCode: '01',
            x: '6.8rem',
            y: 0,
            width: '7.5rem',
            height: '9.4rem'
          },
          {
            part: 'left-arm',
            partCode: '06',
            x: '0.5rem',
            y: '9.4rem',
            width: '5.3rem',
            height: '14rem'
          },
          {
            part: 'right-arm',
            partCode: '06',
            x: '15.1rem',
            y: '8rem',
            width: '5.5rem',
            height: '14rem'
          },
          {
            part: 'breast',
            partCode: '04',
            x: '6.8rem',
            y: '9.4rem',
            width: '7.5rem',
            height: '10.8rem'
          },
          {
            part: 'pelvic',
            partCode: '05',
            x: '5.8rem',
            y: '20.2rem',
            width: '9.4rem',
            height: '5.1rem'
          },
          {
            part: 'leg',
            partCode: '07',
            x: '5.8rem',
            y: '25.4rem',
            width: '9.4rem',
            height: '13.4rem'
          }
        ]
      },
      {
        orientation: 'front',
        sex: 'woman',
        type: 'child',
        parts: [
          {
            part: 'head',
            partCode: '01',
            x: '6.8rem',
            y: 0,
            width: '7.5rem',
            height: '9.4rem'
          },
          {
            part: 'left-arm',
            partCode: '06',
            x: '0.5rem',
            y: '9.4rem',
            width: '5.3rem',
            height: '14rem'
          },
          {
            part: 'right-arm',
            partCode: '06',
            x: '15.1rem',
            y: '8rem',
            width: '5.5rem',
            height: '14rem'
          },
          {
            part: 'breast',
            partCode: '02',
            x: '6.8rem',
            y: '9.4rem',
            width: '7.5rem',
            height: '6rem'
          },
          {
            part: 'belly',
            partCode: '03',
            x: '6.8rem',
            y: '15.4rem',
            width: '7.5rem',
            height: '4.8rem'
          },
          {
            part: 'pelvic',
            partCode: '05',
            x: '5.8rem',
            y: '20.2rem',
            width: '9.4rem',
            height: '5.1rem'
          },
          {
            part: 'leg',
            partCode: '07',
            x: '5.8rem',
            y: '25.4rem',
            width: '9.4rem',
            height: '13.4rem'
          }
        ]
      },
      {
        orientation: 'back',
        sex: 'woman',
        type: 'child',
        parts: [
          {
            part: 'head',
            partCode: '01',
            x: '6.8rem',
            y: 0,
            width: '7.5rem',
            height: '9.4rem'
          },
          {
            part: 'left-arm',
            partCode: '06',
            x: '0.5rem',
            y: '9.4rem',
            width: '5.3rem',
            height: '14rem'
          },
          {
            part: 'right-arm',
            partCode: '06',
            x: '15.1rem',
            y: '8rem',
            width: '5.5rem',
            height: '14rem'
          },
          {
            part: 'breast',
            partCode: '04',
            x: '6.8rem',
            y: '9.4rem',
            width: '7.5rem',
            height: '10.8rem'
          },
          {
            part: 'pelvic',
            partCode: '05',
            x: '5.8rem',
            y: '20.2rem',
            width: '9.4rem',
            height: '5.1rem'
          },
          {
            part: 'leg',
            partCode: '07',
            x: '5.8rem',
            y: '25.4rem',
            width: '9.4rem',
            height: '13.4rem'
          }
        ]
      }
    ]
  }
};

