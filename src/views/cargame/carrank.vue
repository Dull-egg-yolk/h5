<template>
  <div class="carlist carpage">
    <div class="car-title fx-vb">
      <div class="btn hover btn-back fx-vc" @click="pageBack">
        <span class="icon-back"></span>
      </div>
      <div class="ct-main fx-vc">
        {{$t('cargame.trank')}}
      </div>
      <div class="btn btn-right"></div>
    </div>

    <div class="car-body" ref="scrollBody">
      <!-- ranking列表 -->
      <div class="rank-list reverse">
        <div class="orank  fx-vb" v-for="(item,index) in rankList" :key="index">
          <div class="idx" :class="[`idx-`+item.rank]">
            {{(item.rank >= 10 ? item.rank : '0' + item.rank)}}
            <span class="cup"></span>
          </div>
          <div class="avatar">
            <img  @error="imgErr" :src="item.headImg | imgEdit" alt="">
          </div>
          <div class="detail">
            <div class="name">{{item.userName}}</div>
            <div class="info">
              <country :countryId="item.countryId"></country>
            </div>
          </div>
          <div class="winNum">
            {{$t('cargame.twon')}}
            <strong class="number">{{item.coin | formatNumberDot}}</strong>
          </div>
        </div>
        <div class="load-more" ref="loadMore" v-if="!nomore"><span class="icon"></span></div>
      </div>
    </div>

    <div class="orank myrank fx-vb" v-if="(myRank && myRank.rank!==0)">
      <div class="idx" :class="[`idx-`+myRank.rank]">
        <span v-if="myRank.rank > 0">
          <template v-if="(myRank.rank < 150)">
            {{(myRank.rank >= 10 ? myRank.rank : '0' + myRank.rank)}}
          </template>
          <template v-else>
            150+
          </template>
        </span>
        <span class="cup"></span>
      </div>
      <div class="avatar">
        <img  @error="imgErr" :src="myRank.headImg | imgEdit" alt="">
      </div>
      <div class="detail">
        <div class="name">{{myRank.userName}}</div>
        <div class="info"><country :countryId="myRank.countryId"></country></div>
      </div>
      <div class="winNum" v-if="myRank.coin">
        {{$t('cargame.twon')}}
        <strong class="number">{{myRank.coin  | formatNumberDot}}</strong>
      </div>
      <div class="winNum" v-else>
        --
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
import Cookies from 'js-cookie'
import { triggerService } from '@/utils/statisticalTool'
// import MtPopup from '@/components/popup/index'
// import Toast from '@/components/toast/index'
import { apiGetCarRanking } from '@/api/cargame'
import { getParams, formatNumberDot } from '@/utils/index'
import Country from '@/views/components/country'
import debounce from 'lodash/debounce'

const QueryParams = getParams()
export default {
  name: 'CarList',
  components: {
    Country
  },
  data () {
    return {
      userId: QueryParams.userId || Cookies.get('userId'),
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
    imgEdit (url) {
      if (url.indexOf('http://') !== -1) {
        url = url.replace('http://', 'https://')
      }
      return url
    }
  },
  methods: {

    imgErr (e) {
      if (e.target) {
        e.target.style.display = 'none'
      }
    },
    pageBack () {
      if (window.raceClient && window.raceClient.finish) {
        window.raceClient.finish()
      } else {
        this.$router.back()
      }
    },
    loadMore () {
      if (this.loading) return
      this.page += 1
      this.getRankData()
    },
    getRankData () {
      this.loading = true
      apiGetCarRanking({
        page: this.page,
        size: this.size
      }).then(res => {
        this.loading = false
        const { currentUser, rankUsers = [] } = res

        if (!rankUsers.length || rankUsers.length < this.size) {
          this.nomore = true
        }

        this.myRank = currentUser
        this.rankList.push(...rankUsers)
      }).catch(e => {
        this.loading = false
      })
    },
    seeCar (id) {
    },
    initEvent () {
      const scrollBody = this.$refs.scrollBody
      const loadMore = this.$refs.loadMore
      const dfHeight = scrollBody.clientHeight
      const scrollHandler = debounce(() => {
        // 加载更多
        if (this.loading) return
        if (this.nomore) return

        const dfTop = scrollBody.offsetTop
        const scrollTop = scrollBody.scrollTop

        const movePos = dfTop + scrollTop + dfHeight
        const morePos = loadMore.offsetTop - 20

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
    this.getRankData()
    this.scrollEvent = this.initEvent()

    triggerService({ eventId: '105-13-1-0' })
  },
  beforeDestroy () {
    this.scrollEvent && this.scrollEvent.removeEvent()
  }
}
</script>
<style lang="less">
@import url("./common.less");
  .orank{
    .name{
      font-size:16px;
      font-weight:bold;
      margin-bottom:4px;
    }
    .winNum{
      font-size:14px;
      padding-right:15px;
      margin-right:10px;
      background:url(../../assets/img/cargame/icon-coin.png) center right no-repeat;
      background-size: auto 12px;
      strong{
        font-style: italic;
      }
    }
  }
</style>
