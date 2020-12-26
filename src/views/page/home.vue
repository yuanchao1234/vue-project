<template>
  <div class="home">
    <!-- 搜索框 -->
    <div class="search">
      <div class="hdc-head-logo">
        <img
          src="https://huaduocai.oss-cn-qingdao.aliyuncs.com/hdc_pc_images/logo.png"
          class="logo-images"
        />
      </div>
      <van-search placeholder="搜索鲜花，永生花，礼品" shape="round"></van-search>
      <span class="login" color="red" @click="goto" v-if="pan">登录</span>
      <span class="yonghuming" color="red" @click="yonghuming" v-else>{{yonghu}}</span>
    </div>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item class="home-swipe-item" v-for="(image, index) in images" :key="index">
        <img class="home-swipe-item-img" v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    <!-- 一级分类 -->
    <van-grid :column-num="4" :border="false">
      <van-grid-item
        v-for="item in datas"
        :key="item.id"
        :text="item.text"
        @click="classify(item.id)"
      >
        <van-image :src="item.src" />
      </van-grid-item>
    </van-grid>
    <div class="tag">
      <span>人气首推</span>
    </div>
    <!-- 人气首推 -->
    <div class="list">
      <div class="list_1" v-for="item in list_2" :key="item.text">
        <div class="list_2">
          <img :src="item.src" alt />
          <dl>
            <dt>{{item.text}}</dt>
            <dt>{{item.price}}</dt>
          </dl>
        </div>
      </div>
    </div>
    <!-- 二级分类 -->
    <div>
      <!-- 二级分类-头 -->
      <sendlover @click="gengduo">送花对象</sendlover>
      <!-- 送花对象 -->
      <div class="list">
        <div class="list_1" v-for="item in list_1" :key="item.text">
          <div class="list_2">
            <img :src="item.src" alt />
          </div>
        </div>
      </div>
      <!-- 二级分类-头 -->
      <sendlover @click="gengduo">爱情鲜花</sendlover>
      <div class="amor">
        <div class="amor_1" v-for="(item,index) in list_3" :key="index">
          <img :src="item.url" alt="item.title" />
          <div class="amor_2">
            <span class="span4">{{item.title}}</span>
            <span class="span5">{{item.price}}</span>
          </div>
        </div>
      </div>
      <!-- 二级分类-头 -->
      <sendlover @click="gengduo">生日鲜花</sendlover>
      <div class="amor">
        <div class="amor_1" v-for="(item,index) in list_4" :key="index">
          <img :src="item.url" alt="item.title" />
          <div class="amor_2">
            <span class="span4">{{item.title}}</span>
            <span class="span5">{{item.price}}</span>
          </div>
        </div>
      </div>
      <!-- 二级分类-头 -->
      <sendlover @click="gengduo">精品礼盒</sendlover>
      <div class="amor">
        <div class="amor_1" v-for="(item,index) in list_5" :key="index">
          <img :src="item.url" alt="item.title" />
          <div class="amor_2">
            <span class="span4">{{item.title}}</span>
            <span class="span5">{{item.price}}</span>
          </div>
        </div>
      </div>
      <!-- 二级分类-头 -->
      <sendlover @click="gengduo">开业花篮</sendlover>
      <div class="amor">
        <div class="amor_1" v-for="(item,index) in list_6" :key="index">
          <img :src="item.url" alt="item.title" />
          <div class="amor_2">
            <span class="span4">{{item.title}}</span>
            <span class="span5">{{item.price}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="nav">
      <img src="../../images/nav1.png" alt />
    </div>
    <div class="nav">
      <img src="../../images/nav2.png" alt />
    </div>
    <div class="banner">
      <img src="../../images/nav3.png" alt />
    </div>
    <div class="end">花语大全</div>
    <div class="flood">
      <span class="a">---- 客服热线:400-803-9638 ----</span>
      <span class="b">
        Copyright © 2007~2019
        花多彩(中国鲜花礼品网)
        版权所有
      </span>
      <span class="c">中国鲜花网领先品牌，鲜花速递专家！</span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { sendlover } from 'comp/comp/index.js'
import { Swipe, SwipeItem, Lazyload, Search, Grid, GridItem, Image } from 'vant'
Vue.use(Grid)
Vue.use(Image)
Vue.use(GridItem)
Vue.use(Lazyload)
Vue.use(Search)
Vue.use(Swipe)
Vue.use(SwipeItem)
export default {
  name: 'home',
  data () {
    return {
      images: [
        require("@/images/banner01.jpg"), 
        require("@/images/banner02.jpg")
      ],
      pan: true,
      yonghu:"123",
      datas: [
        {
          id: 1,
          src:
            "https://huaduocai.oss-cn-qingdao.aliyuncs.com/hdc_pc_images/quanbuxianhua.jpg",
          text: "全部鲜花"
        },
        {
          id: 2,
          src: "https://cdn.huaduocai.net/Storage/Shop/1/Tag/5/1.png",
          text: "花篮"
        },
        {
          id: 3,
          src: "https://cdn.huaduocai.net/Storage/Shop/1/Tag/6/1.png",
          text: "绿植"
        },
        {
          id: 4,
          src:
            "https://cdn.huaduocai.net/Storage/Shop/1/Tag/4/132528326006220673.jpg",
          text: "永生花"
        }
      ],
      list_1: [
        {
          src:
            "http://cdn.huaduocai.net/Storage/Shop/1/logo/9602835526844902.jpg",
          text: "送恋人"
        },
        {
          src:
            "http://cdn.huaduocai.net/Storage/Shop/1/logo/9602910973222929.jpg",
          text: "送朋友"
        },
        {
          src:
            "http://cdn.huaduocai.net/Storage/Shop/1/logo/9602917007070250.jpg",
          text: "送长辈"
        }
      ],
      list_2: [
        {
          src:
            "https://cdn.huaduocai.net/Storage/Shop/1/Products/7049/40120926086255.jpg/300_300",
          text: "最好的我们",
          price: "￥159.00"
        },
        {
          src:
            "https://cdn.huaduocai.net/Storage/Shop/1/GoodsPropertyValues/10453358321243729.jpg/300_300",
          text: "圣诞情怀",
          price: "￥289.00"
        },
        {
          src:
            "https://cdn.huaduocai.net/Storage/Shop/1/GoodsPropertyValues/10199683390776075.jpg/300_300",
          text: "火红的圣诞",
          price: "￥369.00"
        }
      ],
      list_3: [],
      list_4: [],
      list_5: [],
      list_6: []
    }
  },
  mounted(){
    this.classifydata('Brand_zone', 'list_3')
    this.classifydata('send_friend', 'list_4')
    this.classifydata('flower_sub', 'list_5')
    this.classifydata('index', 'list_6')
  },
  methods:{
    classifydata(text, list){
      this.$http.get('home', { text }, true).then((res) => {
        if (res.code === 1){
          this[list] = res.data
        } else {
          console.log(res)
        }
      })
    },
    goto(){

    },
    yonghuming(){

    },
    gengduo(){
      this.$router.push({
        name: "list"
      })
    }
  },
  components:{
    sendlover
  }
}
</script>

<style scoped lang="less">
.home{
  background: #f2f2f2;
  .search {
      height: 44px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: #ffffff;
      .hdc-head-logo{
        .logo-images{
          width: 28px;
          height: 28px;
        }
      }
      .login {
        color: #f46;
        font-size: 14px;
        font-weight: bold;
        margin-right: 9px;
      }
      .yonghuming {
        display: inline-block;
        width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #f46;
        font-size: 14px;
        font-weight: bold;
      }
  }
  .home-swipe-item{
    .home-swipe-item-img{
      width: 100%;
    }
  }
  .tag{
    text-align: center;
  }
  .list {
    width: 375px;
    height: 125px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    .list_1 {
      width: 347px;
      height: 125px;
      // border: 1px solid red;
      .list_2 {
        display: inline-block;
        width: 115px;
        height: 115px;
        // border: 1px solid red;
        position: relative;
        img {
          width: 115px;
          height: 115px;
        }
        dl {
          width: 115px;
          height: 48px;
          // border: 1px solid red;
          position: absolute;
          bottom: -16px;
          background: rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          dt {
            font-size: 14px;
            color: #fff;
          }
        }
      }
    }
  }
  .amor {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;

    .amor_1 {
      background: #ffffff;
      margin-left: 6px;
      margin-bottom: 6px;
      width: 179px;
      height: 232px;
      // border: 1px solid red;
      img {
        width: 179px;
        height: 179px;
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
        .span5 {
          font-size: 16px;
          font-weight: bold;
          color: red;
        }
      }
    }
  }
  .nav {
    height: 70px;
    img {
      width: 375px;
      height: 70px;
    }
  }
  .banner {
    height: 202px;
    img {
      width: 375px;
      height: 202px;
    }
  }
  .end {
    background: #ffffff;
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 15px;
    color: rgb(98, 96, 96);
  }
  .flood {
    height: 95px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .a {
      color: red;
      font-size: 10px;
    }
    .b,
    .c {
      color: gray;
      font-size: 12px;
    }
  }
}
</style>
