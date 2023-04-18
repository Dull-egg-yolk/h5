<template>
  <div
    class="question-page"
    :class="{ 'show-res': qStatus, 'full': !wqList.length && qStatus, 'end': (qStatus && end) || qStatus === 1 }"
  >
    <div class="banner" v-if="!qStatus">
      <h1 class="banner-title" v-html="$t('questions.btitle')"></h1>
      <div class="rule-box">
        <div class="rule-title">{{ $t('questions.ruleTitle') }}</div>
        <div class="rule-txt">
          <p>{{ $t('questions.r0') }}</p>
          <p>{{ $t('questions.r1') }} {{ $t('questions.r2') }}</p>

          <div v-if="extend">
            <p>{{ $t('questions.r8') }}</p>
            <p>
              {{ $t('questions.r3') }}
              <br />
              {{ $t('questions.r4') }}
              <br />
              {{ $t('questions.r5') }}
              <br />
              {{ $t('questions.r6') }}
            </p>
            <strong>{{ $t('questions.r7') }}</strong>
            <p>{{ $t('questions.r9') }}</p>
            <p>{{ $t('questions.r10') }}</p>
            <p>{{ $t('questions.r11') }}</p>
          </div>
        </div>
        <div class="extend" @click="extendToggle" :class="{ drop: !extend }">
          {{ $t('questions.' + (extend ? 't4' : 't5')) }}
          <span class="icon-drop"></span>
        </div>
        <div class="bg"></div>
      </div>
    </div>
    <div class="result-box" v-else>
      <div class="res-title" v-if="qStatus === 1">{{ $t('questions.s1') }}</div>
      <div class="res-title" v-if="qStatus === 2 && !end">{{ $t('questions.s2') }}</div>
      <div class="res-title" v-if="qStatus === 2 && end">{{ $t('questions.t8') }}</div>

      <div class="res-coin" v-if="qStatus === 1">
        <strong>+{{ coin }}</strong>
        <span class="icon-coin"></span>
      </div>
      <div class="res-info">
        <div class="score">
          {{ $t('questions.t10') }}:
          <strong>{{ rNum * 10 }}</strong>
        </div>
        <div class="detail">
          <span class="icon-right"></span>
          {{ rNum }}
          <span class="icon-wrong"></span>
          {{ wNum }}
        </div>
      </div>
      <div class="tips" v-if="wqList.length">{{ $t('questions.t3') }}</div>
    </div>
    <div class="Q-list" ref="qlist" v-if="!wqList.length && !qStatus">
      <div class="oq" v-for="(item, index) in QList" :key="item.Q">
        <div class="index">{{ index + 1 }}</div>
        <dl>
          <dt>
            {{ $t('questions.' + item.Q) }}
            <span
              class="type"
            >({{ $t('questions.' + (item.RK.length === 1 ? 't1' : 't2')) }})</span>
          </dt>
          <dd>
            <ul>
              <li
                v-for="(al, aidx) in item.A"
                :key="al"
                @click="choiceAction(index, al)"
                :class="{ selected: AList[index] && AList[index].includes(al) }"
              >
                <span class="li-id">{{ liIndex[aidx] }}</span>
                {{ $t('questions.' + al) }}
              </li>
            </ul>
          </dd>
        </dl>
      </div>
    </div>

    <div class="Q-list res-list" ref="qlist" v-if="wqList.length">
      <div class="oq" v-for="(item, index) in wqList" :key="item.Q">
        <div class="index">{{ index + 1 }}</div>
        <dl>
          <dt>
            {{ $t('questions.' + item.Q) }}
            <span
              class="type"
            >({{ $t('questions.' + (item.RK.length === 1 ? 't1' : 't2')) }})</span>
          </dt>
          <dd>
            <ul>
              <li
                v-for="(al, aidx) in item.A"
                :key="al"
                @click="choiceAction(index, al)"
                :class="{ selected: (item.RK.includes(al) && !item.MK.includes(al)), wrong: item.WK.includes(al), less: (item.MK.includes(al) && !item.WK.includes(al)) }"
              >
                <span class="li-id">{{ liIndex[aidx] }}</span>
                {{ $t('questions.' + al) }}
              </li>
            </ul>
          </dd>
        </dl>
      </div>
    </div>

    <div class="condition-link">
      <span @click="showCondition = true">Terms and conditions</span>
    </div>

    <div class="page-action" v-if="!qStatus">
      <div class="btn-sub" @click="submitAction">{{ $t('questions.t9') }}</div>
    </div>
    <div class="page-action" v-if="!end && qStatus === 2">
      <div class="btn-sub" @click="reTryAction">{{ $t('questions.t7') }}</div>
    </div>

    <!-- 协议弹框 -->
    <transition
      enter-active-class="showPop"
      leave-active-class="hidePop"
      :duration="{ enter: 300, leave: 300 }"
    >
      <div class="term-pop" v-if="showCondition" @click="showCondition = false">
        <div class="body" @click.stop>
          <div class="btn-cancel" @click="showCondition = false">×</div>
          <div class="txt">
            <iframe
              src="https://www.rileycillian.com/streamersQuizPromotion_privacy.html"
              frameborder="0"
            ></iframe>
          </div>
        </div>
      </div>
    </transition>

    <!-- 测试按钮 清除local -->
    <!-- <div class="clear" @click="clearLocal">清除本地数据</div> -->
  </div>
