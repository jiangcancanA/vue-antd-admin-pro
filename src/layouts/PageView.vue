<template>
  <div class="index">
    <div class="index-menu">
      <a-menu
        mode="inline"
        :inline-collapsed="collapsed"
        :selectedKeys="selectedKeys"
        :openKeys="openKeys"
        @openChange="openChange"
        @select="selectMenuItem"
      >
        <template v-for="item in routeList">
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
    <div class="index-layout">
      <div class="layout-header">11</div>
      <div class="layout-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      routeList: [],
      collapsed: false,
      selectedKeys: [],
      openKeys: []
    }
  },
  // beforeRouteUpdate(to, from, next) {
  //   console.log(to, from)
  //   next()
  // },
  created() {
    this.routeList = this.$router.options.routes[0].children
    this.selectedKeys = [this.$route.path]
    this.routeList.forEach(item => {
      if (item.children && item.children.length) {
        const bool = item.children.map(sub => sub.path).includes(this.$route.path)
        if (bool) this.openKeys = [item.path]
      }
    })
  },
  methods: {
    selectMenuItem(value) {
      this.$router.push({ path: value.key })
      this.selectedKeys = [value.key]
    },
    openChange(openKeys) {
      this.openKeys = openKeys
    }
  }
}
</script>
<style scoped lang="less">
.index {
  display: flex;
  width: 100vw;
  .index-menu {
    width: 200px;
    height: 500px;
    flex-shrink: 0;
    border: 1px solid #cccccc;
  }
  .index-layout {
    flex: 1;
    .layout-header {
      width: 100%;
      height: 100px;
      margin-bottom: 20px;
      background-color: pink;
    }
    .layout-main {
      width: 100%;
      min-height: 400px;
    }
  }
}
</style>
