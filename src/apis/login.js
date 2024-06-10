// 此处用于存放所有登录相关的接口请求
import request from '@/utils/request'
// 1.获取图形验证码
// 命名导出
export const getPicCode = () => {
  // 这里需要return才能在请求后返回一个promise对象,才能给调用该函数的用await接收
  return request.get('/captcha/image')
}

// 2.获取短信验证码
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

// 3.登录
export const codeLogin = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      partyData: {},
      mobile,
      smsCode
    }
  })
}
