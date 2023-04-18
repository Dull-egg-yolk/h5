<template>
  <!-- 安全通知 -->
  <div class="content-review">
    <div class="review-title">
      <h2>{{ $t('safetyNoite.title') }}</h2>
    </div>

    <div class="panel-box">
      <p>{{ $t('safetyNoite.part11') }}</p>
      <p>{{ $t('safetyNoite.part12') }}</p>
    </div>
    <div class="review-title">
      <h2>{{ $t('safetyNoite.part21') }}</h2>
    </div>
    <div class="panel-box">
      <p>{{ $t('safetyNoite.part22') }}</p>
    </div>
    <div class="review-title">
      <h2>{{ $t('safetyNoite.part31') }}</h2>
    </div>
    <div class="panel-box">
      <p>{{ $t('safetyNoite.part32') }}</p>
    </div>
    <div class="review-title">
      <h2>{{ $t('safetyNoite.part41') }}</h2>
    </div>
    <div class="panel-box">
      <p>{{ $t('safetyNoite.part42') }}</p>
    </div>
    <div class="review-title">
      <h2>{{ $t('safetyNoite.part51') }}</h2>
    </div>
    <div class="panel-box">
      <p>{{ $t('safetyNoite.part52') }}</p>
    </div>
    <div class="panel-box review-title">
      <p><b>{{ $t('safetyNoite.part53') }}</b></p>
    </div>
    <div class="panel-box review-title">
      <p><b>{{ $t('safetyNoite.part54') }}</b></p>
      <p><b>{{ $t('safetyNoite.part541') }}</b></p>
    </div>
    <div class="panel-box review-title">
      <p><b>{{ $t('safetyNoite.part55') }}</b></p>
      <p><b>{{ $t('safetyNoite.part551') }}</b></p>
    </div>
    <div class="panel-box review-title">
      <p><b>{{ $t('safetyNoite.part56') }}</b></p>
    </div>
    <div class="panel-box review-title">
      <p>{{ $t('safetyNoite.part57') }}</p>
    </div>
    <div class="panel-box" style="display: none">
      <p>{{ $t('guide.des_1') }}</p>
      <p>
        <b>{{ $t('guide.des_2') }}</b>
      </p>
      <div class="panel-content">
        <template v-for="item in 13">
          <template v-if="item === 9">
            <p :key="item">{{ $t('guide.img_8_0') }}</p>
            <p :key="item">{{ $t('guide.img_8_1') }}</p>
          </template>
          <p :key="item" v-else>{{ $t('guide.img_' + (item - 1)) }}</p>
          <p :key="item"><img :src="imgList[item - 1]" alt="" /></p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sub1: [
        [0, 1, 2],
        [0, 1, 2, 3, 4, 5, 6],
        [0, 1],
        [0, 1, 2, 3, 4]
      ],
      sub2: [[0, 1, 2, 3], [0], [0, 1], [0], [0, 1, 2, 3]],
      imgList: [
        require('@/assets/img/guide/001.png'),
        require('@/assets/img/guide/002.png'),
        require('@/assets/img/guide/003.png'),
        require('@/assets/img/guide/004.png'),
        require('@/assets/img/guide/005.png'),
        require('@/assets/img/guide/006.png'),
        require('@/assets/img/guide/007.png'),
        require('@/assets/img/guide/008.png'),
        require('@/assets/img/guide/009.png'),
        require('@/assets/img/guide/010.png'),
        require('@/assets/img/guide/011.png'),
        require('@/assets/img/guide/012.png'),
        require('@/assets/img/guide/013.png')
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.content-review {
  color: #333;
  padding-bottom: 20px;

  .review-title {
    padding: 9px 16px;
    margin-top: 12px;
    margin-bottom: 5px;
    box-sizing: border-box;

    h2 {
      font-size: 16px;
      font-weight: bold;
    }
  }

  .guide-list {
    margin: 0 0 0 15px;
    padding: 0 15px;
    font-size: 13px;

    li {
      line-height: 18px;
      list-style: decimal;

      &+li {
        margin-top: 8px;
      }

      li {
        font-size: 12px;
        margin-left: 11px;
        list-style: lower-latin;
        margin-top: 0;
      }
    }
  }

  .panel-box {
    font-size: 13px;
    padding: 0 16px;
    line-height: 18px;

    b {
      font-weight: bold;
    }

    .panel-content {
      margin-top: 10px;
      padding: 12px 16px;
      background: #f4f4f4;
      border-radius: 8px;

      p {
        font-size: 12px;
        margin-bottom: 10px;

        img {
          max-width: 100%;
        }
      }
    }
  }
}

/* 从右至左的语言 */
[lang='ar'],
[lang='he'],
[lang='ur'] {
  .content-review {
    direction: rtl;

    .review-title {
      background: linear-gradient(280deg, #d9ffd0 0%, #ffffff 30%);
    }

    .guide-list {
      margin: 0 15px 0 0;
      padding: 0 15px;
    }
  }
}</style>
