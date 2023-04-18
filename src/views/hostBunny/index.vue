<template>
  <div class="bunny-page">
    <div class="page-title">
      <div class="head">{{ $t('bunny.title1') }}</div>
      <div class="title"><p>{{ $t('bunny.title2') }}</p></div>
    </div>
    <div class="body">
      <div class="info">
        <div class="title">
          <p>{{ $t('bunny.activtyTitle') }}</p>
        </div>
        <div class="content">
          <p class="time">{{ $t('bunny.startTime') }}</p>
          <div>{{ $t('bunny.startContent') }}</div>
          <p class="time">{{ $t('bunny.endTime') }}</p>
          <div>{{ $t('bunny.endContent') }}</div>
        </div>
      </div>
      <div class="info">
        <div class="title">
          <p>{{ $t('bunny.rulesTitle') }}</p>
        </div>
        <div class="content1">
          <p>{{ $t('bunny.rules1') }}</p>
          <p>{{ $t('bunny.rules2') }}</p>
        </div>
      </div>
      <div class="info">
        <div class="title">
          <p>{{ $t('bunny.rewardsTitle') }}</p>
        </div>
        <div class="content1">
          <p>{{ $t('bunny.rewards1') }}</p>
          <p>{{ $t('bunny.rewards2') }}</p>
          <p>{{ $t('bunny.rewards3') }}</p>
        </div>
      </div>
      <div class="info">
        <div class="title">
          <p>{{ $t('bunny.criteriaTitle') }}</p>
        </div>
        <div class="content1">
          <p>{{ $t('bunny.criteria1') }}</p>
          <p>{{ $t('bunny.criteria2') }}</p>
          <p>{{ $t('bunny.criteria3') }}</p>
          <p>{{ $t('bunny.criteria4') }}</p>
        </div>
      </div>
      <div class="info">
        <div class="title">
          <p>{{ $t('bunny.noteTitle') }}</p>
        </div>
        <div class="content1">
          <p>{{ $t('bunny.note1') }}</p>
          <p>{{ $t('bunny.note2') }}</p>
          <p>{{ $t('bunny.note3') }}</p>
          <p>{{ $t('bunny.note4') }}</p>
        </div>
      </div>
      <div class="fotter">{{ $t('bunny.participate') }}</div>
    </div>
    <mt-popup v-model="showPop" class="rc-popup-box blur-bg" :lockScroll="true" position="center">
      <div class="popup-page">
        <div class="pop-content">
          <span>{{ $t('bunny.terms') }}</span>
          <span><a href="https://h5.livuchat.com/web_h5/index.html#/hostBunny-privacy" target="_blank">{{
              $t('bunny.terms2')
          }}</a></span>
        </div>
        <div class="green-btn">
          <span @click="toGreen">{{ $t('bunny.agree') }}</span>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import MtPopup from '@/components/popup/index'
import { triggerService } from '@/utils/statisticalTool'
export default {
  data () {
    return {
      showPop: false
    }
  },
  components: {
    MtPopup
  },

  computed: {},
  mounted () {
    triggerService({ eventId: '105-15-5-0' })
    const showPop = localStorage.getItem('bunnyShowPop')
    if (showPop) {
      this.showPop = false
    } else {
      this.showPop = true
    }
  },
  methods: {
    toGreen () {
      this.showPop = false
      localStorage.setItem('bunnyShowPop', true)
    }
  }
}
</script>
<style lang='less'>@import url("./index.less");</style>
