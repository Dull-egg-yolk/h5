import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: { name: 'Story' }
  },
  // {
  //   path: '/christmasPrep', // 女神圣诞活动预热页面
  //   name: 'ChristmasPrep',
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "christmasPrep" */ '../views/ChristmasPrep.vue'
  //     ),
  //   meta: {
  //     title: 'christmas.pageTitle'
  //   }
  // },
  {
    path: '/carnival', // 巴西活动页面
    name: 'carnival',
    component: () =>
      import(/* webpackChunkName: "carnival" */ '../views/Carnival.vue'),
    meta: {
      title: 'carnival.title'
    }
  },
  {
    path: '/email', // 巴西活动页面
    name: 'email',
    component: () =>
      import(/* webpackChunkName: "email" */ '../views/Email.vue'),
    meta: {
      title: ''
    }
  },
  {
    path: '/emailStaic', // 巴西活动页面
    name: 'emailStaic',
    component: () =>
      import(/* webpackChunkName: "emailStaic" */ '../views/EmailStaic.vue'),
    meta: {
      title: ''
    }
  },
  {
    path: '/mysticGoddess', // 蒙面女神活动页面
    name: 'mysticGoddess',
    component: () =>
      import(
        /* webpackChunkName: "mysticGoddess" */ '../views/MysticGoddess.vue'
      ),
    meta: {
      title: 'mysticGoddess.title'
    }
  },
  {
    path: '/halloween', // 万圣节活动
    name: 'Halloween',
    component: () =>
      import(/* webpackChunkName: "halloween" */ '../views/HalloweenActivity.vue'),
    meta: {
      title: 'halloween.title'
    }
  },
  // {
  //   path: '/newYear', // 圣诞活动
  //   name: 'NewYear',
  //   component: () =>
  //     import(/* webpackChunkName: "newYear" */ '../views/NewYear.vue'),
  //   meta: {
  //     title: 'newYear.title'
  //   }
  // },
  {
    path: '/story', // Story Activity
    name: 'Story',
    component: () =>
      import(/* webpackChunkName: "story" */ '../views/Story.vue'),
    meta: {
      title: 'storyVideo.title'
    }
  },
  {
    path: '/story14', // Story Activity
    name: 'Story14',
    component: () =>
      import(/* webpackChunkName: "story14" */ '../views/Story14.vue'),
    meta: {
      title: 'story14.title'
    }
  },
  {
    path: '/storyList', // Story Activity
    name: 'StoryList',
    component: () =>
      import(
        /* webpackChunkName: "storyList" */ '../views/story-list/index.vue'
      ),
    meta: {
      title: 'storyList.title'
    }
  },
  {
    path: '/christmas', //
    name: 'ChristmasIndex',
    component: () =>
      import(
        /* webpackChunkName: "christmasHome" */ '../views/luckybox/index.vue'
      ),
    meta: {
      title: 'worldCup.title'
    },
    redirect: { name: 'Christmas' },
    children: [
      {
        path: '/christmas/index', //
        name: 'Christmas',
        component: () =>
          import(
            /* webpackChunkName: "christmasIndex" */ '../views/luckybox/main.vue'
          ),
        meta: {
          title: 'christmas2022.chrisTtile'
        }
      },
      {
        path: '/christmas/rank',
        name: 'ChristmasRank',
        component: () =>
          import(
            /* webpackChunkName: "christmasRank" */ '../views/luckybox/rank.vue'
          ),
        meta: {
          title: 'lucky.rankActivieyTitle'
        }
      },
      {
        path: '/christmas/videos', //
        name: 'ChristmasVideos',
        component: () =>
          import(
            /* webpackChunkName: "christmasVideos" */ '../views/christmas/video.vue'
          ),
        meta: {
          title: 'christmas2022.chrisTtile',
          keepAlive: true
        }
      },
      {
        path: '/christmas/rules',
        name: 'ChristmasRules',
        component: () =>
          import(
            /* webpackChunkName: "christmasRules" */ '../views/luckybox/rules.vue'
          ),
        meta: {
          title: 'christmas2022.bonusRuleTitle'
        }
      },
      {
        path: '/christmas/bonus',
        name: 'ChristmasBonus',
        component: () =>
          import(
            /* webpackChunkName: "christmasBonus" */ '../views/luckybox/bonus.vue'
          ),
        meta: {
          title: 'christmas2022.bonusTitle3'
        }
      },
      {
        path: '/christmas/activities',
        name: 'ChristmasActivities',
        component: () =>
          import(
            /* webpackChunkName: "ChristmasActivities" */ '../views/christmasActivities.vue'
          ),
        meta: {
          title: 'christmasActivities.title'
        }
      }
    ]
  },
  {
    path: '/backpack', // 背包列表
    name: 'Backpack',
    component: () =>
      import(
        /* webpackChunkName: "backpack" */ '../views/backpack/index.vue'
      ),
    meta: {
      title: 'christmas2022.beibaoTitle'
    }
  },
  {
    path: '/backpackTips', // 背包引导
    name: 'BackpackTips',
    component: () =>
      import(
        /* webpackChunkName: "backpack" */ '../views/backpack/tips.vue'
      ),
    meta: {
      title: 'christmas2022.tips'
    }
  },
  {
    path: '/worldCup', //
    name: 'WorldCup',
    component: () =>
      import(
        /* webpackChunkName: "worldCup" */ '../views/word-cup/index.vue'
      ),
    meta: {
      title: 'worldCup.title'
    }
  },
  {
    path: '/worldCupGod', //
    name: 'WorldCupGod',
    component: () =>
      import(
        /* webpackChunkName: "worldCup" */ '../views/word-cup/goddessWall.vue'
      ),
    meta: {
      title: 'worldCup.footballFans.title',
      keepAlive: true
    }
  },
  {
    path: '/worldCupVideos', //
    name: 'WorldCupVideos',
    component: () =>
      import(
        /* webpackChunkName: "worldCup" */ '../views/word-cup/goddessWall.vue'
      ),
    meta: {
      title: 'worldCup.title',
      keepAlive: true
    }
  },
  {
    path: '/worldCupRank',
    name: 'WorldCupRank',
    component: () =>
      import(
        /* webpackChunkName: "worldCupRank" */ '../views/word-cup/rank.vue'
      ),
    meta: {
      title: 'worldCup.rank'
    }
  },
  {
    path: '/worldCupWinners',
    name: 'WorldCupWinners',
    component: () =>
      import(
        /* webpackChunkName: "worldCupWinners" */ '../views/word-cup/winners.vue'
      ),
    meta: {
      title: 'worldCup.listWinners'
    }
  },
  {
    path: '/worldCupBonus',
    name: 'WorldCupBonus',
    component: () =>
      import(
        /* webpackChunkName: "worldCupBonus" */ '../views/word-cup/bonus.vue'
      ),
    meta: {
      title: 'worldCup.worldCupBonus.title'
    }
  },
  {
    path: '/worldCupRules',
    name: 'WorldCupRules',
    component: () =>
      import(
        /* webpackChunkName: "worldCupRules" */ '../views/word-cup/rules.vue'
      ),
    meta: {
      title: 'worldCup.footballFans.rules.title'
    }
  },
  {
    path: '/guide', // 内容审核规范
    name: 'Guide',
    component: () =>
      import(/* webpackChunkName: "guide" */ '../views/Guide.vue'),
    meta: {
      title: 'guide.title'
    }
  },
  {
    path: '/ramadan', // 斋月节活动
    name: 'Ramadan',
    component: () =>
      import(/* webpackChunkName: "ramadan" */ '../views/Ramadan.vue'),
    meta: {
      title: 'ramadan.title'
    }
  },
  {
    path: '/newfunc', // 聊天添加背景音乐 新功能介绍
    name: 'NewFunc',
    component: () =>
      import(/* webpackChunkName: "newfunc" */ '../views/NewFunc.vue'),
    meta: {
      title: 'newfunc.title'
    }
  },
  {
    path: '/safetyNotice', // 安全通知
    name: 'SafetyNotice',
    component: () =>
      import(/* webpackChunkName: "safetyNotice" */ '../views/SafetyNotice.vue'),
    meta: {
      title: 'safetyNoite.title'
    }
  },
  {
    path: '/faqCenter', // 帮助中心
    name: 'FaqCenter',
    component: () =>
      import(/* webpackChunkName: "FaqCenter" */ '../views/FaqCenter.vue'),
    meta: {
      title: 'FAQ'
    }
  },
  {
    path: '/questions', // 主播问答
    name: 'Questions',
    component: () =>
      import(/* webpackChunkName: "questions" */ '../views/Questions.vue'),
    meta: {
      title: 'questions.title'
    }
  },
  {
    path: '/asktrain', // 答题培训
    name: 'AskTrain',
    component: () =>
      import(/* webpackChunkName: "asktrain" */ '../views/ask-train/index.vue'),
    meta: {
      title: 'asktrain.title'
    }
  },
  {
    path: '/hostShot', // 主播拍摄活动
    name: 'HostShot',
    component: () =>
      import(/* webpackChunkName: "HostShot" */ '../views/HostShot.vue'),
    meta: {
      title: 'hostshot.title'
    }
  },
  {
    path: '/storyhost', // story 主播推荐
    name: 'StoryHost',
    component: () =>
      import(/* webpackChunkName: "StoryHost" */ '../views/StoryHost.vue'),
    meta: {
      title: 'storyhost.t5'
    }
  },
  {
    path: '/noticeEmail', // facebook注册的Yaar主播绑定邮箱通知页面
    name: 'NoticeEmail',
    component: () =>
      import(/* webpackChunkName: "noticeEmail" */ '../views/NoticeEmail.vue'),
    meta: {
      title: 'noticeEmail.title'
    }
  },
  {
    path: '/carlist', // 赛车车型列表
    name: 'CarList',
    component: () =>
      import(/* webpackChunkName: "CarList" */ '../views/cargame/carlist.vue'),
    meta: {
      title: 'cargame.tcar'
    }
  },
  {
    path: '/cardetail', // 赛车车型详情
    name: 'CarDetail',
    component: () =>
      import(/* webpackChunkName: "CarDetail" */ '../views/cargame/cardetail.vue'),
    meta: {
      title: 'cargame.tcar'
    }
  },
  {
    path: '/carrule', // 赛车车型详情
    name: 'CarRule',
    component: () =>
      import(/* webpackChunkName: "CarRule" */ '../views/cargame/carrule.vue'),
    meta: {
      title: 'cargame.carrule.title'
    }
  },
  {
    path: '/carrank', // 赛车车型详情
    name: 'CarRank',
    component: () =>
      import(/* webpackChunkName: "CarRank" */ '../views/cargame/carrank.vue'),
    meta: {
      title: 'cargame.trank'
    }
  },
  {
    path: '/carhistory', // car 历史
    name: 'CarHistory',
    component: () =>
      import(/* webpackChunkName: "CarHistory" */ '../views/cargame/carhistory.vue'),
    meta: {
      title: 'cargame.thistory'
    }
  },
  {
    path: '/carhistorydetail', // car 历史
    name: 'CarHistoryDetail',
    component: () =>
      import(/* webpackChunkName: "CarHistoryDetail" */ '../views/cargame/carhistorydetail.vue'),
    meta: {
      title: 'cargame.tdetail'
    }
  },
  {
    path: '/carhelp', // car 历史
    name: 'CarHelp',
    component: () =>
      import(/* webpackChunkName: "CarHelp" */ '../views/cargame/carhelp.vue'),
    meta: {
      title: 'cargame.thbt'
    }
  },
  {
    path: '/raceactivity', // car 历史
    name: 'RaceActivity',
    component: () =>
      import(/* webpackChunkName: "RaceActivity" */ '../views/cargame/raceactivity.vue'),
    meta: {
      title: 'cargame.tplaybtn'
    }
  },
  {
    path: '/racehistory', // car 历史
    name: 'RaceHistory',
    component: () =>
      import(/* webpackChunkName: "RaceHistory" */ '../views/cargame/racehistory.vue'),
    meta: {
      title: 'cargame.tplaybtn'
    }
  },
  {
    path: '/checkin', // car 历史
    name: 'CheckIn',
    component: () =>
      import(/* webpackChunkName: "CheckIn" */ '../views/CheckIn.vue'),
    meta: {
      title: 'checkin.title'
    }
  },
  {
    path: '/staractivity', // star排行榜
    name: 'Staractivity',
    component: () =>
      import(/* webpackChunkName: "Staractivity" */ '../views/star/staractivity.vue'),
    meta: {
      title: 'star.starTitle'
    }
  },
  {
    path: '/ramadanactivity', // 斋月活动预热
    name: 'Ramadanactivity',
    component: () =>
      import(/* webpackChunkName: "Ramadanactivity" */ '../views/ramadan/ramadanActiviey.vue'),
    meta: {
      title: 'ramadan.ramadanTitle'
    }
  },
  {
    path: '/ramadanrankactivity', // 斋月活动
    name: 'ramadanRankActivity',
    component: () =>
      import(/* webpackChunkName: "ramadanRankActivity" */ '../views/ramadan/rankActiviey.vue'),
    meta: {
      title: 'ramadan.ramadanTitle'
    }
  },
  {
    path: '/hostRecruit', // 东欧主播h5
    name: 'hostRecruit',
    component: () =>
      import(/* webpackChunkName: "hostRecruit" */ '../views/hostRecruit/index.vue'),
    meta: {
      title: 'recruit.index.recruitTitle'
    }
  },
  {
    path: '/hostBunny', // 兔女郎
    name: 'hostBunny',
    component: () =>
      import(/* webpackChunkName: "hostRecruit" */ '../views/hostBunny/index.vue'),
    meta: {
      title: 'bunny.title2'
    }
  },
  {
    path: '/hostBunny-privacy', // 兔女郎协议
    name: 'hostBunnyPrivacy',
    component: () =>
      import(/* webpackChunkName: "hostRecruit" */ '../views/hostBunny/privacy.vue'),
    meta: {
      title: 'bunny.privcayTitle'
    }
  },
  {
    path: '/cosplay', // cosplay
    name: 'cosplay',
    component: () =>
      import(/* webpackChunkName: "cosplay" */ '../views/cosplay/index.vue'),
    meta: {
      title: 'bunny.title2'
    }
  },
  {
    path: '/cosplay-privacy', // cosplay协议
    name: 'cosplayPrivacy',
    component: () =>
      import(/* webpackChunkName: "hostRecruit" */ '../views/cosplay/privacy.vue'),
    meta: {
      title: 'bunny.privcayTitle'
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  var i = document.documentElement
  function d () {
    var e = i.clientWidth / 10
    i.style.fontSize = e + 'px'
  }
  d()
  next()
})

export default router
