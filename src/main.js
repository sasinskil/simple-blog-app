import Vue from "vue";
import App from "./App.vue";
import VueResource from "vue-resource";
import VueRouter from "vue-router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.config.productionTip = false;

Vue.use(VueResource);
Vue.use(VueRouter);

library.add(faMoon);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  render: h => h(App)
}).$mount("#app");
