<template>
  <div class="check-in">
        <div class="check-in__con">
            <div class="check-in__top">
                <div class="check-in-title">{{$t('checkin.title')}}</div>
                <div class="check-in-desc">
                  <p v-html="$t('checkin.desc', { num: 50 })"></p>
                </div>
            </div>
            <div class="check-in__main">
                <div class="check-list">
                    <div
                        class="check-item"
                        v-for="item in signInList"
                        :key="item.day"
                        :class="{ checked: item.signIn, missed: item.missed }"
                    >
                        <span class="check-check-icon" v-if="item.signIn"></span>
                        <div class="check-day">{{$t('checkin.day', {num: item.day + 1})}}</div>
                        <div class="check-coin">
                            <img v-if="item.missed" src="@/assets/img/checkIn/icon-sad.png" alt />
                            <img v-else src="@/assets/img/checkIn/icon-s-coin.png" alt />
                        </div>
                        <div class="check-up-to" v-html="$t('checkin.xcoins', {num: item.coin})"></div>
                    </div>
                </div>
                <div class="check-success-box" v-if="hasChecked">
                  <div class="check-success-icon"><img src="@/assets/img/checkIn/icon-smile.png" alt=""></div>
                  <div class="check-success-txt"  v-html="$t('checkin.checkInSuccess', {num: todayCoin})"></div>
                </div>
                <div class="check-list-desc" v-if="signInList.length" v-html="$t('checkin.tips', {num: sumCoin})"></div>
            </div>
            <div class="check-btn-box" v-if="signInList.length">
                <div class="check-btn" @click="saveCheckIn">{{$t('checkin.checkIn')}}</div>
            </div>
        </div>
  </div>
</template>

<script>
import { apiGetSignInList, apiSaveSignIn } from '@/api/checkIn'
import { triggerService } from '@/utils/statisticalTool'
import Toast from '@/components/toast/index'

export default {
  name: 'Story',
  components: { },
  data () {
    return {
      signInList: [],
      isChecking: false,
      hasChecked: false, // 这次点击签到的状态
      sumCoin: 0,
      todayCoin: '',
      today: '',
      checkStatus: false, // 当天的签到状态
      innerHeight: 0
    }
  },
  computed: {
    checkInFull () {
      return this.innerHeight > 637 ? this.innerHeight : 637
    }
  },
  methods: {
    /**
     * 签到
     */
    saveCheckIn () {
      if (this.isChecking) return
      this.isChecking = true
      const obj = {
        day: this.today,
        status: this.checkStatus,
        todayCoin: this.todayCoin,
        r_resource: 'h5'
      }
      triggerService({
        eventId: '14-2-1-18', // 新用户签到弹窗check in点击
        freeName2: JSON.stringify(obj)
      })
      const { hour, min } = this.getDifferenceTime()
      // 过期了
      if (this.today > 6 || (this.today === 6 && this.checkStatus)) {
        Toast(this.$t('checkin.checkInEnd'))
        setTimeout(() => {
          this.isChecking = false
        }, 3000)
        return
      }
      // 已经签到了
      if (this.checkStatus) {
        Toast(this.$t('checkin.checkInRepeat', { hour, min }))
        setTimeout(() => {
          this.isChecking = false
        }, 3000)
        return
      }
      apiSaveSignIn().then(res => {
        console.log(res, '---签到结果----')
        this.isChecking = false
        if (res.code === 200) {
          this.hasChecked = true
          setTimeout(() => {
            this.hasChecked = false
          }, 3000)
          this.checkStatus = true
          this.getSignInList()
        } else if (res.code === 400) {
          this.checkStatus = true
          Toast(this.$t('checkin.checkInRepeat', { hour, min }))
        } else if (res.code === 402) {
          Toast(this.$t('checkin.checkInRepeatAccount'))
        } else {
          Toast(this.$t('checkin.checkInFail'))
        }
      })
    },
    getSignInList () {
      apiGetSignInList().then((res) => {
        const data = res.data
        console.log(data, '-----签到列表--------')
        if (data) {
          const list = data.signInList || []
          const today = data.today
          this.today = data.today
          let sum = 0
          list.forEach(item => {
            if (item.day < today) {
              item.missed = !item.signIn
            } else if (item.day > today) {
              sum += item.coin
            } else {
              if (!item.signIn) {
                sum += item.coin
              }
            }
          })
          this.signInList = list
          this.sumCoin = sum
          this.todayCoin = this.signInList[today] ? this.signInList[today].coin : ''
          this.checkStatus = this.signInList[today] ? this.signInList[today].signIn : false
        }
      })
    },
    getDifferenceTime () {
      const nowTime = Date.now()// 获取当前时间对应的毫秒数
      const endTime = new Date().setUTCHours(23, 59, 59)// 获取八点对应的毫秒数
      const differenceTime = endTime - nowTime
      if (differenceTime <= 0) {
        return {
          hour: 0,
          min: 0
        }
      } else {
        // 求出当前时间差对应的秒数 , 结果就是 n 秒 余 m 毫秒
        const seconds = Math.floor(differenceTime / 1000)
        // 求出当前时间差对应的分钟数 , 并求出余下的秒数
        const minutes = Math.floor(seconds / 60)
        // 求出当前时间差对应的小时数 , 并求出余下的分钟数
        const hours = Math.floor(minutes / 60)
        const remainMin = minutes % 60
        // 返回值
        return {
          hour: hours,
          min: remainMin
        }
      }
    }
  },
  created () {
    const obj = {
      r_resource: 'h5'
    }
    triggerService({ eventId: '14-2-1-17', freeName2: JSON.stringify(obj), freeName1: this.$route.name }) // story 页面曝光
    this.getSignInList()
    this.innerHeight = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight
    window.addEventListener('resize', () => {
      this.innerHeight = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight
    })
  }
}
</script>

