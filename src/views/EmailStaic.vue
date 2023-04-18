<template>
  <div class="email-page">
    <img src="../assets/img/email/bg-1.png" />
    <div class="email">{{ $t("email.email") }}</div>
    <div class="coins">{{ $t("email.coins") }} <img src="../assets/img/email/icon.png" /></div>
    <div class="title">{{ $t("email.title") }} </div>
    <div class="tep"><div>{{ $t("email.tep1") }}</div><img src="../assets/img/email/img1.png" /><img src="../assets/img/email/img2.png" /></div>
    <div class="tep"><div>{{ $t("email.tep2") }}</div><img src="../assets/img/email/img3.png" /></div>
  </div>
</template>

<script>
export default {
  name: 'email',
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang="less">
  body {
    background: #58acfe;
  }
.email-page {
  position: relative;
  img{
    width:100%;
    display:block;
  }
}
.email {
  position: absolute;
  top: 0;
  width: 100%;
  font-size: 40px;
  font-weight: bold;
  color: #FF524E;
  text-align: center;
  text-shadow: 2.5px 2.5px #fff;
  font-family: DFKai-SB;
  margin-top: 20px;
}
.coins {
  position: absolute;
  top: 3.5%;
  width: 100%;
  font-size: 40px;
  font-weight: bold;
  color: rgba(255, 67, 80);
  text-align: center;
  text-shadow: 2px 2px #fff;
  font-family: DFKai-SB;
  img {
    position: absolute;
    width: 35px;
    height: 32px;
    top: 0;
    right: 30px;
  }
}
.title {
  height: 100px;
  width: 100%;
  background: url(../assets/img/email/title.png) no-repeat center 0;
  background-attachment:scroll, fixed;
  background-size: 100% 100%;
  text-align: center;
  line-height: 100px;
  color: #fff;
  font-weight: bold;
  font-family: PingFangSC-Semibold, sans-serif;
  font-size: 16px;
  word-wrap: break-word;
  word-break: normal;
}
.tep {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  margin: 20px 10px;
  padding: 40px 10px 20px 10px;
  border-radius: 10px;
  img {
    margin-top: 10px;
  }
  div {
    position: absolute;
    top: -10px;
    width: 180px;
    height: 35px;
    border-radius: 22.5px;
    background-color: #58acfe;
    text-align: center;
    line-height: 35px;
    color: #fff;
    font-size: 15px;
    background-image:linear-gradient(135deg,#5AC8FF,#0696F9),linear-gradient(135deg,#5AC8FF,#0696F9 );
  }
}
</style>
