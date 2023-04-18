<template>
  <div :class="['page-rank', showFlip && 'horizontal-flip']">
    <div class="swiper">
      <div class="header">
        <div class="title">
          <span class="current rank">{{$t('worldCup.rank')}}</span>
          <span class="history">{{$t('worldCup.history')}}</span>
        </div>
      </div>
      <div class="r fx-vc fx-help" v-if="iShowHelp">
            <div class="btn hover btn-help" @click="btnHelp"></div>
          </div>
      <div class="swiper-wrapper">
        <div class="swiper-slide ">
          <rank-activiey :isBtnHelp="isBtnHelp" @closeHelp="getHelp" @step="getStep" @myData="getMyData"></rank-activiey>
          <div class="orank myrank" v-if="(myData) && (step !== 2)">
            <div class="inner fx-vb">
                <div class="idx" :class="[`idx-` + myData.rank]" v-if="(step == 3)">
                  {{ myrank }}
                  <span class="cup"></span>
                </div>
                <div class="idx" v-else>
                  {{ myrank }}
                </div>
                <div class="avatar">
                  <img @error="imgErr" :src="myData.headImg | imgEdit" alt="">
                </div>
                <div class="detail">
                  <div class="name">{{ myData.userName }}<span class="icon">
                      <img :src="'https://h5.livuchat.com/static/images/countryFlag/' + ($countryCode[[0, 1, 2, 3, 4, 5].includes(myData.countryId) ? myData.countryId = 6 : myData.countryId].short.toLowerCase()) + '.png'" />
                    </span>
                  </div>
                  <div class="info">
                    <strong v-if="myData.coin">{{$t('cargame.twon')}}: {{ myData.coin | formatNumberDot }}</strong>
                    <strong v-else>0</strong>
                  </div>
                </div>
              <div class="winNum" v-if="myData.rewardCoin">
                <strong class="number">+{{ myData.rewardCoin | formatNumberDot }}</strong>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="no-data" v-if="isLoadHistory && historyList.length === 0"><span>{{$t('worldCup.noData')}}</span></div>
          <div class="history-content" v-if="historyList.length > 0">
            <div>
              <div :class="['item',  h.giftBoxTotalGold ? 'box': '']" v-for="(h, i) in historyList" :key="i">
                 <span class="item-type">
                    <img :src="lotteryDict[h.lotteryId]" v-if="!h.giftBoxTotalGold" />
                    <img class="no-rotate" src="https://h5.livuchat.com/staticProd/20230109_luckybox/img/22222.png" v-else alt="">
                 </span>
                 <span class="show-times" v-if="h.showTimes > 1">x<i>{{h.showTimes}}</i></span>
                  <div class="date"><span>{{h.lottTimestamp | formatTimeStr }}</span></div>
                  <div class="get-gift" v-if="h.totalGold">
                    <div><span>{{$t('worldCup.coins')}}</span>:</div>
                    <div><span class="coins">
                      + <span>{{h.totalGold}}</span>
                    </span></div>
                  </div>
                  <div class="get-gift" v-if="h.giftBoxTotalGold">
                    <div><span>{{$t('christmas2022.superGift')}}</span>:</div>
                    <div><span class="coins">
                      + <span>{{h.giftBoxTotalGold}}</span>
                    </span></div>
                  </div>
                  <div class="get-gift" v-if="Object.keys(h.goodsIdCountMap).length > 0">
                    <div><span>{{$t('christmas2022.itemName')}}</span>:</div>
                    <div>
                      <ul class="gift-small goods">
                        <li  :class="[goodsDict[g] && goodsDict[g].indexOf('6.png') !== -1 ? 'special': '']" v-for="g in Object.keys(h.goodsIdCountMap)" :key="g">
                        <img :src="goodsDict[g]" alt="">
                        <span>x<i>{{h.goodsIdCountMap[g]}}</i></span>
                      </li></ul>
                    </div>
                  </div>
                  <div class="get-gift goods" v-if="Object.keys(h.giftGoodsIdCountMap).length > 0">
                    <div><span>{{$t('christmas2022.gift')}}</span>:</div>
                    <div>
                      <ul class="gift-small gift">
                        <li :class="['gift', h.giftGoodsIdCountMap[g].right < 100 ? 'gift1': h.giftGoodsIdCountMap[g].right >= 100 && h.giftGoodsIdCountMap[g].right < 500 ? 'gift2': 'gift3'  ]" v-for="g in Object.keys(h.giftGoodsIdCountMap)" :key="g" @click="handleGiftClick(g, h.giftGoodsIdCountMap[g])">
                        <img :src="goodsDict[g]" alt="">
                        <span>x<i>{{h.giftGoodsIdCountMap[g].left}}</i></span>
                        <!-- <span class="gift-coins"><i>{{h.giftGoodsIdCountMap[g].right}}</i></span> -->
                      </li></ul>
                    </div>
                  </div>
                  <div class="get-gift" v-if="Object.keys(h.goodsIdCountMap).length === 0 && !h.totalGold && Object.keys(h.giftGoodsIdCountMap).length === 0">
                    <div></div>
                    <div></div>
                  </div>
                  <div class="gift-bg"></div>
              </div>
            </div>
            </div>
        </div>
      </div>

    </div>
    <mt-popup
      v-model="isShowGift"
      class="rc-popup-box"
      :lockScroll="true"
      position="center"
      :closeOnClickModal="false"
    >
      <div class="gift-wrap">
        <div class="header">
          <span class="back-btn" @click="closeGift">
            <img src="https://h5.livuchat.com/staticProd/2022_christmas/img/ani/close.png" alt="">
          </span>
        </div>
        <div class="gift-box" v-if="selGift && goodsDict">
            <p><img src="" alt=""></p>
            <div class="info">
              <div class="item-wrap">
                 <span :class="['item', selGift.right < 100 ? 'item-gift1': selGift.right >= 100 && selGift.right < 500 ? 'item-gift2': 'item-gift3' ]">
                  <img :src="goodsDict[selGift.key]" alt="">
                  <i>{{selGift.right}}</i>
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
import Swiper from 'swiper'
// import Country from '@/views/components/country'
import MtPopup from '@/components/popup/index'
import RankActiviey from './rankActiviey.vue'
import { getHistory, getActDict, getCollectActId } from '@/api/worldCup'
import { formatTime, getWorldCupParams, worldCupJumpParams, worldCupIsFlipContry } from '@/utils/index'
import 'swiper/dist/css/swiper.css'
import { triggerService } from '@/utils/statisticalTool'

