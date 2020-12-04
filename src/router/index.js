import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import wmmInput from '@/components/wmmInput'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/wmmInput',
      name: 'wmmInput',
      component: wmmInput
    }
  ]
})
