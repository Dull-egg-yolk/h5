<template>
  <div class="ask-train-page">
    <!-- ask cover 信息填写 -->
    <transition name="stepAni">
      <div class="ask-cover" v-if="step === 1">
        <!-- banner -->
        <div class="banner">
          <div class="icon-tip"></div>
          <div class="ask-title">{{ $t('asktrain.title') }}</div>
          <div class="intro">
            <div class="txt">{{ $t('asktrain.t1') }}</div>
            <div class="bg"></div>
            <div class="cover"></div>
          </div>
        </div>
        <!-- form -->
        <div class="ask-form">
          <div class="ocell">
            <div class="cell-title">
              <strong>{{ $t('asktrain.t2') }}</strong>
              <span class="tips">{{ $t('asktrain.t3') }}</span>
            </div>
            <div class="cell-main">
              <div class="m-input-box">
                <input type="number" v-model="profile.uid" :placeholder="$t('asktrain.t28')" />
                <span class="btn-clear" v-show="profile.uid" @click="profile.uid = ''"></span>
              </div>
              <div class="id-guide">
                <div class="txt">*{{ $t('asktrain.t4') }}</div>
                <div class="img"></div>
              </div>
            </div>
          </div>
          <div class="ocell">
            <div class="cell-title">
              <strong>{{ $t('asktrain.t5') }}</strong>
              <span class="tips">{{ $t('asktrain.t5-1') }}</span>
            </div>
            <div class="cell-main">
              <div class="m-input-box">
                <input type="text" v-model="profile.concat1" placeholder="Whatsapp" />
                <span class="btn-clear" v-show="profile.concat1" @click="profile.concat1 = ''"></span>
              </div>
              <div class="m-input-box">
                <input type="text" v-model="profile.concat2" placeholder="Telegram" />
                <span class="btn-clear" v-show="profile.concat2" @click="profile.concat2 = ''"></span>
              </div>
            </div>
          </div>
          <div class="ocell">
            <div class="cell-title">
              <strong>{{ $t('asktrain.t6') }}</strong>
            </div>
            <div class="cell-main">
              <div class="m-input-box">
                <input type="text" disabled v-model="group" />
              </div>
            </div>
          </div>
          <!-- terms -->
          <div class="terms-box" @click="profile.termAct = !profile.termAct">
            <span class="radio" :class="{ 'selected': profile.termAct }"></span>
            <span class="t-txt">
              {{ $t('asktrain.t7') }}
            </span>
            <span class="link-txt" @click="showTerm = true">{{ $t('asktrain.t7-1') }}</span>
          </div>
          <!-- actions -->
          <div class="actions">
            <div class="obtn line" @click="startLearn">{{ $t('asktrain.t8') }}</div>
            <div class="obtn major" @click="beginTest" v-if="testNum === 0">{{ $t('asktrain.t9') }}</div>
            <div class="obtn major" @click="againAction" v-else-if="testNum === 1 || testNum === 2">{{ $t('asktrain.t22') }}</div>

            <template v-else>
              <div class="obtn major disabled">{{ unlockLeftTime | secondFormat }}</div>
              <div class="tips">*Your number of questions for today has run out. Please answer again after the
                countdown.</div>
            </template>
          </div>
        </div>
      </div>
    </transition>

    <!-- 答题列表 -->
    <transition name="stepAni">
      <div class="test-layer" v-if="step === 2">
        <div class="time-box">
          {{ $t('asktrain.t10') }}:
          <strong>{{ leftTime | secondFormat(true) }}</strong>
        </div>
        <ask-list ref="testBox" :listLen="QList.length" class="test-list">
          <template v-slot="curQ">
            <div class="otest" v-for="(item, index) of QList" :key="item.Q" :class="{ 'cur': index === curQ.data }">
              <span class="q-type">{{ $t('asktrain.t' + (item.RK.length === 1 ? '11' : '12')) }}</span>
              <div class="q-wrap">
                <div class="q-title">{{ $t('asktrain.' + item.Q) }}</div>
                <div class="q-options">
                  <div class="oop" v-for="(oa, oaidx) in item.A" :key="oa" @click="choiceAction(oa, index)"
                    :class="{ selected: AList[index] && AList[index].includes(oa) }">
                    <span class="oa-id">{{ liIndex[oaidx] }}</span>
                    {{ $t('asktrain.' + oa) }}
                  </div>
                </div>
              </div>
              <div class="q-action">
                <span class="btn btn-pre" v-show="index !== 0" @click="testJump(curQ.data - 1)"></span>
                <div class="qid">{{ index + 1 }} / {{ QList.length }}</div>
                <span class="btn btn-next" v-show="index !== QList.length - 1" @click="testJump(curQ.data + 1)"></span>
              </div>
            </div>
          </template>
        </ask-list>
      </div>
    </transition>

    <!-- 答题提交按钮 -->
    <div class="test-action" v-if="step === 2">
      <div class="obtn" @click="submitTest('confirm')">{{ $t('asktrain.t13') }}</div>
    </div>

    <!-- 考试结果 -->
    <transition name="stepAni">
      <div class="test-result" v-if="step === 3" :class="{ 'success': qStatus === 1 }">
        <!-- 结果title -->
        <div class="res-title" v-if="qStatus === 2 && testNum === 1">{{ $t('asktrain.t201') }}</div>
        <div class="res-title" v-if="qStatus === 2 && testNum === 2">{{ $t('asktrain.t20') }}</div>
        <div class="res-title" v-else-if="qStatus === 2 &&  testNum === 3">{{ $t('asktrain.t21') }}</div>
        <div class="res-title" v-else-if="qStatus === 1 && wNum !== 0">{{ $t('asktrain.t18') | showUid(profile.uid) }}
        </div>
        <div class="res-title" v-else-if="qStatus === 1 && wNum === 0">{{ $t('asktrain.t16') | showUid(profile.uid) }}
        </div>

        <!-- 答题数据 -->
        <div class="res-info">
          <div class="score">
            {{ $t('asktrain.t17') }}:
            <strong>{{ rNum * 10 }}</strong>
          </div>
          <div class="detail">
            <span class="icon-right"></span>
            {{ rNum }}
            <span class="icon-wrong"></span>
            {{ wNum }}
          </div>
        </div>
        <!-- tips -->
        <div class="tips" v-if="wqList.length">{{ $t('asktrain.t19') }}:</div>

        <!-- 错题列表 -->
        <div class="wq-list question-list" v-if="wqList.length">
          <div class="otest" v-for="(item) of wqList" :key="item.Q">
            <span class="q-type">
              {{ item.i + 1 }} / {{ QList.length }}
              {{ $t('asktrain.t' + (item.RK.length === 1 ? '11' : '12')) }}
            </span>
            <div class="q-title">
              {{ $t('asktrain.' + item.Q) }}
            </div>
            <div class="q-options">
              <div class="oop" v-for="(oa, oaidx) in item.A" :key="oa"
                :class="{ selected: (item.RK.includes(oa) && !item.MK.includes(oa)), wrong: item.WK.includes(oa), less: (item.MK.includes(oa) && !item.WK.includes(oa)) }">
                <span class="oa-id">{{ liIndex[oaidx] }}</span>
                {{ $t('asktrain.' + oa) }}
              </div>
            </div>
          </div>
        </div>

        <!-- 满分样式 -->
        <div class="success-bg" v-if="qStatus === 1 && !wNum">
          <div class="bot"></div>
          <div class="ren"></div>
          <div class="icon"></div>
        </div>
      </div>
    </transition>
    <div class="test-action" v-if="step === 3 && qStatus === 2">
      <div class="obtn" @click="startLearn">{{ $t('asktrain.t8') }}</div>
      <div class="obtn" @click="againAction" v-if="testNum !== 3">{{ $t('asktrain.t22') }}</div>
    </div>

    <!-- 学习页面 -->
    <transition name="stepAni">
      <div class="test-layer" v-if="step === 4">
        <ask-list class="learn-list" :listLen="learnList.length" ref="learnBox">
          <template v-slot="curQ">
            <div class="otest" v-for="(item, index) of learnList" :key="item.t" :class="{ 'cur': index === curQ.data }">
              <span class="q-type">{{ index + 1 }} / {{ learnList.length }}</span>
              <div class="q-wrap">
                <div class="q-title"> {{ $t('asktrain.' + item.t) }}</div>

                <div class="ole-info">
                  <div class="sub-q" v-if="item.q">{{ $t('asktrain.' + item.q) }}</div>
                  <div class="alist" v-if="item.a">
                    <div class="atxt" v-for="(oa, aidx) of item.a" :key="oa">
                      <strong v-if="!item.noId">{{ aidx + 1 + ':' }} </strong>
                      <span v-html="$t('asktrain.' + oa)"></span>
                    </div>
                  </div>
                  <div class="ilist" v-if="item.i">
                    <div class="itxt " v-for="(oi) of item.i" :key="oi">
                      <span class="icon"></span>
                      <span v-html="$t('asktrain.' + oi)"></span>
                    </div>
                  </div>
                  <div class="ol-img" v-if="item.img.length">
                    <img :src="[`https://h5.livuchat.com/static/images/asktrain/${langTxt}/${oimg}.png`]" alt=""
                      v-for="(oimg, imgIdx) of item.img" :key="imgIdx" />
                  </div>
                  <div class="slist" v-if="item.s">
                    <div class="stxt " v-for="(os) of item.s" :key="os">
                      <span v-html="$t('asktrain.' + os)"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="q-action">
                <span class="btn btn-pre" v-show="index !== 0" @click="learnJump(curQ.data - 1)"></span>
                <div class="btn-test">
                  <div class="obtn inline major" @click="beginTest" v-if="testNum === 0">{{ $t('asktrain.t9') }}</div>
                  <div class="obtn inline major" @click="againAction" v-else-if="testNum === 1 || testNum === 2">{{ $t('asktrain.t22') }}
                  </div>
                  <div class="obtn major inline disabled" v-else>{{ unlockLeftTime | secondFormat }}</div>
                </div>
                <span class="btn btn-next" v-show="index !== learnList.length - 1"
                  @click="learnJump(curQ.data + 1)"></span>
              </div>
            </div>
          </template>
        </ask-list>
      </div>
    </transition>

    <!-- 考试结果提交确认弹框 -->
    <transition enter-active-class="showPop" leave-active-class="hidePop" :duration="{ enter: 300, leave: 300 }">
      <div class="com-pop pop-confirm" v-if="showSubConfirm" @click="cancelConfirmPop">
        <div class="body" @click.stop>
          <div class="btn-cancel" @click="cancelConfirmPop" v-if="this.leftTime">×</div>
          <div class="pop-title">{{ $t('asktrain.t23') }}</div>
          <div class="pop-main">
            <div class="m-input-box">
              <input type="text" v-model="confirmUid"  :placeholder="$t('asktrain.t28')" />
              <span class="btn-clear" v-show="confirmUid" @click="confirmUid = ''"></span>
            </div>
            <div class="tips">{{ $t('asktrain.t14') }}</div>
            <div class="action">
              <div class="obtn major" @click="actionSubConfim">{{ $t('asktrain.t15') }}</div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 协议弹框 -->
    <transition enter-active-class="showPop" leave-active-class="hidePop" :duration="{ enter: 300, leave: 300 }">
      <div class="com-pop pop-confirm term-pop" v-if="showTerm" @click="showTerm = false">
        <div class="body" @click.stop>
          <div class="btn-cancel" @click="showTerm = false" v-if="this.leftTime">×</div>
          <div class="pop-main">
            <div class="term-txt">
              <iframe src="https://www.rileycillian.com/streamersQuizPromotion_privacy.html" frameborder="0"></iframe>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- <div class="clearbtn">
      <button @click="clearData">删除数据</button>
    </div> -->
  </div>
