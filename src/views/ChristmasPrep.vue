<template>
  <div
    class="christmas-prep"
    :class="{ noBottom: timeType == 'hide', empty: !pageShow }"
  >
    <!-- 测试 -->
    <!-- <div class="test-box">
          <select @change="changeLang">
              <option v-for="(item, index) in langs" :value='item' :key="index">{{item}}</option>
          </select>
      </div> -->

    <!-- 流星 -->
    <div class="fall-stars">
      <div class="ostar s1"></div>
      <div class="ostar s2"></div>
    </div>

    <template v-if="pageShow">
      <!-- banner -->
      <div class="banner" :class="{ startBanner: timeType !== 'prehot' }">
        <div class="txt">
          <span>{{ $t("christmas.pageTitle") }}</span>
        </div>
      </div>

      <!-- 活动信息 -->
      <div class="activity-info mbox">
        <div class="title"></div>
        <div class="mgiftbox"></div>
        <div class="msnow"></div>
        <dl class="the-time">
          <dt>{{ $t("christmas.beginTimeTxt") }}</dt>
          <dd>{{ this.startTimeTxt }}</dd>
          <dt>{{ $t("christmas.endTimeTxt") }}</dt>
          <dd>{{ this.endTimeTxt }}</dd>
        </dl>
        <div
          class="gift-num"
          v-if="timeType == 'prehot'"
          v-html="preHotTxt"
        ></div>
        <div class="gift-num start" v-else>
          {{ $t("christmas.stGiftTxt") }}
        </div>

        <div class="gift-pic">
          <img
            src="../assets/img/christmasPrep/img-gift.png"
            alt=""
            v-if="timeType == 'prehot'"
          />
          <img
            src="../assets/img/christmasPrep/img-gift-2.png"
            class="start-gift"
            alt=""
            v-else
          />
        </div>
      </div>

      <!-- 活动介绍 开始前 -->
      <div class="activity-intro mbox" v-if="timeType == 'prehot'">
        <div class="title"></div>

        <div class="mgiftbox"></div>
        <div class="msnow"></div>
        <div class="txt">
          <p>1.{{ $t("christmas.prehotTxt1") }}</p>
          <p>2.{{ $t("christmas.prehotTxt2") }}</p>
          <p>3.{{ $t("christmas.prehotTxt3") }}</p>
          <p>4.{{ $t("christmas.prehotTxt4") }}</p>
        </div>
        <!-- <div class="agreement-link">
          <span @click="showTermAction">{{ $t("christmas.termTxt") }}</span>
        </div> -->
      </div>

      <!-- 活动介绍 开始后 -->
      <div class="activity-intro start-intro mbox" v-else>
        <div class="title-txt">
          {{ $t("christmas.content1") }}
        </div>
        <div class="title"></div>

        <div class="mgiftbox"></div>
        <div class="msnow"></div>
        <dl class="txt">
          <dt>1.{{ $t("christmas.content2") }}</dt>
          <dd>
            <p>
              {{ $t("christmas.content3") }}
            </p>
            <p>
              {{ $t("christmas.content4") }}
            </p>
            <p>
              {{ $t("christmas.content5") }} <br />
              {{ $t("christmas.content6") }} <br />
              {{ $t("christmas.content7") }}<br />
              {{ $t("christmas.content8") }} <br />
              {{ $t("christmas.content9") }}
            </p>
          </dd>
          <dt>2.{{ $t("christmas.content10") }}</dt>
          <dd>
            <p>
              {{ $t("christmas.content11") }} <br />
              {{ $t("christmas.content12") }} <br />
              {{ $t("christmas.content13") }}
            </p>
            <p>
              {{ $t("christmas.content14") }} <br />
              {{ $t("christmas.content15") }}
            </p>
            <p>
              {{ $t("christmas.content16") }} <br />
              {{ $t("christmas.content17") }}
            </p>
            <p>
              {{ $t("christmas.content18") }} <br />
              {{ $t("christmas.content19") }}
            </p>
            <p>
              {{ $t("christmas.content20") }} <br />
              {{ $t("christmas.content21") }}
            </p>
            <p>
              {{ $t("christmas.content22") }} <br />
              {{ $t("christmas.content23") }}
            </p>
            <p>
              {{ $t("christmas.content24") }}
            </p>
          </dd>
          <dt>3.{{ $t("christmas.content25") }}</dt>
          <dd>
            <p>
              {{ $t("christmas.content26") }}
            </p>
            <p>
              {{ $t("christmas.content27") }}
            </p>
            <p>
              {{ $t("christmas.content28") }}
            </p>
            <p>
              {{ $t("christmas.content29") }}
            </p>
            <p>
              {{ $t("christmas.content30") }}
            </p>
            <p>
              {{ $t("christmas.content31") }}
            </p>
            <p>
              {{ $t("christmas.content32") }}
            </p>
            <p>
              {{ $t("christmas.content33") }}
            </p>
            <p>
              {{ $t("christmas.content34") }}
            </p>
            <p>
              {{ $t("christmas.content35") }}
            </p>
            <p v-if="$t('christmas.content36')">
              {{ $t("christmas.content36") }}
            </p>
          </dd>
          <dt v-if="$t('christmas.content37')">
            4.{{ $t("christmas.content37") }}
          </dt>
          <dd v-if="$t('christmas.content38')">
            <p>{{ $t("christmas.content38") }}</p>
          </dd>

          <dt v-if="$t('christmas.content39')">
            5.{{ $t("christmas.content39") }}
          </dt>
          <dt v-if="$t('christmas.content40')">
            6.{{ $t("christmas.content40") }}
          </dt>
          <dt v-if="$t('christmas.content41')">
            7.{{ $t("christmas.content41") }}
          </dt>
        </dl>
        <div class="agreement-link">
          <span @click="showTermAction">{{ $t("christmas.termTxt") }}</span>
        </div>
      </div>

      <!-- 倒计时 -->
      <div class="time-box" v-if="timeType !== 'hide'">
        <div class="inner">
          <div class="title"></div>
          <div class="txt">{{ $t("christmas.prehotTimeCut") }}</div>

          <div class="time-board">
            <div class="time-unit">
              <span>DAY</span>
              <span>HOUR</span>
              <span>MIN</span>
              <span>SEC</span>
            </div>
            <div class="time-txt" v-html="cutTime"></div>
          </div>
        </div>
      </div>
    </template>

    <!-- 协议弹框 -->
    <transition
      enter-active-class="showPop"
      leave-active-class="hidePop"
      :duration="{ enter: 300, leave: 300 }"
    >
      <div class="term-pop" v-if="showTerm" @click="showTerm = false">
        <div class="body" @click.stop>
          <div class="btn-cancel" @click="showTerm = false">×</div>
          <div class="txt">
            <iframe
              src="https://www.rileycillian.com/christmas_privacy.html"
              frameborder="0"
            ></iframe>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { getChristmasTime } from '@/api'
