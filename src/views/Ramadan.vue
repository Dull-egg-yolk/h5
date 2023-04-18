<template>
  <div class="ramadan-page">
    <div class="ramadan-header">
      <div class="page-title">
        {{ $t('ramadan.title') }}
      </div>
    </div>
    <div class="page-notice">
      <span class="icon-img icon-1"></span>
      <span class="icon-img icon-2"></span>
      <span class="icon-img icon-3"></span>
      <p>{{ $t('ramadan.desc') }}</p>
    </div>

    <div class="page-text-content">
      <h3 class="page-text-title">{{ $t('ramadan.rules') }}</h3>
      <ol>
        <li>{{ $t('ramadan.rules1') }}</li>
        <li>
          {{ $t('ramadan.rules2') }}
          <ol v-if="$t('ramadan.rules2a')">
            <li v-if="$t('ramadan.rules2a')">{{ $t('ramadan.rules2a') }}</li>
            <li v-if="$t('ramadan.rules2b')">{{ $t('ramadan.rules2b') }}</li>
          </ol>
        </li>
        <li v-if="$t('ramadan.rules3')">
          {{ $t('ramadan.rules3') }}
          <ol>
            <li>{{ $t('ramadan.rules3a') }}</li>
            <li>{{ $t('ramadan.rules3b') }}</li>
            <li>{{ $t('ramadan.rules3c') }}</li>
          </ol>
        </li>
        <li>{{ $t('ramadan.daily') }}</li>
        <li>{{ $t('ramadan.rules4') }}</li>
      </ol>
      <div class="img-box">
        <img :src="calendarImg" alt="" />
      </div>
    </div>

    <!-- 规则 -->
    <div class="panel-box">
      <div class="panel-title">{{ $t('ramadan.faq') }}</div>
      <div class="panel-body">
        <p class="panel-info">{{ $t('ramadan.faqInfo') }}</p>
        <div class="panel-img-box">
          <img src="../assets/img/ramadan/img1.png" alt="" />
        </div>
        <div class="panel-img-box">
          <img src="../assets/img/ramadan/img2.png" alt="" />
        </div>
      </div>
    </div>

    <div class="story-footer">
      {{ $t('ramadan.interpretation') }}
    </div>
  </div>
</template>

<script>
import { triggerService } from '@/utils/statisticalTool'
import { getParams } from '@/utils/index'

export default {
  name: 'Ramadan',
  components: {},
  data () {
    return {
      calendar: {
        ar: require('@/assets/img/ramadan/calendar-ar.png'),
        en: require('@/assets/img/ramadan/calendar-en.png'),
        hi: require('@/assets/img/ramadan/calendar-hi.png'),
        id: require('@/assets/img/ramadan/calendar-id.png'),
        tr: require('@/assets/img/ramadan/calendar-tr.png')
      }
    }
  },
  computed: {
    calendarImg () {
      const img = this.calendar[this.$i18n.locale]
      return img || this.calendar.en
    }
  },
  methods: {},
  created () {
    const query = this.$router.query || getParams()
    const from = (query && query.bannerStory) || ''
    triggerService({
      eventId: '105-2-1-2',
      freeName2: from,
      freeName1: this.$route.name // Ramadan
    }) // 斋月节 页面曝光
  }
}
</script>

<style lang="less" scoped>
.ramadan-page {
  min-height: 100vh;
  background-image: url(../assets/img/ramadan/body-bg.png),
    linear-gradient(180deg, #1f4031 0%, #1f412f 100%);
  background-repeat: no-repeat, no-repeat;
  background-position: top center, top center;
  background-attachment: scroll, fixed;
  background-size: contain, cover;
  background-color: #1f4031;
  padding: 0 13px;
  overflow: hidden;
  position: relative;

  .ramadan-header {
    padding-top: 136px;
    width: 100%;
  }

  .page-title {
    width: 280px;
    margin: 0 auto;
    font-size: 39px;
    font-weight: bold;
    color: #ffc10d;
    line-height: 53px;
    text-align: center;
    font-style: italic;
  }

  .story-footer {
    text-align: center;
    padding: 10px 15px 35px;
    font-size: 12px;
    color: #5e947b;
  }

  .page-notice {
    margin: 24px 12px;
    background: rgba(49, 97, 74, 0.68);
    border-radius: 16px;
    border-image: linear-gradient(
        160deg,
        rgba(121, 180, 154, 0.28),
        rgba(40, 82, 62, 1)
      )
      1 1;
    backdrop-filter: blur(30px);
    position: relative;
    padding: 28px 59px 28px 17px;
    color: #fff;
    font-size: 15px;
    line-height: 21px;

    font-weight: 400;
    box-sizing: border-box;
    text-align: center;

    .icon-img {
      position: absolute;
      background-size: contain;
    }
    .icon-1 {
      right: -43px;
      top: -53px;
      width: 95px;
      height: 95px;
      background: center / contain url(../assets/img/ramadan/icon-1.png)
        no-repeat;
    }
    .icon-2 {
      right: 0;
      bottom: 0;
      width: 65px;
      height: 81px;
      background: center / contain url(../assets/img/ramadan/icon-2.png)
        no-repeat;
    }

    .icon-3 {
      left: -8px;
      bottom: -8px;
      width: 31px;
      height: 28px;
      background: center / contain url(../assets/img/ramadan/icon-3.png)
        no-repeat;
    }
  }

  .page-text-content {
    padding-bottom: 16px;
    color: #fff;
    font-size: 16px;
    line-height: 23px;

    .page-text-title {
      margin-bottom: 10px;
    }

    ol {
      padding-left: 20px;
      li {
        list-style: decimal;
        & > ol {
          padding-left: 15px;
          li {
            list-style: disc;
          }
          li + li {
            margin-top: 0;
          }
        }
      }

      li + li {
        margin-top: 10px;
      }
    }
  }

  .img-box {
    margin-top: 16px;
    img {
      max-width: 100%;
    }
  }
}

.panel-box {
  background: #366b52;
  color: #fff;
  border-radius: 16px;
  position: relative;
  margin-bottom: 10px;
  padding: 13px 10px;

  .panel-title {
    line-height: 31px;
    font-size: 22px;
    font-weight: 600;
    height: 31px;
    text-align: center;
    text-transform: uppercase;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //用省略号显示
    white-space: nowrap; //不换行
  }

  .panel-body {
    font-size: 13px;
    font-weight: 400;
    line-height: 19px;

    .panel-img-box {
      font-size: 0;
      line-height: 0;
      & + .panel-img-box {
        margin-top: 10px;
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
    }

    p + p {
      margin-top: 23px;
    }

    .panel-info {
      background: linear-gradient(
        90deg,
        rgba(108, 169, 143, 0.26) 0%,
        rgba(58, 112, 86, 0.68) 100%
      );
      border-radius: 10px;
      border: 1px solid #5ba07d;
      backdrop-filter: blur(30px);
      font-size: 17px;
      line-height: 24px;
      text-align: center;
      padding: 8px 15px;
      margin-bottom: 15px;
      margin-top: 19px;
    }
  }
}

/* 从右至左的语言 */
[lang='ar'],
[lang='he'],
[lang='ur'] {
  .ramadan-page {
    direction: rtl;
    .page-text-content {
      ol {
        padding-left: 0;
        padding-right: 20px;
      }
    }
  }
}
</style>
