<template>
  <div class="play-game flex-c-c" :class="className" :style="{ bottom: bottom }">
    <p class="play-btn flex-c-c">
      <img src="../../assets/img/story/icon-camera.png" alt="" />
      <span>{{ $t('storyVideo.filmStory') }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'PlayGame',
  props: {
    bottom: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.play-game {
  position: fixed;
  bottom: 21px;
  text-align: center;
  width: 100%;
  transition: bottom linear 0.3s;
  .play-btn {
    min-width: 154px;
    padding: 0 20px;
    height: 50px;
    background: linear-gradient(134deg, #FF6537 0%, #F36D2B 52%, #DF454E 100%);
    box-shadow: 0px 0px 6px 0px rgba(213,66,66,0.62), inset 0px 0px 17px 0px rgba(29,5,5,0.74);
    border-radius: 28px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    animation-name: pulse;
    animation-duration: 1.2s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;

    img {
      width: 20px;
      height: 17px;
    }
    span {
      font-size: 15px;
      color: #fff;
      margin-left: 8px;
    }
  }
  @keyframes pulse {
    25% {
      transform: scale(1.05);
    }
    75% {
      transform: scale(0.95);
    }
  }

  &.play-two {
    .play-btn {
      background: linear-gradient(90deg, #4EBBFF 0%, #EE5EFF 100%);
      box-shadow: 0px 0px 2px 0px rgba(235,138,255,0.25);
      border-radius: 28px;
      opacity: 0.96;
      border: 1px solid rgba(255, 255, 255, 0.47);
    }
  }
}

.story-play-btn {
  margin-left: -15px;
  .play-btn {
    min-width: 270px;
    height: 55px;
    background: linear-gradient(347deg, #25FBEC 0%, #FFFFFF 100%);
    box-shadow: none;
    border: none;
    span {
      color: #360CAB;
      font-size: 16px;
      margin-left: 0;
    }

    img {
      display: none;
    }
  }
}
/* 从右至左的语言 */
[lang=ar], [lang=he], [lang=ur] {
  .play-btn {
    span{
      margin-left: auto;
      margin-right: 8px;
    }
  }
}
</style>
