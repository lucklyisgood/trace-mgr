import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'
import AxiosMiddleSetup from './plugins/netmiddle'

import VueAxios from 'vue-axios'
import axios from 'axios'

import ECharts from 'vue-echarts'
import { use } from 'echarts/core'

import JsonViewer from 'vue3-json-viewer'
import 'vue3-json-viewer/dist/index.css'

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

import { mockXHR } from '@/mock/index'

if (process.env.NODE_ENV === 'mock') {
  mockXHR()
}

loadFonts()

use([
  CanvasRenderer,
  LineChart,
  BarChart,
  GridComponent,
  TooltipComponent
])

const store = createPinia()
const app = createApp(App)

if (process.env.NODE_ENV === 'production') {
  axios.defaults.withCredentials = false
  axios.defaults.baseURL = 'prod/'
} else {
  axios.defaults.withCredentials = false
  axios.defaults.baseURL = 'test/'
}

AxiosMiddleSetup()

// eslint-disable-next-line camelcase
app.component('VChart', ECharts)
app.config.globalProperties.$axios = axios

app.use(router)
  .use(store)
  .use(vuetify)
  .use(VueAxios, axios)
  .use(JsonViewer)
  .mount('#app')
