export default {
  /**
   * 此处编写的就是Vue组件实例的配置项，通过一定的语法(在要使用的地方导入该模块，使用mixins:[导入的变量名1,导入的变量名2,...]来使用)，可以直接混入到组件内部
   * 在此处可以写data methods computed 生命周期函数等等
   * 注意点：
   * 1.如果此处和组件内提供同名的data或methods，则组件内优先级更高
   * 2.如果编写了生命周期函数，则mixins中的生命周期函数和页面的生命周期函数，会用数组管理，统一执行
   */
  data () {
    return {
      title: '标题'
    }
  },
  methods: {
    // 如果要弹框则返回true，不需要弹框则返回false
    loginConfirm () {
      // 加入购物车是判断是否登陆过 是否有token
      // 1.没有token跳出弹框
      // 2.有token正常执行业务
      if (!this.$store.getters.token) {
        // console.log('要弹框')
        this.$dialog.confirm({
          title: '温馨提示',
          message: '此时需要先登录才能继续操作',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'
        })
          .then(() => {
            // 跳转到登录页面  跳转的时候要携带回退路径,携带在查询参数中  使用replace(使得这次跳转不会产生历史记录,按返回的时候不会乱挑,增加体验)而不是使用push
            // 使用this.$route.fullPath 可以获取路径(包含查询参数)
            this.$router.replace({
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => {
            // 直接取消,不用做其他操作
          })
        return true
      }
      return false
    }
  }
}
