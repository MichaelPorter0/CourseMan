import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/activation/list',
    method: 'get',
    params
  })
}
