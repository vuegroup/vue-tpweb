<<<<<<< HEAD
import Cookies from 'js-cookie'

const TokenKey = 'User-Token'

/**
 * 获取token
 */
export function getToken () {
  return Cookies.get(TokenKey)
}

/**
 * 设置token
 * @param {*值} token
 */
export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

/**
 * 移除token
 */
export function removeToken () {
  return Cookies.remove(TokenKey)
}
=======
//Token管理
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
    return Cookies.get(TokenKey)
  }

  export function setToken(token) {
    return Cookies.set(TokenKey, token)
  }
  
  export function removeToken() {
    return Cookies.remove(TokenKey)
  }
>>>>>>> e45379c4ac259799d7dde428c08ee411de6ded79
