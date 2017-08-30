<template>
    <div class="app-container calendar-list-container">
        <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
            <el-form-item label="类型">
                <el-select class="filter-item" v-model="temp.type" placeholder="请选择">
                    <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="状态">
                <el-select class="filter-item" v-model="temp.status" placeholder="请选择">
                    <el-option v-for="item in  statusOptions" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="时间">
                <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="标题">
                <el-input v-model="temp.title"></el-input>
            </el-form-item>

            <el-form-item label="重要性">
                <el-rate style="margin-top:8px;" v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
            </el-form-item>

            <el-form-item label="点评">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="temp.remark">
                </el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <router-link :to="back">
                <el-button type="primary" @click="create">确 定</el-button>
            </router-link>
        </div>
        </el-dialog>
    </div>
</template>

<script>
import { fetchList, fetchPv } from '../../api/article_table';
import { parseTime } from '../../utils'

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
            back: "../list/add",
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
            statusOptions: ['published', 'draft', 'deleted'],
            dialogFormVisible: true,
            textMap: {
                update: '编辑',
                create: '创建'
            },
            dialogPvVisible: false,
            pvData: [],
            showAuditor: false,
            tableKey: 0
        }
    },
    methods: {
        create() {
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
            this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
            })
        }
    }
}
</script>
