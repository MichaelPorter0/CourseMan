import request from '@/utils/request'
// import { ToFormData } from '@/utils/toformdata'
export function getVideoList() {
  return request({
    url: '/vedio/list',
    method: 'post'
  })
}
/**
 * 上传文件接口
 * @param {*} data
 */
export function upLoadFile(data) {
  var form = new FormData()
  form.append('file', data.file)
  form.append('asset', 'vedio')

  return request({
    url: '/common/upload/private-file',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded ' },
    data: form,
    processData: false,
    contentType: false,
    mimeType: 'multipart/form-data'
    // transformRequest: [ToFormData]
  })
}
