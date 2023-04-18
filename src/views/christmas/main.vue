<template>
  <div :class="[showFlip && 'horizontal-flip']">
    <div :class="['page-word-cup']" v-if="isLoad">
      <main-header :isLoad="isLoad"
      :goodsDictMap="goodsDictMap"
      :goodsSpecialEffect="goodsSpecialEffect"
      :lotteryDict="lotteryDict"
      :selfInfo="selfInfo"
      :collectionInfo="collectionInfo"
      :commonParams="commonParams"
      :addDanMuData="addDanMuData"
      @goBackPack="goBackPack"
      @openRule="openRule" @goRank="goRank" @goPayment="goPayment"/>
      <div v-if="isLoad && actLifeCycle === ACT_LIFECYCLE.running && stage" ref="scrollRef">
        <div class="free-wrap">
          <div class="free-box">
            <div class="gift-pkg-box">
              <img :class="[isShowOpenAni ? 'show': '']" src="https://h5.livuchat.com/staticProd/2022_christmas/img/ani/box.png" alt="">
            </div>
            <div class="free-tips">
                <div class="swiper2">
                    <div class="swiper-wrapper" ref="swiperWrapper">
                        <div class="swiper-slide" v-for="item in swiperData" :key="item.lotteryRecordDetailId">
                            <div class="item" :key="item.lotteryRecordDetailId">
                              <div class="gold-info">
                                  <img :src="item.headImg || 'https://h5.livuchat.com/staticProd/worldCup/img/user.png'" alt="" onerror="javascript:this.src='https://h5.livuchat.com/staticProd/worldCup/img/user.png'"  />
                                <span>{{$t('christmas2022.danmuItem', {
                                  username: item.userName,
                                  goldNum: item.goldNum
                                })}}</span>
                                  <img src="https://h5.livuchat.com/staticProd/2022_christmas/img/coin.png" alt="" />
                              </div>
                            </div>
                        </div>
                    </div>
              </div>
            </div>
            <div class="top" @click="openRuleBox">
              <div v-if="stage === STAGE.collect" class="info">
                {{ $t('worldCup.timeLeft') }}
              </div>
              <ul class="count-down" v-if="stage === STAGE.collect && endCollectTime">
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
              <div class="act-end-info"  v-if="stage !== STAGE.collect">
                {{ $t('christmas2022.collectEnd') }}
              </div>
            </div>
            <!-- 礼物展示 -->
            <div v-if="isShowOpenAni">
                <div class="ani-gift" @click="openRuleBox">
                  <ul class="gift" v-if="ruleMap && collectionInfo">
                    <li :class="['type', goodsDictMap[g] && (goodsDictMap[g].indexOf('6.png') !== -1 ||  goodsDictMap[g].indexOf('5.png') !== -1) ? 'special': '']" v-for="(g) in Object.keys(ruleMap)" :key="g">
                      <img :src="goodsDictMap[g]" />
                    </li>
                  </ul>
                  <div class="sun-bg"></div>
                </div>
            </div>

            <div :class="['gift-wrap', isShowOpenAni ? 'show': '']" @click="openRuleBox">
              <ul class="gift" v-if="ruleMap && collectionInfo">
                <li :class="['type', goodsDictMap[g] && collectionInfo.selfLeftCollecttedGoodsIdCountMap[g] && (goodsDictMap[g].indexOf('6.png') !== -1 ||  goodsDictMap[g].indexOf('5.png') !== -1) ? 'special': '']" v-for="(g) in Object.keys(ruleMap)" :key="g">
                  <img :src="goodsDictMap[g]" />
                  <img
                    class="cover"
                    src="https://h5.livuchat.com/staticProd/2022_christmas/img/gift/cover2.png"
                    v-if="!collectionInfo.selfLeftCollecttedGoodsIdCountMap[g]"
                  />
                  <!-- <img src="https://h5.livuchat.com/staticProd/worldCup/img/gift/new/circle1.png" class="circle" alt="" v-if="(collectionInfo.selfLeftCollecttedGoodsIdCountMap[g])"> -->
                </li>
              </ul>
            </div>
          </div>
          <!-- 收集阶段开奖按钮 -->
          <div
              class="bottom"
              v-if="
                stage === STAGE.collect &&
                collectionInfo &&
                !collectionInfo.succeeded
              "
            >
              <div class="button" v-if="endBtnTime && endBtnTime <= Date.now() " @click.stop="openFreeGift">
                {{ $t('christmas2022.freeBoxName', {box_name: $t('christmas2022.sock') }) }}
              </div>
              <div class="cover-btn" v-if="!isShowFreeBtn && endBtnTime > Date.now()">
                <p>
                  <count-down
                    :endTime="endBtnTime"
                    :showTime="true"
                    @endCountDownData="freeEndCountDown"
                  ></count-down>
                </p>
                <p> {{ $t('christmas2022.freeBoxName', {box_name: $t('christmas2022.sock') }) }}</p>
              </div>
            </div>
        </div>
        <!-- 收集阶段付费宝箱 -->
        <div class="pay-box-wrap" v-if="isLoad &&actLifeCycle === ACT_LIFECYCLE.running &&stage === STAGE.collect">
          <div class="info">
            <p>{{ $t('christmas2022.collectMoreInfo', { items_name:  $t('christmas2022.itemName')}) }}</p>
            <p>{{ $t('christmas2022.actInfo', {total: multiLangParams.shareCoin, items_name:  $t('christmas2022.itemName'), box_name: $t('christmas2022.sock')}) }}</p>
          </div>
          <div class="pay-box-list">
            <div class="item" v-for="(p, idx) in payedList" :key="p.id">
              <div class="type-img"><img :src="lotteryDict[p.id]" /></div>
              <div class="info-tips">{{ $t('christmas2022.boxTopInfo', {items_name:  $t('christmas2022.itemName')}) }}</div>
              <div class="gift-wrap">
                <div>
                  <div><i>{{ $t('worldCup.winUp') }}</i></div>
                  <div><span>{{ p.maxValuePerOnce | formatNum }}</span></div>
                </div>
                <ul class="gift-small" v-if="Object.keys(ruleMap).length > 0">
                  <li :class="['type', goodsDictMap[g] && (goodsDictMap[g].indexOf('6.png') !== -1 ||  goodsDictMap[g].indexOf('5.png') !== -1) ? 'special': '' ? 'special': '']" v-for="g in Object.keys(ruleMap)" :key="g">
                    <img :src="goodsDictMap[g]" />
                    <span>x<i>{{ (p.alreadyOpenedGoodsIdCountMap[g] || 0) | formatPayedCount }}</i></span>
                  </li>
                </ul>
              </div>
              <div class="pay-box-btn">
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
                    <span><i v-if="t.showTimes !== 1 ">{{t.showTimes}}</i>
                      <i v-if="t.showTimes !== 1 ">x</i>
                      <i>{{t.showCost / t.showTimes}}</i>
                    </span>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <jump-godness @goFootBallFans="goFootBallFans" v-if="isLoad" :noFixed="true"></jump-godness>
      </div>
      <div v-if="actLifeCycle === ACT_LIFECYCLE.end || !stage" :class="['act-end']" >
        <div class="info">{{ $t('worldCup.worldCupBonus.actEnd') }}</div>
      </div>
      <jump-godness @goFootBallFans="goFootBallFans" v-if=" false && isLoad"></jump-godness>
      <jump-bonus @jumpBonus="jumpBonus" v-if=" isLoad"></jump-bonus>
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
          <span class="back-btn closeRule" @click="closeRule">
            <img src="https://h5.livuchat.com/staticProd/2022_christmas/img/close2.png" alt="">
          </span>
        </div>
        <div class="rule-box">
          <dl>
            <dt>{{ $t('worldCup.rules.startTime') }} <span v-if="actTimes.startAndEnd">{{actTimes.startAndEnd.startTimestamp | formatTimeStr}}</span></dt>
            <dt>{{ $t('worldCup.rules.endTime') }}<span v-if="actTimes.startAndEnd">{{actTimes.startAndEnd.endTimestamp | formatTimeStr}}</span></dt>
            <dt>{{$t('christmas2022.rule1', {total: multiLangParams.shareCoin, items_name:  $t('christmas2022.itemName'), box_name: $t('christmas2022.sock')})}}</dt>
            <dt>{{$t('christmas2022.rule2', {hour: 12, items_name:  $t('christmas2022.itemName'), box_name: $t('christmas2022.sock')})}}</dt>
            <dt>{{$t('christmas2022.rule3', {hour: 12, items_name:  $t('christmas2022.itemName'), box_name: $t('christmas2022.sock')})}}</dt>
            <dt>{{$t('christmas2022.rules4')}}</dt>
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
      <div class="open-gift-wrap">
        <div class="caidai" v-if="isShowCaidai"></div>
        <div class="snow"   v-if="isShowAni"></div>
        <div :class="['ani-box2', 'box' + (aniBoxIndex)]"  v-if="isShowAni"></div>
        <div class="open-gift gift-info">
          <div>
            <div class="gift-box" v-if="isShowAni">
              <div class="sun" v-if="getOpenGift"></div>
              <div>
                <div class="header">
                <span class="back-btn" @click="closeOpenGift">
                  <img src="https://h5.livuchat.com/staticProd/2022_christmas/img/ani/close.png" alt="">
                </span>
              </div>
                <div class="title">
                  {{ $t('worldCup.congratulation') }}
                </div>
                <div class="get-gift" v-if="getOpenGift && !isShowOpenLoading">
                  <template v-for="(item, idx) in getOpenGift" >
                    <div :key="idx" v-if="item.prizeType === 1" :class="['gift-item','flash-light', 'coin', getOpenGift.length === 1 ? 'gold': '', item.goldNum < 100 ? 'coin1': item.goldNum >= 100 && item.goldNum < 500 ? 'coin2': 'coin3']">
                      <span>{{ item.goldNum }} </span>
                      <div class="flash-light-box"></div>
                    </div>
                    <div
                      :class="['gift-item', 'flash-light', getOpenGift.length === 1? 'single': '', goodsDictMap[item.goodsId] && (goodsDictMap[item.goodsId].indexOf('6.png') !== -1 ||  goodsDictMap[item.goodsId].indexOf('5.png') !== -1) ? 'special': '']"
                      v-if="item.prizeType === 2"
                      :key="idx"
                    >
                      <div class="flash-light-box"></div>
                      <img :src="goodsDictMap[item.goodsId]" alt="" />
                    </div>
                    <div
                      :class="['gift-item', 'flash-light', 'goods', getOpenGift.length === 1? 'single': '',  item.goldNum < 100 ? 'gift1': item.goldNum >= 100 && item.goldNum < 500 ? 'gift2': 'gift3']"
                      v-if="item.prizeType === 4"
                      :key="idx"
                      @click="handleGiftClick(item)"
                    >
                      <div class="flash-light-box"></div>
                      <img :src="goodsDictMap[item.goodsId]" alt="" />
                      <span>{{ item.goldNum }}</span>
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
            </div>
            <div
              class="gift-btn"
              v-if="!isOpenFree && selfPayed && selfPayed.openTypeInfos && isShowAni"
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
        <div class="coins" v-if="!isShowOpenFreeBoxOk"></div>
        <div class="snow lottery" v-if="!isShowOpenFreeBoxOk"></div>
        <div class="caidai lottery" v-if="!isShowOpenFreeBoxOk"></div>
        <div class="wrap-open-free">
          <div class="open-free-gift" v-if="!isShowOpenFreeBoxOk">
              <div class="top-info">
                <h5>Confgratulations</h5>
              </div>
              <div class="info-box">
                <div>
                  <div class="info">
                    <span v-if="firstOpenBox && firstOpenBox.results && firstOpenBox.results[0].goldNum">+{{firstOpenBox.results[0].goldNum}}</span>
                  </div>
                  <div class="btn-wrap">
                    <div class="btn" @click="openFreeBox" v-if="presenttedLotteryToken">
                      <p>{{$t('christmas2022.openNext')}}</p>
                    </div>
                    <div class="btn" v-else  @click="openFreeBoxOk">
                       <p>{{$t('christmas2022.openNext')}}</p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div class="info-ok-box" v-if="isShowOpenFreeBoxOk && !presenttedLotteryToken">
              <div class="info">
                <ul>
                   <li v-for="(key,idx) in Object.keys(unCollectGoods)" :key="idx" >
                    <img :src="unCollectGoods[key]"  alt="">
                   </li>
                </ul>
                <p>{{$t('christmas2022.unCollectInfo', {
                    items_name: $t('christmas2022.itemName')
                  })}}</p>
              </div>
              <div class="btn-wrap">
                <div class="btn" @click="openFreeBoxClose">
                  <p>{{$t('christmas2022.unCollectInfoOkBtn')}}</p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </mt-popup>
    <mt-popup
      v-model="isShowGift"
      class="rc-popup-box"
      :lockScroll="true"
      position="center"
    >
      <div class="gift-wrap-2">
        <div class="header">
          <span class="back-btn" @click="closeGift">
            <img src="https://h5.livuchat.com/staticProd/2022_christmas/img/ani/close.png" alt="">
          </span>
        </div>
        <div class="gift-box" v-if="selGift && goodsDictMap">
            <p><img src="" alt=""></p>
            <div class="info">
              <div class="item-wrap">
                 <span class="item">
                  <img :src="goodsDictMap[selGift.key || selGift.id]" alt="">
                  <i>{{selGift.right || selGift.goldNum}}</i>
                 </span>
              </div>
              <p>{{$t('christmas2022.popGiftInfo')}}</p>
              <div class="btn-wrap">
                    <div class="btn" @click="goGiftList">
                      <p>{{$t('christmas2022.popGoBtn')}}</p>
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
  getActTimes,
  getRechargeActId,
  getBarrageByLottery,
  canOpenGiftBox,
  getListForBarrageSpecial,
  openPresenttedGiftBox
} from '@/api/worldCup'

