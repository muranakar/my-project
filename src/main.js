import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // ルーターをインポート

createApp(App).use(router).mount('#app');

module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        watch: true
    }
})