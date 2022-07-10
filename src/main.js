import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueI18n)

new Vue({
  render: h => h(App),
}).$mount('#app')
