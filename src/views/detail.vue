<template>
  <div class="detail">
    <div class="image">
      <img :src="flower.url" alt />
    </div>
    <div class="title">
      <div class="product-title">{{flower.title}}--16支白菊花，勿忘我、扇尾叶点缀搭配。</div>
      <div class="product-other">
        <p>
          <!-- <span class="fuhao">￥</span> -->
          <span class="price">{{flower.price}}</span>
          <span class="price-other-out">￥{{pricecomputed}}</span>
          <span class="product-volume fr" ref="product">已售：{{flower.inventory}}</span>
        </p>
      </div>
    </div>
    <div class="hdx-advantage">
      <div class="advantage-item">
        <span class="i iconfont icon-quangou"></span>
        <span class="tishi">品质保障</span>
      </div>
      <div class="advantage-item">
        <span class="i iconfont icon-quangou"></span>
        <span class="tishi">品质保障</span>
      </div>
      <div class="advantage-item">
        <span class="i iconfont icon-quangou"></span>
        <span class="tishi">品质保障</span>
      </div>
    </div>
    <div class="warp">
      <div class="list clearfix" v-for="item in list" :key="item.label">
        <div class="label fl">{{item.label}}</div>
        <div class="content fl">{{item.content}}</div>
      </div>
    </div>
    <div class="weizhi"></div>
    <div class="number-warp">
      <div class="number-label">数量</div>
      <div class="shopp-number">
        <div class="number-plus" @click="reduce">-</div>
        <input type="Number" name="number" id="goodCnt" class="number-input" v-model="shuLiangComputed" />
        <div class="number-reduce" @click="plus">+</div>
      </div>
      <p class="kucun">库存：{{flower.gid}}</p>
    </div>
    <div class="weizhi"></div>
    <div class="pingjia">
      <div class="pingjia-title">
        <span>订单评价</span>
        <span class="jiantou iconfont icon-jiantou fr"></span>
      </div>
      <div class="comment">
        <div class="comment-btn">查看全部评价</div>
      </div>
    </div>
    <div class="weizhi"></div>
    <div class="display-map">
      <div class="map">图文详情</div>
      <img v-for="item in images" :key="item" :src="item" alt />
    </div>
    <div class="tabbar">
      <div class="tabbar-item1 fl">
        <div class="ti1" @click="home">
          <span class="tubiao iconfont icon-shouye"></span>
          <span class="text">首页</span>
        </div>
      </div>
      <div class="tabbar-item1 fl">
        <div class="ti1" @click="cart">
          <span class="tubiao iconfont icon-gouwuche"></span>
          <span class="text">购物车</span>
        </div>
      </div>
      <div class="tabbar-item1 fl">
        <div class="ti1" @click="phone">
          <span class="tubiao iconfont icon-dkw_xiaoxi"></span>
          <span class="text">电话</span>
        </div>
      </div>
      <div class="tabbar-cart fl" @click="addcart">加入购物车</div>
      <div class="buy-cart fl">立即购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      flower: {},
      list: [
        {
          label: "花语",
          content: "心酸的表情,伤感的往事.无尽的哀愁,愿来生再聚"
        },
        {
          label: "花材",
          content: "16支白菊花，勿忘我、扇尾叶点缀搭配。"
        },
        {
          label: "包装",
          content: "蓝色纸内层，白色纸外层纸扇形包装，蓝白色丝带蝴蝶结。"
        },
        {
          label: "配送",
          content: "本地区各市县、乡镇、街道（市区内免费配送）"
        },
        {
          label: "赠送",
          content: "下单填写留言，即免费赠送精美贺卡！"
        }
      ],
      images: [
        "https://cdn.huaduocai.net//Storage/Shop/1/goodsFormat/4800744936968722.jpg",
        "https://cdn.huaduocai.net//Storage/Shop/1/Products/28/Details/6361255900363894142457035.jpg",
        "https://cdn.huaduocai.net//Storage/formatPicture/1/5150872344181641.jpg"
      ],
      shuliang: 1
    }
  },
  computed:{
    pricecomputed(){
      return this.flower.price * 1 + 30
    },
    shuLiangComputed:{
      get() {
        return this.shuliang;
      },
      set(val) {
        if (val >= this.flower.gid) { // 最大值
          this.shuliang = this.flower.gid
        }else if(val < 1){ // 最小值
          this.shuliang = 1
        }else { // 处于最小值与最大值之间
          this.shuliang = val
        }
      }
    }
  },
  methods:{
    plus(){
      this.shuLiangComputed++
    },
    reduce(){
      this.shuLiangComputed--
    },
    async addcart(){
      let data = await this.$http.post('/verify')
      // 判断token值是否过期
      if (!data.token) { // 未登录
        this.$dialog.confirm({
          message: "请登录"
        }).then(() => {
          this.$router.push({
            path:'/login',
            query: {
              redirectUrl: this.$route.fullPath
            }
          })
        }).catch(() => {
        })
      }else{ // 登录
        let key = localStorage.getItem("key")
        let { data } = await this.$http.get('addcart',{
          ...this.flower,
          shuliang: this.shuliang, 
          phone:key
        })
        if(data.insertedCount || data.modifiedCount === 1){
          this.$toast({
            msg: '添加成功',
            type: 'success'
          })
        }else{
          this.$toast({
            msg: '添加失败',
            type: 'fail'
          })
        }
      }
    },
    phone(){
      this.$router.replace({
        path:'/page/phone'
      })
    },
    home(){
      this.$router.replace('/page/home')
    },
    async cart(){
      let data = await this.$http.post('/verify')
      // 判断token值是否过期
      if (!data.token) { // 未登录
        this.$dialog.confirm({
          message: "请登录"
        }).then(() => {
          this.$router.push({
            path:'/login',
            query: {
              redirectUrl: this.$route.fullPath
            }
          })
        }).catch(() => {
        })
      }else{
        this.$router.push({
          path:'/page/cart'
        })
      }
    },
    async getDetail(){
      const gid = this.$route.params.id
      const { data } = await this.$http.get('about', { gid })
      delete data[0]._id
      this.flower = data[0]
    }
  },
  created(){
    this.getDetail()
  }
}
</script>

