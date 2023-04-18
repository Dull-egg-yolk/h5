import { request } from './base'

const domain = process.env.VUE_APP_WORLD_CUP
const apiUrl = `${domain}/gamecenter` // 测试

const urls = {
  addUserRequestBuryRecordAll: 'https://api.livuchat.com/api/h5/1/addUserRequestBuryRecordAll', // 埋点统计
  getCarList: `${apiUrl}/api/racing/car/carHistory`,
  getCarDetail: `${apiUrl}/api/racing/car/carSpeed`,
  getCarRanking: `${apiUrl}/api/racing/rank/ranking`,
  getCarHistory: `${apiUrl}/api/racing/history/allList`,
  getCarMyHistory: `${apiUrl}/api/racing/history/meList`,
  getCarHistoryDetail: `${apiUrl}/api/racing/history/detail`,
  getRaceConf: `${apiUrl}/api/racing/rank/activityConf`,
  getRaceCycle: `${apiUrl}/api/racing/rank/cycle`,
  getRaceRank: `${apiUrl}/api/racing/rank/ranking`,
  getRaceHistoryList: `${apiUrl}/api/racing/rank/rankHistoryCycle`,
  getRaceHistoryDetail: `${apiUrl}/api/racing/rank/rankHistory`,
  getCarIDList: `${apiUrl}/api/racing/car/getCarIds`

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

// 赛车列表ID
export const apiGetCarIdList = async function (params = {}) {
  params.noLoading = true
  try {
    const data = await request.get(urls.getCarIDList, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

// 赛车列表
export const apiGetCarList = async function (params = {}) {
  params.noLoading = true
  try {
    const data = await request.get(urls.getCarList, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

// 赛车数据
export const apiGetCarDetail = async function (params = {}) {
  params.noLoading = true

  try {
    const data = await request.get(urls.getCarDetail, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

// 赛车ranking
export const apiGetCarRanking = async function (params = {}) {
  params.noLoading = true

  try {
    const data = await request.get(urls.getCarRanking, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

// 赛车历史
export const apiGetCarHistory = async function (params = {}) {
  params.noLoading = true

  try {
    const data = await request.get(urls.getCarHistory, params)
    return data
  } catch (e) {
    console.log(e)
  }
}
// 赛车历史
export const apiGetCarMyHistory = async function (params = {}) {
  params.noLoading = true

  try {
    const data = await request.get(urls.getCarMyHistory, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

// 赛车历史
export const apiGetCarHistoryDetail = async function (params = {}) {
  params.noLoading = true

  try {
    const data = await request.get(urls.getCarHistoryDetail, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

export const apiGetRaceConf = async function (params = {}) {
  params.noLoading = true

  try {
    const data = await request.get(urls.getRaceConf, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

export const apiGetRaceCycle = async function (params = {}) {
  params.noLoading = true

  try {
    const data = await request.get(urls.getRaceCycle, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

export const apiGetRaceRank = async function (params = {}) {
  params.noLoading = true

  try {
    const data = await request.get(urls.getRaceRank, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

export const apiGetRaceHistoryList = async function (params = {}) {
  params.noLoading = true

  try {
    const data = await request.get(urls.getRaceHistoryList, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

export const apiGetRaceHistoryDetail = async function (params = {}) {
  params.noLoading = true

  try {
    const data = await request.get(urls.getRaceHistoryDetail, params)
    return data
  } catch (e) {
    console.log(e)
  }
}
