<template>
  <div :class="['page-bonus', showFlip && 'horizontal-flip']">
      <div class="top-info">
        <div class="avatar" v-if="selfInfo" @click="goPayment">
          <div>
            <img :src="selfInfo.headImg"  onerror="javascript:this.src='https://h5.livuchat.com/staticProd/worldCup/img/user.png'" />
          </div>
          <div class="coin">{{ selfInfo.balance }}</div>
        </div>
        <div class="rules-btn" @click="openRule">{{$t('worldCup.worldCupBonus.rule')}}</div>
        <div class="title">
          <p>{{$t('worldCup.worldCupBonus.title')}}</p>
          <p v-if="!isActEnd">{{$t('worldCup.worldCupBonus.info')}}</p>
          <p v-else>{{$t('worldCup.worldCupBonus.actEnd')}}</p>
        </div>
      </div>
      <p v-if="activeEnd" class="bonus-end">{{ $t('worldCup.worldCupBonus.endTips') }}</p>
      <div class="countdown" v-else>
        <count-down :endTime="endTime" @updateCountDownData="updateCountDownData" @endCountDownData="countDownEnd"></count-down>
        <ul>
          <li><p>{{countDownData.day}}</p><p>Day</p></li>
          <li><p>{{countDownData.hour}}</p><p>Hour</p></li>
          <li><p>{{countDownData.min}}</p><p>Min.</p></li>
          <li><p>{{countDownData.sec}}</p><p>Sec.</p></li>
        </ul>
      </div>
      <div v-if="!activeEnd">
        <div class="bonus-item" v-for="(item,index) in taskList" :key="item.taskName">
          <div class="title"><div>{{$t('worldCup.worldCupBonus.weeklyBonus')}} {{index+1}}</div>
          <div>
            <span class="bonus" v-if="item.bonus"><span>{{item.bonus}}</span></span>
            <span :class="['lottery', !item.bonus ? 'show-plus': '']" v-if="item.lotteryCount"><span>
              <img :src="lotteryDictMap[item.lotteryId]"/>
              <i v-if="item.lotteryCount >=1">X{{item.lotteryCount}}</i>
            </span></span>
          </div></div>
          <div class="progress">
            <div :style="'width:'+ getProgress(item.currentProgress) + '%'"></div>
          </div>
          <div class="bottom">
            <div><span class="bonus"><i>{{item.currentProgress.split('/')[0]}}</i><i>/</i>{{item.currentProgress.split('/')[1]}}</span></div>
            <div>
               <span class="get-bonus-btn" :class="{disable: !(item.completed && (item.bonusEnable ||item.canOpenLottery)) }" @click="getRechargeBonus(item)">{{$t('worldCup.worldCupBonus.getBonus')}}</span>
            </div>
          </div>
        </div>
        <div class="bottom-btn">
          <span @click="gotoPay">{{$t('worldCup.worldCupBonus.enjoyBonus')}}</span>
        </div>
      </div>
      <mt-popup
          v-model="isShowRules"
          class="rc-popup-box blur-bg"
          :lockScroll="true"
          position="center"
        >
        <div class="rules">
          <div class="rule-title"> {{ $t("worldCup.worldCupBonus.rules.title") }} <span class="back-btn" @click="closeRule">X</span></div>
          <div class="rule-box">
            <dl v-for='(item, idx) in $t("worldCup.worldCupBonus.rules.content")' :key="idx">
              <dt>{{item.title}}</dt>
              <dd v-for="(con, i) in item.content" :key="i">{{con}}</dd>
            </dl>
          </div>
        </div>
      </mt-popup>
      <mt-popup
        v-model="isShowGiftBox"
        class="rc-popup-box"
        :lockScroll="true"
        position="center"
        :closeOnClickModal="false"
        >
          <div class="gift-box">
            <div class="info">
                <span v-if="selItem.bonusEnable && selItem.lotteryCount && selItem.bonus "  v-html='$t("worldCup.worldCupBonus.mysteryInfo",
                 {bonus: selItem.bonus, lotteryIcon: ` ${ !showFlip ? " x " + selItem.lotteryCount : ""}<img src="${lotteryDictMap[selItem.lotteryId]}" class="dimond">${ showFlip ?  "x" + selItem.lotteryCount: ""}`,
                  lotteryCount: ""})'
                ></span>
                <span v-else v-html='$t("worldCup.worldCupBonus.mysteryInfo2", {
                  lotteryIcon: `${ !showFlip ? " x " + selItem.lotteryCount: ""}<img src="${lotteryDictMap[selItem.lotteryId]}" class="dimond">${ showFlip ?  "x" + selItem.lotteryCount: ""}`,
                  lotteryCount: ""})'
                ></span>
            </div>
            <div class="box">
              <dl v-if="selItem.bonusEnable">
                <dd><img src="https://h5.livuchat.com/staticProd/worldCup/img/coins.png" alt=""></dd>
                <dt>{{selItem.bonus}}</dt>
              </dl>
              <dl v-if="selItem && selItem.lotteryCount">
                <dd><img :src="lotteryDictMap[selItem.lotteryId]" alt="" style="transform: scale(1.5);position: relative; top: 10px;"></dd>
                <dt> x {{selItem.lotteryCount}}</dt>
              </dl>
            </div>
            <div class="btn">
              <span @click="openMystery"><i>{{$t("worldCup.worldCupBonus.mysteryBtn")}}</i> <i>({{this.openFreeCount}}S)</i></span>
            </div>
          </div>
      </mt-popup>
    <mt-popup
      v-model="isShowOpenGift"
      class="rc-popup-box"
      :lockScroll="true"
      position="center"
      :closeOnClickModal="false"
    >
      <div class="caidai"  v-if="isShowCaidai"></div>
      <div class="open-gift gift-info" v-if="!isShowOpenLoading">
        <div class="header">
          <span class="back-btn" @click="closeOpenGift">
            <img src="https://h5.livuchat.com/staticProd/worldCup/img/close.png" alt="">
          </span>
        </div>
        <div>
          <div class="gift-box">
            <div>
              <div class="title">
                {{ $t('worldCup.congratulation') }}
              </div>
              <div class="get-gift" v-if="getOpenGift">
                <template v-for="(item, idx) in getOpenGift" >
                  <div :key="idx" v-if="item.prizeType === 1" :class="['gift-item', 'flash-light','coin', getOpenGift.length === 1 ? 'gold': '',  item.goldNum < 100 ? 'coin1': item.goldNum >= 100 && item.goldNum < 800 ? 'coin2': 'coin3']">
                    <span>{{ item.goldNum }} </span>
                    <div class="flash-light-box"></div>
                  </div>
                  <div
                    :class="['gift-item', 'flash-light', getOpenGift.length === 1? 'single': '',  goodsDictMap[item.goodsId].indexOf('cup') !== -1 ? 'special': '']"
                    v-if="item.prizeType === 2"
                    :key="idx"
                  >
                    <div class="flash-light-box"></div>
                    <img :src="goodsDictMap[item.goodsId]" alt="" />
                    <!-- <span class="goods-count">x{{ item.goodsCount }} </span> -->
                  </div>
                  <div
                    class="gift-item"
                    v-if="item.prizeType === 3"
                    :key="idx"
                  >
                    <span class="smile"></span>
                  </div>
                </template>
              </div>
            </div>
            <div class="gift-type" v-if="selItem">
              <span class="type">
                <img :src="lotteryDictMap[selItem.lotteryId]" />
              </span>
            </div>
          </div>
        </div>
         <div class="free-bottom-btn">
              <span @click="goWorldCup"><i>{{$t("worldCup.worldCupBonus.mysteryMoreBtn")}}</i></span>
        </div>
      </div>
      <div class="open-gift ani-box" v-if="isShowOpenLoading && selItem">
          <div class="ani-img">
              <div :class="['box'+ selItem.lotteryId]"></div>
          </div>
      </div>
    </mt-popup>

  </div>
