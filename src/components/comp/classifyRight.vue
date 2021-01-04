<template>
  <div class="classifyRight">
    <ul>
      <li class="fl" v-for="(item,index) in data" :key="index">
        <img :src="item.src" alt />
        <p v-text="item.title"></p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'classifyRight',
  props:{
    data:Array
  }
}
</script>

<style scoped lang="less">
.classifyRight {
  padding: 10px;
  ul {
    overflow: auto;
    li {
      width: 80px;
      height: 124.8px;
      margin-right: 5px;
      img {
        width: 80px;
        border-radius: 4px;
      }
      p {
        font-size: 12px;
        height: 24px;
        line-height: 24px;
        text-align: center;
      }
    }
  }
}
</style>