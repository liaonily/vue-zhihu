<template lang="html">
  <div class="news-menu">
    <ul class="menu-wrap">
      <li class="menu-item" @click="goBack">
        <i class="icon iconfont icon-back"></i>
      </li>
      <li class="menu-item" @click="goNext">
        <i class="icon iconfont icon-moreunfold"></i>
      </li>
      <li class="menu-item" @click="thumbUp" :class="{'dianzan-active': isDianzan}">
        <i class="icon iconfont icon-dianzan"></i>
        <span class="dianzan-number">{{$store.state.popularity}}</span>
      </li>
      <li class="menu-item" @click="showMenu">
        <i class="icon iconfont icon-fenxiang"></i>
      </li>
      <li class="menu-item" @click="showComment">
        <i class="icon iconfont icon-pinglun"></i>
        <span class="comments-number">{{$store.state.comments}}</span>
      </li>
    </ul>
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
      position="bottom">
      <share @cancel="hideMenu"></share>
    </mt-popup>
  </div>
</template>

<script>
import axios from 'axios'
import Share from './Share'

export default {
  data () {
    return {
      isDianzan: false, // 是否已点赞
      popupVisible: false // 分享组件是否展示
    }
  },
  components: {
    Share
  },
  created () {
    this.fetchStoryExtra()
  },
  watch: {
    // 如果路由有变化，会重新下载内容
    '$route': 'reloadId'
  },
  methods: {
    fetchStoryExtra () {
      axios.get('api/story-extra/' + this.$store.state.id)
        .then(response => {
          // console.log(response.data)
          this.$store.state.comments = response.data.comments
          this.$store.state.long_comments = response.data.long_comments
          this.$store.state.short_comments = response.data.short_comments
          this.$store.state.popularity = response.data.popularity
        })
        .catch(error => {
          console.log(error)
        })
    },
    reloadId () {
      this.$emit('reloadId')
      this.fetchStoryExtra()
    },
    // 返回上一页
    goBack () {
      let type = this.$store.state.newsType
      if (type === 0) { // 普通新闻
        this.$router.push({ name: 'index' })
      } else if (type === 1) { // 主题新闻
        this.$router.push({ name: 'theme', params: { id: this.$store.state.currentThemeId } })
      } else { // 收藏新闻
        this.$router.push({ name: 'collect' })
      }
    },
    // 载入下一篇新闻
    goNext () {
      this.$router.push({ name: 'newsDetail', params: {id: this.$store.state.nextId} })
    },
    // 点赞事件
    thumbUp () {
      if (!this.isDianzan) {
        this.$store.state.popularity++
      } else {
        this.$store.state.popularity--
      }
      this.isDianzan = !this.isDianzan
    },
    // 展示分享菜单组件
    showMenu () {
      this.popupVisible = true
    },
    // 隐藏分享组件
    hideMenu () {
      this.popupVisible = false
    },
    // 查看评论界面
    showComment () {
      this.$router.push({name: 'comment', params: {id: this.$store.state.id}})
    }
  }
}
</script>

<style lang="css" scoped>
.news-menu {
  position: fixed;
  width: 100%;
  height: 44px;
 left: 0;
 bottom: 0;
}
.menu-wrap {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0;
  text-align: center;
  line-height: 44px;
  border-top: 1px solid #f5f5f5;
  background: #fff;
}
.menu-item {
  position: relative;
  width: 20%;
  color: #999;
}
.menu-item i {
  font-size: 24px;
}
.dianzan-number {
  position: absolute;
  top: 8px;
  right: 6px;
  width: 24px;
  height: 14px;
  font-size: 12px;
}
.comments-number {
  position: absolute;
  top: 8px;
  right: 6px;
  width: 24px;
  height: 14px;
  font-size: 12px;
}
.dianzan-active {
  color: #2eb5ee;
}
.mint-popup {
  width: 100%;
}
</style>
