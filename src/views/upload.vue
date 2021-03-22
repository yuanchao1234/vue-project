<template>
  <div class="upload">
    <div class="img">
      <div class="image">
        <van-image
          round
          fit="cover"
          width="2rem"
          height="2rem"
          :src="urlImages"
          @click="popup"
        />
        <van-popup v-model="show">
          <img :src="urlImages" alt="" @click="show = !show">
        </van-popup>
      </div>
    </div>
    <div class="btn">
      <van-uploader :after-read="afterRead">
        <van-button icon="plus" type="primary" color="linear-gradient(to right, #ff6034, #ee0a24)">更换头像</van-button>
      </van-uploader>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { baseUrl } from '../config'
import { Uploader, Image as VanImage, Popup, Button } from 'vant'
Vue.use(Uploader)
Vue.use(VanImage)
Vue.use(Popup)
Vue.use(Button)
export default {
  name: 'upload',
  data () {
    return {
      show: false,
      urlImages: baseUrl + '/images/avatar/user.png',
    }
  },
  created() {
    this.getHeadPortrait('get')
  },
  methods:{
    async getHeadPortrait(classify, images){
      let username = localStorage.getItem("key").split('_')[1]
      let { data } = await this.$http.get("headPortrait", { username, images, classify }, true)
      if(classify == 'get'){
        this.urlImages = baseUrl + data
      }else if(classify == 'save'){
        this.getHeadPortrait('get')
      }
    },
    popup(){
      this.show = !this.show
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      this.upLoad(file.file)
    },
    async upLoad(file){
      let formData = new FormData()
      formData.append("file", file)
      // 图片上传至服务器
      let res = await this.$http.post('upload/img', formData, true)
      if(res.mes === 'success'){
        let images = '/images/avatar/' + res.data[0].filename
        // 将服务器的图片路径存到数据库
        this.getHeadPortrait('save', images)
      }
    }
  }
}
</script>
<style scoped lang="less">
.upload{
  .img{
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 68, 102, 0.7);
    .image{
      width: 200px;
      height: 200px;
    }
    .van-popup{
      img{
        width: 100vw;
      }
    }
  }
  .btn{
    margin-top: 50px;
    .van-uploader{
      left: 50%;
      transform:translateX(-50%)
    }
  }
}
</style>