</template>
<script type="text/babel">
import Cookies from 'js-cookie'
import { triggerService } from '@/utils/statisticalTool'
import MtPopup from '@/components/popup/index'
import Toast from '@/components/toast/index'
import CountDown from '@/views/components/countDown'
import { getUserRechargeTaskList, getUserRechargeBonus, getUserBaseInfo, getCollectActId, getActDict, openLotteryForRecharge } from '@/api/worldCup'
import { getParams, jumpPayment, getWorldCupParams, worldCupIsFlipContry, worldCupJumpParams } from '@/utils/index'

const QueryParams = getParams()
export default {
  name: 'WorldCupWinners',
  components: { MtPopup, CountDown },
  data () {
    return {
      userId: QueryParams.userId || Cookies.get('userId'),
      isShowRules: false,
      endTime: null,
      activeEnd: false,
      taskList: [],
      countDownData: {
        day: '00',
        hour: '00',
        min: '00',
        sec: '00'
      },
      timerLoop: null,
      showFlip: false,
      selfInfo: null,
      commonParams: {},
      isShowGiftBox: false,
      lotteryDictMap: {},
      goodsSpecialEffect: {},
      selItem: {},
      isShowCaidai: false,
      getOpenGift: null,
      isShowOpenGift: false,
      isShowOpenLoading: false,
      mainActId: '',
      openFreeCount: 0,
      isAutoOpen: true,
      isActEnd: true
    }
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    closeRule () {
      this.isShowRules = false
    },
    closeOpenGift () {
      triggerService({ eventId: '105-10-1-10' })
      this.isShowOpenGift = false
    },
    openRule () {
      this.isShowRules = true
      triggerService({ eventId: '105-10-1-2' }) // 帮助点击
    },
    updateCountDownData (data) {
      this.countDownData = {
        ...data
      }
    },
    goWorldCup () {
      triggerService({ eventId: '105-10-1-9' })
      const activityId = this.mainActId
      const data = JSON.parse(JSON.stringify(this.commonParams))
      data.bizData.activityId = activityId
      data.activityId = activityId
      const query = worldCupJumpParams(data)
      this.$router.push({ name: 'WorldCup', query })
    },
    countDownEnd () {
      console.log('-----end')
      this.activeEnd = true
      clearInterval(this.timerLoop)
      this.timerLoop = null
    },
    getProgress (val) {
      if (!val) return 0
      const arr = val.split('/')
      const res = arr[0] / arr[1] * 100
      if (res >= 100) return 100
      return res
    },
    openLottery () {
      openLotteryForRecharge({
        ...this.commonParams,
        activityId: +this.commonParams.activityId,
        userId: this.userId,
        stage: this.selItem.stage
      }).then(resData => {
        const res = this.handleResData(resData)
        if (res) {
          this.getOpenGift = res.results
          this.getShowCaidai(res)
          this.getList()
          this.getUserBaseInfoData()
          triggerService({
            eventId: '105-10-1-8',
            freeName1: {
              award: res.results
            }
          })
        }
      })
    },
    handleResData (res) {
      if (res.code === 200) {
        return res.data || true
      }
      if (res.code === 10000) {
        window.location.reload()
      }
      if (res.code === 11111) {
        jumpPayment()
        return
      }
      this.isShowOpenGift = false
      Toast(res.message)
    },
    showCaidaiAni () {
      setTimeout(() => {
        this.isShowCaidai = true
        setTimeout(() => {
          this.isShowCaidai = false
        }, 1500)
      }, 1400)
    },
    getShowCaidai (resData) {
      const goodsSpecialEffect = this.goodsSpecialEffect
      let hasGiftCaidai = false
      if (resData && resData.results) {
        for (let i = 0; i < resData.results.length; i++) {
          const itemObj = resData.results[i]
          if (itemObj.prizeType === 2 && goodsSpecialEffect[itemObj.goodsId]) {
            hasGiftCaidai = true
            break
          }
        }
      }
      if (hasGiftCaidai) {
        this.showCaidaiAni()
      }
    },
    openMystery () {
      this.isAutoOpen = false
      triggerService({ eventId: '105-10-1-7' })
      this.isShowOpenGift = true
      this.isShowGiftBox = false
      this.isShowOpenLoading = true
      this.openLottery()
      setTimeout(() => {
        this.isShowOpenLoading = false
      }, 2200)
    },
    handleLottery (item) {
      this.openFreeCount = item.lotterySecond
      this.openFreeTimer = setInterval(() => {
        if (this.openFreeCount <= 1) {
          clearInterval(this.openFreeTimer)
          if (this.isAutoOpen) {
            this.isShowOpenGift = true
            this.isShowGiftBox = false
            this.isShowOpenLoading = true
            this.openLottery()
            setTimeout(() => {
              this.isShowOpenLoading = false
            }, 2200)
          }
        }
        this.openFreeCount -= 1
      }, 1000)
    },
    getRechargeBonus (item) {
      this.selItem = item
      if (!(item.completed && (item.bonusEnable || item.canOpenLottery))) {
        return
      }
      if (item.canOpenLottery) {
        this.isShowGiftBox = true
        triggerService({
          eventId: '105-10-1-6',
          freeName1: {
            bonus: item.bonus,
            lotteryId: item.lotteryId,
            lotteryCount: item.lotteryCount
          }
        })
        this.handleLottery(item)
      }

      if (item.bonus > 0 && item.bonusEnable) {
        triggerService({ eventId: '105-10-1-4', freeName1: item.bonus })
        const commonParams = this.commonParams
        const params = {
          userId: this.userId,
          stage: item.stage,
          bizData: commonParams.bizData,
          activityId: commonParams.activityId
        }
        getUserRechargeBonus(params).then(res => {
          console.log(res, '--------用户 bons---')
          if (res && !item.lotteryId) {
            Toast({ message: this.$t('worldCup.worldCupBonus.bonusTips', { num: item.bonus }), duration: 5000, className: 'bonus-toast' })
          }
          this.getList()
          this.getUserBaseInfoData()
        })
      }
    },
    getList (params) {
      const commonParams = this.commonParams
      const data = {
        userId: this.userId,
        ...params,
        bizData: commonParams.bizData,
        activityId: commonParams.activityId
      }
      getUserRechargeTaskList(data).then(res => {
        console.log(res, '------用户任务----------')
        this.endTime = res.endTime
        this.taskList = res.userRechargeTasks || []
      })
    },
    gotoPay () {
      console.log('----去三方------')
      triggerService({ eventId: '105-10-1-3' }) // 去充值点击
      jumpPayment()
    },
    goPayment () {
      const commonParams = this.commonParams
      triggerService({ eventId: '105-10-1-5', targetUserId: commonParams.userId })
      jumpPayment()
    },
    async getUserBaseInfoData () {
      const commonParams = this.commonParams
      const res = await getUserBaseInfo({ ...commonParams, noLoading: true })
      if (res) {
        this.selfInfo = res.selfInfo
      }
    },
    getDict (params) {
      const self = this
      getActDict(params).then(res => {
        self.goodsDict = res.goodsDict || []
        const lotteryDict = {}
        const goodsSpecialEffect = {}
        const goodsDictMap = {}
        if (res.lotteryDict) {
          res.lotteryDict.forEach((item) => {
            lotteryDict[item.id] = item.icon
          })
        }
        if (res.goodsDict) {
          res.goodsDict.forEach((item) => {
            goodsDictMap[item.id] = item.icon
            if (item.useSpecialEffect) {
              goodsSpecialEffect[item.id] = true
            }
          })
        }
        self.goodsDictMap = goodsDictMap
        self.lotteryDictMap = lotteryDict
        self.goodsSpecialEffect = goodsSpecialEffect
      })
    },
    init () {
      const commonParams = getWorldCupParams()
      this.commonParams = commonParams
      this.getList()
      this.getUserBaseInfoData()
      this.timerLoop = setInterval(() => {
        this.getList({ noLoading: true })
      }, 1000 * 30)
      this.timer5sLoop = setInterval(() => {
        this.getUserBaseInfoData()
      }, 1000 * 5)
      this.$once('hook:beforeDestroy', () => {
        clearInterval(this.timerLoop)
        clearInterval(this.timer5sLoop)
        this.timer5sLoop = null
        this.timerLoop = null
      })
      this.showFlip = worldCupIsFlipContry(this.$i18n.locale)
      getCollectActId({}).then(res => {
        if (res) {
          this.mainActId = res
          this.getDict({ activityId: res, noLoading: true })
        }
      })
      document.documentElement.scrollTop = 0
    }
  },

  mounted () {
    if (this.isActEnd) {
      // 活动结束
      const commonParams = getWorldCupParams()
      this.commonParams = commonParams
      this.getUserBaseInfoData()
    } else {
      this.init()
    }
    triggerService({ eventId: '105-10-1-1', freeName1: this.$route.name }) // 充值任务页面展示
  }
}
</script>
<style lang="less">
@import url("./bonus.less");
</style>
