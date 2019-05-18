// import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, getRole, setRole, removeRole } from '@/utils/auth'
import { login, getInfo } from '@/api/user'
const user = {
  state: {
    token: getToken(),
    name: '',
    roles: getRole(),
    phone: 0
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PHONE: (state, phone) => {
      state.phone = phone
    }
  },

  actions: {
    // 登录
    Login({ commit }, LoginForm) {
      // const email = LoginForm.email.trim()
      return new Promise((resolve, reject) => {
        login(LoginForm).then(response => {
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          // type =1 是管理员,=2是老师,=3 是未激活老师
          if (data.info.type === 1) { // 验证返回的roles是否是一个非空数组
            setRole('admin')
          } else if (data.info.type === 2) {
            setRole('teahcer')
          } else {
            reject('这不是一个合法账户')
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          // if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          //   commit('SET_ROLES', data.roles)
          // } else {
          //   reject('getInfo: roles must be a non-null array !')
          // }
          commit('SET_NAME', data.user_info.nickname)
          commit('SET_PHONE', data.user_info.phone)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      console.log('12341')
      removeToken()
      removeRole()
      // return new Promise((resolve, reject) => {
      //   // logout(state.token).then(() => {
      //   //   commit('SET_TOKEN', '')
      //   //   commit('SET_ROLES', [])
      //   //   removeToken()
      //   //   removeRole()
      //   //   resolve()
      //   // }).catch(error => {
      //   //   reject(error)
      //   // })
      // })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
        removeRole()
      })
    }
  }
}

export default user
