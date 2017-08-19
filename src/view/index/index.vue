<template>
  <div class="dashboard-container">
    <!-- 首页根据权限配置应用组件 -->
    <component v-bind:is="currentRole"> </component>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import defaultIndex from './default/index';

  export default {
    name: 'index',
    //可根据权限注册用户组件
    components: { defaultIndex },
    data() {
      return {
        //这里默认使用了一个
        currentRole: 'defaultIndex'
      }
    },
    computed: {
        //获取用户基本信息
      ...mapGetters([
        'name',
        'avatar',
        'email',
        'introduction',
        'roles'
      ])
    },
    created() {
      if (this.roles.indexOf('admin') >= 0) {
        return;
      }
      //根据用户权限更改首页显示组件
      this.currentRole = '';
    }
  }
</script>
