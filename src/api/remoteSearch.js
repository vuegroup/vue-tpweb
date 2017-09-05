import fetch from 'utils/httpservice';

export function userSearch(name) {
  return fetch({
    url: '/search/user',
    method: 'get',
    params: { name }
  });
}
