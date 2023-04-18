<template>
  <div :class="['page-winners', showFlip && 'horizontal-flip']">
    <div class="header">
      <div class="title">
        <span class="current">{{$t('worldCup.listWinners')}}</span>
      </div>
    </div>
    <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <div class="rank-content" v-if="isLoadFirst && winnersListData.length > 0" v-infinite-scroll="loadMore" :infinite-scroll-immediate-check="immediateCheck"  infinite-scroll-disabled="loading"  infinite-scroll-distance="60">
              <div>
                <div class="rank-item" v-for="winner in winnersListData" :key="winner.userId">
                  <div class="avatar-wrap">
                      <div class="avatar">
                        <img :src="winner.headImg ||'https://h5.livuchat.com/staticProd/worldCup/img/user.png'" alt="" onerror="javascript:this.src='https://h5.livuchat.com/staticProd/worldCup/img/user.png'" />
                      </div>
                      <div class="info">
                        <p>{{winner.userName}}</p>
                        <p>
                            <country :countryId="winner.countryId" type="img"></country>
                        </p>
                      </div>
                  </div>
                  <div class="coins"><span>{{winner.goldNum}}</span></div>
                </div>
              </div>
          </div>
          <div v-if="isLoadFirst && winnersListData.length === 0" class="no-data">
            <div>{{$t('worldCup.noData')}}</div>
          </div>
          <div v-show="loading" class="page-loading">
              <mt-spinner type="fading-circle" color="#a425ff"></mt-spinner>
          </div>
    </div>
  </div>
</template>
<script type="text/babel">
import { getWinnersList } from '@/api/worldCup'
import { getWorldCupParams, worldCupIsFlipContry } from '@/utils/index'
import Country from '@/views/components/country'
const commonParams = getWorldCupParams()
export default {
  name: 'WorldCupWinners',
  components: {
    Country
  },
  data () {
    return {
      wrapperHeight: '',
      loading: false,
      immediateCheck: false,
      winnersListData: null,
      page: 1,
      isLoadFirst: false,
      pageSize: 20,
      isLoadMore: true,
      showFlip: false
    }
  },
  methods: {
    async init () {
      this.loadFirstListData()
      this.showFlip = worldCupIsFlipContry(this.$i18n.locale)
    },
    async loadData (page) {
      const res = await getWinnersList({ ...commonParams, pageNum: page, pageSize: this.pageSize })
      if (res.length < this.pageSize) {
        this.isLoadMore = false
      }
      return res
    },
    async loadFirstListData () {
      const res = await this.loadData(this.page)
      this.isLoadFirst = true
      if (res) {
        this.page += 1
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
        this.winnersListData = res
      }
    },
    async loadMore () {
      if (!this.isLoadMore) {
        return
      }
      this.loading = true
      const res = await this.loadData(this.page)
      this.loading = false
      if (res && res.length > 0) {
        this.page += 1
        this.winnersListData = [...this.winnersListData, ...res]
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="less">
html, body {
    background:#1b191d
}
.page-winners{
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background:#480d1d url(../../assets//img/worldCup/bg2.png) top center;
  background-repeat: no-repeat;
  background-size: 100% auto;
  font-size: 0.32rem;
  .header {
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
        position: relative;
        margin-top: 0.3rem;
        margin-bottom: 0.3rem;
        .back {
            display: inline-block;
            position: absolute;
            top: 0;
            left: 0.3rem;
            width: 0.8rem;
            height: 0.8rem;
            height: 100%;
            background: url(../../assets/img/worldCup/arrow.png) no-repeat;
            background-position: center;
            background-size: 60%;
            transform: rotate(180deg);
            border: 1px solid #1b191d;
            border-radius: 50%;
        }
        .title{
            color: #fff;
            font-size: 0.4rem;
            display: inline-block;
            span {
                display: inline-block;
                &:first-child {
                    margin-right: 0.3rem;
                }
                &.current {
                    font-size: 0.5rem;
                    font-weight: 900;
                    font-style: italic;
                }
            }
        }
}
.page-infinite-wrapper {
  margin-top: -1px;
  overflow: scroll;
  .page-loading{
      text-align: center;
      height: 0.6rem;
      line-height: 0.6rem;
      padding-bottom: 0.2rem;
      span {
        display: inline-block;
        div {
          display: inline-block;
          vertical-align: middle;
          margin-right: 5px;
        }
      }
    }
}
  .rank-content {
    height: auto;
    .rank-item {
      display: flex;
      color: #fff;
      height: 1.4rem;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.5rem;
      .avatar-wrap{
        flex: 4;
        display: flex;
        align-items: center;
        .avatar {
          margin-right: 0.2rem;
          border: 2px solid rgba(255, 255, 255, 0.31);
          display: inline-block;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: url(https://h5.livuchat.com/staticProd/worldCup/img/user.png) no-repeat left top;
          background-size: 100%;
          overflow: hidden;
          img {
            width: 40px;
            height: 40px;
            object-fit: cover;
          }
        }
        .info {
          p:first-child {
            font-size: 0.42rem;
          }
          p:last-child {
            display: flex;
            align-items: center;
            margin-top: 4px;
          }

        }
      }
      .coins {
          flex: 3;
          text-align: right;
          color: #FFCA48;
          span {
              display: inline-block;
              position: relative;
              padding-right: 0.5rem;
              &::after {
                  content: '';
                  position: absolute;
                  width: 0.4rem;
                  right: 0;
                  top: 0;
                  display: inline-block;
                  height: 1rem;
                  background-position: center;
                  background: url(../../assets/img/worldCup/icon.png) no-repeat;
                  background-size: 0.4rem 0.4rem;
              }
          }
      }
    }
  }
  .no-data {
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    color: #fff;
    margin-top: 4rem;
    font-size: 0.5rem;
  }
  &.horizontal-flip {
    .rank-content {
        transform: scaleX(-1);
        .rank-item {
            .order {
                transform: scaleX(-1);
            }
            .avatar {
                transform: scaleX(-1);
            }
            .coins {
                // transform: scaleX(-1);
                i {
                    display: inline-block;
                    transform: scaleX(-1);
                }
                span {
                    transform: scaleX(-1);
                    padding-right: 1px;
                    padding-left: 0.5rem;
                    &::after {
                        left: 0;
                        text-align: left;
                    }
                }
            }
            .info {
                p:first-child {
                    transform: scaleX(-1);
                }
                .country-box {
                    img {
                        transform: scaleX(-1);
                    }
                }
            }
        }
    }
  }
}
</style>
