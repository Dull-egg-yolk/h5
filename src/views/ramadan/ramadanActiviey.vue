<template>
  <div class="body">
    <div class="body-top">
      <div class="body-title">
        <h2>{{ $t('ramadan.ramadanTitle') }}</h2>
        <p>{{ $t('ramadan.ramadanTime', { coin: '' }) }}</p>
      </div>
      <div class="time">2023/03/22-2023/04/25</div>
    </div>
    <div class="content">
      <h2>{{ $t('ramadan.eventTiTle') }}</h2>
      <p>{{ $t('ramadan.eventTime') }}</p>
      <p>{{ $t('ramadan.eventTime2') }}</p>
      <h2>{{ $t('ramadan.Participants') }}</h2>
      <p class="p">{{ $t('ramadan.Participants1') }}</p>
      <h2>{{ $t('ramadan.rulesTitle') }}</h2>
      <p>{{ $t('ramadan.ramadanrules1') }}</p>
      <p>{{ $t('ramadan.ramadanrules2') }}</p>
      <p>{{ $t('ramadan.ramadanrules3') }}</p>
      <p>{{ $t('ramadan.ramadanrules4') }}</p>
      <p>{{ $t('ramadan.ramadanrules5') }}</p>
      <p>{{ $t('ramadan.ramadanrules6') }}</p>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
import { triggerService } from '@/utils/statisticalTool'
export default {
  data () {
    return {

    }
  },

  components: {},

  computed: {},

  methods: {},
  mounted () {
    triggerService({ eventId: '105-15-1-0', freeName1: this.$route.name }) // 拉马丹预热页面展示
  }
}
</script>
<style lang='less' scoped>
.body {
  height: 100vh;
  background: url(../../assets/img/ramadan/tomi2.jpg) repeat center 0;
  background-attachment: scroll, fixed;
  background-size: 100% auto;
  // padding: 0 10px;
  overflow-x: hidden;
  // position: relative;
  .body-top {
    background: url(../../assets/img/ramadan/tomi1.jpg) no-repeat center 0;
    background-attachment: scroll, fixed;
    background-size: 100% auto;
  }
  .body-title {
    padding: 30px 20px;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h2 {
      font-size: 28px;
      text-align: center;
    }

    p {
      font-size: 14px;
      padding: 10px 20px;
      text-align: center;
    }
  }

  .time {
    margin-top: 180px;
    height: 50px;
    background: url(../../assets/img/ramadan/green-bg.png) no-repeat center 0;
    background-size: 100% auto;
    color: #fff;
    line-height: 55px;
    font-size: 18px;
    text-align: center;
  }

  .content {
    padding: 10px 30px;
    color: #000;

    h2 {
      font-size: 22px;
      text-align: center;
      line-height: 40px;
    }

    p {
      font-size: 14px;
      margin-bottom: 10px;
    }
    .p {
      text-align: center;
    }
  }
  .bottom {
    height: 70px;
    background: url(../../assets/img/ramadan/tomi3.jpg) no-repeat center 0;
    background-size: 100% auto;
  }
}

[lang="ar"] {
  .body{
    direction: rtl;
  }
}
[lang="fr"] {
  .body .body-title {
    padding: 10px !important;
  }
}
</style>
