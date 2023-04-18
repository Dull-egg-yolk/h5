import { request } from './base'

const domain = process.env.VUE_APP_WORLD_CUP
const apiUrl = `${domain}/activities` // 测试

const urls = {
  addUserRequestBuryRecordAll: 'https://api.livuchat.com/api/h5/1/addUserRequestBuryRecordAll', // 埋点统计
  getStarConf: `${apiUrl}/api/user/rank/activityConf`,
  getStarCycle: `${apiUrl}/api/user/rank/cycle`,
  getStarRank: `${apiUrl}/api/user/rank/ranking`,
  getStarHistoryList: `${apiUrl}/api/user/rank/rankHistoryCycle`,
  getStarTop: `${apiUrl}/api/user/rank/getTopThree`,
  getStarHistoryTop: `${apiUrl}/api/user/rank/rankHistoryTop`,
  getStarHistoryDetail: `${apiUrl}/api/user/rank/rankHistory`

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
