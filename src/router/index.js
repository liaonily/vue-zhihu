import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import NewsDetail from '@/pages/NewsDetail'
import Comment from '@/pages/Comment'
import WriteComment from '@/pages/WriteComment'
import Collect from '@/pages/Collect'
import Theme from '@/pages/Theme'
import EditorsList from '@/pages/EditorsList'
import Editor from '@/pages/Editor'
import Recommenders from '@/pages/Recommenders'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/newsDetail/:id',
      name: 'newsDetail',
      component: NewsDetail
    },
    {
      path: '/comment/:id',
      name: 'comment',
      component: Comment
    },
    {
      path: '/writeComment/:id',
      name: 'writeComment',
      component: WriteComment
    },
    {
      path: '/collect',
      name: 'collect',
      component: Collect
    },
    {
      path: '/theme/:id',
      name: 'theme',
      component: Theme
    },
    {
      path: '/editorsList/:id',
      name: 'editorsList',
      component: EditorsList
    },
    {
      path: '/editor/:editorId/:editorName',
      name: 'editor',
      component: Editor
    },
    {
      path: '/recommenders/:id',
      name: 'recommenders',
      component: Recommenders
    }
  ]
})
