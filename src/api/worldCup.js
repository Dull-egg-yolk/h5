import { request } from './base'
import { getParams } from '../utils/index'
const urlParams = getParams()
let domain = process.env.VUE_APP_WORLD_CUP
let apiUrl = `${domain}/activities/api` // 测试
if (urlParams.platformType === '4') {
  domain = process.env.VUE_APP_WORLD_CUP_WEB
  apiUrl = `${domain}/wchat/facade/api` // 测试
}

const urls = {
  addUserRequestBuryRecordAll: 'https://api.livuchat.com/api/h5/1/addUserRequestBuryRecordAll', // 埋点统计
  getOnlineStatus: '/api/h5/1/getGoddessStatus', // 在线状态
  lifecycle: `${apiUrl}/dict/exempt/activity/lifecycle`, // 获取活动lifecycle
  dictAll: `${apiUrl}/activity/biz/dict/all`, // 获取活动配置信息
  collectTimestamp: `${apiUrl}/lottery/next/collect/timestamp`, // 获取活动免费宝箱下次开奖时间
  stageEndTimestamp: `${apiUrl}/activity/opening/stage/end/timestamp`, // 获取开奖倒计时
  getActRule: `${apiUrl}/activity/rule`, // 获取规则
  getActMain: `${apiUrl}/activity/main`, // 获取活动信息
  getFreeLotteryId: `${apiUrl}/lottery/free/lottery/id`, // 获取免费宝箱Id
  getFreeLotteryTimestamp: `${apiUrl}/activity/collecting/stage/end/timestamp`, // 获取收集阶段免费宝箱倒计时
  getActStage: `${apiUrl}/activity/lifecycle/stage/curr`, // 获取活动阶段
  getCollectActId: `${apiUrl}/activity/effective/collecting/activityid`,
  getRechargeActId: `${apiUrl}/activity/effective/recharging/activityid`,
  getActPayedList: `${apiUrl}/lottery/payed/list`, // 获取（下半部分）付费宝箱情况
  openFree: `${apiUrl}/lottery/open/free`, // 免费抽奖
  openPayed: `${apiUrl}/lottery/open/payed`, // 抽付费奖品
  openPresentted: `${apiUrl}/lottery/open/presentted`, // 抽付费奖品
  getHistory: `${apiUrl}/lottery/record/history`, // 获取获取抽奖历史
  getBarrage: `${apiUrl}/lottery/record/prob/detail/list/for/barrage`,
  getBarrageByLottery: `${apiUrl}/lottery/record/prob/detail/list/for/barrage/lotteryrecord`,
  getRanking: `${apiUrl}/rank/ranking`, // 获取排行榜
  getAwardCoin: `${apiUrl}/bonus/carveup/item`, // 领奖阶段获取金币
  receiveAward: `${apiUrl}/bonus/carveup/item/receive`, // 领取奖励
  getWinnersList: `${apiUrl}/bonus/carveup/items/page`, // 获取中奖记录名单
  getActTimes: `${apiUrl}/activity/stage/section/timestamp`, // 获取活动时间段
  getUserRechargeTaskList: `${apiUrl}/recharge/task/getUserRechargeTaskList`, // 获取足球奖励页记录
  getUserRechargeBonus: `${apiUrl}/recharge/task/getUserRechargeBonus`, // 足球奖励页获取金币
  getFootballfansUsers: `${apiUrl}/footBallFans/getUsers`, // 获取足球宝贝墙
  openLotteryForRecharge: `${apiUrl}/recharge/task/openLotteryForRecharge`,
  getUserBaseInfo: `${apiUrl}/recharge/task/getUserBaseInfo`, // 获取足球奖励页记录
  getBackpackExpireList: `${apiUrl}/backpack/backpackExpireList`,
  getBackpackList: `${apiUrl}/backpack/backpackList`,
  canOpenGiftBox: `${apiUrl}/lottery/canopen/giftbox`,
  openPresenttedGiftBox: `${apiUrl}/lottery/open/presentted/giftbox`,
  getListForBarrageSpecial: `${apiUrl}/lottery/record/prob/detail/list/for/barrage/special`
}

// 埋占统计
export const addUserRequestBuryRecordAll = async function (a) {
  try {
    const data = await request.post(urls.addUserRequestBuryRecordAll, a, { params: { noLoading: 1, isPublic: true } })
    return data
  } catch (e) {
    console.log('埋占统计报错：', e)
  }
}