export default {
  name: 'WorldCupRank',
  data () {
    return {
      goodsDict: {},
      lotteryDict: {},
      isLoadHistory: false,
      historyList: [],
      rankList: [],
      isLoadRank: false,
      wrapperHeight: '',
      loading: false,
      immediateCheck: true,
      isLoadMore: true,
      start: 1,
      end: 20,
      pageSize: 20,
      showFlip: false,
      selGift: null,
      isShowGift: false,
      isBtnHelp: false,
      myData: null,
      step: 0,
      iShowHelp: true
    }
  },
  computed: {
    myrank () {
      const { myData } = this
      if (!myData) return ''
      if (myData.rank === 0) {
        return '150+'
      }
      if (myData.rank < 10) {
        return '0' + myData.rank
      } else if (myData.rank <= 150) {
        return myData.rank
      } else {
        return '150+'
      }
    }
  },
  components: {
    // Country,
    MtPopup,
    RankActiviey
  },
  filters: {
    formatTimeStr (val) {
      return formatTime(val, 'YYYY-MM-DD hh:mm:ss', true)
    }
  },
  methods: {
    imgErr (e) {
      if (e.target) {
        e.target.style.display = 'none'
      }
    },
    getHelp () {
      this.isBtnHelp = false
    },
    getStep (data) {
      this.step = data
      console.log(this.step, 'step')
    },
    getMyData (data) {
      this.myData = data
      console.log(this.myData, 'myData')
    },
    btnHelp () {
      const freeName = {
        1: '1',
        2: '2',
        3: '3'
      }
      this.isBtnHelp = true
      triggerService({ eventId: '105-14-2-1', freeName1: freeName[this.step] })
      console.log(this.isBtnHelp)
    },
    goBack () {
      this.$router.back()
    },
    goGiftList () {
      if (this.commonParams && this.commonParams.platformType === '4') {
        parent.postMessage({ type: 'backpack' }, '*')
      } else {
        triggerService({ eventId: '105-10-3-37', free_name1: this.selGift })
        this.$router.push({ name: 'Backpack', query: this.jumpParams })
      }
    },
    getDict (params) {
      getActDict(params).then(res => {
        const goodsDict = res.goodsDict || []
        const lotteryDict = res.lotteryDict || []
        const goodsDictMap = {}
        const lotteryDictMap = {}
        goodsDict.forEach(obj => {
          goodsDictMap[obj.id] = obj.icon
        })
        lotteryDict.forEach(obj => {
          lotteryDictMap[obj.id] = obj.icon
        })
        this.lotteryDict = lotteryDictMap
        this.goodsDict = goodsDictMap
      })
    },
    getHistoryList (params) {
      getHistory(params).then(res => {
        this.isLoadHistory = true
        this.historyList = res
      })
    },
    closeGift () {
      this.isShowGift = false
      triggerService({ eventId: '105-10-3-38', free_name1: this.selGift })
    },
    handleGiftClick (key, g) {
      this.selGift = { key, ...g }
      this.isShowGift = true
      triggerService({ eventId: '105-10-3-35', free_name1: this.selGift })
      setTimeout(() => {
        triggerService({ eventId: '105-10-3-36', free_name1: this.selGift })
      }, 1000)
    },
    getData (commonParams) {
      this.commonParams = commonParams
      this.jumpParams = worldCupJumpParams(commonParams)
      this.getDict({ ...commonParams, noLoading: 1 })
      this.getHistoryList({ ...commonParams, noLoading: 1 })
    },
    init () {
      const commonParams = getWorldCupParams()
      if (commonParams && (commonParams.activityId || (commonParams.bizData && commonParams.bizData.activityId))) {
        this.getData(commonParams)
      } else {
        // 获取主活动ID
        getCollectActId({}).then(res => {
          if (res) {
            commonParams.activityId = res
            commonParams.bizData = {
              activityId: res
            }
            this.getData(commonParams)
          }
        })
      }
      this.initSwiper()
      this.showFlip = worldCupIsFlipContry(this.$i18n.locale)
    },
    initSwiper () {
      const self = this
      const swiper = new Swiper('.swiper', {
        speed: 400,
        initialSlide: 0,
        spaceBetween: 6,
        autoplay: false,
        loop: false,
        observer: true, // 动态监听
        // observeParents: true,
        on: {
          click: function (el) {
            var target = el.target
            var dataset = target.dataset
            if (dataset.type && dataset.type === 'swiper-tab') {
              var index = +el.target.dataset.id
              swiper.slideTo(index, 600, false)
            }
          },
          slideChange: function () {
            if (this.activeIndex === 0) {
              self.iShowHelp = true
              triggerService({ eventId: '105-10-3-6', free_name1: 'rank' })
            } else {
              self.iShowHelp = false
              triggerService({ eventId: '105-10-3-7', free_name1: 'history' })
            }
          }
        },
        pagination: {
          el: '.title',
          type: 'custom',
          renderCustom: function (swiper, current, total) {
            var customPaginationHtml = ''
            var title = {
              0: self.$t('worldCup.rank'),
              1: self.$t('christmas2022.historyTab')
            }
            for (var i = 0; i < total; i++) {
              if (i === current - 1) {
                customPaginationHtml += `<span class="current" data-id="${i}" data-type="swiper-tab">${title[i]}</span>`
              } else {
                customPaginationHtml += `<span data-id="${i}" data-type="swiper-tab">${title[i]}</span>`
              }
            }
            return `<div>${customPaginationHtml}</div>`
          },
          paginationClickable: true
        }
      })
      this.swiper = swiper
    }
  },
  mounted () {
    this.init()
    triggerService({ eventId: '105-10-3-6' })
  }
}

