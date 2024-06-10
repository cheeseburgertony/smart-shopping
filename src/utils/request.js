import store from '@/store'
import axios from 'axios'
import { Toast } from 'vant'
// 创建axios实例，将来对创建出来的实例，进行自定义配置  创建出一个自定义的axios，如果以后要访问多台服务器，每个实例之间互不影响，方便配置基地址，请求拦截器和响应拦截器
// 好处：不会污染原始的axios实例
const instance = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000 // 超时时长
})

// 自定义配置 - 请求/响应拦截器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 发送请求的时候使用loading效果，禁用背景点击防止用户多次点击发送请求或者多次跳转
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失,默认是2秒，但是希望在获取信息后关闭，所有在响应拦截器中关闭
    // loadingType: 'spinner' // 加载图标，不过我还是喜欢默认那个
  })
  // 获取token和执行平台platform放在请求头
  const token = store.getters.token
  // 存在token则携带,不存在会自动跳转去登录
  if (token) {
    // config是请求时的完整信息对象
    config.headers['Access-Token'] = token
  }
  config.headers.platform = 'H5'
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  const res = response.data
  // 如果后端返回的响应状态码不为200
  if (res.status !== 200) {
    // 提示输入错误
    Toast(res.message)
    // 返回抛出一个错误，让await不能继续执行
    return Promise.reject(res.message)
  } else {
    // 返回响应状态码的是200 则执行正常的业务，关闭加载效果
    Toast.clear() // Toast 默认采用单例模式，即同一时间只会存在一个 Toast,所以上面的显示错误信息会覆盖掉加载效果
  }
  return res
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 导出配置好的实例
export default instance
