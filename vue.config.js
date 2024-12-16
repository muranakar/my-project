const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false, // 追加
  transpileDependencies: [
    'vuetify'
  ]
})