import Mock from 'mockjs'
import { param2Obj } from '../utils/index.js'
const List = [];
const count = 20;
const searchList=[{
  value: '选项1',
  label: '黄金糕'
}, {
  value: '选项2',
  label: '双皮奶'
}, {
  value: '选项3',
  label: '蚵仔煎'
}, {
  value: '选项4',
  label: '龙须面'
}, {
  value: '选项5',
  label: '北京烤鸭'
}]

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    value: '@id',
    desc: '@ctitle(10, 20)',
    name: '@cname'
  }));
}

export default {
      getPtList: () => List,
      getSearchList: config => {
        const { queryVal } = param2Obj(config.url)
        let mockList = searchList.filter(item => {
          if (queryVal && item.label.indexOf(queryVal) < 0) return false
          return true
        })
        return mockList
      }
}