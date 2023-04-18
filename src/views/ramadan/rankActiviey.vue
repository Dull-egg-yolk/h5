<template>
  <div class="body">
    <div class="top">
      <div class="body-top">
        <div></div>
        <div class="help" @click="showHelpPop"></div>
      </div>
      <div class="body-title">
        <h2>{{ $t('ramadan.ramadanTitle') }}</h2>
        <p>{{ $t('ramadan.ramadanTime', {coin: timeBuons}) }}</p>
      </div>
      <div class="body-time">
        <div class="time-box fx-vc">
          <div class="otime">
            <div class="ttitle">{{ $t('ramadan.day') }}</div>
            <strong>{{ timeArr[0] }}</strong>
          </div>
          <div class="otime">
            <div class="ttitle">{{ $t('ramadan.hour') }}</div>
            <strong>{{ timeArr[1] }}</strong>
          </div>
          <div class="otime">
            <div class="ttitle">{{ $t('ramadan.minute') }}</div>
            <strong>{{ timeArr[2] }}</strong>
          </div>
          <div class="otime">
            <div class="ttitle">{{ $t('ramadan.second') }}</div>
            <strong>{{ timeArr[3] }}</strong>
          </div>
        </div>
      </div>
    </div>
    <div class="rank-box">
      <div class="title">{{ this.time1 }}</div>
      <div class="rank-task" v-for="item in hostRamadanList" :key="item">
        <div class="top-box">
          <div class="coin"><span>{{ item.bonus }}</span><span class="icon"></span></div>
          <div class="text"><p>{{ $t('ramadan.taskTitle', {coin: item.bonus}) }}</p></div>
        </div>
        <div class="progress">
          <div :style="'width:' + getProgress(youCoin + '/' + item.goals) + '%'"></div>
        </div>
        <div class="botton-box">
          <div class="button" :class="{ 'finish': (!item.finishStatus && youCoin >= item.goals) }" @click="drawCoin(item)">
            {{ $t('ramadan.taskBtn') }}
          </div>
          <div class="coin"><span class="left">{{ youCoin > item.goals ? item.goals : youCoin }}</span><span>/</span><span
              class="right">{{ item.goals }}</span><span class="icon"></span></div>
        </div>
      </div>
    </div>
    <div class="bottom"></div>
    <div class="help-pop" v-if="showHelp">
      <div class="bg"></div>
      <div class="p-content">
        <div class="ptitle">{{ $t('ramadan.rulesTitle') }}</div>
        <div class="btn-cancel hover" @click="setPop(false)"></div>
        <div class="p-body">
          <p>{{ $t('ramadan.ramadanrules1') }}</p>
          <p>{{ $t('ramadan.ramadanrules2') }}</p>
          <p>{{ $t('ramadan.ramadanrules3') }}</p>
          <p>{{ $t('ramadan.ramadanrules4') }}</p>
          <p>{{ $t('ramadan.ramadanrules5') }}</p>
          <p>{{ $t('ramadan.ramadanrules6') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiGetRamadanList, apiGetRamadanTime, apiGetRamadanCion } from '@/api/rankActiviey'
import { getParams, formatNumberDot, formatTime } from '@/utils/index'
import Toast from '@/components/toast/index'
import Cookies from 'js-cookie'
import { triggerService } from '@/utils/statisticalTool'
const QueryParams = getParams()
export default {
  data () {
    return {
      userId: QueryParams.userId || Cookies.get('userId'),
      appId: QueryParams.appId || Cookies.get('appId'),
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
      hostRamadanList: [],
      youCoin: 0,
      time1: this.$t('ramadan.startTime'),
      step: 1,
      timeBuons: 0
    }
  },
  filters: {
    formatNumberDot
  },
  components: {},

  computed: {},

  watch: {
    showHelp (n) {
      if (n) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    }
  },

  methods: {
    showHelpPop () {
      triggerService({ eventId: '105-15-2-1', freeName1: this.step })
      this.showHelp = true
    },
    setPop () {
      this.showHelp = false
    },
    getList () {
      apiGetRamadanList().then(res => {
        console.log(res)
        this.hostRamadanList = res.hostRamadanTaskDtos
        this.youCoin = res.coin
        for (let i = 0; i < res.hostRamadanTaskDtos.length; i++) {
          this.timeBuons = this.timeBuons + res.hostRamadanTaskDtos[i].bonus
        }
      })
    },
    getTime () {
      apiGetRamadanTime().then(res => {
        // res.startTime = 1678798000000
        // res.endTime = 1678799000000
        const { startTime, endTime } = res
        this.actTime = res
        const nowT = Date.now()
        this.setActTime(res)
        console.log(startTime)
        console.log(nowT)
        if (startTime - nowT > 0) {
          this.step = 1
          triggerService({ eventId: '105-15-2-0', freeName1: this.step })
          this.curTime = Math.floor((startTime - nowT) / 1000)
          this.cutTime()
        } else if (endTime - nowT > 0) {
          this.step = 2
          triggerService({ eventId: '105-15-2-0', freeName1: this.step })
          this.time1 = this.$t('ramadan.endTime')
          this.curTime = Math.floor((endTime - nowT) / 1000)
          this.cutTime()
        }
      })
    },
    drawCoin (data) {
      apiGetRamadanCion({ taskNum: data.taskNum, userId: this.userId }).then(res => {
        triggerService({ eventId: '105-15-2-2', freeName1: JSON.stringify({ taskNum: data.taskNum, bonus: data.bonus }) })
        if (res.code === 200) {
          Toast(this.$t('ramadan.toastSuccess', { coin: data.bonus }))
          data.finishStatus = true
        } else {
          Toast(this.$t('ramadan.toastFiled'))
        }
      })
    },
    setActTime (data) {
      const { startTime, endTime } = data
      this.stime = formatTime(startTime, 'YYYY/MM/DD')
      this.etime = formatTime(endTime, 'YYYY/MM/DD')
      this.rstime = formatTime(startTime, 'YYYY/MM/DD hh:mm:ss')
      this.retime = formatTime(endTime, 'YYYY/MM/DD hh:mm:ss')
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
    getProgress (val) {
      if (!val) return 0
      const arr = val.split('/')
      const res = arr[0] / arr[1] * 100
      if (res >= 100) return 100
      return res
    },
    nextStep () {
      if (this.step === 1) {
        this.setStep2()
        const { endTime } = this.actTime
        const nowT = Date.now()
        this.curTime = Math.floor((endTime - nowT) / 1000)
        this.cutTime()
      } else if (this.step === 2) {
        // this.setStep3()
      }
    },
    setStep2 () {
      this.step = 2
      this.nomore = true
    }
  },
  mounted () {
    this.getList()
    this.getTime()
  }
}
</script>
<style lang='less' scoped>
@import url("./rankActiviey.less");
</style>
