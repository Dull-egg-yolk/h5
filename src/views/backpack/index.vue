<template>
  <div :class="['page-backpack', showFlip && 'horizontal-flip']">
    <div class="swiperBackpack">
      <div class="header">
        <div :class="['title']"></div>
        <div class="tips" v-if="!(commonParams && commonParams.platformType && commonParams.platformType ==='4')">
            <div>
              <span @click.stop="goTips">{{$t('christmas2022.tipsInfo1')}}</span></div>
        </div>
      </div>

      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="no-data" v-if="isLoadRank && backpackList.length === 0"><span>{{$t('christmas2022.beibaoNoGift')}}</span></div>
          <div class="gift-content"  ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <div v-infinite-scroll="loadMoreRank" :infinite-scroll-immediate-check="immediateCheck"  infinite-scroll-disabled="loading"  infinite-scroll-distance="60">

              <div class="gift-item-wrap" v-for="(item, idx) in backpackList" :key="idx" >
                <div class="goodsCount">x{{item.goodsCount}}</div>
                <div class="img">
                  <img :src="item.icon" alt="" />
                </div>
                <div class="info">
                  <div class="icon"><img src="https://h5.livuchat.com/staticProd/2022_christmas/img/coin.png" alt=""><span>{{item.price}}</span></div>
                  <div class="expireTime" v-if="item.expireTime">
                    <div v-if="item.times.days == 0" class="expire-item">
                      <span>
                        {{$t('christmas2022.beibaoItemInfo1Start', {
                          count: item.latestExpireGoodsCount,
                          expireTime: item.expireTimeInfo
                        })}}
                      </span>
                      <span><count-down
                          :endTime="item.expireTime + nowTime"
                          :showTime="true"
                        ></count-down>
                      </span>
                        <span>
                        {{$t('christmas2022.beibaoItemInfo1End', {
                        count: item.latestExpireGoodsCount,
                        expireTime: item.expireTimeInfo
                      })}}</span>
                    </div>
                    <div v-else>
                      <span  v-html="$t('christmas2022.beibaoItemInfo2', {
                        count: item.latestExpireGoodsCount,
                        day: item.daySpan,
                      })"></span>
                    </div>

                  </div>
                </div>
              </div>
              <div v-show="loading" class="page-loading">
                  <mt-spinner type="fading-circle" color="#a425ff"></mt-spinner>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="no-data" v-if="isLoadHistory && backpackExpireList.length === 0"><span>{{$t('christmas2022.beibaoNoExpire')}}</span></div>
          <div class="history-content" v-if="backpackExpireList.length > 0">
              <div class="gift-item-wrap" v-for="(item, idx) in backpackExpireList" :key="idx" >
                <div class="goodsCount">x{{item.goodsCount}}</div>
                <div class="img">
                  <img :src="item.icon" alt="" />
                </div>
                <div class="info">
                  <div class="icon"><img src="https://h5.livuchat.com/staticProd/2022_christmas/img/coin.png" alt=""><span>{{item.price}}</span></div>
                  <div class="expireTime" style="font-style:normal;">{{$t('christmas2022.beibaoExportTime')}}
                    <span v-if="item.expireTime">{{item.expireTime |formatTimeStr }}</span>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>

 </div>
</template>
<script type="text/babel">
import Swiper from 'swiper'
import { getBackpackExpireList, getBackpackList } from '@/api/worldCup'
import CountDown from '@/views/components/countDown'
import { formatTime, getWorldCupParams, worldCupJumpParams, worldCupIsFlipContry, formatTimeGup } from '@/utils/index'
import 'swiper/dist/css/swiper.css'
import { triggerService } from '@/utils/statisticalTool'

export default {
  name: 'WorldCupRank',
  components: { CountDown },
  data () {
    return {
      goodsDict: {},
      lotteryDict: {},
      isLoadHistory: false,
      backpackExpireList: [],
      backpackList: [],
      isLoadRank: false,
      wrapperHeight: '',
      loading: false,
      immediateCheck: true,
      isLoadMore: true,
      start: 1,
      end: 20,
      pageSize: 20,
      showFlip: false,
      nowTime: new Date().getTime(),
      commonParams: {}
    }
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
    goTips () {
      triggerService({ eventId: '105-12-1-3' })
      this.$router.push({ name: 'BackpackTips', query: this.jumpParams })
    },
    getHistoryList (params) {
      getBackpackExpireList(params).then(res => {
        this.isLoadHistory = true
        this.backpackExpireList = res
      })
    },
    init () {
      const commonParams = getWorldCupParams()
      this.commonParams = commonParams
      this.jumpParams = worldCupJumpParams(commonParams)
      this.initSwiper()
      this.getHistoryList(commonParams)
      this.loadFirtPageRank()
      this.showFlip = worldCupIsFlipContry(this.$i18n.locale)
    },
    async loadFirtPageRank () {
      const res = await this.loadData()
      this.isLoadRank = true
      this.isLoadMore = false
      this.handleRes(res)
      this.backpackList = res || []

      this.start += this.pageSize
      this.end += this.pageSize
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
    },
    handleRes (res) {
      if (res && res.length > 0) {
        res.forEach(item => {
          if (item.expireTime) {
            item.times = formatTimeGup(item.expireTime)
            item.daySpan = '<span class="weight">' + item.times.days + '</span>'

            if (item.times.days === 0) {
              item.expireTimeInfo = `${item.times.hours}:${item.times.minutes}:${item.times.seconds}`
            }
          } else {
            item.times = {}
          }
        })
      }
    },
    async loadData () {
      const res = await getBackpackList({ ...this.commonParams, start: this.start, end: this.end })
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
        this.handleRes(res)
        this.backpackList = [...this.backpackList, ...res]
        if (res.length < this.pageSize) {
          this.isLoadMore = false
        }
      } else {
        this.isLoadMore = false
      }
    },
    initSwiper () {
      const self = this
      const swiper = new Swiper('.swiperBackpack', {
        speed: 400,
        initialSlide: 0,
        spaceBetween: 6,
        autoplay: false,
        loop: false,
        on: {
          click: function (el) {
            var target = el.target
            var dataset = target.dataset
            el.stopPropagation && el.stopPropagation()
            if (dataset.type && dataset.type === 'swiper-tab') {
              var index = +el.target.dataset.id
              swiper.slideTo(index, 600, false)
            }
          },
          slideChange: function () {
            if (this.activeIndex === 0) { // BackPack
              triggerService({ eventId: '105-12-1-2', free_name1: 'BackPack' })
            } else {
              triggerService({ eventId: '105-12-1-2', free_name1: 'Expired' })
            }
          }
        },
        pagination: {
          el: '.title',
          type: 'custom',
          // clickable: true,
          renderCustom: function (swiper, current, total) {
            var customPaginationHtml = ''
            var title = {
              0: self.$t('christmas2022.beibaoTab1'),
              1: self.$t('christmas2022.beibaoTab2')
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
    triggerService({ eventId: '105-12-1-1', free_name1: 'BackPack' })
  }
}

</script>
<style lang="less">
@import url("./index.less");
</style>
