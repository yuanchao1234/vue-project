<template>
  <div class="mine">
    <!-- 签到出 -->
    <div class="app">
      <div class="user-warp">
        <div class="user-picture-warp" @click="toUpload">
          <!-- <img :src="urlImages" class="user-picture" /> -->
          <van-image
            round
            fit="cover"
            width="0.6rem"
            height="0.6rem"
            :src="urlImages"
          />
        </div>
        <div class="user-cell-warp">
          <div class="user-title">{{telphone}}</div>
          <div class="user-Member">
            <img src="https://cdn.huaduocai.net/HDC_WAP_IMAGES/jsfen.png" style="width: 16px;" />
            <span class="integral">200</span>
            <a href="###" class="rule">积分规则</a>
            <a href="javascript:;" class="btn-Sign hy-color-bg" @click="tuiChu">退出</a>
          </div>
        </div>
      </div>

      <!-- 订单出 -->
      <div class="user-order-warp">
        <a href class="user-order-item">
          <div class="item-cell-center">
            <i class="iconfont icon-daifukuan"></i>
            <div class="iten-txt">待付款</div>
          </div>
        </a>
        <a href class="user-order-item">
          <div class="item-cell-center">
            <i class="iconfont icon-daifahuo"></i>
            <div class="iten-txt">待发货</div>
          </div>
        </a>
        <a href class="user-order-item">
          <div class="item-cell-center">
            <i class="iconfont icon-daishouhuo"></i>
            <div class="iten-txt">待收货</div>
          </div>
        </a>
        <a href class="user-order-item">
          <div class="item-cell-center">
            <i class="iconfont icon-wodedingdan"></i>
            <div class="iten-txt">我的订单</div>
          </div>
        </a>
      </div>
      <!-- 地址管理 -->
      <div class="from-warp">
        <div class="from-list-warp" @click="fengBu">
          <div class="from-list-icon">
            <!-- <i class="iconfont icon-dizhiguanli" style="color: rgb(50, 195, 42);"></i> -->
            <van-icon name="apps-o" size="0.19rem" />
          </div>
          <div class="from-list-lebel">商品分布</div>
          <div class="from-list-right from-mark-right"></div>
        </div>
        <div class="from-list-warp">
          <div class="from-list-icon">
            <i class="iconfont icon-dizhiguanli" style="color: rgb(50, 195, 42);"></i>
          </div>
          <div class="from-list-lebel">地址管理</div>
          <div class="from-list-right from-mark-right"></div>
        </div>
        <div class="from-list-warp">
          <div class="from-list-icon">
            <i class="iconfont icon-zaixiankefu" style="color: rgb(28, 226, 141);"></i>
          </div>
          <div class="from-list-lebel">在线客服</div>
          <div class="from-list-right from-mark-right"></div>
        </div>
        <div class="from-list-warp">
          <div class="from-list-icon">
            <i class="iconfont icon-dianhua" style="color: rgb(0, 111, 248);"></i>
          </div>
          <div class="from-list-lebel">联系我们</div>
          <div class="from-list-right from-mark-right"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Icon, Image as VanImage } from 'vant'
import { baseUrl } from '../../config'
Vue.use(Icon)
Vue.use(VanImage)
export default {
  name:'mine',
  data() {
    return {
      telphone: "",
      urlImages: ''
    };
  },
  async created() {
    this.telphone = localStorage.getItem("key")
    let username = this.telphone.split('_')[1]
    this.getHeadPortrait(username)
  },
  methods: {
    getHeadPortrait(username){
      this.$http.get("headPortrait", { username, classify: 'get' }).then(({ data })=>{
        this.urlImages = baseUrl + data
      })
    },
    toUpload(){
      this.$router.push('/upload')
    },
    fengBu(){
      this.$router.push('/distribution')
    },
    tuiChu() {
      this.$dialog.confirm({
        message: "你确定要退出吗？"
      })
        .then(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("key");
          this.router()
        })
        .catch(() => {
        });
    },
    router(){
      this.$router.push({
        name: "login",
        query: {
          redirectUrl: this.$route.fullPath
        }
      })
    }
  }
};
</script>
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}

