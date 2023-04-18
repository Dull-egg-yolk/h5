<template>
  <div :class="[showFlip && 'horizontal-flip']">
    <div :class="['page-word-cup']" v-if="isLoad && !(actLifeCycle === ACT_LIFECYCLE.end || !stage)">
      <world-cup-header :isLoad= "isLoad"
      :goodsDictMap="goodsDictMap"
      :goodsSpecialEffect="goodsSpecialEffect"
      :lotteryDict="lotteryDict"
      :selfInfo="selfInfo"
      :collectionInfo="collectionInfo"
      :commonParams="commonParams"
      :addDanMuData="addDanMuData"
      @openRule="openRule" @goRank="goRank" @goPayment="goPayment"/>
      <div v-if="isLoad && actLifeCycle === ACT_LIFECYCLE.running && stage">
        <div class="main">
          <!-- 免费宝箱 -->
          <div class="free"  @click="openRuleBox">
            <div class="free-info">
              <div class="title">
                <p v-if="stage === STAGE.collect">
                  {{ $t('worldCup.timeLeft') }}
                </p>
                <p
                  class="end"
                  v-if="stage !== STAGE.collect"
                  style="font-size: 0.4rem"
                >
                  {{ $t('worldCup.collectionEnd') }}
                </p>
                <ul v-if="stage === STAGE.collect && endCollectTime">
                  <count-down
                    :endTime="endCollectTime"
                    @updateCountDownData="updateCountDownData"
                    @endCountDownData="collectEndCountDown"
                  ></count-down>
                  <li v-if="countDownData">
                    <p>{{ countDownData.day }}</p>
                    <p>Day.</p>
                  </li>
                  <li v-if="countDownData">
                    <p>{{ countDownData.hour }}</p>
                    <p>Hour.</p>
                  </li>
                  <li v-if="countDownData">
                    <p>{{ countDownData.min }}</p>
                    <p>Min.</p>
                  </li>
                  <li v-if="countDownData">
                    <p>{{ countDownData.sec }}</p>
                    <p>Sec.</p>
                  </li>
                </ul>
              </div>
              <div v-if="collectionInfo" class="collected-sets">
                  <div class="info-sets">{{ $t('worldCup.treasureChest.sets') }} </div>
                  <div class="sets-number">
                    {{collectionInfo.selfGatheredCount}}
                  </div>
              </div>
            </div>
            <ul class="gift" v-if="ruleMap && collectionInfo">
              <li :class="['type', goodsDictMap[g].indexOf('cup') !== -1 && collectionInfo.selfLeftCollecttedGoodsIdCountMap[g] ? 'special': '']" v-for="(g) in Object.keys(ruleMap)" :key="g">
                <img :src="goodsDictMap[g]" />
                <img
                  class="cover"
                  src="https://h5.livuchat.com/staticProd/worldCup/img/gift/cover4.png"
                  v-if="!collectionInfo.selfLeftCollecttedGoodsIdCountMap[g]"
                />
                <img src="https://h5.livuchat.com/staticProd/worldCup/img/gift/new/circle1.png" class="circle" alt="" v-if="(collectionInfo.selfLeftCollecttedGoodsIdCountMap[g])">
              </li>
            </ul>
            <!-- 开奖阶阶段 未集齐 -->
            <div class="info" v-if="stage === STAGE.lottery && collectionInfo">
              {{
                collectionInfo.selfGatheredCount
                  ? $t('worldCup.collection')
                  : $t('worldCup.unCollection')
              }}
            </div>
            <div
              class="bottom"
              v-if="
                stage === STAGE.collect &&
                collectionInfo &&
                !collectionInfo.succeeded
              "
            >
              <div class="button" v-if="endBtnTime && endBtnTime <= Date.now() " @click.stop="openFreeGift">
                {{ $t('worldCup.freeMsteryBox') }}
              </div>
              <div class="cover-btn" v-if="!isShowFreeBtn && endBtnTime > Date.now()">
                <p>
                  <count-down
                    :endTime="endBtnTime"
                    :showTime="true"
                    @endCountDownData="freeEndCountDown"
                  ></count-down>
                </p>
                <p>{{ $t('worldCup.freeMsteryBox') }}</p>
              </div>
            </div>

            <div class="info" v-if="stage === STAGE.award && collectionInfo && awardCoin">
              {{
                collectionInfo.selfGatheredCount
                  ? `${$t('worldCup.rewardInfoStart')}${awardCoin.totalGoldNum} ${$t('worldCup.rewardInfoEnd')}`
                  :  $t('worldCup.unCollection')
              }}
            </div>
            <div class="award" v-if="stage === STAGE.award">
              <div :class="['award-wrap', awardCoin && awardCoin.packs.length <=4 ? 'center': '' ]" v-if="awardCoin && awardCoin.packs">
                <div class="award-item" v-for="item in awardCoin.packs" :key="item.orderNo">
                  <div class="award-order"><span>{{item.orderNo}}</span> SET</div>
                  <div class="goldNum">+{{item.goldNum}}</div>
                </div>
              </div>
              <div class="info-img"  v-if="!awardCoin || !awardCoin.totalGoldNum">
                <div class="smile"></div>
              </div>
              <div class="pick-up" v-if="awardCoin && awardCoin.totalGoldNum">
                <span
                  @click.stop="getRewardCoin"
                  v-if="awardCoin && !awardCoin.received && !this.isClickReceiveCoin"
                  >{{ $t('worldCup.receiveReward') }}</span
                >
                <span
                  class="cover"
                  v-if="awardCoin && (this.isClickReceiveCoin || awardCoin.received)"
                  >
                  <p>{{ $t('worldCup.receiveRewarded') }}</p>
                  <p><i class="coins">{{awardCoin.totalGoldNum}} </i></p>
                </span
                >
              </div>
              <div class="go-winners">
                <span @click.stop="goWinners">{{ $t('worldCup.viewWinnersBtn') }}</span>
              </div>
            </div>
          </div>
          <div class="bg"></div>
        </div>
        <div>
            <div class="count-down-lottery" v-if="stage === STAGE.lottery">
              <div class="title">
                {{ $t('worldCup.waitingShare') }}
              </div>
              <ul v-if="openingTime > Date.now()">
                <count-down
                  :endTime="openingTime"
                  @updateCountDownData="updateCountOpeningDownData"
                  @endCountDownData="openEndCountDown"
                ></count-down>
                <li>
                  <p>{{ openingCountData.hour }}</p>
                  <p>Hour.</p>
                </li>
                <li class="center">
                  <p>{{ openingCountData.min }}</p>
                  <p>Min.</p>
                </li>
                <li>
                  <p>{{ openingCountData.sec }}</p>
                  <p>Sec.</p>
                </li>
              </ul>
            </div>
        </div>
        <!-- 收集阶段 -->
        <div
          v-if="
            isLoad &&
            actLifeCycle === ACT_LIFECYCLE.running &&
            stage === STAGE.collect
          "
        >
          <div class="info">
            <p>{{ $t('worldCup.packageTitle') }}</p>
            <p>{{ $t('worldCup.packageSubTitle', {shareCoin: multiLangParams.shareCoin}) }}</p>
          </div>
          <div class="package">
            <div class="item" v-for="(p, idx) in payedList" :key="p.id">
              <div class="type-img">
                <img :src="lotteryDict[p.id]" />
              </div>
              <div class="coins">
                <i>{{ $t('worldCup.winUp') }}</i><span>{{ p.maxValuePerOnce | formatNum }}</span>
              </div>
              <div class="gift-wrap">
                <p><span>{{ $t('worldCup.footballItemReleased') }}</span></p>
                <ul class="gift-small" v-if="Object.keys(ruleMap).length > 0">
                  <li :class="['type', goodsDictMap[g].indexOf('cup') !== -1 ? 'special': '']" v-for="g in Object.keys(ruleMap)" :key="g">
                    <img :src="goodsDictMap[g]" />
                    <span>x
                      <i>{{ (p.alreadyOpenedGoodsIdCountMap[g] || 0) | formatPayedCount }}</i>
                    </span>
                  </li>
                </ul>
              </div>
              <div class="pkg-btn">
                <dl
                  v-for="t in p.openTypeInfos"
                  :key="t.id"
                  @click="openClick(true, t, p, idx)"
                  :class="[t.showTimes > 1 ? 'mutil': '']"
                >
                  <dt v-if="t.showTimes === 1">
                     <span>{{ $t('worldCup.openBtnTitle')}} </span>
                  </dt>
                  <dt v-if="t.showTimes !== 1">
                    {{ $t('worldCup.openBtnTitle')}} X
                    <span>{{ t.showTimes }}</span>
                  </dt>
                  <dd>
                    <span>
                      <i v-if="t.showTimes !== 1 ">{{t.showTimes}}</i>
                      <i v-if="t.showTimes !== 1 ">x</i>
                      <i>{{t.showCost / t.showTimes}}</i>
                    </span>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      <jump-godness @goFootBallFans="goFootBallFans" v-if="isLoad"></jump-godness>
      <jump-bonus @jumpBonus="jumpBonus" v-if="false && isLoad"></jump-bonus>
    </div>
    <div ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-if="isLoad && (actLifeCycle === ACT_LIFECYCLE.end || !stage)" :class="['page-word-cup']" >
      <div class="winner-wrapper" v-infinite-scroll="loadMore" :infinite-scroll-immediate-check="immediateCheck"  infinite-scroll-disabled="loading"  infinite-scroll-distance="60">
        <world-cup-header :isLoad= "isLoad" :collectionInfo="collectionInfo" :goodsDictMap="goodsDictMap" :goodsSpecialEffect="goodsSpecialEffect" :lotteryDict="lotteryDict" :selfInfo="selfInfo" @openRule="openRule" @goRank="goRank" @goPayment="goPayment"/>
        <div
          class="winner-main"
        >
          <div class="winner-list" >
            <div class="title">{{ $t('worldCup.listWinners') }}</div>
            <div style="padding: 0.3rem;">
              <!-- <winner :activityId="activityId" :userId="userId" /> -->
              <div class="rank-content" v-if="isLoadFirst && winnersListData.length > 0" v-infinite-scroll="loadMore" :infinite-scroll-immediate-check="immediateCheck"  infinite-scroll-disabled="loading"  infinite-scroll-distance="60">
                <div>
                  <div class="rank-item" v-for="winner in winnersListData" :key="winner.userId">
                    <div class="avatar-wrap">
                          <div class="avatar">
                            <img :src="winner.headImg || 'https://h5.livuchat.com/staticProd/worldCup/img/user.png'" alt="" onerror="javascript:this.src='https://h5.livuchat.com/staticProd/worldCup/img/user.png'" />
                          </div>
                          <div class="info">
                            <p>{{winner.userName}}</p>
                            <p>
                                <country :countryId="winner.countryId" type="img"></country>
                            </p>
                          </div>
                      </div>
                      <div class="coins"><span>{{winner.goldNum}}</span></div>
                  </div>
                </div>
              </div>
              <div v-if="isLoadFirst && winnersListData.length === 0" class="no-data">
                <div>{{$t('worldCup.noData')}}</div>
              </div>
              <div v-show="loading" class="page-loading">
                  <mt-spinner type="fading-circle" color="#a425ff"></mt-spinner>
              </div>
            </div>
          </div>
          <div class="bg"></div>
        </div>
        <jump-godness @jumpBonus="goFootBallFans" v-if="isLoad"></jump-godness>
        <jump-bonus  @jumpBonus="jumpBonus" v-if="false && isLoad"></jump-bonus>
      </div>
    </div>
    <mt-popup
      v-model="isShowRules"
      class="rc-popup-box"
      :lockScroll="true"
      position="center"
    >
      <div class="rules">
        <div class="rule-title">
          {{ $t('worldCup.rules.title') }}
          <span class="back-btn" @click="closeRule">X</span>
        </div>
        <div class="rule-box">
          <dl>
            <dt>{{ $t('worldCup.rules.startTime') }} <span v-if="actTimes.startAndEnd">{{actTimes.startAndEnd.startTimestamp | formatTimeStr}}</span></dt>
            <dt>{{ $t('worldCup.rules.endTime') }}<span v-if="actTimes.startAndEnd">{{actTimes.startAndEnd.endTimestamp | formatTimeStr}}</span></dt>
            <dt>{{ $t('worldCup.rules.shareTime')}} <span v-if="actTimes.opening">{{actTimes.opening.startTimestamp | formatTimeStr}} ~ {{actTimes.opening.endTimestamp | formatTimeStr}}</span></dt>
            <dt>{{ $t('worldCup.rules.awardTime') }} <span v-if="actTimes.receiving">{{actTimes.receiving.startTimestamp | formatTimeStr}} ~ {{actTimes.receiving.endTimestamp | formatTimeStr }}</span></dt>
          </dl>
          <dl v-for="(item, idx) in $t('worldCup.rules.content')" :key="idx">
            <dt v-if="idx !==3">{{ item.title.replace('{total}', multiLangParams.total || '') }}</dt>
            <dt v-if="idx ===3">
              <span v-html="$t('worldCup.rules.rule8', {
                lotteryIcon: multiLangParams.lotteryIcon,
                cup: multiLangParams.cup,
                count: multiLangParams.count
              })"></span>
            </dt>
            <dd v-for="(con, i) in item.content" :key="i">
              {{ con }}
            </dd>
          </dl>
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
                  <div :key="idx" v-if="item.prizeType === 1" :class="['gift-item','flash-light', 'coin', getOpenGift.length === 1 ? 'gold': '', item.goldNum < 100 ? 'coin1': item.goldNum >= 100 && item.goldNum < 800 ? 'coin2': 'coin3']">
                    <span>{{ item.goldNum }} </span>
                    <div class="flash-light-box"></div>
                  </div>
                  <div
                    :class="['gift-item', 'flash-light', getOpenGift.length === 1? 'single': '', goodsDictMap[item.goodsId].indexOf('cup') !== -1 ? 'special': '']"
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
            <div class="gift-type">
              <span class="type">
                <img
                  v-if="!isOpenFree && selfPayed"
                  :src="lotteryDict[selfPayed.id]"
                />
                <img v-if="isOpenFree" :src="lotteryDict[freeLotteryId]" />
              </span>
            </div>
          </div>
          <div
            class="gift-btn"
            v-if="!isOpenFree && selfPayed && selfPayed.openTypeInfos"
          >
            <dl
              v-for="t in selfPayed.openTypeInfos"
              :key="t.id"
              :class="[presenttedLotteryToken ? 'disabled': '']"
              @click="openClick(false, t, selfPayed, aniBoxIndex - 2)"
            >
              <dt v-if="t.showTimes === 1">
                {{ $t('worldCup.openBtnTitle') }}
              </dt>
              <dt v-if="t.showTimes !== 1">
                {{ $t('worldCup.openBtnTitle') }} X
                {{ t.showTimes }}
              </dt>
              <dd>
                <span>{{ t.showTimes !== 1 ? `${t.showTimes } x ${t.showCost / t.showTimes}` : t.showCost }}</span>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="open-gift ani-box" v-if="isShowOpenLoading && aniBoxIndex">
          <div class="ani-img">
              <div :class="['box'+ aniBoxIndex]"></div>
          </div>
      </div>
    </mt-popup>
    <mt-popup
      v-model="isShowOpenFreeGift"
      class="rc-popup-box"
      :lockScroll="true"
      position="center"
      :closeOnClickModal="false"
    >
      <div class="open-free-gift-wrap">
        <div class="yanhua" v-if="showYanhua"></div>
        <div class="wrap-open-free">
          <div class="open-free-gift">
              <div class="circle-light"></div>
              <div class="info-box">
                <div>
                  <div class="title">{{ $t('worldCup.treasureChest.title') }} </div>
                  <div class="info">{{ $t('worldCup.treasureChest.info') }}</div>
                  <div class="type-img"></div>
                  <div class="btn" @click="openFreeBox">
                    <p>{{ $t('worldCup.openBtnTitle')}} X 10</p>
                    <p>Free</p>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script type="text/babel">
