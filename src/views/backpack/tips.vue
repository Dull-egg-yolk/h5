<template>
  <div :class="['page-backpack-tips', showFlip && 'horizontal-flip']">
    <div>
      <div class="title">
        <p>{{$t('christmas2022.tipsInfo2')}}</p>
        <p>{{$t('christmas2022.tipsInfo5')}}</p>
      </div>
      <dl>
        <dt>{{$t('christmas2022.tipsInfo3')}}</dt>
        <dd>
          <img src="https://h5.livuchat.com/staticProd/2022_christmas/img/tips/01.png" alt="" />
        </dd>
      </dl>
      <dl>
        <dt>{{$t('christmas2022.tipsInfo4')}}</dt>
        <dd>
          <img src="https://h5.livuchat.com/staticProd/2022_christmas/img/tips/02.png" alt="" />
        </dd>
        <dd>
          <img src="https://h5.livuchat.com/staticProd/2022_christmas/img/tips/03.png" alt="" />
        </dd>
      </dl>
    </div>
  </div>
</template>
<script type="text/babel">
import { triggerService } from '@/utils/statisticalTool'

export default {
  name: 'Tips',
  data () {
    return {
    }
  },
  methods: {
    goBack () {
      this.$router.back()
    }
  },
  mounted () {
    triggerService({ eventId: '105-12-1-4' })
  }
}

</script>
<style lang="less">
@import url("./tips.less");
</style>
