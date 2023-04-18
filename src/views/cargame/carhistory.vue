<template>
  <div class="carhistory carpage">
    <div class="car-title fx-vb">
      <div class="btn hover btn-back fx-vc" @click="pageBack">
        <span class="icon-back"></span>
      </div>
      <div class="ct-main fx-vc">
        <div v-for="item in rankTab" :key="item.id" class="otab hover" :class="{cur: item.id===curTabId}" @click="changeTab(item.id)">
          {{item.txt}}
        </div>
      </div>
      <div class="btn btn-right"></div>
    </div>

    <div class="car-body" ref="scrollBody">
      <!-- ranking列表 -->
      <div class="rank-list ">
        <div class="orank fx-vb" v-for="(item,index) in rankList" :key="index" @click="seeDetail(item.id)">
          <div class="car-pic">
            <img :src="item.winCarImg" alt="">
          </div>
          <div class="detail" v-if="curTabId === 2">
            <div class="txt">
              <span class="label">{{$t('cargame.tmybet')}}</span>
              <strong>
                {{item.betCoin | formatNumberDot}}
              </strong>
            </div>
            <div class="txt">
              <span class="label">{{$t('cargame.tprize')}}</span>
              <strong>
                <span>
                {{item.winTotalCoin | formatNumberDot}}
               </span>
              </strong>
            </div>
          </div>
          <div class="detail" v-else>
            <div class="txt">
              <span class="label">{{$t('cargame.twinners')}}</span>
              <strong>
                {{item.winUserCount | formatNumberDot}}
              </strong>
            </div>
            <div class="txt">
              <span class="label">{{$t('cargame.tprize')}}</span>
              <strong>
                <span>
                {{item.winTotalCoin | formatNumberDot}}
               </span>
              </strong>
            </div>
          </div>
          <div class="time">
            {{item.startTimestamp | timeF}}
          </div>
        </div>
        <div class="load-more" ref="loadMore" v-if="!nomore"><span class="icon"></span></div>
      </div>
    </div>

  </div>
</template>
<script type="text/babel">
import Cookies from 'js-cookie'
import { triggerService } from '@/utils/statisticalTool'
// import MtPopup from '@/components/popup/index'
// import Toast from '@/components/toast/index'
import { apiGetCarHistory, apiGetCarMyHistory } from '@/api/cargame'
import { getParams, formatNumberDot, formatTime } from '@/utils/index'
import debounce from 'lodash/debounce'

const QueryParams = getParams()
export default {
  name: 'CarHistory',
  components: {
  },
  data () {
    return {
      userId: QueryParams.userId || Cookies.get('userId'),
      rankTab: [
        { id: 1, txt: this.$t('cargame.thistory') },
        { id: 2, txt: this.$t('cargame.tmy') }
      ],
      curTabId: 1,
      rankList: [],
      myRank: null,
      page: 1,
      size: 20,
      nomore: false,
      loading: false,
      scrollEvent: null
    }
  },
  filters: {
    formatNumberDot,
    timeF (time) {
      const b = formatTime(time, 'YYYY/MM/DD hh:mm').split(' ')
      const d = formatTime(Date.now(), 'YYYY/MM/DD')
      const dt = new Date(d).getTime()
      // const ot = 24 * 60 * 60 * 1000
      // const d1 = dt - ot
      // const d2 = dt - 2 * ot
      if (time >= dt) {
        return b[1]
      } else {
        return b.join(' ')
      }
    }
  },
  methods: {
    pageBack () {
      if (window.raceClient && window.raceClient.finish) {
        window.raceClient.finish()
      } else {
        this.$router.back()
      }
    },
    changeTab (id) {
      if (id === this.curTabId) return

      triggerService({ eventId: '105-13-4-1', free_name1: JSON.stringify({ tabId: id }) })

      this.curTabId = id
      this.loading = false
      this.nomore = false
      this.page = 1
      this.rankList = []
      this.getRankData()
    },
    loadMore () {
      if (this.loading) return
      this.page += 1
      this.getRankData()
    },
    getRankData () {
      this.loading = true
      const apires = this.curTabId === 1 ? apiGetCarHistory : apiGetCarMyHistory
      apires({
        page: this.page,
        pageSize: this.size
      }).then(res => {
        console.log(res)
        this.loading = false
        const { currentUser, racingHistoryInfoRespList = [] } = res
        if (!racingHistoryInfoRespList.length || racingHistoryInfoRespList.length < this.size) {
          this.nomore = true
        }
        this.myRank = currentUser
        this.rankList.push(...racingHistoryInfoRespList)
      }).catch(e => {
        this.loading = false
      })
    },
    seeDetail (id) {
      triggerService({ eventId: '105-13-4-2', free_name1: JSON.stringify({ tabId: this.curTabId }) })

      const query = Object.assign({}, QueryParams, { historyId: id, isFromH5: this.curTabId })
      this.$router.push({ name: 'CarHistoryDetail', query })
    },
    initEvent () {
      const scrollBody = this.$refs.scrollBody
      const loadMore = this.$refs.loadMore
      const dfHeight = scrollBody.clientHeight

      const scrollHandler = debounce(() => {
        if (this.noPoll || this.stopOnScroll) return

        const dfTop = scrollBody.offsetTop
        const scrollTop = scrollBody.scrollTop

        const movePos = dfTop + scrollTop + dfHeight
        const morePos = loadMore.offsetTop - 20

        // 加载更多
        if (this.loading) return
        if (this.nomore) return
        if (movePos >= morePos) {
          this.loadMore()
        }
      }, 200)

      scrollBody.addEventListener('scroll', scrollHandler)

      return {
        removeEvent () {
          scrollBody.removeEventListener('scroll', scrollHandler)
        }
      }
    }
  },
  mounted () {
    const QueryParams = getParams()
    const { backTab } = QueryParams
    this.curTabId = +backTab || 1
    triggerService({ eventId: '105-13-4-0' })
    this.getRankData()
    this.scrollEvent = this.initEvent()
  },
  beforeDestroy () {
    this.scrollEvent && this.scrollEvent.removeEvent()
  }
}
</script>
<style lang="less">
@import url("./common.less");

.orank {
  .detail{
    display:table;
    width:100%;
    .txt{
      font-size: 12px;
      display:table-row;
      & > * {
        display:table-cell;
      }
      .label{
        width: 20%;
        padding-right:10px;
        white-space: nowrap;
      }
      strong{
        font-size:14px;
        span{
          padding-right:14px;
          display: inline-block;
          background:url(../../assets/img/cargame/icon-coin.png) center right no-repeat;
          background-size: auto 12px;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