import MtPopup from '@/components/popup/index'
import CountDown from '@/views/components/countDown'
import WorldCupHeader from '@/views/components/world-cup-header'
import { getWorldCupParams, jumpPayment, worldCupJumpParams, formatTime, worldCupIsFlipContry } from '@/utils/index'
import { triggerService } from '@/utils/statisticalTool'
import Toast from '@/components/toast/index'
import {
  getFreeLotteryTimestamp,
  getFreeLotteryId,
  getActMain,
  openFree,
  getActDict,
  getActRule,
  getTimestamp,
  getActStage,
  getActPayedList,
  openPayed,
  getOpeningTimestamp,
  getAwardCoin,
  receiveAward,
  getWinnersList,
  getActTimes,
  getRechargeActId,
  openPresentted,
  getBarrageByLottery
} from '@/api/worldCup'
import JumpBonus from '@/views/components/jumpBonus'
import JumpGodness from '@/views/components/jumpGodness'

//  stage 3 领奖阶段   1收集阶段  2开奖阶段
//  act   1 为开始  2 进行中  3 已结束
const ACT_LIFECYCLE = {
  start: 1,
  end: 3,
  running: 2
}
const STAGE = {
  collect: 1, // 收集阶段
  lottery: 2, // 开奖阶段
  award: 3 // 领奖阶段
}

