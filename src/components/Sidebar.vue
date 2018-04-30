<template lang="html">
  <div class="wrap">
    <div class="sidebar">
      <div class="top">
        <img src="../assets/avatar.jpg" alt="avatar" class="avatar">
        <span class="name">user</span>
      </div>
      <div class="menubar">
        <div @click="goCollect">
          <i class="icon iconfont icon-shoucang"></i><br>
          <span>收藏</span>
        </div>
        <div>
          <i class="icon iconfont icon-xiaoxi"></i><br>
          <span>消息</span>
        </div>
        <div>
          <i class="icon iconfont icon-shezhi"></i><br>
          <span>设置</span>
        </div>
      </div>
      <div class="menu-wrapper">
        <ul>
          <li class="menu-item" v-for="item in data" :key="item.id" @click="goTheme(item.id)">
            <i class="icon iconfont icon-shouyeshouye" v-if="item.id === -1"></i>
            {{item.name}}
            <i class="icon iconfont icon-more"></i>
          </li>
        </ul>
      </div>
      <div class="foot">
        <i class="icon iconfont icon-lixianwenjian">&nbsp;&nbsp;离线</i>
        <i class="icon iconfont icon-yejianmoshi">&nbsp;&nbsp;夜间</i>
      </div>
    </div>
    <div class="mask" @click="hideSidebar"></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['scrollValue'],
  data () {
    return {
      data: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    hideSidebar () {
      this.$emit('hideSidebar')
    },
    fetchData () {
      axios.get('api/themes').then(response => {
        this.data = response.data.others
        // 添加标题栏
        this.data.unshift({
          color: 0,
          thumbnail: '',
          description: '首页',
          id: -1,
          name: '首页'
        })
        let ids = response.data.others.map(item => item.id)
        this.$store.dispatch('addThemeId', ids)
      }).catch(error => {
        console.log(error)
      })
    },
    // 跳转收藏页
    goCollect () {
      this.hideSidebar()
      this.$router.push({name: 'collect'})
    },
    // 跳转主题页
    goTheme (id) {
      this.hideSidebar()
      this.$router.push({ name: 'theme', params: { id: id } })
    }
  }
}
</script>

<style lang="css" scoped>
.sidebar {
  position: fixed;
  width: 60%;
  height: 100%;
  top: 0;
  background: #232a30;
  color: #94999d;
  display: flex;
  flex-direction: column;
  z-index: 99;
}
.top {
  height: 60px;
  line-height: 60px;
  padding-left: 20px;
}
.avatar {
  width: 36px;
  line-height: 36px;
  border-radius: 50%;
  margin-right: 20px;
}
.menubar {
  height: 60px;
  display: flex;
  margin-bottom: 10px;

}
.menubar > div {
  width: 33.3%;
  text-align: center;
  line-height: 1.2;
}
.menubar .icon {
  font-size: 24px;
}
.menubar > div > span {
  transform: scale(.75);
  display: inline-block;
}
.menu-wrapper {
  padding: 0 20px;
  flex: auto;
  overflow: auto;
}
.menu-wrapper ul {
  padding: 0;
}
.menu-item {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
}
.menu-item .icon-shouyeshouye {
  font-size: 20px;
}
.menu-item .icon-more {
  float: right;
}
.mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.3;
  z-index: 10;
}
.foot {
  flex: 0 0 40px;
  line-height: 40px;
  text-align: center;
  display: flex;
}
.foot .icon {
  width: 50%;
  font-size: 16px;
}
</style>
