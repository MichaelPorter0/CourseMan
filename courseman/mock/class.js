import Mock from 'mockjs'

export default {
  list: () => {
    const items = Mock.mock({
      'items|5': [{
        id: '@id',
        title: '@sentence(4, 6)',
        'status|1': ['published', 'draft', 'deleted'],
        Begin_time: '@datetime',
        studentnum: '@integer(10,50)'
      }]
    })
    return {
      code: 20000,
      data: items
    }
  }
}
