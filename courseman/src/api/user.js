import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function register(data) {
  return request({
    url: 'user/account/register',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded ' },
    // email: email,
    // nickname: nickname
    data,
    transformRequest: [function(data) {
      // Do whatever you want to transform the data
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
}

// export function logout() {
//   return request({
//     url: '/user/logout',
//     method: 'post'
//   })
// }
