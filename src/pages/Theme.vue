<template lang="html">
  <div class="theme">
    <header v-lazy:background="attachImageUrl(data.image)">
      <i class="icon iconfont icon-back" @click="backIndex"></i>
      <span class="title">{{data.name}}</span>
      <i class="icon iconfont icon-moreunfold" @click="next"></i>
    </header>
    <div class="editors" @click="showEditors()">
      <span class="text">主编</span>
      <img v-for="editor in data.editors" v-lazy="attachImageUrl(editor.avatar)" :key="editor.id" alt="">
      <i class="icon iconfont icon-more"></i>
    </div>
    <ul class="list" ref="list">
      <li class="list-item" v-for="story in stories" :key="story.id" @click="viewDetail(story.id)">
        <span> {{story.title}}</span>
        <img v-if="story.images" v-lazy.list="attachImageUrl(story.images[0])" :alt="story.title">
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      id: '',
      data: {},
      stories: []
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'reload'
  },
  methods: {
    fetchData () {
      this.id = this.$route.params.id
      axios.get('api/theme/' + this.id).then(response => {
        this.data = response.data
        this.stories = response.data.stories
      }).catch(error => {
        console.log(error)
      })
    },
    // 获取图片链接
    attachImageUrl (srcUrl) {
      if (srcUrl !== undefined) {
        return srcUrl.replace(/http\w{0,1}:\/\//g, 'https://images.weserv.nl/?url=')
      }
    },
    // 跳转到对应id的文章详情页
    viewDetail (id) {
      this.$store.state.currentThemeId = this.id
      this.$store.dispatch('changeCurrentNewsId', id)
      this.$store.dispatch('changeNewsType', 1)
      this.$router.push({ name: 'newsDetail', params: { id: id } })
    },
    // 如果地址改变，重新获取页面
    reload () {
      this.fetchData()
    },
    // 返回首页
    backIndex () {
      this.$router.push({name: 'index'})
    },
    // 下一个主题
    next () {
      let ids = this.$store.state.themeIds
      let index = ids.indexOf(this.id)
      this.$router.push({ name: 'theme', params: { id: ids[++index] } })
    },
    // 跳转主编页
    showEditors () {
      this.$router.push({ name: 'editorsList', params: { id: this.id } })
    }
  }
}
</script>

<style lang="css" scoped>
header {
  height: 45px;
  position: relative;
  color: #fff;
  line-height: 45px;
  font-size: 20px;
  background-position: center center !important;
  display: flex;
  justify-content: space-between;
}
.icon {
  font-size: 24px;
  margin: 0 10px;
}
.editors {
  height: 45px;
  padding: 0 15px;
  line-height: 45px;
  color: #585858;
  border-bottom: 1px solid #e5e5e5;
}
.editors img {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-left: 15px;
  margin-bottom: 5px;
}
.editors .icon {
  float: right;
}
.list {
   padding: 0;
}
.list-item {
  height: 90px;
  margin: 0 15px;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  justify-content: space-between;
}
.list-item span {
  display: inline-block;
  width: 70%;
  padding-top: 15px;
}
.list-item img {
  width: 75px;
  height: 60px;
  padding-top: 15px;
}
</style>
