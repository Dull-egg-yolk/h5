<template>
  <div class="christmas-year-page">
    <div class="year-header">
      <h2>{{ $t('newYear.title') }}</h2>
    </div>
    <div class="red-box">
      <div class="title-snow"></div>
      <div class="red-box-content">
        <div class="title-box">{{ $t('newYear.wishing') }}</div>
        <p class="txt-box">{{ $t('newYear.wishingTips') }}</p>
      </div>
    </div>

    <div class="general-box">
      <span class="icon-gift"></span>
      <div class="general-box-content">
        <div class="title-box">
          {{ $t('newYear.activeTitle') }}
        </div>
        <p class="txt-box">{{ $t('newYear.activeTime') }}</p>
      </div>
    </div>

    <div class="line-box"></div>

    <div class="desc-info">
      {{ $t('newYear.content1') }}
    </div>

    <div class="img-box">
      <span class="icon-snow"></span>
      <img src="../assets/img/newYear/img-list.png" alt="">
    </div>

    <div class="line-box line2"></div>

    <div class="red-box">
      <div class="title-snow"></div>
      <span class="icon-snowman"></span>
      <div class="red-box-content">
        <div class="title-box sub-title">{{ $t('newYear.prices') }}</div>
        <div class="txt-list">
          <div class="txt-item">
            <p class="small">{{ $t('newYear.firstPlace') }}</p>
            <p class="normal">{{ $t('newYear.firstPlaceTxt') }}</p>
          </div>
          <div class="txt-item">
            <p class="small">{{ $t('newYear.secondPlace') }}</p>
            <p class="normal">{{ $t('newYear.secondPlaceTxt') }}</p>
          </div>
          <div class="txt-item">
            <p class="small">{{ $t('newYear.thirdPlace') }}</p>
            <p class="normal">{{ $t('newYear.thirdPlaceTxt') }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="general-box">
      <div class="general-box-content">
        <div class="desc-info">
          {{ $t('newYear.content2') }}
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div class="footer-txt flex-c-c">
        <span class="icon-snow"></span>
        <p class="txt"> {{ $t('newYear.bestChristmas') }}</p>
        <span class="icon-snow"></span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.christmas-year-page {
  min-height: 100vh;
  background: #274F27;
  background: linear-gradient(to bottom, #B52128 226px, #274F27 226px, #274F27 100%);
  font-size: 16px;
  line-height: 23px;
  color: #fff;

  .year-header {
    height: 262px;
    background:  center top / contain  url(../assets/img/newYear/top-bg.png) no-repeat;
    padding-top: 26px;
    padding-left: 23px;
    box-sizing: border-box;

    h2 {
      width: 170px;
      font-size: 30px;
      line-height: 42px;
      font-weight: 900;
      text-shadow: 0px 0px 12px rgba(255, 255, 255, 0.54);
    }
  }

  .red-box {
    padding: 0 10px;
    margin-top: 20px;
    position: relative;

    .title-snow {
      position: absolute;
      top: -10px;
      left: 3px;
      width: 369px;
      height: 35px;
      background: center / contain url(../assets/img/newYear/title-bg.png) no-repeat;
    }

    .icon-snowman {
      position: absolute;
      bottom: -7px;
      right: 0;
      width: 58px;
      height: 67px;
      background: center / contain url(../assets/img/newYear/icon-snowman.png) no-repeat;
    }

    .red-box-content {
      background: #B52128;
      border-radius: 11px;
      border: 1px solid #FF6666;
      box-shadow: 0 3px 0 0 #53090C;

      .title-box {
        padding: 12px 10px 6px 14px;
        line-height: 23px;
        font-weight: 600;
        font-size: 16px;
        border: 1px solid #FFFFFF20;
      }

      .sub-title {
        font-size: 12px;
        font-weight: normal;
      }

      .txt-box {
        padding: 17px 14px;
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
      }

      .txt-list {

        padding: 0 9px;
        .txt-item {
          padding: 9px 5px;
          &+.txt-item {
            border-top: 1px solid #FFFFFF20;
          }
        }

        .small {
          font-size: 12px;
          line-height: 17px;
        }

        .normal {
          font-size: 20px;
          color: #FFDA39FF;
          font-weight: 600;
          line-height: 28px;
        }
      }
    }
  }

  .general-box {
    position: relative;
    padding: 10px;
    margin-top: 20px;

    .icon-gift {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 62px;
      height: 57px;
      background: center / contain url(../assets/img/newYear/icon-gift.png) no-repeat;
    }

    .general-box-content {
      background: #274F27;
      border-radius: 11px;
      border: 1px solid #727F2D;
      box-shadow: 0 3px 0 0 #0F2A0F;

    }

    .title-box {
      font-size: 12px;
      font-weight: 400;
      color: #FFDA39;
      line-height: 17px;
      border: 1px solid #48632A;
      padding: 17px 14px 12px;
    }
    .txt-box {
      font-size: 20px;
      width: 280px;
      margin: 12px auto 19px 14px;
      line-height: 28px;
      font-weight: 600;
    }
  }

  .line-box {
    position: relative;
    height: 44px;
    background: center / contain url(../assets/img/newYear/line-bg1.png) no-repeat;

    &.line2 {
      background-image: url(../assets/img/newYear/line-bg2.png);
      margin-top: -30px;
    }
  }

  .desc-info {
    margin: 17px 10px;
  }

  .img-box {
    padding: 5px;
    position: relative;

    .icon-snow {
      position: absolute;
      left: 6px;
      top: -12px;
      width: 24px;
      height: 28px;
      background: center / contain url(../assets/img/newYear/icon-snow.png) no-repeat;
    }

    img {
      max-width: 100%;
    }
  }

  .page-footer {
    height: 80px;
    background: center bottom / contain url(../assets/img/newYear/footer-bg.png) no-repeat;
    .footer-txt {
      margin-top: 35px;
      padding: 0 10px;
      .icon-snow {
        flex-shrink: 0;
        width: 18px;
        height: 21px;
        background: center / contain url(../assets/img/newYear/icon-snow.png) no-repeat;
      }

      .txt {
        padding: 0 5px;
        text-align: center;
      }

    }
  }

}

/* 从右至左的语言 */
[lang='ar'],
[lang='he'],
[lang='ur'] {
  .christmas-year-page {
    direction: rtl;

    .year-header {
      padding-right: 23px;
      padding-left: auto;
      h2 {
        margin-right: auto;
      }
    }
    .red-box {
      .icon-snowman {
        left: 0;
        right: auto;
      }
    }
  }
}
</style>
