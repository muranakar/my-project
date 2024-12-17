import { createApp } from 'vue' // 変更: Vue 3のcreateAppをインポート
import App from './App.vue'
import router from './router'
// import store from './store' // 削除: storeのインポートを削除
import './components/Sample1.css' // 追加: 新しいCSSファイルをインポート

const app = createApp(App) // 変更: createAppを使用してアプリケーションを作成

app.use(router)
// app.use(store) // 削除: storeの参照を削除
app.mount('#app') // 変更: アプリケーションをマウント

module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        watch: true
    }
})