/**
 * @desc 权限路由
 * @desc 走导航的路由都在根路由/里，走BasicLayout基础布局
 * @desc 走导航的可以通过hidden来控制显示隐藏
 * @desc 不走导航的和根路由/放在同级，可以使用其他layout布局
 * @desc 不需要权限验证但需登录的在meta里设置isAuth为false
 * @desc 不需登录的放在基础路由里，并放在权限控制的whiteList白名单里
 * @desc */

import { PageView, RouterView } from '@/layouts'
const Home = () => import(/* webpackChunkName: 'home' */ '@/views/home')
const Mine = () => import(/* webpackChunkName: 'mine' */ '@/views/mine')
const About = () => import(/* webpackChunkName: 'about' */ '@/views/about')
const Set = () => import(/* webpackChunkName: 'set' */ '@/views/set')

const Empower = () => import(/* webpackChunkName: 'empower' */ '@/views/empower')
const Exception = () => import(/* webpackChunkName: 'exception' */ '@/views/exception')

export const asyncRouterMap = [
  {
    path: '/',
    name: 'Index',
    component: PageView,
    // redirect: '/home',
    meta: { per: 'index' },
    hidden: false,
    children: [
      {
        path: '/home',
        // name: 'Home',
        meta: { title: '首页', icon: 'api', per: 'home' },
        hidden: false,
        component: RouterView,
        // redirect: '/home/sub',
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
        path: '/about',
        name: 'About',
        hidden: false,
        meta: { title: '关于我们', icon: 'api', per: 'about' },
        component: About
      },
      {
        path: '/set',
        name: 'Set',
        hidden: false,
        meta: { title: '设置', icon: 'api', per: 'set' },
        component: Set
      }
    ]
  },
  {
    path: '/mine',
    name: 'Mine',
    hidden: false,
    meta: { title: '我的', icon: 'api', per: 'mine' },
    component: Mine
  }
]

// 基础路由
export const constantRouterMap = [
  {
    path: '/empower',
    name: 'Empower',
    component: Empower
  },
  // 异常处理
  {
    path: '/exception',
    name: 'Exception',
    component: Exception
  }
]