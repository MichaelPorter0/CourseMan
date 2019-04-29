import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/activation/list',
    method: 'get',
    params
  })
}
export function create(params) {
  return request({
    url: '/activation/create',
    method: 'get',
    params
  })
}