import { triggerService } from '@/utils/statisticalTool'
// import { loadLanguageAsync } from '@/i18n/index'

export default {
  data () {
    return {
      leftTime: 0,
      startTime: '',
      endTime: '',
      startTimeTxt: '',
      endTimeTxt: '',
      timeType: 'prehot',
      pageShow: false,
      showTerm: false,
      prehotSlg: '',
      langs: [
        'de',
        'fr',
        'id',
        'ko',
        'pl',
        'sv',
        'ur',
        'en',
        'he',
        'it',
        'ms',
        'pt',
        'th',
        'vi',
        'ar',
        'es',
        'hi',
        'ja',
        'nl',
        'ru',
        'tr',
        'zh'
      ]
    }
  },
  computed: {
    cutTime () {
      var time = this.leftTime
      const d = Math.floor(time / 1000 / 60 / 60 / 24)
      const h = Math.floor((time / 1000 / 60 / 60) % 24)
      const m = Math.floor((time / 1000 / 60) % 60)
      const s = Math.floor((time / 1000) % 60)
      return `<span>${d < 10 ? '0' + d : d}</span><span>${
        h < 10 ? '0' + h : h
      }</span><span>${m < 10 ? '0' + m : m}</span><span>${
        s < 10 ? '0' + s : s
      }</span>`
    },
    preHotTxt () {
      const txt = this.$t('christmas.prehotGiftTxt')
      const t = txt.replace(/50000|50,000|50.000|50 000/g, function (res) {
        return `<strong>${res}</strong>`
      })
      return t
    }
  },
  methods: {
    getLeftTime (pt) {
      var leftTime = new Date(pt).getTime() - new Date().getTime()
      if (leftTime > 0) {
        this.leftTime = leftTime
        setTimeout(() => {
          this.getLeftTime(pt)
        }, 50)
      } else {
        console.log('over')
      }
    },
    getChristmasTime () {
      getChristmasTime().then((res) => {
        // res = {
        //   christmasActivityStartTime:
        //     localStorage.getItem('activityStartTime') || '2021-11-11 00:00:00',
        //   christmasActivityEndTime:
        //     localStorage.getItem('activityEndTime') || '2021-12-05 00:00:00'
        // }

        this.pageShow = true
        this.startTimeTxt = res.christmasActivityStartTime + ' UTC+0'
        this.endTimeTxt = res.christmasActivityEndTime + ' UTC+0'

        res.christmasActivityStartTime = res.christmasActivityStartTime.replace(
          /-/g,
          '/'
        )
        res.christmasActivityEndTime = res.christmasActivityEndTime.replace(
          /-/g,
          '/'
        )
        this.startTime = res.christmasActivityStartTime + ' UTC+0'
        this.endTime = res.christmasActivityEndTime + ' UTC+0'

        var preHotLeftTime =
          new Date(this.startTime).getTime() - new Date().getTime()
        var startLeftTime =
          new Date(this.endTime).getTime() - new Date().getTime()

        // 预热
        if (preHotLeftTime > 0) {
          this.getLeftTime(this.startTime)
          this.timeType = 'prehot'
        } else {
          // 开始
          if (startLeftTime > 0) {
            if (Math.floor(startLeftTime / 1000 / 60 / 60 / 24) > 4) {
              this.timeType = 'hide'
              return
            }
            this.getLeftTime(this.endTime)
            this.timeType = 'start'
          } else {
            this.timeType = 'hide'
          }
        }
      })
    },
    showTermAction () {
      this.showTerm = true
      triggerService({ eventId: '105-4-1-10' })
      triggerService({ eventId: '105-4-1-11' })
    }
  },
  mounted () {
    this.getChristmasTime()
    triggerService({ eventId: '105-4-1-3' })
  }
}
</script>

