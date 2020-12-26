<template>
  <div class="list">
    <van-pull-refresh 
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
      :disabled="disabled"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="onLoad"
        :offset="150"
      >
        <van-row type="flex" justify="space-around">
          <van-col 
            class="col" 
            span="11" 
            v-for="(item, index) in list" 
            :key="index"
            @click="goto(item.gid)"
          >
            <img class="img" :src="item.url" :alt="item.title" />
            <div class="amor_2">
              <span class="span4">{{item.title}}</span>
              <div class="solo">
                <span class="span5">{{item.price}}</span>
                <span class="span6">已售{{item.inventory}}件</span>
              </div>
            </div>
          </van-col>
          <van-col class="col" span="11" v-if="singular">
          </van-col>
        </van-row>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import Vue from 'vue'
import { Col, Row, PullRefresh, List } from 'vant'
Vue.use(PullRefresh)
Vue.use(Col)
Vue.use(Row)
Vue.use(List)
export default {
  name: 'list',
  data () {
    return {
      num:10, // 每次发生请求展示多少条数据
      disabled: false,
      list:[],
      // 下拉刷新
      isLoading: false,
      // 上拉加载
      loading: false,
      finished: false,
      size: 0, // 已展示商品的个数
      index: 0 // 从第几个下标开始 
    }
  },
  watch:{
    size(newValue){
      if(newValue <= this.num){ // 如果请求的数据小于num,肯定要关闭下拉刷新 
        this.disabled = false
      }
    }
  },
  computed:{
    singular(){
      // 用于使用了使用了弹性盒的justify:"space-around" ，导致如果是单数的时候，出现最后一个位置不好看
      if(this.size % 2 === 1 && this.finished) {
        return true
      }else{
        return false
      }
    }
  },
  methods:{
    goto(id){
      this.$router.push({
        name:"detail",
        params:{
          id
        }
      })
    },
    // 下拉刷新回调
    onRefresh(){
      this.getData('fresh', 0)
    },
    // 上拉加载回调
    onLoad(){
      // 如果到底了，就关闭上拉加载
      if(this.index >= this.size){
        this.finished = true
        return
      }
      this.getData('load', this.index)
    },
    getData(type, skip){
      this.$http.get('list', { skip, limit:this.num }).then((res) => {
        if (res.code === 1){
          if(type === 'fresh'){ // 下拉刷新
            this.list = res.data
          }else{ // 上拉加载
            res.data.forEach(item => {
              this.list.push(item)
            })
          }
          this.size = res.total
          this.index = this.list.length
        } else {
          console.log(res)
        }
      }).finally(() => {
        this.isLoading = false
        this.loading = false
      })
    }
  },
  created(){
    this.onRefresh()
  },
  mounted(){
    window.vm = this
  }
}
</script>

<style scoped lang="less">
.list{
  .col{
    height:232px;
    .img {
      width: 100%;
      margin: auto;
    }
    .amor_2 {
      padding-left: 10px;
      height: 53px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .span4 {
        font-size: 13px;
      }
      .solo {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .span5 {
          font-size: 16px;
          font-weight: bold;
          color: red;
        }
        .span6 {
          font-size: 13px;
          color: gray;
        }
      }
    }
  }
}
</style>