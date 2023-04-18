<template>
  <div class="new-function">
    <div
      class="banner"
      :class="{ large: $t('newfunc.bannerTitle').length < 20 }"
    >
      <div class="txt" v-html="$t('newfunc.bannerTitle')"></div>
    </div>
    <div class="slogn">
      <div class="txt">
        {{ $t("newfunc.slogn") }}
      </div>
      <!-- <div class="tips">
        {{ $t("newfunc.tips") }}
      </div> -->
    </div>

    <div class="intro">
      <div class="title">
        <div class="inner">
          <div class="title-txt">
            {{ $t("newfunc.introTitle") }}
          </div>

          <span class="corn"></span>
        </div>
      </div>
      <div class="txt">
        <p v-html="txt1">
          <!-- {{ $t("newfunc.txt1") }} -->
        </p>
        <p>
          <img src="../assets/img/newfunc/img1.png" alt="" />
        </p>
        <p>
          {{ $t("newfunc.txt2") }}
        </p>
        <p>
          <img src="../assets/img/newfunc/img2.png" alt="" class="sg" />
        </p>
        <p>
          {{ $t("newfunc.txt3") }}
        </p>
        <p>
          <img src="../assets/img/newfunc/img3.png" alt="" class="sg" />
        </p>
        <p v-html="txt4"></p>
        <p>
          <img src="../assets/img/newfunc/img4.png" alt="" />
        </p>
        <p>
          {{ $t("newfunc.txt5") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      leftTime: 0
    }
  },
  computed: {
    txt1 () {
      const txt = this.$t('newfunc.txt1').split('@@')

      if (txt.length === 1) {
        return this.$t('newfunc.txt1')
      }
      return txt[0] + '【<span class="i i1"></span>】' + txt[1]
    },
    txt4 () {
      const txt = this.$t('newfunc.txt4').split('@@')

      if (txt.length === 1) {
        return this.$t('newfunc.txt4')
      }
      return txt[0] + '【<span class="i i3"></span>】' + txt[1]
    }
  },
  methods: {},
  mounted () {}
}
</script>

<style lang="less" scoped>
.new-function {
  background: #b7edce;
  font-family: PingFangSC-Regular, PingFang SC;
  padding-bottom: 20px;

  .banner {
    height: 172px;
    background: url(../assets/img/newfunc/banner.png) center -60px no-repeat;
    background-size: 100% auto;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.5;
    color: #ffffff;
    box-sizing: border-box;
    padding-top: 1px;
    font-family: PingFangSC-Medium, PingFang SC;

    .txt {
      padding: 0 65px 0;
      margin-top: 34px;
      min-height: 130px;
      display: inline-flex;
      flex-direction: row;
      align-content: center;
      align-items: center;
      animation: showTitle 0.4s both;
    }

    &.large {
      font-size: 30px;
    }
  }
  .slogn {
    background: url(../assets/img/newfunc/tips.png) center top no-repeat;
    background-size: 100% auto;
    text-align: center;

    .txt {
      font-size: 12px;
      box-sizing: border-box;
      padding: 15px 80px;
      line-height: 1.75;
      color: #015650;
      opacity: 0;
      animation: showTitle 0.4s 0.2s both;
    }
    .tips {
      width: 240px;
      margin: 0 auto;
      font-size: 11px;
      background: #16d276;
      color: #fff;
      line-height: 18px;
      padding: 8px 15px;
      text-align: left;
      border-radius: 10px;
      opacity: 0;
      animation: showTitle 0.4s 0.25s both;
    }
  }
  .intro {
    background: #fff;
    margin: 10px;
    border-radius: 14px;
    padding: 0 12px 10px;
    font-size: 12px;
    .title {
      text-align: center;
      color: #fff;
      font-size: 15px;
      margin-bottom: 12px;
      .inner {
        display: inline-block;
        height: 34px;
        padding: 0 0 0 24px;
        line-height: 34px;
        margin-left: -12px;
        background: url(../assets/img/newfunc/intro-title.png) 0 0 no-repeat;
        background-size: auto 68px;
        position: relative;
        .title-txt {
          display: inline-block;
          max-width: 280px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .corn {
          position: absolute;
          right: -22px;
          top: 0;
          height: 34px;
          width: 22px;
          background: url(../assets/img/newfunc/intro-title.png) right bottom
            no-repeat;
          background-size: auto 68px;
        }
      }
    }
    p {
      padding: 10px 0;

      &/deep/.i1 {
        display: inline-block;
        width: 18px;
        height: 18px;
        vertical-align: middle;
        margin: 0 8px;
        background: url(../assets/img/newfunc/icon-music.png) center no-repeat;
        background-size: 100%;
      }
      &/deep/.i3 {
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: middle;
        margin: 0 8px;
        background: url(../assets/img/newfunc/icon-voice.png) center no-repeat;
        background-size: 100%;
      }
    }
    img {
      max-width: 100%;
      &.sg {
        width: 60%;
      }
    }
  }
}

@keyframes showTitle {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<style >
[lang="ar"],
[lang="he"],
[lang="ur"] {
  direction: rtl;
}
</style>
