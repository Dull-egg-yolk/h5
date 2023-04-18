import Cookies from 'js-cookie'
import countryIds from '@/assets/data/countryId'

/**
 * 获取 url 中的参数
 */
export const getParams = function (name, url) {
  const str = url || window.location.href
  let paramsMap = {}
  const index = str.lastIndexOf('?')
  if (index === -1) {
    // 没有参数
    return name ? '' : paramsMap
  }
  const paramStr = str.substring(index + 1, str.length)
  if (!paramStr) {
    // 参数为空
    return paramsMap
  }

  const pairs = paramStr.split('&')

  paramsMap = pairs.map(pair => {
    const [key, value] = pair.split('=')
    return [decodeURIComponent(key), decodeURIComponent(value)]
  }).reduce((res, [key, value]) => Object.assign(res, { [key]: value }), {})

  return name ? paramsMap[name] || '' : paramsMap
}

/**
 * 设置登录验证信息
 * @param {*} obj 鉴权字段
 */
export const setAutograph = function (obj) {
  obj.userId && Cookies.set('userId', obj.userId)
  obj.appId && Cookies.set('appId', obj.appId)
  obj.platformType && Cookies.set('platformType', obj.platformType) // 平台：1 ios，2 android，3 other
  obj.loginToken && Cookies.set('loginToken', obj.loginToken)
  obj.deviceId && Cookies.set('deviceId', obj.deviceId)
  obj.version && Cookies.set('version', obj.version)
  obj.language && Cookies.set('language', obj.language)
  obj.countryId && Cookies.set('countryId', obj.countryId)
  obj.gender && Cookies.set('gender', obj.gender) // 性别 男性、女性
  obj.userRoles && Cookies.set('userRoles', obj.userRoles) // 普通用户、视频主播、语音主播
}

/**
 * 判断当前用户所使用的 app
 * livu, livuIos, tuile, yaar
 */
export const currentPlat = function () {
  let key = 'livu'
  const u = navigator.userAgent
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  // appId 20000  livu, 19999 tumile, 66666 yaar
  const fromKey = {
    19999: 'tumile',
    20000: 'livu',
    66666: 'yaar',
    77777: 'mixu',
    88888: 'solla',
    55555: 'flinti'
  }
  const appId = Cookies.get('appId') || 20000
  const from = fromKey[appId]

  // 无平台来源返回
  if (!from) {
    return
  }
  if (from === 'livu' && isiOS) {
    key = 'livuIos'
  } else {
    key = from
  }
  return key
}

export const getCurrentDeepLink = function () {
  const deepLink = {
    livu: 'livu://com.videochat.livu/',
    livuIos: 'livu://videochatiOS90001/',
    tumile: 'tumile://com.rcplatform.livechat/',
    yaar: 'yaar://com.videochat.yaar/',
    mixu: 'kallapa://com.rc.live.livechat3/',
    solla: 'solla://com.rc.live.livechat2/',
    flinti: 'flinti://com.rc.live.livechat4/'
  }
  const app = currentPlat()
  return deepLink[app]
}

// 秒转化成 时分秒
export const secondToDate = function (result, arr = ['h', 'min', 's']) {
  if (+result === 0) return result + arr[2]
  const h = Math.floor(result / 3600)
  const m = Math.floor((result / 60 % 60))
  const s = Math.floor((result % 60))
  const times = [h, m, s]
  let resultStr = ''
  times.forEach((item, index) => {
    if (item) {
      resultStr = resultStr + item + arr[index]
    }
  })
  return resultStr
}

// todo 使用 dayjs 替换 日期格式化
export const formatTime = function (time, format = 'YYYY-MM-DD hh:mm:ss', isUTC) {
  const data = parseDate(time, isUTC)
  var obj = {
    'M+': data.getMonth() + 1,
    'D+': data.getDate(),
    'h+': data.getHours(),
    'm+': data.getMinutes(),
    's+': data.getSeconds(),
    'q+': Math.floor((data.getMonth() + 3) / 3),
    'S+': data.getMilliseconds()
  }
  if (/(Y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (data.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in obj) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1
        ? obj[k] : ('00' + obj[k]).substr(('' + obj[k]).length))
    }
  }
  return format
}

// 获取标准日期格式
export const parseDate = (date, utc) => {
  if (date === null) return new Date(NaN) // null is invalid
  if (date === undefined) return new Date() // today
  if (date instanceof Date) return new Date(date)
  if (typeof date === 'string' && !/Z$/i.test(date)) {
    const REGEX_PARSE = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/
    const d = date.match(REGEX_PARSE)
    if (d) {
      const m = d[2] - 1 || 0
      const ms = (d[7] || '0').substring(0, 3)
      if (utc) {
        return new Date(Date.UTC(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms))
      }
      return new Date(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms)
    }
  }

  return new Date(date) // everything else
}

// 秒转化成 时分秒 2.0
export const secondFormat = function (second, noHour) {
  const h = Math.floor(second / 3600)
  const m = Math.floor((second / 60 % 60))
  const s = Math.floor((second % 60))
  const times = []

  if (!(noHour && h === 0)) {
    times.push(h < 10 ? `0${h}` : h)
  }

  times.push(m < 10 ? `0${m}` : m)
  times.push(s < 10 ? `0${s}` : s)

  return times.join(':')
}

/**
 * 对象转化参数
 * @param {object} obj
 * @param {boolean} encode
 * @returns
 */
export const jsonToQuery = function (obj, encode) {
  const rs = []
  if (isObject(obj)) {
    for (const [key, val] of Object.entries(obj)) {
      if (!isEmpty(val)) {
        rs.push(key + '=' + (encode ? encodeURIComponent(val) : val))
      }
    }
  }
  return rs.join('&')
}

