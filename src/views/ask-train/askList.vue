<template>
  <div class="ask-list question-list">
    <div
      class="inner"
      ref="listWrap"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <slot :data="curQ"></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AskList',
  data () {
    return {
      curQ: 0,
      startX: 0,
      moveX: 0,
      baseW: 0,
      sDom: null,
      xt: 0,
      liIndex: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    }
  },
  props: {
    listLen: {
      type: Number
    }
  },
  methods: {
    touchStart (e) {
      this.moveX = 0
      this.sDom.style.webkitTransitionDuration = '0s'
      const { pageX } = e.touches[0]
      this.startX = pageX
    },
    touchMove (e) {
      const { pageX } = e.touches[0]
      this.moveX = pageX - this.startX
      this.sDom.style.webkitTransform = `translateX(${this.xt + this.moveX / 3}px)`
    },
    touchEnd (e) {
      this.sDom.style.webkitTransitionDuration = '0.2s'
      // 滑动距离不够 回弹
      // 第一个卡片 回弹
      // 最后一个卡片 回弹

      if (Math.abs(this.moveX) < this.baseW / 6 || (this.curQ === 0 && this.moveX > 0) || (this.curQ === (this.listLen - 1) && this.moveX < 0)) {
        this.sDom.style.webkitTransform = `translateX(${this.xt}px)`
        return
      }

      // 右滑
      if (this.moveX < 0) {
        this.curQ += 1
        this.xt = -(this.curQ * this.baseW)
        this.sDom.style.webkitTransform = `translateX(${this.xt}px)`
        return
      }

      // 左滑
      if (this.moveX > 0) {
        this.curQ -= 1
        this.xt = -(this.curQ * this.baseW)
        this.sDom.style.webkitTransform = `translateX(${this.xt}px)`
      }
    },
    jumpTo (index) {
      this.sDom.style.webkitTransitionDuration = '0.2s'
      this.curQ = index
      this.xt = -(this.curQ * this.baseW)
      this.sDom.style.webkitTransform = `translateX(${this.xt}px)`
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.sDom = this.$refs.listWrap
      this.baseW = this.sDom.querySelectorAll('.otest')[0].offsetWidth
      this.$refs.listWrap.style.width = this.listLen * (this.baseW + 100) + 'px'
    })
  }
}
</script>

<style lang="less" scoped>
.ask-list {
  flex: 1;
  width:100%;
  height:100%;
  overflow:hidden;

  .inner {
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    padding-left: 19px;
    transition: transform 0s;
    transform: translateX(0);
    overflow: hidden;
  }
  .otest {
    width: 338px;
    flex: 0 0 auto;
    transition: all 0.3s;

    &:not(.cur) {
      transform: scale(0.95);
      opacity: 0.5;
    }

    &.cur {
      opacity: 1;
    }
  }
}
</style>
