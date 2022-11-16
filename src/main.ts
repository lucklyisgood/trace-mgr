import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

import VueAxios from 'vue-axios'
import axios from 'axios'

import ECharts from 'vue-echarts'
import { use } from 'echarts/core'

import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  BarChart,
  LineChart
} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent
} from 'echarts/components'

loadFonts()

use([
  CanvasRenderer,
  LineChart,
  BarChart,
  GridComponent,
  TooltipComponent
])

const app = createApp(App)

axios.defaults.baseURL = '/api'
// eslint-disable-next-line camelcase
app.component('VChart', ECharts)
app.config.globalProperties.$axios = axios

app.use(router)
  .use(store)
  .use(vuetify)
  .use(VueAxios, axios)
  .mount('#app')
