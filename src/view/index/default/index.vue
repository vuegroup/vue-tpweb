<template>
    <div class="dashboard-editor-container">
        <!-- 首页页面快速入口如需添加现在路由中配置，列出几项基本组件 -->
        <el-row class="btn-group">
            <el-col :span="4" class='text-center'>
                <router-link class="pan-btn blue-btn" to="/test/list">列表表单</router-link>
            </el-col>
            <el-col :span="4" class='text-center'>
                <router-link class="pan-btn light-blue-btn" to="/upload/imgUpload">文件上传</router-link>
            </el-col>
            <el-col :span="4" class='text-center'>
                <router-link class="pan-btn pink-btn" to="/theme/index">换肤</router-link>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import panThumb from 'components/PanThumb';
import countTo from 'vue-count-to';
import todoList from 'components/TodoList';
export default {
    name: 'dashboard-editor',
    components: { panThumb, countTo, todoList },
    data() {
        return {
           
        }
    },
    computed: {
        ...mapGetters([
            'name',
            'avatar',
            'roles'
        ])
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
    margin: 30px;
    .btn-group {
        margin-bottom: 60px;
    }
    .box-card-header {
        position: relative;
        height: 160px;
    }
    .panThumb {
        z-index: 100;
        height: 150px;
        width: 150px;
        position: absolute;
        left: 0px;
        right: 0px;
        margin: auto;
    }
    .display_name {
        font-size: 30px;
        display: block;
    }
    .info-item {
        display: inline-block;
        margin-top: 10px;
        font-size: 14px;
        &:last-of-type {
            margin-left: 15px;
        }
    }
}
</style>
