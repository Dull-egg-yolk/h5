import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './lang/en'
Vue.use(VueI18n)

const loadedLanguages = ['en'] // 我们的预装默认语言
const locale = getLang()

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en
  }
})

loadLanguageAsync(locale)

function getLang () {
  // 自动根据浏览器系统语言设置语言
  const navLang = navigator.language
  let locale = navLang.toLocaleLowerCase()
  locale = locale.split('-')
  if (locale[0] === 'zh') {
    if (locale[1] === 'tw') {
      locale = 'zh-TW'// 繁体
    } else {
      locale = 'zh-CN'// 简体
    }
  } else {
    locale = locale[0]
  }
  return locale
}

function setI18nLanguage (lang) {
  i18n.locale = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync (lang) {
  lang = lang || getLang()

  // 如果语言相同
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // 如果语言已经加载
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // 如果尚未加载语言
  return import(/* webpackChunkName: "lang-[request]" */ `./lang/${lang}.js`).then(
    messages => {
      i18n.setLocaleMessage(lang, messages.default)
      loadedLanguages.push(lang)
      return setI18nLanguage(lang)
    }
  ).catch(err => {
    console.log(err)
  })
}

export default i18n
