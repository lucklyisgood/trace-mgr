const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    }
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.1.2:14001',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/prod': {
        target: 'https://tracer.bbclient.icu/v2',
        changeOrigin: true,
        pathRewrite: {
          '^/prod': ''
        }
      }
    }
  }
})
