<template>
  <mt-popup
    v-model="currentValue"
    class="rc-popup-box"
    :lockScroll="true"
    position="bottom"
  >
    <span class="back-btn" @click="close">X</span>
    <div class="video-box">
      <video :src="video" id="play-video" controls></video>
    </div>
  </mt-popup>
</template>

<script>
import MtPopup from '@/components/popup/index'

export default {
  name: 'HostList',
  components: { MtPopup },
  data () {
    return {
      currentValue: false,
      videoDom: null
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    video: {
      type: String,
      require: true
    }
  },
  watch: {
    currentValue (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.currentValue = val
      if (val) {
        this.$nextTick(() => {
          this.videoDom.play()
        })
      }
    }
  },
  methods: {
    close () {
      this.currentValue = false
      if (!this.videoDom.paused) {
        this.videoDom.pause()
      }
    }
  },
  mounted () {
    this.videoDom = document.querySelector('#play-video')
  }
}
</script>

<style lang="less" scoped>
.rc-popup-box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  .back-btn {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 38px;
    height: 38px;
    line-height: 38px;
    border-radius: 50%;
    font-size: 0.5rem;
    z-index: 999;
    background: #fff;
    text-align: center;
    box-shadow: 0px 0rem 12px 0 #e1d6d6;
  }

  .video-box {
    width: 100%;
    height: 100%;
    text-align: center;
    video {
      max-width: 100%;
      max-height: 100%;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
