module.exports = {
  // publicPath: '/wbg/', // 如果加上后缀 则访问时 也需要加上后缀  http://localhost:8081/wbg/
  publicPath: '/',
  productionSourceMap: false, // 生产环境是否使用sourceMap
  devServer: {
    open: false,
    host: '0.0.0.0',
    port: 8080,
    historyApiFallback: true,
    overlay: true,
    proxy: {
      '/api': {
        // target: 'http://61.155.157.162:9876',
        // target: 'http://xsh.weibangong.site',
        target: 'https://xshapitest.linlongyun.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': '',
        },
      },
      '/loginapi': {
        target: 'https://xshidtest.linlongyun.com',
        // target: 'http://192.168.6.72:8080',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/loginapi': '',
        },
      },
      '/mock': {
        target: '/mock',
        changeOrigin: true,
        secure: false
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/color.scss";`
      }
    }
  }
}