<template>
  <!-- 内容审核规范 -->
  <div class="content-review">
    <div class="review-title">
      <h2>{{ $t('guide.block_0') }}</h2>
    </div>
    <ol class="guide-list">
      <li v-for="(item, index) in sub1" :key="index">
        <p>{{ $t('guide.sub_0_' + index) }}</p>
        <ol>
          <li v-for="son in item" :key="son">
            {{ $t('guide.son_0_' + index + '_' + son) }}
          </li>
        </ol>
      </li>
    </ol>

    <div class="review-title">
      <h2>{{ $t('guide.block_1') }}</h2>
    </div>
    <ol class="guide-list">
      <li v-for="(item, index) in sub2" :key="index">
        <p>{{ $t('guide.sub_1_' + index) }}</p>
        <ol>
          <li v-for="son in item" :key="son">
            {{ $t('guide.son_1_' + index + '_' + son) }}
          </li>
        </ol>
      </li>
    </ol>

    <div class="review-title">
      <h2>{{ $t('guide.block_2') }}</h2>
    </div>
    <div class="panel-box">
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
    background: linear-gradient(70deg, #d9ffd0 0%, #ffffff 30%);

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

      & + li {
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
}
</style>
