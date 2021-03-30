module.exports = {
  // publicPath: '/wbg/', // 如果加上后缀 则访问时 也需要加上后缀  http://localhost:8081/wbg/
  publicPath: '/',
  productionSourceMap: false, // 生产环境是否使用sourceMap
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 8001,
    disableHostCheck: true,
    compress: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    historyApiFallback: true,
    // host: '0.0.0.0',
    // port: 8001,
    // historyApiFallback: true,
    // overlay: true,

    // proxy: {
    //   '/webapi': {
    //     target: 'http://localhost:3301',
    //     changeOrigin: true,
    //     secure: false
    //   },
    //   '/bossapi': {
    //     target: 'http://localhost:3301',
    //     changeOrigin: true,
    //     secure: false
    //   },
    //   '/loginapi': {
    //     target: 'https://xshidtest.linlongyun.com',
    //     // target: 'http://192.168.6.72:8080',
    //     changeOrigin: true,
    //     secure: false,
    //     pathRewrite: {
    //       '^/loginapi': '',
    //     },
    //   },
    //   '/mock': {
    //     target: '/mock',
    //     changeOrigin: true,
    //     secure: false
    //   },
    // },
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/color.scss";`
      }
    }
  }
}
