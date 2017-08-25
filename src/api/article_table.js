import httpservice from '../utils/httpservice'

export function fetchList(query) {
  return httpservice({
    url: '/article_table/list',
    method: 'get',
    params: query
  })
}

export function fetchPv(pv) {
  return httpservice({
    url: '/article_table/pv',
    method: 'get',
    params: { pv }
  })
}
