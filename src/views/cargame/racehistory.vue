<template>
  <div class="race-history" ref="scrollBody">
    <div class="page-box">
      <div class="top-act fx-vb">
        <div class="btn hover btn-back" @click="pageBack()"></div>
        <div class="r fx-vc">
          <!-- <div class="btn hover btn-history">History</div> -->
          <!-- <div class="btn hover btn-help" @click="setPop(true)"></div> -->
        </div>
      </div>

      <div class="page-title">
        {{ $t('cargame.thistory') }}
      </div>

      <div class="h-list">
        <div class="oh" v-for="item in theList" :key="item.cycleId" @click="seeDetail(item.cycleId)">
          <div class="the-time">
            {{item.startTime | formatTimeStr }} - {{ item.endTime | formatTimeStr }}
          </div>
          <div class="the-users">
            <div class="ou" :class="['ou-'+idx]" v-for="(ou, idx) in item.rank" :key="idx">
              <div class="avatar">
                <img  @error="imgErr" :src="ou.headImg | imgEdit" alt="">
              </div>
              <div class="name">{{ ou.userName }}</div>
              <div class="won">Won, {{ ou.coin |  formatNumberDot}}</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script type="text/babel">
import Cookies from 'js-cookie'
import debounce from 'lodash/debounce'
import { triggerService } from '@/utils/statisticalTool'
// import MtPopup from '@/components/popup/index'
// import Toast from '@/components/toast/index'
import { apiGetRaceHistoryList, apiGetRaceHistoryDetail } from '@/api/cargame'
import { getParams, formatNumberDot, formatTime } from '@/utils/index'
const QueryParams = getParams()
export default {
  name: 'RaceHistroy',
  components: {
  },
  data () {
    return {
      userId: QueryParams.userId || Cookies.get('userId'),
      step: 0,
      theList: [],
      timer: null,
      page: 1,
      size: 20,
      nomore: false,
      loading: false,
      scrollEvent: null,
      cycleId: 0
    }
  },
  filters: {
    formatNumberDot,
    formatTimeStr (val) {
      return formatTime(val, 'YYYY/MM/DD', true)
    },
    imgEdit (url) {
      if (url.indexOf('http://') !== -1) {
        url = url.replace('http://', 'https://')
      }
      return url
    }
  },
  watch: { },
  computed: {
  },
  methods: {
    imgErr (e) {
      if (e.target) {
        e.target.style.display = 'none'
      }
    },
    pageBack (btn) {
      this.$router.back()
    },
    getHistoryList () {
      apiGetRaceHistoryList().then(res => {
        if (res && res.length) {
          this.theList.push(...res)
          this.getDetail()
        }
      })
    },
    getDetail () {
      this.theList.forEach((item, index) => {
        apiGetRaceHistoryDetail({
          cycleId: item.cycleId,
          page: 1,
          size: 3
        }).then(res => {
          const tmp = JSON.parse(JSON.stringify(this.theList))
          tmp[index].rank = res.rankUsers
          this.theList = tmp
        })
      })
    },
    seeDetail (id) {
      console.log(id)
      triggerService({ eventId: '105-13-7-12', freeName1: id + '' })
      this.$router.push({ name: 'RaceActivity', query: { cycleId: id, fromWeb: 1 } })
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
    triggerService({ eventId: '105-13-7-11' })
    this.getHistoryList()
    // this.scrollEvent = this.initEvent()
  },
  beforeDestroy () {
    // this.scrollEvent && this.scrollEvent.removeEvent()
  }
}
</script>
<style lang="less">
@import url("./common.less");

.race-history {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(../../assets/img/cargame/bg-r-m.png) center repeat-y;
  background-size: 100% auto;
  overflow: auto;
  overflow-x: hidden;
  color: #562500;
  font-size: 12px;

  .page-box {
    min-height: 100%;
    background: url(../../assets/img/cargame/bg-r-3.jpg) center top no-repeat;
    background-size: 100% auto;
  }

.top-act {
  position: fixed;
  top: 10px;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  z-index:10;

  .btn-back{
    width: 36px;
    height: 36px;
  }
  .btn-back {
    background: url(../../assets/img/cargame/icon-r-back.png) center top no-repeat;
    background-size: 100% auto;
  }

}

.page-title {
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  padding-top: 45px;
  padding-bottom:15px;
  color: #000;
  text-shadow: -1px 1px #ff4d00;
  text-transform: uppercase;
}

 .h-list{
  .oh{
    width:350px;
    height:174px;
    overflow: hidden;
    margin:0 auto 20px;
    background: url(../../assets/img/cargame/rank-bg.png) center top no-repeat;
    background-size: 100% auto;
    box-sizing: border-box;
    padding:10px;
  }
  .the-time{
    font-weight:bold;
    color:#000;
    background: url(../../assets/img/cargame/icon-right.png) right center no-repeat;
    background-size: auto 80%
  }
  .the-users{
    position:relative;
    height:150px;
  }
  .ou{
    position:absolute;
    color:#fff;
    width:120px;
    text-align: center;
  }
  .ou-0{
    left:50%;
    top:-6px;
    margin-left:-60px;
  }
  .ou-1{
    left:0;
    top:14px;
  }
  .ou-2{
    right:0;
    top:20px;
  }
  .avatar{
    margin:0 auto 11px;
    width:55px;
    height:55px;
    border-radius: 50%;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.2) url(https://h5.livuchat.com/staticProd/worldCup/img/user.png) center no-repeat;
    background-size: 100% auto;
    img{
      width:100%;
      min-height:100%;
    }
  }
  .name{
    font-weight:bold;
    font-size:10px;
  }
  .won{
    font-size:10px;
    display:inline-block;
    font-weight:bold;
    font-style: italic;
    padding-right: 16px;
    background: url(../../assets/img/cargame/icon-coin.png) right center no-repeat;
    background-size: auto 12px;
  }
 }
}

</style>
