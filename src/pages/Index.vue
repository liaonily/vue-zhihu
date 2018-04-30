<template lang="html">
  <div class="index">
    <welcome></welcome>
    <sidebar v-if="isShowSidebar" @hideSidebar="toggle" :scrollValue="top"></sidebar>
    <mt-loadmore :top-method="loadTop" :topDistance="40" ref="loadmore">
      <header>
        <i class="icon iconfont icon-fenlei" @click="toggle"></i>
        <span class="hot-news">今日热闻</span>
      </header>
      <swipe></swipe>
      <news-list ref="newsList"></news-list>
    </mt-loadmore>
  </div>
</template>

<script>
import Welcome from '../components/Welcome'
import Swipe from '../components/Swipe'
import NewsList from '../components/NewsList'
import Sidebar from '../components/Sidebar'

export default {
  data () {
    return {
      isShowSidebar: false,
      top: ''
    }
  },
  components: {
    Welcome,
    Swipe,
    NewsList,
    Sidebar
  },
  methods: {
    // 下拉刷新数据
    loadTop () {
      console.log(this.$refs)
      this.$refs.newsList.$emit('refresh')
      this.$refs.loadmore.onTopLoaded()
    },
    // 切换侧边栏显示状态
    toggle () {
      if (!this.isShowSidebar && this.$route.name === 'index') { // 禁止主页滚动
        this.top = document.scrollingElement.scrollTop
        document.body.style.position = 'fixed'
        document.body.style.top = -this.top + 'px'
      } else { // 取消主页滚动限制
        document.body.style.position = ''
        document.scrollingElement.scrollTop = this.top
      }
      this.isShowSidebar = !this.isShowSidebar
    }
  }
}
</script>

<style lang="css" scoped>
header {
  position: fixed;
  width: 100%;
  height: 32px;
  z-index: 5;
  color: #ddd;
  font-size: 22px;
  line-height: 32px;
}
.icon-fenlei {
  height: 100%;
  font-size: 30px;
  padding: 0 15px;
}
.hot-news {
  position: absolute;
  margin-left: -44px;
  left: 50%;
  top: 0;
  width: 88px;
}
</style>
