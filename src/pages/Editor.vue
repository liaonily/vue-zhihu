<template lang="html">
  <div class="">
    <mt-header fixed title="主编">
      <mt-button icon="back" slot="left" @click="back"></mt-button>
    </mt-header>
    <div class="content" v-html="data">
    </div>
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
    this.fetchData()
  },
  methods: {
    fetchData () {
      axios.get('api/editor/' + this.$route.params.editorId + '/profile-page/ios').then(response => {
        this.data = this.attachBodyContent(response.data)
      })
    },
    back () {
      this.$router.go(-1)
    },
    // 修改返回数据中body的图片链接
    attachBodyContent (body) {
      return body.replace(/src="http\w{0,1}:\/\//g, 'src="https://images.weserv.nl/?url=')
    }
  }
}
</script>

<style lang="css" scoped>
.content {
  margin-top: 40px;
}
</style>
