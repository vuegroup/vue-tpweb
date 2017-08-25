import httpservice from '../utils/httpservice'

export function userSearch(name) {
  return httpservice({
    url: '/search/user',
    method: 'get',
    params: { name }
  })
}
