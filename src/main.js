import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import './scss/main.scss'

import { inodes as results } from './components/inodes.js'

Vue.config.productionTip = false

let currentScheme = ''

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      // here I check that click was outside the el and his childrens
      if (!(el === event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
})

new Vue({
  render: h => h(App),
  data: {
    currentScheme: currentScheme,
    inodes: JSON.parse(JSON.stringify(results)),
    inodesDefault: results
  }
}).$mount('#app')
