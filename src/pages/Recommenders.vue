<template lang="html">
  <div class="">
    <mt-header fixed title="推荐人">
      <mt-button icon="back" slot="left" @click="back"></mt-button>
    </mt-header>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      axios.get('api/story/' + this.$route.params.id + '/recommenders').then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
