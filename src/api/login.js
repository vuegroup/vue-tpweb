import service from '../utils/httpservice'

export function loginByEmail(email, password) {
  const data = {
    email,
    password
  }
  return service({
    url: '/login/loginbyemail',
    method: 'post',
    data
  })
}

export function logout() {
  return service({
    url: '/login/logout',
    method: 'post'
  })
}

export function getInfo(token) {
  return service({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

