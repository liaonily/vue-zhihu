<template lang="html">
  <div class="collet">
    <mt-header fixed title="收藏">
      <mt-button icon="back" slot="left" @click="back"></mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <ul class="list" ref="colletList">
      <li class="list-item" v-for="story in $store.state.collectStories" :key="story.id" @click="viewDetail(story.id)">
        <span>{{story.title}}</span>
        <div class="image-wrapper">
          <img v-lazy.colletList="attachImageUrl(story.images[0])" :alt="story.title">
          <i class="icon iconfont icon-duotu multipic" v-if="story.multipic">多图</i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    attachImageUrl (srcUrl) {
      if (srcUrl !== undefined) {
        return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
      }
    },
    back () {
      this.$router.push({ name: 'index' })
    },
    viewDetail (id) {
      this.$store.dispatch('changeCurrentNewsId', id)
      this.$store.dispatch('changeNewsType', 2)
      this.$router.push({ name: 'newsDetail', params: { id: id } })
    }
  }
}
</script>

<style lang="css" scoped>
.list {
  margin-top: 40px;
  padding: 0;
  display: flex;
  flex-direction: column;
}
.list-item {
  height: 90px;
  margin: 0 10px;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  justify-content: space-around;
}
.list-item > span {
  width: 70%;
  padding-top: 15px;
  line-height: 20px;
}
.image-wrapper {
  position: relative;
  padding-top: 15px;
}
.image-wrapper img {
  width: 75px;
  height: 60px;
}
.multipic {
  display: block;
  position: absolute;
  right: 0;
  bottom: 15px;
  width: 40px;
  height: 16px;
  font-size: 12px;
  color: #fff;
  background: #000;
  opacity: .7;
  line-height: 16px;
}
</style>
