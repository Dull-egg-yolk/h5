<template>
  <div :class="['page-rank', showFlip && 'horizontal-flip']">
    <div class="swiper">
      <div class="header">
        <div class="title">
          <span class="current rank">{{$t('worldCup.rank')}}</span>
          <span class="history">{{$t('worldCup.history')}}</span>
        </div>
      </div>
      <div class="swiper-wrapper">
        <div class="swiper-slide ">
          <div class="no-data" v-if="isLoadRank && rankList.length === 0"><span>{{$t('worldCup.noData')}}</span></div>
          <div class="rank-content"  ref="wrapper" :style="{ height: wrapperHeight + 'px' }" >
            <div v-infinite-scroll="loadMoreRank" :infinite-scroll-immediate-check="immediateCheck"  infinite-scroll-disabled="loading"  infinite-scroll-distance="40">
              <div class="rank-item" v-for="rank in rankList" :key="rank.rank" >
                <div class="avatar-wrap">
                  <div class="order">{{rank.rank}}</div>
                  <div class="avatar">
                    <img :src="rank.headImg" alt=""  onerror="javascript:this.src='https://h5.livuchat.com/staticProd/worldCup/img/user.png'"/>
                  </div>
                  <div class="info">
                    <p>{{rank.userName}}</p>
                    <p>
                      <country :countryId="rank.countryId" type="img"></country>
                    </p>
                  </div>
                </div>
                <div class="coins"><i>{{$t('worldCup.won').replace("XX", '')}}</i><span> {{rank.coin}}</span></div>
              </div>
              <div v-show="loading" class="page-loading">
                  <mt-spinner type="fading-circle" color="#a425ff"></mt-spinner>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="no-data" v-if="isLoadHistory && historyList.length === 0"><span>{{$t('worldCup.noData')}}</span></div>
          <div class="history-content" v-if="historyList.length > 0">
              <div :class="['item',  h.giftBoxTotalGold ? 'box': '']" v-for="(h, i) in historyList" :key="i">
                 <span class="item-type">
                    <img :src="lotteryDict[h.lotteryId]" v-if="!h.giftBoxTotalGold" />
                    <img class="no-rotate" src="https://h5.livuchat.com/staticProd/2022_christmas/img/ani/box.png" v-else alt="">
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
                        <li class="gift" v-for="g in Object.keys(h.giftGoodsIdCountMap)" :key="g" @click="handleGiftClick(g, h.giftGoodsIdCountMap[g])">
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
                 <span class="item">
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
import Country from '@/views/components/country'
import MtPopup from '@/components/popup/index'
import { getHistory, getActDict, getRanking } from '@/api/worldCup'
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
      isShowGift: false
    }
  },
  components: {
    Country,
    MtPopup
  },
  filters: {
    formatTimeStr (val) {
      return formatTime(val, 'YYYY-MM-DD hh:mm:ss', true)
    }
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    goGiftList () {
      triggerService({ eventId: '105-10-3-37', free_name1: this.selGift })
      this.$router.push({ name: 'Backpack', query: this.jumpParams })
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
    init () {
      const commonParams = getWorldCupParams()
      this.commonParams = commonParams
      this.jumpParams = worldCupJumpParams(commonParams)
      this.getDict({ ...commonParams, noLoading: 1 })
      this.initSwiper()
      this.getHistoryList({ ...commonParams, noLoading: 1 })
      this.loadFirtPageRank()
      this.showFlip = worldCupIsFlipContry(this.$i18n.locale)
    },
    async loadFirtPageRank () {
      const res = await this.loadData()
      this.isLoadRank = true
      this.rankList = res || []
      this.start += this.pageSize
      this.end += this.pageSize
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
    },
    async loadData () {
      const res = await getRanking({ ...this.commonParams, start: this.start, end: this.end, noLoading: 1 })
      return res
    },
    async loadMoreRank () {
      if (!this.isLoadMore) {
        this.loading = false
        return
      }
      this.loading = true
      const res = await this.loadData()
      this.loading = false
      if (res && res.length > 0) {
        this.start += this.pageSize
        this.end += this.pageSize
        this.rankList = [...this.rankList, ...res]
        if (res.length < this.pageSize) {
          this.isLoadMore = false
        }
      } else {
        this.isLoadMore = false
      }
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
            if (this.activeIndex === 0) { // BackPack
              triggerService({ eventId: '105-10-3-7', free_name1: 'rank' })
            } else {
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
              1: self.$t('worldCup.history')
            }
            for (var i = 0; i < total; i++) {
              if (i === current - 1) {
                customPaginationHtml += `<span class="current" data-id="${i}" data-type="swiper-tab">${title[i]}</span>`
              } else {
                customPaginationHtml += `<span data-id="${i}" data-type="swiper-tab" style="display:inline-block;margin-left:4px;">${title[i]}</span>`
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
</style>
