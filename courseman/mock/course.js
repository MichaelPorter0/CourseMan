import Mock from 'mockjs'

export default {
  list: () => {
    const items = Mock.mock({
      'items|50': [{
        id: '@id',
        title: '@sentence(10, 20)',
        'status|1': ['published', 'draft', 'deleted'],
        'author|1': ['段学宇', '段老师', '段爷'],
        Begin_time: '@datetime',
        coursenum: '@integer(1, 30)',
        studentnum: '@integer(10,50)'
      }]
    })
    return {
      code: 20000,
      data: items
    }
  },
  video: () => {
    const items = Mock.mock({
      'items|5': [{
        id: '@id',
        title: '@sentence(10, 20)',
        url: '@sentence(10, 20)'
      }]
    })
    return {
      code: 20000,
      data: items
    }
  }

}
