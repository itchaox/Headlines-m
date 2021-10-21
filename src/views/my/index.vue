<template>
  <div class="my-container">
    <!-- 已登录状态 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image
          class="avatar"
           :src="userInfo.photo"
           fit='cover'
           round
          />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-status">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
      <!-- 未登录状态 -->
    <div v-else class="header not-login">
      <!-- 点击按钮跳转至登录页 -->
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png">
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- 宫格导航 -->
      <van-grid clickable :column-num='2' class='grid-nav mb-9'>
        <van-grid-item  to="/" class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span class='text' slot="text">收藏</span>
        </van-grid-item>
        <van-grid-item text='问答' to="/qa" class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span class='text' slot="text">历史</span>
        </van-grid-item>
      </van-grid>
      <!-- 索引栏 -->
      <van-cell title="消息通知" is-link/>
      <van-cell class="mb-9" title="小度同学" is-link/>
      <van-cell
      v-if="user"
      class="logout-cell"
      title='退出登录'
      clickable
      @click="onLogout"
      />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'

export default {
  name: 'MyIndex',
  computed: {
    ...mapState(['user']) // 像访问自己数据一样直接访问容器数据
  },
  data () {
    return {
      userInfo: {} // 用户信息
    }
  },
  created () {
    // 如果用户处于登录状态，则加载当前用户信息
    if (this.user) {
      this.loadUserInfo()
    }
  },
  methods: {
    // 退出登录按钮
    onLogout () {
      // 1. 是否退出提示
      this.$dialog.confirm({
        title: '退出登录',
        message: '退出当前账号登录状态，回到登录页面'
      })
        .then(() => {
          // 2. 确认退出，清除登录状态（容器的 user 和 本地存储的 user）
          // this.$store.state.user = null // 该行代码，只清除容器 user， 未清除本地存储 user，不可行
          this.$store.commit('setUser', null) // 调用 setUser 方法，清除容器和本地存储的 user
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 加载用户信息数据
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        console.log(data)
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取数据失败，请稍后重试！')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.my-container {
  .header {
    height: 361px;
    background: url('~@/assets/banner.png');
    background-size: cover
  }

  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .mobile-img {
        margin-right:20px;
        height: 105px;
        width: 105px;
        margin-bottom: 15px;
      }
      .text {
        margin-right:20px;
        font-size: 30px;
        color:#fff;
      }
    }
  }

  .user-info {
    .base-info {
      height: 230px;
      padding: 62px 32px 23px;
      box-sizing: border-box; // 让高度包括内边距
      display: flex; // 弹性布局
      justify-content: space-between; // 水平居中
      align-items: center; // 垂直居中
      .left {
        display: flex;
        align-items: center;
        .avatar {
          border:4px solid #fff;
          width: 140px;
          height: 140px;
          margin-right: 23px;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }

    .data-status {
      display: flex;
      .data-item {
        flex: 1; // 均分父容器宽度
      height: 131px;
      display: flex;
      margin-top: 10px;
      flex-direction: column; // 让里面内容垂直分布
      justify-content: center; // 水平居中
      align-items: center; // 垂直居中
      color:#fff;
      .count {
        font-size: 50px;
      }
      .text {
        font-size: 30px;
      }
      }
    }
  }

  .grid-nav {
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 50px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color:#ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }

  .logout-cell {
     text-align: center;
    color: #d86262;
  }

  .mb-9 {
    margin-bottom: 12px;
  }
}
</style>
