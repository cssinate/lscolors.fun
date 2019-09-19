import Vue from "vue";
import App from "./App";

import "@scss/main.scss";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});
