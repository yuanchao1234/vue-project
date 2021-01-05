<template>
  <div class="reg">
    <div class="img">
      <img src="https://huaduocai.oss-cn-qingdao.aliyuncs.com/hdc_pc_images/logo.jpg" alt="">
    </div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit" color="#f46">注册</van-button>
    </div>
    </van-form>
    <div class="rui-login-other">
      <a @click="goToLogin">已有账号! 去登录</a>
      <div></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Form, Field, Button, Toast } from 'vant'
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Toast)
Toast.setDefaultOptions({ 
  overlay:true,
  duration:1000
})
export default {
  name: 'reg',
  data () {
    return {
      username: '',
      password: '',
    }
  },
  mounted(){
  },
  methods:{
    onSubmit(values) {
      let _ = this
      this.$http.post('/reg', { 
        username:this.username,
        password:this.password 
      }).then((res) => {
        if (res.code === 1){// 注册成功
          Toast.setDefaultOptions({ 
            onClose(){// 设置回调
              _.$router.push({
                path:'/login',
                query: { 
                  redirectUrl: _.$route.query.redirectUrl 
                }
              })
            }
          })
          Toast.success('注册成功')
        } else if(res.code === -1){// 手机号已存在
          Toast.fail('该手机号已存在')
        } else if(res.code === 0){// 注册失败
          Toast.fail('注册失败')
        }
      })
    },
    goToLogin(){
      this.$router.push({
        path: '/login',
        query: { redirectUrl: this.$route.query.redirectUrl }
      })
    }
  }
}
</script>

<style scoped lang="less">
.reg{
  width: 344px;
  margin: auto;
  overflow: hidden;
  .img{
    margin-top: 84px;
    margin-bottom: 30px;
    img{
      display: block;
      margin: auto;
      width: 114px;
      height: 114px;
      border: 2px solid #f46;
      border-radius: 6px;
      padding: 15px;
    }
  }
  .rui-login-other {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 16px;
    color: #999;
  }
}
</style>