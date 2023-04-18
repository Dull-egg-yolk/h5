<template>
  <div class="story-page">
    <div class="story-header"></div>
    <span class="icon-cd"></span>
    <!-- 活动时间 -->
    <div class="panel-box">
      <div class="panel-title panel-title1">{{ $t('christmas.activityPeriod') }}</div>
      <div class="panel-body">
        <dl class="time-box">
          <dt>{{ $t('storyVideo.startTimeTitle') }}</dt>
          <dd>{{ $t('storyVideo.startTime') }}</dd>
          <dt>{{ $t('storyVideo.endTimeTitle') }}</dt>
          <dd>{{ $t('storyVideo.endTime') }}</dd>
        </dl>
      </div>
    </div>

    <!-- 参加条件 -->
    <div class="panel-box">
      <div class="panel-title">{{ $t('storyVideo.condition') }}</div>
      <div class="panel-body">
        <p>{{ $t('storyVideo.conditionDesc') }}</p>
      </div>
    </div>

    <!-- 奖励 -->
    <div class="panel-box">
      <div class="panel-title">{{ $t('storyVideo.rewardTitle') }}</div>
      <div class="panel-body">
        <p>{{ $t('storyVideo.reward1') }}</p>
      </div>
    </div>

    <!-- 规则 -->
    <div class="panel-box">
      <div class="panel-title">{{ $t('storyVideo.rulesTitle') }}</div>
      <div class="panel-body">
        <p v-html="$t('storyVideo.rule1')"></p>
        <div class="panel-img-box"><img src="../assets/img/story/rule2.png" alt="" /></div>
        <div class="panel-img-box"><img src="../assets/img/story/rule3.png" alt="" /></div>
        <div class="panel-img-box"><img src="../assets/img/story/rule4.png" alt="" /></div>
        <p>{{ $t('storyVideo.rule2') }}</p>
        <p>{{ $t('storyVideo.rule3') }}</p>
        <p style="text-align: center;"><span class="link-txt" @click="routerTo('Guide')">{{ $t('guide.title') }}</span> </p>
      </div>
    </div>

    <!-- 视频列表 -->
    <div class="panel-box">
      <div class="panel-title">{{ $t('newStory.videoDesc') }}</div>
      <div class="panel-body">
        <p>{{ $t('storyVideo.video') }}</p>
        <ul class="video-list">
          <li v-for="item in videoList" :key="item.id" @click="playVideo(item)">
            <div class="img-box">
              <img :src="item.img" alt="">
              <img
                src="../assets/img/story/play.png"
                class="play-video"
                :id="'play' + item.id"
                alt=""
              />
            </div>
          </li>
        </ul>
        <!-- <div class="btn-more" @click="routerTo('StoryList')">See more stories</div> -->
      </div>
    </div>
    <play-video :video="currentVideo" v-model="isShowVideo"></play-video>
    <div class="story-footer"></div>
    <play-game v-if="userId" @click.native="goIndex"></play-game>
  </div>
</template>

<script>
import Cookies from 'js-cookie'

import { triggerService } from '@/utils/statisticalTool'
import { getParams } from '@/utils/index'

import PlayVideo from './components/play-video.vue'
import PlayGame from './components/play-game.vue'

