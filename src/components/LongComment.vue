<template lang="html">
  <div class="long-comment">
    <div class="long-comment-number">
      {{$store.state.long_comments}}条长评
    </div>
    <ul class="comment-list" ref="longCommentList">
      <i class="icon iconfont icon-shafa"></i>
      <li class="comment-item" v-for="comment in comments" :key="comment.id">
        <img v-lazy.longCommentList="attachImageUrl(comment.avatar)" :alt="comment.author" class="avatar">
        <div class="comment-content">
          <span class="author">{{comment.author}}</span>
          <i class="icon iconfont icon-dianzan">{{comment.likes}}</i>
          <p class="text">{{comment.content}}</p>
          <p class="reply" v-if="comment.reply_to">
            <span class="reply-author">//{{comment.reply_to.author}} ：</span>
            {{comment.reply_to.content}}
          </p>
          <span class="date">{{changeTime(comment.time)}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>.

<script>
import axios from 'axios'
export default {
  data () {
    return {
      comments: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    // 获取长评数据
    fetchData () {
      axios.get('api/story/' + this.$store.state.id + '/long-comments')
        .then(response => {
          // console.log(response.data)
          this.comments = response.data.comments
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 修改图片链接
    attachImageUrl (srcUrl) {
      if (srcUrl !== undefined) {
        return srcUrl.replace(/http\w{0,1}:\/\//g, 'https://images.weserv.nl?url=')
      }
    },
    // 转换时间戳
    changeTime (time) {
      let t = new Date(time)
      let month = t.getMonth() + 1
      let day = t.getDate()
      let hour = t.getHours()
      let minute = t.getMinutes()
      month = month < 10 ? '0' + month : month // 格式化月份，小于10前置0
      day = day < 10 ? '0' + day : day // 格式化日期，小于10前置0
      hour = hour < 10 ? '0' + hour : hour
      hour = minute < 10 ? '0' + minute : minute
      return month + '-' + day + ' ' + hour + ':' + minute
    }
  }
}
</script>

<style scoped lang="css">
.long-comment {
  margin-top: 40px;
}
.long-comment-number {
  font-size: 16px;
  color: #333;
  line-height: 1.5em;
  font-weight: 700;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 9px 20px;
}
.comment-list {
  padding: 0;
}
.icon-shafa {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -90px;
  margin-top: -90px;
  font-size: 180px;
  color: #e4e4e4;
  display: none;
}
.comment-item {
  display: flex;
  font-size: 15px;
  color: #666;
  border-bottom: 1px solid #eee;
  padding: 20px;
}
.avatar {
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.comment-content {
  flex: 1;
  padding-left: 10px;
}
.author {
  font-size: 19px;
  color:#000;
  font-weight: 400;
}
.icon-dianzan {
  float: right;
  color: #b4b4b4;
}
.text {
  margin: 10px 0 !important;
  line-height: 18px;
}
.reply {
  margin: 10px 0 !important;
  color: #929292;
  line-height: 18px;
}
.reply-author {
  color: #000;
}
.date {
  color: #ccc;
}
</style>
