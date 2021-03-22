// 本地环境配置
module.exports = {
  baseUrl: `http://${process.env.VUE_APP_IP}:3003`, // 服务器地址
  baseApi: `http://${process.env.VUE_APP_IP}:8088` // 本地api请求地址
}
