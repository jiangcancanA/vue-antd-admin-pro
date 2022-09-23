import Vue from 'vue'
import Vuex from 'vuex'
import storage from 'store'
import { loginApi, getUserInfoApi, logoutApi } from '@/api/login'
// import router from '@/router'

import { ACCESS_TOKEN, USER_INFO } from '@/store/mutation-types'
import { asyncRouterMap } from '@/router/router.config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    permissionList: [], // 获取权限列表
    routerList: [] // 用来存储用户可访问的页面， 真正的可访问的路由页面
  },
  getters: {
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setPermissiList(state, permissionList) {
      state.permissionList = permissionList
    },
    setRuterList(state, routerList) {
      state.routerList = routerList
    }
  },
  actions: {
    Login({ commit }, params) {
      return new Promise((resolve, reject) => {
        loginApi(params).then(res => {
          console.log(res)
          const { token, userInfo } = res.data
          storage.set(ACCESS_TOKEN, token, 7 * 24 * 60 * 60 * 1000)
          storage.set(USER_INFO, userInfo)
          commit('setUserInfo', userInfo)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },

    Logout({ commit }) {
      return new Promise((resolve, reject) => {
        logoutApi()
          .then(res => {
            storage.clearAll()
            commit('setUserInfo', {})
            commit('setPermissiList', [])
            commit('setRuterList', [])
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfoApi().then(res => {
          const data = res.data
          // 保存登录信息
          storage.set(USER_INFO, data)
          commit('setUserInfo', data)
          // 获取权限列表
          const { menu_perm } = data
          commit('setPermissiList', menu_perm)
          // menu_perm = ['home', 'sub', 'about']
          // 第一步 根据后台返回的权限过滤真实的路由列表
          const routerList = filterRouterList(asyncRouterMap, menu_perm)
          console.log(routerList)
          commit('setRuterList', routerList)
          // router.addRoute(routerList)
          resolve(routerList)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  modules: {
  }
})

function filterRouterList(list, menu_perm) {
  // menu_perm = ['home', 'sub', 'about']
  const routerList = list.filter(item => {
    // if (item.name === 'Index') return true
    if (item.meta && item.meta.per) {
      if (item.name === 'Index' || menu_perm.includes(item.meta.per)) {
        if (item.children && item.children.length) {
          item.children = filterRouterList(item.children, menu_perm)
          item.redirect = item.children[0].path
        }
        return true
      }
    }
    return false
  })
  return routerList
}
