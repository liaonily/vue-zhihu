<template>
  <div class="news-list">
    <ul class="list"
      ref=newsList
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-immediate-check=false
      infinite-scroll-distance="40">
      <li class="list-item" v-for="story in $store.state.stories" :key="story.id" @click="viewDetail(story.id)">
        <span class="item-title">{{story.title}}</span>
        <div class="image-wrapper">
          <img class="item-image" v-lazy.newsList="attachImageUrl(story.images[0])" :alt="story.title">
          <i class="icon iconfont icon-duotu multipic" v-if="story.multipic">多图</i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import { Indicator } from 'mint-ui'
export default {
  data () {
    return {
      date: null,
      loading: false,
      dateStr: '' // 加载数组日期字符串格式
    }
  },
  created () {
    // 判断是否是第一次进入首页
    if (this.$store.state.isFirstLoad) {
      this.fetchData()
      this.$store.dispatch('changeLoadState') // 修改是否第一次进入首页的状态
      this.initDate()
    } else {
      let storeDate = new Date()
      storeDate.setDate(this.$store.state.date.getDate())
      this.date = storeDate
      this.changeDateToString()
    }
  },
  mounted () {
    // 下拉刷新数据
    this.$on('refresh', () => {
      this.refreshData()
    })
  },
  methods: {
    // 修改图片链接
    attachImageUrl (srcUrl) {
      if (srcUrl !== undefined) { // 将http://p或https://p替换成图片缓存网站的链接
        return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'http://images.weserv.nl/?url=p')
      }
    },
    // 获取最新新闻数据列表
    fetchData () {
      axios.get('api/news/latest')
        .then(response => {
        // 初始化新闻内容和id数组，并添加进state
          console.log(response.data)
          let stories = response.data.stories
          let ids = stories.map(story => story.id)
          this.$store.dispatch('addNews', {
            stories: stories,
            ids: ids
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 初始化当前日期
    initDate () {
      this.date = new Date()
      this.$store.state.date = this.date
      this.changeDateToString()
    },
    // 将Date类型的日期转换成String类型
    changeDateToString () {
      let year = this.date.getFullYear()
      let month = this.date.getMonth() + 1
      let day = this.date.getDate()
      month = month < 10 ? '0' + month : month // 格式化月份，小于10前置0
      day = day < 10 ? '0' + day : day // 格式化日期，小于10前置0
      this.dateStr = year + month + day
    },
    // 将日期前推一天
    decreaseDate () {
      this.date.setDate(this.date.getDate() - 1)
      this.$store.state.date = this.date
      this.changeDateToString()
    },
    // 刷新数据
    refreshData () {
      this.$store.dispatch('refreshNews')
      this.initDate()
      this.$nextTick(() => {
        this.fetchData()
      })
    },
    // 根据日期获取更多新闻数据
    fetchMoreData () {
      // console.log(this.date)
      axios.get('api/news/before/' + this.dateStr)
        .then(response => {
          console.log(response.data)
          let stories = response.data.stories
          let ids = stories.map(story => story.id)
          this.$store.dispatch('addNews', {
            stories: stories,
            ids: ids
          })
          // 合并完数据关闭加载提示框
          Indicator.close()
        })
        .catch(error => {
          console.log(error)
        })
      this.decreaseDate()
    },
    loadMore () {
      this.loading = true
      // 打开加载提示框
      Indicator.open({
        spinnerType: 'fading-circle'
      })
      // 加载更多数据并更新DOM
      this.$nextTick(function () {
        this.fetchMoreData()
      })
      this.loading = false
    },
    viewDetail (id) {
      // 跳转到对应id的文章详情页
      this.$store.dispatch('changeNewsType', 0)
      this.$router.push({ name: 'newsDetail', params: {id: id} })
    }
  }
}
</script>

<style lang="css" scoped>
.list {
  padding: 0;
  margin: 0;
}
.list-item {
  height: 90px;
  margin: 0 15px;
  border-bottom: 1px solid #f5f5f5;
  list-style: none;
}
.item-title {
  display: inline-block;
  width: 70%;
  padding-top: 15px;
  line-height: 20px;
}
.image-wrapper {
  position: relative;
  float: right;
  padding-top: 15px;
}
.item-image {
  width: 75px;
  height:  60px;
}
.multipic{
  display: block;
  position: absolute;
  right: 0;
  bottom: 2px;
  width: 40px;
  height: 16px;
  font-size: 12px;
  color: #fff;
  background: #000;
  opacity: .7;
  text-align: center;
  line-height: 16px;
}

</style>
