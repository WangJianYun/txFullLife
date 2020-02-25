module.exports = {
  devServer: {
    open: true,
    host: '192.168.7.102',
    port: 9007,
    https: false,
    proxy: { // 配置跨域
      '/api': {
        target: 'http://94.191.93.96:8800', // 填写后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/api': '' // 请求的时候使用这个api就可以
        }
      }

    }
  }
}
