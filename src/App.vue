<template>
  <div id="app">
    <h1>头条移动端</h1>
    <div>
      <i class="toutiao toutiao-pinglun"></i>
    </div>
    <div>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    </div>
    <div>
      <van-cell title="单元格" is-link />
      <van-cell title="单元格" is-link value="内容" />
      <van-cell title="单元格" is-link arrow-direction="down" value="内容" />
    </div>
    <!-- 路由出口 -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less"></style>
