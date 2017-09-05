import fetch from 'utils/httpservice';

export function getList() {
  return fetch({
    url: '/article/list',
    method: 'get'
  });
}

export function getArticle() {
  return fetch({
    url: '/article/detail',
    method: 'get'
  });
}

