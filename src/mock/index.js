
// 路径映射模拟数据
import Mock from 'mockjs'
import loginAPI from './login'
import articleTableAPI from './article_table'
import remoteSearchAPI from './remoteSearch'
import selectAPI from './select'
// 登录相关
Mock.mock(/\/login\/loginbyemail/, 'post', loginAPI.loginByEmail)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getInfo)
// // table example相关
Mock.mock(/\/article_table\/list/, 'get', articleTableAPI.getList)
Mock.mock(/\/article_table\/p/, 'get', articleTableAPI.getPv)

// // 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

//选择器
Mock.mock(/\/select\/pt/, 'get', selectAPI.getPtList)
Mock.mock(/\/select\/search/, 'get', selectAPI.getSearchList)
export default Mock
