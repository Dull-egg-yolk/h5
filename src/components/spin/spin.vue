<template>
    <div class="rc-spin-view" :class="{'hiden': !visible}" v-show="visible">
        <div class="rc-spin-warp">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="white">
              <path opacity=".25" d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"/>
              <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z">
                <animateTransform attributeName="transform" type="rotate" from="0 16 16" to="360 16 16" dur="0.8s" repeatCount="indefinite" />
              </path>
            </svg>
        </div>
    </div>
</template>

<script>
export default {
  name: 'RcSpin',
  props: {
    value: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      visible: this.value
    }
  },
  watch: {
    value (val) {
      this.visible = val
    }
  }
}
</script>

<style lang="less" scoped>
.rc-spin-view {
  display: flex;
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.15);

  &.hiden {
    display: none !important;
    height: 0;
  }

  .rc-spin-warp {
    top: 50%;
    left: 50%;
    position: fixed;
    transform: translate(-50%,-50%);
    color: #fff;
  }
}
</style>
