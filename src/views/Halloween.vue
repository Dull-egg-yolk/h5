<template>
  <div class="halloween-page">
    <div class="banner">
      <h1>{{ $t("halloween.title") }}</h1>
      <span class="arrow"></span>
      <div class="the-time">
        <h2>
          <small>{{ $t("halloween.startTimeTitle") }}</small>
          {{ $t("halloween.startTime") }}
        </h2>
        <h2>
          <small>{{ $t("halloween.endTimeTitle") }}</small>
          {{ $t("halloween.endTime") }}
        </h2>
      </div>
    </div>
    <img
      src="../assets/img/halloween/img-warn.png"
      alt=""
      class="img-warning"
    />
    <div class="article">
      <img src="../assets/img/halloween/pic-1.png" alt="" class="pic-1" />
      <div class="the-txt" v-html="$t('halloween.content1')"></div>
      <img src="../assets/img/halloween/pic-2.png" alt="" class="pic-2" />
      <h3 class="foot-txt">{{ $t("halloween.content2") }}</h3>
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
  background: #051232;
}
.halloween-page {
  font-family: "PingFang SC";
  color: #fff;
  background: #051232;
  .banner {
    background: url(../assets/img/halloween/page-bg.jpg) top center no-repeat;
    background-size: 100% auto;
    font-family: "PingFangSC-Semibold", "PingFang SC";
    position: relative;
    height: 550px;
    h1 {
      color: #ffd002;
      padding: 50px 30px;
      font-weight: normal;
      font-size: 42px;
      letter-spacing: 1px;
      line-height: 1.45;
      width: 50%;
      animation: domFadeIn 1s both;
    }
    .arrow {
      width: 42px;
      height: 58px;
      background: url(../assets/img/halloween/img-arrow.png) center no-repeat;
      background-size: 100% auto;
      position: absolute;
      left: 28px;
      top: 390px;
      opacity: 0;
    }
    .the-time {
      position: absolute;
      left: 30px;
      top: 450px;

      h2 {
        line-height: 1.5;
        font-size: 22px;
        small {
          font-size: 14px;
          color: #007ddc;
          display: block;
        }
      }
    }
  }
  img {
    display: block;
  }

  .article {
    padding-bottom: 90px;
    background: url(../assets/img/halloween/page-foot.png) center bottom
      no-repeat;
    background-size: 100% auto;
  }

  .img-warning {
    width: 100%;
    margin-top: 20px;
  }

  .img-warning {
    width: 100%;
    margin-top: 20px;
  }
  .pic-1 {
    width: 352px;
    margin: 10px 0 0 18px;
  }
  .pic-2 {
    width: 100%;
    margin: 0 auto;
  }
  .the-txt {
    text-indent: 4em;
    margin: 20px 20px 0 18px;
    font-size: 14px;
    line-height: 2;
    text-align: justify;
    span {
      background: #ffd002;
      padding: 0 10px;
      line-height: 2;
      color: #000;
      border-radius: 4px;
    }
  }
  .foot-txt {
    color: #ffd002;
    font-size: 25px;
    font-weight: normal;
    text-align: center;
    padding: 10px 0 60px;
    background: url(../assets/img/halloween/img-nangua.png) center bottom
      no-repeat;
    background-size: 110px auto;
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
