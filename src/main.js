import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import './scss/main.scss'

Vue.config.productionTip = false

// let currentStyle = ''

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

  }
}).$mount('#app')
