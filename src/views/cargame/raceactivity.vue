<template>
  <div class="race-activity" ref="scrollBody">
    <div class="page-box" :class="['step'+step]">
      <div class="top-act fx-vb">
        <div class="btn hover btn-back" @click="pageBack()"></div>
        <div class="r fx-vc">
          <div class="btn hover btn-history" @click="toHistory" v-if="!setCyId && hasHistory">{{ $t('cargame.thistory') }}</div>
          <div class="btn hover btn-help" @click="setPop(true)" v-if="!setCyId"></div>
        </div>
      </div>

      <div class="top-box">

        <div class="page-title">
          {{$t('cargame.trtitle')}}
        </div>
        <div class="the-car"></div>

        <template v-if="(step===1)">
          <div class="time-box fx-vc" >
            <div class="otime">
              <div class="ttitle">DAYS</div>
              <strong>{{timeArr[0]}}</strong>
            </div>
            <div class="otime">
              <div class="ttitle">HOURS</div>
              <strong>{{timeArr[1]}}</strong>
            </div>
            <div class="otime">
              <div class="ttitle">MINUTES</div>
              <strong>{{timeArr[2]}}</strong>
            </div>
            <div class="otime">
              <div class="ttitle">SECONDS</div>
              <strong>{{timeArr[3]}}</strong>
            </div>
          </div>
          <!-- 奖金 -->
          <div class="price-box">
            <div class="top-three">
            <div class="op fx-vb" :class="['p'+item.key]" v-for="item in pzTop" :key="item.key">
              <div class="idx">
                <span>NO.{{item.key}}</span>
              </div>
              <div class="num">
                <span class="btxt" :data-text="'+' +item.coin | formatNumberDot">
                  <span>+{{item.coin | formatNumberDot}}</span>
                </span>
              </div>
            </div>
            </div>
            <div class="p-list fx-vb" v-if="pzList.length">
              <div class="op fx-vb" v-for="(item,index) in pzList" :key="index">
                <div class="idx">
                  <span>NO.{{item.key}}</span>
                </div>
                <div class="num">
                    +{{item.coin | formatNumberDot}}
                </div>
              </div>
            </div>
            <div class="btn-play hover fx-vc" @click="pageBack(1)">
              <span>
                {{$t('cargame.tplaybtn')}}
              </span>
            </div>
          </div>
        </template>

        <template v-if="(step===3)">
          <!-- 时间 -->
          <div class="act-time fx-vc">
            {{stime}} ~ {{etime}}
          </div>
          <div class="res-title fx-vc">
            <div class="btxt" :data-text="$t('cargame.trt3')">
              <span>
                {{$t('cargame.trt3')}}
              </span>
            </div>
          </div>
        </template>

        <template v-if="(step===2)">
          <div class="wait-title fx-vc">
            <div class="btxt" :data-text="$t('cargame.twait')">
              <span>
                {{$t('cargame.twait')}}
              </span>
            </div>
          </div>
          <div class="time-box big fx-vc" >
            <div class="otime">
              <div class="ttitle">HOURS</div>
              <strong>{{timeArr[1]}}</strong>
            </div>
            <div class="otime">
              <div class="ttitle">MINUTES</div>
              <strong>{{timeArr[2]}}</strong>
            </div>
            <div class="otime">
              <div class="ttitle">SECONDS</div>
              <strong>{{timeArr[3]}}</strong>
            </div>
          </div>
          <div class="wait-info">
           {{$t('cargame.twaittxt')}}
          </div>
        </template>

      </div>

      <template v-if="(step!==2)">

        <!-- ranking list -->
        <div class="rank-box" :class="{long: myData && myData.rank}">
          <div class="the-title fx-vb" v-if="(step===1)">
            <div class="line l1"></div>
            <div class="ttxt">{{$t('cargame.trank')}}</div>
            <div class="line"></div>
          </div>
          <div class="rank-list reverse">
            <div class="orank fx-vb" v-for="(item,index) in rankList" :key="index">
              <div class="idx" :class="[`idx-`+item.rank]" v-if="(step==3)">
                {{(item.rank >= 10 ? item.rank : '0' + item.rank)}}
                <span class="cup"></span>
              </div>
              <div class="idx" v-else>
                {{(item.rank >= 10 ? item.rank : '0' + item.rank)}}
              </div>
              <div class="avatar">
                <img @error="imgErr" :src="item.headImg | imgEdit" alt="">
              </div>
              <div class="detail">
                <div class="name">{{item.userName}}</div>
                <div class="info">
                  {{$t('cargame.twon')}}
                   <strong>{{item.coin | formatNumberDot}}</strong></div>
              </div>
              <div class="winNum" v-if="item.rewardCoin">
                <strong class="number">+{{item.rewardCoin | formatNumberDot}}</strong>
              </div>
            </div>
          </div>
          <div class="load-more" ref="loadMore" v-if="!nomore"><span class="icon"></span></div>

        </div>

        <div class="orank myrank" v-if="(myData && myData.rank)">
          <div class="inner fx-vb">
            <div class="idx" :class="[`idx-`+myData.rank]" v-if="(step==3)">
                {{myrank}}
                <span class="cup"></span>
              </div>
              <div class="idx" v-else>
                {{myrank}}
              </div>
            <div class="avatar">
              <img @error="imgErr" :src="myData.headImg | imgEdit" alt="">
            </div>
            <div class="detail">
              <div class="name">{{myData.userName}}</div>
              <div class="info">
                {{$t('cargame.twon')}} <strong>{{myData.coin | formatNumberDot}}</strong>
              </div>
            </div>
            <div class="winNum"  v-if="myData.rewardCoin">
              <strong class="number">+{{myData.rewardCoin | formatNumberDot}}</strong>
            </div>
          </div>
        </div>
      </template>

      <div class="help-pop" v-if="showHelp">
        <div class="bg"></div>
        <div class="p-content">
          <div class="ptitle">{{$t('cargame.trules')}}</div>
          <div class="btn-cancel hover" @click="setPop(false)"></div>
          <div class="p-body">
            <p v-html="$t('cargame.trule1', {time1: '<br>'+rstime, time2: rltime})"></p>
            <p v-html="$t('cargame.trule2', {time2: '<br>'+rltime, time3: retime})"></p>
            <p>{{$t('cargame.trule3')}}</p>
            <p>{{$t('cargame.trule4')}}</p>
            <p>{{$t('cargame.trule5')}}</p>
            <p>{{$t('cargame.trule6')}}</p>

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
import { apiGetRaceConf, apiGetRaceCycle, apiGetRaceRank, apiGetRaceHistoryList, apiGetRaceHistoryDetail } from '@/api/cargame'
import { getParams, formatNumberDot, formatTime } from '@/utils/index'
const QueryParams = getParams()
export default {
  name: 'CarRule',
  components: {
  },
  data () {
    return {
      userId: QueryParams.userId || Cookies.get('userId'),
      step: 0,
      pzTop: [],
      pzList: [],
      rankList: [],
      myData: null,
      stime: 0,
      etime: 0,
      rstime: 0,
      rltime: 0,
      retime: 0,
      curTime: 0,
      timeArr: ['--', '--', '--', '--'],
      timer: null,
      showHelp: false,
      actTime: {},
      page: 1,
      size: 20,
      nomore: false,
      loading: false,
      scrollEvent: null,
      cycleId: 0,
      fromWeb: false,
      setCyId: false,
      hasHistory: false
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
  watch: {
    step (n) {
      if (this.fromWeb) return

      const eventIds = {
        1: '105-13-7-0',
        2: '105-13-7-4',
        3: '105-13-7-7'
      }
      triggerService({ eventId: eventIds[n] })
    }
  },
  computed: {
    myrank () {
      const { myData } = this
      if (!myData) return ''

      if (myData.rank < 10) {
        return '0' + myData.rank
      } else if (myData.rank <= 150) {
        return myData.rank
      } else {
        return '150+'
      }
    }
  },
  methods: {
    toHistory () {
      triggerService({ eventId: '105-13-7-10', freeName1: this.step + '' })
      this.$router.push({ name: 'RaceHistory' })
    },
    imgErr (e) {
      if (e.target) {
        e.target.style.display = 'none'
      }
    },
    pageBack (btn) {
      if (btn) {
        triggerService({ eventId: '105-13-7-3' })
      } else {
        const eventIds = {
          1: '105-13-7-1',
          2: '105-13-7-5',
          3: '105-13-7-8'
        }
        triggerService({ eventId: eventIds[this.step] })
      }

      if (this.fromWeb) {
        this.$router.back()
        return
      }

      if (window.raceClient && window.raceClient.finish) {
        window.raceClient.finish()
      } else {
        this.$router.back()
      }
    },
    getRaceConf () {
      apiGetRaceConf().then(res => {
        // res.activityIsClose = true
        const { activityIsClose, rules } = res

        // 活动结束啦
        if (activityIsClose === true) {
          this.setStep3()
          return
        }
        this.getRaceCyCle()
        // 活动进行中
        if (rules && rules.length) {
          const pztop = []
          const pzlist = []
          rules.forEach(item => {
            if (item.min === item.max) {
              pztop.push({
                key: item.min,
                coin: item.rewardCoin
              })
            } else {
              pzlist.push({
                key: item.min + '-' + item.max,
                coin: item.rewardCoin
              })
            }
          })
          this.pzTop = pztop
          this.pzList = pzlist
        }
      })
    },
    getRaceCyCle () {
      apiGetRaceCycle().then(res => {
        // res.lotteryStartTime = 1670498609685
        // res.startTime = 1670498609685
        // res.endTime = 1672732530101
        const { startTime, endTime, lotteryStartTime } = res
        const nowT = Date.now()
        this.actTime = res

        this.setActTime(res)
        if (this.step === 3) return

        let isStep3 = false

        if (startTime > nowT) {
          isStep3 = true
        } else if (nowT >= endTime) {
          isStep3 = true
        }

        if (isStep3) {
          this.setStep3()
          return
        }

        // 还没到开奖时间
        if (lotteryStartTime - nowT > 0) {
          this.setStep1()
          this.curTime = Math.floor((lotteryStartTime - nowT) / 1000)
          this.cutTime()
        } else if (endTime - nowT > 0) {
          // 还没到结束时间
          this.setStep2()
          this.curTime = Math.floor((endTime - nowT) / 1000)
          this.cutTime()
        }
      })
    },
    cutTime () {
      const ct = () => {
        if (this.curTime === 0) {
          clearTimeout(this.timer)
          this.nextStep()
          return
        }
        this.curTime -= 1
        let d = Math.floor(this.curTime / 24 / 60 / 60)
        let h = Math.floor(this.curTime / 60 / 60 % 24)
        let m = Math.floor(this.curTime / 60 % 60)
        let s = Math.floor(this.curTime % 60)
        d = d < 10 ? '0' + d : d
        h = h < 10 ? '0' + h : h
        m = m < 10 ? '0' + m : m
        s = s < 10 ? '0' + s : s
        this.timeArr = [d, h, m, s]
        this.timer = setTimeout(() => {
          ct()
        }, 1000)
      }
      ct()
    },
    nextStep () {
      if (this.step === 1) {
        this.setStep2()
        const { endTime } = this.actTime
        const nowT = Date.now()
        this.curTime = Math.floor((endTime - nowT) / 1000)
        this.cutTime()
      } else if (this.step === 2) {
        this.setStep3()
      }
    },
    getRaceRank () {
      this.loading = true
      apiGetRaceRank({
        page: this.page,
        size: this.size
      }).then(res => {
        this.loading = false
        const { currentUser, rankUsers = [] } = res
        if (!rankUsers.length || rankUsers.length < this.size) {
          this.nomore = true
        }

        // currentUser.rank = 10
        // currentUser.rewardCoin = 100

        this.myData = currentUser || null
        this.rankList.push(...rankUsers)
      }).catch(e => {
        this.loading = false
      })
    },
    setPop (type) {
      this.showHelp = type

      if (type) {
        const eventIds = {
          1: '105-13-7-2',
          2: '105-13-7-6',
          3: '105-13-7-9'
        }
        triggerService({ eventId: eventIds[this.step] })
      }
    },
    getHistoryList () {
      apiGetRaceHistoryList().then(res => {
        const lastData = res[0]
        this.cycleId = lastData.cycleId
        this.setActTime(lastData)
        this.getHistoryDetail()
      })
    },
    getHistoryDetail () {
      this.loading = true
      apiGetRaceHistoryDetail({
        cycleId: this.cycleId,
        page: this.page,
        size: this.size
      }).then(res => {
        this.loading = false
        const { currentUser, rankUsers = [], historyCycle } = res
        this.setActTime(historyCycle)
        if (!rankUsers.length || rankUsers.length < this.size) {
          this.nomore = true
        }

        this.myData = currentUser
        this.rankList.push(...rankUsers)
        console.log(res)
      }).catch(e => {
        this.loading = false
      })
    },
    setActTime (data) {
      const { startTime, endTime, lotteryStartTime } = data
      this.stime = formatTime(startTime, 'YYYY/MM/DD')
      this.etime = formatTime(endTime, 'YYYY/MM/DD')

      this.rstime = formatTime(startTime, 'YYYY/MM/DD hh:mm:ss')
      this.rltime = formatTime(lotteryStartTime, 'YYYY/MM/DD hh:mm:ss')
      this.retime = formatTime(endTime, 'YYYY/MM/DD hh:mm:ss')
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
    },
    loadMore () {
      if (this.loading) return
      this.page += 1

      if (this.step === 1) {
        this.getRaceRank()
      }
      if (this.step === 3) {
        this.getHistoryDetail()
      }
    },
    setStep3 () {
      this.step = 3
      this.page = 1
      this.nomore = false
      this.loading = false
      this.rankList = []
      this.getHistoryList()
    },
    setStep1 () {
      this.step = 1
      this.page = 1
      this.nomore = false
      this.loading = false
      this.rankList = []
      this.getRaceRank()
    },
    setStep2 () {
      this.step = 2
      this.nomore = true
    },
    checkHistory () {
      apiGetRaceHistoryList().then(res => {
        if (res && res.length) {
          this.hasHistory = true
        }
      })
    }
  },
  mounted () {
    this.checkHistory()

    const QueryParams = getParams()
    const { cycleId, fromWeb } = QueryParams

    if (fromWeb) {
      this.fromWeb = true
      triggerService({ eventId: '105-13-7-13' })
    }
    if (cycleId) {
      this.setCyId = true
      this.step = 3
      this.cycleId = +cycleId
      this.getHistoryDetail()
    } else {
      this.getRaceConf()
    }
    this.scrollEvent = this.initEvent()
  },
  beforeDestroy () {
    this.scrollEvent && this.scrollEvent.removeEvent()
  }
}
</script>
<style lang="less">
@import url("./common.less");

.race-activity {
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
}

.page-box {
  min-height: 100%;
  background: url(../../assets/img/cargame/bg-r-1.png) center top no-repeat;
  background-size: 100% auto;
  &.step3{
    background-image:url(../../assets/img/cargame/bg-r-2.png);
    .top-box{
      height:320px;
    }
  }
  &.step2{
    .page-title{
      padding-top: 84px;
    }
  }
}

.top-box{
  position:relative;
  height: 610px;
}

.wait-title{
  padding: 178px 50px 0;
  font-size:20px;
  font-weight:bold;
  text-transform: uppercase;
  text-align: center;
  line-height: 1.35;
}

.wait-info{
  padding: 40px 40px;
  text-align: center;
  color:#fff;
  font-size:12px;
}

.top-act {
  position: fixed;
  top: 10px;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  z-index:10;

  .btn-back,
  .btn-help {
    width: 36px;
    height: 36px;
  }

  .btn-back {

    background: url(../../assets/img/cargame/icon-r-back.png) center top no-repeat;
    background-size: 100% auto;
  }

  .btn-help {

    background: url(../../assets/img/cargame/icon-r-help.png) center top no-repeat;
    background-size: 100% auto;
  }

  .btn-history {
    font-size: 14px;
    height: 36px;
    width: 86px;
    background: url(../../assets/img/cargame/bg-r-btn.png) center top no-repeat;
    background-size: 100% auto;
    color: #FFD400;
    text-align: center;
    line-height: 30px;
  }

}

.page-title {
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  padding-top: 55px;
  color: #000;
  text-shadow: -1px 1px #ff4d00;
  text-transform: uppercase;
}

.the-car {
  position: absolute;
  width: 526px;
  height: 220px;
  background: url(../../assets/img/cargame/img-r-car.png) center top no-repeat;
  background-size: auto 100%;
  left: -130px;
  top: 110px;
  animation: runCar 0.4s, runCarInf 2s .6s infinite;
}

.time-box {
  padding-top: 10px;

  .otime {
    width: 52px;
    height: 60px;
    background: url(../../assets/img/cargame/bg-r-timebg-1.png) center top no-repeat;
    background-size: auto 100%;
    text-align: center;
    color: #fff;
    margin: 0 2px;

    .ttitle {
      font-size: 12px;
      transform: scale(0.65);
      color: #FFBF00;
      line-height: 20px;
    }

    strong {
      display: block;
      font-size: 30px;
      font-family: 'DIN Alternate';
      color: #FFF8DD
    }
  }

  &.big{
    padding-top:20px;
    .otime{
      margin:0 4px;
      width:70px;
      height:80px;
      background-image:url(../../assets/img/cargame/bg-r-timebg-12.png);
      .ttitle{
        transform: scale(0.8);
        color:#fff;
        padding-top:4px;
      }
      strong{
        font-size:40px;
      }
    }
  }
}

.price-box {
  margin: 140px 24px 0;

  .idx {
    font-size: 11px;
    font-weight: bold;
    position: relative;
    padding: 0 4px;

    span {
      position: relative;
      z-index: 10;
      font-size:10px;
      font-style: italic;
    }

    &::after {
      content: '';
      height: 6px;
      position: absolute;
      left: 0;
      bottom: 1px;
      right: 0;
      background: linear-gradient(270deg, rgba(255, 165, 0, 0) 0%, #FFB300 100%);
      border-radius: 10px;
    }

  }

  .p-list {
    margin-top: 12px;
    background: rgba(0, 0, 0, .5);
    border-radius: 10px;
    backdrop-filter: blur(6px);
    color: #fff;
    font-size: 12px;
    padding: 16px 20px;
    flex-wrap: wrap;

    .op {
      height: 24px;
      width: 48%;

      .idx {
        font-weight: normal;
        width:45%;
      }

      .num {
        font-style: italic;
        font-size: 13px;
        font-weight:400;
        padding-right: 20px;
        background: url(../../assets/img/cargame/icon-coin.png) right center no-repeat;
        background-size: auto 16px;
      }
    }
  }

  .btn-play {
    text-align: center;
    width: 240px;
    height: 45px;
    background:url(../../assets/img/cargame/bg-r-btn2.png) center top no-repeat;
    background-size: auto 100%;
    color: #6C2E00;
    font-size: 15px;
    font-weight: bold;
    position:absolute;
    bottom:20px;
    left:50%;
    margin-left: -120px;
    box-sizing: border-box;
    padding:0 15px;
    span{
      position:relative;
      z-index:5;
    }
    &::after{
      content: '';
      position:absolute;
      z-index:1;
      left:20px;
      top:0;
      width: 40px;
      height:43px;
      background:url(../../assets/img/cargame/img-r-light.png) center top no-repeat;
      background-size: auto 100%;
      animation: btnLight  1.8s linear infinite

    }
  }
}

.top-three {
  text-align: center;

  .op {
    display: inline-flex;
    color: #fff;
    width: 156px;
    height: 30px;
    background: url(../../assets/img/cargame/bg-r-p.png) 0 center no-repeat;
    background-size: auto 100%;
    margin: 0 2px;

    .idx {
      margin-left: 15px;
    }

    .num {
      font-weight: bold;
      font-size: 13px;
      margin-right: 15px;
      padding-right: 20px;
      background: url(../../assets/img/cargame/icon-coin.png) right center no-repeat;
      background-size: auto 16px;
      font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    }
  }

  .p1 {
    width: 220px;
    height: 40px;
    margin: 0 auto 6px;

    .idx {
      font-size: 14px;
    }

    .num {
      padding-right: 26px;
      font-size: 19px;
      background-size: auto 20px
    }
  }
}

.btxt {
  color: transparent;
  -webkit-text-fill-color: #FFEA00;
  position: relative;
  span {
    position: relative;
    z-index: 2;
  }

  &::before {
    content: attr(data-text);
    position: absolute;
    left: 0;
    z-index: 0;
    -webkit-text-stroke: 5px #873A00;
  }
}

.rank-box {
  padding: 24px 0 20px;

  &.long{
    padding-bottom:80px
  }

  .the-title {
    padding: 0 10px;

    .line {
      width: 94px;
      height: 10px;
      background: url(../../assets/img/cargame/r-line-1.png) center top no-repeat;
      background-size: 100% auto;
    }

    .l1 {
      transform: scaleX(-1)
    }

    .ttxt {
      flex: 1;
      text-align: center;
      font-size: 30px;
      font-weight: bold;
      color: #000;
      text-shadow: -1px 1px #ff4d00;
      text-transform: uppercase;
    }
  }

  .rank-list {
    padding: 20px 0 0;
    color: #000;
  }

}

.race-activity {

  .orank {
    color: #000;
    .idx {
      color:#000;
      font-size: 16px;
      &.idx-1,
      &.idx-2,
      &.idx-3{
        font-size:0;
      }
    }
    .detail {
      .name {
        font-size: 14px;
        font-weight: bold;
        margin-bottom:6px;
      }

      .info {
        font-size: 12px;

        strong {
          display: inline-block;
          font-style: italic;
          padding-right: 20px;
          background: url(../../assets/img/cargame/icon-coin.png) right center no-repeat;
          background-size: auto 14px;
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
  .orank.myrank{
    position:fixed;
    padding:0;
    color:#fff;
    bottom:0;
    left:0;
    width:100%;
    z-index:20;
    background: linear-gradient(309deg, #7D4FF0 0%, #4113B2 100%, #4113B2 100%), url(../../assets/img/cargame/bg-r-my.png) right center no-repeat;
    .inner{
      height:100%;
      background: url(../../assets/img/cargame/bg-r-my.png) right center no-repeat;
      background-size: auto 100%;

    }
    .idx{
      color:#fff;
    }
  }
}

.act-time{
  height:52px;
  color:#fff;
  font-size: 20px;
  margin-top: 12px;
  background: url(../../assets/img/cargame/bg-r-title.png) center top no-repeat;
  background-size: 100% auto;
}
.res-title{
  margin-top:140px;
  padding-bottom: 10px;
  font-size: 20px;
  font-weight:bold;
  text-transform: uppercase;
}

.help-pop{

  position:fixed;
  z-index:20;
  width:100%;
  height:100%;
  top:0;
  left:0;
  .bg{
    position:absolute;
    width:100%;
    height:100%;
    z-index:2;
    background:rgba(0,0,0,.7);
    backdrop-filter: blur(4px);
  }
  .p-content{
    width:320px;
    height:360px;
    background: linear-gradient(1deg, #7D4FF0 0%, #4113B2 100%, #4113B2 100%);
    border-radius: 15px;
    position: absolute;
    z-index: 10;
    left:50%;
    top:50%;
    margin: -250px 0 0 -160px;
    border:solid 1px rgba(255, 223, 85, 1);
    color:#fff;
    animation: showPop .2s both;

    .ptitle{
      padding: 15px;
      text-align:center;
      font-size:18px;
      font-weight:bold;
    }
    .btn-cancel{
      position:absolute;
      right:10px;
      top:10px;
      width:30px;
      height:30px;
      background: url(../../assets/img/cargame/icon-cancel2.png) center no-repeat;
      background-size: auto 14px;
    }

    .p-body{
      padding: 0 15px;
      line-height:1.4;
      height: 300px;
      overflow:auto;
      font-size: 14px;

      p{
        margin-bottom:20px;
      }

    }
  }
}

@keyframes showPop{
  0%{
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
  100%{
    opacity: 1;
    transform: translateY(0) scale(1);

  }
}

@keyframes runCar {
  0% {
    opacity: 0;
    transform: translateX(-200px);
  }

  60% {
    opacity: 1;
    transform: translateX(20px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes runCarInf {
  0% {
    transform: translateX(0px);
  }

  50% {
    transform: translateX(5px);
  }

  100% {
    transform: translateX(0px);
  }
}

@keyframes btnLight{
  0%{
    opacity: 0;
    transform: translateX(0);
  }
  20%{
    opacity: 1;
    transform: translateX(50px);
  }
  40%{
    opacity: 1;
    transform: translateX(100px);
  }
  60%{
    opacity: 0;
    transform: translateX(150px);
  }
  100%{
    opacity: 0;
    transform: translateX(150px);
  }
}
</style>
