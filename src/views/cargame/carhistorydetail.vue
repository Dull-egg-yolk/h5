<template>
  <div class="car-h-detail carpage">
      <div class="car-title fx-vb">
          <div class="btn hover btn-back fx-vc" @click="pageBack">
              <span class="icon-back"></span>
          </div>
          <div class="ct-main">
              <div class="tt">{{ $t('cargame.tdetail') }}</div>
              <div class="race-id">{{ raceData.racingRoundName }}</div>
          </div>
          <div class="btn btn-right"></div>
      </div>

      <div class="p-box" ref="scrollBody">

        <div class="race-info" v-show="raceData.racingRoundId">

            <div class="race-num fx-vc">
                <div class="pnum">
                    <span>{{ raceData.winUserCount | formatNumberDot }}</span>
                </div>
                <div class="cnum">
                    <span>{{ raceData.winTotalCoin | formatNumberDot }}</span>
                </div>
            </div>
            <div class="car-img">
                <img :src="raceData.winCarImg" alt="">
            </div>
        </div>

        <div class="list-title ores fx-vb" v-show="dataList.length">
            <div class="ocell">
                {{ $t('cargame.twinners') }}
                <br>
                {{ raceData.winUserCount | formatNumberDot }}
            </div>
            <div class="ocell">
                <span class="ctxt">{{ $t('cargame.ttotalbets') }} </span>
            </div>
            <div class="ocell">
                <span class="ctxt">{{ $t('cargame.tbets') }}</span>
                {{ raceData.winCarName }}
            </div>
            <div class="ocell">
                <span class="ctxt">{{ $t('cargame.tprize') }}</span>
                {{ raceData.winTotalCoin | formatNumberDot }}
            </div>
        </div>

        <div class="car-body" >
            <div class="res-list">
                <div class="ores fx-vb" v-for="(item, index) in dataList" :key="index">
                    <div class="ocell">
                        <span class="name">{{ item.userName }}</span>
                    </div>
                    <div class="ocell">
                        <span>{{ item.totalBet | formatNumberDot }}</span>
                    </div>
                    <div class="ocell">
                        <span>{{ item.betCoin | formatNumberDot }}</span>
                    </div>
                    <div class="ocell">
                        <span>{{ item.rewardCoin | formatNumberDot }}</span>
                    </div>
                </div>
            </div>
            <div class="load-more" ref="loadMore" v-if="!nomore">
                <span class="icon"></span>
            </div>
        </div>
      </div>

      <div class="my-list ores fx-vb" v-if="myStatus">
          <div class="ocell">
              {{ myData.userName }}
          </div>
          <div class="ocell" v-if="myData.totalBet">
              {{ myData.totalBet | formatNumberDot }}
          </div>
          <div class="ocell" v-else>
              --
          </div>
          <div class="ocell" v-if="myData.betCoin">
              {{ myData.betCoin | formatNumberDot }}
          </div>
          <div class="ocell" v-else>
              --
          </div>
          <div class="ocell" v-if="(myStatus === 2)">
              {{ myData.rewardCoin | formatNumberDot }}
          </div>
          <div class="ocell" v-else>
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
import { apiGetCarHistoryDetail } from '@/api/cargame'
import { getParams, formatNumberDot } from '@/utils/index'
import debounce from 'lodash/debounce'

