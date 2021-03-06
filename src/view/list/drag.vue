<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="标题" v-model="listQuery.title">
            </el-input>

            <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type" placeholder="类型">
                <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
                </el-option>
            </el-select>

            <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.sort" placeholder="排序">
                <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
                </el-option>
            </el-select>

            <el-button class="filter-item" type="primary" @click="handleFilter">搜索</el-button>
            <router-link :to="add">
                <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="edit">添加</el-button>
            </router-link>
        </div>

        <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

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

            <el-table-column width="110px" align="center" label="作者">
                <template scope="scope">
                    <span>{{scope.row.author}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="阅读数" width="95">
                <template scope="scope">
                    <span>{{scope.row.pageviews}}</span>
                </template>
            </el-table-column>

            <el-table-column class-name="status-col" label="状态" width="90">
                <template scope="scope">
                    <el-tag :type="scope.row.status | statusFilter">{{scope.row.status|formatStatus}}</el-tag>
                </template>
            </el-table-column>

            <el-table-column align="center" label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" type="success" @click="handleUpdate(scope.row)">编辑
                    </el-button>
                    <el-button size="small" type="danger" @click="handleDelete">删除
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" label="拖拽" width="95">
                <template scope="scope">
                    <el-button class="filter-item" type="primary" @click="handleFilter">+</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div v-show="!listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <div class='show-d'>默认顺序 &nbsp; {{ olderList}}</div>
        <div class='show-d'>拖拽后顺序{{newList}}</div>
    </div>
</template>

<script>
import { fetchList, fetchPv } from '../../api/article_table';
import { parseTime } from '../../utils'
import Sortable from 'sortablejs'
const calendarTypeOptions = [
    { key: 'CN', display_name: '中国' },
    { key: 'US', display_name: '美国' },
    { key: 'JP', display_name: '日本' }
]

// arr to obj
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
}, {})

export default {
    name: 'table_demo',
    data() {
        return {
            add: '../list/add',
            list: null,
            total: null,
            listLoading: true,
            sortable: null,
            olderList: [],
            newList: [],
            listQuery: {
                page: 1,
                limit: 20,
                importance: undefined,
                title: undefined,
                type: undefined,
                sort: '+id'
            },
            temp: {
                id: undefined,
                importance: 0,
                remark: '',
                timestamp: 0,
                title: '',
                type: '',
                status: 'published'
            },
            calendarTypeOptions,
            sortOptions: [{ label: '按ID升序列', key: '+id' }, { label: '按ID降序', key: '-id' }],
            textMap: {
                update: '编辑',
                create: '创建'
            },
            dialogPvVisible: false,
            pvData: [],
            tableKey: 0
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
        },
        formatStatus(status) {
            const formatMap = {
                published: '发布',
                draft: '草稿',
                deleted: '删除'
            }
            return formatMap[status]
        }
    },
    methods: {
        getList() {
            this.listLoading = true
            fetchList(this.listQuery).then(response => {
                this.list = response.data.items
                this.total = response.data.total
                this.listLoading = false
                this.olderList = this.list.map(v => v.id);
                this.newList = this.olderList.slice();
                this.$nextTick(() => {
                    this.setSort()
                })
            })
        },
        setSort() {
            const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0];
            this.sortable = Sortable.create(el, {
                // handle: '.drag-handler',
                onEnd: evt => {
                    const tempIndex = this.newList.splice(evt.oldIndex, 1)[0];
                    this.newList.splice(evt.newIndex, 0, tempIndex);
                }
            });
        },
        handleFilter() {
            this.getList()
        },
        handleSizeChange(val) {
            this.listQuery.limit = val
            this.getList()
        },
        handleCurrentChange(val) {
            this.listQuery.page = val
            this.getList()
        },
        timeFilter(time) {
            if (!time[0]) {
                this.listQuery.start = undefined
                this.listQuery.end = undefined
                return
            }
            this.listQuery.start = parseInt(+time[0] / 1000)
            this.listQuery.end = parseInt((+time[1] + 3600 * 1000 * 24) / 1000)
        },

        handleCreate() {
            this.resetTemp()
            this.dialogStatus = 'create'
            this.dialogFormVisible = true
        },
        handleUpdate(row) {
            this.temp = Object.assign({}, row)
            this.dialogStatus = 'update'
            this.dialogFormVisible = true
        },
        handleDelete(row) {
            this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
            })
            const index = this.list.indexOf(row)
            console.log(index)
            this.list.splice(index, 1)
        },
        create() {
            this.temp.id = parseInt(Math.random() * 100) + 1024
            this.temp.timestamp = +new Date()
            this.temp.author = '原创作者'
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
            })
        },
        update() {
            this.temp.timestamp = +this.temp.timestamp
            for (const v of this.list) {
                if (v.id === this.temp.id) {
                    const index = this.list.indexOf(v)
                    this.list.splice(index, 1, this.temp)
                    break
                }
            }
            this.dialogFormVisible = false
            this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
            })
        },
        resetTemp() {
            this.temp = {
                id: undefined,
                importance: 0,
                remark: '',
                timestamp: 0,
                title: '',
                status: 'published',
                type: ''
            }
        },
        handleFetchPv(pv) {
            // fetchPv(pv).then(response => {
            //     this.pvData = response.data.pvData
            //     this.dialogPvVisible = true
            // })
        },
        // handleDownload() {
        //     require.ensure([], () => {
        //         const { export_json_to_excel } = require('vendor/Export2Excel');
        //         const tHeader = ['时间', '地区', '类型', '标题', '重要性'];
        //         const filterVal = ['timestamp', 'province', 'type', 'title', 'importance'];
        //         const data = this.formatJson(filterVal, this.list);
        //         export_json_to_excel(tHeader, data, 'table数据');
        //     })
        // },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => {
                if (j === 'timestamp') {
                    return parseTime(v[j])
                } else {
                    return v[j]
                }
            }))
        }
    }
}
</script>
