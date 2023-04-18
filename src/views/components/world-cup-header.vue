<template>
  <div>
    <div class="top">
        <div class="avatar" v-if="selfInfo" @click="goPayment">
          <div>
            <img :src="selfInfo.headImg"  onerror="javascript:this.src='https://h5.livuchat.com/staticProd/worldCup/img/user.png'" />
          </div>
          <div class="coin">{{ selfInfo.balance }}</div>
        </div>
        <div class="right" v-if="isLoad">
          <div class="rank" @click="goRank">
            {{ $t('worldCup.rank') }}
          </div>
          <div class="rule-open" @click="openRule"></div>
        </div>
      </div>
      <div class="bullet-screen" v-if="barrageList.length > 0">
        <vue-danmaku ref="danmaku"
        v-model="barrageList"
        style="height:80px; width:100%;"
        use-slot
        :speeds="70"
        :randomChannel="true"
        @play-end="loadData"
        :channels="2">
          <template slot="dm" slot-scope="{ index, danmu }">
            <div v-if="danmu" :class="['item', danmu && (danmu.prizeType === 2 || danmu.goldReturnRate >=10 )? 'sepcial': '']" :key="index">
              <img :src="lotteryDict[danmu.lotteryId]"/>
              <span class="user-name">{{ danmu.userName }} </span>
              <div class="danmu-gift" v-if="danmu && danmu.prizeType === 1">
                  <i :class="['coins']">{{danmu.goldNum}}</i>
              </div>
              <div class="danmu-gift" v-if="danmu && danmu.prizeType === 2">
                  <span :class="[danmu.logicalGoodsName]"></span>
              </div>
            </div>
          </template>
        </vue-danmaku>
      </div>
      <h4 class="title">{{ $t('worldCup.subTitle') }}</h4>
      <div class="free-tips" v-if="isLoad && collectionInfo">
        <span>{{ $t('worldCup.treasureChest.alreadySets', {gatheredUserCount:collectionInfo.gatheredUserCount, gatheredPvCount: collectionInfo.gatheredPvCount})}}</span>
      </div>
  </div>
