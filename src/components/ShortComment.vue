<template lang="html">
  <div class="short-comment">
    <div class="short-comment-number" v-show="comments.length" @click="toggleShortComment">
      {{$store.state.short_comments}}条短评
      <i class="icon iconfont" :class="[isHide ? 'icon-downdouble' : 'icon-updouble']"></i>
    </div>
    <ul class="comment-list"  ref="shortCommentList" :class="{hide: isHide}">
      <li class="comment-item" v-for="comment in comments" :key="comment.id">
        <img v-lazy.shortCommentList="attachImageUrl(comment.avatar)" :alt="comment.author" class="avatar">
        <div class="comment-content">
          <span class="author">{{comment.author}}</span>
          <i class="icon iconfont icon-dianzan">{{comment.likes}}</i>
          <p class="text">{{comment.content}}</p>
          <p class="reply" v-if="comment.reply_to">
            <span class="reply-author">//{{comment.reply_to.author}}:</span>
            {{comment.reply_to.content}}
          </p>
          <span class="date">{{changeTime(comment.time)}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      comments: [],
      isHide: true
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      axios.get('api/story/' + this.$store.state.id + '/short-comments')
        .then(response => {
          // console.log(response.data)
          this.comments = response.data.comments
        }).catch(error => {
          console.log(error)
        })
    },
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
    },
    toggleShortComment () {
      this.isHide = !this.isHide
    }
  }
}
</script>

<style lang="css" scoped>
.short-comment {
  margin-bottom: 40px;
}
.hide {
  display: none;
}
.short-comment-number {
  font-size: 16px;
  color: #333;
  line-height: 1.5em;
  font-weight: 700;
  border-bottom: 1px solid #eee;
  padding: 9px 20px;
  margin: 0;
}
.icon {
  font-size: 22px;
  float: right;
}
.comment-list {
  padding: 0;
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
  padding-left: 20px;
}
.author {
  font-size: 19px;
  color: #000;
  font-weight: 400;
}
.icon-dianzan {
  font-size: 15px;
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
