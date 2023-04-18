<template>
  <div class="race-activity" ref="scrollBody">
    <div class="page-box" :class="['step' + step]">
      <div class="top-act fx-vb">
        <div></div>
        <div class="r fx-vc">
          <div class="btn hover btn-help" @click="setPop(true)" v-if="!setCyId"></div>
        </div>
      </div>

      <div class="top-box">

        <div class="page-title">
          {{ $t('star.starTitle',{ appid: appIdList[parseInt(appId)] }) }}
        </div>
        <!-- <div class="the-car"></div> -->
        <div class="the-icon1"></div>
        <div class="the-icon3"></div>
        <div class="the-icon4"></div>
        <div class="the-icon5"></div>
        <div class="the-icon6"></div>
        <div class="the-icon7"></div>
        <template v-if="(step === 1)">
          <div class="time-box fx-vc">
            <div class="otime">
              <div class="ttitle">DAYS</div>
              <strong>{{ timeArr[0]}}</strong>
            </div>
            <div class="otime">
              <div class="ttitle">HOURS</div>
              <strong>{{ timeArr[1]}}</strong>
            </div>
            <div class="otime">
              <div class="ttitle">MINUTES</div>
              <strong>{{ timeArr[2]}}</strong>
            </div>
            <div class="otime">
              <div class="ttitle">SECONDS</div>
              <strong>{{ timeArr[3]}}</strong>
            </div>
          </div>
          <!-- 奖金 -->
          <div class="price-box">
            <div class="top-three">
              <div class="op fx-vb" :class="['p' + item.key]" v-for="item in pzTop" :key="item.key">
                <div class="idx">
                  <span class="idx-icon" :class="['idx-' + item.key]"></span>
                  <span class="span">NO.{{ item.key }}</span>
                </div>
                <div class="num">
                  <span class="btxt" :data-text="'+' + item.coin | formatNumberDot">
                    <span>+{{ item.coin | formatNumberDot }}</span>
                  </span>
                </div>
              </div>
            </div>
            <div class="p-list fx-vb" v-if="pzList.length">
              <div class="op fx-vb" v-for="(item, index) in pzList" :key="index">
                <div class="idx">
                  <span>NO.{{ item.key }}</span>
                </div>
                <div class="num">
                  +{{ item.coin | formatNumberDot }}
                </div>
              </div>
            </div>
            <div class="btn-play hover fx-vc">
              <span>
                {{ $t('cargame.trank') }}
              </span>
            </div>
          </div>
        </template>

        <template v-if="(step === 3)">
          <!-- 时间 -->
          <div class="act-time fx-vc">
            {{ stime }} ~ {{ etime }}
          </div>
          <!-- <div class="res-title fx-vc">
            <div class="btxt" :data-text="$t('cargame.trt3')">
              <span>
                {{ $t('cargame.trt3') }}
              </span>
            </div>
          </div> -->
          <div class="btn-play hover fx-vc">
            <span>
              {{ $t('cargame.trank') }}
            </span>
          </div>
        </template>

        <template v-if="(step === 2)">
          <div class="wait-title fx-vc">
            <div class="btxt" :data-text="$t('star.waitingResults')">
              <span>
                {{ $t('star.waitingResults') }}
              </span>
            </div>
          </div>
          <div class="time-box big fx-vc">
            <div class="otime">
              <div class="ttitle">HOURS</div>
              <strong>{{ timeArr[1]}}</strong>
            </div>
            <div class="otime">
              <div class="ttitle">MINUTES</div>
              <strong>{{ timeArr[2]}}</strong>
            </div>
            <div class="otime">
              <div class="ttitle">SECONDS</div>
              <strong>{{ timeArr[3]}}</strong>
            </div>
          </div>
          <div class="wait-info">
            {{ $t('star.explain') }}
          </div>
        </template>

      </div>

      <template v-if="(step !== 2)">
        <!-- ranking list -->
        <div class="rank-box" :class="{ long: myData && myData.rank }">
          <div class="h-list">
            <div class="oh">
              <div class="the-users" :class="{ 'avatar-step1': (step === 1)}">
                <div class="ou" :class="['ou-' + idx]" v-for="(ou, idx) in topList" :key="idx">
                  <div class="quan">
                    <div class="quan1"><img :src="imgUrl[idx].imgSrc" /></div>
                    <div class="avatar">
                      <img @error="imgErr" :src="ou.headImg | imgEdit" alt="">
                    </div>
                  </div>
                  <div class="name" :style="{'--mainImg': ('url('+ 'https://h5.livuchat.com/static/images/countryFlag/' + ($countryCode[[0, 1, 2, 3, 4, 5].includes(ou.countryId) ? ou.countryId = 6 : ou.countryId].short.toLowerCase()) + '.png' +')')}">{{ ou.userName }}</div>
                  <div style="display: flex; flex-direction: column;">
                    <div class="won">{{ ou.coin | formatNumberDot }}</div>
                  <!-- <div class="num-rewardCoin" v-if="(step === 3)"> -->
                    <div class="num" v-if="(step === 3)">{{ ou.rewardCoin | formatNumberDot }} </div>
                  <!-- </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="rank-list reverse">
            <div class="orank fx-vb" v-for="(item, index) in rankList" :key="index">
              <!-- <div class="idx" :class="[`idx-` + item.rank]" v-if="(step == 3)">
                {{(item.rank >= 10 ? item.rank : '0' + item.rank)}}
                <span class="cup"></span>
              </div> -->
              <div class="idx">
                {{(item.rank >= 10 ? item.rank : '0' + item.rank)}}
              </div>
              <div class="avatar">
                <img @error="imgErr" :src="item.headImg | imgEdit" alt="">
              </div>
              <div class="detail">
                <div class="name">{{ item.userName }}<span class="icon">
                      <img :src="'https://h5.livuchat.com/static/images/countryFlag/' + ($countryCode[[0, 1, 2, 3, 4, 5].includes(item.countryId) ? item.countryId = 6 : item.countryId].short.toLowerCase()) + '.png'" />
                    </span></div>
                <div class="info">
                  <strong>{{ item.coin | formatNumberDot }}</strong>
                </div>
              </div>
              <div class="winNum" v-if="item.rewardCoin">
                <strong class="number">+{{ item.rewardCoin | formatNumberDot }}</strong>
              </div>
            </div>
          </div>
          <div class="load-more" ref="loadMore" v-if="!nomore"><span class="icon"></span></div>

        </div>
      </template>

      <div class="help-pop" v-if="showHelp">
        <div class="bg"></div>
        <div class="p-content">
          <div class="ptitle">{{ $t('cargame.trules') }}</div>
          <div class="btn-cancel hover" @click="setPop(false)"></div>
          <div class="p-body">
            <p v-html="$t('star.rules1', { time1: '<br>' + rstime, time2: rltime })"></p>
            <p v-html="$t('star.rules2', { time2: '<br>' + rltime, time3: retime })"></p>
            <p>{{ $t('star.rules3') }}</p>
            <p>{{ $t('star.rules4') }}</p>
            <p>{{ $t('star.rules5') }}</p>
            <p>{{ $t('star.rules6') }}</p>

          </div>
        </div>
      </div>
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
                <strong v-if="myData.coin">{{ myData.coin | formatNumberDot }}</strong>
                <strong v-else>0</strong>
              </div>
            </div>
            <div class="winNum" v-if="myData.rewardCoin">
              <strong class="number">+{{ myData.rewardCoin | formatNumberDot }}</strong>
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
import { apiGetStarConf, apiGetStarCycle, apiGetStarRank, apiGetStarHistoryList, apiGetStarHistoryDetail, apiGetStarTop, apiGetStarHistoryTop } from '@/api/star'
import { getParams, formatNumberDot, formatTime } from '@/utils/index'
const QueryParams = getParams()
export default {
  name: 'CarRule',
  components: {
  },
  data () {
    return {
      userId: QueryParams.userId || Cookies.get('userId'),
      appId: QueryParams.appId || Cookies.get('appId'),
      appIdList: {
        20000: 'LivU',
        19999: 'Tumile',
        77777: 'MixU'
      },
      imgUrl: [
        { id: 0, imgSrc: require('../../assets/img/star/one.png') },
        { id: 1, imgSrc: require('../../assets/img/star/two.png') },
        { id: 2, imgSrc: require('../../assets/img/star/three.png') }
      ],
      step: 0,
      pzTop: [],
      pzList: [],
      rankList: [],
      topList: [],
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
      setCyId: false
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
        1: '105-14-1-0',
        2: '105-14-1-0',
        3: '105-14-1-0'
      }
      const freeName = {
        1: '1',
        2: '2',
        3: '3'
      }
      triggerService({ eventId: eventIds[n], freeName1: freeName[n] })
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
  methods: {
    imgErr (e) {
      if (e.target) {
        e.target.style.display = 'none'
      }
    },
    GetStarConf () {
      apiGetStarConf().then(res => {
        // res.activityIsClose = true
        const { activityIsClose, rules } = res

        // 活动结束啦
        if (activityIsClose === true) {
          this.setStep3()
          return
        }
        this.GetStarCyCle()
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
    GetStarCyCle () {
      apiGetStarCycle().then(res => {
        // res.lotteryStartTime = 1673179200090
        // res.startTime = 1672617600000
        // res.endTime = 1673186400090
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
        console.log(lotteryStartTime)
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
    GetStarRank () {
      this.loading = true
      apiGetStarRank({
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
        const selectData = [
          {
            rank: 1
          },
          {
            rank: 2
          },
          {
            rank: 3
          }
        ]
        this.myData = currentUser || null
        this.rankList.push(...rankUsers)
        const newData = this.rankList.filter(
          (a) => !selectData.some((b) => a.rank === b.rank)
        )
        this.rankList = newData
      }).catch(e => {
        this.loading = false
      })
    },
    GetStarTop () {
      apiGetStarTop({
        top: 2
      }).then(res => {
        console.log(res)
        this.topList = res
      })
    },
    GetStarHistoryTop () {
      apiGetStarHistoryTop({
        top: 3,
        cycleId: this.cycleId
      }).then(res => {
        console.log(res)
        this.topList = res
      })
    },
    setPop (type) {
      this.showHelp = type
      if (type) {
        triggerService({ eventId: '105-14-1-1' })
        triggerService({ eventId: '105-14-1-2' })
      }
    },
    getHistoryList () {
      apiGetStarHistoryList().then(res => {
        console.log(res[0])
        const lastData = res[0]
        this.cycleId = lastData.cycleId
        this.setActTime(lastData)
        this.getHistoryDetail()
        this.GetStarHistoryTop()
      })
    },
    getHistoryDetail () {
      this.loading = true
      apiGetStarHistoryDetail({
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
        const selectData = [
          {
            rank: 1
          },
          {
            rank: 2
          },
          {
            rank: 3
          }
        ]
        this.myData = currentUser
        this.rankList.push(...rankUsers)
        const newData = this.rankList.filter(
          (a) => !selectData.some((b) => a.rank === b.rank)
        )
        this.rankList = newData
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
        this.GetStarRank()
        // this.GetStarTop()
      }
      if (this.step === 3) {
        this.getHistoryDetail()
        // this.GetStarHistoryTop()
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
      this.GetStarRank()
      this.GetStarTop()
    },
    setStep2 () {
      this.step = 2
      this.nomore = true
    }
  },
  mounted () {
    document.body.style.position = 'fixed'
    document.body.style.top = 0
    document.body.style.left = 0
    document.body.style.overflow = 'hidden'
    const QueryParams = getParams()
    const { cycleId, fromWeb } = QueryParams

    if (fromWeb) {
      this.fromWeb = true
    }
    if (cycleId) {
      this.setCyId = true
      this.step = 3
      this.cycleId = +cycleId
      this.getHistoryDetail()
      this.GetStarHistoryTop()
    } else {
      this.GetStarConf()
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
  // position: fixed;
  // top: 0;
  // left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow: auto;
  overflow-x: hidden;
  color: #562500;
  font-size: 12px;
  -webkit-overflow-scrolling: touch;
}

.page-box {
  min-height: 100%;
  background: url(../../assets/img/star/star-bg-1.png) center top no-repeat;
  background-size: 100% auto;

  &.step3 {
    background-image: url(../../assets/img/star/star-bg-3.png);
    .top-box {
      height: 450px;
    }
    .btn-play {
      bottom: 25px;
      font-size: 18px;
      font-weight: bold;
    }
    .rank-box .h-list .ou-2 {
      right: 0;
      top: 5px;
    }
    .rank-list {
      margin-bottom: 0 !important;
    }
  }

  &.step2 {
    .page-title {
      padding-top: 48px;
    }
  }
}

.top-box {
  position: relative;
  height: 580px;
}

.wait-title {
  padding: 228px 50px 0;
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  line-height: 1.35;
  color: #fff;
}

.wait-info {
  padding: 40px 40px;
  padding-top: 160px;
  text-align: center;
  color: #000;
  font-size: 16px;
  font-weight: bold;
}

.top-act {
  position: fixed;
  top: 10px;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  z-index: 10;

  .btn-back,
  .btn-help {
    width: 30px;
    height: 30px;
  }
  .btn-help {
    background: url(../../assets/img/star/btn-help.png) center top no-repeat;
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
  padding-top: 47px;
  color: #F9D76D;
  // text-transform: uppercase;
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

.the-icon1 {
  width: 50px;
  height: 50px;
  position: absolute;
  left: 70px;
  top: 110px;
  background: url(../../assets/img/star/star-icon-1.png) center top no-repeat;
  background-size: auto 100%;
  animation: flowAni1 3s infinite
}

.the-icon3 {
  width: 50px;
  height: 50px;
  position: absolute;
  left: 320px;
  top: 150px;
  position: absolute;
  background: url(../../assets/img/star/star-icon-3.png) center top no-repeat;
  background-size: auto 100%;
  animation: flowAni 3s infinite
}

.the-icon4 {
  width: 40px;
  height: 40px;
  position: absolute;
  left: 320px;
  top: 250px;
  position: absolute;
  background: url(../../assets/img/star/star-icon-4.png) center top no-repeat;
  background-size: auto 100%;
  animation: flowAni1 3s infinite
}

.the-icon5 {
  width: 50px;
  height: 50px;
  position: absolute;
  left: 10px;
  top: 180px;
  position: absolute;
  background: url(../../assets/img/star/star-icon-5.png) center top no-repeat;
  background-size: auto 100%;
  animation: flowAni 3s infinite
}

.the-icon6 {
  width: 30px;
  height: 30px;
  position: absolute;
  left: 25px;
  top: 260px;
  position: absolute;
  background: url(../../assets/img/star/star-icon-6.png) center top no-repeat;
  background-size: auto 100%;
  animation: flowAni1 3s infinite
}

.the-icon7 {
  width: 60px;
  height: 60px;
  position: absolute;
  left: 230px;
  top: 110px;
  position: absolute;
  background: url(../../assets/img/star/star-icon-7.png) center top no-repeat;
  background-size: auto 100%;
  animation: flowAni 2s infinite
}

.time-box {
  padding-top: 180px;

  .otime {
    width: 52px;
    height: 60px;
    background: url(../../assets/img/star/time-bg.png) center center no-repeat;
    background-size: auto 100%;
    text-align: center;
    color: #fff;
    margin: 0 2px;

    .ttitle {
      font-size: 12px;
      transform: scale(0.65);
      color: #FFC103;
      line-height: 20px;
    }

    strong {
      display: block;
      font-size: 30px;
      font-family: 'DIN Alternate';
      color: #F9D669
    }
  }

  &.big {
    padding-top: 20px;

    .otime {
      margin: 0 4px;
      width: 70px;
      height: 80px;
      background: url(../../assets/img/star/time-bg.png) center center no-repeat;
      background-size: auto 100%;

      .ttitle {
        transform: scale(0.8);
        color: #FFC103;
        padding-top: 4px;
      }

      strong {
        font-size: 40px;
      }
    }
  }
}

.price-box {
  margin: 10px 24px 0;

  .idx {
    font-size: 11px;
    font-weight: bold;
    position: relative;
    padding: 0 4px;
    .idx-icon {
      display: inline-block;
      width: 30px;
      height: 30px;
      margin-right: 5px;
    }

    .idx-1 {
      background: url(../../assets/img/star/cup3.png) 0 0 no-repeat;
      background-size: 100% auto;
    }

    .idx-2 {
      background: url(../../assets/img/star/cup2.png) 0 0 no-repeat;
      background-size: 100% auto;
    }

    .idx-3 {
      background: url(../../assets/img/star/cup1.png) 0 0 no-repeat;
      background-size: 100% auto;
    }

    .span {
      position: relative;
      z-index: 10;
      font-size: 10px;
      font-style: italic;
    }
  }

  .p-list {
    color: #fff;
    font-size: 12px;
    padding: 16px 25px;
    padding-top: 0;
    flex-wrap: wrap;

    .op {
      height: 20px;
      width: 49%;

      .idx {
        font-weight: normal;
        width: 45%;
        span{
          font-size: 10px;
          font-style: italic;
          font-weight: bold;
        }
      }

      .num {
        font-size: 14px;
        font-weight: 400;
        padding-right: 23px;
        background: url(../../assets/img/cargame/icon-coin.png) right center no-repeat;
        background-size: auto 16px;
      }
    }
  }

  .btn-play {
    text-align: center;
    width: 240px;
    height: 45px;
    color: #000;
    font-size: 18px;
    font-weight: bold;
    position: absolute;
    bottom: 10px;
    left: 50%;
    margin-left: -120px;
    box-sizing: border-box;
    padding: 0 15px;
  }
}

.top-three {
  text-align: center;

  .op {
    display: inline-flex;
    color: #fff;
    width: 156px;
    height: 30px;
    background: linear-gradient(270deg, #F97E1D 0%, #FF2500  100%);
    border-radius: 21px;
    margin: 0 2px;

    .idx {
      margin-left: -10px !important;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .num {
      font-size: 12px;
      margin-right: 15px;
      padding-right: 20px;
      background: url(../../assets/img/cargame/icon-coin.png) right center no-repeat;
      background-size: auto 16px;
    }
  }

  .p1,
  .p2,
  .p3 {
    width: 180px;
    height: 20px;
    margin: 0 auto 3px;

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
  // color: transparent;
  // -webkit-text-fill-color: #FFEA00;
  position: relative;

  span {
    position: relative;
    z-index: 2;
    font-size: 16px;
  }

  &::before {
    // content: attr(data-text);
    position: absolute;
    left: 0;
    z-index: 0;
    -webkit-text-stroke: 5px #873A00;
  }
}

.rank-box {
  padding: 0 0 20px;
  background: #fff;

  &.long {
    padding-bottom: 80px
  }

  .h-list {
    .oh {
      width: 350px;
      height: 180px;
      margin: 0 auto 20px;
      background: url(../../assets/img/star/top-bg.png) center top no-repeat;
      background-size: auto 180px;
      box-sizing: border-box;
      padding: 10px 0;
      margin-bottom: 0;
    }

    .the-time {
      font-weight: bold;
      color: #000;
      background: url(../../assets/img/cargame/icon-right.png) right center no-repeat;
      background-size: auto 80%
    }

    .the-users {
      position: relative;
      height: 150px;
    }

    .ou {
      position: absolute;
      color: #fff;
      width: 120px;
      text-align: center;
    }

    .ou-0 {
      left: 50%;
      top: -22px;
      margin-left: -60px;
      .quan {
        position: relative;
        width: 90px;
        height: 90px;
        // background: url(../../assets/img/star/one.png) center center no-repeat;
        // background-size: auto 75px;
        margin: 0 auto;
        .quan1 {
          position: absolute;
          // width: 90px;
          // height: 90px;
          margin: 0 auto;
          z-index: 19;
          img {
            width: 80px;
            height: 80px;
          }
        }
        .avatar {
          position: absolute;
          top: 13px;
          left: 12px;
          width: 58px;
          height: 58px;
        }
      }
    }

    .ou-1 {
      left: 0;
      top: -3px;
      .quan {
        position: relative;
        width: 90px;
        height: 90px;
        margin: 0 auto;
        .quan1 {
          position: absolute;
          margin: 0 auto;
          z-index: 19;
          img {
            width: 90px;
            height: 90px;
          }
        }
        .avatar {
          position: absolute;
          top: 15px;
          left: 15px;
          width: 60px;
          height: 60px;
        }
      }
    }

    .ou-2 {
      right: 0;
      top: 5px;
      .quan {
        position: relative;
        width: 90px;
        height: 90px;
        // background: url(../../assets/img/star/three.png) center center no-repeat;
        // background-size: auto 80px;
        margin: 0 auto;
        .quan1 {
          position: absolute;
          margin: 0 auto;
          z-index: 19;
          img {
            width: 90px;
            height: 90px;
          }
        }
        .avatar {
          position: absolute;
          top: 14.5px;
          left: 15px;
          width: 61px;
          height: 61px;
        }
      }
    }
    .avatar-step1 {
      .ou-2 {
        .avatar {
          margin-bottom: 10px !important;
        }
      }
      .avatar {
        margin-bottom: 12px !important;
      }
      .name {
        font-size: 17px !important;
        &::after {
          content: '';
          position: absolute;
          width: 17px;
          height: 11px;
          background-image: var(--mainImg);
          background-repeat: no-repeat;
          background-size: 100% auto;
          line-height: 13px;
          margin: 5px;
        }
      }
      .won {
        font-size: 17px !important;
        &::after {
          content: '';
          position: absolute;
          width: 18px;
          height: 18px;
          background: url(../../assets/img/star/xin.png) center right no-repeat;
          background-size: auto 20px;
        }
      }
    }
    .avatar {
      position: absolute;
      top: 18px;
      left: 20px;
      margin: 0 auto 8px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      background: rgba(0, 0, 0, 0.2) url(https://h5.livuchat.com/staticProd/worldCup/img/user.png) center no-repeat;
      background-size: 100% auto;

      img {
        width: 100%;
        min-height: 100%;
      }
    }

    .name {
      font-weight: bold;
      font-size: 14px;
      &::after {
          content: '';
          position: absolute;
          width: 17px;
          height: 11px;
          background-image: var(--mainImg);
          background-repeat: no-repeat;
          background-size: 100% auto;
          line-height: 13px;
          margin: 4px;
        }
    }
    .flex-div {
      display: flex;
      flex-direction: column;
    }
    .won {
      font-size: 13px;
      display: inline-block;
      font-weight: bold;
      font-style: italic;
      // background: url(../../assets/img/star/xin.png) center right no-repeat;
      // background-size: auto 16px;
      position: relative;
      display: inline-block;
      &::after {
        content: '';
        position: absolute;
        width: 14px;
        height: 14px;
        background: url(../../assets/img/star/xin.png) center right no-repeat;
        background-size: auto 15px;
      }
    }
    // .num-rewardCoin {
    //   // display: flex;
    //   // justify-content: center;
    //   // align-items: center;
    //   margin-top: 1px;
      .num{
        font-size: 14px;
        font-weight: bold;
        font-style: italic;
        // padding-right: 6px;
        position: relative;
        display: inline-block;
        &::after {
          content: '';
          position: absolute;
          width: 14px;
          height: 14px;
          background: url(../../assets/img/cargame/icon-coin.png) center no-repeat;
          background-size: auto 15px;
          margin-top: 1px;
        }
        &::before {
          content: '+';
          position: absolute;
          width: 16px;
          height: 16px;
          font-size: 16px;
          line-height: 14px;
          left: 22px;
          top: 0;
        }
      }
    // }
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
    color: #000;
    padding: 0;
    // margin-bottom: 45px;
  }

}

.race-activity {

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
          background: url(../../assets/img/star/xin.png) right center no-repeat;
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
    position: fixed;
    padding: 0;
    color: #fff;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 20;

    .inner {
      height: 100%;
      background: linear-gradient(359deg, #D56200 0%, #FEBB23 100%);
      border-image: linear-gradient(86deg, rgba(254, 255, 0, 0), rgba(254, 238, 0, 1), rgba(255, 215, 0, 0)) 3 3;
      backdrop-filter: blur(2px);

    }

    .idx {
      color: #fff;
    }
  }
}

.act-time {
  height: 52px;
  color: #fff;
  font-size: 20px;
  margin-top: 200px;
}

.res-title {
  // margin-top:140px;
  padding-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
}

.btn-play {
  text-align: center;
  width: 240px;
  height: 45px;
  color: #000;
  font-size: 15px;
  font-weight: bold;
  position: absolute;
  bottom: 25px;
  left: 50%;
  margin-left: -120px;
  box-sizing: border-box;
  padding: 0 15px;
  margin-top: 20px;
}

.help-pop {

  position: fixed;
  z-index: 21;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: rgba(0, 0, 0, .7);
    backdrop-filter: blur(4px);
  }

  .p-content {
    width: 320px;
    height: 430px;
    background: linear-gradient(359deg, #D56200 0%, #FEBB23 100%);
    border-radius: 30px;
    border: 3px solid;
    border-image: linear-gradient(86deg, rgba(254, 255, 0, 0), rgba(254, 238, 0, 1), rgba(255, 215, 0, 0)) 3 3;
    backdrop-filter: blur(2px);
    position: absolute;
    z-index: 10;
    left: 50%;
    top: 50%;
    margin: -250px 0 0 -160px;
    border: solid 1px rgba(255, 223, 85, 1);
    color: #fff;
    animation: showPop .2s both;

    .ptitle {
      padding: 15px;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
    }

    .btn-cancel {
      position: absolute;
      right: 10px;
      top: 10px;
      width: 30px;
      height: 30px;
      background: url(../../assets/img/cargame/icon-cancel2.png) center no-repeat;
      background-size: auto 14px;
    }

    .p-body {
      padding: 0 15px;
      line-height: 1.4;
      height: 380px;
      overflow: auto;
      font-size: 14px;

      p {
        margin-bottom: 20px;
      }

    }
  }
}

@keyframes showPop {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }

  100% {
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

@keyframes btnLight {
  0% {
    opacity: 0;
    transform: translateX(0);
  }

  20% {
    opacity: 1;
    transform: translateX(50px);
  }

  40% {
    opacity: 1;
    transform: translateX(100px);
  }

  60% {
    opacity: 0;
    transform: translateX(150px);
  }

  100% {
    opacity: 0;
    transform: translateX(150px);
  }
}

@keyframes flowAni {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-5px);
  }

  100% {
    transform: translateY(0);

  }
}

@keyframes flowAni1 {
  0% {
    transform: translateY(-5px);
  }

  50% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-5px);

  }
}
[lang="ar"],
[lang="he"],
[lang="ur"] {
  direction: rtl;
  .top-three .op .num {
    font-size: 12px;
    margin-left: 15px;
    padding-left: 20px;
    background: url(../../assets/img/cargame/icon-coin.png) left center no-repeat;
    background-size: auto 16px;
  }
  .price-box .p-list .op .num {
    font-size: 16px;
    font-weight: 400;
    padding-left: 26px;
    padding-right: 0;
    background: url(../../assets/img/cargame/icon-coin.png) left center no-repeat;
    background-size: auto 20px;
}
}
</style>
