
import Mock from 'mockjs'
import { param2Obj } from '../utils/index.js'
const count = 20;
let userList = [];
// for (let i = 0; i < count; i++) {
//     userList.push(Mock.mock({
//         desc: '@ctitle(10, 20)',
//         name: '@cname'
//     }));
// }
export default {
    getUserList: () => userList,
    getUserList: config => {
        userList=[]
        const { queryVal } = param2Obj(config.url)
        for (let i = 0; i < count; i++) {
            userList.push(Mock.mock({
                dept:queryVal,
                desc: '@ctitle(10, 20)',
                name: '@cname'
            }));
        }
        // console.log(queryVal)
        // let mockList = userList.map(item => {
        //     item.id = queryVal
        // })
        return userList
    },
    getManageList: () => ({
        data: [
            {
                "id": 1,
                "parentId": null,
                "sort": 0,
                "name": "人力资源部",
                "href": "/index",
                "icon": "fa fa-dashboard",
                "children": [
                    {
                        "id": 11,
                        "parentId": 1,
                        "sort": 0,
                        "name": "人事部",
                        "href": "/index/1/1",
                        "icon": "fa fa-bank",
                        "children": [
                            
                        ]
                    },
                    {
                        "id": 12,
                        "parentId": 1,
                        "sort": 0,
                        "name": "行政部",
                        "href": "/index/1/2",
                        "icon": "fa fa-bank",
                        "children": [

                        ]
                    }
                ],
                "isShow": "1"
            },
            {
                "id": 2,
                "parentId": null,
                "sort": 1,
                "name": "营销部",
                "href": "/test/1",
                "icon": "fa fa-upload",
                "children": [
                    {
                        "id": 21,
                        "parentId": 2,
                        "sort": 0,
                        "name": "业务拓展部",
                        "href": "/test/1/1",
                        "icon": "fa fa-bank",
                        "children": [

                        ],
                        "isShow": "1"
                    },
                    {
                        "id": 22,
                        "parentId": 2,
                        "sort": 0,
                        "name": "市场部",
                        "href": "/test/1/2",
                        "icon": "fa fa-area-chart",
                        "children": [

                        ],
                        "isShow": "1"
                    },
                    {
                        "id": 23,
                        "parentId": 2,
                        "sort": 0,
                        "name": "成品仓",
                        "href": "/test/1/3",
                        "icon": "fa fa-area-chart",
                        "children": [

                        ],
                        "isShow": "1"
                    },
                    {
                        "id": 24,
                        "parentId": 2,
                        "sort": 0,
                        "name": "客服部",
                        "href": "/test/1/4",
                        "icon": "fa fa-area-chart",
                        "children": [

                        ],
                        "isShow": "1"
                    },
                    {
                        "id": 25,
                        "parentId": 2,
                        "sort": 0,
                        "name": "策划部",
                        "href": "/test/1/5",
                        "icon": "fa fa-area-chart",
                        "children": [

                        ],
                        "isShow": "1"
                    }
                ],
                "isShow": "1"
            },
            {
                "id": 3,
                "parentId": null,
                "sort": 3,
                "name": "技术部",
                "href": "/test/2",
                "icon": "fa fa-download",
                "children": [
                    {
                        "id": 31,
                        "parentId": 3,
                        "sort": 0,
                        "name": "设计部",
                        "href": "/test/2/1",
                        "icon": "fa fa-image",
                        "children": [

                        ],
                        "isShow": "1"
                    },
                    {
                        "id": 32,
                        "parentId": 3,
                        "sort": 0,
                        "name": "技术部",
                        "href": "/test/2/1",
                        "icon": "fa fa-image",
                        "children": [

                        ],
                        "isShow": "1"
                    }
                ],
                "isShow": "1"
            },
            {
                "id": 4,
                "parentId": null,
                "sort": 6,
                "name": "财务部",
                "href": "/sys",
                "icon": "el-icon-setting",
                "children": [
                    {
                        "id": 41,
                        "parentId": 4,
                        "sort": 0,
                        "name": "总账会计",
                        "href": "/sys/resource",
                        "icon": "fa fa-database",
                        "children": [

                        ],
                        "isShow": "1"
                    },
                    {
                        "id": 42,
                        "parentId": 4,
                        "sort": 1,
                        "name": "出纳",
                        "href": "/sys/menuList",
                        "icon": "fa fa-navicon",
                        "children": [

                        ],
                        "isShow": "1"
                    },
                    {
                        "id": 43,
                        "parentId": 4,
                        "sort": 2,
                        "name": "会计文员",
                        "href": "/sys/roleList",
                        "icon": "fa fa-universal-access",
                        "children": [

                        ],
                        "isShow": "1"
                    }
                ],
                "isShow": "1"
            }
        ]
    })
}