import request from '@/utils/request'
import { ToFormData } from '@/utils/toformdata'
/**
 * 修改课节
 * @param {*} data
 */
export function PubHomework(data) {
  return request({
    url: '/homework/release',
    method: 'post',
    data,
    transformRequest: [ToFormData]
  })
}
