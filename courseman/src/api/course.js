import request from '@/utils/request'
import { ToFormData } from '@/utils/toformdata'
/**
 * 获取课程列表
 * @param {*} data
 */
export function getCourseList() {
  return request({
    url: '/course/list-all',
    method: 'post'
  })
}
/**
 * 获取课程详细信息
 * @param {*} course_id
 */
export function getDetail(data) {
  return request({
    url: '/course/info',
    method: 'post',
    data,
    transformRequest: [ToFormData]
  })
}

/**
 * 获取课程课节的信息
 * @param {*} id
 */
export function getChapter(data) {
  return request({
    url: '/class/info',
    method: 'post',
    data,
    transformRequest: [ToFormData]
  })
}

/**
 * 获取课程课节的信息
 * @param {*} id
 */
export function updateCourse(data) {
  return request({
    url: '/course/update',
    method: 'post',
    data,
    transformRequest: [ToFormData]
  })
}
export function fetchList(params) {
  return request({
    url: '/course/info',
    method: 'get',
    params
  })
}
