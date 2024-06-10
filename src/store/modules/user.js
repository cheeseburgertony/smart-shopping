import { getInfo, setInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state: {
    // 用户信息
    userInfo: getInfo()
  },
  mutations: {
    // mutations的第一个参数都是state
    setUserInfo (state, obj) {
      state.userInfo = obj
      // 设置后存入到本地
      setInfo(obj)
    }
  },
  actions: {
    logOut (context) {
      // 清除用户信息
      context.commit('setUserInfo', {})
      // 清除购物车信息，（跨模块调用mutations）,需要在第三项配置项中使用{ root:true }更改为全局模式
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  getters: {}
}
