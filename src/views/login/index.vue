<template>
  <div class="login">
    <!-- 头部 NavBar -->
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
    <!-- 主体 -->
    <div class="content">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>
      <div class="form">
        <div class="form-item">
          <input
            v-model="mobile"
            class="inp"
            type="text"
            maxlength="11"
            placeholder="请输入手机号码"
          />
        </div>
        <div class="form-item">
          <input
            v-model="picCode"
            class="inp"
            type="text"
            maxlength="5"
            placeholder="请输入图形验证码"
          />
          <img v-if="picUrl" @click="getPicCode" :src="picUrl" alt="" />
        </div>
        <div class="form-item">
          <input v-model="msgCode" class="inp" type="text" placeholder="请输入短信验证码" />
          <button @click="getCode">
            {{ second === totalSecond ? '获取验证码' : `${second}秒后重新获取` }}
          </button>
        </div>
      </div>
      <div @click="login" class="login-btn">登录</div>
    </div>
  </div>
</template>

<script>
import { getPicCode, getMsgCode, codeLogin } from '@/apis/login'
// import { Toast } from 'vant'
export default {
  name: 'LoginIndex',
  data () {
    return {
      picCode: '', // 用户输入的图形验证码
      picKey: '', // 将来请求传递的图形验证码唯一标识 验证码需要配合这个一起发送给后台才能进行验证
      picUrl: '', // 存储请求渲染的图片地址
      totalSecond: 60, // 总秒数
      second: 60, // 倒计时秒数
      timerId: null, // 定时器id
      mobile: '', // 手机号
      msgCode: '' // 短信验证码
    }
  },
  created () {
    this.getPicCode()
  },
  methods: {
    // 获取图形验证码
    async getPicCode () {
      // 多层解构
      const { data: { base64, key } } = await getPicCode()
      this.picUrl = base64
      this.picKey = key

      // 导入包后在组件内和组件外都可以直接Toast调用
      // Toast('获取验证码成功')

      // 引入 Toast 组件后，会自动在 Vue 的 prototype 上挂载 $toast 方法，便于在组件内调用。 this.$toast()只能在组件内使用
      // this.$toast('获取验证码成功')
      // this.$toast.loading({
      //   message: '加载中...',
      //   forbidClick: true,
      //   loadingType: 'loading'
      // })
    },

    // 手机号和图形验证码校验
    // 不通过则返回false通过者返回true
    vaildFn () {
      // 手机验证不通过
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      // 验证码不通过
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },

    // 获取短信验证码
    async getCode () {
      // 如果手机和图形验证码不能通过校验则不需要再往下执行
      if (!this.vaildFn()) {
        return
      }
      // 只有当倒计时秒数和总秒数相等时，并且没有开启定时器时才能开启定时器
      if (!this.timerId && this.second === this.totalSecond) {
        // 校验成功开始发送请求获取短信验证码
        // 预期：如果希望响应的status非200，最好抛出一个promise错误，因为await只会等待成功的promise
        // 如果是接收到了一个抛出的错误，awiat是不会继续执行下面的代码，知道等待成功的promise，await才会继续执行下面的代码
        await getMsgCode(this.picCode, this.picKey, this.mobile)
        this.$toast('验证码发送成功')
        // 开始定时器
        this.timerId = setInterval(() => {
          this.second--
          // 小于1时倒计时结束，关闭重置定时器和秒数
          if (this.second < 1) {
            this.second = this.totalSecond
            clearInterval(this.timerId)
            this.timerId = null
          }
        }, 1000)
      }
    },

    // 登录
    async login () {
      // 先校验
      if (!this.vaildFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        return
      }
      // 全部校验成功 发送请求
      const res = await codeLogin(this.mobile, this.msgCode)
      console.log(res)
      // 存到vuex中
      this.$store.commit('user/setUserInfo', res.data)
      // 登录成功 提示 + 跳转
      this.$toast('登录成功')
      // 判断用户来登录的时候是否携带查询参数,根据查询参数返回原来的页面,一样使用replace进行历史的清除,按返回时不会随便跳,增加体验
      const backUrl = this.$route.query.backUrl ? this.$route.query.backUrl : '/'
      this.$router.replace(backUrl)
    }
  },
  // 退出该页面时销毁定时器，防止资源浪费
  destroyed () {
    clearInterval(this.timerId)
    this.timerId = null
  }

}
</script>

<style lang="less" scoped>
.content {
  padding: 50px 30px;
  .title {
    h3 {
      font-weight: 400;
      font-size: 27px;
    }
    p {
      margin: 10px 0;
      font-size: 14px;
      color: #b3b3b3;
    }
  }
  .form {
    margin-top: 30px;
    width: 315px;
    .form-item {
      display: flex;
      justify-content: space-between;
      padding: 9px;
      margin-bottom: 15px;
      width: 315px;
      height: 48px;
      align-content: center;
      border-bottom: 0.5px solid #f3f1f2;
      .inp {
        height: 29.5px;
        border: none;
        font-size: 15px;
        &::placeholder {
          font-size: 14px;
        }
      }
      img {
        height: 100%;
      }
      button {
        margin-right: 10px;
        border: none;
        background-color: #fff;
        font-size: 14px;
        color: #cea26a;
      }
    }
  }
  .login-btn {
    margin-top: 40px;
    width: 100%;
    height: 43px;
    text-align: center;
    line-height: 43px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 40px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
}
</style>
