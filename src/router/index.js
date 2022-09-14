import Vue from 'vue'
import VueRouter from 'vue-router'
import { PageView, RouterView } from '@/layouts'
const Home = () => import(/* webpackChunkName: 'home' */ '@/views/home')
const Mine = () => import(/* webpackChunkName: 'mine' */ '@/views/mine')
const About = () => import(/* webpackChunkName: 'about' */ '@/views/about')
const Set = () => import(/* webpackChunkName: 'set' */ '@/views/set')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: PageView,
    redirect: '/home',
    children: [
      {
        path: '/home',
        // name: 'Home',
        meta: { title: '首页', icon: 'api', per: 'home' },
        // hidden: false,
        component: RouterView,
        redirect: '/home/sub',
        children: [
          {
            path: '/home/sub',
            name: 'Sub',
            component: Home,
            meta: { title: '子导航', icon: 'api', per: 'sub' }
          }
        ]
      },
      {
        path: '/mine',
        name: 'Mine',
        meta: { title: '我的', icon: 'api', per: 'sub' },
        component: Mine
      },
      {
        path: '/about',
        name: 'About',
        meta: { title: '关于我们', icon: 'api', per: 'sub' },
        component: About
      },
      {
        path: '/set',
        name: 'Set',
        meta: { title: '设置', icon: 'api', per: 'sub' },
        component: Set
      }
    ]
  }
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/mine',
  //   name: 'Mine',
  //   component: Mine
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: About
  // },
  // {
  //   path: '/set',
  //   name: 'Set',
  //   component: Set
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
