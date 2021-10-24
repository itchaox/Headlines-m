<template>
  <div class="home-container">
    <!-- 搜索栏 -->
    <van-nav-bar class="page-nav-bar">
      <van-button
      class="search-btn"
      slot="title"
      size='small'
      type="info"
      icon="search"
      round
      >
        搜索
      </van-button>
    </van-nav-bar>
    <!-- 标签页 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab v-for="item in 10" :key="item.id" :title="'页面' + item">
        内容{{item}}
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang='less' scoped>
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }

  .search-btn {
    width: 550px;
    height: 64px;
    background-color: #5babfb;
    border:none;
    font-size: 28px;
    .van-icon {
    font-size: 35px;
  }
  }

  /deep/ .channel-tabs {
    .van-tabs__wrap {
      height:82px;
    }
    .van-tab {
      min-width:185px;
      border-right:1px solid #f3f3f3;
      font-size: 32px;
      color: #777;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__line {
      width: 50px;
      height: 6px;
      background-color: #3296fa;
      margin-bottom: 8px;
    }
  }
}
</style>
