import Mock from 'mockjs'

export default {
  list: () => {
    const items = Mock.mock({
      'items|10': [{
        id: '@id',
        courseID: '@integer(1,10)',
        'teacher|1': ['段学宇', '马弟弟'],
        content: '@sentence(4, 6)',
        'be_used|1': ['used', 'unused'],
        create_time: '@datetime'
      }]
    })
    return {
      code: 20000,
      data: items
    }
  },
  create: () => {
    const item = Mock.mock({
      activation: '@sentence(1,1)'
    })
    return {
      code: 20000,
      data: item
    }
  }
}
