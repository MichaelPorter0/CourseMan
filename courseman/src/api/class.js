import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/class/list',
    method: 'get',
    params
  })
}
