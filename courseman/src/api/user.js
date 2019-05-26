import request from '@/utils/request'
import { ToFormData } from '@/utils/toformdata'
/**
 * 登录
 * @param {*} data
 */
export function login(data) {
  return request({
    url: '/user/account/login',
    method: 'post',
    data,
    transformRequest: [ToFormData]
  })
}

/**
 * 注册
 * @param {*} data
 */
export function register(data) {
  return request({
    url: 'user/account/register',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded ' },
    data,
    transformRequest: [ToFormData]
  })
}
/**
 * 找回密码
 * @param {*} data
 */
export function retrieveppwd(data) {
  return request({
    url: '/user/account/findpw',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded ' },
    data,
    transformRequest: [ToFormData]
  })
}

/**
 * 获取个人信息
 * @param {*} data
 */
export function getInfo() {
  return request({
    url: 'user/information/get-info',
    method: 'post'
  })
}

/**
 * 获取老师列表
 * @param {*}
 */
export function getTeacherList() {
  return request({
    url: 'user/account/teacher-list-checked',
    method: 'post'
  })
}
/**
 * 获取未审核的老师列表
 * @param {*}
 */
export function getUncheckTeacherList() {
  return request({
    url: 'user/account/teacher-list-not-check',
    method: 'post'
  })
}

/**
 * 审核老师账号
 * @param {*}
 */
export function ApproveTeacher(data) {
  return request({
    url: 'user/account/check',
    method: 'post',
    data,
    transformRequest: [ToFormData]
  })
}

/**
 * 修改个人信息
 * @param {*}
 */
export function updateinfo(data) {
  return request({
    url: '/user/information/update-info',
    method: 'post',
    data,
    transformRequest: [ToFormData]
  })
}

/**
 * 修改账号密码
 * @param {*}
 */
export function changepw(data) {
  return request({
    url: '/user/account/changepw',
    method: 'post',
    data,
    transformRequest: [ToFormData]
  })
}
