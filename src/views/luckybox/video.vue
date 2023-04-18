<template>
  <div class="page-loadmore">
    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ 'height': wrapperHeight + 'px' }">
      <div class="top-info">
        <div class="rules-btn" @click="openRule" v-if="isHost">{{ $t('worldCup.footballFans.rules.ruleBtn') }}</div>
        <div class="title">{{ $t('christmas2022.girl') }}</div>
      </div>
      <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange"
        ref="loadmore" :topDistance="50">
        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
          <mt-spinner v-show="topStatus === 'loading'" type="fading-circle" color="#a425ff">loading</mt-spinner>
        </div>
        <!-- 视频列表 -->
        <div class="video-box" v-infinite-scroll="loadMore" infinite-scroll-immediate-check="immediateCheck"
          infinite-scroll-disabled="loading" infinite-scroll-distance="10">
          <ul class="video-list" ref="goddessList">
            <li class="ogoddess" v-for="(item, i) in listData" :data-uid="item.userId" :data-pic="item.videoPic" :key="item.userId" @click="playVideo(item, i)">
              <div class="img-box">
                <img :src="item.videoPic" alt="">
                <img src="~@/assets/img/story/play.png" class="play-video" :id="item.userId" alt="" />
              </div>
              <div class="god-name"> {{ item.userName }} </div>
              <div class="detail fx-be-vc">
                <country :countryId="item.countryId"></country>
                <div class="status-txt-tag" :class="userStatus[item.onlineState]">{{ userStatus[item.onlineState] }}</div>
              </div>
              <div class="ico-call fx-ic" @click.stop="callGod(item)"><span class="icon-video2"></span></div>
            </li>
          </ul>
        </div>
        <div v-show="!loading" class="page-loading">
          <mt-spinner type="fading-circle" color="#a425ff"></mt-spinner>
        </div>
      </mt-loadmore>
    </div>
    <videos v-if="showHostView" :list="listData" :curHostIndex="curHostIndex" :sortTypeName="groupName"
      @close="getStatus" @chatClick="callGod"/>
    <div v-if="showHostView" class="close" @click="closeVideos"></div>
    <mt-popup v-model="isShowRules" class="rc-popup-box" :lockScroll="true" position="center">
      <div class="rules">
        <div class="rule-title"> {{ $t("worldCup.footballFans.rules.title") }} <span class="back-btn"
            @click="closeRule">X</span></div>
        <div class="rule-box">
          <dl v-for='(item, idx) in $t("worldCup.footballFans.rules.content")' :key="idx">
            <dt>{{ item.title }}</dt>
            <dd v-for="(con, i) in item.content" :key="i">{{ con }}</dd>
          </dl>
        </div>
      </div>
    </mt-popup>
    <mt-popup v-model="isShowProtocol" class="rc-popup-box" :closeOnClickModal="false" :lockScroll="true" position="center">
      <div class="protocol-box">
        <div class="rule-title"><span class="back-btn" @click="closeProtocol"><i class="icon-close"></i></span></div>
        <div class="protocol-con">
          <p>{{ $t("worldCup.footballFans.protocol") }}</p>
        </div>
        <div class="protocol-btn">
          <span @click="agreeProtocol">{{ $t("worldCup.footballFans.agreeBtn") }}</span>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script type="text/babel">
import debounce from 'lodash/debounce'
import Cookies from 'js-cookie'
import { triggerService } from '@/utils/statisticalTool'
import { getParams } from '@/utils/index'
import MtPopup from '@/components/popup/index'
import Country from '@/views/components/country'
import Videos from '@/views/components/videos'
import { getFootballFansUsers, getOnlineStatus } from '@/api/worldCup'
import { checkHostrelation } from '@/api/index'

const QueryParams = getParams()

