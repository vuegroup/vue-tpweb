<template>
    <div class="app-container calendar-list-container">
        <div style='margin:0 0 5px 20px'>不固定表头 按照选择顺序排序</div>
        <div class="filter-container">
            <el-checkbox-group v-model="checkboxVal">
                <el-checkbox label="author">作者</el-checkbox>
                <el-checkbox label="pageviews">阅读数</el-checkbox>
                <el-checkbox label="status">状态</el-checkbox>
            </el-checkbox-group>
        </div>
        <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

            <el-table-column align="center" label="序号" width="65">
                <template scope="scope">
                    <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>

            <el-table-column min-width="300px" label="标题">
                <template scope="scope">
                    <span class="link-type">{{scope.row.title}}</span>
                    <el-tag>{{scope.row.type | typeFilter}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column  width="110px" align="center" :label="item.lable" v-for="(item,index) in selectRows" :key="item.val">
                <template scope="scope">
                    <span>{{scope.row[item.val]}}</span>
                </template>
            </el-table-column>
        </el-table>

        <div v-show="!listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

    </div>
</template>

<script>
import { fetchList, fetchPv } from '../../api/article_table'
import { parseTime } from '../../utils'
import Sortable from 'sortablejs'
const calendarTypeOptions = [
    { key: 'CN', display_name: '中国' },
    { key: 'US', display_name: '美国' },
    { key: 'JP', display_name: '日本' },
    { key: 'EU', display_name: '欧盟' }
]

// arr to obj
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
}, {})
const defaultRows=['author', 'pageviews']//设置默认选中项
export default {
    name: 'table_demo',
    data() {
        return {
            checkboxVal: defaultRows,
            selectRows:[
                    {lable:'作者',val:'author'},
                    {lable:'阅读数',val:'pageviews'}
                    ],
            list: null,
            total: null,
            listLoading: true,
            listQuery: {
                page: 1,
                limit: 20,
                type: undefined
            },
            calendarTypeOptions,
            tableKey: 1
        }
    },
    watch: {
        checkboxVal(valArr) {
            this.selectRows=[]
            for(let i=0;i<valArr.length;i++){
                switch(valArr[i]){
                    case 'author':
                     this.selectRows[i]={lable:'作者',val:'author'}
                     break
                    case 'pageviews':
                    this.selectRows[i]={lable:'阅读数',val:'pageviews'}
                     break
                    case 'status':
                    this.selectRows[i]={lable:'状态',val:'status'}
                     break
                }
            }
            this.tableKey = this.tableKey + 1;// 为了保证table 每次都会重渲 （牺牲性能保证效果，当然也可以不用）
        }
    },
    created() {
        this.getList()
    },
    filters: {
        statusFilter(status) {
            const statusMap = {
                published: 'success',
                draft: 'gray',
                deleted: 'danger'
            }
            return statusMap[status]
        },
        typeFilter(type) {
            return calendarTypeKeyValue[type]
        }
    },
    methods: {
        getList() {
            this.listLoading = true
            fetchList(this.listQuery).then(response => {
                this.list = response.data.items
                this.total = response.data.total
                this.listLoading = false
            })
        },
        handleSizeChange(val) {
            this.listQuery.limit = val
            this.getList()
        },
        handleCurrentChange(val) {
            this.listQuery.page = val
            this.getList()
        }
    }
}
</script>
