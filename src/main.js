import Vue from "vue";
import App from "./App.vue";
import VueResource from "vue-resource";
import VueRouter from "vue-router";
import Routes from './routes';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMoon, faSun, faSearch, faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.config.productionTip = false;

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

library.add(faMoon, faSun, faSearch, faArrowLeft, faPlus);
Vue.component('font-awesome-icon', FontAwesomeIcon);

// Filters
Vue.filter("to-uppercase", (value) => {
  return value.toUpperCase();
});

Vue.filter("snippet", (value) => {
  return `${value.slice(0, 150)}...`;
});

// Custom directives
Vue.directive("rainbow",{
  bind(el) {
    el.style.color = `#${Math.random().toString().slice(2,8)}`;
  }
});

Vue.directive("theme", {
  update(el, binding) {
    if(binding.value == 'white') {
      el.style.background = "none";
      el.style.color = "#000";

    } else if(binding.value == 'dark') {
      el.style.background = "#001628";
      el.style.color = "#f5d67b";
    }

    if(binding.arg == 'column' && binding.value == 'dark') {
      el.style.background = "#131110a8";
    }

  }
});

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