</template>

<script>
import { getParams, secondFormat, formatTime } from '@/utils/index'
import Toast from '@/components/toast/index'
import AskList from './askList.vue'
import { askData, learnData } from './data'
import { triggerService } from '@/utils/statisticalTool'

const PROFILEKEY = 'RC_ASKT_PROFILE' // 用户信息存储
const ASKDATAKEY = 'RC_ASKT_ASKDATA' // 生成的问题列表数据
const MYASKDATAKEY = 'RC_ASKT_MYASKDATA' // 用户的答题数据
const MYTESTRESKEY = 'RC_ASKT_MYTESTRES' // 用户的考试结果
const MYWRONGDATAKEY = 'RC_ASKT_MYWRONGDATA' // 用户的错题数据
const MYTESTTIMEKEY = 'RC_ASKT_TESTTIME' // 考试剩余时间
const ASKUNLOCKTIMEKEY = 'RC_ASKT_UNLOCKTIME' // 解锁重新答题的时间

const ASKVERKEY = 'RC_ASKT_TESTVER' // test 版本

export default {
  name: 'AskTrain',
  data () {
    return {
      originUid: 0,
      confirmUid: '',
      profile: {
        uid: '',
        concat1: '',
        concat2: '',
        termAct: false
      },
      group: '',
      testTime: 20 * 60,
      leftTime: 20 * 60,
      cutTimer: null,
      step: 1, // 1 填信息  2 开始考试  3 展示结果
      QList: [], // 题目数据
      AList: [], // 我的回答列表
      wqList: [], // 错误题目列表
      rNum: 0, // 正确题数
      wNum: 0, // 错误题数
      qStatus: 0, // 0 未参加 1 及格  2 不及格
      testNum: 0,
      retry: false,

      version: 1,
      liIndex: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
      showSubConfirm: false,

      unlockTime: 0,
      unlockLeftTime: 0,
      lockTimer: null,
      learnList: learnData,
      showTerm: false,

      testStartTime: 0
    }
  },
  filters: {
    secondFormat,
    showUid (origin, ext) {
      return origin.replace('***', ext)
    }
  },
  components: {
    AskList
  },
  watch: {
  },
  computed: {
    langTxt () {
      const imgLang = ['en', 'es', 'pt']
      const curLang = this.$i18n.locale || ''

      if (imgLang.indexOf(curLang) === -1) {
        return 'en'
      }
      if (curLang === 'pt') {
        return 'pl'
      }
      return curLang
    }
  },
  methods: {
    testJump (index) {
      this.$refs.testBox.jumpTo(index)
    },
    learnJump (index) {
      this.$refs.learnBox.jumpTo(index)
    },
    startLearn () {
      if (this.testNum === 0 && !this.checkProfile()) return
      // 开始答题啦
      if (this.testNum === 3) {
        this.cutLockTime()
      }
      this.step = 4

      // 学习页面曝光
      triggerService({
        eventId: '105-5-2-1',
        free_name1: this.profile.uid + '',
        free_name2: JSON.stringify({
          group: this.group,
          concat1: this.profile.concat1 || '',
          concat2: this.profile.concat2 || ''
        })
      })
    },
    /**
     * 读取本地用户数据
     */
    loadProfile () {
      const profileData = localStorage.getItem(PROFILEKEY)
      if (profileData) {
        this.profile = JSON.parse(profileData)
        this.originUid = this.profile.uid
        this.confirmUid = this.profile.uid
      }
    },
    /**
     * 点击开始测试时 存储用户信息 生成题目
     * 如果用户修改过uid 删除之前所有测试信息 重新生成一套题目 开始答题
     *
     */
    saveProfile () {
      if (!this.originUid || this.originUid !== this.profile.uid) {
        this.clearAll()
        localStorage.setItem(PROFILEKEY, JSON.stringify(this.profile))
        this.createQuestionData()
      }
      localStorage.setItem(PROFILEKEY, JSON.stringify(this.profile))
      this.confirmUid = this.profile.uid
    },
    /**
     *  读取本地测试存档
     */
    loadQestionFile () {
      // 从local里获取用户的答案数据  如果有就取出来
      const alistData = localStorage.getItem(MYASKDATAKEY)
      if (alistData) {
        this.AList = JSON.parse(alistData)
      }

      // 从local里获取用户之前的答题结果 防止用户重复参加
      const resData = localStorage.getItem(MYTESTRESKEY)
      if (resData) {
        const { qStatus, rNum, wNum, testNum, retry } = JSON.parse(resData)
        this.qStatus = qStatus || 0
        this.rNum = rNum || 0
        this.wNum = wNum || 0
        this.testNum = testNum || 0
        this.retry = retry || false

        if (this.qStatus && this.testNum !== 3) {
          this.step = 3
        }
      }

      // 错题读取
      const wqList = localStorage.getItem(MYWRONGDATAKEY)
      if (wqList) {
        this.wqList = JSON.parse(wqList)
      }

      // 读取考试剩余时间
      const leftTime = localStorage.getItem(MYTESTTIMEKEY)
      if (leftTime) {
        this.leftTime = +leftTime
      }

      // 读取unlock时间
      const unlockTime = localStorage.getItem(ASKUNLOCKTIMEKEY)
      if (unlockTime) {
        this.unlockTime = +unlockTime
        this.cutLockTime()
      }

      // 进入页面中 先从localStorage取题目数据 如果有就用localStorage里的
      const localData = localStorage.getItem(ASKDATAKEY)
      if (localData) {
        this.QList = JSON.parse(localData)
      }
    },
    /**
     * 随机打乱重排15道题顺序 每道题的选项顺序也打乱
     * 把得到的数据保持在localstorage里
     *
     */
    createQuestionData () {
      // R必填 O选填
      let { R, O } = askData
      R = R.slice()
      O = O.slice()

      const newR = []

      // 必做题8道 从选填题中随机选5道题 合并入R；
      while (R.length < 13) {
        const idx = Math.floor(Math.random() * O.length)
        R.push(...O.splice(idx, 1))
      };

      // 对R进行乱排
      while (R.length) {
        const idx = Math.floor(Math.random() * R.length)
        const cq = R.splice(idx, 1)[0]
        const na = []
        // 选项也乱排；
        const { A } = cq
        while (A.length) {
          const aIdx = Math.floor(Math.random() * A.length)
          na.push(...A.splice(aIdx, 1))
        }
        cq.A = na
        newR.push(cq)
      }

      // 生成的题目列表存储本地
      localStorage.setItem(ASKDATAKEY, JSON.stringify(newR))
      this.QList = newR

      // 当前问卷版本存储本地 方便修改时对用户做重置操作
      localStorage.setItem(ASKVERKEY, this.version)
    },
    // 检测
    checkProfile () {
      // 表单校验
      const { uid, termAct } = this.profile
      if (!uid) {
        Toast(this.$t('asktrain.t25'))
        return false
      }
      if (!termAct) {
        Toast(this.$t('asktrain.t26'))
        return false
      }

      // 存储用户信息
      this.saveProfile()

      return true
    },

    /**
     * 开始考试啦
     */
    beginTest () {
      // 开始答题啦
      if (!this.checkProfile()) return

      // 切换到考试
      this.step = 2
      this.cutTime()

      this.testStartTime = new Date().getTime()
    },
    /**
     * 考试倒计时
     */
    cutTime () {
      clearTimeout(this.cutTimer)
      if (!this.leftTime) {
        setTimeout(() => {
          Toast(this.$t('asktrain.t27'))
          this.showSubConfirm = true
        }, 400)
        return
      }

      this.cutTimer = setTimeout(() => {
        this.leftTime -= 1
        localStorage.setItem(MYTESTTIMEKEY, this.leftTime)
        if (this.leftTime > 0) {
          this.cutTime()
        } else {
          Toast(this.$t('asktrain.t27'))
          this.showSubConfirm = true
        }
      }, 1000)
    },

    /**
     * 锁定时间倒计时
     */
    cutLockTime () {
      clearTimeout(this.lockTimer)
      this.lockTimer = setTimeout(() => {
        const leftTime = Math.floor((this.unlockTime - new Date().getTime()) / 1000)
        if (leftTime > 0) {
          this.unlockLeftTime = leftTime
          this.cutLockTime()
        } else {
          this.unlockTime = 0
          localStorage.removeItem(ASKUNLOCKTIMEKEY)
          this.clearAll()
          this.createQuestionData()
        }
      }, 1000)
    },

    /**
     * 选中选项时触发
     * @param {*} oa 选的答案的id
     * @param {*} index 题的序号
     */
    choiceAction (oa, index) {
      if (this.qStatus) return
      if (!this.leftTime) return
      // 初始化数据
      if (!this.AList[index]) {
        this.$set(this.AList, index, [])
      }
      const { RK } = this.QList[index]
      // 判断单选 多选
      const qtype = RK.length === 1 ? 'S' : 'M'

      // 如果已选择 取消选择
      const idx = this.AList[index].indexOf(oa)
      if (idx !== -1) {
        this.AList[index].splice(idx, 1)
      } else {
        // 单选替换
        if (qtype === 'S') {
          this.$set(this.AList, index, [oa])
        } else {
          // 多选push
          this.AList[index].push(oa)
        }
      }

      if (qtype === 'M' && this.AList[index].length === 1) {
        Toast(this.$t('asktrain.t29'))
      }

      // 存入localStorage 中断答题可继续
      localStorage.setItem(MYASKDATAKEY, JSON.stringify(this.AList))
    },
    /**
     *  提交考试
     *  type = confirm 弹出确认弹框
     */
    submitTest (type) {
      // 终止倒计时
      clearTimeout(this.cutTimer)

      // 第一次考试的时候才弹出
      if (type === 'confirm' && this.testNum === 0) {
        this.showSubConfirm = true
        return
      }

      if (this.qStatus) return
      let score = 0
      const qdetail = []
      const wqList = []
      this.wNum = 0
      this.rNum = 0

      for (let i = 0; i < this.QList.length; i++) {
        let oa = this.AList[i]
        const oq = this.QList[i]
        const { RK, ID } = oq
        // 没答完
        if (!oa || !oa.length) {
          // 区分用户自主提交 还是时间到了自动提交
          // 时间清零时 没有答的题目算作错题
          if (this.leftTime) {
            // 滚动页面到首个未答问题位置
            Toast(this.$t('asktrain.t24'))
            this.testJump(i)
            this.cutTime()
            return false
          } else {
            oa = []
          }
        }

        const ca = {
          id: ID
        }
        // 答对啦
        if (oa.sort().join(',') === RK.sort().join(',')) {
          score += 10
          ca.res = 1
          this.rNum += 1
        } else {
          // 答错了
          ca.res = 0
          this.wNum += 1
          // 生成错题数据
          wqList.push(this.createWrongQData(oq, oa, i))
        }
        qdetail.push(ca)
      }

      // 错题数据存档
      this.wqList = wqList
      localStorage.setItem(MYWRONGDATAKEY, JSON.stringify(wqList))

      // 考试结果计算
      if (score < 100) {
        // 不及格
        this.qStatus = 2
        this.retry = false
      } else {
        this.qStatus = 1
      }
      this.testNum += 1
      // 三次不及格 生成锁定时间吧 2次改成3次  24小时改成12小时
      if (this.testNum === 3) {
        this.unlockTime = new Date().getTime() + 12 * 3600 * 1000
        localStorage.setItem(ASKUNLOCKTIMEKEY, this.unlockTime)
      }

      // 考试结果信息 存档
      const testRes = {
        qStatus: this.qStatus,
        rNum: this.rNum,
        wNum: this.wNum,
        testNum: this.testNum
      }
      localStorage.setItem(MYTESTRESKEY, JSON.stringify(testRes))
      localStorage.removeItem(MYTESTTIMEKEY)
      this.step = 3

      // 考试结果上报
      triggerService({
        eventId: '105-5-2-2',
        free_name1: this.profile.uid + '',
        free_name2: JSON.stringify({
          group: this.group,
          concat1: this.profile.concat1 || '',
          concat2: this.profile.concat2 || '',
          score: score,
          testNum: this.testNum,
          testTime: this.testTime - this.leftTime,
          testBeginTime: formatTime(this.testStartTime),
          testDetail: qdetail
        })
      })
    },
    /**
     * 生成用户考试错误题数据
     * 存档
     */
    createWrongQData (oq, oa, i) {
      const { Q, A, RK } = oq
      const WK = []
      oa.forEach(a => {
        if (!RK.includes(a)) {
          WK.push(a)
        }
      })
      return {
        Q,
        A,
        RK,
        WK,
        MK: oa,
        i
      }
    },
    /**
     * 重置用户考试数据
     */
    clearAll () {
      this.qStatus = 0
      this.QList = []
      this.AList = []
      this.wqList = []
      this.testNum = 0
      this.leftTime = this.testTime
      localStorage.removeItem(ASKDATAKEY)
      localStorage.removeItem(MYASKDATAKEY)
      localStorage.removeItem(MYTESTRESKEY)
      localStorage.removeItem(MYWRONGDATAKEY)
    },
    /**
     * 第一次第二次不及格 再考一次
     */
    againAction () {
      console.log(this.testNum, this.retry)
      if ((this.testNum === 1 || this.testNum === 2) && this.retry) {
        this.beginTest()
        return
      }
      const curNum = this.testNum
      this.clearAll()
      this.testNum = curNum
      // 考试结果信息 存档
      const testRes = {
        qStatus: 0,
        rNum: 0,
        wNum: 0,
        testNum: this.testNum,
        retry: true
      }
      localStorage.setItem(MYTESTRESKEY, JSON.stringify(testRes))
      this.createQuestionData()
      this.step = 2
      this.cutTime()
    },
    /**
     * 关闭确认uid弹框
     */
    cancelConfirmPop () {
      if (this.leftTime) {
        this.showSubConfirm = false
        this.cutTime()
      }
    },
    /**
     * 提交确认uid弹框
     */
    actionSubConfim () {
      if (!this.confirmUid) {
        Toast(this.$t('asktrain.t25'))
        return
      }
      this.profile.uid = this.confirmUid
      localStorage.setItem(PROFILEKEY, JSON.stringify(this.profile))

      this.showSubConfirm = false
      this.submitTest()
    },
    clearData () {
      localStorage.clear()
      window.location.reload()
    }

  },
  mounted () {
    this.group = getParams('group')
    this.loadProfile()
    this.loadQestionFile()
  }
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
