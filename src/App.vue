<template>
  <div id="app">
    <!-- <Index /> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import Index from './components/main/Index.vue'

export default {
  name: 'app',
  components: {
    // Index
  }
}
</script>

<style lang='less' scoped >
#app {
  width:100%;
  height: 100%;
}
</style>
