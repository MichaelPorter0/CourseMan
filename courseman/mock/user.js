import { param2Obj } from './utils'

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'teacherr-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://oureseman.oss-cn-beijing.aliyuncs.com/userAvater.jpg',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['teahcer'],
    introduction: 'I am an teacher',
    avatar: 'https://oureseman.oss-cn-beijing.aliyuncs.com/userAvater.jpg',
    name: 'Normal Editor'
  }
}

export default {
  login: res => {
    const { username } = JSON.parse(res.body)
    const data = tokens[username]

    if (data) {
      return {
        code: 20000,
        data
      }
    }
    return {
      code: 60204,
      message: 'Account and password are incorrect.'
    }
  },
  getInfo: res => {
    const { token } = param2Obj(res.url)
    const info = users[token]

    if (info) {
      return {
        code: 20000,
        data: info
      }
    }
    return {
      code: 50008,
      message: 'Login failed, unable to get user details.'
    }
  },
  logout: () => {
    return {
      code: 20000,
      data: 'success'
    }
  }
}
