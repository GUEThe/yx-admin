import Vue from 'vue'

import 'normalize.css'
import ElementUI from 'element-ui'
import SvgIcon from 'vue-svgicon'
import '@/styles/index.scss'

import App from '@/App.vue'
import store from '@/store'
import { AppModule } from '@/store/modules/app'
import router from '@/router'
import i18n from '@/lang' // Internationalization
import '@/icons/components'
import '@/permission'
import '@/utils/error-log' // Error log
import '@/registerServiceWorker'
import moment from 'moment'
import '@/filters/gobal.ts'

import { mockXHR } from '../mock'
mockXHR()

Vue.use(ElementUI, {
  size: AppModule.size, // set element-ui default size
  i18n: (key: string, value: string) => i18n.t(key, value)
})

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

Vue.filter('TimeFilter', (value: any) => {
  if (!value) {
    return ''
  }
  return moment(value - 8 * 3600 * 1000).format('YYYY-MM-DD HH:mm')
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
