<template lang="html">
  <div class="comment">
    <div class="head">
        {{$store.state.comments}}条点评
    </div>
    <long-comment></long-comment>
    <short-comment></short-comment>
    <div class="foot">
      <i class="icon iconfont icon-back" @click="backToDetail"></i>
      <i class="icon iconfont icon-bianxie" @click="writeComment">写评论</i>
    </div>
  </div>
</template>

<script>
import LongComment from '../components/LongComment'
import ShortComment from '../components/ShortComment'
export default {
  components: {
    LongComment,
    ShortComment
  },
  methods: {
    backToDetail () {
      this.$router.go(-1)
    },
    writeComment () {
      this.$router.push({ name: 'writeComment', params: { id: this.$store.state.id } })
    }
  }
}
</script>

<style scoped>
.head {
  position: fixed;
  top: 0;
  width: 100%;
  height: 40px;
  background: #1ba3ea;
  color: #fff;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  letter-spacing: 2px;
}
.foot {
  position: fixed;
  display: flex;
  bottom: 0;
  width: 100%;
  height: 40px;
  background: #3c3c3c;
  line-height: 40px;
}
.icon-back {
  flex: 0 0 50px;
  border-right: 1px solid #505050;
  color: #999;
  text-align: center;
  font-size: 30px;
}
.icon-bianxie {
  flex: 1 1 auto;
  color: #d3d3d3;
  font-size: 16px;
  text-align: center;
}

</style>
