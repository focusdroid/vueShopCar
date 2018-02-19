import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Address from '../components/address.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: 'HelloWorld',component: HelloWorld},
    {path: '/address', name: 'Address', component: Address},
  ]
})
