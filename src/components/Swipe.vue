<template lang="html">
  <div class="swipe">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="topStory in topStories" :key="topStory.id" @click.native="viewDetail(topStory.id)">
        <img :src="attachImageUrl(topStory.image)" :alt="topStory.title">
        <span class="top-story-title">{{topStory.title}}</span>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      topStories: {}
    }
  },
  created () {
    // fetch()方法取数据
    // fetch(`/api/news/latest`).then(res => {
    //   console.log(res)
    //   return res.json()
    // }).then(data => {
    //   console.log(data)
    // })
    axios.get('api/news/latest')
      .then(response => {
        // console.log(response.data)
        this.topStories = response.data.top_stories
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    // 跳转到对应id的文章详情页
    viewDetail (id) {
      this.$router.push({ name: 'newsDetail', params: {id: id} })
    },
    // 修改图片链接
    attachImageUrl (srcUrl) {
      if (srcUrl !== undefined) { // 将http://p或https://p替换成图片缓存网站的链接
        return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'http://images.weserv.nl/?url=p')
      }
    }
  }
}
</script>

<style lang="css" scoped>
  .swipe {
    height: 220px;
    color: #fff;
    font-size: 20px;
  }
  .swipe img {
    width:100%;
    position: absolute;
    bottom: -75px;
  }
  .top-story-title {
    position: absolute;
    z-index: 2;
    bottom: 0;
    padding: 30px 20px;
    line-height: 25px;
  }
</style>
