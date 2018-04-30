<template lang="html">
  <div class="write-comment">
    <header>
      <i class="icon iconfont icon-back" @click="backToComment"></i>
      <span class="header-text">写评论</span>
      <span class="header-release" @click="release">发布</span>
    </header>
    <textarea rows="30" cols="50" placeholder="不友善言论会被删除，深度讨论会被优先展示"></textarea>
  </div>
</template>

<script>
export default {
  methods: {
    backToComment () {
      this.$router.go(-1)
    },
    release () {
      alert('发布评论')
    }
  }
}
</script>

<style lang="css" scoped>
  header {
    height: 45px;
    background: #1ba3ea;
    line-height: 45px;
    color: #fff;
    justify-content: space-between;
    text-align: center;
    display: flex;
    padding-right: 10px;
  }
  header .icon-back {
    width: 45px;
    font-size: 30px;
  }
  .header-text {
    font-size: 22px;
  }
  .header-release {
    font-size: 18px;
  }
  textarea {
    display: block;
    margin: 20px auto;
    font-size: 15px;
    color: #000;
  }
</style>
