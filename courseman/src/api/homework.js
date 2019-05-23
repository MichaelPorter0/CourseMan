import request from '@/utils/request'
import { ToFormData } from '@/utils/toformdata'
/**
 * 发布作业
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
/**
 * 发布作业
 * @param {*} data
 */
export function studentHomeworkList(data) {
  return request({
    url: '/homework/student-homework-list',
    method: 'post',
    data,
    transformRequest: [ToFormData]
  })
}
/**
 * 获取一个作业
 * @param {*} data
 */
export function studentHomeworkInfo(data) {
  return request({
    url: '/homework/student-homework-info',
    method: 'post',
    data,
    transformRequest: [ToFormData]
  })
}
/**
 * 获取一个作业
 * @param {*} data
 */
export function feedback(data) {
  return request({
    url: '/homework/feedback',
    method: 'post',
    data,
    transformRequest: [ToFormData]
  })
}

