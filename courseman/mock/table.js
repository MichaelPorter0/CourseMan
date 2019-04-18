import Mock from 'mockjs'

export default {
  list: () => {
    const items = Mock.mock({
      'items|50': [{
        id: '@id',
        title: '@sentence(10, 20)',
        'status|1': ['published', 'draft', 'deleted'],
        'author|1': ['董俊武他哥哥段学宇', '马振领他哥哥段学宇', '高容昊他哥段学宇'],
        display_time: '@datetime',
        pageviews: '@integer(300, 5000)'
      }]
    })
    return {
      code: 20000,
      data: items
    }
  }
}
