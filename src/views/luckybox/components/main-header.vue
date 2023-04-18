<template>
  <div>
    <div class="top">
        <div class="avatar" v-if="selfInfo" >
          <div>
            <img :src="selfInfo.headImg"  onerror="javascript:this.src='https://h5.livuchat.com/staticProd/worldCup/img/user.png'" />
          </div>
          <div class="coin" @click="goPayment">{{ selfInfo.balance }}</div>
          <div class="gifts" @click="goBackPack">{{ selfInfo.giftBalance || 0 }}</div>
        </div>
        <div class="right" v-if="isLoad">
          <div class="rank" @click="goRank">
            Win 500,000
          </div>
          <div class="rule-open" @click="openRule"></div>
        </div>
      </div>
      <div class="bullet-screen" v-if="barrageList.length > 0">
        <vue-danmaku ref="danmaku"
        v-model="barrageList"
        style="height:40px; width:100%;"
        use-slot
        :speeds="70"
        :randomChannel="true"
        @play-end="loadData"
        :channels="1">
          <template slot="dm" slot-scope="{ index, danmu }">
            <div v-if="danmu" :class="['item', danmu && ((danmu.prizeType === 2 && danmu.logicalGoodsName === 'cup') ||(danmu.prizeType === 4 && danmu.goldNum >=500) || (danmu.prizeType === 1 && danmu.goldReturnRate >5) )? 'sepcial': '']" :key="index">
              <img class="box-img" :src="lotteryDict[danmu.lotteryId]"/>
              <span class="user-name">{{ danmu.userName }} </span>
              <div class="danmu-gift" v-if="danmu && danmu.prizeType === 1">
                  <i :class="['coins']">{{danmu.goldNum}}</i>
              </div>
              <div class="danmu-gift" v-if="danmu && danmu.prizeType === 2">
                  <span :class="[danmu.logicalGoodsName, 'gift-img']">
                    <img src="https://h5.livuchat.com/staticProd/20230109_luckybox/gift/ssss.png" alt="" v-if="danmu.logicalGoodsName === 'cup'"/>
                    <!-- <img src="https://h5.livuchat.com/staticProd/2022_christmas/img/danmu/danmu-football2.png" alt="" v-if="danmu.logicalGoodsName === 'football'"/> -->
                  </span>
              </div>
              <div class="danmu-gift" v-if="danmu && danmu.prizeType === 4">
                  <span :class="[danmu.logicalGoodsName, 'gift-img']">
                    <img :src="goodsDictMap[danmu.goodsId]" alt=""  v-if="danmu.logicalGoodsName !== 'cup'"/>
                  </span>
              </div>
            </div>
          </template>
        </vue-danmaku>
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
    goodsDictMap: {
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
    goBackPack () {
      this.$emit('goBackPack')
    },
    loadData (index) {
      this.$nextTick(() => {
        this.$refs.danmaku && this.$refs.danmaku.stop()
      })
      getBarrage({ ...this.commonParams, noLoading: 1 }).then(res => {
        if (res) {
          this.barrageList = this.shuffle([...res])
          this.$nextTick(() => {
            this.$refs.danmaku && this.$refs.danmaku.play()
          })
        }
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
  @import  url('../style/main-header.less');
</style>
