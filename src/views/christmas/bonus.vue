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
          <p>{{$t('christmas2022.bonusYearTtile')}}</p>
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
          <div class="rule-title"> {{ $t("christmas2022.bonusYearRuleTitle") }} <span class="back-btn closeRule" @click="closeRule">
            <img src="https://h5.livuchat.com/staticProd/2022_christmas/img/close2.png" alt="">
          </span></div>
          <div class="rule-box">
            <dl v-for='(item, idx) in rulesContent' :key="idx">
              <dt>{{item.title}}</dt>
              <dd v-for="(con, i) in item.content" :key="i">{{con}}</dd>
            </dl>
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
import { getUserRechargeTaskList, getUserRechargeBonus, getUserBaseInfo, getCollectActId, getActDict } from '@/api/worldCup'
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
      mainActId: '',
      isAutoOpen: true,
      isActEnd: false,
      rulesContent: []
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
    getRechargeBonus (item) {
      this.selItem = item
      if (!(item.completed && (item.bonusEnable || item.canOpenLottery))) {
        return
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
          if (res && !item.lotteryId) {
            Toast({ message: this.$t('worldCup.worldCupBonus.bonusTips', { num: item.bonus }), duration: 5000, className: 'bonus-toast' })
          }
          this.getList()
          this.getUserBaseInfoData()
        })
      }
    },
    async getList (params) {
      const commonParams = this.commonParams
      // const data = {
      //   userId: this.userId,
      //   ...params,
      //   bizData: commonParams.bizData,
      //   activityId: commonParams.activityId,
      //   deviceId: commonParams.deviceId
      // }
      const res = await getUserRechargeTaskList({ ...commonParams, noLoading: true })
      if (res) {
        this.endTime = res.endTime
        this.taskList = res.userRechargeTasks || []
      }
      // await getUserRechargeTaskList(data).then(res => {
      //   console.log(res, '------用户任务----------')
      //   this.endTime = res.endTime
      //   this.taskList = res.userRechargeTasks || []
      // })
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
    async getCollectActIdData () {
      const commonParams = this.commonParams
      const res = await getCollectActId({ ...commonParams, noLoading: true })
      if (res) {
        this.mainActId = res
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
    async init () {
      // const commonParams = this.commonParams
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
      // await getCollectActId({ ...commonParams }).then(res => {
      //   if (res) {
      //     this.mainActId = res
      //   }
      // })
      this.getCollectActIdData()
      document.documentElement.scrollTop = 0
      const rulesContent = this.$t('worldCup.worldCupBonus.rules.content')
      if (rulesContent && rulesContent.length > 3) {
        this.rulesContent = rulesContent.slice(0, 3)
      } else {
        this.rulesContent = rulesContent
      }
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
<style lang="less" scope>
@import url("./bonus.less");
</style>