import JumpBonus from './components/jump-bonus.vue'

import JumpGodness from './components/jump-godness.vue'
import MainHeader from './components/main-header.vue'
import 'swiper/dist/css/swiper.css'
import Swiper from 'swiper'

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
  'https://h5.livuchat.com/staticProd/2022_christmas/img/ani/1b.png',
  'https://h5.livuchat.com/staticProd/2022_christmas/img/ani/2b.png',
  'https://h5.livuchat.com/staticProd/2022_christmas/img/ani/3b.png',
  'https://h5.livuchat.com/staticProd/2022_christmas/img/ani/4b.png',
  'https://h5.livuchat.com/staticProd/2022_christmas/img/ani/5c.png',
  'https://h5.livuchat.com/staticProd/2022_christmas/img/ani/coins.png',
  'https://h5.livuchat.com/staticProd/worldCup/img/ami/caidai.png'
]

export default {
  name: 'WorldCup',
  components: {
    MtPopup,
    CountDown,
    JumpBonus,
    MainHeader,
    JumpGodness
  },
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
      isShowOpenLoading: false,
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
      isShowOpenFreeGift: false, // 赠送测抽奖
      commonParams: {},
      jumpParams: {},
      showYanhua: false,
      presenttedLotteryToken: '',
      addDanMuData: [],
      specialBarrageList: [],
      multiLangParams: {
        total: '10,000,000',
        lotteryIcon: '<img src="https://h5.livuchat.com/staticProd/worldCup/img/dimond.png" class="dimond">',
        cup: '<img src="https://h5.livuchat.com/staticProd/worldCup/img/gift/new/cup.png">',
        count: '500',
        shareCoin: '200,000'
      },
      isShowAni: false,
      isShowOpenAni: false,
      isShowOpenFreeBoxOk: false,
      unCollectGoods: {},
      isShowGift: false,
      selGift: null,
      isFirstGetGift: false,
      swiperData: [],
      nowIndex: 0,
      firstOpenBox: null // 集齐之后自动开奖
    }
  },
  methods: {
    closeRule () {
      this.isShowRules = false
    },
    closeGift () {
      triggerService({ eventId: this.isFirstGetGift ? '105-10-3-21' : '105-10-3-25' })
      this.isShowGift = false
    },
    closeOpenGift () {
      this.isShowAni = false
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
      this.$router.push({ name: 'ChristmasRank', query: this.jumpParams })
    },
    goFootBallFans () {
      triggerService({ eventId: '105-10-3-5' })
      this.$router.push({ name: 'ChristmasVideos', query: this.jumpParams })
    },
    goBackPack () {
      triggerService({ eventId: '105-10-3-29' })
      this.$router.push({ name: 'Backpack', query: this.jumpParams })
    },
    goGiftList () {
      triggerService({ eventId: this.isFirstGetGift ? '105-10-3-20' : '105-10-3-24' })
      this.$router.push({ name: 'Backpack', query: this.jumpParams })
    },
    jumpBonus () {
      triggerService({ eventId: '105-10-3-16' })
      const activityId = this.reChargeActId || process.env.VUE_APP_WORLD_CUP_BONUS_ACTID
      const data = JSON.parse(JSON.stringify(this.commonParams))
      data.bizData.activityId = activityId
      data.activityId = activityId
      const query = worldCupJumpParams(data)
      this.$router.push({ name: 'ChristmasBonus', query })
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
    handleGiftClick (g) {
      this.selGift = {
        key: g.goodsId,
        right: g.goldNum
      }
      this.isShowGift = true
      triggerService({ eventId: '105-10-3-22', free_name1: g })
      triggerService({ eventId: '105-10-3-23', free_name1: g })
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
      this.isShowAni = true
      this.addDanMuData = []
      setTimeout(() => {
        this.isShowOpenLoading = false
      }, 2500)
      setTimeout(async () => {
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
      }, 2000)
    },
    openFreeBoxClose () {
      triggerService({ eventId: '105-10-3-29' })
      this.isShowOpenFreeGift = false
      setTimeout(() => {
        this.isShowOpenFreeBoxOk = false
      }, 1000)
    },
    openFreeBoxOk () {
      triggerService({ eventId: '105-10-3-27' })
      this.isShowOpenFreeBoxOk = true
      triggerService({ eventId: '105-10-3-30' })
    },
    openFreeBox () {
      if (!this.presenttedLotteryToken) {
        return
      }
      this.isShowOpenFreeBoxOk = true
      triggerService({ eventId: '105-10-3-28' })
      openPresenttedGiftBox({
        presenttedLotteryToken: this.presenttedLotteryToken,
        ruleId: this.ruleId,
        userId: this.commonParams.userId,
        activityId: this.commonParams.activityId,
        ...this.commonParams
      }).then(resData => {
        if (resData.data) {
          const res = resData.data
          this.firstOpenBox = res
          setTimeout(() => {
            this.isShowOpenFreeBoxOk = false
            this.presenttedLotteryToken = res.presenttedLotteryToken || ''
          }, 1000)
          setTimeout(() => {
            if (res) {
              this.refreshMain()
              this.getSpecialDanmu()
            }
          }, 4000)
        } else {
          setTimeout(() => {
            this.openFreeBoxClose()
          }, 2000)
          Toast(resData.message)
        }
      })
    },
    handleFreeBox (presenttedLotteryToken, presenttedLotteryId) {
      if (presenttedLotteryToken) {
        this.presenttedLotteryToken = presenttedLotteryToken
        this.presenttedLotteryId = presenttedLotteryId
        setTimeout(() => {
          openPresenttedGiftBox({
            presenttedLotteryToken: presenttedLotteryToken,
            ruleId: this.ruleId,
            userId: this.commonParams.userId,
            activityId: this.commonParams.activityId,
            noLoading: 1,
            ...this.commonParams
          }).then((res) => {
            if (res.data) {
              this.firstOpenBox = res.data
              this.presenttedLotteryToken = res.data.presenttedLotteryToken
              this.isShowOpenGift = false
              this.getOpenGift = null
              this.isShowOpenAni = true
              document.documentElement.scrollTop = 0
              setTimeout(() => {
                this.isShowOpenAni = false
                this.isShowOpenFreeGift = true
                triggerService({ eventId: '105-10-3-26' })
                this.refreshMain()
                this.getSpecialDanmu()
              }, 3000)
            } else {
              Toast(res.message)
              setTimeout(() => {
                this.openFreeBoxClose()
              }, 2000)
            }
          })
        }, 4000)
      }
    },
    getSpecialDanmu () {
      getListForBarrageSpecial({
        ...this.commonParams,
        noLoading: 1
      }).then(res => {
        this.specialBarrageList = res
        this.nowIndex = 0
      })
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
        if (res.data && res.data.presenttedLotteryId) { // 开奖
          this.handleFreeBox(res.data.presenttedLotteryToken, res.data.presenttedLotteryId)
        }
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
      this.getOpenGift = null
      const startTime = Date.now()
      let res = await openPayed(data)
      res = this.handleResData(res)

      const nowTime = Date.now()
      if (nowTime - startTime < 2500) {
        setTimeout(() => {
          this.isLockOpenBtn = false
        }, 2500)
      } else {
        setTimeout(() => {
          this.isLockOpenBtn = false
        }, nowTime - startTime)
      }
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
        if (!localStorage.getItem('christmas2022_first_get_gift') && !res.presenttedLotteryToken) {
          const results = res.results
          if (results && results.length > 0) {
            var tmp = results.filter(item => item.prizeType === 4)
            if (tmp.length > 0) {
              // 第一次开出礼物
              localStorage.setItem('christmas2022_first_get_gift', true)
              triggerService({ eventId: '105-10-3-19', free_name1: tmp[0] })
              this.isFirstGetGift = true
              const g = tmp[0]
              this.selGift = {
                key: g.goodsId,
                right: g.goldNum
              }
              setTimeout(() => {
                this.isShowGift = true
              }, 5000)
            }
          }
        }
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
      /**
       *  如果金币不足跳充值页面
       */
      // 金币不足
      if ((this.selfInfo.balance && typeData.showCost && typeData.showTimes && (this.selfInfo.balance < typeData.showCost))) {
        Toast({ message: this.$t('worldCup.gold_inadequate') })
        setTimeout(() => {
          this.closeOpenGift()
          this.goPayment()
        }, 1000)
        this.isLockOpenBtn = false
        return
      }
      if (this.isLockOpenBtn) return

      this.isLockOpenBtn = true
      this.aniBoxIndex = idx + 2
      const data = {
        ...this.commonParams,
        openType: typeData.id,
        lotteryId: selfPayed.id,
        ruleId: this.ruleId
      }
      this.isOpenFree = false
      this.addDanMuData = []

      if (isOpen) {
        this.isShowAni = true
        this.openBtnTriggerService(true, typeData, selfPayed)
        this.openGit(data, typeData, isOpen)
        this.isShowOpenGift = true
        this.selfPayed = selfPayed
        this.selTypeData = typeData
        this.isShowOpenLoading = true
        setTimeout(() => {
          this.isShowOpenLoading = false
        }, 2200)
      } else {
        if (this.presenttedLotteryToken) {
          return
        }
        this.openBtnTriggerService(false, typeData, selfPayed)
        this.openGit(data, typeData, isOpen)
        this.isShowAni = false
        setTimeout(() => {
          this.isShowAni = true
        })
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
        const tmp = {}
        // 找没有集齐的物品
        const goodsIdCountMap = resActMain.collectionInfo.selfLeftCollecttedGoodsIdCountMap || {}
        Object.keys(goodsIdCountMap).map(key => {
          if (goodsIdCountMap[key] === 0 && this.ruleMap[key]) {
            tmp[key] = this.goodsDictMap[key]
          }
        })
        self.unCollectGoods = tmp
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
        setTimeout(() => {
          this.initSwiper()
        }, 1000)
      } else if (stage === this.STAGE.award) {
        this.getAwardCoinStatus()
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
              ruleMap[obj.goodsId] = true
            })
          }
          self.ruleMap = ruleMap
          setTimeout(() => {
            canOpenGiftBox({
              ruleId: this.ruleId,
              noLoading: 1,
              ...commonParams
            }).then(res => {
              const data = res.data
              if (data && data.presenttedLotteryToken) {
                // 需要开奖
                this.handleFreeBox(data.presenttedLotteryToken, data.presenttedLotteryId)
              }
            })
          }, 2000)
        }
      })
      getActMain(commonParams).then(res => {
        if (res) {
          self.collectionInfo = res.collectionInfo
          self.selfInfo = res.selfInfo
        }
      })
      this.getSpecialDanmu()
      window.onload = function () {
        var count = 1
        setTimeout(() => {
          aniImgs.forEach(imgUrl => {
            var imgObj = new Image()
            imgObj.src = imgUrl
            imgObj.onload = function () {
              count++
              if (count === aniImgs.length) {
                // 图片加载完了
              }
            }
          })
        }, 3000)
      }
    },
    initSwiper () {
      const self = this
      this.reSetSwiperData(0)
      this.$nextTick(() => {
        const swiper = new Swiper('.swiper2', {
          direction: 'vertical',
          autoplay: true,
          delay: 1000,
          speed: 200,
          // effect: 'fade',
          allowTouchMove: false,
          // loop: true,
          loopedSlides: 3,
          observer: true, // 动态监听
          // observeParents: true,
          on: {
            transitionEnd (swiper) {
              self.nowIndex += 1
              if (self.nowIndex > 0 && self.nowIndex % 3 === 0) {
                self.reSetSwiperData(self.nowIndex)
              }
            }
          }
        })
        this.swiper = swiper
      })
    },
    reSetSwiperData (nowIndex) {
      let leftp = nowIndex - 1 < 0 ? 0 : nowIndex - 1
      let rightp = leftp + 2
      const lastIndex = this.specialBarrageList.length - 1
      if (rightp > lastIndex) {
        rightp = lastIndex
        leftp = lastIndex - 2 < 0 ? 0 : lastIndex - 2
      }
      this.swiperData = this.specialBarrageList.slice(leftp, rightp + 1)
      this.$nextTick(() => {
        this.swiper && this.swiper.update()
      })
      if (!(nowIndex === 0 || nowIndex === lastIndex)) {
        this.swiper && this.swiper.slideTo(0, false)
      }
    }
  },
  mounted () {
    this.init()
    triggerService({ eventId: '105-10-3-1' })
  }
}
</script>
<style lang="less" scope>
@import url('./style/index.less');
</style>
