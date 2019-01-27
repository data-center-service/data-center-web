import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { Table, TableColumn, Button, Dialog } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueAmap from 'vue-amap'
import VCharts from 'v-charts'

Vue.config.productionTip = false

Vue.use(VueAmap)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(VCharts)

VueAmap.initAMapApiLoader({
  key: '25dbc8ec3568f971eccb7ed893480aca',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  v: '1.4.4'
})

Vue.prototype.axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
