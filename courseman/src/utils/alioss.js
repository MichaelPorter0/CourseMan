const OSS = require('ali-oss')

export const ossConfig = {
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAIOqv4Q2PQZNsN',
  accessKeySecret: 'GYEx9KjDJqK9M2iSufNyYVdEGLcrNk',
  bucket: 'dxytest'
}

export const client = new OSS(ossConfig)

let tempCheckpoint

// // 定义上传方法
// export async function multipartUpload(name, file) {
//   try {
//     const result = await client.multipartUpload(name, file, {
//       progress: async function(p, checkpoint) {
//         // 断点记录点。 浏览器重启后无法直接继续上传，需用户手动触发进行设置。
//         tempCheckpoint = checkpoint
//       },
//       meta: { year: 2017, people: 'test' },
//       mime: 'image/jpeg'
//     })
//     console.log(result)
//   } catch (e) {
//     console.log(e)
//   }
// }

// // 开始上传
// multipartUpload()

// // 暂停分片上传方法
// client.cancel()

// 恢复上传
const resumeclient = new OSS(ossConfig)

export async function resumeUpload() {
  try {
    const result = await resumeclient.multipartUpload('object-key', 'local-file', {
      progress: async function(p, checkpoint) {
        tempCheckpoint = checkpoint
      },
      checkpoint: tempCheckpoint,
      meta: { year: 2017, people: 'test' },
      mime: 'image/jpeg'
    })
    console.log(result)
  } catch (e) {
    console.log(e)
  }
}

// resumeUpload()
