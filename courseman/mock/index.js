import Mock from 'mockjs'
import userAPI from './user'
import tableAPI from './table'
import courseAPI from './course'
import classAPI from './class'
import activationAPI from './activation'
import videoAPI from './video'
// Fix an issue with setting withCredentials = true, cross-domain request lost cookies
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function() {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}
// Mock.setup({
//   timeout: '350-600'
// })

// User
Mock.mock(/\/user\/login/, 'post', userAPI.login)
Mock.mock(/\/user\/info/, 'get', userAPI.getInfo)
Mock.mock(/\/user\/logout/, 'post', userAPI.logout)

// Tablers
Mock.mock(/\/table\/list/, 'get', tableAPI.list)

// course
Mock.mock(/\/course\/list/, 'get', courseAPI.list)

// class
Mock.mock(/\/class\/list/, 'get', classAPI.list)

// activation
Mock.mock(/\/activation\/list/, 'get', activationAPI.list)
Mock.mock(/\/activation\/create/, 'get', activationAPI.create)

// video
Mock.mock(/\/video\/list/, 'get', videoAPI.list)
export default Mock
