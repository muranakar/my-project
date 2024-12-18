import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './components/Sample1.css'

const app = createApp(App)

app.use(router)
app.mount('#app')

module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        watch: true
    }
})