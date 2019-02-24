import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index'
import home from '../components/home/home'
import recommendList from '../components/songList/recommendList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/recommendList',
      name: 'recommendList',
      component: recommendList
    }
  ]
})