export default {
  name: 'Story',
  components: { PlayVideo, PlayGame },
  data () {
    return {
      currentVideo: '',
      isShowVideo: false,
      userId: Cookies.get('userId') || ''
    }
  },
  computed: {
    videoList () {
      const localVideo = ['pt,2', 'en,4'] // 本地语言视频的列表，有本地视频时只需在此处添加对应的语言即可
      const listV = this.createVideo(localVideo) // 视频列表
      return listV
    },
    videoTagList () {
      const localVideo = [
        { local: 'br,1', tag: '#sticker,#dance' },
        { local: 'ru,2', tag: '#dance|#sing' },
        { local: 'pt,1', tag: '#sing' },
        { local: 'id,2', tag: '#dance|#sing' },
        { local: 'vi,2', tag: '#sing|#dance' }
      ]
      const listT = this.createVideo(localVideo, true)
      return listT
    }
  },
  methods: {
    playVideo (item) {
      console.log(item.video, '------v')
      this.currentVideo = item.video
      this.isShowVideo = true
      triggerService({ eventId: '105-2-1-3', freeName2: item.id }) // 视频播放
    },
    routerTo (name, eventId) {
      if (eventId) {
        triggerService({ eventId }) // 埋点
      }
      this.$router.push({
        name
      })
    },

    /**
     * 生成视频列表
     * @param {Array} list 视频列表
     * @param {Boolean} tag 是否是标签视频
     * return Array
     */
    createVideo (list, tag = false) {
      const first = tag ? '_tag' : ''
      const url = 'https://h5.livuchat.com/video/story-video/story' + first
      const listV = [] // 视频列表

      const lang = this.$i18n.locale
      const langs = list.map(item => {
        const el = tag ? item.local : item
        return el.split(',')[0]
      })

      const index = langs.indexOf(lang)
      if (index > 0) {
        const del = list.splice(index, 1)
        list.unshift(del[0])
      }

      list.forEach((item, index) => {
        const el = tag ? item.local : item
        const arr = el.split(',')
        const local = arr[0] ? '_' + arr[0] : ''
        const count = arr[1] || 4 // 生成1-4的视频后缀
        for (let i = 1; i <= count; i++) {
          const path = url + i + local
          const obj = {
            id: i + local + first,
            video: path + '.mp4',
            img: path + '.png'
          }
          if (tag) {
            const tags = item.tag.split('|')
            obj.tag = tags[i - 1].split(',')
          }
          listV.push(obj)
        }
      })
      return listV
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
.story-page {
  min-height: 100vh;
  background-image: url(../assets/img/story/body-bg.png),
    url(../assets/img/story/bg.png);
  background-repeat: no-repeat, no-repeat;
  background-position: top center, top center;
  background-attachment:scroll, fixed;
  background-size: contain, cover;
  background-color: #ff979c;
  padding: 0 10px;
  overflow: hidden;
  position: relative;

  .icon-cd {
    position: absolute;
    top: 44px;
    right: 24px;
    width: 90px;
    height: 90px;
    background: center / contain url(../assets/img/story/icon-cd.png) no-repeat;
    z-index: 9;
  }

  .story-header {
    height: 114px;
    width: 100%;
    margin-bottom: -30px;
  }

  .story-footer {
    height: 64px;
    font-size: 0;
    margin: 0 -15px;
    background: linear-gradient(214deg, #5854F1 0%, #726EF0 100%);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 10px;
      left: 0;
      height: 20px;
      background-image: repeating-linear-gradient( 90deg, transparent 0px, transparent 20px, rgba(255, 0, 0, 0.8) 20px,rgba(255, 0, 0, 0.8) 40px, );
      width: 100%;
    }
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

  dd {
    font-size: 18px;
    font-weight: 600;
  }
  dd + dt {
    margin-top: 15px;
  }
}

.video-list {
  margin-top: 15px;
  display: grid;
  padding: 0 15px;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  justify-content: center;
  place-items: center center;

  li {
    width: 100%;
  }

  .img-box {
    text-align: center;
    height: 160px;
    background: rgb(233, 233, 233);
    border-radius: 11px;
    overflow: hidden;
    position: relative;
  }

  .video-item {
    max-width: 100%;
    height: 160px;
  }

  .play-video {
    position: absolute;
    top: 60px;
    bottom: 0;
    left: 60px;
    right: 0;
    width: 41px;
    height: 41px;
  }

  .tag-list {
    margin-top: 6px;
    text-align: left;
    span {
      padding: 2px 5px;
      font-size: 10px;
      color: #626262;
      border-radius: 9px;
      background: #F6F6F6;

      & + span {
        margin-left: 3px;
      }
    }
  }
}

.btn-more {
  margin: 25px 15px 0;
  height: 49px;
  line-height: 49px;
  background: #E34048;
  border-radius: 11px;
  text-align: center;
  font-size: 15px;
  color: #fff;
}

.panel-box {
  background: #ffffff;
  border-radius: 12px 12px 8px 8px;
  border: 1px solid #000000;
  position: relative;
  margin-bottom: 10px;

  .adorn {
    position: absolute;
    right: 11px;
    top: 13px;
    width: 64px;
    height: 17px;
    background: center / contain url(../assets/img/story/icon-adorn.png)
      no-repeat;
  }
  .panel-title {
    line-height: 50px;
    font-size: 15px;
    font-weight: 600;
    margin: -1px -3px 0 -3px;
    color: #000;
    height: 45px;
    background: center/ cover url(../assets/img/story/title-bg.png) no-repeat;
    text-transform: uppercase;
    padding-left: 15px;
    padding-right: 70px;
    overflow:hidden; //超出的文本隐藏
    text-overflow:ellipsis; //用省略号显示
    white-space:nowrap; //不换行

    &.panel-title1 {
      background-image: url(../assets/img/story/title-bg2.png);
    }
  }

  .panel-body {
    font-size: 13px;
    font-weight: 400;
    color: #212121;
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

  .link-txt {
    font-size: 15px;
    color: #00C784;
    text-decoration: underline;
  }
}
</style>

<style lang="less">
.panel-body {
  b {
    font-weight: bold;
    color: #ea4335;
  }
}
</style>