body,
button,
input,
select,
textarea {
  color: #333;
}
.mine{
  .rui-head {
    width: 375px;
    height: 46px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f2f2f2;
    position: relative;
  }

  .rui-head-ret {
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  //左边箭头
  .c-main {
    position: absolute;
    top: -35px;
    left: -80px;
    display: inline-block;
    border-top: 2px solid;
    border-right: 2px solid;
    width: 12px;
    height: 12px;
    border-color: #333;
    transform: rotate(-135deg);
    margin: 50px auto auto 100px;
  }

  //个人中心
  .rui-head .rui-head-text {
    position: absolute;
    left: 155px;
    font-size: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .rui-head-menu {
    width: 45px;
    height: 45px;
  }
  .c-main2 {
    display: inline-block;
    width: 24px;
    height: 24px;
    font-size: 22px;
    font-weight: bold;
    position: absolute;
    right: 10px;
    top: 5px;
    line-height: 24px;
  }

  .app {
    background: #f6f6f6;
  }

  // 签到出
  .user-warp .user-cell-warp .user-Member .rule::before {
    position: absolute;
    right: -8px;
    top: 4px;
    width: 0;
    height: 0;
    border-width: 5px 0 5px 5px;
    border-style: solid;
    border-color: transparent transparent transparent #333;
    content: "";
  }
  a,
  legend {
    color: #333;
  }
  .user-warp {
    display: flex;
    align-items: center;
    background: #fff;
  }
  .address-list-warp,
  .user-warp {
    padding: 15px;
  }
  .user-warp .user-picture-warp {
    border-radius: 50%;
    overflow: hidden;
  }
  .user-warp .user-picture-warp .user-picture {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .user-warp .user-cell-warp {
    flex: 1;
    margin-left: 20px;
  }
  .user-warp .user-cell-warp .user-title {
    color: #333;
    font-weight: 700;
    font-size: 16px;
  }
  .user-warp .user-cell-warp .user-Member {
    display: flex;
    align-items:center;
    position: relative;
    margin-top: 10px;
    height: 20px;
    border-radius: 20px;
    font-size: 10px;
    line-height: 20px;
  }
  .user-warp .user-cell-warp .user-Member .integral {
    font-size: 16px;
    font-weight: 700;
    margin-left: 5px;
  }
  .user-warp .user-cell-warp .user-Member .rule {
    position: relative;
    margin-left: 5px;
  }
  .hy-color-bg {
    background-color: #f46 !important;
  }
  .user-warp .user-cell-warp .user-Member .btn-Sign {
    position: absolute;
    right: 0;
    top: -5px;
    width: 60px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    border-radius: 30px;
    color: #fff;
  }

  // 待付款
  .user-order-warp {
    margin-top: 10px;
    display: flex;
    height: 80px;
    background: #fff;
  }
  .user-order-warp .user-order-item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .user-order-warp .user-order-item .item-cell-center {
    position: relative;
    text-align: center;
  }
  .user-order-warp .user-order-item .item-cell-center .iconfont {
    font-size: 26px;
    line-height: 26px;
  }
  .iconfont {
    font-family: "宋体";
    font-size: 16px;
  }
  .user-order-warp .user-order-item .item-cell-center .iten-txt {
    margin-top: 8px;
    font-size: 12px;
  }
  // 字体图标
  .user-order-warp .user-order-item .item-cell-center .iconfont {
    font-size: 26px;
    line-height: 26px;
  }

  // 地址
  .from-warp,
  .rui-order-warp {
    margin-top: 10px;
  }
  .from-warp .from-list-warp {
    background: #fff;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
  .from-warp .from-list-warp .from-list-icon {
    margin-right: 15px;
  }

  .from-warp .from-list-warp .from-list-lebel {
    flex: 1;
    font-size: 14px;
  }

  .from-warp .from-list-warp .from-list-right {
    width: 20px;
  }
  .from-mark-right {
    position: relative;
  }
  .from-warp .from-list-warp .from-list-icon .iconfont {
    font-size: 20px;
    line-height: 20px;
  }

  .from-mark-right::after {
    position: absolute;
    right: 0;
    transform: translateY(-50%) matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  }

  .from-mark-left::after,
  .from-mark-right::after {
    top: 50%;
    height: 9px;
    width: 9px;
    border-width: 2px 2px 0 0;
    border-color: #cecece;
    border-style: solid;
    content: "";
  }
}
</style>