<template>
  <div class="carlist carpage">

    <div class="car-body">
      <!-- 赛车详情 -->
      <div class="car-detail">
        <div class="btn-cancel hover" @click="pageBack"></div>
        <div class="car-box">
          <div class="btn btn-prev hover fx-vc" @click="changeCar(1)">
            <span class="icon-back"></span>
          </div>
          <div class="btn btn-next hover fx-vc" @click="changeCar(2)">
            <span class="icon-r"></span>
          </div>
          <div class="car-show">
            <div class="car-cover" >
              <img :src="curCarData.carImg" alt="">
            </div>
            <div class="car-name fx-vc">{{curCarData.carName}}</div>
            <div class="car-number fx-vc">
              <span>{{$t('cargame.twinrate')}}</span>
              <strong v-if="curCarData.winRate !== undefined">
                {{(Math.floor(curCarData.winRate * 100))}}%
              </strong>
              <strong v-else>
                --%
              </strong>
              <span class="line"></span>
              <span>{{$t('cargame.tcarodds')}}</span>
              <strong v-if="curCarData.odds !== undefined">
                {{curCarData.odds}}
              </strong>
              <strong v-else>
                --
              </strong>
            </div>
            <div class="stand"></div>

          </div>
        </div>

        <div class="car-chat" id="randarBox">
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
import Cookies from 'js-cookie'
import { triggerService } from '@/utils/statisticalTool'
// import MtPopup from '@/components/popup/index'
// import Toast from '@/components/toast/index'
import { apiGetCarDetail, apiGetCarIdList } from '@/api/cargame'
import { getParams } from '@/utils/index'
import echarts from './echart'

const QueryParams = getParams()
export default {
  name: 'CarList',
  components: {
  },
  data () {
    return {
      userId: QueryParams.userId || Cookies.get('userId'),
      carData: {},
      curCarId: 0,
      curCarIdx: 0,
      carIdList: [],
      carNumber: {},
      change: false,
      isFromH5: false,
      loading: false,
      curCarData: {},
      idMax: {
        1: 400,
        2: 160,
        3: 160,
        4: 160,
        5: 400,
        6: 160,
        7: 100
      },
      radarData: {
        radar: {
          axisName: {
            color: '#783400',
            lineHeight: 0
          },
          indicator: [
            { name: '', max: 100 },
            { name: '', max: 100 },
            { name: '', max: 100 },
            { name: '', max: 100 },
            { name: '', max: 100 },
            { name: '', max: 100 },
            { name: '', max: 100 }
          ],
          splitNumber: 5,
          splitArea: {
            show: true,
            areaStyle: {
              color: ['#E3F4D9', '#E3F4D9', '#C4F4C2', '#8CF595', '#19F53F']
            }
          },
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.5)'
            }
          }
        },
        series: [
          {
            type: 'radar',
            areaStyle: {
              color: 'rgba(186,172,255,0.8)'
            },
            lineStyle: {
              color: '#CB00FF',
              width: 1.5
            },
            symbol: 'none',
            data: [
              {
                value: [0, 0, 0, 0, 0, 0]
              }
            ]
          }
        ]
      },
      myChart: null
    }
  },
  computed: {

  },
  methods: {
    pageBack () {
      if (this.isFromH5) {
        this.$router.back()
        return
      }
      if (window.raceClient && window.raceClient.finish) {
        window.raceClient.finish()
      } else {
        this.$router.back()
      }
    },
    getCarList () {
      apiGetCarIdList().then(res => {
        if (!res || !res.length) return
        res.forEach(car => {
          this.carNumber[car.id] = null
        })
        this.carIdList = res
        this.curCarIdx = this.carIdList.indexOf(this.curCarId)
      })
    },
    getCarData () {
      if (this.carNumber[this.curCarId]) {
        this.setRadarData()
        return
      }
      this.loading = true
      apiGetCarDetail({
        carId: this.curCarId
      }).then(res => {
        this.loading = false
        if (!res) return
        const newObj = this.carNumber
        this.carNumber = null
        newObj[this.curCarId] = res
        this.carNumber = newObj
        this.setRadarData()
      })
    },
    setRadarData () {
      this.curCarData = this.carNumber[this.curCarId]
      const data = this.carNumber[this.curCarId].racingCarCircuitInfoList
      const valueArr = []
      const loadArr = [
      ]
      data.forEach(item => {
        valueArr.push(item.speed)
        loadArr.push({
          name: item.name,
          max: this.idMax[item.racingCircuitId]
        })
      })

      const newObj = this.radarData
      this.radarData = null

      newObj.series[0].data[0].value = valueArr
      newObj.radar.indicator = loadArr

      this.radarData = newObj

      this.drawIt()
    },
    initPage () {
      triggerService({ eventId: '105-13-3-0' })
      const QueryParams = getParams()
      const { carId, clickby } = QueryParams
      this.isFromH5 = clickby
      this.curCarId = +carId
      this.getCarList()
      setTimeout(() => {
        this.getCarData()
      }, 200)
    },
    changeCar (type) {
      // type 1 上一个 2下一个；
      if (this.loading) return
      if (!this.carIdList.length) return
      const len = this.carIdList.length - 1
      triggerService({ eventId: type === 1 ? '105-13-3-1' : '105-13-3-2' })

      if (type === 1) {
        if (this.curCarIdx === 0) {
          this.curCarIdx = len
        } else {
          this.curCarIdx -= 1
        }
      }

      if (type === 2) {
        if (this.curCarIdx === len) {
          this.curCarIdx = 0
        } else {
          this.curCarIdx += 1
        }
      }
      this.curCarId = this.carIdList[this.curCarIdx]
      this.getCarData()
    },
    drawIt () {
      this.myChart.setOption(this.radarData)
    }
  },
  mounted () {
    this.initPage()
    this.myChart = echarts.init(document.getElementById('randarBox'))
    this.drawIt()
  }
}
</script>
<style lang="less">
@import url("./common.less");

