<template>
  <div class="story-host" :style="{minHeight: wh+'px'}">
    <!-- tab 切换 -->
    <div class="tab-list">
      <div class="inner">
        <span class="otab" :class="{ 'cur': curTabId === item }" v-for="item of tabList" :key="item"
          @click="switchTab(item)">
          {{ $t('storyhost.t'+item) }}
        </span>
      </div>

    </div>

    <!-- 列表 -->
    <div class="host-list" v-if="!netErr">
      <div class="ohost" v-for="(item,index) in showHostList" :key="index" @click="playStory(index, item.userId)">
        <div class="icon-play"></div>
        <div class="cover">
          <img :src="item.videoPicUrl" alt="">
        </div>
        <div class="tag">{{ $t('storyhost.t'+curTabId) }}</div>
        <div class="detail">
          <span class="online" v-if="item.status === 2">Online</span>
          <div class="nickname">{{item.userName}}</div>
          <div class="local">
            <span class="icon">
              <img :src="countryIcon[countryId[item.countryId]]" />
            </span>
            <span class="txt">{{ $t('country.' + countryId[item.countryId]) }}</span>
          </div>
        </div>
        <div class="btn-call" @click.stop="tocall(item.userId)">
          <span class="icon"></span>
        </div>
      </div>
    </div>

    <div class="error-box" v-else>
    </div>

    <!-- load more -->
    <div class="load-more" ref="loadMore" v-if="!noMorePage && !netErr">
      <span class="icon"></span>
    </div>

    <!-- 刷新按钮 -->
    <div class="btn-refresh" @click="getTabHostLisData">
    </div>

    <!-- 播放器 -->
    <transition
      enter-active-class="showPop"
      leave-active-class="hidePop"
      :duration="{ enter: 300, leave: 300 }"
    >
      <div class="story-player" v-if="showVideo" @click="cancelVideoPop">
        <div class="body" @click.stop>

          <div class="top-wrap">
            <div class="icon-cancel" @click="cancelVideo(curHostData.userId)">×</div>
            <div class="detail">
              <div class="avatar">
                <img :src="curHostData.headImg" alt="">
              </div>
              <div class="info">
                  <div class="nickname">{{curHostData.userName}}</div>
                  <div class="local">

                    <span class="icon">
                      <img :src="countryIcon[countryId[curHostData.countryId]]" />
                    </span>
                    <span class="txt">{{ $t('country.' + countryId[curHostData.countryId]) }}</span>
                  </div>
              </div>
            </div>
            <span class="online" v-if="curHostData.status === 2">Online</span>

          </div>

          <div class="btn-video-call" @click="tocall(curHostData.userId, true)">
            <div class="inner">
              <span class="icon"></span>
              {{$t('storyhost.t4')}}
            </div>
          </div>
          <div class="video-load" v-if="videoLoad"></div>
          <div class="video-play" v-if="showPlayBtn" @click="playVideo"></div>
          <video ref="vplayer"  :src="curHostData.videoUrl" autoPlay muted :poster="curHostData.videoPicUrl" loop playsinline webkit-playsinline></video>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { triggerService } from '@/utils/statisticalTool'
import debounce from 'lodash/debounce'
import { getStoryHostTab, getStoryHostList, checkHostrelation } from '@/api/index'
import countryId from '@/assets/data/countryId'

