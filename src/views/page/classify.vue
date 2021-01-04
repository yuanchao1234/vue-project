<template>
  <div class="classify">
    <van-search
      v-model="value"
      shape="round"
      background="#f46"
      placeholder="请输入搜索关键词"
    />
    <div class="menu-left fl">
      <ul ref="ul">
        <li
          v-for="(item,index) in list"
          :key="item"
          ref="list"
          @click="huan(index,$event)"
        >{{item}}</li>
      </ul>
    </div>
    <div class="menu-right fl">
      <classifyRight :data="data" />
    </div>
  </div>
</template>

<script>
import { classifyRight } from 'comp/comp/index.js'
import Vue from 'vue';
import { Search } from 'vant';
Vue.use(Search);
export default {
  name: 'classify',
  data () {
    return {
      value:'',
      list: [
        "鲜花用途",
        "节日送花",
        "鲜花花材",
        "鲜花类别",
        "鲜花支数",
        "鲜花颜色",
        "对象送花",
        "花篮用途",
        "绿植类别",
        "绿植名称",
        "绿植类型",
        "绿植用途",
        "鲜花品质"
      ],
      data:[]
    }
  },
  components:{
    classifyRight
  },
  mounted(){
    this.init()
  },
  methods:{
    init(){
      this.$refs.list[0].className = "active"
      this.getData('鲜花用途')
    },
    huan(index, ev) {
      // 排他
      for (let i = 0; i < this.$refs.list.length; i++) {
        this.$refs.list[i].className = ""
      }
      ev.target.className = 'active'
      this.getData(ev.target.innerText)
    },
    getData(text){
      this.$http.get('/fenglei', { 
        text 
      }).then((res)=>{
        if(res.code == 1){
          this.data = res.data
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.classify{
  .active {
    background-color: #fff;
    color: #f46;
  }
  .menu-left {
    width: 100px;
    background-color: #f8f8f8;
    ul {
      li {
        text-align: center;
        height: 40.8px;
        line-height: 40.8px;
        font-size: 14px;
      }
    }
  }
  .menu-right {
    width: 275px;
  }
}
</style>