const aniImgs = [
  'https://h5.livuchat.com/staticProd/worldCup/img/ami/1.png',
  'https://h5.livuchat.com/staticProd/worldCup/img/ami/2.png',
  'https://h5.livuchat.com/staticProd/worldCup/img/ami/3.png',
  'https://h5.livuchat.com/staticProd/worldCup/img/ami/4.png',
  'https://h5.livuchat.com/staticProd/worldCup/img/ami/caidai.png'
]

export default {
  name: 'WorldCup',
  components: { MtPopup, CountDown, JumpBonus, WorldCupHeader, JumpGodness },
  filters: {
    formatTimeStr (val) {
      return val ? formatTime(val, 'YYYY-MM-DD hh:mm:ss', true) : ''
    },
    formatNum (num) {
      return (num + '').replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    },
    formatPayedCount (num) {
      if (num >= 100000) {
        return Math.floor(num / 1000) + 'k'
      } else {
        return num
      }
    },
    reverseStr (num) {
      return ('' + num).split('').reverse().join('')
    }
  },
  data () {
    return {
      ACT_LIFECYCLE,
      STAGE,
      isShowRules: false,
      isShowOpenGift: false,
      isShowOpenLoading: true,
      endBtnTime: null,
      endCollectTime: null,
      countDownData: null,
      openingTime: '',
      openingCountData: {
        hour: '',
        min: '',
        sec: ''
      },
      goodsDict: [],
      dictAll: {
        goodsDict: [],
        stageDict: []
      },
      collectionInfo: null,
      payedList: [],
      lotteryDict: {},
      goodsDictMap: {},
      selfPayed: null,
      selfInfo: null,
      selTypeData: {},
      getOpenGift: null,
      isOpenFree: true,
      ruleId: '',
      actLifeCycle: 3,
      stage: '',
      ruleMap: {},
      isShowFreeBtn: false,
      isShowOpenCountDown: false,
      awardCoin: null,
      allLoaded: false,
      freeLotteryId: '',
      isLoad: false,
      isLockOpenBtn: false,
      wrapperHeight: '',
      loading: false,
      immediateCheck: true,
      winnersListData: [],
      page: 1,
      isLoadFirst: false,
      isLoadMore: true,
      pageSize: 20,
      actTimes: {},
      isClickReceiveCoin: false,
      inLoadingShow: true,
      isShowCaidai: false,
      aniBoxIndex: 0,
      goodsSpecialEffect: {},
      showFlip: false,
      reChargeActId: '',
      isShowOpenFreeGift: false,
      commonParams: {},
      jumpParams: {},
      showYanhua: false,
      presenttedLotteryToken: '',
      addDanMuData: [],
      multiLangParams: {
        total: '20,000,000',
        lotteryIcon: '<img src="https://h5.livuchat.com/staticProd/worldCup/img/dimond.png" class="dimond">',
        cup: '<img src="https://h5.livuchat.com/staticProd/worldCup/img/gift/new/cup.png">',
        count: '500',
        shareCoin: '200,000'
      }
    }
  },
  methods: {
    closeRule () {
      this.isShowRules = false
    },
    closeOpenGift () {
      if (this.presenttedLotteryToken) {
        return
      }
      this.isShowOpenGift = false
      setTimeout(() => {
        this.isShowOpenLoading = true
      }, 1000)
    },
    openRule () {
      triggerService({ eventId: '105-10-3-4' })
      this.isShowRules = true
    },
    openRuleBox () {
      triggerService({ eventId: '105-10-3-17' })
      if (this.stage !== 1) {
        return
      }
      this.isShowRules = true
    },
    goPayment () {
      triggerService({ eventId: '105-10-3-2' })
      jumpPayment()
    },
    goRank () {
      triggerService({ eventId: '105-10-3-3' })
      this.$router.push({ name: 'WorldCupRank', query: this.jumpParams })
    },
    goFootBallFans () {
      triggerService({ eventId: '105-10-3-5' })
      this.$router.push({ name: 'WorldCupGod', query: this.jumpParams })
    },

    goWinners () {
      triggerService({ eventId: '105-10-3-15' })
      this.$router.push({ name: 'WorldCupWinners', query: this.jumpParams })
    },
    jumpBonus () {
      triggerService({ eventId: '105-10-3-16' })
      const activityId = this.reChargeActId || process.env.VUE_APP_WORLD_CUP_BONUS_ACTID
      const data = JSON.parse(JSON.stringify(this.commonParams))
      data.bizData.activityId = activityId
      data.activityId = activityId
      const query = worldCupJumpParams(data)
      this.$router.push({ name: 'WorldCupBonus', query })
    },
    freeEndCountDown () {
      this.isShowFreeBtn = true
    },
    collectEndCountDown () {
      this.refreshActAndStage()
    },
    openEndCountDown () {
      this.refreshActAndStage()
      this.getAwardCoinStatus()
    },
    updateCountOpeningDownData (data) {
      this.openingCountData = { ...data }
    },
    updateCountDownData (data) {
      this.countDownData = { ...data }
    },
    async getRewardCoin () { // 领取奖励
      this.isClickReceiveCoin = true
      let res = await receiveAward({
        ...this.commonParams
      })
      res = this.handleResData(res)
      if (res) {
        triggerService({ eventId: '105-10-3-14', free_name1: this.awardCoin.rewardCoins })
        this.refreshMain()
        this.getAwardCoinStatus()
      }
    },
    async openFreeGift () { // 开免费宝箱
      triggerService({ eventId: '105-10-3-8' })
      this.isShowOpenGift = true
      this.isOpenFree = true
      this.aniBoxIndex = 1
      this.addDanMuData = []
      setTimeout(() => {
        this.isShowOpenLoading = false
      }, 2000)
      try {
        let res = await openFree({
          ...this.commonParams,
          lotteryId: this.freeLotteryId,
          ruleId: this.ruleId
        })
        res = this.handleResData(res)
        if (res) {
          triggerService({
            eventId: '105-10-3-11',
            free_name1: this.freeLotteryId,
            free_name2: {
              award: res
            }
          })
          this.getOpenGift = res.results
          this.getShowCaidai(res)
          if (res.results.length > 0) {
            this.refreshMain()
          }
          this.getFreeBtnTimeStamp()
        }
      } catch (e) {
        console.log(e)
      }
    },
    openFreeBox () {
      const selfPayed = this.payedList.filter(item => item.id === this.presenttedLotteryId)[0]
      let idx = 0
      for (let i = 0; i < this.payedList.length; i++) {
        if (this.payedList[i].id === this.presenttedLotteryId) {
          idx = i
          break
        }
      }
      this.selfPayed = selfPayed
      this.aniBoxIndex = idx + 2
      this.isShowOpenGift = true
      this.isOpenFree = false
      this.isShowOpenFreeGift = false
      this.isShowOpenLoading = true
      this.showYanhua = false
      this.addDanMuData = []
      setTimeout(() => {
        this.isShowOpenLoading = false
      }, 2200)
      triggerService({ eventId: '105-10-3-19' })
      openPresentted({
        presenttedLotteryToken: this.presenttedLotteryToken,
        ruleId: this.ruleId,
        userId: this.commonParams.userId,
        activityId: this.commonParams.activityId,
        ...this.commonParams
      }).then(resData => {
        const res = this.handleResData(resData)
        if (res) {
          this.getOpenGift = res.results
          this.getShowCaidai(res, selfPayed.openTypeInfos[0], true)
          if (res.results.length > 0) {
            this.refreshMain()
            this.getPayedList()
          }
        }
      })
      this.presenttedLotteryToken = ''
    },
    handleFreeBox (presenttedLotteryToken, presenttedLotteryId) {
      if (presenttedLotteryToken) {
        this.presenttedLotteryToken = presenttedLotteryToken
        this.presenttedLotteryId = presenttedLotteryId
        triggerService({ eventId: '105-10-3-18' })
        setTimeout(() => {
          this.isShowOpenGift = false
          this.isShowOpenFreeGift = true
          setTimeout(() => {
            this.showYanhua = true
          }, 500)
        }, 4000)
      }
    },
    getDanMuData (data) {
      if (data.lotteryRecordId) {
        getBarrageByLottery({ ...this.commonParams, lotteryRecordId: data.lotteryRecordId, noLoading: 1 }).then(res => {
          this.addDanMuData = res
        })
      }
    },
    handleResData (res) {
      if (res.code === 200) {
        if (res.data && res.data.presenttedLotteryId) {
          this.handleFreeBox(res.data.presenttedLotteryToken, res.data.presenttedLotteryId)
        }
        this.getDanMuData(res.data)
        return res.data || true
      }
      if (res.code === 10000) {
        window.location.reload()
      }
      if (res.code === 11111) {
        jumpPayment()
      }
      Toast(res.message)
    },
    showCaidaiAni (isOpen) {
      if (!isOpen) {
        setTimeout(() => {
          this.isShowCaidai = true
          setTimeout(() => {
            this.isShowCaidai = false
          }, 1600)
        }, 1500)
      } else {
        setTimeout(() => {
          this.isShowCaidai = true
          setTimeout(() => {
            this.isShowCaidai = false
          }, 1500)
        }, 1400)
      }
    },
    getShowCaidai (resData, typeData, isOpen) {
      const goodsSpecialEffect = this.goodsSpecialEffect
      let hasGiftCaidai = false
      if (resData && resData.results) {
        for (let i = 0; i < resData.results.length; i++) {
          const itemObj = resData.results[i]
          if (itemObj.prizeType === 2 && goodsSpecialEffect[itemObj.goodsId]) {
            hasGiftCaidai = true
            break
          }
          if (itemObj.prizeType === 1 && !this.isOpenFree && typeData.showCost > 0 && typeData.showTimes > 0) {
            if (itemObj.goldNum > (typeData.showCost / typeData.showTimes)) {
              hasGiftCaidai = true
              break
            }
          }
        }
      }
      if (hasGiftCaidai) {
        this.showCaidaiAni(isOpen)
      }
    },
    async openGit (data, typeData, isOpen) { // 开付费宝箱
      if (this.isLockOpenBtn) return
      this.isLockOpenBtn = true
      this.getOpenGift = null
      let res = await openPayed(data)
      res = this.handleResData(res)
      this.isLockOpenBtn = false
      if (res) {
        this.getOpenGift = res.results
        this.getShowCaidai(res, typeData, isOpen)
        triggerService({
          eventId: '105-10-3-11',
          free_name1: data.lotteryId,
          free_name2: {
            times: typeData.showTimes,
            isPop: isOpen ? 0 : 1,
            award: res.results
          }
        })
        if (res.results.length > 0) {
          this.refreshMain()
          this.getPayedList()
        }
      }
    },
    openBtnTriggerService (isOpen, typeData, selfPayed) {
      if (typeData.showTimes === 1) { // 开一次
        triggerService({ eventId: isOpen ? '105-10-3-9' : '105-10-3-12', free_name1: selfPayed.id })
      } else {
        triggerService({ eventId: isOpen ? '105-10-3-10' : '105-10-3-13', free_name1: selfPayed.id })
      }
    },
    openClick (isOpen, typeData, selfPayed, idx) {
      this.aniBoxIndex = idx + 2
      const data = {
        ...this.commonParams,
        openType: typeData.id,
        lotteryId: selfPayed.id,
        ruleId: this.ruleId
      }
      this.isOpenFree = false
      this.addDanMuData = []
      /**
       *  如果金币不足跳充值页面
       *
       */
      // 金币不足
      if ((this.selfInfo.balance && typeData.showCost && typeData.showTimes && (this.selfInfo.balance < typeData.showCost))) {
        Toast({ message: this.$t('worldCup.gold_inadequate') })
        setTimeout(() => {
          this.goPayment()
        }, 1000)
        return
      }
      if (isOpen) {
        this.openBtnTriggerService(true, typeData, selfPayed)
        this.openGit(data, typeData, isOpen)
        this.isShowOpenGift = true
        this.selfPayed = selfPayed
        this.selTypeData = typeData
      } else {
        if (this.presenttedLotteryToken) {
          return
        }
        this.openBtnTriggerService(false, typeData, selfPayed)
        this.openGit(data, typeData, isOpen)
      }
      this.isShowOpenLoading = true
      setTimeout(() => {
        this.isShowOpenLoading = false
      }, 2200)
    },
    async refreshMain () {
      const self = this
      const resActMain = await getActMain({ ...this.commonParams })
      if (resActMain) {
        self.collectionInfo = resActMain.collectionInfo
        self.selfInfo = resActMain.selfInfo
      }
    },
    async refreshActAndStage () {
      const res = await getActStage({
        ...this.commonParams
      })
      if (res) {
        this.actLifeCycle = res.lifecycle
        this.stage = res.stage
        this.loadOtherData()
      }
    },
    async getFreeBtnTimeStamp () {
      const resTimestamp = await getTimestamp({
        ...this.commonParams,
        lotteryId: this.freeLotteryId
      })
      if (resTimestamp) {
        this.isShowFreeBtn = false
        this.endBtnTime = resTimestamp
      }
    },
    async getFreeLotteryTimestampData () {
      const resTimestamp = await getFreeLotteryTimestamp({
        ...this.commonParams,
        lotteryId: this.freeLotteryId
      })
      if (resTimestamp) {
        this.endCollectTime = resTimestamp
      }
    },
    async getPayedList () {
      const resPayedList = await getActPayedList({
        ...this.commonParams
      })
      this.payedList = resPayedList || []
    },
    async getAwardCoinStatus () {
      // 领奖阶段
      const resAwardCoin = await getAwardCoin({
        ...this.commonParams
      })
      if (resAwardCoin) {
        this.awardCoin = resAwardCoin
      }
    },
    async loadOtherData () {
      const stage = this.stage
      if (stage === this.STAGE.lottery) {
        // 开奖阶段
        const resOpenTimesstamp = await getOpeningTimestamp({
          ...this.commonParams
        })
        this.openingTime = resOpenTimesstamp
      } else if (stage === this.STAGE.collect) {
        // 收集阶段
        this.getPayedList()
        this.getFreeBtnTimeStamp()
        this.getFreeLotteryTimestampData()
      } else if (stage === this.STAGE.award) {
        this.getAwardCoinStatus()
      }

      if (!stage || this.actLifeCycle === this.ACT_LIFECYCLE.end) {
        this.loadFirstListData()
      }
    },
    init () {
      const self = this
      self.showFlip = worldCupIsFlipContry(this.$i18n.locale)
      const commonParams = getWorldCupParams()
      this.commonParams = commonParams
      this.jumpParams = worldCupJumpParams(commonParams)
      getActDict(commonParams).then((res) => {
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
        self.lotteryDict = lotteryDict
        self.goodsSpecialEffect = goodsSpecialEffect
      })
      getActTimes(commonParams).then(res => {
        if (res) {
          this.actTimes = res
        }
      })
      getRechargeActId({}).then(res => {
        if (res) {
          this.reChargeActId = res
        }
      })
      Promise.all([
        getFreeLotteryId(commonParams),
        getActStage(commonParams)
      ]).then((res) => {
        self.isLoad = true
        if (res && res[0]) {
          self.freeLotteryId = res[0]
        }
        if (res && res[1]) {
          self.actLifeCycle = res[1].lifecycle
          self.stage = res[1].stage
        }
        self.loadOtherData()
      })
      getActRule(commonParams).then(res => {
        if (res) {
          // 规则
          const ruleRes = res
          self.ruleId = ruleRes.id
          const ruleMap = {}
          if (ruleRes.items && ruleRes.items.length > 0) {
            ruleRes.items.forEach((obj) => {
              ruleMap[obj.goodsId] = obj.needMinCount
            })
          }
          self.ruleMap = ruleMap
        }
      })
      getActMain(commonParams).then(res => {
        if (res) {
          self.collectionInfo = res.collectionInfo
          self.selfInfo = res.selfInfo
        }
      })
      window.onload = function () {
        setTimeout(() => {
          aniImgs.forEach(imgUrl => {
            var imgObj = new Image()
            imgObj.src = imgUrl
          })
        }, 2000)
      }
    },
    async loadData (page) {
      const res = await getWinnersList({ ...this.commonParams, pageNum: page, pageSize: this.pageSize })
      if (res.length < this.pageSize) {
        this.isLoadMore = false
      }
      return res
    },
    async loadFirstListData () {
      const res = await this.loadData(this.page)
      this.isLoadFirst = true
      if (res && res.length > 0) {
        this.page += 1
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
        this.winnersListData = res
      }
    },
    async loadMore () {
      if (!this.isLoadMore) {
        return
      }
      this.loading = true
      const res = await this.loadData(this.page)
      this.loading = false
      if (res && res.length > 0) {
        this.page += 1
        this.winnersListData = [...this.winnersListData, ...res]
      }
    }
  },
  mounted () {
    this.init()
    triggerService({ eventId: '105-10-3-1' })
  }
}
</script>
<style lang="less">
@import url('./index.less');
</style>
