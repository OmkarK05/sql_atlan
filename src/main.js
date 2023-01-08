import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { GlobalMixin } from './mixins/globalMixin'
import './assets/scss/global.scss'
import 'echarts';

Vue.config.productionTip = false;
Vue.use(GlobalMixin);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
