console.log(process.env.NODE_ENV)

module.exports = {
  publicPath: './', // 公共路径
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 37.5, // 换算的基数 直接在 750 的设计稿中原 px 单位 / 2
            // 忽略转换正则匹配项。插件会转化所有的样式的px。比如引入了三方UI，也会被转化。目前我使用 selectorBlackList字段，来过滤
            // 如果个别地方不想转化px。可以简单的使用大写的 PX 或 Px 。
            selectorBlackList: ['ig'],
            propList: ['*'],
            exclude: /node_modules/
          })
        ]
      }
    }
  },
  configureWebpack: {
    externals: {
      // 排除一些包，不会打包进vendor中
      // 左侧为我们在业务中引入的包名， 右侧 为对应库提供给外部引用的名字
      vue: 'Vue',
      'vue-router': 'VueRouter',
      'vue-i18n': 'VueI18n',
      axios: 'axios',
      'js-cookie': 'Cookies'
    }
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  //   config
  //     .plugin('webpack-bundle-analyzer')
  //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  },
  runtimeCompiler: true,
  productionSourceMap: false
}
