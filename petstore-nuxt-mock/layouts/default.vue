<template>
  <div id="app">
    <!-- 顶部栏 -->
    <navbar></navbar>
    <!-- 内容 -->
    <Nuxt />
  </div>
</template>
<script>
// 导入导航条
import Navbar from '~/components/Navbar'
export default {
  components: {
    Navbar,
  },
}
</script>

<style>
/* 滚动条修改 */
html {
  overflow-y: overlay;
}
#app {
  padding: 0 20px;
}
</style>

<!--
<template>
  <div>
    <nuxt-link to="/main">main页面</nuxt-link>
    <nuxt-link to="/form">form页面</nuxt-link>
    <Nuxt />
  </div>
</template>
-->
