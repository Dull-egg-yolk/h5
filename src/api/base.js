import axios from 'axios'
import Cookies from 'js-cookie'
import MD5 from 'crypto-js/md5'
import Spin from '@/components/spin/index'
import Toast from '@/components/toast/index'
import { getParams } from '@/utils/index'

const SUCCESS_CODES = [200, 10000] // 接口请求成功返回正常数据
const RES_WRITE_URL = [
  '/activities/api/lottery/open/free',
  '/activities/api/lottery/open/payed',
  '/activities/api/lottery/open/presentted/giftbox',
  'activities/api/lottery/canopen/giftbox',
  '/activities/api/lottery/open/presentted',
  '/activities/api/roll/praise/receiveAward',
  '/h5/1/addUserRequestBuryRecordAll',
  '/activities/api/recharge/task/openLotteryForRecharge',
  'activities/api/user/checkIn',

  '/wchat/facade/api/lottery/open/free',
  '/wchat/facade/api/lottery/open/payed',
  '/wchat/facade/api/lottery/open/presentted/giftbox',
  '/wchat/facade/api/lottery/canopen/giftbox',
  '/wchat/facade/api/lottery/open/presentted',
  '/wchat/facade/api/roll/praise/receiveAward',
  '/wchat/facade/api/recharge/task/openLotteryForRecharge'
]

// 请求计数器
let httpCount = 0

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 50000,
  transformResponse: [
    function (data) {
      if (data !== undefined && data !== '' && data) {
        data = JSON.parse(data)
      }
      return data
    }],
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Athena-Response-Encryption': 'disabled',
    'Athena-Request-Decryption': 'disabled'
  }
})

// 添加一个请求拦截器
service.interceptors.request.use(function (config) {
  httpCount++
  if ((!config.params) || (config.params && !config.params.noLoading)) {
    if (httpCount >= 1) {
      Spin.show()
    }
  }
  // 验签
  if (config.params && config.params.isPublic) {
    return config
  } else {
    return apiAutograph(config)
  }
}, function (err) {
  httpCount--
  if (httpCount <= 0) {
    httpCount = 0
    Spin.hide()
  }
  return Promise.reject(err)
})

// 添加一个响应拦截器
service.interceptors.response.use(res => {
  const responseData = res.data

  httpCount--
  if (httpCount <= 0) {
    httpCount = 0
    Spin.hide()
  }

  // 埋点接口请求，没有返回数据，直接返回即可
  if (!responseData) {
    return true
  }
  // 如果会话过期（其它地方又被登陆）
  if (res.status === 401) {
    alert('Login has expired')
    sessionStorage.clear()
    localStorage.clear()
    window.location.reload()
  }
  // todo 是否对 data.status 的状态进行捕获， 默认捕获，如果不进行捕获则在请求接口的 headers 设置释放 status， 参数为 release-status: true
  // const releaseStatus = res.config.headers && res.config.headers['release-status']

  // RES_WRITE_URL白名单 直接返回数据
  const url = res.config.url
  for (let i = 0; i < RES_WRITE_URL.length; i++) {
    if (new RegExp(`${RES_WRITE_URL[i]}$`).test(url)) {
      return responseData
    }
  }

  // 返回非成功的结果
  if (responseData.code && !SUCCESS_CODES.includes(responseData.code)) {
    Toast(responseData.code + ': ' + (responseData.error || responseData.message))
  }

  // 返回带 code 码且数据正常
  if (responseData && SUCCESS_CODES.includes(responseData.code)) {
    return responseData.data || responseData
  }

  // 返回没带 code 的数据，直接返回 response
  if (responseData && !responseData.code) {
    return responseData
  }
}, (err) => {
  // Toast(err.message)
  if (!new RegExp('/h5/1/addUserRequestBuryRecordAll').test(err.config.url)) { Toast(err.message) }
  httpCount--
  if (httpCount <= 0) {
    httpCount = 0
    Spin.hide()
  }

  return Promise.reject(err)
})

export const request = {}
request.get = (url, params, config = {}) => service.get(url, { ...config, params })
request.post = (url, data, config = {}) => service.post(url, data, config)
request.put = (url, data, config = {}) => service.put(url, data, config)

/**
 * api 服务请求接口签名方法，主要是 joinUrl 中要用户的字段
 * @param {Object} config axios 实例的配置项
 * @returns Object
 */
const apiAutograph = function (config) {
  const timestamp = new Date().getTime()
  if (!config.params) config.params = {}
  const queryParams = getParams()
  const non = Cookies.get('nonce')
  let { deviceId, nonce = non, userId } = config.params
  !deviceId && (deviceId = Cookies.get('deviceId'))
  !userId && (userId = Cookies.get('userId'))
  const platformType = Cookies.get('platformType') || queryParams.platformType
  if (!nonce) {
    nonce = randomWord(false, 8)
    Cookies.set('nonce', nonce)
  }

  const loginToken = config.params.loginToken || Cookies.get('loginToken')
  const url = config.url
  const separate = url[0] === '/' ? '' : '/'
  let host = config.baseURL + separate + url

  if (url.indexOf('http') === 0) {
    host = url
  }

  const joinUrl = host + loginToken + deviceId + nonce + timestamp + userId

  console.log(config, joinUrl, '---joinUrl---')
  const sign = MD5(joinUrl).toString().toUpperCase()
  config.params.sign = sign
  config.params.timestamp = timestamp
  config.params.deviceId = deviceId
  config.params.nonce = nonce
  config.params.userId = userId
  config.params.platformType = platformType || 3

  return config
}

// 生成随机字符串方法
const randomWord = function (flag, min, max) {
  let str = ''
  let range = min
  const rangeBase = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let pos

  if (flag) {
    range = Math.round(Math.random() * (max - min)) + min
  }
  for (var i = 0; i < range; i++) {
    pos = Math.round(Math.random() * (rangeBase.length - 1))
    str += rangeBase[pos]
  }
  return str
}
