<template>
  <div class="page">
    <div class="page-router">
      <router-view ref="rvh"></router-view>
    </div>
    <van-tabbar :route="true" active-color="#f46">
      <van-tabbar-item 
      v-for="item in menu"
      :key="item.id"
      :icon="item.icon"
      :replace="true"
      :to="item.path">{{item.text}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import Vue from 'vue'
import { Tabbar, TabbarItem } from 'vant'
Vue.use(Tabbar)
Vue.use(TabbarItem)
export default {
  name: 'page',
  data () {
    return {
      menu: [
        {
          id: 1,
          name: "home",
          path: "/page/home",
          text: "首页",
          icon: "home-o"
        },
        {
          id: 2,
          name: "classify",
          path: "/page/classify",
          text: "分类",
          icon: "apps-o"
        },
        {
          id: 3,
          name: "phone",
          path: "/page/phone",
          text: "电话",
          icon: "phone-o"
        },
        {
          id: 4,
          name: "cart",
          path: "/page/cart",
          text: "购物车",
          icon: "shopping-cart-o"
        },
        {
          id: 5,
          name: "mine",
          path: "/page/mine",
          text: "我的",
          icon: "manager-o"
        }
      ],
    }
  },
  watch:{
    '$route.fullPath' () {
      this.shiLi()
    }
  },
  methods:{
    shiLi(){
      setTimeout(()=>{
        window.vm = this.$refs.rvh
      }, 500)
    }
  },
  mounted(){
    this.shiLi()
  }
}
</script>
<style lang="less" scope>
.page{
    height: calc(100% - 50px);
  .page-router{
    height:100%;
    overflow: auto;
  }
  .tab{

  }
}
</style>
