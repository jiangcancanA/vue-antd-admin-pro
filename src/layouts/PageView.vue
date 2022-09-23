<template>
  <div class="index">
    <a-layout class="index-layout">
      <a-layout-sider class="layout-menu" v-model="collapsed" :trigger="null" collapsible>
        <div class="menu-logo">
          <div class="logo-img">
            <img src="../assets/images/logo.png" alt="">
          </div>
          <div class="logo-name" v-if="!collapsed">阿吉的后台管理系统</div>
        </div>
        <div class="menu-wrap">
          <a-menu
            mode="inline"
            :selectedKeys="selectedKeys"
            :openKeys="openKeys"
            @openChange="openChange"
            @select="selectMenuItem"
          >
            <template v-for="item in menuList">
              <a-sub-menu v-if="item.children && item.children.length" :key="item.path">
                <span slot="title">
                  <a-icon :type="item.meta.icon" />
                  <span>{{item.meta.title}}</span>
                </span>
                <a-menu-item v-for="subItem in item.children" :key="subItem.path">
                  <a-icon :type="subItem.meta.icon" />
                  <span>{{subItem.meta.title}}</span>
                </a-menu-item>
              </a-sub-menu>
              <a-menu-item v-else :key="item.path">
                <a-icon :type="item.meta.icon" />
                <span>{{item.meta.title}}</span>
              </a-menu-item>
            </template>
          </a-menu>
        </div>
      </a-layout-sider>
      <a-layout class="layout-content">
        <a-layout-header class="content-header">
          <div class="header-left">
            <div class="left-fold" @click="toggleCollapsed">
              <a-icon v-if="collapsed" type="menu-unfold" />
              <a-icon v-else  type="menu-fold" />
            </div>
          </div>
          <div class="header-right">
            <a-dropdown placement="bottomRight">
              <div class="right-user">111111111</div>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;">个人信息</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;" @click="openLogout">退出登陆</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
        </a-layout-header>
        <a-layout-content>
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
// import store from '@/store'
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      menuList: [],
      collapsed: false,
      selectedKeys: [],
      openKeys: []
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.menuList = this.routerList[0].children
    this.selectedKeys = [to.path]
    this.menuList.forEach(item => {
      if (item.children && item.children.length) {
        const bool = item.children.map(sub => sub.path).includes(to.path)
        if (bool) this.openKeys = [item.path]
      }
    })
    next()
  },
  computed: {
    ...mapState(['routerList'])
  },
  created() {
    this.menuList = this.routerList[0].children
    this.selectedKeys = [this.$route.path]
    this.menuList.forEach(item => {
      if (item.children && item.children.length) {
        const bool = item.children.map(sub => sub.path).includes(this.$route.path)
        if (bool) this.openKeys = [item.path]
      }
    })
  },
  methods: {
    ...mapActions(['Logout']),
    selectMenuItem(value) {
      this.$router.push({ path: value.key })
      this.selectedKeys = [value.key]
    },
    openChange(openKeys) {
      this.openKeys = openKeys
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    },
    openLogout() {
      const that = this
      this.$confirm({
        title: '退出?',
        content: h => <div style="color:red;">是否确认退出登录</div>,
        okText: '确定',
        cancelText: '取消',
        onOk() {
          that.Logout()
            .then(res => {
              // that.$router.push({ path: '/' })
              window.location.reload()
            })
            .catch(err => {
              that.$notification.error({
                message: '错误',
                description: err.message
              })
            })
        },
        onCancel() {}
      })
    }
  }
}
</script>
<style scoped lang="less">
.index {
  width: 100vw;
  .index-layout {
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    .layout-menu {
      // width: 256px;
      // flex: 0 0 256px;
      background-color: #fff;
      .menu-logo {
        display: flex;
        align-items: center;
        // justify-content: center;
        width: 100%;
        height: 64px;
        padding-left: 25px;
        .logo-img {
          width: 24px;
          height: 24px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .logo-name {
          flex: 1;
          padding: 0 8px;
          color: #333333;
          font-size: 14px;
          font-weight: 600;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .menu-wrap {
        width: 100%;
        max-height: calc(100vh - 64px);
        overflow-y: auto;
        overflow-x: hidden;
        :deep(.ant-menu-vertical) {
          border-right: none;
        }
      }
    }
    .layout-content {
      flex: 1;
      .content-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        padding: 0 24px;
        .header-left {
          // width: 50%;
          .anticon {
            font-size: 18px;
            cursor: pointer;
          }
        }
        .header-right {
          // width: 50%;
          text-align: right;
          .right-user:hover {
            background-color: #f2f2f2;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
