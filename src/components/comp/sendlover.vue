<template>
  <div class="sendlover">
    <div class="span1">
      <slot />
    </div>
      <div class="span2">
        <span class="gengduo" @click="click">更多</span>
        <span class="fuhao iconfont icon-jiantou"></span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'sendlover',
  data () {
    return {}
  },
  methods:{
    click(ev){
      this.$emit('click', ev)
    }
  }
}
</script>

<style scoped lang="less">
  .sendlover {
    margin-top: 10px;
    background: #ffffff;
    box-sizing: border-box;
    width: 375px;
    height: 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
    .span1 {
      font-size: 16px;
      font-weight: bold;
    }
    .span2 {
      .gengduo {
        font-size: 14px;
        vertical-align: middle;
      }
      .fuhao {
        font-size: 22px;
        vertical-align: middle;
      }
    }
  }
</style>