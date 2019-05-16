import Cookies from 'js-cookie'

const TokenKey = 'token'
const RoleKey = 'role'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getRole() {
  return Cookies.get(RoleKey)
}

export function setRole(Role) {
  return Cookies.set(RoleKey, Role)
}

export function removeRole() {
  return Cookies.remove(RoleKey)
}
