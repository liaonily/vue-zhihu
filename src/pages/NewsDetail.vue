<template lang="html">
  <div class="newsDetail">
    <div class="top-wrapper">
      <img v-lazy="attachImageUrl(data.image)" :alt="data.title">
      <span class="top-title">{{data.title}}</span>
      <span class="image-source">图片： {{data.image_source}}</span>
    </div>
    <div class="body-wrap" v-html="this.data.body"></div>
    <div class="button">
      <button type="button" name="button" @click="goRecommenders($store.state.id)">推荐人</button>
    </div>
    <news-menu @reloadId="fetchData"></news-menu>
  </div>
</template>

<script>
import axios from 'axios'
import NewsMenu from '../components/NewsMenu'
import '../../static/css/news_qa.auto.css'
export default {
  data () {
    return {
      data: {}
    }
  },
  components: {
    NewsMenu
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      let id = this.$route.params.id
      axios.get('api/news/' + id)
        .then(response => {
          // console.log(response.data)
          this.data = response.data
          response.data.body = this.attachBodyImageUrl(response.data.body)
        })
        .catch(error => {
          console.log(error)
        })
      this.$store.dispatch('changeCurrentNewsId', id)
      this.$store.dispatch('judgeCollectState')
    },
    // 修改图片链接
    attachImageUrl (srcUrl) {
      if (srcUrl !== undefined) {
        return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
      }
    },
    // 修改返回数据中的body中的图片链接
    attachBodyImageUrl (body) {
      return body.replace(/src="http\w{0,1}:\/\//g, 'src="https://images.weserv.nl/?url=')
    },
    // 去推荐人页面
    goRecommenders (id) {
      this.$router.push({ name: 'recommenders', params: { id: id } })
    }
  }
}
</script>

<style lang="css" scoped>
  .top-wrapper {
    height: 200px;
    position: relative;
    overflow-y: hidden;
    z-index: 99;
  }
  .top-wrapper img {
    position: absolute;
    bottom: -75px;
    width: 100%;
  }
  .top-title {
    position: absolute;
    top: 80px;
    padding: 30px 20px;
    line-height: 25px;
    color: #fff;
    font-size: 22px;
  }
  .image-source {
    position: absolute;
    right: 8px;
    bottom: 10px;
    font-size: 12px;
    color: #ccc;
  }
  .body-wrap {
    position: absolute;
    width: 100%;
    top: 0;
    padding-bottom: 44px;
  }
  .button {
    position: absolute;
    z-index: 99;
    float: right;
    top: 10px;
    right: 12px;
    height: 30px;
    line-height: 30px;
  }
  button {
    background-color: #777;
    border-radius: 20%;
    color: #fff;
    border: none;
    opacity: 0.5;
  }
</style>
