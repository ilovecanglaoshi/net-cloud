const port = process.env.port || process.env.npm_config_port || 10086 // dev port
module.exports = {
  pluginOptions:{
    electronBuilder:{
      nodeIntegration: true
    }
  },
    devServer: {
        port: port,
        open: true,
        overlay: {
          warnings: false,
          errors: true
        },
        // before: require('./mock/mock-server.js'),
        proxy: {
          // detail: https://cli.vuejs.org/config/#devserver-proxy
          [process.env.VUE_APP_BASE_API]: {
            target: 'http://127.0.0.1:4000', 
            changeOrigin: true,
            pathRewrite: {
              ['^' + process.env.VUE_APP_BASE_API]: ''
            }
          }
        },
        disableHostCheck: true
      },
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/scss/style.scss";`
            }
        }
    }
}
