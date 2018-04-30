<template lang="html">
  <div class="share">
    <span class="share-title">分享这篇内容</span>
    <div class="share-wrap">
      <div class="share-item">
        <i class="icon iconfont icon-weixinhaoyou"></i>
        <span>微信好友</span>
      </div>
      <div class="share-item">
        <i class="icon iconfont icon-weixinpengyouquan"></i>
        <span>微信朋友圈</span>
      </div>
      <div class="share-item">
        <i class="icon iconfont icon-QQ"></i>
        <span>QQ</span>
      </div>
      <div class="share-item">
        <i class="icon iconfont icon-weibo"></i>
        <span>新浪微博</span>
      </div>
      <div class="share-item">
        <i class="icon iconfont icon-fuzhi"></i>
        <span>复制链接</span>
      </div>
      <div class="share-item">
        <i class="icon iconfont icon-youdaoyunbiji"></i>
        <span>有道云笔记</span>
      </div>
      <div class="share-item">
        <i class="icon iconfont icon-yinxiangbiji"></i>
        <span>印象笔记</span>
      </div>
      <div class="share-item">
        <i class="icon iconfont icon-tengxunweibo"></i>
        <span>腾讯微博</span>
      </div>
    </div>
    <div class="button" @click="toggleCollect">{{$store.getters.collectText}}</div>
    <div class="button" @click="cancel">取消</div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    toggleCollect () {
      this.$store.dispatch('toggleCollect')
    }
  }
}
</script>

<style lang="css" scoped>
.share {
  width: 100%;
  height: 380px;
  background: #e9e9e9;
  text-align: center;
}
.share-title {
  display: block;
  font-size: 18px;
  color: #5a5a5a;
  padding: 10px 0;
}
.share-wrap {
  height: 210px;
  width: 330px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
}
.share-item {
  width: 25%;
  height: 75px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: #9b9b9b;
}
.share-item i {
  display: block;
  width: 50px;
  height: 50px;
  color: #fff;
  border-radius: 50%;
  line-height: 50px;
  font-size: 26px;
}
.icon-weixinhaoyou {
  background: #64c654;
}
.icon-weixinpengyouquan {
  background: #75cd37;
}
.icon-QQ {
  background: #286bc4;
}
.icon-weibo {
  background: #ec4226;
}
.icon-fuzhi {
  background: #dd472c;
}
.icon-youdaoyunbiji {
  background: #38a3ea;
}
.icon-yinxiangbiji {
  background: #5db346;
}
.icon-tengxunweibo {
  background: #3ea1d9;
}
.icon-xinxi {
  background: #4fe54e;
}
.icon-instapaper {
  background: #6c6c6c;
}
.button {
  width: 330px;
  height: 44px;
  margin: 16px auto;
  background: #fff;
  line-height: 44px;
  color: #949494;
}
</style>
