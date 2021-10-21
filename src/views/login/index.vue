<template>
  <div class="login-container">
    <!-- 登录导航栏 -->
    <van-nav-bar
    title="登录"
    class="page-nav-bar"
    left-text="返回"
    left-arrow
    @click-left="$router.back()"
    />
    <!-- 登录表单 -->
    <!-- 表单验证：
    1. 给 v-field 组件配置 rules 验证规则
    2. 提交表单自动触发表单验证
      验证通过，则直接触发 summit 事件
      验证失败，不会触发 submit 事件 -->
    <van-form ref="loginForm" @submit="onSubmit" >
      <van-field
      v-model="user.mobile"
      name="mobile"
      placeholder="请输入手机号码"
      :rules="userFormRules.mobile"
      type="number"
      maxlength='11'
       >
       <i slot="left-icon" class="toutiao toutiao-shouji"></i>
       </van-field>
      <van-field
      v-model='user.code'
      name= "code"
      placeholder='请输入验证码'
      :rules="userFormRules.code"
      type="number"
      maxlength='6'
      >
      <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
      <template #button>
        <van-count-down
        v-if="isCountDownShow"
        :time="1000 * 60"
        format='ss 秒'
        @finish='isCountDownShow=false'
        />
        <van-button
        v-else
        round
        native-type="button"
        class='send-sms-btn'
        size="small"
        type="default"
        @click='onSendSms'
        >获取验证码
        </van-button>
      </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class='login-btn' block type="info" navtive-type="submit" >
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111118',
        code: '246810'
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号码不能为空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号码格式错误'
        }],
        code: [{
          required: true,
          message: '验证号码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit () {
      // 1. 获取表单数据
      const user = this.user
      // 2. 表单验证
      // 在组件中必须通过 this.$toast 调用 Toast 组件
      this.$toast.loading({
        message: '登录中...',
        forbidClicks: true, // 禁用背景点击
        duration: 0 // 时间为0，则持续展示
      })

      // 3. 提交表单，请求登录
      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data) // 利用 Vuex 保存状态,访问状态
        this.$toast.success('登录成功！')
        // 登录成功，跳转回原来界面
        // back 方式不严谨，后续需要优化
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号码或验证码错误！')
        } else {
          this.$toast.fail('登录失败,请稍后重试！')
        }
      }
      // 4. 根据请求，响应结果处理后续操作
    },
    async onSendSms () {
      // 1. 校验手机号码
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败！', err) // retun,验证失败就不执行后续操作
      }

      // 2. 校验通过，显示倒计时
      this.isCountDownShow = true

      // 3. 请求发送真实验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功！')
      } catch (err) {
        this.isCountDownShow = false // 发送失败，关闭倒计时
        if (err.response.status === 429) {
          this.$toast('发送太频繁，请稍后再试！')
        } else {
          this.$toast('发送失败,请稍后再试！')
          console.log('发送失败,请稍后再试！', err)
        }
      }
    }
  }
}
</script>

<style lang='less' scoped>
.login-container {
  .toutiao {
    font-size:42px
  }

  .send-sms-btn {
    background-color:#edf0ed;
    color:#5f625f;
    width: 156px;
    height: 55px;
    line-height:55px;
  }

  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color:#6db4fb;
      border: none;
    }
  }
}
</style>
