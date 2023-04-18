import { request } from './base'

// const domain = process.env.VUE_APP_WORLD_CUP
// const apiUrl = `${domain}/activities` // 测试

import { getParams } from '../utils/index'
const urlParams = getParams()
let domain = process.env.VUE_APP_WORLD_CUP
let apiUrl = `${domain}/activities` // 测
let ramUrl = `${domain}/host-activitys`
if (urlParams.platformType === '4') {
  domain = process.env.VUE_APP_WORLD_CUP_WEB
  apiUrl = `${domain}/wchat/facade` // 测试
  ramUrl = `${domain}/host-activitys`
}

const urls = {
  addUserRequestBuryRecordAll: 'https://api.livuchat.com/api/h5/1/addUserRequestBuryRecordAll', // 埋点统计
  getStarConf: `${apiUrl}/api/user/box/rank/activityConf`,
  getStarCycle: `${apiUrl}/api/user/box/rank/cycle`,
  getStarRank: `${apiUrl}/api/user/box/rank/ranking`,
  getStarHistoryList: `${apiUrl}/api/user/box/rank/rankHistoryCycle`,
  getStarTop: `${apiUrl}/api/user/box/rank/getTopThree`,
  getStarHistoryTop: `${apiUrl}/api/user/box/rank/rankHistoryTop`,
  getStarHistoryDetail: `${apiUrl}/api/user/box/rank/rankHistory`,
  getRamadanList: `${ramUrl}/inner/ramadan/getTask`,
  getRamadanTime: `${ramUrl}/inner/ramadan/cycle`,
  getRamadanCion: `${ramUrl}/inner/ramadan/receiveAward`,
  getHostRecruit: `${ramUrl}/inner/recruit/host`
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

export const apiGetStarConf = async function (params = {}) {
  params.noLoading = true

  try {
    const data = await request.get(urls.getStarConf, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

export const apiGetStarCycle = async function (params = {}) {
  params.noLoading = true

  try {
    const data = await request.get(urls.getStarCycle, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

export const apiGetStarRank = async function (params = {}) {
  params.noLoading = true

  try {
    const data = await request.get(urls.getStarRank, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

export const apiGetStarHistoryList = async function (params = {}) {
  params.noLoading = true

  try {
    const data = await request.get(urls.getStarHistoryList, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

export const apiGetStarHistoryDetail = async function (params = {}) {
  params.noLoading = true

  try {
    const data = await request.get(urls.getStarHistoryDetail, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

export const apiGetStarTop = async function (params = {}) {
  params.noLoading = true

  try {
    const data = await request.get(urls.getStarTop, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

export const apiGetStarHistoryTop = async function (params = {}) {
  params.noLoading = true

  try {
    const data = await request.get(urls.getStarHistoryTop, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

export const apiGetRamadanList = async function (params = {}) {
  params.noLoading = true

  try {
    const data = await request.get(urls.getRamadanList, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

export const apiGetRamadanTime = async function (params = {}) {
  params.noLoading = true

  try {
    const data = await request.get(urls.getRamadanTime, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

export const apiGetRamadanCion = async function (params) {
  params.noLoading = true
  try {
    const data = await request.post(urls.getRamadanCion, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

export const apiGetHostRecruit = async function (params) {
  params.noLoading = true
  try {
    const data = await request.post(urls.getHostRecruit, params)
    return data
  } catch (e) {
    console.log(e)
  }
}
