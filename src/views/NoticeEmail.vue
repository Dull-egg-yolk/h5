<template>
  <div class="notice_email">
    <div class="banner">
      <div class="banner-box">
        <div class="txt" v-html="$t('noticeEmail.desc')"></div>
      </div>
    </div>
    <div class="intro">
      <div class="title">
        <div class="inner">
          <div class="title-txt">
            {{ $t("noticeEmail.bind_method") }}
          </div>

        </div>
      </div>
      <div class="txt">
        <p>
          {{ $t("noticeEmail.desc2") }}
        </p>
        <p>
          {{ $t("noticeEmail.desc3") }}
        </p>
      </div>
    </div>
    <div class="intro">
      <div class="title">
        <div class="inner">
          <div class="title-txt">
            {{ $t("noticeEmail.tutorial") }}
          </div>

        </div>
      </div>
      <div class="txt">
        <template v-if="lang == 'pt'">
          <p>
            <img src="../assets/img/noticeEmail/notice_pt_1.jpg" alt="" />
          </p>
          <p>
            <img src="../assets/img/noticeEmail/notice_pt_2.jpg" alt="" />
          </p>
        </template>
        <template v-else-if="lang == 'es'">
          <p>
            <img src="../assets/img/noticeEmail/notice_es_1.jpg" alt="" />
          </p>
          <p>
            <img src="../assets/img/noticeEmail/notice_es_2.jpg" alt="" />
          </p>
        </template>
        <template v-else-if="lang == 'ru'">
          <p>
            <img src="../assets/img/noticeEmail/notice_ru_1.jpg" alt="" />
          </p>
          <p>
            <img src="../assets/img/noticeEmail/notice_ru_2.jpg" alt="" />
          </p>
        </template>
        <template v-else-if="lang == 'tr'">
          <p>
            <img src="../assets/img/noticeEmail/notice_tr_1.jpg" alt="" />
          </p>
          <p>
            <img src="../assets/img/noticeEmail/notice_tr_2.jpg" alt="" />
          </p>
        </template>
        <template v-else-if="lang == 'vi'">
          <p>
            <img src="../assets/img/noticeEmail/notice_vi_1.jpg" alt="" />
          </p>
          <p>
            <img src="../assets/img/noticeEmail/notice_vi_2.jpg" alt="" />
          </p>
        </template>
        <template v-else-if="lang == 'id'">
          <p>
            <img src="../assets/img/noticeEmail/notice_id_1.jpg" alt="" />
          </p>
          <p>
            <img src="../assets/img/noticeEmail/notice_id_2.jpg" alt="" />
          </p>
        </template>
        <template v-else-if="lang == 'ar'">
          <p>
            <img src="../assets/img/noticeEmail/notice_ar_1.jpg" alt="" />
          </p>
          <p>
            <img src="../assets/img/noticeEmail/notice_ar_2.jpg" alt="" />
          </p>
        </template>
        <template v-else-if="lang == 'th'">
          <p>
            <img src="../assets/img/noticeEmail/notice_th_1.jpg" alt="" />
          </p>
          <p>
            <img src="../assets/img/noticeEmail/notice_th_2.jpg" alt="" />
          </p>
        </template>
        <template v-else>
          <p>
            <img src="../assets/img/noticeEmail/notice_en_1.jpg" alt="" />
          </p>
          <p>
            <img src="../assets/img/noticeEmail/notice_en_2.jpg" alt="" />
          </p>
        </template>
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
    lang () {
      return this.$i18n.locale
    }
  },
  methods: {},
  mounted () {
    console.log(this.lang, '----')
  }
}
</script>

<style lang="less" scoped>
.notice_email {
  background: linear-gradient(320deg, #9AEEA0 0%, #42A247 100%);
  font-family: PingFangSC-Regular, PingFang SC;
  padding-bottom: 20px;

  .banner {
    background: url(../assets/img/noticeEmail/banner.png) center no-repeat;
    background-size: 100% auto;
    text-align: center;
    font-size: 15px;
    font-weight: 500;
    line-height: 1.5;
    color: #ffffff;
    box-sizing: border-box;
    padding: 108px 11px 0;
    font-family: PingFangSC-Medium, PingFang SC;

    .banner-box {
      padding: 17px 17px 24px 24px;
      background: #00770696;

      border-radius: 16px;
      backdrop-filter: blur(10px);
    }

    .txt {
      display: inline-flex;
      flex-direction: row;
      align-content: center;
      align-items: center;
      animation: showTitle 0.4s both;
    }

  }

  .intro {
    background: #fff;
    margin: 10px;
    border-radius: 16px;
    padding: 0 20px 20px;
    font-size: 15px;
    margin-top: 30px;
    color: #000;

    .title {
      text-align: center;
      font-size: 15px;

      .inner {
        margin-top: -17px;
        display: inline-block;
        height: 35px;
        padding: 0 30px;
        line-height: 35px;
        position: relative;
        background: linear-gradient(360deg, #4ECC8B 0%, #D8F97B 100%);
        border-radius: 23px;
        border: 1px solid #DCE5A8;

        .title-txt {
          display: inline-block;
          max-width: 280px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }

    p {
      padding: 10px 0;

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