export default {
  name: 'StoryHost',
  data () {
    return {
      removeScrollEvent: null,
      showVideo: false,
      tabList: [],
      curHostIndex: 0,
      videoLoad: false,
      wh: window.screen.height,
      callLock: false,
      countryIcon: {
        BR: require('../assets/countryflag/br.png'),
        PT: require('../assets/countryflag/pt.png'),
        ID: require('../assets/countryflag/id.png'),
        TR: require('../assets/countryflag/tr.png'),
        AZ: require('../assets/countryflag/az.png'),
        MX: require('../assets/countryflag/mx.png'),
        CO: require('../assets/countryflag/co.png'),
        PA: require('../assets/countryflag/pa.png'),
        PE: require('../assets/countryflag/pe.png'),
        ES: require('../assets/countryflag/es.png'),
        AR: require('../assets/countryflag/ar.png'),
        EC: require('../assets/countryflag/ec.png'),
        PH: require('../assets/countryflag/ph.png'),
        IN: require('../assets/countryflag/in.png'),
        RU: require('../assets/countryflag/ru.png'),
        UA: require('../assets/countryflag/ua.png'),
        TH: require('../assets/countryflag/th.png'),
        VN: require('../assets/countryflag/vn.png'),
        EG: require('../assets/countryflag/eg.png'),
        MA: require('../assets/countryflag/ma.png'),
        CN: require('../assets/countryflag/cn.png'),
        GB: require('../assets/countryflag/gb.png')
      },
      hostList: [],
      showPlayBtn: false,
      showHostList: [],
      ohost: {
        videoImg: 'https://d6d3wha0hetk7.cloudfront.net/video-snapshot/133095559_1645777056.jpg'
      },
      curTabId: null,
      userId: Cookies.get('userId') || '',
      loadLock: false,
      noMorePage: false,
      countryId,
      netErr: false,
      firstLoad: false
    }
  },
  computed: {
    curHostData () {
      return this.hostList[this.curHostIndex]
    }

  },
  methods: {
    switchTab (id) {
      if (id === this.curTabId) return
      this.curTabId = id
      this.getTabHostLisData()
      triggerService({ eventId: '105-6-1-2', free_name2: this.curTabId + '' })
    },
    playStory (index, hostId) {
      this.showVideo = true
      this.curHostIndex = index
      this.videoLoad = true
      this.showPlayBtn = false
      triggerService({ eventId: '105-6-1-3', target_user_id: hostId + '', free_name2: this.curTabId + '' })

      this.$nextTick(() => {
        triggerService({ eventId: '105-6-1-7', target_user_id: hostId + '', free_name2: this.curTabId + '' })
        const videoLST = new Date().getTime()

        setTimeout(() => {
          this.$refs.vplayer.muted = false
        }, 100)

        this.$refs.vplayer && this.$refs.vplayer.addEventListener('canplay', () => {
          console.log('canplay')
          // 视频首次播放上报时长
          if (!this.firstLoad) {
            this.firstLoad = true
            const vLET = new Date().getTime() - videoLST
            triggerService({ eventId: '105-6-1-8', target_user_id: hostId + '', free_name2: this.curTabId + '', free_id1: vLET })
            // this.videoLoad = false
            // this.showPlayBtn = true
            console.log(vLET)
          }
        })
        this.$refs.vplayer && this.$refs.vplayer.addEventListener('play', () => {
          console.log('play')

          this.videoLoad = false
          this.showPlayBtn = false
        })
        this.$refs.vplayer && this.$refs.vplayer.addEventListener('pause', () => {
          console.log('pause')
          this.videoLoad = false
          this.showPlayBtn = true
        })
      })
    },
    cancelVideo (hostId) {
      this.$refs.vplayer.muted = true
      triggerService({ eventId: '105-6-1-6', target_user_id: hostId + '', free_name2: this.curTabId + '' })
      this.showVideo = false
      this.firstLoad = false
    },
    tocall (hostId, isVideo) {
      if (this.callLock) return
      this.callLock = true

      setTimeout(() => {
        this.callLock = false
      }, 300)

      const logEvent = isVideo ? '105-6-1-5' : '105-6-1-4'
      triggerService({ eventId: logEvent, target_user_id: hostId + '', free_name2: this.curTabId + '' })
      checkHostrelation({ friendUserId: hostId }).then(res => {
        // 暂停视频
        if (isVideo) {
          this.$refs.vplayer.pause()
          this.showPlayBtn = true
        }
        const videoUrl = 'videoCall/'
        // 判断好友关系 relation 1.单向好友，2 双向好友 3.对方和我是好友，4不是好友
        const call = res.relation === 2 ? 'friendCall/' : 'goddessWall/'
        const src = this.$deepLink + videoUrl + call + hostId
        console.log('视频呼叫', src)
        window.location.href = src
      })
    },
    listenerScroll () {
      const scrollHandler = debounce(() => {
        const sTop = document.documentElement.scrollTop || 0
        const sPos = window.screen.height + sTop

        const lmTop = this.$refs.loadMore.offsetTop

        // 加载更多
        if (this.loadLock) return
        if (sPos >= lmTop) {
          if (this.noMorePage) return
          this.pickHost()
        }
      }, 500)
      window.addEventListener('scroll', scrollHandler)
      // 抛出清除监听函数 方便后续清理
      return {
        removeEvent () {
          window.removeEventListener('scroll', scrollHandler)
        }
      }
    },
    // 获取当前tabid 下的host list  数据
    getTabHostLisData () {
      this.netErr = false
      // 重置列表设置
      this.hostList = []
      this.showHostList = []
      this.noMorePage = false

      getStoryHostList({ labelId: this.curTabId }).then(res => {
        if (res && res.length) {
          this.hostList = res
          this.pickHost()
        }
      }).catch(e => {
        this.netErr = true
      })
    },
    // 本地加载分页
    pickHost () {
      const curLen = this.showHostList.length === 0 ? 0 : this.showHostList.length
      const totalLen = this.hostList.length
      this.showHostList.push(...this.hostList.slice(curLen, curLen + 10))

      if (totalLen === 0) return
      // 判断是否是最后一页
      if (this.showHostList.length === totalLen) {
        this.noMorePage = true
      }
    },
    playVideo () {
      this.$refs.vplayer && this.$refs.vplayer.play()
      this.showPlayBtn = false
    },
    cancelVideoPop () {
      this.showVideo = false
      this.videoLoad = false
      this.showPlayBtn = false
    }
  },
  created () {
    triggerService({ eventId: '105-6-1-1' })
  },
  mounted () {
    document.title = this.$t('storyhost.t5')
    // 挂载页面滚动监听事件
    this.removeScrollEvent = this.listenerScroll()
    // 获取页面tab数据
    getStoryHostTab().then(res => {
      if (res && res.length) {
        this.tabList = res
        this.curTabId = res[0]
        this.getTabHostLisData()
      }
    })

    window.onblur = () => {
      this.$refs.vplayer && this.$refs.vplayer.pause()
      this.showPlayBtn = true
      this.videoLoad = false
    }
    window.onfocus = () => {
      this.$refs.vplayer && this.$refs.vplayer.play()
    }
  },
  beforeDestroy () {
    this.removeScrollEvent && this.removeScrollEvent.removeEvent()
  }
}
</script>

