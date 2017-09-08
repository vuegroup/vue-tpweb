import httpservice from '../utils/httpservice'

export function getManageList() {
    return httpservice({
        url: '/tree/usermanage',
        method: 'get'
      })
}

export function getUserList(queryVal) {
    return httpservice({
        url: '/tree/userlist',
        method: 'get',
        params:{queryVal}
      })
}

export function addUser(entity) {
    return httpservice({
        url: '/tree/addUser',
        method: 'get',
        params:{entity}
      })
}