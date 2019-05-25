import request from '@/utils/request'
import { ToFormData } from '@/utils/toformdata'
/**
 * 获取通知列表
 * @param {*} data
 */
export function getNotifyList() {
  return request({
    url: '/show/notify/list',
    method: 'post'
  })
}

/**
 * 添加一则通知
 * @param {*} data
 */
export function addNotify(data) {
  return request({
    url: '/show/notify/add',
    method: 'post',
    data,
    ToFormData
  })
}
/**
 * 获取一则通知
 * @param {*} data
 */
export function infoNotify(data) {
  return request({
    url: '/show/notify/info',
    method: 'post',
    data,
    ToFormData
  })
}
/**
 * 修改一则通知
 * @param {*} data
 */
export function updateNotify(data) {
  return request({
    url: '/show/notify/update',
    method: 'post',
    data,
    ToFormData
  })
}
/**
 * 删除一则通知
 * @param {*} data
 */
export function deleteNotify(data) {
  return request({
    url: '/show/notify/delete',
    method: 'post',
    data,
    ToFormData
  })
}
/**
 * 获取轮播图列表
 * @param {*} data
 */
export function listBanner() {
  return request({
    url: '/show/banner/list',
    method: 'post'
  })
}
/**
 * 添加一张轮播图
 * @param {*} data
 */
export function addBanner(data) {
  return request({
    url: '/show/banner/add',
    method: 'post',
    data
  })
}

/**
 * 删除一张轮播图
 * @param {*} data
 */
export function deleteBanner(data) {
  return request({
    url: '/show/banner/delete',
    method: 'post',
    data
  })
}

