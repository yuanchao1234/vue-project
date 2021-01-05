<template>
  <div class="cart">
    <div class="cart-main">
      <!-- 列表 -->
      <div class="cart-list" v-for="(item, index) in checkout" :key="item.title">
        <div class="cart-check fl">
          <span @click="checkMethods(item)" v-if="item.check" class="icheck iconfont icon-check"></span>
          <span @click="checkMethods(item)" v-else class="icheck2 iconfont icon-weixuanyuanquan"></span>
        </div>
        <div class="cart-img fl">
          <img :src="item.url" alt />
        </div>
        <div class="cart-title fr">
          <p v-cloak>{{item.title}}</p>
          <div class="pri">
            <div class="price">
              <div class="shopp-Price" v-cloak>￥{{item.price}}</div>
              <div class="shopp-number">
                <div class="number-plus" @click="reduceMethods(index,item.gid)">-</div>
                <!-- 这里还有其他方案吗？ -->
                <input
                  type="Number"
                  v-model.number="item.shuliang"
                  @change="yuanMethods(index)"
                  class="number-input"
                />
                <div class="number-reduce" @click="plusMethods(index)">+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 空状态 -->
      <div class="kong" v-show="kongGouWuCe">
        <span class="iconfont icon-gouwuche"></span>
        <p class="text">你还没有添加购物车!</p>
      </div>
    </div>
    <br />
    <br />
    <br />
    <!-- 底部 -->
    <div class="cart-bottom">
      <div class="cart-dibu">
        <span class="heji">合计：</span>
        <span class="jiage">￥{{heJiMethods()}}</span>
        <div class="btn fr" ref="jiesuan" :style="{backgroundColor:bgc}">去结算</div>
      </div>
    </div>
  </div>
