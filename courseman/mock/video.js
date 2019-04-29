import Mock from 'mockjs'

export default {
  list: () => {
    const items = Mock.mock({
      'items|50': [{
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
