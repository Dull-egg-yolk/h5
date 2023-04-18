<template>
  <div class="cosplay-page">
    <div class="page-title">
      <div class="head">
        <div class="title">{{ $t('cosplay.title') }}</div>
        <div class="coin"><img src="@/assets/img/cosplay/cos-coin.png"/></div>
      </div>
    </div>
    <div class="body">
      <div class="info">
        <div class="title">
          <p>{{ $t('cosplay.Activitytime') }}</p>
          <div class="tip"></div>
        </div>
        <div class="content">
          <p class="time">{{ $t('cosplay.starttimetit') }}</p>
          <div>{{ $t('cosplay.starttime') }}</div>
          <p class="time">{{ $t('cosplay.endtimetit') }}</p>
          <div>{{ $t('cosplay.endtime') }}</div>
        </div>
      </div>
      <div class="info">
        <div class="title">
          <p>{{ $t('cosplay.ruletitle') }}</p>
          <div class="tip"></div>
        </div>
        <div class="content1 content2">
          <p>{{ $t('cosplay.ruledetailed') }}</p>
          <p>{{ $t('cosplay.Notice') }}</p>
          <div class="content-img">
            <img src="@/assets/img/cosplay/cos-img8.png"/>
            <img src="@/assets/img/cosplay/cos-img4.png"/>
          </div>
          <div class="img-p">{{ $t('cosplay.makeup') }}</div>
          <div class="content-img">
            <img src="@/assets/img/cosplay/cos-img1.png"/>
            <img src="@/assets/img/cosplay/cos-img5.png"/>
          </div>
          <div class="img-p">{{ $t('cosplay.clothing') }}</div>
          <div class="content-img">
            <img src="@/assets/img/cosplay/cos-img2.png"/>
            <img src="@/assets/img/cosplay/cos-img6.png"/>
          </div>
          <div class="img-p">{{ $t('cosplay.props') }}</div>
          <div class="content-img">
            <img src="@/assets/img/cosplay/cos-img3.png"/>
            <img src="@/assets/img/cosplay/cos-img7.png"/>
          </div>
          <div class="img-p">{{ $t('cosplay.roleplay') }}</div>
        </div>
      </div>
      <div class="info">
        <div class="title">
          <p>{{ $t('cosplay.ActivityAward') }}</p>
          <div class="tip"></div>
        </div>
        <div class="content1">
          <p v-html="$t('cosplay.Awardtitle1')"></p>
          <p v-html="$t('cosplay.Awardtitle2')"></p>
          <p v-html="$t('cosplay.Awardtitle3')"></p>
          <p v-html="$t('cosplay.Awardtitle4')"></p>
          <p>{{ $t('cosplay.RewardTips') }}</p>
        </div>
      </div>
      <div class="info">
        <div class="title">
          <p>{{ $t('cosplay.Precautions') }}</p>
          <div class="tip"></div>
        </div>
        <div class="content1">
          <p>{{ $t('cosplay.Precautionstit1') }}</p>
          <p>{{ $t('cosplay.Precautionstit2') }}</p>
          <p>{{ $t('cosplay.Precautionstit3') }}</p>
          <p>{{ $t('cosplay.Comeparticipate') }}</p>
        </div>
      </div>
    </div>
    <mt-popup v-model="showPop" class="rc-popup-box blur-bg" :lockScroll="true" position="center">
      <div class="popup-page">
        <div class="pop-content">
          <span>{{ $t('cosplay.CarnivalTerms1') }}</span>
          <span><a href="https://h5.livuchat.com/web_h5/index.html#/cosplay-privacy" target="_blank">{{
              $t('cosplay.CarnivalTerms2')
          }}</a></span>
          <span>{{ $t('cosplay.CarnivalTerms3') }}</span>
        </div>
        <div class="green-btn">
          <span @click="toGreen">{{ $t('cosplay.agree') }}</span>
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
  watch: {
    showPop (n) {
      if (n) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    }
  },
  computed: {},
  mounted () {
    triggerService({ eventId: '105-15-5-1' })
    const showPop = localStorage.getItem('cosplayShowPop')
    if (showPop) {
      this.showPop = false
    } else {
      this.showPop = true
    }
  },
  methods: {
    toGreen () {
      this.showPop = false
      localStorage.setItem('cosplayShowPop', true)
    }
  }
}
</script>
<style lang='less'>@import url("./index.less");</style>