const QueryParams = getParams()
export default {
  name: 'CarList',
  components: {
  },
  data () {
    return {
      userId: QueryParams.userId || Cookies.get('userId'),
      historyId: 0,
      page: 1,
      size: 20,
      nomore: false,
      loading: false,
      scrollEvent: null,
      raceData: {},
      dataList: [],
      myData: {},
      myStatus: 0,
      isFromH5: false,
      scrollClass: ''
    }
  },
  filters: {
    formatNumberDot
  },
  methods: {
    pageBack () {
      if (this.isFromH5) {
        const query = { backTab: this.isFromH5 }
        this.$router.push({ name: 'CarHistory', query })
        // this.$router.back()
        return
      }
      if (window.raceClient && window.raceClient.finish) {
        window.raceClient.finish()
      } else {
        this.$router.back()
      }
    },
    initEvent () {
      const scrollBody = this.$refs.scrollBody
      const loadMore = this.$refs.loadMore
      const dfHeight = scrollBody.clientHeight

      const scrollHandler = debounce(() => {
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
    },
    loadMore () {
      console.log(this.loading, this.nomore)
      if (this.loading) return
      this.page += 1
      this.getRaceData()
    },
    getRaceData () {
      this.loading = true
      apiGetCarHistoryDetail({
        racingHistoryId: this.historyId,
        page: this.page,
        pageSize: this.size
      }).then(res => {
        this.loading = false
        const { racingHistoryInfoResp, details, userDetail, userIn, userWin } = res
        this.raceData = racingHistoryInfoResp
        this.myData = userDetail
        this.myStatus = !userIn ? 0 : 1
        if (userWin) {
          this.myStatus = 2
        }
        if (!details.length || details.length < this.size) {
          this.nomore = true
        }
        this.dataList.push(...details)
      })
    },
    seeCar (id) {
      const query = Object.assign({}, QueryParams, { carId: id })
      console.log(id, query)

      this.$router.push({ name: 'CarDetail', query })
    }
  },
  mounted () {
    this.scrollEvent = this.initEvent()

    const QueryParams = getParams()
    const { historyId, isFromH5 } = QueryParams
    this.historyId = +historyId
    this.isFromH5 = isFromH5
    this.getRaceData()

    triggerService({ eventId: '105-13-5-0' })
  },
  beforeDestroy () {
    this.scrollEvent && this.scrollEvent.removeEvent()
  }
}
</script>
<style lang="less">
@import url("./common.less");

.car-h-detail {
  text-transform: none;

  .car-title {
    .ct-main {
      text-align: center;
    }
  }

  .race-id {
    font-size: 12px;
    font-weight: normal;
    margin-bottom: -6px;
  }

  .p-box {
    flex: 1;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;

    &.fixed {
      .list-title {
        position: fixed;
        top: 50px;
      }

      .car-body {
        padding-top: 44px;
      }
    }
  }

  .race-info {
    text-align: center;
    margin: 0 0 6px;

    .race-num {
      height: 22px;
      background: url(../../assets/img/cargame/title-bg-3.png) center no-repeat;
      background-size: auto 100%;
      color: #fff;
      margin: 6px 0 0;

      &>* {
        width: 50%;

        span {
          display: inline-block;
        }
      }

      .pnum {
        text-align: right;

        span {
          padding: 0 10px 0 14px;
          background: url(../../assets/img/cargame/icon-pp.png) left center no-repeat;
          background-size: auto 10px;
        }
      }

      .cnum {
        text-align: left;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          width: 1px;
          height: 8px;
          margin-top: -4px;
          background: rgba(255, 255, 255, 0.5)
        }

        span {
          padding: 0 14px 0 12px;
          background: url(../../assets/img/cargame/icon-coin.png) right center no-repeat;
          background-size: auto 12px;
        }

      }
    }

    .car-img {
      text-align: center;

      img {
        width: 160px;
      }
    }
  }

  .ores {
    margin: 0 5px;

    .ocell {
      width: 25%;
      text-align: center;
      box-sizing: border-box;
      border-right: solid 1px rgba(255, 213, 78, .5);
      height: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      &:last-child {
        border: 0;
      }
    }
  }

  .list-title {
    position: sticky;
    width: 100%;
    margin: 0;
    top: 0;
    z-index: 100;
  }

  .list-title,
  .my-list {
    height: 44px;
    background: #873A00;

    .ocell {
      color: #FFC700;

      .ctxt {
        padding-right: 16px;
        background: url(../../assets/img/cargame/icon-coin.png) right center no-repeat;
        background-size: auto 12px;
      }
    }
  }

  .my-list {
    margin: 0;
    padding: 0 5px;
    font-size: 14px;

    .ocell {
      color: #fff;
      font-weight: bold;
      border-right: 0;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        width: 1px;
        height: 14px;
        background: rgba(255, 255, 255, .5);
        margin-top: -7px;
      }

      &:last-child {
        &::after {
          display: none;
        }
      }
    }
  }

  .res-list {
    .ores {
      height: 42px;
      background: rgba(255, 255, 255, .1);
      backdrop-filter: blur(2px);

      &:nth-child(2n) {
        background-color: rgba(135, 58, 0, 0.2);
      }

      .ocell {
        font-weight: bold;

        .name {
          font-size: 14px;
        }
      }
    }
  }

  .car-body {
    overflow: visible;
    height: auto;
  }

}
</style>
