<template>
  <div class="privcay-page">
    <div>
      <h2 v-html="$t('bunny.privcayTitle')"></h2>
      <p v-html="$t('bunny.privacy1')"></p>
      <h2 v-html="$t('bunny.p1')"></h2>
      <p v-html="$t('bunny.p2')"></p>
      <p v-html="$t('bunny.p3')"></p>
      <p v-html="$t('bunny.p4')"></p>
      <p v-html="$t('bunny.p5')"></p>
      <p v-html="$t('bunny.p6')"></p>
      <p v-html="$t('bunny.p7')"></p>
      <p v-html="$t('bunny.p8')"></p>
      <p v-html="$t('bunny.p9')"></p>
      <p v-html="$t('bunny.p10')"></p>
      <p v-html="$t('bunny.p11')"></p>
      <p v-html="$t('bunny.p12')"></p>
      <p v-html="$t('bunny.p13')"></p>
      <p v-html="$t('bunny.p14')"></p>
      <p v-html="$t('bunny.p15')"></p>
      <p v-html="$t('bunny.p16')"></p>
      <p v-html="$t('bunny.p17')"></p>
      <p v-html="$t('bunny.p18')"></p>
      <p v-html="$t('bunny.p19')"></p>
      <p v-html="$t('bunny.p20')"></p>
      <p v-html="$t('bunny.p21')"></p>
      <h2>{{ $t('bunny.privcayh1') }}</h2>
      <h3>{{ $t('bunny.privcayh12') }}</h3>
      <p>{{ $t('bunny.privcayh1p1') }}</p>
      <p>{{ $t('bunny.privcayh1p2') }}</p>
      <p>{{ $t('bunny.privcayh1p3') }}</p>
      <p>{{ $t('bunny.privcayh1p4') }}</p>
      <p>{{ $t('bunny.privcayh1p5') }}</p>
      <p>{{ $t('bunny.privcayh1p6') }}</p>
      <p>{{ $t('bunny.privcayh1p7') }}</p>
      <h3>{{ $t('bunny.privcayh2') }}</h3>
      <p>{{ $t('bunny.privcayh2p1') }}</p>
      <p>{{ $t('bunny.privcayh2p2') }}</p>
      <p>{{ $t('bunny.privcayh2p3') }}</p>
      <h3>{{ $t('bunny.privcayh3') }}</h3>
      <p>{{ $t('bunny.privcayh3p1') }}</p>
      <p>{{ $t('bunny.privcayh3p2') }}</p>
      <p>{{ $t('bunny.privcayh3p3') }}</p>
      <p>{{ $t('bunny.privcayh3p4') }}</p>
      <p>{{ $t('bunny.privcayh3p5') }}</p>
      <h3>{{ $t('bunny.privcayh4') }}</h3>
      <p>{{ $t('bunny.privcayh4p1') }}</p>
      <p>{{ $t('bunny.privcayh4p2') }}</p>
      <p>{{ $t('bunny.privcayh4p3') }}</p>
      <p>{{ $t('bunny.privcayh4p4') }}</p>
      <h3>{{ $t('bunny.privcayh5') }}</h3>
      <p>{{ $t('bunny.privcayh5p1') }}</p>
      <h3>{{ $t('bunny.privcayh6') }}</h3>
      <p>{{ $t('bunny.privcayh6p1') }}</p>
      <p>{{ $t('bunny.privcayh6p2') }}</p>
      <p>{{ $t('bunny.privcayh6p3') }}</p>
      <h3>{{ $t('bunny.privcayh7') }}</h3>
      <p>{{ $t('bunny.privcayh7p1') }}</p>
      <p>{{ $t('bunny.privcayh7p2') }}</p>
      <p>{{ $t('bunny.privcayh7p3') }}</p>
      <h3>{{ $t('bunny.privcayh8') }}</h3>
      <p>{{ $t('bunny.privcayh8p1') }}</p>
      <p>{{ $t('bunny.privcayh8p2') }}</p>
      <h3>{{ $t('bunny.privcayh9') }}</h3>
      <p>{{ $t('bunny.privcayh9p1') }}</p>
      <p>{{ $t('bunny.privcayh9p2') }}</p>
      <p>{{ $t('bunny.privcayh9p3') }}</p>
      <p>{{ $t('bunny.privcayh9p4') }}</p>
      <h3>{{ $t('bunny.privcayh10') }}</h3>
      <p>{{ $t('bunny.privcayh10p1') }}</p>
      <p>{{ $t('bunny.privcayh10p2') }}</p>
      <p>{{ $t('bunny.privcayh10p3') }} <a href="mailto:customer.service@rcplatformhk.com">customer.service@rcplatformhk.com</a></p>
      <p>{{ $t('bunny.privcayh10p4') }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },

  components: {},

  computed: {},

  methods: {}
}
</script>
<style lang='less' scoped>
html,
body {
  height: 100%;
  overflow: auto;
  background: #fff;
}
.privcay-page {
  background-color: #fff;
  padding: 20px;
  overflow-x: hidden;
  h2 {
    font-size: 20px;
    text-align: left;
    padding-bottom: 10px;
    color: #000;
  }
  h3 {
    font-size: 18px;
    text-align: left;
    padding-bottom: 10px;
    color: #000;
  }
  p {
    color: #666;
    font-size: 16px;
    padding-bottom: 10px;
  }
  a {
    color: -webkit-link;
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>