export const isObject = (obj) => {
  return obj !== null && typeof obj === 'object'
}

export const isEmpty = (val) => {
  return val === undefined || val === null || val === ''
}

// 跳转支付页
export const jumpPayment = function (isGoWeb) {
  const pathname = window.location.pathname
  const host = window.location.host
  const queryParams = getParams()
  if (queryParams.platformType === '4') {
    parent.postMessage({ type: 'shop' }, '*')
    return
  }
  const isApp = queryParams.platformType === '1' || queryParams.platformType === '2'
  const isTest = pathname.indexOf('_test') !== -1 || host.indexOf('localhost') !== -1
  const queryAppId = queryParams.appId
  const goWeb = arguments.length === 1 && isGoWeb
  if (!goWeb && isApp && queryAppId && (['66666', '20000', '19999', '77777'].indexOf(queryAppId) !== -1)) {
    const deepLink = getCurrentDeepLink()
    window.location.href = `${deepLink}store`
    return
  }

  const payLink = {
    20000: 'https://www.livuchat.com/payment',
    19999: 'https://www.tumile.me/payment',
    77777: 'https://p.mixu.me/payment'
  }
  const payLinkTest = {
    20000: 'https://pay-test.livuchat.com/payment',
    19999: 'https://pay-test.tumile.me/payment',
    77777: 'https://p-test.mixu.me/payment'
  }
  const appId = Cookies.get('appId') || 20000
  const countryId = Cookies.get('countryId') || ''
  let code = ''
  if (countryId) {
    code = countryIds[countryId]
  }
  let url = isTest ? payLinkTest[appId] : payLink[appId]
  if (code) {
    url = url + 'B' + code.toUpperCase()
  }
  let href = getBaseUrl(url, { countryCode: code.toUpperCase() })
  if (isObject(isGoWeb)) {
    href = getBaseUrl(url, { ...isGoWeb })
  }
  window.location.href = href
}

/**
 * 跳到其他页面时时的完整地址
 * @param {string} host 跳转的域名
 * @param {object} config 携带的参数
 */
export const getBaseUrl = function (host, config = {}) {
  const baseParams = {
    userId: Cookies.get('userId'),
    deviceId: Cookies.get('deviceId'),
    appId: Cookies.get('appId'),
    loginToken: Cookies.get('loginToken'),
    nonce: Cookies.get('nonce'),
    countryId: Cookies.get('countryId') || '',
    jumpTime: Date.now(),
    isWebView: 1
  }
  const newParams = Object.assign({}, baseParams, config)
  const query = jsonToQuery(newParams, true)
  return host + '?' + query
}

export const getWorldCupParams = () => {
  const queryParams = getParams()
  const { bizData, sign, userId, loginToken, nonce, platformType, timestamp, ...other } = queryParams
  let queryBizData = {}
  if (bizData) {
    queryBizData = JSON.parse(bizData)
  }
  const ret = {
    userId,
    sign,
    loginToken,
    nonce,
    platformType,
    timestamp,
    bizData: queryBizData,
    activityId: queryBizData.activityId || queryBizData.activity_id,
    ...other
  }
  return ret
}

export const worldCupJumpParams = (params) => {
  const { bizData, ...other } = params
  return {
    bizData: JSON.stringify(bizData),
    ...other
  }
}

export const worldCupIsFlipContry = (localeEn) => {
  return ['ar', 'he', 'ur'].indexOf(localeEn) !== -1
}

// 时间间隔转为天时分秒
export const formatTimeGup = (time) => {
  if (!time) {
    return '0s'
  }
  if (typeof time === 'string') {
    // 判断传入的是不是string类型，如果是的话，先转换成时间number类型
    time = Number(time)
  }
  const oneDay = 1000 * 60 * 60 * 24
  const oneHour = 1000 * 60 * 60
  const oneMinute = 1000 * 60
  const oneSecond = 1000
  let days = 0
  let hours = 0
  let minutes = 0
  let seconds = 0
  let mseconds = 0

  if (time) {
    if (time >= oneDay) {
      days = Math.floor(time / oneDay)
      hours = Math.floor((time % oneDay) / oneHour)
      minutes = Math.floor((time % oneHour) / oneMinute)
    } else if (oneHour <= time && time < oneDay) {
      hours = Math.floor(time / oneHour)
      minutes = Math.floor((time % oneHour) / oneMinute)
      seconds = Math.floor(((time % oneHour) % oneMinute) / oneSecond)
      mseconds = time - (hours * oneHour + minutes * oneMinute + seconds * oneSecond)
    } else if (time >= oneMinute && time < oneHour) {
      minutes = Math.floor(time / oneMinute)
      seconds = Math.floor((time - minutes * oneMinute) / oneSecond)
      mseconds = Math.floor(time - minutes * oneMinute - seconds * oneSecond)
    } else if (time >= oneSecond && time < oneMinute) {
      seconds = Math.floor(time / oneSecond)
      mseconds = Math.floor(time % oneSecond)
    } else {
      mseconds = time
    }
    return {
      days,
      hours: hours < 10 ? '0' + hours : hours,
      minutes: minutes < 10 ? '0' + minutes : minutes,
      seconds: seconds < 10 ? '0' + seconds : seconds,
      mseconds: mseconds < 10 ? '0' + mseconds : mseconds
    }
  }
  return time
}

// 数字格式化  三位加,
export const formatNumberDot = (number) => {
  const str = number + ''
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