export default {
  name: 'WorldCup',
  components: { MtPopup, Videos, Country },
  data () {
    return {
      topStatus: '',
      wrapperHeight: 0,
      loading: false,
      allLoaded: false,
      immediateCheck: false,
      isShowRules: false,
      userId: Cookies.get('userId') || '',
      listData: [],
      groupName: '',
      isHost: false,
      showHostView: false,
      isShowProtocol: false,
      curHostIndex: 0,
      userStatus: {
        0: 'offline',
        1: 'busy',
        2: 'online',
        3: 'invsible'
      },
      query: {
        page: 1,
        pageSize: 12
      },
      inViewUid: [],
      inViewIdx: [],
      inViewPic: [],
      statusTime: null,
      reportUsers: new Set()
    }
  },
  methods: {
    handleTopChange (status) {
      this.topStatus = status
    },
    loadTop () {
      console.log('---loadTop-000-----')
      this.getFootballUsers(false)
      this.$refs.loadmore.onTopLoaded()
    },
    loadMore () {
      console.log('---loadMore-111-----')
      if (this.loading) return
      this.loading = true
      this.getFootballUsers(true)
    },
    closeVideos () {
      this.showHostView = false
    },
    playVideo (item, index) {
      this.showHostView = true
      this.curHostIndex = index
      triggerService({ eventId: '105-10-2-3', targetUserId: item.userId, freeName1: item.videoPic }) // 图片点击
    },
    callGod (item) {
      console.log(item)
      const hostId = item.userId
      if (!hostId) return

      triggerService({ eventId: '105-10-2-4', targetUserId: item.userId, freeName1: item.videoPic }) // call点击
      checkHostrelation({ friendUserId: hostId }).then(res => {
        const videoUrl = 'videoCall/'
        // 判断好友关系 relation 1.单向好友，2 双向好友 3.对方和我是好友，4不是好友
        const call = res.relation === 2 ? 'friendCall/' : 'goddessWall/'
        const src = this.$deepLink + videoUrl + call + hostId
        console.log('视频呼叫', src)
        window.location.href = src
      })
    },
    closeRule () {
      this.isShowRules = false
    },
    closeProtocol () {
      this.isShowProtocol = false
      history.back()
    },
    agreeProtocol () {
      this.isShowProtocol = false
      localStorage.setItem('world_cup_agree_protocol', true)
    },
    openRule () {
      this.$router.push({ name: 'ChristmasActivities', query: QueryParams })
    },
    getFootballUsers (isLoad) {
      if (!isLoad) {
        this.listData = []
      }
      const params = {
        pagingRequired: isLoad ? 1 : 0,
        pageSize: isLoad ? 6 : this.query.pageSize,
        userId: this.userId
      }
      getFootballFansUsers(params).then(res => {
        const list = res.footBallFansHostRespList
        this.isHost = res.isHost
        // if (this.isHost) {
        //   const isAgree = localStorage.getItem('world_cup_agree_protocol') || false
        //   this.isShowProtocol = !isAgree
        // }
        console.log(this.listData.length, '------this.listData.length---')
        if (!list || list.length === 0) {
          this.allLoaded = true
          this.loading = true
          return
        }
        this.listData.push(...list)
        if (!isLoad) {
          this.$nextTick(() => {
            this.getInViewUid()
            this.pollCheckStatus()
          })
        }

        this.loading = false
      })
    },

    /**
     * 获取可视区域内的女神用户uid
     * 用作轮询用户在线状态的参数
     */
    getInViewUid () {
      if (!this.$refs.goddessList) return
      if (!this.listData.length) return
      const goddessList = this.$refs.goddessList.querySelectorAll('.ogoddess')
      this.inViewUid = []
      this.inViewIdx = []
      this.inViewPic = []

      const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

      goddessList.forEach((item, index) => {
        const { top } = item.getBoundingClientRect()
        if (top >= 0 && top < viewPortHeight) {
          const uid = item.getAttribute('data-uid')
          const pic = item.getAttribute('data-pic')
          if (!uid) return
          console.log(index, uid, '----index, uid,------')
          this.inViewIdx.push(index)
          this.inViewUid.push(uid)
          this.inViewPic.push(pic)
        }
      })
      this.reportShowUsers()
    },
    reportShowUsers () {
      const users = []
      this.inViewUid.forEach((item, index) => {
        if (!this.reportUsers.has(item)) {
          this.reportUsers.add(item)
          const obj = {
            id: item,
            pic: this.inViewPic[index]
          }
          users.push(obj)
        }
      })
      console.log('----re----', users)
      if (users.length < 1) return
      triggerService({ eventId: '105-10-2-2', freeName1: JSON.stringify(users) }) // 主播曝光 free_name1:json数组记录主播id和封面url
    },
    pollCheckStatus () {
      clearTimeout(this.statusTime)
      console.log('---女神墙的轮询-----')
      this.statusTime = setTimeout(() => {
        if (this.inViewUid.length < 1) return
        const params = {
          userIdList: this.inViewUid
        }
        getOnlineStatus(params).then(res => {
          console.log(res, '----女神墙状态-----')
          if (res && res.length) {
            this.inViewIdx.forEach((v, i) => {
              if (this.listData[v]) {
                this.listData[v].onlineState = res[i]
              }
            })
          }
          this.pollCheckStatus()
        })
      }, 4 * 1000)
    }

  },
  mounted () {
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
    const con = this.$refs.wrapper
    const handleResize = debounce((event) => {
      this.getInViewUid()
    }, 1500)
    con.addEventListener('scroll', handleResize)
  },
  created () {
    triggerService({ eventId: '105-10-2-1', freeName1: this.$route.name }) // 足球宝贝页面曝光
    this.getFootballUsers()
  },
  watch: {
  },
  beforeDestroy () {
    clearTimeout(this.statusTime)
    this.statusTime = null
  }
}
</script>
<style lang="less" scope>
@import url("./style/video.less");
</style>
