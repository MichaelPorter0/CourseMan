import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/course/list',
    method: 'get',
    params
  })
}
export function fetchList(query) {
  return request({
    url: '/course/videolist',
    method: 'get',
    params: query
  })
}
