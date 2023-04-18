<template>
  <div class="host-shot">
    <div class="banner"></div>
    <div class="slogn">
      {{ $t('hostshot.banner') }}
    </div>
    <div class="wrap">
      <div class="bg"></div>
      <div class="cove"></div>
      <div class="inner">
        <div class="ocell date">
          <p>
            <strong>{{ $t('hostshot.t1') }}</strong>
            <br>
            {{ $t('hostshot.t2') }}
          </p>
          <p>
            <strong>{{ $t('hostshot.t3') }}</strong>
            <br>
            {{ $t('hostshot.t4') }}
          </p>
        </div>
        <div class="ocell">
          <strong>{{ $t('hostshot.t5') }}</strong>
          <p v-html="$t('hostshot.t6')"></p>
          <p v-html="$t('hostshot.t7')"></p>
          <p>{{ $t('hostshot.t8') }}</p>

        </div>
        <div class="ocell">
          <strong>{{ $t('hostshot.t9') }}</strong>
          <p>{{ $t('hostshot.t10') }}</p>
          <p>{{ $t('hostshot.t11') }}</p>
          <p>{{ $t('hostshot.t12') }}</p>
        </div>
      </div>
    </div>
    <div class="btn" @click="jumpToApp">
      {{ $t('hostshot.t13') }}
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      userId: Cookies.get('userId') || ''
    }
  },
  computed: {},
  methods: {
    jumpToApp () {
      const userIndex = 'profile/'
      const src = this.$deepLink + userIndex + this.userId

      console.log('用户主页', src)
      window.location.href = src
    }
  },
  mounted () { }
}
</script>

<style lang="less" scoped>
.host-shot {
  background: #0498C8 url(../assets/img/hostshot/bg.png) 0 0 fixed no-repeat;
  background-size: 100% auto;
  box-sizing: border-box;
  padding: 15px 15px 100px 15px;

  .banner {
    position: absolute;
    left: 0;
    top: 0;
    width: 375px;
    height: 240px;
    background: url(../assets/img/hostshot/banner.png) center no-repeat;
    background-size: 100% auto;
    z-index: 100;
    animation: showit .4s both;
  }

  .slogn {
    position: absolute;
    left: 30px;
    top: 40px;
    z-index: 105;
    width: 160px;
    height: 100px;
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 17px;
    line-height: 20px;
    font-weight: bold;

    animation: showit .5s .4s both;
  }

  .wrap {
    padding: 176px 15px 15px 15px;
    // background:rgba(54, 12, 171, 0.8);
    border-radius: 10px;
    position: relative;
    overflow: hidden;

    .bg {
      z-index: 5;
      position: absolute;
      left: -15px;
      top: -15px;
      width: 375px;
      height: 976px;
      background: url(../assets/img/hostshot/bg.png) 0 0 fixed no-repeat;
      background-size: 375px 976px;
      filter: blur(14px);
    }

    .cove {
      z-index: 10;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background: rgba(54, 12, 171, 0.4);
    }

    .inner {

      opacity: 0;
      animation: showtxt .4s .7s both;
      position: relative;
      z-index: 120;
      font-size: 12px;
      color: #fff;

      /deep/ .tag {
        color:#FED42F;
        font-weight:bold;
      }

      .ocell {
        border-bottom: dotted 1px rgba(255, 255, 255, 0.5);
        padding-bottom: 5px;
        margin-bottom: 15px;

        &.date {
          font-size: 13px;
          font-weight: bold;
        }

        p {
          margin: 10px 0;
        }

        strong {
          font-size: 13px;
        }

        &:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }
      }
    }
  }

  .btn {
    z-index: 300;
    position: fixed;
    bottom: 20px;
    left: 25px;
    border-radius: 100px;
    text-align: center;
    width: 325px;
    background: #25FBEC;
    background: linear-gradient(347deg, #25FBEC 0%, #FFFFFF 100%);
    color: #360CAB;
    font-size: 16px;
    font-weight: bold;
    padding: 16px 0;
    animation: breath 2s infinite;

  }
}

@keyframes breath {
  0% {
    transform: scale(1);
  }

  20% {
    transform: scale(1.05)
  }

  40% {
    transform: scale(0.95);
  }

  60% {
    transform: scale(1.05);
  }

  80% {
    transform: scale(1);
  }

  100% {
    transform: scale(1)
  }
}

@keyframes showit {
  0% {
    position:fixed;
    opacity: 0;
    transform: scale(2);
  }

  100% {
    position:absolute;
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes showtxt {
  0% {
    opacity: 0;
    transform: translateY(10px)
  }

  100% {
    opacity: 1;
    transform: translateY(0)
  }
}
</style>

<style>
[lang='ar'],
[lang='he'],
[lang='ur'] {
  direction: rtl;
}
</style>
