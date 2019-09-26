import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import './scss/main.scss'

Vue.config.productionTip = false

let currentScheme = ''

new Vue({
  render: h => h(App),
  data: {
    currentScheme: currentScheme
  }
}).$mount('#app')
