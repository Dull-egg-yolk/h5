<template>
  <div class="email-page">
        <img src="../assets/img/email/bg.png" />
        <div class="email">{{ $t("email.email") }}</div>
        <div class="coins">{{ $t("email.coins") }}</div>
        <a class="now" href="livu://com.videochat.livu/as/email">{{ $t("email.now") }}</a>
        <div class="dialog-div" v-if="showDialog"><div class="dialog">{{ $t("email.dialog") }}</div><div class="okbtn" @click="okBtn">{{ $t("email.ok") }}</div></div>
  </div>
</template>

<script>
import { getEmail } from '@/api/index'
export default {
  name: 'email',
  data () {
    return {
      showDialog: false,
      userId: this.$route.query.userId || '',
      appId: this.$route.query.appId || 20000,
      platformType: this.$route.query.platformType || ''
    }
  },
  methods: {
    getEmail () {
      getEmail({ userId: this.userId, appId: this.appId }).then(res => {
        console.log(res)
        if (res === true) {
          this.showDialog = true
        } else {
          if (this.appId === '77777') {
            window.location.href = 'kallapa://com.rc.live.livechat3/as/email'
          } else if (this.appId === '19999') {
            window.location.href = 'tumile://com.rcplatform.livechat/as/email'
          } else if (this.appId === '20000' && this.platformType === 1) {
            window.location.href = 'livu://videochatiOS90001/as/email'
          } else if (this.appId === '20000' && this.platformType === 2) {
            window.location.href = 'livu://com.videochat.livu/as/email'
          } else {
            window.location.href = 'livu://com.videochat.livu/as/email'
          }
        }
      })
    },
    okBtn () {
      this.showDialog = false
    }
  },
  mounted () {
    this.getEmail()
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
  top: 15%;
  width: 100%;
  font-size: 40px;
  font-weight: bold;
  color: rgba(255, 67, 80);
  text-align: center;
  text-shadow: 2px 2px #fff;
  font-family: DFKai-SB;
  margin-top: 20px;
}
.coins {
  position: absolute;
  top: 25%;
  width: 100%;
  font-size: 40px;
  font-weight: bold;
  color: rgba(255, 67, 80);
  text-align: center;
  text-shadow: 2px 2px #fff;
  font-family: DFKai-SB;
}
.now {
  position: absolute;
  bottom: 58px;
  width: 100%;
  font-size:20px;
  font-weight: bold;
  color: #fff;
  text-align: center;
}
.dialog-div {
  position: absolute;
  z-index: 999;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -150px;
  background-color: #fff;
  box-shadow: 0 10px 10px rgba(0, 0, 0, .1);
  border-radius: 20px;
  width: 300px;
  height: 200px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: showPop .3s both;
}
.dialog {
  text-align: center;
  font-size:18px;
  padding: 5px 10px;
}
.okbtn {
  width: 100px;
  height: 20px;
  border-radius: 50px;
  background-color: #ffe736;
  text-align: center;
  line-height: 20px;
  padding: 10px 5px;
  margin-top: 30px;
  color:#a00;
}

@keyframes showPop {
  0%{
   opacity: 0;
   transform: translateY(-14px);
  }
  100%{
   opacity: 1;
   transform: translateY();
  }
}
</style>
