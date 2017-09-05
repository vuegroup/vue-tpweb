import service from '../utils/httpservice'

export function loginByEmail(email, password) {
  // const data = {
  //   login_name:email,
  //   login_password:password
  // }
  const data = {
    email,
    password
  }
  return service({
    url: '/login/loginbyemail',
    // url: '/auth/login',
    // method: 'get',
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

