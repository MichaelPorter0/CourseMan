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
 * 获取学生提交的作业
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
 * 批复一个作业
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
/**
 * 获取课节下已发布的作业
 * @param {*} data
 */
export function classHomeworkList(data) {
  return request({
    url: '/homework/class-homework-list',
    method: 'post',
    data,
    transformRequest: [ToFormData]
  })
}

/**
 * 删除课节下已发布的作业
 * @param {*} data
 */
export function deleteClassHomework(data) {
  return request({
    url: '/homework/delete',
    method: 'post',
    data,
    transformRequest: [ToFormData]
  })
}
