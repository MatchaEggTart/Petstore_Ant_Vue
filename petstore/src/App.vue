<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- 添加转场 -->
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/*
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
*/
html{
 overflow-y: overlay;
}
#app {
    padding: 0 20px;
}


.fade-enter-active, .fade-leave-active {
  transition: opacity .2s ease-out;

}

.fade-enter, .fade-leave-to {
  opacity: 0;

}
</style>
