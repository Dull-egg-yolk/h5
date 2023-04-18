<template>
  <div class="go-bonus">
    <div @click="goBonus">
      <div class="lf">
          <div class="icons">
            <span class="span1"></span>
            <span class="span2"></span>
            <span class="span3"></span>
          </div>
      </div>
      <div class="center">20% EXTRA COINS</div>
      <div class="right" >
          <div class="go-btn"></div>
      </div>
     </div>
  </div>
</template>
<script>
export default {
  name: 'JumpBonus',
  props: {
    url: {
      type: String,
      default: 'all'
    }
  },
  methods: {
    goBonus () {
      this.$emit('jumpBonus')
    }
  }
}
</script>
<style scoped lang="less">

@keyframes an1{
    0%{transform: scale(0.9)}
    100%{transform: scale(1.2)}
}

@keyframes an2 {
    from {
    opacity: 1.0;
    }
    50% {
    opacity: 0.4;
    }
    to {
    opacity: 1.0;
    }
}

@keyframes upAndDown{
    0%{transform: translateY(0px)}
    50% {
      transform: translateY(8px)
    }
    100%{transform: translateY(0px)}
}
.go-bonus {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;
    background: url(https://h5.livuchat.com/staticProd/2022_christmas/img/bonus-in-bg.jpg) no-repeat left bottom;
    background-size: 100%;
    height: 60px;
    width: 100%;
    display: flex;
    padding-top: 16px;
    justify-content: space-between;
    >div {
      position: relative;
      width: 100%;
      height: 60px;
      .lf {
        position: absolute;
        top: 0;
        left: 0;
        width: 120px;
        height: 60px;
      }
      .right {
        position: absolute;
        top: 0;
        right: 0;
        height: 60px;
      }
    }
    .icons {
      position: relative;
      width:100%;
      height: 100%;
      &::before {
        content: '';
        left: 10px;
        top: 2px;
        position: absolute;
        width:100%;
        height: 100%;
        background: url(../../../assets/img/worldCup/gift/coins.png) no-repeat top;
        background-size: 100%;
        animation: upAndDown 1200ms linear 0.2s infinite;
      }
      span {
        position: absolute;
        display: inline-block;
        width:20px;
        height: 30px;
        background: url(../../../assets/img/worldCup/gift/xingguang.png) no-repeat center;
        background-size: 100%;
        z-index: 2;
        &.span1{
          left: 10px;
          top:16px;
          animation: an2 800ms linear 0.2s infinite;
        }
        &.span2{
          left: 60px;
          top:10px;
          animation: an2 1200ms linear 0.4s infinite;
        }
       &.span3{
          width: 40px;
          height: 50px;
          left: 80px;
          top: 6px;
          animation: an2 1600ms linear 0.2s infinite;
        }
      }
    }
    .center {
      position: absolute;
      left: 120px;
      top: 0;
      height: 60px;
      line-height: 60px;
      font-size: 20px;
      font-weight: bold;
      color: #fff;
    }
    .right {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
    }
    .go-btn {
      width: 46px;
      height: 46px;
      background: url(https://h5.livuchat.com/staticProd/2022_christmas/img/bonus-in.png) no-repeat center;
      background-size: 100%;
      transform: scale(1.2);
      animation: an1 800ms linear alternate infinite;
    }
}
</style>
