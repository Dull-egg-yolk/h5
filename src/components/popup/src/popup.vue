<template>
  <transition :name="currentTransition">
    <div
      v-show="currentValue"
      class="mint-popup"
      :class="[position ? 'mint-popup-' + position : '']"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script type="text/babel">
import Popup from '../../utils/popup'

export default {
  name: 'mt-popup',
  mixins: [Popup],
  props: {
    modal: {
      default: true
    },
    modalFade: {
      default: false
    },
    lockScroll: {
      default: false
    },
    closeOnClickModal: {
      default: true
    },
    popupTransition: {
      type: String,
      default: 'popup-slide'
    },
    position: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      currentValue: false,
      currentTransition: this.popupTransition
    }
  },
  watch: {
    currentValue (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.currentValue = val
    }
  },
  beforeMount () {
    if (this.popupTransition !== 'popup-fade') {
      this.currentTransition = `popup-slide-${this.position}`
    }
  },
  mounted () {
    if (this.value) {
      this.rendered = true
      this.currentValue = true
      this.open()
    }
  }
}
</script>

<style lang="less">
.mint-popup {
  position: fixed;
  background: #fff;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  backface-visibility: hidden;
  transition: 0.2s ease-out;
}

.mint-popup-top {
  top: 0;
  right: auto;
  bottom: auto;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}
.mint-popup-right {
  top: 50%;
  right: 0;
  bottom: auto;
  left: auto;
  transform: translate3d(0, -50%, 0);
}
.mint-popup-bottom {
  top: auto;
  right: auto;
  bottom: 0;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}
.mint-popup-left {
  top: 50%;
  right: auto;
  bottom: auto;
  left: 0;
  transform: translate3d(0, -50%, 0);
}

.popup-slide-top-enter,
.popup-slide-top-leave-active {
  transform: translate3d(-50%, -100%, 0);
}
.popup-slide-right-enter,
.popup-slide-right-leave-active {
  transform: translate3d(100%, -50%, 0);
}
.popup-slide-bottom-enter,
.popup-slide-bottom-leave-active {
  transform: translate3d(-50%, 100%, 0);
}
.popup-slide-left-enter,
.popup-slide-left-leave-active {
  transform: translate3d(-100%, -50%, 0);
}
.popup-fade-enter,
.popup-fade-leave-active {
  opacity: 0;
}
</style>
