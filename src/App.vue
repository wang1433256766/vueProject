<template>
  <div id="app">
    <!-- <transition>
      <keep-alive> -->
        <router-view></router-view>
      <!-- </keep-alive>
    </transition> -->
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
*, body,html,#app {
  margin: 0;
  padding: 0;
}
body,html,#app{
  width: 100%;
  height: 100%;
  background: #edf0f5;
}
</style>
