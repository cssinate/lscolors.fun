import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import './scss/main.scss'

import { inodes as results } from './components/inodes.js'

Vue.config.productionTip = false

let currentScheme = ''

new Vue({
  render: h => h(App),
  data: {
    currentScheme: currentScheme,
    inodes: results
  }
}).$mount('#app')
