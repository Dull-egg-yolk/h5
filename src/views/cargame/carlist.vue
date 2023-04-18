<template>
  <div class="carlist carpage">
    <div class="car-title fx-vb">
      <div class="btn hover btn-back fx-vc" @click="pageBack">
        <span class="icon-back"></span>
      </div>
      <div class="ct-main fx-vc">
        {{$t('cargame.tcar')}}
      </div>
      <div class="btn btn-right"></div>
    </div>

    <div class="car-body">
      <!-- 赛车列表 -->
      <div class="the-clist">
        <div class="ocar hover" v-for="(car) of carList" :key="car.id" @click="seeCar(car.id)">
          <div class="cover">
            <img :src="car.img" alt="">
          </div>
          <div class="c2">
            <img :src="car.img" alt="">
          </div>
          <div class="car-name">{{car.name}}</div>
          <div class="num-box fx-vc">
            <div class="n1">{{(Math.floor(car.winRate * 100))}}%</div>
            <div class="n2">{{car.odds}}</div>
          </div>
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
import { apiGetCarList } from '@/api/cargame'
import { getParams } from '@/utils/index'

const QueryParams = getParams()
export default {
  name: 'CarList',
  components: {
  },
  data () {
    return {
      userId: QueryParams.userId || Cookies.get('userId'),
      carList: []
    }
  },
  methods: {
    pageBack () {
      if (window.raceClient && window.raceClient.finish) {
        window.raceClient.finish()
      } else {
        this.$router.back()
      }
    },
    getCarData () {
      apiGetCarList().then(res => {
        if (res && res.length) {
          this.carList = res
        }
      })
    },
    seeCar (id) {
      triggerService({ eventId: '105-13-2-1' })
      const query = Object.assign({}, QueryParams, { carId: id, clickby: 'h5' })
      console.log(id, query)
      this.$router.push({ name: 'CarDetail', query })
    }
  },
  mounted () {
    triggerService({ eventId: '105-13-2-0' })
    this.getCarData()
  }
}
</script>
<style lang="less">
@import url("./common.less");

.the-clist{
  display:flex;
  flex-wrap: wrap;
  padding:10px 17px;
  .ocar{
    width:108px;
    height:108px;
    background:#fff;
    border-radius: 8px;
    margin-right:8px;
    margin-bottom: 20px;
    position: relative;
    animation: showItem .3s  linear;

    &::after{
      content:'';
      position:absolute;
      left:-1px;
      right:-1px;
      top:0;
      bottom:-1px;
      z-index:4;
      border-radius: 8px;
      background: linear-gradient(180deg, rgba(255,255,255,0) 20%, #FFC200 80%);;
    }
    &:nth-child(3n) {
      margin-right:0;
    }

    .cover{
      position:absolute;
      width:90%;
      z-index:6;
      left:5%;
      top:0;
      img{
        width:100%;
      }
    }

    .c2{
      position:absolute;
      width:90%;
      z-index:2;
      left:5%;
      bottom: 66px;
      transform-origin: center bottom;
      transform: scaleY(-1);
      opacity: .6;
      filter: blur(1px);
      img{
        width:100%;
      }
    }

    .car-name{
      position: absolute;
      bottom: 22px;
      width:100%;
      left:0;
      z-index:8;
      text-align: center;
      color:#000;
      font-weight: bold;
    }

    .num-box{
      position:absolute;
      z-index:10;
      width:86px;
      height:25px;
      background:url(../../assets/img/cargame/num-bg.png) center no-repeat;
      background-size: auto 100%;
      bottom: -10px;
      left:50%;
      margin-left: -43px;
      & > * {
        width:42%;
        text-align:center;
      }
      .n2{
        color:#fff;
      }
    }

  }
}

</style>
