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
            <div v-infinite-scroll="loadMoreRank" :infinite-scroll-immediate-check="immediateCheck"  infinite-scroll-disabled="loading"  infinite-scroll-distance="60">
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
                <div class="coins"><i>{{$t('worldCup.won')}}</i><span>{{rank.coin}}</span></div>
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
              <div class="item" v-for="(h, i) in historyList" :key="i">
                 <span class="item-type">
                  <img :src="lotteryDict[h.lotteryId]" />
                 </span>
                 <span class="show-times" v-if="h.showTimes > 1">X <i>{{h.showTimes}}</i></span>
                  <div class="date"><span>{{h.lottTimestamp | formatTimeStr }}</span></div>
                  <div class="get-gift" v-if="h.totalGold">
                    <div><span>{{$t('worldCup.coins')}}</span>:</div>
                    <div><span class="coins">
                      + <span>{{h.totalGold}}</span>
                    </span></div>
                  </div>
                  <div class="get-gift goods" v-if="Object.keys(h.goodsIdCountMap).length > 0">
                    <div><span>{{$t('worldCup.footballItems')}}</span>:</div>
                    <div>
                      <ul class="gift-small">
                        <li :class="[goodsDict[g].indexOf('cup') !== -1 ? 'special': '']" v-for="g in Object.keys(h.goodsIdCountMap)" :key="g">
                        <img :src="goodsDict[g]" alt="">
                        <span>x <i>{{h.goodsIdCountMap[g]}}</i></span>
                      </li></ul>
                    </div>
                  </div>
                  <div class="get-gift" v-if="Object.keys(h.goodsIdCountMap).length === 0 && !h.totalGold">
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
</template>
<script type="text/babel">
import Swiper from 'swiper'
import Country from '@/views/components/country'
import { getHistory, getActDict, getRanking } from '@/api/worldCup'
import { formatTime, getWorldCupParams, worldCupIsFlipContry } from '@/utils/index'
import 'swiper/dist/css/swiper.css'
import { triggerService } from '@/utils/statisticalTool'

const commonParams = getWorldCupParams()

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
      showFlip: false
    }
  },
  components: {
    Country
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
    init () {
      this.initSwiper()
      this.getDict(commonParams)
      this.getHistoryList(commonParams)
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
      const res = await getRanking({ ...commonParams, start: this.start, end: this.end })
      return res
    },
    async loadMoreRank () {
      if (!this.isLoadMore) {
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
        on: {
          click: function (el) {
            var target = el.target
            var dataset = target.dataset
            if (dataset.type && dataset.type === 'swiper-tab') {
              var index = +el.target.dataset.id
              console.log(index)
              if (index === 1) { // history
                triggerService({ eventId: '105-10-3-7', targetUserId: commonParams.userId })
              } else {
                triggerService({ eventId: '105-10-3-6', targetUserId: commonParams.userId })
              }
              swiper.slideTo(index, 600, false)
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
                customPaginationHtml += `<span data-id="${i}" data-type="swiper-tab">${title[i]}</span>`
              }
            }
            return `<div>${customPaginationHtml}</div>`
          },
          paginationClickable: true
        }
      })
    }
  },
  mounted () {
    this.init()
  }
}

</script>
<style lang="less">
@import url("./rank.less");
</style>
