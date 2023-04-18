<template>
  <div class="car-rule carpage">
    <div class="car-title fx-vb">
      <div class="btn hover btn-back fx-vc" @click="pageBack">
        <span class="icon-back"></span>
      </div>
      <div class="ct-main fx-vc">
        {{$t('cargame.trules')}}
      </div>
      <div class="btn btn-right"></div>
    </div>

    <div class="car-body">

      <div class="rule-txt">
        <p>{{$t('cargame.tcrule4')}} </p>
        <p>{{$t('cargame.tcrule5')}} </p>
        <p>{{$t('cargame.tcrule2')}} </p>
        <p>{{$t('cargame.tcrule3')}} </p>

      </div>

    </div>
  </div>
</template>
<script type="text/babel">
import Cookies from 'js-cookie'
import { triggerService } from '@/utils/statisticalTool'
// import MtPopup from '@/components/popup/index'
// import Toast from '@/components/toast/index'
import { getParams } from '@/utils/index'

const QueryParams = getParams()
export default {
  name: 'CarRule',
  components: {
  },
  data () {
    return {
      userId: QueryParams.userId || Cookies.get('userId')
    }
  },
  methods: {
    pageBack () {
      if (window.raceClient && window.raceClient.finish) {
        window.raceClient.finish()
      } else {
        this.$router.back()
      }
    }
  },
  mounted () {
    triggerService({ eventId: '105-13-6-0' })
  }
}
</script>
<style lang="less">
@import url("./common.less");

.rule-txt{
  padding:10px 20px;
  font-size:14px;
  line-height: 1.25;
  p{
    margin-bottom:12px;
  }
}
</style>