</template>
<script>
import { Dialog, Toast } from "vant";
export default {
  name:'cart',
  data() {
    return {
      bgc: "",
      checkout: [],
      time1: null,
      phone:""
    };
  },
  created() {
    this.getData()
  },
  methods: {
    // 输入框的控制
    yuanMethods(index) {
      if (this.checkout[index].shuliang <= this.checkout[index].gid) {
        this.$http.get("upcart", {
          shuliang: this.checkout[index].shuliang,
          gid: this.checkout[index].gid,
          phone: this.phone
        })
      } else {
        this.checkout[index].shuliang = this.checkout[index].gid
        Dialog.alert({
          message: `超出了库存量，库存为${this.checkout[index].gid}`
        }).then(() => {
          this.$http.get("upcart", {
            shuliang: this.checkout[index].shuliang,
            gid: this.checkout[index].gid,
            phone: this.phone
          })
        })
      }
    },
    // 选与未选
    checkMethods(item) {
      item.check = !item.check
    },
    // 减
    reduceMethods(index, gid) {
      if (this.checkout[index].shuliang <= 1) {
        Dialog.confirm({
          title: "提示",
          message: "你确定要删除吗？"
        })
          .then(() => {
            // 删除视图层
            this.checkout.splice(index, 1)
            //删除购物车数据
            this.$http.get('delcart',{
              gid,
              phone: this.phone
            })
          })
          .catch(() => {})
      } else {
        //减
        this.checkout[index].shuliang--;
        clearTimeout(this.time1);
        this.time1 = setTimeout(() => {
          this.$http.get("upcart", {
              shuliang: this.checkout[index].shuliang,
              gid,
              phone: this.phone
          })
        }, 500)
      }
    },
    // 加
    plusMethods(index) {
      //判断是否小于库存量
      if (this.checkout[index].shuliang < this.checkout[index].gid) {
        this.checkout[index].shuliang++;
        //防抖效果
        clearTimeout(this.time1);
        this.time1 = setTimeout(() => {
          this.$http.get("upcart", {
            shuliang: this.checkout[index].shuliang,
            gid: this.checkout[index].gid,
            phone: this.phone
          })
        }, 500)
      } else {
        Toast({
          message:'当前库存为' + this.checkout[index].gid,
          icon: 'fail'
        })
      }
    },
    // 合计的计算
    heJiMethods() {
      let sum = 0;
      let arr = [];
      this.checkout.forEach(item => {
        if (item.check) {
          sum += item.price * item.shuliang
        } else {
          arr.push(1)
        }
      })
      if (arr.length == this.checkout.length) {
        // jiesuan.style.backgroundColor = "#ccc";
        this.bgc = "#ccc"
      } else {
        // jiesuan.style.backgroundColor = "#58bc58";
        this.bgc = ""
      }
      return sum
    },
    // 获取初始化数据
    async getData(){
      let phone = localStorage.getItem("key")
      this.phone = phone
      //购物车数据
      let { data } = await this.$http.get('selectcart', { phone }, true)
      this.checkout = data
    }
  },
  computed: {
    // 选与未选
    kongGouWuCe() {
      if (this.checkout.length) {
        return false;
      } else {
        return true;
      }
    },
    heJiComputed() {
      let sum = 0;
      let arr = [];
      this.checkout.forEach(item => {
        if (item.check) {
          sum += item.price * item.shuliang
        } else {
          arr.push(1)
        }
      })
      /**
       * 疑问1：如果放在计算属性，给bgc设置颜色，为什么不行，在方法中可以
       * 答：在vue中的计算属性不允许修改data的数据
      */
      //   window.console.log(arr.length);
      //   //   let jiesuan = this.$refs.jiesuan;
      //   if (arr.length == this.checkout.length) {
      //     // jiesuan.style.backgroundColor = "#ccc";
      //     this.bgc = "#ccc";
      //   } else {
      //     // jiesuan.style.backgroundColor = "#58bc58";
      //     this.bgc = "";
      //   }

      // if (arr.length == this.checkout.length) {
      // this.bgc = "789";
      // }

      // if (arr.length == this.checkout.length) {
      //   // jiesuan.style.backgroundColor = "#ccc";
      //   this.bgc = "#ccc";
      // } else {
      //   // jiesuan.style.backgroundColor = "#58bc58";
      //   this.bgc = "";
      // }
      return sum;
    }
  }
};
</script>
<style scoped lang="less">
.cart {
  .cart-main {
    .kong {
      height: 90px;
      padding: 30px 0;
      text-align: center;
      color: #cecece;
      span {
        display: block;
        font-size: 90px;
        font-weight: 580;
      }
    }
    .cart-list {
      padding: 10px 15px;
      background-color: #fff;
      border-top: 1px solid #f7f7f7;
      height: 104.8px;
      .cart-check {
        height: 100%;
        display: flex;
        align-items: center;
        .icheck {
          font-size: 22px;
          border-radius: 50%;
          color: #f46;
        }
        .icheck2 {
          font-size: 22px;
          border-radius: 50%;
          color: #333;
        }
      }
      .cart-img {
        margin-left: 15px;
        img {
          width: 100px;
          height: 100px;
        }
      }
      .cart-title {
        font-size: 15px;
        position: relative;
        width: 193px;
        height: 100%;
        .pri {
          width: 193px;
          position: absolute;
          left: 0;
          bottom: 0;
          .price {
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .shopp-Price {
              width: 55px;
              height: 24px;
              color: #f46;
              font-weight: 700;
              font-size: 15px;
            }
            .shopp-number {
              height: 28px;
              width: 116px;
              border: 1px solid #f2f2f2;
              border-radius: 4px;
              display: flex;
              align-items: center;
              .number-plus {
                cursor: pointer;
                width: 28px;
                height: 28px;
                text-align: center;
                line-height: 28px;
                font-size: 22px;
                color: #ccc;
              }
              .number-input {
                height: 28px;
                width: 58px;
                padding: 0 10px;
                border-width: 0 1px;
                border-style: solid;
                border-color: #f2f2f2;
                text-align: center;
                border-radius: 0;
                font-size: 16px;
                color: #8b8b8b;
              }
              .number-reduce {
                cursor: pointer;
                width: 28px;
                height: 28px;
                text-align: center;
                line-height: 28px;
                font-size: 22px;
                color: #ccc;
              }
            }
          }
        }
      }
    }
  }
  .cart-bottom {
    position: fixed;
    bottom: 50px;
    z-index: 99;
    .cart-dibu {
      width: 100vw;
      height: 50px;
      background-color: #fff;
      .heji {
        font-size: 14px;
        font-weight: 600;
        font-family: "微软雅黑";
        color: #333;
        height: 50px;
        line-height: 50px;
        margin-left: 15px;
      }
      .jiage {
        color: #f46;
        font-weight: 700;
        font-size: 16px;
        height: 50px;
        line-height: 50px;
      }
      .btn {
        height: 50px;
        width: 110px;
        text-align: center;
        line-height: 50px;
        background-color: #f46;
        color: #fff;
        font-size: 16px;
        font-weight: 700;
      }
    }
  }
}
[v-cloak] {
  display: none;
}
</style>