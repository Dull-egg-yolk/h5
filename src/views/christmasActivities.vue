<template>
  <div class="rules-page">
    <div class="rule-title">
      <div>{{ $t('christmasActivities.title') }}</div>
    </div>
    <div class="sub-title">{{ $t('christmasActivities.title1') }}</div>
    <div class="rule-box">
      <div class="rule rule-A">
        <div class="letterA"></div>
        <h1>{{ $t("christmasActivities.activiesAtitle") }}</h1>
        <div class="the-time">
          <h2>
            <div class="small-title"><small>{{ $t("christmasActivities.startA") }}</small></div>
            {{ $t("christmasActivities.startTimeA") }}
          </h2>
          <h2>
            <div class="small-title"><small>{{ $t("christmasActivities.endA") }}</small></div>
            {{ $t("christmasActivities.endTimeA") }}
          </h2>
          <div class="content">
            <p>{{ $t("christmasActivities.contentA1") }}</p>
          </div>
          <div class="content">
            <p>{{ $t("christmasActivities.contentA2") }}</p>
            <p v-html="$t('christmasActivities.contentA21')"></p>
            <p v-html="$t('christmasActivities.contentA22')"></p>
            <p v-html="$t('christmasActivities.contentA23')"></p>
          </div>
        </div>
      </div>
      <div class="rule rule-B">
        <div class="letterB"></div>
        <h1>{{ $t("christmasActivities.activiesBtitle") }}</h1>
        <div class="the-time">
          <h2>
            <div class="small-title"><small>{{ $t("christmasActivities.startB") }}</small></div>
            {{ $t("christmasActivities.startTimeB") }}
          </h2>
          <h2>
            <div class="small-title"><small>{{ $t("christmasActivities.endB") }}</small></div>
            {{ $t("christmasActivities.endTimeB") }}
          </h2>
          <div class="content">
            <p v-html="$t('christmasActivities.contentB1')"></p>
          </div>
          <div class="content">
            <p>{{ $t("christmasActivities.contentB2") }}</p>
          </div>
          <div class="content">
            <p>{{ $t("christmasActivities.contentB3") }}</p>
            <p v-html="$t('christmasActivities.contentB31')"></p>
            <p v-html="$t('christmasActivities.contentB32')"></p>
            <p v-html="$t('christmasActivities.contentB33')"></p>
            <p v-html="$t('christmasActivities.contentB34')"></p>
          </div>
          <div class="content">
            <p>{{ $t("christmasActivities.contentB4") }}</p>
            <p>{{ $t("christmasActivities.contentB41") }}</p>
            <p>{{ $t("christmasActivities.contentB42") }}</p>
            <p>{{ $t("christmasActivities.contentB43") }}</p>
            <p>{{ $t("christmasActivities.contentB44") }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="note-page">
      <div class="note">{{ $t("christmasActivities.noteTitle") }}</div>
      <div class="content">
        <p>{{ $t("christmasActivities.noteContent1") }}</p>
      </div>
      <div class="content">
        <p>{{ $t("christmasActivities.noteContent2") }}</p>
      </div>
      <div class="content">
        <p>{{ $t("christmasActivities.noteContent3") }}</p>
      </div>
    </div>
    <div class="bottom-btn">
      <span @click="toProfile">{{ $t('christmasActivities.nowBtn') }}</span>
    </div>
    <mt-popup v-model="showPop" class="rc-popup-box blur-bg" :lockScroll="true" position="center">
      <div class="popup-page">
        <div class="pop-content">
          <span>{{ $t('christmasActivities.popup') }}</span>
          <a href="https://privacy.livuchat.com/christmasPrivacy.html" target="_blank">{{
              $t('christmasActivities.popup1')
          }}</a>
          <span>{{ $t('christmasActivities.popup2') }}</span>
        </div>
        <div class="green-btn">
          <span @click="toGreen">{{ $t('christmasActivities.popupBtn') }}</span>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script type="text/babel">
import MtPopup from '@/components/popup/index'
export default {
  name: 'ChristmasActivities',
  components: {
    MtPopup
  },
  data () {
    return {
      showPop: false
    }
  },
  methods: {
    toProfile () {
      const userIndex = 'profile/profileEdit'
      const src = this.$deepLink + userIndex
      window.location.href = src
    },
    toGreen () {
      this.showPop = false
      localStorage.setItem('ShowPop', true)
    }
  },
  mounted () {
    const showPop = localStorage.getItem('ShowPop')
    if (showPop) {
      this.showPop = false
    } else {
      this.showPop = true
    }
  },
  created () { }
}
</script>
<style lang="less" scope>
@mainBgColor: #860000;
@imgDomian: "https://h5.livuchat.com/staticProd/2022_christmas/img";
@mainBgImg: "main.jpg";
@rankBgImg: "rank_bg1.jpg";
@cuntdownBgImg: "time-bg.png";
@videoBgImg: "godness_bg2.jpg";
@titleInfoImg: "@{imgDomian}/info-bg.png";
@actEndImg: "@{imgDomian}/end-bg.jpg";
@danmuCoins: "@{imgDomian}/danmu/danmu-coins.png";
@coinsImg: "@{imgDomian}/coin.png";

.bgImg(@bgColor, @bgImg) {
  background:@bgColor url("@{bgImg}") no-repeat;
  background-position: left top;
  background-size: 100% auto;
}

.bgImgNoColor(@bgImg) {
  background:url("@{bgImg}") no-repeat;
  background-position: left top;
  background-size: 100%;
}

@ruleImg: "@{imgDomian}/rule2-bg.jpg";

.rules-page {
  position: relative;
  color: #fff;
  min-height: 100vh;
  width: 100%;
  .bgImg(@mainBgColor, "@{ruleImg}");
  padding-bottom: 60px;

  .rule-title {
    padding-top: 230px;
    text-align: center;
    font-family: Arial-Black, Arial;
    font-weight: 900;
    font-size: 18px;
    margin-bottom: 10px;
  }

  .sub-title {
    font-size: 14px;
    color: #fff;
    text-align: center;
    height: 40px;
    line-height: 40px;
    background: linear-gradient(90deg, rgba(109, 212, 0, 0) 0%, rgba(27, 255, 0, 0.53) 47%, rgba(247, 181, 0, 0) 100%);
    border: 1px solid;
    border-image: linear-gradient(270deg, rgba(255, 238, 0, 0), rgba(255, 221, 0, 1), rgba(255, 217, 0, 0)) 1 1;
    backdrop-filter: blur(8px);
  }

  .rule-box {
    padding: 30px 20px 10px 20px;

    .rule-A {
      position: relative;
      background: url(../assets/img/2022_christmas/img/activies-bottom1.png) top center no-repeat;
      background-size: 100% auto;
      font-family: "PingFangSC-Semibold", "PingFang SC";
      position: relative;
      height: 550px;

      .letterA {
        position: absolute;
        top: -3px;
        right: 25px;
        background: url(../assets/img/2022_christmas/img/a.png) top center no-repeat;
        background-size: 100% auto;
        height: 45px;
        width: 35px;
      }
    }

    .rule {
      h1 {
        color: #FFB100;
        padding: 15px 0 10px 15px;
        font-weight: 900;
        font-size: 18px;
        letter-spacing: 1px;
        line-height: 1.1;
        width: 60%;
        animation: domFadeIn 1s both;
      }

      .the-time {
        position: absolute;
        width: 90%;
        top: 70px;
        text-align: left;
        margin-left: 15px;

        .note {
          font-size: 16px;
          font-weight: bold;
          margin-top: 10px;
        }

        .content {
          margin-top: 10px;

          p {
            font-size: 12px;
            font-family: Helvetica;
            font-weight: 100;

            strong {
              font-size: 16px;
              font-weight: bold;
              padding: 0 5px;
              font-style: italic;
            }
          }
        }

        h2 {
          line-height: 1.5;
          font-size: 16px;
          font-weight: bold;

          .small-title {
            width: 100%;
            display: flex;

            small {
              width: 200px;
              font-size: 12px;
              color: #fff;
              display: block;
              font-family: Helvetica;
              font-weight: 100;
            }
          }
        }
      }
    }

    .rule-B {
      position: relative;
      background: url(../assets/img/2022_christmas/img/activies-bottom2.png) top center no-repeat;
      background-size: 100% 100%;
      font-family: "PingFangSC-Semibold", "PingFang SC";
      position: relative;
      height: 520px;

      .letterB {
        position: absolute;
        top: 5px;
        right: 25px;
        background: url(../assets/img/2022_christmas/img/b.png) top center no-repeat;
        background-size: 100% auto;
        height: 45px;
        width: 35px;
      }
    }
  }

  .note-page {
    padding: 20px 30px 60px 30px;
    .note {
      font-size: 16px;
      font-weight: bold;
      margin-top: 10px;
    }

    .content {
      margin-top: 10px;

      p {
        font-size: 12px;
        font-family: Helvetica;
        font-weight: 100;

        strong {
          font-size: 16px;
          font-weight: bold;
          padding: 0 5px;
          font-style: italic;
        }
      }
    }
  }

  .bottom-btn {
    position: fixed;
    bottom: 1rem;
    left: 0;
    z-index: 1000;
    width: 100%;
    text-align: center;

    span {
      display: inline-block;
      width: 251px;
      height: 60px;
      line-height: 80px;
      background: url("@{imgDomian}/pick-up.png");
      background-repeat: no-repeat;
      background-size: 100% auto;
      font-size: 17px;
      color: #000;
    }
  }

  .mint-popup {
    background: linear-gradient(180deg, #860000 0%, #4F0001 100%);
    border-radius: 30px;
    border: 1px solid #FF1510;
    width: 280px;
    height: 160px;
    padding: 40px 20px;

    .pop-content {
      position: relative;
      font-size: 16px;
      margin-top: 20px;
      padding: 0 10px;

      a {
        color: #FFC600;
        margin-left: 5px;
        text-decoration: underline;
      }

      img {
        position: absolute;
        top: 0;
        right: 0;
      }
    }

    .green-btn {
      margin-top: 40px;
      width: 100%;
      text-align: center;

      span {
        display: inline-block;
        width: 251px;
        height: 60px;
        line-height: 80px;
        background: url("@{imgDomian}/pick-up.png");
        background-repeat: no-repeat;
        background-size: 100% auto;
        font-size: 17px;
        color: #000;
      }
    }
  }

}

[lang="ar"],
[lang="he"],
[lang="ur"] {
  direction: rtl;

  .rules-page .rule-box .rule-B {
    height: 560px;
    background: url(../assets/img/2022_christmas/img/ar-bg1.png) top center no-repeat;
    background-size: 100% 100%;
  }

  .rules-page .rule-box .rule .the-time {
    position: absolute;
    width: 90%;
    top: 1.86667rem;
    text-align: right;
    margin-right: 0.4rem;
  }

  .rules-page .rule-box .rule-A {
    margin-bottom: 30px;
    background: url(../assets/img/2022_christmas/img/ar-bg.png) top center no-repeat;
    background-size: 100% 100%;
  }

  .rules-page .rule-box .rule-A .letterA {
    position: absolute;
    top: -3px;
    right: 270px;
    background: url(../assets/img/2022_christmas/img/a.png) top center no-repeat;
    background-size: 100% auto;
    height: 45px;
    width: 35px;
  }

  .rules-page .rule-box .rule h1 {
    margin-right: 10px;
  }

  .rules-page .rule-box .rule-B .letterB {
    position: absolute;
    top: 5px;
    right: 270px;
    background: url(../assets/img/2022_christmas/img/b.png) top center no-repeat;
    background-size: 100% auto;
    height: 45px;
    width: 35px;
  }
}

[lang="es"] {
  .rules-page .rule-box .rule-B {
    height: 640px;
  }

  .rules-page .rule-box .rule-A {
    height: 730px;
    background-size: 100% 100%;
    margin-bottom: 30px;
  }

  .rules-page .rule-box .rule .the-time {
    position: absolute;
    width: 90%;
    top: 90px;
    text-align: left;
    margin-left: 0.4rem;
  }
}

[lang="pt"] {
  .rules-page .rule-box .rule-B {
    height: 560px;
  }
  .rules-page .rule-box .rule-A {
    height: 600px;
    background-size: 100% 100%;
    margin-bottom: 30px;
  }
}

[lang="en"] {
  .rules-page .rule-box .rule-B {
    height: 590px;
  }
  .rules-page .rule-box .rule-A {
    height: 650px;
    background-size: 100% 100%;
    margin-bottom: 30px;
  }
}

[lang="hi"] {
  .rules-page .rule-box .rule-B {
    height: 550px;
  }
  .rules-page .rule-box .rule-A {
    height: 620px;
    background-size: 100% 100%;
    margin-bottom: 30px;
  }
}

[lang="id"],
[lang="vi"] {
  .rules-page .rule-box .rule-B {
    height: 620px;
  }

  .rules-page .rule-box .rule-A {
    height: 640px;
    background-size: 100% 100%;
    margin-bottom: 30px;
  }
}

[lang="th"],
[lang="tr"] {
  .rules-page .rule-box .rule-B {
    height: 580px;
  }

  .rules-page .rule-box .rule-A {
    height: 640px;
    background-size: 100% 100%;
    margin-bottom: 30px;
  }
}

[lang="ru"] {
  .rules-page .rule-box .rule-B {
    height: 660px;
  }

  .rules-page .rule-box .rule-A {
    height: 640px;
    background-size: 100% 100%;
    margin-bottom: 30px;
  }

  .rules-page .rule-box .rule .the-time {
    position: absolute;
    width: 90%;
    top: 90px;
    text-align: left;
    margin-left: 0.4rem;
  }

  .rules-page .rule-box .rule-B .the-time {
    position: absolute;
    width: 90%;
    top: 120px;
    text-align: left;
    margin-left: 0.4rem;
  }
}
</style>
