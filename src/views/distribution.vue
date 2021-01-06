<template>
  <div class="distribution">
    <div class="main" ref="main"></div>
    <div class="btn">
      <van-button plain type="info" @click="back">返回上一页</van-button>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import Vue from 'vue'
import { Button } from 'vant'
Vue.use(Button)
export default {
  name: 'distribution',
  data () {
    return {
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      class1:'凤仙花',
      class2:'万寿菊',
      class3:'半枝莲',
      class4:'一串红',
    }
  },
  mounted(){
    this.getData()
  },
  methods:{
    back(){
      this.$router.back(-1)
    },
    getData(){
      this.$http.get('distribution',{},true).then((res) => {
        if (res.code === 1){
          this.data1 = res.data.data1
          this.data2 = res.data.data2
          this.data3 = res.data.data3
          this.data4 = res.data.data4
          this.$nextTick(()=>{
            this.ech()
          })
        } else {
        }
      })
    },
    ech(){
      const myChart = echarts.init(this.$refs.main)
      let option = {
        title: {
          text: '商品种类分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          bottom: 10,
          left: 'center',
          data: [this.class1, this.class2, this.class3, this.class4]
        },
        series: [
          {
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: [
              { value: this.data1.length, name: this.class1 },
              { value: this.data2.length, name: this.class2 },
              { value: this.data3.length, name: this.class3 },
              { value: this.data4.length, name: this.class4 }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped lang="less">
.distribution{
  height: 100%;
  position: relative;
  .main{
    width: 100%;
    height: 350px;
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
  }
  .btn{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 150px
  }
}
</style>