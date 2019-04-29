const OSS = require('ali-oss')

const ossConfig = {
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAIOqv4Q2PQZNsN',
  accessKeySecret: 'GYEx9KjDJqK9M2iSufNyYVdEGLcrNk',
  bucket: 'dxytest'
}

const client = new OSS(ossConfig)

const tempCheckpoint

// 定义上传方法
async function multipartUpload () {
  try {
    let result = await client.multipartUpload('object-key', 'local-file', { 
      progress: async function (p, checkpoint) {
      // 断点记录点。 浏览器重启后无法直接继续上传，需用户手动触发进行设置。
        tempCheckpoint = checkpoint
      }
})
  } catch (e) {
    console.log(e)
  }
}

// 开始上传
multipartUpload()

// 暂停分片上传方法
client.cancel()

// 恢复上传a
let resumeclient = new OSS(ossConfig)
async function resumeUpload () {
  try {
    let result = await resumeclient.multipartUpload('object-key', 'local-file', {
      progress: async function (p, checkpoint) {
        tempCheckpoint = checkpoint
      },
      checkpoint: tempCheckpoint,

    })
  } catch (e) {
    console.log(e)
  }
}

const progress = async function progress(p, checkpoint) {
  console.log(p)
};
