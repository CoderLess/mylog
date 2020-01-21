import Vue from 'vue'
import App from './App.vue'
import './plugins/mavon-editor.js'
import router from './plugins/vue-router.js'
import './plugins/element-ui.js'
import './plugins/axios.js'
import './css/global.css'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
