<template>
    <div>
        <el-select v-model="selectItem" clearable  placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item">
            </el-option>
        </el-select>
        <p>选择了：{{selectItem.name}}</p>
        <p>介绍：{{selectItem.desc}}</p>
    </div>
</template>

<script>
import { getPtOptions } from '../../api/select';

export default {
    data() {
        return {
            options: [],
            selectItem: {}
        }
    },
    created() {
        getPtOptions().then(response => {
            console.log(response.data)
            this.options = response.data
        })
    }
}
</script>

<<style>
    .pt-select{
        margin-bottom: 100px;
    }
</style>
