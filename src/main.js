import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { GlobalMixin } from './mixins/globalMixin'
import './assets/scss/global.scss'
import ECharts from 'vue-echarts/components/ECharts'

Vue.config.productionTip = false;
Vue.use(GlobalMixin);
Vue.component('EChart', ECharts)

new Vue({
  vuetify,
  ECharts,
  render: h => h(App)
}).$mount('#app')
