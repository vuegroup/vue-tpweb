import httpservice from '../utils/httpservice'

export function getList() {
  return httpservice({
    url: '/article/list',
    method: 'get'
  })
}

export function getArticle() {
  return httpservice({
    url: '/article/detail',
    method: 'get'
  })
}

