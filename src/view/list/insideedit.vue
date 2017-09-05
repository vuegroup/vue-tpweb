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

        <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

            <el-table-column align="center" label="序号" width="65">
                <template scope="scope">
                    <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>

            <el-table-column min-width="200px" label="标题">
                <template scope="scope">
                    <el-input v-show="scope.row.edit" size="small" v-model="scope.row.title"></el-input>
                    <span v-show="!scope.row.edit" class="link-type">{{scope.row.title}}</span>
                </template>
            </el-table-column>

            <el-table-column min-width="100px" label="类型">
                <template scope="scope">
                    <el-select v-show='scope.row.edit' clearable class="filter-item" style="width: 130px" v-model="scope.row.type" placeholder="类型">
                        <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
                        </el-option>
                    </el-select>
                    <el-tag v-show="!scope.row.edit">{{scope.row.type | typeFilter}}</el-tag>
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
                    <el-tag :type="scope.row.status | statusFilter">{{scope.row.status| formatStatus}}</el-tag>
                </template>
            </el-table-column>

            <el-table-column align="center" label="操作" width="150">
                <template scope="scope">
                    <el-button v-show='!scope.row.edit' type="primary" @click='scope.row.edit=true' size="small" icon="edit">编辑</el-button>
                    <el-button v-show='scope.row.edit' type="success" @click='scope.row.edit=false' size="small" icon="check">完成</el-button>
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
import { fetchList, fetchPv } from '../../api/article_table';
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

export default {
    name: 'insideedit',
    data() {
        return {
            add: '../list/add',
            list: null,
            total: null,
            listLoading: true,
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
            sortOptions: [{ label: '按ID升序', key: '+id' }, { label: '按ID降序', key: '-id' }],
            dialogPvVisible: false,
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
                this.list = response.data.items.map(v => {
                    v.edit = false;
                    return v
                });
                this.total = response.data.total
                this.listLoading = false
            })
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
        }
    }
}
</script>
