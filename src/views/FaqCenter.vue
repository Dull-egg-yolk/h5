<template>
  <div class="faq-page">
    <div class="faq-top">
      <div class="muen" @click.stop="showMenuTip"><img src="@/assets/img/faq/top-ico.png"/></div>
      <div class="icon"><img src="@/assets/img/faq/top-yaar.png"/><div>{{ $t('faq.faq') }}</div></div>
      <img class="top-icon" src="@/assets/img/faq/top-icon.png" />
      <div class="menu-tips" v-if="showMenu"  v-clickoutside:click="outClickHandler">
        <ul>
          <li v-for="item in 4" :key="item" @click.stop="btnTab(item)" :class="{active: showTab === item }">{{ $t('faq.title' + item) }}</li>
        </ul>
      </div>
    </div>
    <div class="faq-content">
      <div class="tab">
        <ul>
          <li v-for="item in 4" :key="item" @click="btnTab(item)" :class="{active: showTab === item }">{{ $t('faq.title' + item) }}</li>
        </ul>
      </div>
      <div class="questions" v-if="showOne">
        <div class="one page" v-for="(item,index) in 6" :key="index">
          <div class="title" @click="showAnswerTip(item)"><div>{{ $t('faq.oneQuestions' + (index+1)) }}</div><div class="up" :class="{ active: answer === item }"></div></div>
          <div class="answer" v-if="answer === item" v-html="$t('faq.oneAnswer' + (index+1))"></div>
        </div>
      </div>
      <div class="questions" v-if="showTwo">
        <div class="two page" v-for="(item,index) in 4" :key="index">
          <div class="title" @click="showAnswerTip(item)"><div>{{ $t('faq.twoQuestions' + (index+1)) }}</div><div  class="up" :class="{ active: answer === item }"></div></div>
          <div class="answer" v-if="answer === item">{{ $t('faq.twoAnswer' + (index+1)) }}</div>
        </div>
      </div>
      <div class="questions" v-if="showThree">
        <div class="three page" v-for="(item,index) in 4" :key="index">
          <div class="title" @click="showAnswerTip(item)"><div>{{ $t('faq.threeQuestions' + (index+1)) }}</div><div  class="up" :class="{ active: answer === item }"></div></div>
          <div class="answer" v-if="answer === item">{{ $t('faq.threeAnswer' + (index+1)) }}</div>
        </div>
      </div>
      <div class="questions" v-if="showFour">
        <div class="four page" v-for="(item,index) in 4" :key="index">
          <div class="title" @click="showAnswerTip(item)"><div>{{ $t('faq.fourQuestions' + (index+1)) }}</div><div  class="up" :class="{ active: answer === item }"></div></div>
          <div class="answer" v-if="answer === item">{{ $t('faq.fourAnswer' + (index+1)) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Clickoutside from '@/utils/clickoutside.js'
export default {
  data () {
    return {
      showAnswer: false,
      answer: 0,
      showOne: false,
      showTwo: false,
      showThree: false,
      showFour: false,
      showTab: 1,
      showMenu: false
    }
  },
  directives: { Clickoutside },
  components: {},

  computed: {},

  methods: {
    showAnswerTip (item) {
      if (this.answer !== item) {
        this.answer = item
      } else {
        this.answer = 0
      }
    },
    btnTab (item) {
      this.showTab = item
      if (item === 1) {
        this.showOne = true
        this.showTwo = false
        this.showThree = false
        this.showFour = false
      } else if (item === 2) {
        this.showOne = false
        this.showTwo = true
        this.showThree = false
        this.showFour = false
      } else if (item === 3) {
        this.showOne = false
        this.showTwo = false
        this.showThree = true
        this.showFour = false
      } else if (item === 4) {
        this.showOne = false
        this.showTwo = false
        this.showThree = false
        this.showFour = true
      }
    },
    showMenuTip () {
      this.showMenu = !this.showMenu
    },
    outClickHandler () {
      this.showMenu = false
    }
  },
  mounted () {
    this.showOne = true
  }
}
</script>
<style lang='less' scoped>
.faq-page {
  position: relative;
  .faq-top {
    background: url(../assets/img/faq/top-bg.png) 0 0 no-repeat;
    background-size: 100% auto;
    padding-bottom: 40px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    .muen {
      display: flex;
      justify-content: flex-end;
      img {
        width: 22px;
        height: 22px;
        padding: 14px 20px 0 0;
      }
    }
    .icon {
      display: flex;
      align-items: center;
      color: #fff;
      img {
        width: 60px;
        height: 60px;
        padding: 20px;
      }
      div {
        font-weight: bold;
        font-size: 24px;
      }
    }
    .top-icon {
      position: absolute;
      bottom: -55px;
      right: 10px;
      width: 200px;
    }

    .menu-tips {
      position: absolute;
      top: 10px;
      right:50px;
      padding: 10px 20px 5px 20px;
      font-size: 14px;
      background: #fff;
      border-radius: 10px;
      ul {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        li {
          padding-bottom: 8px;
        }
        .active {
            font-weight: bold;
            color: #01D197;
            font-size: 16px;
          }
      }
    }
  }
  .faq-content {
    width: 100%;
    position: absolute;
    top: 140px;
    background: #F6F6F6;
    border-radius: 24px 24px 0px 0px;
    padding: 10px 20px;
    box-sizing: border-box;
    .tab {
      width: 100%;
      margin: 10px 0;
      overflow: hidden;
      ul {
        display: flex;
        flex-direction: row;
        align-items: center;
        // justify-content: center;
        white-space: nowrap;
        overflow-x: scroll;
        height: 40px;
        text-decoration: none;
        li {
          margin-right: 15px;
          font-size: 14px;
          color: #7a7979;
        }
        .active {
            font-weight: bold;
            color: #01D197;
            font-size: 16px;
          }
      }
      ul::-webkit-scrollbar {
        display: none;
      }
    }
    .questions {
      .page {
        background: #FFFFFF;
        border-radius: 10px;
        padding: 30px 10px 30px 20px;
        margin-bottom: 20px;
        font-size: 16px;
        .title {
          display: flex;
          justify-content: space-between;
          .up {
            display :inline-block;
            position: relative;
            width: 18px;
            height: 18px;
            margin-left: 20px;
          }
          .up.active::after {
              transform-origin: center;
              transform: rotate(-135deg);
              transition: transform .5s;
          }
          .up::after{
            display: inline-block;
            content: "";
            height: 10px;
            width: 10px;
            border-width: 0 3px 3px 0;
            border-color: #DADADA;
            border-style: solid;
            transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
            transform-origin: center;
            transition: transform .3s;
            position: absolute;
            top: 50%;
            right: 10px;
            margin-top: -10px;
            margin-left: 10px;
          }
        }
        .answer {
          color: #979494;
          padding-top: 20px;
          font-size: 14px;
        }
      }
    }
  }
}
/* 从右至左的语言 */
[lang='ar'],
[lang='he'],
[lang='ur'] {
  .faq-page {
    direction: rtl;
  }
  .faq-page .faq-top .muen img {
    padding-left: 20px;
  }
  .faq-page .faq-top .menu-tips {
    right: auto;
    left: 50px;
  }
}
</style>
