import { addUserRequestBuryRecordAll } from '@/api/index'
import Cookies from 'js-cookie'
import { formatTime } from './index'

const language = navigator.language
const cl = language.split('-')[0]

/**
 * self server 埋点
 * @param option
 */
export const triggerService = function (option = {}) {
  const platformType = Cookies.get('platformType') || ''
  const deviceId = Cookies.get('deviceId') || ''
  const userId = Cookies.get('userId') || ''
  const appId = Cookies.get('appId') || ''
  const countryId = Cookies.get('countryId') || ''

  const loginType = sessionStorage.getItem('loginType') || '0'
  const linkFrom = sessionStorage.getItem('linkFrom') || ''
  const pageName = sessionStorage.getItem('pageName') || '' // pageName来源

  const date = new Date()

  const params = {
    time: date.getTime(), // 时间戳
    createTime: formatTime(), // create_time
    xaid: loginType, // 登陆状态：0 未登陆，1 face ，2 phone，3 ID
    userId, // 用户编号（用户用账号或者ID登陆之后必须返回该字段信息）
    appId,
    platformType, // 平台：1 ios，2 android，3 other
    advertIdentifier: linkFrom, // 网页支付的渠道来源
    placeId: 105, // 板块ID
    attr1: 1, // 一级页面ID
    attr2: '', // 二级页面ID
    eventId: '', // 事件ID
    freeName2: '', // 备注
    cl: cl, // 系统语言
    capi: countryId, // 国家 ID
    countryId, // 国家 ID
    deviceId, // 用户设备唯一id
    model: navigator.userAgent, // 浏览器
    brand: pageName // 页面pageName
  }

  try {
    addUserRequestBuryRecordAll(Object.assign({}, params, option))
  } catch (e) {
    // console.log('self service trigger error')
  }
}

export default {
  triggerService
}
