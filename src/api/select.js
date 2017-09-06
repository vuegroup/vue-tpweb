import httpservice from '../utils/httpservice'

export function getPtOptions() {
    return httpservice({
        url: '/select/pt',
        method: 'get'
      })
}

export function getSearchOptions(queryVal) {
    return httpservice({
        url: '/select/search',
        method: 'get',
        params:{queryVal}
      })
}