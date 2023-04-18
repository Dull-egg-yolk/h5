import { request } from './base'

const apiUrl = 'https://test1-api.playrc.net'
// const apiurl = 'https://api.livuchat.com'

const urls = {
  addUserRequestBuryRecordAll: 'https://api.livuchat.com/api/h5/1/addUserRequestBuryRecordAll' // 埋点统计
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

// 获取活动时间
export const getChristmasTime = async function () {
  try {
    const data = await request.get('https://portal.rcplatformhk.com/phoenix-host-activitys/api/activity/christmas/getEntry')
    console.log(data)
    return data
  } catch (e) {
    console.log(e)
  }
}

// 获取storyhost tab
export const getStoryHostTab = async function (params = {}) {
  params.noLoading = true

  try {
    return await request.get(apiUrl + '/api/h5/{version}/label/getLabelList', params)
  } catch (e) {}
}

// 获取storyhost tab host list
export const getStoryHostList = async function (params = {}) {
  params.noLoading = true
  try {
    return await request.get(apiUrl + '/api/h5/{version}/label/getLabelHostList', params)
  } catch (e) {
    return Promise.reject(e)
  }
}

// 查询好友关系
export const checkHostrelation = async function (params = {}) {
  params.noLoading = true
  try {
    return await request.get(apiUrl + '/api/h5/{version}/users/friends/relations', params)
  } catch (e) {}
}

// 查询email
export const getEmail = async function (params = {}) {
  params.noLoading = true
  try {
    return await request.get('api/h5/1/users/email/exist', params)
  } catch (e) {}
}
