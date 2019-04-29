import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/video/list',
    method: 'get',
    params
  })
}
