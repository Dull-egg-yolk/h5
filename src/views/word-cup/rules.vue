<template>
    <div :class="['rules-page', showFlip && 'horizontal-flip']">
        <div class="rule-title">
            {{ $t('worldCup.footballFans.rules.title') }}
        </div>
        <div class="rule-box">
            <dl
                v-for="(item, idx) in $t('worldCup.footballFans.rules.content')"
                :key="idx"
            >
                <dt>{{ item.title }}</dt>
                <dd v-for="(con, i) in item.content" :key="i" ><div :class="[idx == 2 && i > 0 && i< 6 ? 'red': '']" v-html="con">
                </div></dd>
            </dl>
            <ul class="video-list" ref="goddessList">
                <li class="ogoddess" v-for="(item, i) in listData" :data-pic="item.videoPic" :key="item.id" @click="playVideo(item, i)">
                    <div class="img-box">
                        <img :src="item.videoPic" alt="">
                        <img src="~@/assets/img/story/play.png" class="play-video" :id="item.userId" alt="" />
                    </div>
                </li>
            </ul>
            <dl>
              <dt>{{$t('worldCup.footballFans.rules.content')[4].title}}</dt>
            </dl>
        </div>
         <div class="bottom-btn">
          <span @click="toProfile">{{$t('worldCup.footballFans.rules.participate')}}</span>
        </div>
        <videos v-if="showHostView" :list="listData" :curHostIndex="curHostIndex" @close="showHostView = false"/>
    </div>
</template>
<script type="text/babel">
import Videos from '@/views/components/videos/index2'
import { worldCupIsFlipContry } from '@/utils/index'
export default {
  name: 'WorldCupRules',
  components: { Videos },
  data () {
    return {
      showHostView: false,
      curHostIndex: 0,
      listData: [
        {
          id: 0,
          videoPic: 'https://h5.livuchat.com/staticProd/worldCup/videos/PH 4248747238.jpg',
          videoUrls: ['https://h5.livuchat.com/staticProd/worldCup/videos/PH 4248747238.mp4']
        },
        {
          id: 1,
          videoPic: 'https://h5.livuchat.com/staticProd/worldCup/videos/UA_20220920_160112.jpg',
          videoUrls: ['https://h5.livuchat.com/staticProd/worldCup/videos/UA_20220920_160112.mp4']
        },
        {
          id: 2,
          videoPic: 'https://h5.livuchat.com/staticProd/worldCup/videos/AR 4247977797.png',
          videoUrls: ['https://h5.livuchat.com/staticProd/worldCup/videos/AR 4247977797.mp4']
        },
        {
          id: 3,
          videoPic: 'https://h5.livuchat.com/staticProd/worldCup/videos/CO 4266864405.jpg',
          videoUrls: ['https://h5.livuchat.com/staticProd/worldCup/videos/CO 4266864405.mp4']
        },
        {
          id: 4,
          videoPic: 'https://h5.livuchat.com/staticProd/worldCup/videos/Brazil 2.jpg',
          videoUrls: ['https://h5.livuchat.com/staticProd/worldCup/videos/Brazil 2.mp4']
        },
        {
          id: 5,
          videoPic: 'https://h5.livuchat.com/staticProd/worldCup/videos/Brazil 1_720.jpg',
          videoUrls: ['https://h5.livuchat.com/staticProd/worldCup/videos/Brazil 1_720.mp4']
        }
      ],
      showFlip: false
    }
  },
  methods: {
    toProfile () {
      const userIndex = 'profile/profileEdit'
      const src = this.$deepLink + userIndex

      console.log('用户主页', src)
      window.location.href = src
    },
    playVideo (item, index) {
      console.log('-------pp')
      this.showHostView = true
      this.curHostIndex = index
    }
  },
  mounted () {
    this.showFlip = worldCupIsFlipContry(this.$i18n.locale)
  },
  created () {}
}
</script>
<style lang="less" scope>
@import url("./goddessWall.less");
.rules-page {
    position: relative;
    color: #fff;
    min-height: 100vh;
    width: 100%;
    background:#0a070f  url(../../assets/img/worldCup/god-bg.jpg) no-repeat top left;
    background-size: 100%;
    padding-bottom: 60px;
    .rule-title {
        padding-top: 3.6rem;
        text-align: center;
        line-height: 40px;
        font-size: 18px;
        font-weight: 600;
    }

    .rule-box {
        padding: 0 17px 22px;
        font-size: 14px;
        line-height: 22px;
        .span-color {
          color: red;
        }
        dl:nth-child(5) {
          display: none;
        }
        dl:last-child {
          margin-top: 15px;
        }
        .video-list {
            margin: 0;
            .play-video {
                display: inline-block;
                top: 50%;
                width: 41px;
                height: 41px;
                transform: translate(-50%, -50%);
            }
        }
    }

    dl {
        margin-bottom: 15px;
        background: #fff;
        color: #000;
        padding: 0.3rem;
        border-radius: 0.3rem;
        .red {
          color: red;
        }
        &:first-child {
          dt {

          }
          text-align: center;
        }
        dt {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
        }
    }

    &.horizontal-flip {
       dl:nth-child(n+2) {
         text-align: right;
       }
    }
}
.bottom-btn {
    position: fixed;
    bottom: 1rem;
    left: 0;
    z-index: 1000;
    width: 100%;
    text-align: center;
    span {
        display: inline-block;
        width: 251px;
        height: 50px;
        line-height: 50px;
        background: url(../../assets/img/worldCup/open-gift-btn-bg.png);
        background-repeat: no-repeat;
        background-size: 100% auto;
        font-size: 17px;
        color: #fff;
    }
}
</style>
