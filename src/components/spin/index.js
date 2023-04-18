import Vue from 'vue'
import Spin from './spin'

let newSpin, vm, el

export default {
  name: 'Spin',

  show () {
    if (!newSpin) {
      const VueSpin = Vue.extend(Spin)
      newSpin = new VueSpin()
      vm = newSpin.$mount()
      el = vm.$el
      document.body.appendChild(el)
    }
    if (newSpin.value) return

    Vue.nextTick(() => {
      newSpin.value = true
      document.body.classList.add('rc-toast--unclickable')
    })
  },

  hide () {
    if (newSpin) {
      newSpin.value = false
      document.body.classList.remove('rc-toast--unclickable')
    }
  }
}
