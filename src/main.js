import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { GlobalMixin } from "./mixins/globalMixin";
import "./assets/scss/global.scss";
import Vuex from "vuex";
import store from "./store";

Vue.config.productionTip = false;
Vue.mixin(GlobalMixin);
Vue.use(Vuex);

new Vue({
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
