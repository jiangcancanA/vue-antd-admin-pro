const path = require('path')
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 全局配置less
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          // DO NOT REMOVE THIS LINE
          javascriptEnabled: true,
          globalVars: {
            // less vars，customize ant design theme
            // 'primary-color': '#F5222D',
          }
        }
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/assets/less/main.less')]
    }
  }
})
