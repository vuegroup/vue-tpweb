<template>
    <div>
        <el-select v-model="entity" filterable clearable remote placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item">
            </el-option>
        </el-select>
        <p>选择了:{{entity.label}}</p>
    </div>
</template>

<script>
import { getPtOptions } from '../../api/select';
import { getSearchOptions } from '../../api/select';
export default {
    data() {
        return {
            options: [], //模糊数据集合 显示为可供选择的option
            entity: {},//选择的实体对象
            list: [], //数据源
            loading: false
        }
    },
    // created() {
    //     //发起请求获取数据
    //     getSearchOptions().then(response => {
    //         this.list = response.data.data
    //     })
    // },
    methods: {
        //过滤模糊数据
        remoteMethod(query) {
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                     getSearchOptions(query).then(response => {
                        this.list = response.data
                        console.log(this.list)
                 })
                    
                },2000);
            } else {
                this.options = [];
            }
        }
    }
}
</script>