<style lang="less" scoped>
.story-host{
  background: #fff;
  .tab-list{
    position:fixed;
    width:100%;
    height: 50px;
    top:0;
    bottom:0;
    padding: 0 10px;
    box-sizing: border-box;
    background:#fff;

    font-size:0;
    z-index:10;

    .inner{
      border-bottom:solid 1px #f2f2f2
    }
    .otab{
      display:inline-block;
      font-size:14px;
      line-height: 40px;
      margin-right:10px;
      position: relative;
      &::after{
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        background:linear-gradient(151deg, #38B2FF 0%, #EE5EFF 100%);
        left:0;
        bottom:-1px;
        border-radius: 3px;
        display: none;
      }
      &.cur{
        font-weight:bold;
        font-size:16px;
        &::after{
          display:block;
          animation: curTabAni .2s both;
        }
      }
    }
  }
}

.error-box{
  padding: 300px 0;
  text-align:center;
  background:url(../assets/img/storyhost/icon-error.png) center no-repeat;
  opacity: 0.2;
  background-size: 50px auto;

}

.host-list{
  padding: 50px 6px 20px;
  font-size:0;
  position: relative;
  z-index:2;
  background:#fff;
  .ohost{
    display:inline-block;
    width:179px;
    height: 250px;
    overflow:hidden;
    margin-right: 4px;
    border-radius: 8px;
    margin-bottom:4px;
    position: relative;
    animation: showCard .2s both;

    &:nth-child(2n){
      margin-right:0;
    }

    .icon-play{
      position:absolute;
      width:40px;
      height:40px;
      background:url(../assets/img/storyhost/icon-play2.png) center no-repeat;
      background-size:100% auto;
      left:50%;
      top:50%;
      z-index:10;
      margin: -20px 0 0 -20px
    }
    &::after{
      content: '';
      position: absolute;
      bottom:0;
      left:0;
      width:100%;
      z-index:1;
      background:linear-gradient(0deg, rgba(0, 0, 0, 0.83) 0%, rgba(0, 0, 0, 0) 100%);;
      height: 100px;
    }

    .cover{
      position:relative;
      width:100%;
      height:100%;
      background:#222;
      img{
        width:100%;
        height: auto;
      }
    }

    .tag{
      position:absolute;
      top:6px;
      left:6px;
      background:rgba(0,0,0,.25);
      color:#fff;
      font-size:12px;
      transform: scale(0.85);
      transform-origin: left top;
      padding: 2px 6px;
      border-radius: 50px;
    }

    .detail{
      position:absolute;
      bottom:0;
      left:0;
      width:100%;
      box-sizing: border-box;
      padding: 10px;
      z-index:10;
      .online{
        display: inline-block;
        background:rgba(17, 255, 0, 0.6);
        border:solid 1px rgba(17, 255, 0, 1);
        border-radius: 50px;
        padding: 2px 6px;
        transform: scale(0.8);
        transform-origin: left center;
        color:#fff;
        font-size:12px;
      }
      .nickname{
        padding: 2px 0 0;
        font-size: 12px;
        color:#fff;
        height: 16px;
        line-height:16px;
        overflow:hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight:bold;
        width: 98px;
      }
      .local{
        padding-top:2px;
        line-height: 1;
        font-size:12px;
        color:#fff;
        .icon{
          img{
            display:inline-block;
            width:14px;
          }
        }
        .txt{
          display:inline-block;
          transform: scale(0.8);
          opacity: .85;
        }

      }
    }

    .btn-call{
      position:absolute;
      right:12px;
      bottom: 15px;
      width:54px;
      height:54px;
      z-index:10;
      background: linear-gradient(138deg, rgba(252, 136, 187, 0.86) 0%, rgba(252, 34, 150, 0.86) 100%);
      border-radius: 50%;
      display:inline-flex;
      align-items: center;
      justify-content: center;
      &::after,&::before{
        content: '';
        position:absolute;
        width:54px;
        height:54px;
        box-sizing: border-box;
        left: 0;
        top:0;
        border-radius: 50%;
        border:solid 1px rgba(252, 136, 187, 1);
        opacity: 0;
        z-index:1;
      }

      &::after{
        animation: callBtnAni 2s infinite linear;
      }
      &::before{
        animation: callBtnAni 2s 1s infinite linear;
      }
      .icon{
        display:block;
        width: 24px;
        height:24px;
        background:url(../assets/img/storyhost/icon-call.png) center no-repeat;
        background-size: 100% auto;
        animation: callIconAni 2s infinite;
        position:relative;
        z-index:2;
      }
    }
  }
}

.btn-refresh{
  position:fixed;
  bottom: 30px;
  right: 20px;
  z-index:8;
  width:45px;
  height:45px;
  background:url(../assets/img/storyhost/icon-refresh.png) center no-repeat;
  background-size: 100% auto;
  transition: all .2s;
  &:active{
    transform:scale(1.2)
  }
}

.load-more{
  padding:0 10px 10px;
  text-align:center;
  .icon{
    display:inline-block;
    width:22px;
    height:22px;
    background:url(../assets/img/storyhost/icon-loading.png) center no-repeat;
    background-size: 100% auto;
    opacity: .3;
    animation: loadAni 2s infinite;
  }
}

.story-player {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 100;

  &.showPop {
    .body {
      animation: showPop 0.4s both;
    }
  }

  &.hidePop {
    .body {
      animation: hidePop 0.4s both;
    }
  }
  .body {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height:100%;
    background: #555;
    transform-origin: center bottom;
    box-sizing: border-box;

    &::after,
    &::before{
      content: '';
      position: absolute;
      width:100%;
      height:190px;
      left:0;
      z-index:10;
      pointer-events: none;
    }

    &::after{
      bottom:0;
      background:linear-gradient(0, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%);
    }

    &::before{
      top:0;
      background:linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%);
    }

    video{
      width:100%;
      height:100%;
      position: relative;
      z-index: 1;
      object-fit: cover
    }

    .video-load{
      position:absolute;
      z-index:100;
      width:50px;
      opacity: .3;
      height:50px;
      background:url(../assets/img/storyhost/icon-video-loading.png) center no-repeat;
      background-size: 100% auto;
      left:50%;
      top:50%;
      margin-left:-25px;
      margin-top: -25px;
      animation: loadAni 4s infinite linear;
    }

    .video-play{
      position: absolute;
      z-index:100;
      width:100%;
      height:100px;
      left:0;
      top:50%;
      margin:-50px 0 0 0;
      background: url(../assets/img/storyhost/icon-play2.png) center no-repeat;
      background-size: 60px auto;
      opacity: 0.8;
      border-radius:50%;
    }

    .top-wrap{
      position:absolute;
      top:12px;
      left:0;
      z-index: 20;
      display:flex;
      width:100%;
      align-items: center;

      .icon-cancel{
        color:#fff;
        font-size:30px;
        padding:0 10px;
      }

      .detail{

        display:inline-flex;
        align-items: center;
        color:#fff;
        border-radius:50px;
        background:rgba(0, 0, 0, 0.3);
        padding:2px 10px 2px 2px;
        .avatar{
          width:30px;
          height:30px;
          overflow:hidden;
          border-radius: 50%;
          margin-right:5px;
          position:relative;
          img{
            width:100%;
            position:absolute;
            top:0;
            left:0;
            height: auto;
          }
        }
        .info{
          line-height: 1;
          font-size:12px;
          .nickname{
            font-weight:bold;
            max-width: 100px;
            overflow: hidden;
            height: 12px;
            text-overflow: ellipsis;
            margin-bottom:2px;
            white-space: nowrap;
          }
          .local{
            .icon{
              margin-right:2px;
              img{
                display:inline-block;
                width:14px;
              }
            }
            .txt{
              display:inline-block;
              transform:scale(0.8);
              transform-origin: left center;
              opacity: .8;
            }

          }
        }

      }

      .online{
        position:absolute;
        right:-2px;
        background:rgba(17, 255, 0, 0.6);
        border:solid 1px rgba(17, 255, 0, 1);
        border-radius: 50px 0 0 50px;
        padding: 4px 6px 4px 10px;
        transform-origin: left center;
        color:#fff;
        font-size:14px;
      }
    }

    .btn-video-call{
      position:absolute;
      z-index:20;
      bottom: 60px;
      left:50%;
      transform: translateX(-50%);
      background: linear-gradient(138deg, #FC88BB 0%, #FC2296 100%);
      border-radius: 28px;
      opacity: 0.87;

      &::after,&::before{
        content:'';
        position: absolute;
        z-index: 2;
        width:100%;
        height:100%;
        top:0;
        left:0;
        background:#000;
        background: linear-gradient(138deg, rgba(252, 136, 187, 0.9) 0%, rgba(252, 34, 150, 0.9) 100%);
        border-radius: 28px;
        opacity: 0;
      }

      &::after{
        animation: callBtnAni2 2s infinite linear;
      }

      &::before{
        animation: callBtnAni2 2s 1s infinite linear;
      }
      .inner{
        padding:0 30px;
        height:50px;
        display:flex;
        align-items: center;
        color:#fff;
        font-size:15px;
        font-weight:bold;
        position:relative;
        z-index:10;
        white-space:nowrap;
        .icon{
          display:inline-block;
          width:20px;
          height:20px;
          background:url(../assets/img/storyhost/icon-call.png) center no-repeat;
          background-size: 100% auto;
          margin-right:10px;
        }
      }
    }
  }
}

@keyframes curTabAni{
  0%{
    transform: scaleX(0);
  }
  90%{
    transform: scaleX(1.1);
  }
  100%{
    transform: scaleX(1);
  }
}

@keyframes callBtnAni{
  0%{
    opacity: 0;
    transform: scale(0);
  }
  50%{
    opacity: 0.9;
    transform: scale(1);
  }
  100%{
    opacity: 0;
    transform: scale(1.3)
  }
}

@keyframes callBtnAni2{
  0%{
    opacity: 0;
    transform: scale(0);
  }
  50%{
    opacity:1;
    transform: scale(1,1);
  }
  100%{
    opacity: 0;
    transform: scale(1.2, 1.5)
  }
}

@keyframes callIconAni{
  0%{
    transform: scale(1);
  }
  50%{
    transform: scale(1.2);
  }
  100%{
    transform: scale(1);
  }
}

@keyframes showPop {
  0% {
    opacity: 0;
    transform: translateY(100%) scaleY(1);
  }
  50% {
    opacity: 1;
    transform: translateY(0) scaleY(1.025);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scaleY(1);
  }
}

@keyframes hidePop {
  0% {
    opacity: 1;
    transform: translateY(0) scaleY(1);
  }
  50% {
    opacity: 1;
    transform: translateY(0) scaleY(1.025);
  }
  100% {
    opacity: 0;
    transform: translateY(100%) scaleY(1);
  }
}

@keyframes loadAni{
  0%{
    transform: rotate(0);
  }
  100%{
    transform: rotate(360deg);
  }
}

@keyframes showCard{
  0%{
    opacity: 0;
    transform: scale(1) translateY(-40px);
  }
  100%{
    opacity: 1;
    transform: scale(1) translateY(0);

  }
}

</style>
