import { request } from './base'

const domain = process.env.VUE_APP_WORLD_CUP
const apiUrl = `${domain}/activities/api`

const urls = {
  getSignInList: `${apiUrl}/user/checkIn`, // 签到详情
  saveSignIn: `${apiUrl}/user/checkIn` // 确定签到
}

// 签到详情
export const apiGetSignInList = async function (params = {}) {
  try {
    const data = await request.get(urls.getSignInList, params)
    return data
  } catch (e) {
    console.log(e)
  }
}

// 确定签到
export const apiSaveSignIn = async function (data = {}) {
  try {
    const res = await request.post(urls.saveSignIn, data, { params: data })
    return res
  } catch (e) {
    console.log(e)
  }
}
