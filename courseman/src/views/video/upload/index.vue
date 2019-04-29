<template>
  <div>
    <el-upload
      :http-request="uploadSectionFile"
      action=""
      class="upload-demo"
      drag
      multiple >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      <!-- <img src=" {{url}} "> -->
    </el-upload>
    <div id="demo">
      <img :src="myurl">
    </div>
  </div>
</template>

<script>
const OSS = require('ali-oss')
const client = new OSS({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAIOqv4Q2PQZNsN',
  accessKeySecret: 'GYEx9KjDJqK9M2iSufNyYVdEGLcrNk',
  bucket: 'dxytest'
})
console.log(client)
const url = client.signatureUrl('Alienware.jpg')
console.log(url)
console.log('1111111')
export default {
  data() {
    return {
      myurl: url,
      uploadSectionFile: async function(param) {
        try {
          // object表示上传到OSS的名字，可自己定义
          // file浏览器中需要上传的文件，支持HTML5 file 和 Blob类型
          console.log(param.file)
          const r1 = await client.put('object.png', param.file)
          console.log('put success: %j', r1)
          // const r2 = await client.get('object.png')
          // console.log('get success: %j', r2)
          console.log('22222')
          console.log(r1)
        } catch (e) {
          console.error('error: %j', e)
        }
      }
    }
  }
}
</script>
