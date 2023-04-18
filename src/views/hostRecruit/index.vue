<template>
  <div class="body">
    <div class="host-page">
      <div class="host-top">
        <div class="title">{{ $t('recruit.index.recruitTitle') }}</div>
      </div>
      <div class="host-title">{{ $t('recruit.index.recruitTime') }}</div>
      <div class="host-content">
        <div class="one fx">
          <div class="title"><span></span>{{ $t('recruit.index.recruitActivityRules') }}<span></span></div>
          <p class="text" v-html="
              $t('recruit.index.recruitRules1')
            "></p>
          <p class="text">{{ $t('recruit.index.recruitRules2') }}</p>
        </div>
        <div class="two fx">
          <div class="title"><span></span>{{ $t('recruit.index.recruitNotes') }}<span></span></div>
          <p class="text">{{ $t('recruit.index.recruitNotes1') }}</p>
          <p class="text">{{ $t('recruit.index.recruitNotes2') }}</p>
        </div>
        <div class="three fx">
          <div class="title"><span></span>{{ $t('recruit.index.recruitApply') }}<span></span></div>
          <div class="from-content">
            <form action="" style="width: 100%">
              <div class="nick nick-hostId">
                <span class="title">{{ $t('recruit.index.recruitHostId') }}</span>
                <input class="name-inp" v-model="formMess.hostId" spellcheck="false" type="number" maxlength="30"
                  :placeholder="$t('recruit.index.recruitHostId')">
              </div>
              <div class="nick nick-country">
                <span class="title">{{ $t('recruit.index.recruitWhichCountry') }}</span>
                <div class="country" @click.stop="taggerCountry">
                  <!-- <img v-if="searchList.id !== 0"
                    :src="'https://h5.livuchat.com/static/images/countryFlag/' + ($countryCode[searchList.id] ? $countryCode[searchList.id].short.toLowerCase() : en) + '.png'"
                    alt /><span v-if="searchList.id === 0" class="ico" :class="{ 'global': searchList.id === 0 }"></span> -->
                  <span v-if="!intSelist2.length">Global</span>
                  <span v-for="(item, index) in intSelist2" :key="index" class="countrybb"> {{ item.value }},</span>
                  <span class="icon2"></span>
                </div>
                <!-- 国家筛选列表 -->
                <transition name="slideDown">
                  <div v-if="showPop1" class="search-content">
                    <div class="content">
                      <!-- <div v-for="(item, index) in list" :key="item.id" @click="changeBtn(item, index)"
                        style="display: flex;align-items: center;justify-content: space-evenly;"><img v-if="item.id !== 0"
                          :src="'https://h5.livuchat.com/static/images/countryFlag/' + ($countryCode[item.id] ? $countryCode[item.id].short.toLowerCase() : en) + '.png'"
                          alt /><span v-if="index === 0 && item.id === 0" class="ico"
                          :class="{ 'global': index === 0 }"></span> {{
                            item.name
                          }} </div> -->
                          <div class="m-item list-item flex-col">
                            <div class="cell-left">
                              <span>Country( <span class="icon" :class="{ 'noicon': isicon }">{{ intSe.length }}</span>/5)</span>
                              <div class="user-sett">
                                <div class="user-icon" @click.self="closeBtn()"></div>
                              </div>
                            </div>
                            <div class="cell-right">
                              <div class="tag-list fx-row-c">
                                <div class="otag fx-ic " v-for="(item, index) in list" :key="index"
                                  :class="{ selected: intSe.indexOf(item.id) !== -1 }" @click="addInt(item.id,item)">
                                  <img v-if="item.id !== 0"
                                    :src="'https://h5.livuchat.com/static/images/countryFlag/' + ($countryCode[item.id] ? $countryCode[item.id].short.toLowerCase() : en) + '.png'"
                                    alt />
                                    <div class="contryName">{{ item.value }}</div>
                                </div>
                              </div>
                            </div>
                            <div class="isok" @click="setInt">OK</div>
                          </div>
                    </div>
                  </div>
                </transition>
              </div>
              <div class="nick nick-experience">
                <span class="title">{{ $t('recruit.index.recruitHost') }}</span>
                <div class="experience">
                  <!-- <div :class="{ 'active': isexperience }" @click="isexperience = !isexperience">1-4</div>
                  <div class="div-mine" :class="{ 'active': !isexperience }" @click="isexperience = !isexperience">5-10
                  </div>
                  <div :class="{ 'active': !isexperience }" @click="isexperience = !isexperience">10+</div> -->
                  <div :class="productRadio == '1' ? 'select_product_button' : 'product_button'" @click="productSelect('1')"><span>1-4</span></div>
                  <div :class="productRadio == '2' ? 'select_product_button' : 'product_button'" @click="productSelect('2')"><span>5-10</span></div>
                  <div :class="productRadio == '3' ? 'select_product_button' : 'product_button'" @click="productSelect('3')"><span>10+</span></div>
                </div>
              </div>
              <div class="nick nick-email">
                <span class="title">{{ $t('recruit.index.recruitEmail') }} <span class="require"></span></span>
                <input class="name-inp" v-model="formMess.email" spellcheck="false" type="email" maxlength="30"
                  :placeholder="$t('recruit.index.recruitEmail')">
              </div>
              <div class="nick nick-phone">
                <span class="title" @click="isrecruitTelegram=!isrecruitTelegram">{{ !isWhatsApp ? 'WhatsApp/Telegram': isWhatsApp==='WhatsApp'?'WhatsApp':'Telegram'  }}{{  $t('recruit.index.recruitTelegram') }}<span class="require1"></span> <span class="icon-arrow left" :class="{ extend: isrecruitTelegram }"></span></span>
                <div v-if="isrecruitTelegram" class="isrecruitTelegram">
                  <span :class="{'active' : isWhatsApp ==='WhatsApp'}" @click="iswhatsApp('WhatsApp')">WhatsApp</span><span @click="iswhatsApp('Telegram')" :class="{'active' : isWhatsApp=== 'Telegram'}">Telegram</span>
                </div>
                <div class="phone">
                  <div class="m-input-box fx-be-vc">
                    <div class="area-code flex-row-vc hover" v-if="isWhatsApp ==='WhatsApp'" :class="{ extend: showAreaBox }"
                      @click.stop="showAreaBox = !showAreaBox">
                      <span class="flag"><img :src="icon" alt=""></span>
                      <span class="code">+{{ areaCode }}</span>
                      <span class="icon-arrow"></span>
                    </div>
                    <div class="input-cell fx-c">
                      <input id="phone" type="tel" placeholder="" ref="phoneBox" v-model="formMess.telephone" />
                    </div>
                    <!-- 国家选择 -->
                    <transition name="slideDown" v-clickoutside:click="outClickHandler">
                      <div class="area-list-box flex-col" v-if="showAreaBox" @click.stop v-clickoutside:click="outClickHandler">
                        <!-- 手机时显示的标题和回退 -->
                        <div class="m-page-title">
                          <span class="actions l icon-arrow" @click.stop="showAreaBox = !showAreaBox">
                          </span>
                          <h2 class="title-txt">{{ $t('app.phone_login_select_country_title') }}</h2>
                        </div>
                        <!-- 国家列表 -->
                        <div class="the-list">
                          <ul>
                            <li class="fx-be-vc" v-for="item in searchCountryList" :key="item.short"
                              @click="setAreaCodeCode(item)">
                              <span class="flag fx-ic"><img :src="item.img" alt=""></span>
                              <span class="txt">{{ item.name }}</span>
                              <span class="code">+{{ item.phoneCode }}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </transition>
                  </div>
                </div>
              </div>
              <div class="nick nick-message">
                <span class="title">message</span>
                <textarea class="name-inp" v-model="formMess.message" spellcheck="false" type="text" maxlength="300"
                  :placeholder="$t('recruit.index.recruitIntroduce')"></textarea>
              </div>
            </form>
            <div class="footer"><div class="button" @click="addSub">{{ $t('recruit.index.recruitSubmit') }}</div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import phoneList from '@/assets/data/phone'
