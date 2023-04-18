import Vue from 'vue'
import { Spinner, Loadmore, InfiniteScroll, Swipe, SwipeItem } from 'mint-ui'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { getParams, setAutograph, getCurrentDeepLink } from '@/utils/index'
import countryCode from './assets/data/country'
import 'mint-ui/lib/style.css'

console.log('[vconsole ?] 0')
if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
  console.log('[vconsole ?] 1')
  const loadVC = () => import('./utils/dlog')
  loadVC().then(v => {
    console.log('load vclog success')
  }).catch(e => {
    alert('load vclg error:', e.message)
  })
}

Vue.use(InfiniteScroll)
Vue.use(Spinner)
Vue.use(Loadmore)
Vue.use(Swipe)
Vue.use(SwipeItem)

Vue.config.productionTip = false
Vue.prototype.$countryCode = countryCode

// 获取地址栏参数，设置登录信息
const queryParams = getParams()
setAutograph(queryParams)
// 定义全局变量
Vue.prototype.$deepLink = getCurrentDeepLink()
Vue.prototype.$countryCode = countryCode

router.afterEach((to, from) => {
  console.log(to, '4444')
  // 更新当前页面标题
  const title = to.meta.title
  if (title) {
    setTimeout(() => {
      const appIdList = {
        20000: 'LivU',
        19999: 'Tumile',
        77777: 'MixU',
        66666: 'Yaar'
      }
      let localTitle = i18n.t(title)
      const queryList = getParams()
      if (to.name === 'Staractivity') {
        localTitle = i18n.t(title, { appid: appIdList[queryList.appId] })
      }
      const txt = localTitle.replace(/<\/?.+?>/gi, '')
      document.title = txt
    }, 500)
  }
})

new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
