<template>
  <div class="carlist carpage">
    <div class="car-title fx-vb">
      <div class="btn hover btn-back fx-vc" @click="pageBack">
        <span class="icon-back"></span>
      </div>
      <div class="ct-main fx-vc">
        <div v-for="item in rankTab" :key="item.id" class="otab hover" :class="{cur: item.id===curTabId}" @click="changeTab(item.id)">
          {{item.txt}}
        </div>
      </div>
      <div class="btn btn-right"></div>
    </div>

    <div class="car-body">
      <!-- help Txt -->
      <div class="help-txt" v-if="curTabId ===1">
        <div class="in-box">
          <p>
            {{$t('cargame.thtt')}}
          </p>
          <p>
            <img src="@/assets/img/cargame/img-car-help.png" />
          </p>

          <p class="dot">
            <strong>1</strong>
            {{$t('cargame.tht1')}}
          </p>
          <p class="dot">
            <strong>2</strong>
            {{$t('cargame.thtip2')}}
          </p>
          <p v-html="$t('cargame.thtip3')" class="last">
          </p>
        </div>
        <div class="bot">
          {{$t('cargame.thbt')}}
        </div>
      </div>

      <!-- 赛车列表 -->
      <div class="the-clist" v-else>
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
      carList: [],
      rankTab: [
        { id: 1, txt: this.$t('cargame.tht2') },
        { id: 2, txt: this.$t('cargame.thtitle') }
      ],
      curTabId: 1
    }
  },
  watch: {
    curTabId (n) {
      triggerService({ eventId: n === 1 ? '105-13-8-1' : '105-13-8-2' })
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

    changeTab (id) {
      triggerService({
        eventId: '105-13-8-3',
        free_name2: JSON.stringify({
          tabId: id
        })
      })

      if (id === this.curTabId) return
      this.curTabId = id

      if (id === 1) {
        this.setClick()
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
    },
    setClick () {
      this.$nextTick(() => {
        document.querySelector('.sltxt').addEventListener('click', () => {
          this.changeTab(2)
        })
      })
    }
  },
  mounted () {
    triggerService({ eventId: '105-13-8-1' })
    this.getCarData()
    this.setClick()
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
      left:-0.5%;
      top:0;
      z-index:4;
      width:101%;
      height:100%;
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

.help-txt{
  padding:6px;
  .in-box{
    background:#fff;
    padding:10px 10px;
    border-radius: 6px;
    font-size:14px;
    color:#873A00;
    img{
      width:100%;
      display:block;
      margin: 10px 0;
    }

    .dot{
      position:relative;
      padding: 5px 0 5px 30px;
      strong{
        position: absolute;
        left:0;
        top:5px;
        width:20px;
        height:20px;
        font-size:16px;
        display:flex;
        align-items: center;
        justify-content: center;
        background:#FF0000;
        color:#fff;
        border-radius: 50%;
      }
    }

    .sltxt{
      color:#7A4DEC;
      font-style: italic;
      font-weight:bold;
      text-decoration: underline;
    }
    .last{
      padding: 15px 0;
    }
  }

  .bot{
    text-align:center;
    padding-top: 10px;
    font-size:16px;
    font-style: italic;
    color:#873A00;
    font-weight:bold;
  }
}

</style>
