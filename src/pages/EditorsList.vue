<template lang="html">
  <div class="eidtors-list">
    <header>
      <i class="icon iconfont icon-back" @click="back"></i>
      <span>主编</span>
    </header>
    <ul class="list" ref="editorsList">
      <li class="item" v-for="item in data" :key="item.id" @click="viewEditorProfile(item.id, item.name)">
      <img v-lazy.editorsList="attachImageUrl(item.avatar)" alt="avatar">
      <div class="wrap">
        <span class="name">{{item.name}}</span>
        <span class="bio">{{item.bio}}</span>
      </div>
      <i class="icon iconfont icon-more"></i>
      </li>
    </ul>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      data: ''
    }
  },
  created () {
    this.fectchData()
  },
  methods: {
    // 获取指定id主题下的编辑信息
    fectchData () {
      axios.get('api/theme/' + this.$route.params.id).then(response => {
        this.data = response.data.editors
      }).catch(error => {
        console.log(error)
      })
    },
    attachImageUrl (srcUrl) {
      if (srcUrl !== undefined) {
        return srcUrl.replace(/http\w{0,1}:\/\//g, 'https://images.weserv.nl/?url=')
      }
    },
    // 返回上一页
    back () {
      this.$router.go(-1)
    },
    // 跳转编辑详情页
    viewEditorProfile (id, name) {
      this.$router.push({ name: 'editor', params: { editorId: id, editorName: name } })
    }
  }
}
</script>

<style lang="css" scoped>
  header {
    position: fixed;
    width: 100%;
    height: 40px;
    font-size: 20px;
    color: #fff;
    line-height: 40px;
    background-color: #1ba3ea;
  }
  header .icon-back {
    font-size: 26px;
    padding: 0 15px;
  }
  header span {
    position: absolute;
    width: 44px;
    left: 50%;
    margin-left: -22px;
    top: 0;
  }
  .list {
    padding-top: 40px;
    padding-left: 0;
  }
  .item {
    height: 50px;
    border-bottom: 1px solid #ebebeb;
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
  }
  .item img {
    width: 35px;
    height: 35px;
    margin-top: 7.5px;
    border-radius: 50%;
    flex: none;
  }
  .wrap {
    flex: auto;
    margin-left: 15px;
    display: flex;
    flex-direction: column;
  }
  .wrap .name {
    font-size: 16px;
    padding-top: 10px;
  }
  .wrap .bio {
    color: #b0b0b0;
    font-size: 12px;
    letter-spacing: 2px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .item i {
    line-height: 50px;
    font-size: 22px;
  }

</style>