<style lang="less" scoped>
.check-in {
  &::before {
    content: '';
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
   background: linear-gradient(180deg, #ACFC60 0%, #EEFFEE 5%, #ECFFED 95%, #ADFB64 100%);
  }
}
.check-in__con {
    position: relative;
    box-sizing: border-box;
    padding: 61px 11px 16px 13px;
    color: #012500;
    height: 100%;
    min-height: 600px;
    z-index: 1;

    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: -1;
      background: url(~@/assets/img/checkIn/check-in-bg.png) top center no-repeat;
      background-size: 100%;
    }

    .check-in__top {
        width: 198px;
        height: 157px;
        padding-top: 9px;
        padding-left: 7px;
        box-sizing: border-box;
        .check-in-title {
            width: 167px;
            height: 63px;
            font-size: 16px;
            font-weight: bold;
            line-height: 15px;
            display: flex;
            align-items: center;
        }
        .check-in-desc {
          height: 66px;
          font-size: 14px;
          line-height: 16px;
          display: flex;
          align-items: center;
        }
    }

    .check-in__main {
        margin-top: 39px;
        padding: 0;
        position: relative;
        .check-list {
            display: grid;
            grid-gap: 10px;
            grid-template-columns: repeat(4, 74px);
            padding: 11px 12px 0;

            .check-item {
                position: relative;
                background: #fff;
                border-radius: 9px;
                display: flex;
                flex-direction: column;
                align-items: center;
                overflow: hidden;
                height: 66px;
                background-size: contain;

                &.checked {
                    background: url(~@/assets/img/checkIn/check-in-item-bg.png) top
                        center no-repeat;
                    background-size: cover;

                    .check-up-to {
                      width: 70px;
                    }
                }

                &.missed {
                  background: #058902E6;

                  .check-coin {
                    padding-top: 22px;
                    img {
                      width: 20px;
                      height: 20px;
                    }
                  }

                  .check-up-to {
                    color: #ffffff30;
                  }
                }

                &:last-child {
                    grid-column-start: span 2;
                    &.checked {
                      background-image: url(~@/assets/img/checkIn/check-in-item-bg2.png);
                      background-size: cover;
                    }

                    .check-up-to {
                        background-image: url(~@/assets/img/checkIn/check-in-item-b2.png);
                        background-size: cover;
                    }
                }

                .check-check-icon {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 18px;
                    height: 15px;
                    background: url(~@/assets/img/checkIn/check-in-check.png) top center
                        no-repeat;
                    background-size: contain;
                }

                .check-day {
                    position: absolute;
                    right: 6px;
                    top: 2px;
                    font-size: 12px;
                    font-weight: bold;
                    color: #076f04;
                }

                .check-coin {
                    padding-top: 16px;
                    font-size: 0;
                    img {
                        width: 32px;
                        height: 32px;
                    }
                }
                .check-up-to {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    height: 28px;
                    color: #fff;
                    text-align: center;
                    line-height: 36px;
                    font-size: 12px;
                    background: url(~@/assets/img/checkIn/check-in-item-b.png) top
                        center no-repeat;
                    background-size: cover;
                }
            }
        }
        .check-success-box {
          position: absolute;
          top: 0;
          margin: 0 5px;
          border-radius: 9px;
          background: #000000e3;
          .check-success-icon {
            padding-top: 35px;
            width: 47px;
            height: 47px;
            margin: 0 auto;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .check-success-txt {
            padding: 0 30px 15px;
            font-size: 12px;
            color: #FFFFFF;
            line-height: 20px;
            text-align: center;
            margin-top: 13px;
          }
        }
        .check-list-desc {
            margin-top: 22px;
            text-align: center;
            font-size: 15px;
            em {
                font-size: 22px;
                font-weight: bold;
            }
        }
      }
      .check-btn-box {
          margin-top: 100px;

          .check-btn {
              width: 215px;
              height: 50px;
              margin: 0 auto;
              line-height: 50px;
              text-align: center;
              background: #000000;
              border-radius: 26px;
              color: #2fff00ff;
              font-size: 16px;
              font-weight: bold;
          }
      }
}

</style>
<style lang="less">
.check-in {
  position: relative;
    .check-list-desc {
        em {
            font-size: 18px;
            font-weight: bold;
        }
    }
}
[lang='ar'],
[lang='he'],
[lang='ur'] {
  direction: rtl;
  .check-in__con {
    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: -1;
      background: url(~@/assets/img/checkIn/check-in-bg.png) top center no-repeat;
      transform: rotateY(180deg);
      background-size: 100%;
    }

    .check-in__top {
      padding-left: 0;
      padding-right: 7px;
      box-sizing: border-box;
    }
  }
}

</style>
