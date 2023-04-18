<template>
  <div class="story-video-page">
    <div class="video-group">
      <tab :animate="false" :scrollThreshold="2">
        <tab-item
          class="group-item"
          :selected="item.value === currentType"
          v-for="item in activeGroupList"
          :key="item.value"
          @on-item-click="changeGroup"
          >{{ item.label }} <span class="icon-new"></span></tab-item
        >
      </tab>
    </div>
    <!-- 视频列表 -->
    <div class="video-box">
      <ul class="video-list">
          <li v-for="item in list" :key="item.id" @click="playVideo(item)">
            <div class="img-box">
              <img :src="item.videoImg" alt="">
              <img
                src="~@/assets/img/story/play.png"
                class="play-video"
                :id="'play' + item.userId"
                alt=""
              />
            </div>
            <span class="country" v-if="!item.userId">{{ $t('country.' + item.countryCode) }}</span>
            <div class="bg-box"></div>
            <div class="tag-list" v-if="item.tagList && item.tagList.length">
              <span class="tag-item" v-for="tag in item.tagList" :key="tag">{{ tag }}</span>
            </div>
            <div class="user-info flex-s-c">
              <div class="header-img">
                <img :src="item.headImg" alt="" v-if="item.headImg">
                <img v-else src="~@/assets/img/story/icon-yaar.png" alt="">
              </div>
              <div class="user-text flex-s-s">
                <span>{{ item.userName }}</span>
                <span class="sub-txt" v-if="item.userId">
                  {{ countryIcon[item.countryCode] }}
                  {{ $t('country.' + item.countryCode) }}
                </span>
              </div>
            </div>
          </li>
        </ul>
    </div>
    <play-video :video="currentVideo" v-model="isShowVideo"></play-video>
    <play-game class-name="play-two" v-if="userId" @click.native="goIndex"></play-game>
  </div>
</template>

<script>
import Cookies from 'js-cookie'

import { triggerService } from '@/utils/statisticalTool'
import { getParams } from '@/utils/index'
import { videoList } from './videoList'

import PlayVideo from '../components/play-video.vue'
import PlayGame from '../components/play-game.vue'
import { Tab, TabItem } from '@/components/tab'

export default {
  name: 'StoryList',
  components: { PlayVideo, PlayGame, Tab, TabItem },
  data () {
    return {
      currentVideo: '',
      isShowVideo: false,
      userId: Cookies.get('userId') || '',
      countryIcon: {
        BR: '🇧🇷',
        PT: '🇵🇹',
        ID: '🇮🇩',
        TR: '🇹🇷',
        AZ: '🇦🇿',
        MX: '🇲🇽',
        CO: '🇨🇴',
        PA: '🇵🇦',
        PE: '🇵🇪',
        ES: '🇪🇸',
        AR: '🇦🇷',
        EC: '🇪🇨',
        PH: '🇵🇭',
        IN: '🇮🇳',
        RU: '🇷🇺',
        UA: '🇺🇦',
        TH: '🇹🇭',
        VN: '🇻🇳',
        EG: '🇪🇬',
        MA: '🇲🇦'
      },
      currentType: 0,
      videoList,
      groupList: [
        {
          label: this.$t('storyList.carnival'),
          value: 0,
          isShow: true
        },
        {
          label: this.$t('storyList.lipSynchro'),
          value: 1,
          isShow: true
        },
        {
          label: this.$t('storyList.hashtag'),
          value: 2,
          isShow: false
        },
        {
          label: this.$t('storyList.bgMusic'),
          value: 3,
          isShow: false
        }
      ]
    }
  },
  computed: {
    list () {
      const list = this.videoList.filter(item => item.type === this.currentType)
      return list
    },
    activeGroupList () {
      return this.groupList.filter(item => item.isShow)
    }
  },
  methods: {
    playVideo (item) {
      this.currentVideo = item.videoUrl
      this.isShowVideo = true
      triggerService({ eventId: '105-2-1-3', freeName2: item.id, freeName1: this.$route.name }) // 视频播放
    },

    // 用户主页
    goIndex () {
      const userIndex = 'profile/'
      const src = this.$deepLink + userIndex + this.userId

      console.log('用户主页', src)
      window.location.href = src
    },

    changeGroup (value) {
      console.log(value, '------v')
      document.documentElement.scrollTop = 0
      this.currentType = value
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
.story-video-page {
  min-height: 100vh;
  background-color: #fff;
  padding: 40px 8px;
  overflow: hidden;
  position: relative;
}

.video-group {
    font-size: 12px;
    color: #191919;
    height: 40px;
    position: fixed;
    width: 100%;
    z-index: 9;
    padding-top: 10px;
    top: 0;
    background: #fff;

    .scrollable {
        padding-bottom: 0;
    }

    .vux-tab-container {
        top: 9px;
        height: auto;
    }

    .vux-tab {
        height: auto;

        .group-item {
            height: 34px;
            line-height: 34px;
            font-size: 12px;
            font-weight: bold;
            background: #FFFFFF;
            color: #2E2E2E;
            margin: 0 10px;
            white-space: nowrap;
            flex-grow: 0;

            &.vux-tab-selected {
                border-bottom: none;
                position: relative;
                 &::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    height: 2px;
                    background: linear-gradient(151deg, #38B2FF 0%, #EE5EFF 100%);
                    box-shadow: 0px 0px 2px 0px rgba(235,138,255,0.25);
                    border-radius: 2px;
                    width: 100%;
                }

            }
        }

        .icon-new {
          display: none;
          position: absolute;
          right: 0;
          top: 0;
          background: center / contain url(~@/assets/img/story/icon-new.png)
      no-repeat;
          width: 23px;
          height: 12px;
        }
    }
}

.video-list {
  margin-top: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 4px;
  grid-column-gap: 4px;
  justify-content: center;
  place-items: center center;

  li {
    width: 100%;
    position: relative;
  }

  .img-box {
    text-align: center;
    height: 237px;
    background: rgb(241, 241, 241);
    border-radius: 8px;
    overflow: hidden;
    position: relative;

    img {
      max-width: 100%;
    }
  }

  .country{
    position: absolute;
    text-align: center;
    top: 0;
    left: 0;
    min-width: 44px;
    line-height: 18px;
    font-size: 9px;
    color: #fff;
    border-radius: 9px 0 9px 0;
    background: #00C784FF;
    padding: 0 6px;
  }

  .bg-box {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 97px;
    border-radius: 0 0 9px 9px;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.83) 0%, rgba(0, 0, 0, 0) 100%);
  }

  .user-info {
    position: absolute;
    bottom: 10px;
    left: 8px;

    .header-img {
      width: 27px;
      height: 27px;
      padding: 3px;
      font-size: 0;
      margin-right: 6px;
      background: center / contain url(~@/assets/img/story/icon-circle.png)
      no-repeat;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .user-text {
      font-size: 12px;
      color: #fff;
      flex-direction: column;
    }

    .sub-txt {
      font-size: 9px;
      color: #FFFFFFCC;

      img {
        width: 14px;
        height: 9px;
      }
    }
  }

  .play-video {
    position: absolute;
    display: none;
    top: 105px;
    bottom: 0;
    left: 60px;
    right: 0;
    width: 41px;
    height: 41px;
  }

  .tag-list {
    text-align: center;
    position: absolute;
    bottom: 52px;
    left: 8px;
    font-size: 0;

    span {
      padding: 3px 6px;
      font-size: 10px;
      color: #bfbfbf;
      border-radius: 9px;
      background: rgba(0, 0, 0, 0.17);

      & + span {
        margin-left: 3px;
      }
    }
  }
}

</style>