<style scoped lang="less">
.detail{
  .image {
    img {
      width: 375px;
    }
  }
  .title {
    height: 93.6px;
    padding: 0 15px;
    .product-title {
      padding: 8px 0;
      font-weight: 700;
      font-size: 15px;
      line-height: 1.4;
      letter-spacing: 1px;
    }
    .product-other {
      padding: 0 0 12px;
      p {
        .fuhao {
          font-weight: 700;
          font-size: 24px;
          color: #f46;
          line-height: 1;
        }
        .price {
          font-weight: 700;
          font-size: 24px;
          color: #f46;
          line-height: 1;
        }
        .price-other-out {
          margin-left: 4px;
          color: #b4babf;
          line-height: 1;
          font-size: 14px;
          font-family: "微软雅黑";
          text-decoration: line-through;
        }
        .product-volume {
          font-size: 12px;
        }
      }
    }
  }
  .hdx-advantage {
    box-sizing: border-box;
    padding: 8px 15px;
    height: 33.6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f7f7f7;
    .advantage-item {
      .i {
        font-size: 16px;
        color: #f46;
      }
      .tishi {
        font-size: 12px;
        color: #b5b5b5;
        margin-left: 5px;
      }
    }
  }
  .warp {
    .list {
      padding: 8px 15px;
      box-sizing: border-box;
      font-size: 14px;
      .label {
        padding: 0 15px 0 0;
        color: #999;
      }
      .content {
        width: 302px;
        letter-spacing: 1px;
      }
      .content::after {
        content: "";
        display: block;
        height: 1px;
        width: 100%;
        background-color: #f2f2f2;
      }
    }
  }
  .weizhi {
    width: 375px;
    height: 10px;
    background-color: #f7f7f7;
  }
  .number-warp {
    padding: 6px 15px;
    display: flex;
    .number-label {
      padding: 0 15px 0 0;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
    }
    .shopp-number {
      height: 30px;
      width: 120px;
      border: 1px solid #f2f2f2;
      border-radius: 4px;
      display: flex;
      .number-plus {
        width: 40px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-size: 22px;
        color: #474747;
      }
      .number-input {
        width: 70px;
        padding: 0 10px;
        border-width: 0 1px;
        border-style: solid;
        border-color: #f2f2f2;
        text-align: center;
        border-radius: 0;
        font-size: 16px;
        color: #474747;
      }
      .number-reduce {
        width: 40px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-size: 22px;
        color: #474747;
      }
    }
    .kucun {
      font-size: 12px;
      line-height: 30px;
      height: 30px;
      margin-left: 10px;
    }
  }
  .pingjia {
    padding: 0 15px;
    height: 97.8px;
    .pingjia-title {
      height: 45.8px;
      line-height: 45.8px;
      font-size: 14px;
      .jiantou {
        font-size: 26px;
        color: #cecece;
        font-weight: 700;
      }
    }
    .pingjia-title::after {
      content: "";
      display: block;
      height: 1px;
      width: 100%;
      background-color: #f2f2f2;
    }
    .comment {
      padding: 10px 0;
      .comment-btn {
        margin: 0 auto;
        width: 150px;
        height: 30px;
        font-size: 12px;
        padding: 0 14px;
        color: #f46;
        line-height: 30px;
        text-align: center;
        border-radius: 30px;
        border: 1px solid #f46;
      }
    }
  }
  .display-map {
    .map {
      padding: 12px 15px;
      font-size: 14px;
      border-bottom: 1px solid #f2f2f2;
    }
    img {
      width: 375px;
    }
  }
  .tabbar {
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    z-index: 10;
    background-color: #fff;
    .tabbar-item1 {
      display: flex;
      width: 53.6px;
      height: 50px;
      .ti1 {
        text-align: center;
        margin: 8px auto;
        .tubiao {
          display: block;
          font-size: 18px;
        }
        .text {
          display: block;
          font-size: 12px;
        }
      }
    }
    .tabbar-cart {
      width: 107px;
      background-color: #ff9800;
      line-height: 50px;
      color: #fff;
      font-weight: 700;
      text-align: center;
      font-size: 14px;
    }
    .buy-cart {
      width: 107px;
      background-color: #f46;
      line-height: 50px;
      color: #fff;
      font-weight: 700;
      text-align: center;
      font-size: 14px;
    }
  }
}
</style>