// 获取活动lifecycle
export const getActLifeCycle = async function (params = {}) {
  try {
    const data = await request.get(urls.lifecycle, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

// 获取弹幕
export const getBarrage = async function (params = {}) {
  try {
    const data = await request.get(urls.getBarrage, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

export const getBarrageByLottery = async function (params = {}) {
  try {
    const data = await request.get(urls.getBarrageByLottery, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

export const getActDict = async function (params = {}) {
  try {
    const data = await request.get(urls.dictAll, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

// 获取活动免费宝箱下次开奖时间
export const getTimestamp = async function (params = {}) {
  try {
    const data = await request.get(urls.collectTimestamp, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

// 获取开奖倒计时
export const getOpeningTimestamp = async function (params = {}) {
  try {
    const data = await request.get(urls.stageEndTimestamp, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

// 获取活动规则
export const getActRule = async function (params = {}) {
  try {
    const data = await request.get(urls.getActRule, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

// 获取活动信息
export const getActMain = async function (params = {}) {
  try {
    const data = await request.get(urls.getActMain, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

// 获取免费宝箱Id
export const getFreeLotteryId = async function (params = {}) {
  try {
    const data = await request.get(urls.getFreeLotteryId, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

// 获取收集阶段免费宝箱倒计时
export const getFreeLotteryTimestamp = async function (params = {}) {
  try {
    const data = await request.get(urls.getFreeLotteryTimestamp, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

// 获取活动阶段
export const getActStage = async function (params = {}) {
  try {
    const data = await request.get(urls.getActStage, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

// 获取活动时间段
export const getActTimes = async function (params = {}) {
  try {
    const data = await request.get(urls.getActTimes, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

// 获取（下半部分）付费宝箱情况
export const getActPayedList = async function (params = {}) {
  try {
    const data = await request.get(urls.getActPayedList, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

// 免费抽奖
export const openFree = async function (data = {}) {
  const res = await request.post(urls.openFree, data, { params: data })
  return res
}

// 抽付费奖品
export const openPayed = async function (data = {}) {
  try {
    const res = await request.post(urls.openPayed, data, { params: data })
    return res
  } catch (e) {
    console.log(e)
  }
}

// 抽赠送
export const openPresentted = async function (data = {}) {
  try {
    const res = await request.post(urls.openPresentted, data, { params: data })
    return res
  } catch (e) {
    console.log(e)
  }
}

// 获取获取抽奖历史
export const getHistory = async function (params = {}) {
  try {
    const data = await request.get(urls.getHistory, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

// 获取排行榜
export const getRanking = async function (params = {}) {
  try {
    const data = await request.get(urls.getRanking, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

// 领奖阶段获取金币
export const getAwardCoin = async function (params = {}) {
  try {
    const data = await request.get(urls.getAwardCoin, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

// 领取奖励
export const receiveAward = async function (data = {}) {
  try {
    const res = await request.put(urls.receiveAward, data, { params: data })
    return res
  } catch (e) {
    console.log(e)
  }
}

// 获取中奖记录名单
export const getWinnersList = async function (params = {}) {
  try {
    const data = await request.get(urls.getWinnersList, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

// 获取足球奖励页记录
export const getUserRechargeTaskList = async function (params = {}) {
  try {
    const data = await request.get(urls.getUserRechargeTaskList, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

// 获取主活动id
export const getCollectActId = async function (params = {}) {
  try {
    const data = await request.get(urls.getCollectActId, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

// 获取主活动id
export const getRechargeActId = async function (params = {}) {
  try {
    const data = await request.get(urls.getRechargeActId, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

// 足球奖励页获取金币
export const getUserRechargeBonus = async function (params = {}) {
  try {
    const data = await request.get(`${urls.getUserRechargeBonus}`, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

// 获取足球宝贝墙列表
export const getFootballFansUsers = async function (params = {}) {
  try {
    const data = await request.get(urls.getFootballfansUsers, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

// 女神在线状态
export const getOnlineStatus = async function (params = {}) {
  try {
    const data = await request.post(urls.getOnlineStatus, params, { params: { noLoading: true } })
    return data
  } catch (e) {
    console.log(e)
  }
}

// 获取获取抽奖历史
export const getUserBaseInfo = async function (params = {}) {
  try {
    const data = await request.get(urls.getUserBaseInfo, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

//
export const openLotteryForRecharge = async function (data = {}) {
  try {
    const res = await request.post(urls.openLotteryForRecharge, data, { params: data })
    return res
  } catch (e) {
    console.log(e)
  }
}

export const getBackpackExpireList = async function (params = {}) {
  try {
    const data = await request.get(urls.getBackpackExpireList, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

export const getBackpackList = async function (params = {}) {
  try {
    const data = await request.get(urls.getBackpackList, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

export const canOpenGiftBox = async function (params = {}) {
  try {
    const data = await request.get(urls.canOpenGiftBox, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

//
export const openPresenttedGiftBox = async function (data = {}) {
  try {
    const res = await request.post(urls.openPresenttedGiftBox, data, { params: data })
    return res
  } catch (e) {
    console.log(e)
  }
}

export const getListForBarrageSpecial = async function (params = {}) {
  try {
    const data = await request.get(urls.getListForBarrageSpecial, params)
    return data
  } catch (e) {
    console.log(e)
  }
}