</template>
<script>
import vueDanmaku from 'vue-danmaku'
import { getBarrage } from '@/api/worldCup'
import { worldCupIsFlipContry, getWorldCupParams } from '@/utils/index'
export default {
  name: 'WorldCupHeader',
  data () {
    return {
      barrageList: [],
      showFlip: false,
      commonParams: {}
    }
  },
  components: {
    vueDanmaku
  },
  props: {
    selfInfo: {
      type: Object
    },
    // commonParams: {
    //   type: Object
    // },
    isLoad: {
      type: Boolean,
      default: false
    },
    lotteryDict: {
      type: Object
    },
    collectionInfo: {
      type: Object
    },
    goodsSpecialEffect: {
      type: Object
    },
    addDanMuData: {
      type: Array
    }
  },
  methods: {
    goPayment () {
      this.$emit('goPayment')
    },
    goRank () {
      this.$emit('goRank')
    },
    loadData (index) {
      this.$nextTick(() => {
        this.$refs.danmaku && this.$refs.danmaku.stop()
      })
      getBarrage({ ...this.commonParams, noLoading: 1 }).then(res => {
        this.barrageList = this.shuffle([...res])
        this.$nextTick(() => {
          this.$refs.danmaku && this.$refs.danmaku.play()
        })
      })
    },
    openRule () {
      this.$emit('openRule')
    },
    shuffle (arr) {
      var len = arr.length
      for (var i = 0; i < len - 1; i++) {
        var index = parseInt(Math.random() * (len - i))
        var temp = arr[index]
        arr[index] = arr[len - i - 1]
        arr[len - i - 1] = temp
      }
      return arr
    }
  },
  mounted () {
    this.commonParams = getWorldCupParams()
    this.loadData()
    this.showFlip = worldCupIsFlipContry(this.$i18n.locale)
  },
  watch: {
    addDanMuData: {
      immediate: true,
      handler (val) {
        if (this.$refs.danmaku && val) {
          val.forEach(item => {
            this.$refs.danmaku.add({ ...item })
          })
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
.bullet-screen {
  height: 80px;
  width: 100%;
  position: absolute;
  top: 50px;
  left: 0px;
  // .dm:nth-child(3n) {
  //   .item {
  //     margin-right: 40px;
  //   }
  // }
  >div {
    position: relative;
    height: 40px;
    width: 100%;
    overflow: hidden;
    .item {
      width: 160PX;
      font-size: 12px;
      background: url(../../assets/img/worldCup/danmu-bg1.png) no-repeat left top;
      background-size: 100%;
      &.sepcial{
        background: url(../../assets/img/worldCup/danmu-bg2.png) no-repeat left top;
        background-size: 100%;
        .danmu-gift .coins {
            background: url(../../assets/img/worldCup/danmu-coins.png) no-repeat right 45%;
            background-size: 26PX;
            padding-right: 28PX;
        }
      }
      position: relative;
      display: flex;
      justify-content: flex-start;
      span {
        display: inline-block;
        height: 36PX;
        line-height: 32PX;
      }
      img {
        display: inline-block;
        width: auto;
        position: absolute;
        left: -12PX;
        top: -2PX;
        height: 45PX;
      }
      .user-name {
        display: inline-block;
        padding-left: 32PX;
        font-weight: bold;
      }
      .danmu-gift {
        position: absolute;
        display: inline-block;
        right: 4PX;
        height: 34PX;
        line-height: 34PX;
        display: flex;
        justify-content: center;
        align-content: center;
        .cup {
          display: inline-block;
          width: 50PX;
          height: 50PX;
          position: relative;
          top: -10PX;
          right: -6PX;
          background: url(../../assets/img/worldCup/danmu-cup.png) no-repeat left top;
          background-size: 100%;
        }
        .football {
          display: inline-block;
          width: 24PX;
          height: 24PX;
          top: 4PX;
          position: relative;
          background: url(../../assets/img/worldCup/danmu-football2.png) no-repeat center;
          background-size: 100%;
        }
        .shirt {
          display: inline-block;
          width: 26PX;
          height: 26PX;
          background: url(https://h5.livuchat.com/staticProd/worldCup/img/gift/shirt.png) no-repeat center;
          background-size: 100%;
        }
        .shorts {
          display: inline-block;
          width: 26PX;
          height: 26PX;
          background: url(https://h5.livuchat.com/staticProd/worldCup/img/gift/shorts.png) no-repeat center;
          background-size: 100%;
        }
        .sock {
          display: inline-block;
          width: 26PX;
          height: 26PX;
          background: url(https://h5.livuchat.com/staticProd/worldCup/img/gift/sock.png) no-repeat center;
          background-size: 100%;
        }
        .sneakers {
          display: inline-block;
          width: 26PX;
          height: 26PX;
          background: url(https://h5.livuchat.com/staticProd/worldCup/img/gift/sneakers.png) no-repeat center;
          background-size: 100%;
        }
        .coins{
          display: inline-block;
          background: url(../../assets/img/worldCup/icon.png) no-repeat right 45%;
          background-size: 18PX;
          padding-right: 20PX;

        }
      }
    }
  }
}
.top{
      height: 60px;
      padding:0px 13px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      .avatar{
          display: inline-block;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          height: 30px;
          line-height: 30px;
          background-color: rgba(0, 0, 0, 0.7);
          border-radius: 16px;
          img{
              display: inline-block;
              height: 30px;
              width: 30px;
              border-radius: 16px;
              margin-right: 16px;
          }
          .coin{
              color: #ffea25;
              font-size: 14px;
              &::after {
                  content: '';
                  display: inline-block;
                  height: 30px;
                  width: 30px;
                  float: right;
                  margin-left: 6px;
                  background: url(../../assets/img/worldCup/icon.png) no-repeat left 45%;
                  background-size: 60%;
              }
          }
      }
      .right{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          .rank{
              display: inline-block;
              height: 30px;
              line-height: 30px;
              background-color: rgba(0, 0, 0, 0.7);
              border-radius: 16px;
              padding: 0 10px;
              cursor: pointer;
              &::after {
                  content: '';
                  display: inline-block;
                  height: 30px;
                  width: 20px;
                  margin-left: 0.1rem;
                  float: right;
                  background: url(../../assets/img/worldCup/rank.png) no-repeat;
                  background-position: center;
                  background-size: 80%;
              }
          }
          .rule-open{
              display: inline-block;
              height: 30px;
              width: 30px;
              margin-left: 4px;
              background: url(../../assets/img/worldCup/help.png) no-repeat;
              background-size: 80%;
              background-position: center;
              border-radius: 16px;
          }
      }
}
h4 {
    height: 12px;
    text-align: center;
    font-size: 26px;
    margin-top: 3.57rem;
    color: #fff;
    font-weight: bold;
}

  .free-tips {
      margin: 30px 16px 0px;
      height: 26px;
      line-height: 26px;
      color: #fff;
      text-align: center;
      background: linear-gradient(270deg, rgba(165,0,95,0) 0%, #B30068 49%, rgba(165,0,95,0) 100%);
  }
[lang="ar"],
[lang="he"],
[lang="ur"] {
    direction: rtl;
    .free-tips {
      span {
        direction: rtl;
        display: inline-block;
      }
    }
}
</style>