.car-detail{
  height:100%;
  background:url(../../assets/img/cargame/img-light.png) center -30px no-repeat;
  background-size: auto 300px;
}

.btn-cancel{
  position:absolute;
  top: 10px;
  right:10px;
  width: 26px;
  height:26px;
  background:url(../../assets/img/cargame/icon-cancel.png) center no-repeat;
  background-size: 100%;
  z-index:10;
}

.car-box{
  text-align:center;
  height: 160px;
  background: url(../../assets/img/cargame/bg-car-stand.png) center 70px no-repeat;
  background-size: 160px auto;
  position:relative;
  .btn{
    position:absolute;
    width:26px;
    height:26px;
    top:70px;

    & > *{
      width:26px;
      height:24px;
      background:url(../../assets/img/cargame/icon-back.png) center no-repeat;
      background-size:auto 100%;

      &.icon-r{
        background-image:url(../../assets/img/cargame/icon-right.png)
      }
    }
    &.btn-prev{
      left:12px;
    }
    &.btn-next{
      right:12px;
    }
  }
  .car-show{

    .car-cover{
      position:absolute;
      left:50%;
      margin-left: -90px;
      top: 0;
      height: 100px;
      width:180px;
      &.show{
        animation: showcar .2s both;

      }
      img{
        width: 140px;
      }
    }
    .car-name{
      position:absolute;
      width:100%;
      height:30px;
      left:0;
      top: 105px;
      background:url(../../assets/img/cargame/title-bg-2.png) center no-repeat;
      background-size:auto 90%;
      color:#fff;
      font-weight:bold;
      font-size:14px;
    }
    .car-number{
      position:absolute;
      width:100%;
      left:0;
      top: 138px;
      strong{
        margin:0 8px;
        font-size:16px;
        font-style: italic;
      }

      .line{
        height: 10px;
        width:1px;
        overflow:hidden;
        background:#873A00;
        margin-right:10px;
      }
    }

  }

}

.car-chat{
  width:100%;
  margin:0 auto;
  height: 250px;
}

</style>
