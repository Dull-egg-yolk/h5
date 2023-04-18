<template>
  <div class="story-page-14">
    <div class="story-header">
      <div class="header-txt" v-html="$t('story14.title')"></div>
    </div>
    <!-- 活动时间 -->
    <div class="panel-box panel-first">
      <div class="panel-body">
        <dl class="time-box">
          <dt>{{ $t('story14.startTimeTitle') }}</dt>
          <dd>{{ $t('story14.startTime') }}</dd>
          <dt>{{ $t('story14.endTimeTitle') }}</dt>
          <dd>{{ $t('story14.endTime') }}</dd>
        </dl>
      </div>
    </div>
    <!-- 规则 奖励 -->
    <div class="panel-box">
      <div class="panel-title">{{ $t('story14.rules') }}</div>
      <div class="panel-body">
        <p>{{ $t('story14.rules1') }}</p>
        <p>{{ $t('story14.rules2') }}</p>
        <p v-html="$t('story14.rules3')"></p>
        <p v-html="$t('story14.rules4')"></p>
        <p>{{ $t('story14.rules5') }}</p>
      </div>
    </div>

    <!-- 注意事项 -->
    <div class="panel-box panel-last">
      <div class="panel-title">{{ $t('story14.notice') }}</div>
      <div class="panel-body">
        <p v-html="$t('story14.notice1')"></p>
        <p>{{ $t('story14.notice2') }}</p>
        <p>{{ $t('story14.notice3') }}</p>
      </div>
    </div>
    <div class="story-footer"></div>
    <play-game
      v-if="userId"
      @click.native="goIndex"
      class="story-play-btn"
    ></play-game>
  </div>
</template>

<script>
import Cookies from 'js-cookie'

import { triggerService } from '@/utils/statisticalTool'
import { getParams } from '@/utils/index'

import PlayGame from './components/play-game.vue'

export default {
  name: 'Story',
  components: { PlayGame },
  data () {
    return {
      currentVideo: '',
      isShowVideo: false,
      userId: Cookies.get('userId') || ''
    }
  },
  computed: {},
  methods: {
    routerTo (name, eventId) {
      if (eventId) {
        triggerService({ eventId }) // 埋点
      }
      this.$router.push({
        name
      })
    },

    // 用户主页
    goIndex () {
      const userIndex = 'profile/'
      const src = this.$deepLink + userIndex + this.userId

      console.log('用户主页', src)
      window.location.href = src
    }
  },
  created () {
    const query = this.$router.query || getParams()
    const from = (query && query.bannerStory) || ''
    triggerService({ eventId: '105-2-1-2', freeName2: from, freeName1: this.$route.name }) // story 页面曝光
  }
}
</script>

<style lang="less" scoped>
.story-page-14 {
  min-height: 100vh;
  background-image: url(../assets/img/story14/body-bg.png),
    url(../assets/img/story14/bg-left.png),
    url(../assets/img/story14/bg-right.png);
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-position: top center, 0 240px, right 240px;
  background-attachment: scroll, scroll, scroll;
  background-size: contain, contain, contain;
  padding: 0 15px;
  overflow: hidden;
  position: relative;

  .story-header {
    height: 214px;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: -30px;
    padding-top: 32px;

    .header-txt {
      width: 186px;
      font-size: 20px;
      line-height: 26px;
      font-weight: 900;
      color: #ffffff;
      background: linear-gradient(323deg, #25fbec 0%, #ffffff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .story-footer {
    height: 74px;
    font-size: 0;
    background: linear-gradient(137deg, #5046c3 0%, #364cb7 100%);
    position: relative;
  }
}
.time-box {
  dt {
    height: 20px;
    font-size: 16px;
    font-weight: 400;
    color: #fff;
    line-height: 20px;
    font-weight: 600;
  }

  dd {
    font-size: 16px;
    font-weight: 600;
  }
  dd + dt {
    margin-top: 6px;
  }
}

.panel-box {
  background: #360cab;
  color: #fff;
  position: relative;
  padding: 13px 12px 0 15px;

  &.panel-first {
    background: linear-gradient(0deg, #360cab 60px, #0000 80px);
  }

  &.panel-last {
    border-radius: 0 0 11px 11px;
    .panel-body {
      border-bottom: none;
    }
  }

  .panel-title {
    line-height: 20px;
    font-size: 16px;
    font-weight: 600;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //用省略号显示
    white-space: nowrap; //不换行
    margin-bottom: 7px;
  }

  .panel-body {
    font-size: 14px;
    font-weight: 400;
    line-height: 19px;
    padding-bottom: 10px;
    border-bottom: 1px dashed #ffffff82;

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
    }

    p + p {
      margin-top: 23px;
    }
  }

  .link-txt {
    font-size: 15px;
    color: #00c784;
    text-decoration: underline;
  }
}
</style>
<style lang="less">
.story-page-14 {
  em {
    font-style: normal;
  }
  p {
    em {
      color: #fff707;
    }
  }
}
</style>
