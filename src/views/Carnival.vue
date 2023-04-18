<template>
  <div class="carnival-page">
    <div class="carnival-header"></div>
    <!-- 活动时间 -->
    <div class="panel-box">
      <div class="panel-title" style="width:46%">{{ $t('carnival.activityTitle') }}</div>
      <div class="panel-body">
        <dl class="time-box">
          <dt>{{ $t('carnival.startTitle') }}</dt>
          <dd>{{ $t('carnival.startTime') }}</dd>
          <dt>{{ $t('carnival.endTitle') }}</dt>
          <dd>{{ $t('carnival.endTime') }}</dd>
        </dl>
      </div>
    </div>
    <div class="panel-box">
      <div class="panel-title" style="width: 58%">{{ $t('carnival.regras') }}</div>
      <div class="panel-body">
        <dl class="time-box">
          <div>{{ $t('carnival.regrasCenter') }}</div>
          <dd class="activity">{{ $t('carnival.activity1') }}</dd>
          <div><span style="color: #FFC53F">{{ $t('carnival.activity1content1') }}</span><span v-html="$t('carnival.activity1content2', {goddessText: '50 deusas',coinsText: '7500 moedas'})"></span></div>
          <dd class="activity">{{ $t('carnival.activity2') }}</dd>
          <div><span style="color: #FFC53F;white-space:nowrap">{{ $t('carnival.activity2content1') }}</span> <span v-html="$t('carnival.activity2content2', {goddessText: '50 deusas',coinsText: '7500 moedas'})"></span></div>
        </dl>
      </div>
    </div>
    <div class="panel-box" style="margin-bottom:30px">
      <div class="panel-title" style="width: 5%;">{{ $t('carnival.avisos') }}</div>
      <div class="panel-body">
        <dl class="time-box">
          <div class="avisos">{{ $t('carnival.avisosRules1') }}</div>
          <div class="avisos">{{ $t('carnival.avisosRules2') }}</div>
          <div class="avisos">{{ $t('carnival.avisosRules3') }}</div>
        </dl>
      </div>
    </div>
    <div class="footer-title">{{ $t('carnival.participate') }}</div>
  </div>
</template>

<script>

export default {
  name: 'Carnival'
}
</script>

<style lang="less" scoped>
.carnival-page {
  min-height: 100vh;
  background: url(../assets/img/carnival/body-bg.png) no-repeat center 0;
  background-attachment:scroll, fixed;
  background-size: 100% 100%;
  padding: 0 10px;
  overflow: hidden;
  position: relative;
  .footer-title {
    text-align: center;
    font-size: 24px;
    white-space:nowrap;
    color: #fff;
    margin-bottom: 30px;
    font-weight: 600;
  }
  .goddessText {
      color: #FFBC22;
  }
  .carnival-header {
    height: 495px;
    width: 100%;
    margin-bottom: -30px;
  }
}
.time-box {
  padding-left: 17px;
  dt {
    height: 17px;
    font-size: 12px;
    font-weight: 400;
    color: #212121;
    line-height: 17px;
  }
 .activity {
     color: #fff;
     margin: 10px 0;
 }
 .avisos {
     margin: 10px;
 }
  dd {
    font-size: 18px;
    font-weight: 600;
  }
  dd + dt {
    margin-top: 15px;
  }
}

.panel-box {
  border-radius: 12px 12px 8px 8px;
  position: relative;
  margin-bottom: 10px;

  .adorn {
    position: absolute;
    right: 11px;
    top: 13px;
    width: 64px;
    height: 17px;
  }
  .panel-title {
    background-color: #000;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    line-height: 50px;
    font-size: 20px;
    font-weight: 500;
    color: #FFBC22;
    height: 45px;
    text-transform: uppercase;
    padding-left: 15px;
    padding-right: 70px;
    // overflow:hidden; //超出的文本隐藏
    // text-overflow:ellipsis; //用省略号显示
    white-space:nowrap; //不换行
  }

  .panel-body {
    box-shadow: 2px 2px;
    font-size: 16px;
    font-weight: 400;
    color: #000;
    background-color: #BA22FF;
    border: 1px solid #000;
    border-radius: 5px;
    border-top-left-radius: 0px;
    line-height: 19px;
    padding: 13px 0 16px;

    .panel-img-box {
      font-size: 0;
      line-height: 0;
      & + .panel-img-box {
        margin-top: -12px;
      }
    }

    img {
      max-width: 100%;
    }

    h3 {
      font-size: 14px;
      font-weight: 600;
      padding-left: 15px;
      margin: 15px 0 6px;
      color: #212121;
    }

    p {
      margin: 0 15px;
    }
    p + p {
      margin-top: 23px;
    }
  }
}
</style>