</template>

<script>
import questionData from './data/questionData'
import Toast from '@/components/toast/index'
import { triggerService } from '@/utils/statisticalTool'
export default {
  data () {
    return {
      extend: false,
      // 状态 0 未参加  1 及格 2 不及格
      qStatus: 0,
      coin: 0,
      isReTry: false,
      end: false,
      liIndex: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
      QList: [],
      AList: [],
      wqList: [],
      rNum: 0,
      wNum: 0,
      showCondition: false,
      qv: 1
    }
  },
  computed: {
  },
  methods: {
    /**
     * 随机打乱重排15道题顺序 每道题的选项顺序也打乱
     * 把得到的数据保持在localstorage里
     *
     */
    createQuestionData () {
      console.log('created question list')
      // R必填 O选填
      let { R, O } = questionData
      R = R.slice()
      O = O.slice()

      const newR = []

      // 从选填题中随机选5道题 合并入R；
      while (R.length < 10) {
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
      localStorage.setItem('RC_QA_DATA', JSON.stringify(newR))
      this.QList = newR

      // 当前问卷版本存储本地 方便修改时对用户做重置操作
      localStorage.setItem('RC_QA_VER', this.qv)
    },
    // 读取存档
    loadFile () {
      // 从local里获取用户的答案数据  如果有就取出来
      const alistData = localStorage.getItem('RC_QA_MA')
      if (alistData) {
        this.AList = JSON.parse(alistData)
      }

      // 从local里获取用户之前的答题结果 防止用户重复参加
      const resData = localStorage.getItem('RC_QA_RES')
      if (resData) {
        const { coin, qStatus, rNum, wNum, end } = JSON.parse(resData)
        this.coin = coin
        this.qStatus = qStatus
        this.rNum = rNum
        this.wNum = wNum
        this.end = end
      }

      // 读取是否为第二次考试
      const isReTry = localStorage.getItem('RC_QA_RETRY')
      if (isReTry) {
        this.isReTry = true
      }

      // 错题读取
      const wqList = localStorage.getItem('RC_QA_WQLIST')
      if (wqList) {
        this.wqList = JSON.parse(wqList)
      }

      // 获得问卷版本 没及格 & 新用户 & 老题用户 重置新题库
      const questionVer = +localStorage.getItem('RC_QA_VER')
      if (!this.coin && (!questionVer || questionVer !== this.qv)) {
        this.qStatus = 0
        this.isReTry = false
        this.end = false
        this.QList = []
        this.AList = []
        this.wqList = []
        this.rNum = 0
        this.wNum = 0
        localStorage.removeItem('RC_QA_DATA')
        localStorage.removeItem('RC_QA_RES')
        localStorage.removeItem('RC_QA_MA')
        localStorage.removeItem('RC_QA_RETRY')
        localStorage.removeItem('RC_QA_WQLIST')
        this.createQuestionData()
        return
      }

      // 进入页面中 先从localStorage取题目数据 如果有就用localStorage里的
      const localData = localStorage.getItem('RC_QA_DATA')
      if (localData) {
        this.QList = JSON.parse(localData)
        console.log('load file')

        return false
      }

      // 如果localStorage没有 则新生成乱序题目数据 并存入localStorage
      this.createQuestionData()
    },
    extendToggle () {
      this.extend = !this.extend
    },
    choiceAction (index, item) {
      if (this.qStatus) return

      // 初始化数据
      if (!this.AList[index]) {
        this.$set(this.AList, index, [])
      }
      const { RK } = this.QList[index]
      // 判断单选 多选
      const qtype = RK.length === 1 ? 'S' : 'M'

      // 如果已选择 取消选择
      const idx = this.AList[index].indexOf(item)
      if (idx !== -1) {
        this.AList[index].splice(idx, 1)
      } else {
        // 单选替换
        if (qtype === 'S') {
          this.$set(this.AList, index, [item])
        } else {
          // 多选push
          this.AList[index].push(item)
        }
      }

      // 存入localStorage 中断答题可继续
      localStorage.setItem('RC_QA_MA', JSON.stringify(this.AList))
    },
    submitAction () {
      if (this.qStatus) return

      let score = 0
      const qdetail = []
      const wqList = []

      this.wNum = 0
      this.rNum = 0

      for (let i = 0; i < this.QList.length; i++) {
        const oa = this.AList[i]
        const oq = this.QList[i]
        const { RK, ID } = oq
        // 没答完
        if (!oa || !oa.length) {
          // 滚动页面到首个未答问题位置
          const qDom = this.$refs.qlist.querySelectorAll('.oq')[i]
          const yPos = qDom.offsetTop
          window.scrollTo(0, yPos - 100)
          Toast(this.$t('questions.t6'))

          return false
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
          wqList.push(this.createWrongQData(oq, oa))
        }
        qdetail.push(ca)
      }

      this.wqList = wqList
      localStorage.setItem('RC_QA_WQLIST', JSON.stringify(wqList))

      // 计算金币数
      if (score < 60) {
        this.coin = 0
      } else if (score >= 60 && score < 80) {
        this.coin = 80
      } else if (score >= 80 && score < 100) {
        this.coin = 200
      } else if (score === 100) {
        this.coin = 500
      }

      // 结果
      if (score < 60) {
        this.qStatus = 2
        if (this.isReTry) {
          this.end = true
        }
      } else {
        this.qStatus = 1
      }

      // 本地存储数据 页面打开用
      const QARes = {
        qStatus: this.qStatus,
        coin: this.coin,
        rNum: this.rNum,
        wNum: this.wNum,
        end: this.end
      }
      localStorage.setItem('RC_QA_RES', JSON.stringify(QARes))
      window.scrollTo(0, 0)

      // 结果上报
      triggerService({ eventId: '105-5-1-2', free_id1: score, free_name1: this.coin, free_name2: JSON.stringify(qdetail), free_id2: this.qv })
    },
    createWrongQData (oq, oa) {
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
        MK: oa
      }
    },
    reTryAction () {
      this.qStatus = 0
      this.isReTry = true
      this.QList = []
      this.AList = []
      this.wqList = []
      localStorage.removeItem('RC_QA_RES')
      localStorage.removeItem('RC_QA_MA')
      localStorage.removeItem('RC_QA_DATA')
      localStorage.removeItem('RC_QA_WQLIST')
      localStorage.setItem('RC_QA_RETRY', '1')
      this.createQuestionData()
      window.scrollTo(0, 0)
    },
    clearLocal () {
      localStorage.clear()
      window.location.reload()
    }
  },
  mounted () {
    this.loadFile()

    // 结果上报
    triggerService({ eventId: '105-5-1-1', free_id2: this.qv })

    const wh = document.documentElement.clientHeight
    document.querySelector('.question-page').style.minHeight = wh + 'px'
  }
}
</script>

