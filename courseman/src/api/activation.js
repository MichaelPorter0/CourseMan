import request from '@/utils/request'

export function getCodeList(params) {
  return request({
    url: '/code/list',
    method: 'post',
    params
  })
}
/**
 * 创建一个激活码
 * @param {*} data
 */
export function CreateCode(data) {
  return request({
    url: '/code/add',
    method: 'post',
    data
  })
}
