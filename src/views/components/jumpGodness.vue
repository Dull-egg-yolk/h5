<template>
  <div class="godness" @click="goFootBallFans">
        <div class="go-fans">
          {{ $t('worldCup.goMeetFootballFans') }}
        </div>
        <div class="fans">
          <div class="fans-wrapper">
            <ul><li v-for="(f, i) in FOOTBALL_FANS" :key="i"><img :src="f" /></li></ul>
          </div>
        </div>
      </div>
</template>
<script>

const FOOTBALL_FANS = [
  'https://h5.livuchat.com/staticProd/worldCup/img/1.png',
  'https://h5.livuchat.com/staticProd/worldCup/img/2.png',
  'https://h5.livuchat.com/staticProd/worldCup/img/3.png'
]

export default {
  name: 'JumpGodness',
  props: {},
  data () {
    return {
      FOOTBALL_FANS
    }
  },
  methods: {
    goFootBallFans () {
      this.$emit('goFootBallFans')
    }
  }
}
</script>
<style scoped lang="less">
.godness{
      position: fixed;
      bottom: 0px;
      left: 0px;
      z-index: 1000;
      width: 100%;
      height: 60px;
      color: #6E2B01;
      background: linear-gradient(to left, #FEEA91, #FFCA48);
      display: flex;
      align-items: center;
      justify-content: center;
        .go-fans {
            flex: 1;
            text-indent: 0.3rem;
            font-size: 14px;
        }
        .fans{
            overflow: hidden;
            .fans-wrapper {
                position: relative;
                width: auto;
                height: 60px;
                line-height: 60px;
                ul {
                    text-align: right;
                    li {
                        display: inline-block;
                        width: 40px;
                        position: relative;
                        &:nth-child(n+2) {
                            left: -0.2rem;
                        }
                        &:nth-child(n+3) {
                            left: -0.4rem;
                        }
                        img{
                            width: 40px;
                            height: 40px;
                            vertical-align: middle;
                            border-radius: 22px;
                            border: 2px solid rgba(255, 255, 255, 0.31);
                        }
                    }
                }
            }

        }
}
</style>
