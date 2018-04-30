export default {
  isFirstLoad: true,
  date: null, // 已加载到的文章日期
  stories: [], // 新闻内容数组
  ids: [], // 新闻id数组
  id: '', // 当前新闻详情的id
  nextId: '', // 下一篇新闻的id
  newsType: -1, // 新闻内容类型 0 普通新闻， 1 主题新闻， 2 收藏新闻
  isCollect: false, // 当前文章是否已收藏
  collectIds: [], // 收藏新闻数组id
  collectStories: [], // 收藏新闻数组
  comments: 0, // 评论总数
  long_comments: 0, // 长评论总数
  popularity: 0, // 点赞总数
  short_comments: 0, // 短评论总数
  themeIds: '', // 主题id
  currentThemeId: '' // 当前主题
}
