<template>
  <div id="app">
    <router-view ref="rv" v-if="!$route.meta.keepAlive"></router-view>
    <keep-alive>
      <router-view ref="rv" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'App',
  watch:{
    '$route.fullPath' () {
      setTimeout(()=>{
        window.T = this.$refs.rv
      }, 500)
    }
  }
}
</script>

<style lang="less">

</style>
