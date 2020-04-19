import Vue from 'nativescript-vue'
import App from './components/App'
import store from './store'
import { StarRating as SR } from 'nativescript-star-ratings'

if(TNS_ENV !== 'production') {
  // Vue.use(VueDevtools)
}
  
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')
// Prints Colored logs when --env.production is *NOT* set while building
Vue.config.debug = (TNS_ENV !== 'production')

Vue.registerElement('StarRating', new SR());

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