</script>
<style lang="less" scope>
@import url("./style/rank.less");
.fx-help {
  position: absolute;
  top: 12px;
  right: 10px;
  z-index: 100;
  .btn-help {
    width: 30px;
    height: 30px;
    position: relative;
    z-index: 100;
    background: url(../../assets/img/star/lucky-help.png) center top no-repeat;
    background-size: 100% auto;
  }
}
.orank {
    color: #000;
    .idx {
      color: #000;
      font-size: 16px;
      &.idx-1,
      &.idx-2,
      &.idx-3 {
        font-size: 0;
      }
    }

    .detail {
      .name {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 6px;
        margin-right: 5px;
        .icon {
          img {
            width: 17px;
            height: 11px;
            margin-left: 5px;
          }
        }
      }

      .info {
        font-size: 12px;

        strong {
          display: inline-block;
          font-style: italic;
          padding-right: 20px;
          background: url(../../assets/img/cargame/icon-coin.png) right center no-repeat;
          background-size: auto 16px;
        }
      }
    }

    .winNum {
      padding-right: 20px;

      strong {
        font-style: italic;
        padding-right: 24px;
        font-size: 18px;
        background: url(../../assets/img/cargame/icon-coin.png) right center no-repeat;
        background-size: auto 17px;
      }
    }
  }

  .orank.myrank {
    position: absolute;
    padding: 0;
    color: #fff;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 20;

    .inner {
      height: 100%;
      background: #441800;
      backdrop-filter: blur(2px);
    }

    .idx {
      color: #fff;
    }
  }
</style>
