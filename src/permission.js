import router from '@/router'
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import store from '@/store'
import { notification } from 'ant-design-vue'
router.beforeEach((to, from, next) => {
  const token = storage.get(ACCESS_TOKEN)
  const whiteList = ['/empower']
  // 1. 判断是否登陆
  if (token) {
    // 2. 已经登陆，判断是否有用户信息
    const hasPermission = store.state.permissionList && store.state.permissionList.length
    if (hasPermission) {
      // 3. 有权限列表（用户信息存在）放行
      next()
    } else {
      // 3. 无权限列表（用户信息不存在）=》 请求用户信息接口获取权限列表
      store.dispatch('GetUserInfo')
        .then(res => {
          res.forEach(item => {
            router.addRoute(item)
          })
          // 请求带有 redirect 重定向时，登录自动重定向到该地址
          const redirect = decodeURIComponent(from.query.redirect || to.path)
          if (to.path === redirect) {
            // set the replace: true so the navigation will not leave a history record
            next({ ...to, replace: true })
          } else {
            // 跳转到目的路由
            next({ path: redirect })
          }
        })
        .catch(err => {
          notification.error({
            message: '错误',
            description: err.message
          })
          console.log(err)
        })
    }
  } else {
    // 2. 未登录，是否在白名单
    const flag = whiteList.includes(to.path)
    if (flag) {
      // 在白名单
      next()
    } else {
      // to.fullPath: 登陆之后跳转的地址
      next({ path: '/empower', query: { redirect: to.fullPath } })
    }
  }
  next()
})