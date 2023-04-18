<template>
  <div class="halloweenActivity-page">
    <div class="banner">
      <h1>{{ $t("halloweenActivity.title") }}</h1>
      <div class="the-time">
        <h2>
          <div class="small-title"><small>{{ $t("halloweenActivity.startTimeTitle") }}</small></div>
          {{ $t("halloweenActivity.startTime") }}
        </h2>
        <h2>
          <div class="small-title"><small>{{ $t("halloweenActivity.endTimeTitle") }}</small></div>
          {{ $t("halloweenActivity.endTime") }}
        </h2>
      </div>
    </div>
    <div class="content-banner">
      <div class="content-div">
        <div class="content">{{ $t("halloweenActivity.content1") }}</div>
        <div class="content1">{{ $t("halloweenActivity.content11") }}</div>
        <div class="content1">{{ $t("halloweenActivity.content12") }}</div>
        <div class="content1">{{ $t("halloweenActivity.content13") }}</div>
        <img src="../assets/img/halloweenActivity/img-goddess.png" alt="" class="img-warning" />
        <div class="content">{{ $t("halloweenActivity.content2") }}</div>
        <div class="content">{{ $t("halloweenActivity.content3") }}</div>
        <div class="content">{{ $t("halloweenActivity.content4") }}</div>
        <br class="content">
      </div>
    </div>
    <div class="article">
      <div class="the-txt" v-html="$t('halloweenActivity.content5')"></div>
      <h3 class="foot-txt">{{ $t("halloweenActivity.content6") }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      desc: this.$t('christmas.desc')
    }
  }
}
</script>

<style lang="less" scoped>
html,
body {
  height: 100%;
  overflow: auto;
  background: #003F83;
}

.halloweenActivity-page {
  font-family: "PingFang SC";
  color: #fff;
  background: #003F83;

  .banner {
    background: url(../assets/img/halloweenActivity/page-bg.png) top center no-repeat;
    background-size: 100% auto;
    font-family: "PingFangSC-Semibold", "PingFang SC";
    position: relative;
    height: 550px;

    h1 {
      color: #00BEFF;
      padding: 90px 30px;
      font-weight: bold;
      font-size: 24px;
      letter-spacing: 1px;
      line-height: 1.1;
      width: 60%;
      animation: domFadeIn 1s both;
    }

    .the-time {
      position: absolute;
      // left: 30px;
      width: 100%;
      top: 400px;
      text-align: center;

      h2 {
        line-height: 1.5;
        font-size: 22px;

        .small-title {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;

          small {
            width: 200px;
            font-size: 14px;
            color: #FFF100;
            display: block;
            background: url(../assets/img/halloweenActivity/red.png) center bottom no-repeat;
          }
        }
      }
    }
  }

  .content-banner {
    background: url(../assets/img/halloweenActivity/banner2.png) center no-repeat;
    background-size: cover;
    // font-family: "PingFangSC-Semibold", "PingFang SC";
    height: 100%;
    padding-top: 25%;

    // position: relative;
    .content-div {
      padding: 10px 25px;
      .content {
        font-size: 14px;
        margin: 10px 5px;
      }
      .content1 {
        font-size: 14px;
        margin: 0px 5px;
      }

      img {
        display: block;
        width: 100%;
      }
    }

  }

  .article {
    background: url(../assets/img/halloweenActivity/page-foot.png) center no-repeat;
    background-size: 100% auto;
  }

  .the-txt {
    margin: 10px 30px;
    font-size: 14px;
    text-align: center;
    color: #00BEFF;

    span {
      background: #ffd002;
      padding: 0 10px;
      line-height: 2;
      color: #000;
      border-radius: 4px;
    }
  }

  .foot-txt {
    color: #FF3F00;
    font-size: 24px;
    font-weight: bolder;
    text-align: center;
    padding: 10px 0 60px;
  }
}

@keyframes domFadeIn {
  0% {
    opacity: 0;
    transform: translateY(-20px);
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
