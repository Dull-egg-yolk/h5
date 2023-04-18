<template>
  <div :class='[noFixed ?"noFixed":"fixed","godness"]' @click="goFootBallFans">
        <div class="go-fans">
          {{ $t('christmas2022.goMeetGirl') }}
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
  props: {
    noFixed: {
      type: Boolean,
      default: false
    }
  },
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
      height: 69px;
      background: #520000;
      box-shadow: inset 0px 0px 16px 5px rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      color: #fff;
      font-weight: bold;
      justify-content: center;
      &.noFixed {
        margin: 0 16px;
        border-radius: 35px;
      }
      &.fixed {
        position: fixed;
        bottom: 0px;
        left: 0px;
        z-index: 1000;
         width: 100%;
      }
        .go-fans {
            flex: 1;
            padding-left: 0.3rem;
            font-size: 12px;
        }
        .fans{
            overflow: hidden;
            .fans-wrapper {
                position: relative;
                width: auto;
                height: 69px;
                line-height: 69px;
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
