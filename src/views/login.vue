<template>
  <div class="login">
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
      <van-button round block type="info" native-type="submit" color="#f46">登录</van-button>
    </div>
    </van-form>
    <div class="rui-login-other">
      <div></div>
      <a @click="goToReg">立即注册</a>
    </div>
    <div class="t-btn">
      <van-button plain type="info" @click="$router.replace('/page/home')">返回首页</van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
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
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
    }
  },
  mounted(){
    this.username = this.userState.username
    this.password = this.userState.password
  },
  methods:{
    ...mapMutations(['userMutations']),
    onSubmit(values) {
      let _ = this
      this.$http.post('/login', { 
        username:this.username,
        password:this.password 
      }).then((res) => {
        if (res.code === 1){// 登录成功
          localStorage.setItem('token', res.token)
          localStorage.setItem('key', 'hdc_' + this.username)
          Toast.setDefaultOptions({ 
            onClose(){// 设置回调，登录成功，回到原来的页面
              // 将在仓库的账号密码清空
              _.userMutations({
                username: '',
                password: '' 
              })
              _.$router.push(_.$route.query.redirectUrl)
            }
          })
          Toast.success('登录成功')
        } else if(res.code === 0){// 登录失败
          Toast.fail('登录失败')
        }
      })
    },
    goToReg(){
      this.$router.push({
        path: '/reg',
        query: { redirectUrl: this.$route.query.redirectUrl }
      })
    }
  },
  computed:{
    ...mapState(['userState'])
  }
}
</script>

<style scoped lang="less">
.login{
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
  .t-btn{
    margin-top: 50px;
    text-align: center;
  }
}
</style>