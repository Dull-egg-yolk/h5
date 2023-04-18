<template>
  <div class="mysticGoddess-page">
    <div class="banner">
      <div style="height: 65%"></div>
      <div class="banner-title">{{ $t("mysticGoddess.title") }}</div>
      <div class="banner-time">
          <div class="banner-content">{{ $t("mysticGoddess.startTime") }} - {{ $t("mysticGoddess.endTime") }}</div>
      </div>
    </div>
    <div class="panel-bg"></div>
    <div class="panel-box bg">
      <div class="panel-title">{{ $t("mysticGoddess.condition") }}</div>
      <div class="panel-content">
          <div>{{ $t("mysticGoddess.conditionDesc") }}</div>
          <img class="coin" src="../assets/img/mysticGoddess/icon.png"/>
      </div>
    </div>
    <div class="panel-box">
      <div class="panel-title1">{{ $t("mysticGoddess.rulesTitle") }}</div>
      <div class="panel-content">
        <div class="panel-div">{{ $t("mysticGoddess.rules1") }}</div>
        <div class="panel-div" v-html="$t('mysticGoddess.rules2', {rules1Text: rules1Text,rules2Text: rules2Text})"></div>
        <div class="panel-div">{{ $t("mysticGoddess.rules3") }}</div>
      </div>
    </div>
    <div class="panel-bg"></div>
    <div class="panel-box bg">
      <div class="panel-title title">{{ $t("mysticGoddess.noteTitle") }}</div>
      <div class="panel-content">
        <div class="panel-div">{{ $t("mysticGoddess.note1") }}</div>
        <div class="panel-div">{{ $t("mysticGoddess.note2") }}</div>
      </div>
    </div>
    <!-- <div></div> -->
    <div class="footer-title" @click="goIndex">{{ $t("mysticGoddess.footerTitle") }}</div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      userId: Cookies.get('userId') || '',
      rules1Text: '',
      rules2Text: '',
      rules3Text: '',
      note1Text: ''
    }
  },

  components: {},

  computed: {},

  methods: {
    // 用户主页
    goIndex () {
      const userIndex = 'profile/'
      const src = this.$deepLink + userIndex + this.userId

      console.log('用户主页', src)
      window.location.href = src
    }
  },

  created () {
    const navLang = navigator.language
    let locale = navLang.toLocaleLowerCase()
    locale = locale.split('-')
    locale = locale[0]
    switch (locale) {
      case 'zh':
        this.rules1Text = '口罩、面纱、纱丽、眼镜等遮面面具'
        this.rules2Text = '300 coins'
        break
      case 'tr':
        this.rules1Text = 'MASKE, PEÇE, ŞAPKA, GÖZLÜK ve diğer YÜZ KAPLAMALARI '
        this.rules2Text = '300'
        break
      case 'ar':
        this.rules1Text = 'حجاب ، و SAEI ، ونظارات وأغطية أخرى للوجه'
        this.rules2Text = '300 قطعة'
        break
      case 'hi':
        this.rules1Text = 'मास्क, घूंघट, साड़ी, चश्मा और अन्य फेस कवरिंग पहन सकते हैं'
        this.rules2Text = '300 कॉइन'
        break
      default:
        this.rules1Text = 'MASKS, VEILS, SAEI, GLASSES and other FACE COVERINGS'
        this.rules2Text = '300 coins'
        break
    }
  }
}
</script>
<style lang='less' scoped>
.mysticGoddess-page {
  background: #090617;
  min-height: 100vh;
  background-attachment:scroll, fixed;
  background-size: 100% 100%;
//   padding: 0 10px;
  overflow: hidden;
  position: relative;
  color: #fff;
  .panel-bg{
    position: relative;
    height: 30px;
    background-image: url(../assets/img/mysticGoddess/content-bg.png), url(../assets/img/mysticGoddess/star.png);
    background-position: center, top;
    background-repeat: repeat, no-repeat;
    background-size: 100%, cover;
    margin-bottom: 20px;
  }
  .banner {
    padding: 10px 30px;
    height: 400px;
    margin-bottom: 20px;
    position: relative;
    z-index: 1;
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: url(../assets/img/mysticGoddess/body-bg.png) no-repeat center 0;
      background-size: 100% 100%;
    }
    .banner-title{
        text-align: center;
        font-size: 20px;
        height: 80px;;
        padding-top: 15px;
        position: relative;
    }
    .banner-time{
        margin-top:5px;
        position: relative;
      .banner-content{
          font-size: 12px;
          text-align: center;
          line-height: 25px;
          color: #78FAFF;
          text-shadow: 0px 0px 5px rgba(120, 250, 255, 0.7);
          padding-left: 15px;
      }
    }
  }
  .panel-box {
    padding: 10px 20px;
    position: relative;
    margin-bottom: 10px;
    .panel-title {
      border: 2px solid #E6A0FF;
      box-shadow: 0px 0px 5px 0px rgba(187, 96, 219, 0.58);
      color: #E6A0FF;
      height: 25px;
      border-radius: 25px;
      font-size: 12px;
    //   width: 80px;
      padding: 0px 10px;
      text-align: center;
      line-height: 25px;
      position: absolute;
      top: -10px;
      left: 20px;
      font-weight: 500;
      background-color: #090617;
    }
    .panel-title1 {
      border: 2px solid #7BFF48;
      box-shadow: 0px 0px 5px 0px rgba(140, 255, 96, 0.73);
      color: #fff;
      height: 25px;
      border-radius: 25px;
      font-size: 12px;
      padding: 0px 10px;
    //   width: 80px;
      text-align: center;
      line-height: 25px;
      position: absolute;
      top: -10px;
      left: 20px;
      font-weight: 500;
      background-color: #090617;
    }
    .panel-content {
      padding: 10px 15px;
      border: 1px solid rgba(255, 255, 255, 0.24);
      border-radius: 10px;
      font-size: 12px;
      line-height: 20px;
      background-color: #140E2F;
      .coin{
        width: 40px;
        height: 40px;
        position: absolute;
        top:28px;
        right:10px;
      }
      .panel-div{
          margin-bottom: 5px;
      }
    }
  }
  .bg{
    background: url(../assets/img/mysticGoddess/star1.png);
    background-attachment:scroll, fixed;
    background-size: 100% 100%;
  }
  .footer-title {
    margin: 0 20px;
    text-align: center;
    font-size: 14px;
    white-space: nowrap;
    color: #fff;
    margin-bottom: 30px;
    font-weight: 400;
    border:2px solid #7AFAFF;
    border-radius: 30px;
    height: 30px;
    line-height: 30px;
    color: #78FAFF;
    box-shadow: 0px 2px 4px 0px #FFFFFF;
    font-weight: 600;
  }
}
/* 从右至左的语言 */
[lang='ar'],
[lang='he'],
[lang='ur'] {
  .mysticGoddess-page {
    direction: rtl;
    .panel-title{
      margin-left:270px ;
    }
    .title{
      margin-left:280px ;
    }
    .panel-title1{
      margin-left:240px ;
    }
    .coin{
        margin-right:280px ;
    }
    .banner-time{
        margin-top: 15px;
    }
    .banner-content{
        line-height: 10px !important;
        padding-left: 0 !important;
        padding-right: 30px !important;
    }
    .banner{
      &::before {
        transform: rotateY(180deg);
      }
    }
  }
}
</style>