<style lang="less" scoped>
[lang="pt"],
[lang="id"],
[lang="es"] {
  .question-page .banner .banner-title {
    font-size: 12px;
  }
}
.question-page {
  background: #8833ff url(../assets/img/questions/banner.png) 0 0 no-repeat;
  background-size: 100% auto;
  padding-bottom: 90px;
  color: #1a1a1a;
  box-sizing: border-box;

  &.full {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  &.end {
    padding-bottom: 20px;
  }

  &.show-res {
    background-image: url(../assets/img/questions/result-bg.png);
  }
  .banner {
    color: #fffbf8;
    padding-top: 156px;
    .banner-title {
      position: absolute;
      left: 20px;
      top: 10px;
      height: 64px;
      display: flex;
      align-items: center;
      font-size: 15px;
      font-family: "Arial Black";
      text-transform: uppercase;
      width: 200px;
    }

    .rule-box {
      width: 355px;
      margin: 0 auto;
      position: relative;
      overflow: hidden;
      border-radius: 12px;
      border: solid 1px rgba(255, 137, 146, 0.6);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

      .rule-title {
        position: absolute;
        top: 0;
        left: 0;
        background: linear-gradient(
          313deg,
          rgba(253, 121, 228, 0) 10%,
          #ff8992 90%
        );
        border-radius: 100px;
        z-index: 10;
        font-size: 14px;
        height: 26px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 15px;
        font-weight: bold;
        line-height: 1;
      }
      .rule-txt {
        position: relative;
        z-index: 2;
        font-size: 12px;
        padding: 40px 15px 0;
        line-height: 1.5;
        height: auto;
        overflow: hidden;

        p {
          margin-bottom: 10px;
        }
      }

      .extend {
        color: #19ff93;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 0 15px 0;
        text-align: center;
        position: relative;
        z-index: 5;
        font-size: 12px;
        .icon-drop {
          display: inline-block;
          width: 9px;
          height: 8px;
          background: url(../assets/img/questions/icon-drop.png) center
            no-repeat;
          background-size: 100% auto;
          margin-left: 10px;
        }

        &.drop .icon-drop {
          transform: rotate(180deg);
        }
      }

      .bg {
        width: 375px;
        height: 712px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -157px;
        background: url(../assets/img/questions/banner.png) 0 0 no-repeat;
        background-size: 375px auto;
        filter: blur(15px);
        z-index: 1;
      }
    }
  }

  .result-box {
    color: #fffbf8;
    font-size: 14px;
    .res-title {
      text-align: center;
      padding: 40px 40px 10px;
      font-size: 15px;
    }
    .res-coin {
      padding: 2px 0 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 50px;
      font-family: "Arial Black",Arial, Helvetica, sans-serif;
      font-weight: bolder;

      .icon-coin {
        display: inline-block;
        width: 44px;
        height: 44px;
        background: url(../assets/img/questions/icon-coin.png) center no-repeat;
        background-size: 100% auto;
        margin-left: 15px;
        animation: coinAni 0.2s;
      }
    }

    .res-info {
      width: 270px;
      margin: 10px auto 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 44px;
      padding: 0 15px;
      border-radius: 100px;
      background: rgba(0, 0, 0, 0.1);

      .detail {
        display: inline-flex;
        align-items: center;
        .icon-right,
        .icon-wrong {
          display: inline-block;
          width: 14px;
          height: 14px;
          margin: 0 8px 0 20px;
          background-position: center;
          background-repeat: no-repeat;
          background-size: 100% auto;
        }
        .icon-right {
          background-image: url(../assets/img/questions/icon-right.png);
        }

        .icon-wrong {
          background-image: url(../assets/img/questions/icon-wrong.png);
        }
      }
    }

    .tips {
      text-align: center;
      padding: 20px 0 5px;
      font-size: 12px;
      opacity: 0.8;
    }
  }

  .Q-list {
    width: 355px;
    margin: 10px auto;
    .oq {
      background: #fff;
      margin-bottom: 10px;
      border-radius: 12px;
      font-size: 13px;
      padding: 15px;
      position: relative;
      .index {
        position: absolute;
        left: 0;
        top: 10px;
        height: 24px;
        width: 26px;
        font-weight: bold;
        border-radius: 0 100px 100px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        background: linear-gradient(
          102deg,
          rgba(253, 121, 228, 0) 0%,
          #ff8992 100%
        );
      }

      dl {
        dt {
          padding-left: 18px;
          font-size: 14px;
          line-height: 1.5;
          font-weight: 500;
          .type {
            color: #ff0095;
            font-weight: normal;
            font-size: 12px;
          }
        }
        dd {
          font-size: 12px;
          li {
            margin-top: 6px;
            padding: 12px 10px 12px 30px;
            border-radius: 10px;
            border: 1px solid #e8e8e8;
            position: relative;
            transition: all 0.4s;

            &.selected {
              background: #19ff93;
              border-color: #19ff93;
            }

            &.less {
              border-color: #19ff93;
            }

            .li-id {
              position: absolute;
              left: 0;
              top: 0;
              font-size: 14px;
              padding: 12px 0 0 10px;
              font-weight: 500;
            }
          }
        }
      }
    }

    &.res-list {
      .oq dl dd li {
        &.selected,
        &.less {
          background: url(../assets/img/questions/icon-right-2.png) 300px center
            no-repeat;
          background-size: auto 16px;
          padding-right: 30px;
        }

        &.wrong {
          border-color: #ff8992;
          color: red;
          background: url(../assets/img/questions/icon-wrong.png) 300px center
            no-repeat;
          background-size: auto 16px;
          padding-right: 30px;
        }

        &.selected {
          background-color: #19ff93;
        }
        &.less {
          background-color: rgba(25, 255, 147, 0.5);
        }
      }
    }
  }

  .page-action {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 15px 15px;
    background: #fff;
    z-index: 100;
    box-sizing: border-box;
    box-shadow: 0 -4px 10px rgba(136, 51, 255, 0.2);
  }
  .btn-sub {
    background: #ff8992;
    color: #fff;
    font-size: 16px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
  }
}

.condition-link {
  text-align: center;
  font-size: 12px;
  color: #fff;
  padding: 10px 20px;
  text-decoration: underline;
  opacity: 0.6;
  transform: scale(0.8);
}

.term-pop {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.5);

  &.showPop {
    .body {
      animation: showPop 0.4s both;
    }
  }

  &.hidePop {
    .body {
      animation: hidePop 0.4s both;
    }
  }
  .body {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    border-radius: 20px 20px 0 0;
    transform-origin: center bottom;
    box-sizing: border-box;
    padding: 40px 0 20px;
    .btn-cancel {
      position: absolute;
      right: 10px;
      top: 0px;
      line-height: 1;
      font-size: 30px;
      padding: 5px 10px;
    }
    iframe {
      border: 0;
      width: 100%;
      height: 400px;
    }
  }
}

@keyframes showPop {
  0% {
    opacity: 0;
    transform: translateY(100%) scaleY(1);
  }
  50% {
    opacity: 1;
    transform: translateY(0) scaleY(1.025);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scaleY(1);
  }
}

@keyframes hidePop {
  0% {
    opacity: 1;
    transform: translateY(0) scaleY(1);
  }
  50% {
    opacity: 1;
    transform: translateY(0) scaleY(1.025);
  }
  100% {
    opacity: 0;
    transform: translateY(100%) scaleY(1);
  }
}

@keyframes coinAni {
  0% {
    transform: scaleX(1) translateY(0);
  }
  50% {
    transform: scaleX(0) translateY(-10px);
  }
  100% {
    transform: scaleX(1) translateY(0);
  }
}

.clear {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 100px;
  background: #fff;
  font-size: 12px;
  text-align: center;
  padding: 5px 0;
  z-index: 10;
}
</style>
