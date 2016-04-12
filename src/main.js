import Vue from 'vue'
import App from './App.vue'

import './normalize.css'
import './main.css'

/* eslint-disable no-new */
Vue.config.debug = true

new Vue({
  el: 'body',
  components: { App }
})

// import BezierDrawer from './components/bezier.js'
//
// let bezier = new BezierDrawer('#drawing', 10, 310, 310, 10)
// console.log(bezier.draw(250, 250, 110, 110))