import country from '@/assets/data/country'
import Toast from '@/components/toast/index'
import { apiGetHostRecruit } from '@/api/rankActiviey'
import Clickoutside from '@/utils/clickoutside.js'
import { triggerService } from '@/utils/statisticalTool'
export default {
  data () {
    return {
      show: true,
      formMess: {
        hostId: '',
        email: '',
        message: '',
        telephone: '',
        recommendHostNum: '',
        channel: 'H5'
      },
      showPop1: false,
      isicon: false,
      isWhatsApp: false,
      intSe: [],
      list: [
        {
          id: 8,
          name: 'AL',
          value: this.$t('recruit.index.Albania')
        },
        {
          id: 49,
          name: 'CZ',
          value: this.$t('recruit.index.CzechRepublic')
        },
        {
          id: 140,
          name: 'PL',
          value: this.$t('recruit.index.Poland')
        },
        {
          id: 237,
          name: 'RS',
          value: this.$t('recruit.index.Serbia')
        },
        {
          id: 32,
          name: 'BG',
          value: this.$t('recruit.index.Bulgaria')
        },
        {
          id: 146,
          name: 'RO',
          value: this.$t('recruit.index.Romania')
        },
        {
          id: 212,
          name: 'HR',
          value: this.$t('recruit.index.Croatia')
        },
        {
          id: 159,
          name: 'SK',
          value: this.$t('recruit.index.Slovakia')
        },
        {
          id: 68,
          name: 'GR',
          value: this.$t('recruit.index.Greece')
        },
        {
          id: 56,
          name: 'EE',
          value: this.$t('recruit.index.Estonia')
        },
        {
          id: 97,
          name: 'LV',
          value: this.$t('recruit.index.Latvia')
        },
        {
          id: 103,
          name: 'LT',
          value: this.$t('recruit.index.Lithuania')
        },
        {
          id: 160,
          name: 'SI',
          value: this.$t('recruit.index.Slovenia')
        },
        {
          id: 77,
          name: 'HU',
          value: this.$t('recruit.index.Hungary')
        },
        {
          id: 116,
          name: 'MD',
          value: this.$t('recruit.index.Moldova')
        },
        {
          id: 201,
          name: 'BA',
          value: this.$t('recruit.index.BosniaHerzegovina')
        },
        {
          id: 234,
          name: 'ME',
          value: this.$t('recruit.index.Montenegro')
        },
        {
          id: 216,
          name: 'MK',
          value: this.$t('recruit.index.Macedonia')
        }
      ],
      productRadio: 1,
      intSelist: [],
      intSelist2: [],
      showAreaBox: false,
      areaCode: '',
      icon: '',
      searchCon: '',
      countryCode: '',
      flagUrl: 'https://h5.livuchat.com/static/images/countryFlag/',
      searchList: {
        name: 'Global',
        id: 0
      },
      isexperience: true,
      isrecruitTelegram: false
    }
  },

  components: {},
  directives: { Clickoutside },
  watch: {
    showAreaBox (n, o) {
      if (n) {
        // this.$nextTick(() => {
        //   this.$refs.searchBox.focus()
        // })
      } else {
        this.$nextTick(() => {
          this.$refs.phoneBox.focus()
        })
      }
    },
    phoneNum (n, o) {
      n = n.replace(/[^\d]/g, '')
      if (n.length > 20) {
        this.phoneNum = n.slice(0, 20)
      } else {
        this.phoneNum = n
      }
    }
  },
  computed: {
    searchname () {
      const id = this.searchList.id
      if (id > 0) {
        return this.$countryCode[id].en
      } else {
        return 'Global'
      }
    },
    searchphoneCode () {
      const id = this.searchList.id
      if (id > 0) {
        return this.$countryCode[id].phoneCode
      } else {
        return '86'
      }
    },
    countryList () {
      const list = []
      Object.entries(phoneList).forEach(([key, val]) => {
        const code = key.toLowerCase()
        const img = `${this.flagUrl}${code}.png`
        const name = this.$t(`country.${key}`)
        const obj = {
          short: key,
          phoneCode: val,
          name,
          searchKey: name.toLowerCase() + val,
          img
        }
        list.push(obj)
      })
      return list
    },
    searchCountryList () {
      if (this.searchCon) {
        const sea = this.searchCon.toLowerCase()
        return this.countryList.filter(item => item.searchKey.indexOf(sea) !== -1)
      }
      return this.countryList
    }
  },

  methods: {
    outClickHandler () {
      this.showAreaBox = false
    },
    productSelect (val) {
      this.productRadio = val
      val === 1 ? this.formMess.recommendHostNum = '1-3' : val === 2 ? this.formMess.recommendHostNum = '5-10' : this.formMess.recommendHostNum = '10+'
    },
    changeBtn (data, index) {
      this.currentIndex = index
      this.searchList = data
      console.log(data, '00000')
      this.showPop1 = false
    },
    taggerCountry () {
      this.showPop1 = !this.showPop1
      document.body.style.overflow = 'hidden'
    },
    setAreaCodeCode (item) {
      console.log(item)
      this.areaCode = item.phoneCode
      this.icon = item.img
      this.showAreaBox = false
      this.countryCode = item.short
    },
    addInt (id, item) {
      console.log(this.intSelist)
      const idx = this.intSe.indexOf(id)
      if (idx !== -1) {
        this.intSe.splice(idx, 1)
        this.intSelist.splice(idx, 1)
      } else {
        if (this.intSe.length >= 5) {
          return
        }
        this.isicon = false
        this.intSe.push(id)
        this.intSelist.push(item)
      }
    },
    closeBtn () {
      this.showPop1 = false
      document.body.style.overflow = ''
    },
    setInt () {
      this.showPop1 = false
      this.intSelist2 = this.intSelist
      document.body.style.overflow = ''
    },
    iswhatsApp (val) {
      console.log(val)
      this.isWhatsApp = val
      if (val === 'WhatsApp') {
        document.querySelector('#phone').setAttribute('type', 'number')
      }
      if (val === 'Telegram') {
        document.querySelector('#phone').setAttribute('type', 'text')
      }
      this.isrecruitTelegram = !this.isrecruitTelegram
    },
    addSub () {
      console.log(this.isWhatsApp, '0000')
      triggerService({ eventId: '105-15-3-1' })
      var myreg = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      if (!myreg.test(this.formMess.email || this.formMess.email === '')) {
        Toast(this.$t('recruit.index.recruitEmail'))
        return false
      }

      if (this.formMess.hostId === '') {
        delete this.formMess.hostId
      }
      this.formMess.country = this.intSe.toString()
      const data = { ...this.formMess }
      apiGetHostRecruit(data).then(res => {
        console.log(res)
        if (res.code === 200) {
          Toast({ message: this.$t('recruit.index.recruitSuccess'), duration: 2000 })
        }
      })
    }
  },
  mounted () {
    triggerService({ eventId: '105-15-3-0' })
    const countryId = this.$route.query.countryId || 42
    console.log(countryId)
    console.log(country[countryId])
    const code = country[countryId].short.toLowerCase()
    const img = `${this.flagUrl}${code}.png`
    this.areaCode = country[countryId].phoneCode
    this.icon = img
  }
}
</script>
<style lang='less' scoped>
@import url("./index.less");

body {
  background: #FEB630;
}
</style>
