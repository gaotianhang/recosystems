module.exports = {
  lintOnSave: false,
  configureWebpack: {
    //配置路径相关的时候用resolve 可以解决路径相关的问题
    resolve: {
      alias: {
        //默认有@ 他指向的是：src
        'assets': '@/assets',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'utils': '@/utils',
      }
    }
  },
  devServer: {
    port: 8787,
  },

};