<style lang="less" scoped>
.christmas-prep {
  width: 100%;
  background: #000724 url(../assets/img/christmasPrep/img-stars.png) center 0
    repeat-y;
  padding-bottom: 90px;
  &.noBottom {
    padding-bottom: 30px;
  }
  &.empty {
    height: 2000px;
  }

  .fall-stars {
    position: absolute;
    width: 100%;
    height: 400px;
    overflow: hidden;
    z-index: 1;
    top: 0;
    left: 0;
    .ostar {
      width: 100px;
      height: 100px;
      background: url(../assets/img/christmasPrep/img-star.png) center no-repeat;
      background-size: 100%;
      position: absolute;
      opacity: 0;
    }
    .s1 {
      left: 140px;
      top: -50px;
      animation: fallStar 3s 1.5s linear infinite;
    }
    .s2 {
      left: 350px;
      top: -50px;
      animation: fallStar 3s linear infinite;
    }
  }

  .banner {
    height: 360px;
    background: url(../assets/img/christmasPrep/banner.png) center top no-repeat;
    background-size: 375px auto;
    position: relative;
    z-index: 2;

    &.startBanner {
      background-image: url(../assets/img/christmasPrep/banner2.png);
    }
    .txt {
      position: absolute;
      top: 240px;
      width: 310px;
      left: 50%;
      margin-left: -155px;
      font-size: 20px;
      text-align: center;
      color: #fff;
      font-family: Arial-Black, Arial;
      animation: scaleIn 0.6s both;
      font-weight: bold;
      height: 80px;
      display: flex;
      align-items: center;
      span {
        flex: 1;
      }
    }
  }

  .mbox {
    width: 340px;
    margin: 0 auto;
    border-radius: 18px;
    border: solid 1px rgba(255, 255, 255, 0.4);
    position: relative;
    color: #fff;
    z-index: 3;
    .title {
      position: absolute;
      width: 352px;
      height: 66px;
      top: -44px;
      left: -6px;
    }
    .mgiftbox {
      position: absolute;
      width: 30px;
      height: 30px;
      background: url(../assets/img/christmasPrep/img-giftbox.png) center
        no-repeat;
      background-size: 100% auto;
    }
    .msnow {
      position: absolute;
      width: 30px;
      height: 30px;
      background: url(../assets/img/christmasPrep/img-snow.png) center no-repeat;
      background-size: 100% auto;
    }
  }

  .activity-info {
    background: #9b0d11;
    .mgiftbox {
      left: 10px;
      top: 120px;
    }
    .msnow {
      left: 40px;
      top: 260px;
    }
    .title {
      background: url(../assets/img/christmasPrep/img-title-1.png) center
        no-repeat;
      background-size: 100% auto;
    }
    .the-time {
      padding: 10px;
      text-align: center;
      dt {
        font-size: 14px;
        opacity: 0.5;
        padding: 10px 0;
      }
      dd {
        font-size: 20px;
        height: 22px;
        padding: 5px 0 12px;
        margin-bottom: 10px;
        border-bottom: solid 1px rgba(255, 255, 255, 0.1);
      }
    }
    .gift-num {
      font-size: 20px;
      text-align: center;
      padding: 0 40px;
      & /deep/ strong {
        font-size: 30px;
        font-weight: bold;
        display: inline-block;
      }
      &.start {
        padding: 0 30px;
        font-size: 14px;
        line-height: 1.5;
      }
    }
    .gift-pic {
      padding: 20px 0 0;
      img {
        display: block;
        width: 100%;
        margin: 0 auto;
        &.start-gift {
          width: 320px;
          margin-bottom: 10px;
        }
      }
    }
  }

  .activity-intro {
    background: #007000;
    padding: 20px 0;
    margin-top: 40px;
    .mgiftbox {
      right: 10px;
      bottom: 10px;
    }
    .msnow {
      right: 40px;
      bottom: 20px;
      transform: scale(0.6);
    }
    .title {
      height: 104px;
      top: -80px;
      background: url(../assets/img/christmasPrep/img-title-2.png) center
        no-repeat;
      background-size: 100% auto;
    }
    .txt {
      font-size: 13px;
      padding: 0 15px;
      line-height: 20px;
      p {
        margin: 10px 0;
      }
    }
    .agreement-link {
      text-align: center;
      padding: 10px 0 0;
      font-size: 14px;
      span {
        color: #a4caff;
        text-decoration: underline;
      }
    }

    &.start-intro {
      margin-top: 68px;
      .title-txt {
        position: absolute;
        font-size: 16px;
        left: 10px;
        top: -34px;
      }
      .title {
        top: -70px;
        background-image: url(../assets/img/christmasPrep/img-title-4.png);
      }
      .txt {
        dt {
          padding: 15px 0 4px;
          font-size: 14px;
        }
        dd {
          font-size: 12px;
          opacity: 0.6;
        }
      }
    }
  }
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

// 倒计时
.time-box {
  position: fixed;
  z-index: 100;
  bottom: 0;
  left: 0;
  width: 100%;
  .inner {
    position: relative;
    width: 100%;
    background: #fff;
    display: flex;
    flex-direction: row;
    align-content: space-between;
    align-items: center;
    padding: 20px 0 10px;
    animation: showBottom 0.4s 0.6s both;
  }
  .title {
    position: absolute;
    width: 100%;
    height: 40px;
    background: url(../assets/img/christmasPrep/img-title-3.png) center
      no-repeat;
    background-size: 100% auto;
    top: -10px;
  }
  .txt {
    font-size: 15px;
    color: #3b3b3b;
    padding: 0 15px;
    flex: 1;
  }
  .time-unit {
    position: absolute;
    left: 0;
    top: 2px;
    width: 150px;
    display: flex;
    flex-direction: row;
    span {
      font-size: 10px;
      width: 25%;
      text-align: center;
      color: #fff;
      opacity: 0.6;
      line-height: 1;
      display: block;
      transform: scale(0.85);
    }
  }
  .time-board {
    width: 150px;
    height: 40px;
    background: url(../assets/img/christmasPrep/img-time-board.png) center
      no-repeat;
    margin: 0 15px;
    background-size: 100% auto;
    color: #fff;
    position: relative;
    .time-txt {
      width: 100%;
      display: flex;
      flex-direction: row;
      & /deep/ span {
        font-size: 20px;
        width: 25%;
        text-align: center;
        padding-top: 15px;
        color: #fff;
      }
    }
  }
}

@keyframes flowIn {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes showBottom {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  45% {
    opacity: 1;
    transform: scale(1.1);
  }
  75% {
    opacity: 1;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fallStar {
  0% {
    opacity: 0.5;
    transform: translate(0, 0);
  }
  10% {
    opacity: 1;
    transform: translate(-100px, 100px);
  }
  50% {
    opacity: 0;
    transform: translate(-400px, 400px);
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

// .test-box{
//     position:fixed;
//     left:10px;
//     top:10px;
//     z-index:1000;
// }
</style>

<style >
[lang="ar"],
[lang="he"],
[lang="ur"] {
  direction: rtl;
}
</style>
