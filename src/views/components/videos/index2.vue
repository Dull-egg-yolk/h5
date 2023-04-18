<template>
  <div class="page-videos">
    <div class="swiper" id="verticalSwiper">
      <div class="swiper-wrapper" ref="swiper">
        <div class="swiper-slide" v-if="infos[0]">
          <div class="seeImg-content">
            <div class="cover">
              <div class="icon-load" v-if="showLoad">
                <span class="icon"></span>
              </div>
              <video :src="infos[0].videoUrls[currVideoIndex]" :poster="infos[0].videoPic || infos[0].headImg"
                webkit-playsinline="true" playsinline="true" loop :id="'videoPlayer' + infos[0].id"></video>
            </div>
          </div>
        </div>
        <div class="swiper-slide" v-if="infos[1]">
          <div class="seeImg-content">
            <div class="cover">
              <div class="icon-load" v-if="showLoad">
                <span class="icon"></span>
              </div>
              <video :src="infos[1].videoUrls[currVideoIndex]" :poster="infos[1].videoPic || infos[1].headImg"
                webkit-playsinline="true" playsinline="true" loop :id="'videoPlayer' + infos[1].id"></video>
            </div>
          </div>
        </div>
        <div class="swiper-slide" v-if="infos[2]">
          <div class="seeImg-content">
            <div class="cover">
              <div class="icon-load" v-if="showLoad">
                <span class="icon"></span>
              </div>
              <video :src="infos[2].videoUrls[currVideoIndex]" :poster="infos[2].videoPic || infos[2].headImg"
                webkit-playsinline="true" playsinline="true" loop :id="'videoPlayer' + infos[2].id"></video>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="close" @click="closeVideos"></div>
  </div>
</template>
<script type="text/babel">
import Swiper from 'swiper'

export default {
  components: { },
  props: {
    list: {
      type: Array,
      require: true
    },
    curHostIndex: {
      type: Number,
      require: true
    },
    sortTypeName: String,
    isProfile: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data () {
    return {
      stateCode: {},
      isFav: false,
      showLoad: true,
      infos: [],
      activeIndex: 0, // 数据index
      swiperIndex: 0, // swiperid
      reportVideo: null,
      showReport: false,
      swiper: null,
      videoPlayer: null,
      num: 0,
      userStatus: {
        0: 'offline',
        1: 'busy',
        2: 'online',
        3: 'invsible'
      },
      currVideoIndex: 0 // 左右切换
    }
  },
  methods: {
    closeVideos () {
      this.$emit('close')
    },
    changeVideo (item, val) {
      const len = item.videoUrls.length
      const ind = this.currVideoIndex + val
      if (ind >= 0 && ind <= len - 1) {
        this.currVideoIndex = ind
        this.playerListener(item, 'one')
      } else {
        console.log('----到头了---')
      }
    },
    playerListener (item, type) {
      if (!item.videoUrls[this.currVideoIndex]) {
        this.showLoad = false
      } else {
        this.showLoad = true
      }

      this.videoPlayer = document.getElementById(
        `videoPlayer${item.id}`
      )

      if (this.videoPlayer) {
        this.videoPlayer.src = item.videoUrls[this.currVideoIndex]
      }
      if (!this.videoPlayer || !this.videoPlayer.src) return
      this.videoPlayer.removeEventListener('playing', this.hideLoad)
      this.playing = false
      this.videoPlayer.addEventListener('playing', this.hideLoad)
      this.videoPlayer.pause()
      setTimeout(() => {
        this.videoPlayer.play()
      }, 100)
      this.videoPlayer &&
        this.videoPlayer.addEventListener('canplay', () => {
          this.num++
        })
    },
    init () {
      const that = this
      // eslint-disable
      this.swiper = new Swiper('#verticalSwiper', {
        allowTouchMove: true,
        loop: false, // 循环模式选项
        direction: 'vertical', // 垂直切换选项
        observer: true, // 动态监听
        mousewheel: true, // 鼠标滚轮事件
        on: {
          init: function () {
            that.swiperIndex = this.activeIndex
            if (
              that.activeIndex !== 0 &&
              that.activeIndex !== that.list.length - 1
            ) {
              this.slideTo(1, 0, false)
              that.swiperIndex = 1
            } else if (that.activeIndex === that.list.length - 1) {
              this.slideTo(that.activeIndex, 0, false)
              that.swiperIndex = that.infos.length - 1
            }
            setTimeout(() => {
              that.playerListener(that.list[that.activeIndex])
            })
          },
          slideChangeTransitionEnd: function (swiper) {
            that.currVideoIndex = 0
            if (that.videoPlayer) {
              that.videoPlayer.pause()
              that.videoPlayer = null
            }
            if (this.activeIndex > that.swiperIndex) {
              console.log('---11111---')
              that.activeIndex += 1
              that.swiperIndex = this.activeIndex
              that.getInfo()
              if (that.activeIndex !== that.list.length - 1) {
                this.slideTo(1, 0, false)
                that.swiperIndex = 1
              }
            } else if (this.activeIndex < that.swiperIndex) {
              console.log('---2222---')
              that.activeIndex -= 1
              that.swiperIndex = this.activeIndex
              that.getInfo()
              if (that.activeIndex !== 0) {
                this.slideTo(1, 0, false)
                that.swiperIndex = 1
              }
            }

            that.$nextTick(() => {
              that.playerListener(that.infos[that.swiperIndex])
            })
          }
        }
      })
    },
    switchHost (type) {
      if (type === 'prv') {
        this.swiper.slidePrev(500, true)
      } else {
        this.swiper.slideNext(500, true)
      }
    },
    getInfo () {
      if (this.list.length > 3) {
        let indexs = []
        if (this.activeIndex === 0) {
          // 第一项
          indexs = [0, 1, 2]
        } else if (this.activeIndex === this.list.length - 1) {
          // 最后一项
          indexs = [
            this.activeIndex - 2,
            this.activeIndex - 1,
            this.activeIndex
          ]
        } else {
          // 中间的
          indexs = [
            this.activeIndex - 1,
            this.activeIndex,
            this.activeIndex + 1
          ]
        }
        this.infos = this.list.filter((item, index) => {
          return indexs.includes(index)
        })
      } else {
        this.infos = this.list
      }
    },
    hideLoad () {
      this.showLoad = false
      this.playing = true
    }
  },
  mounted () {
    this.activeIndex = this.curHostIndex
    this.getInfo()
    this.$nextTick(() => {
      this.init()
    })
  },
  created () { },
  beforeDestroy () {
    if (this.videoPlayer) {
      this.videoPlayer.pause()
      this.videoPlayer = null
    }
  }
}
</script>
<style lang="less" scope>
@import url('./videos.less');
.page-videos {
  position: fixed;
  bottom: 0;
  right: 0;
}
.rules-page {
  .page-videos {
    position: fixed;
    bottom: 0;
    right: 0;
  }
}
</style>
