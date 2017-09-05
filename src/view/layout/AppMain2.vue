<template>
  <section class="app-main2" style="min-height: 100%">
    <!-- <transition name="fade" mode="out-in">
                          			<router-view :key="key"></router-view>
                          		</transition> -->
    <div class="custom-analysis page-wrap-tabs">
      <!-- <p class="page-title" @click="add">项目管理 </p>

                              <el-input v-model="newval"></el-input> -->
      <el-tabs type="card" v-model="$route.name" class="tabs-nopadding" @tab-remove="removeTab" @tab-click="handleClick" :closable='true'>
        <el-tab-pane v-for="(option,index) in options" :label="option.name" :key="index" :name="option.name" :closable='true'>
        </el-tab-pane>
      </el-tabs>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </section>
</template>
<script>
export default {
  name: 'AppMain2',
  data() {
    return {
      newval: '',
      isActive: true,
      error: null,
      editableTabsValue2: '22222'
    }


  },
  computed: {
    // key () {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // },
    options() {
      return this.$store.state.test.options;
    },
    classObject: function() {
      return {
        active: this.isActive && !this.error,
        'text-danger': this.error && this.error.type === 'fatal',
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
      // this.$router.go(-1);
      //  let activename = this.editableTabsValue2;
      let urlPath = '';
      let tabs = this.$store.state.test.options;
      if (tab.name == this.$route.name) {//判断是否为当前tab
        console.log('点击当前tabs');
      } else {
        tabs.forEach((item, index) => {
          // let nextTab = tabs[index + 1] || tabs[index - 1];
          if (index == tab.index) {
            urlPath = item.path;
          }
        })
      }
      if (urlPath) {
        this.$router.push({ path: urlPath });
      } else {
        if (this.$route.query.noGoBack) {
          this.$router.push({ path: '/index' });
        } else {
          this.$router.go(-1);
        }
      }
      console.log(2222);


    },
    add() {
      this.$store.dispatch('addMenu', { 'name': this.newval, 'path': this.newval }).then(() => { // 生成可访问的路由表
        // router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
        // next({ ...to }); // hack方法 确保addRoutes已完成
        console.log("添加成功" + this.newval)
      })
    },
    removeTab(targetName) {
      // console.log(1111);
      // if (this.$route.query.noGoBack) {
      //   this.$router.push({ path: '/index' });
      // } else {
      //   this.$router.go(-1);
      // }
      console.log("移除菜单名称:" + targetName)
      let tabs = this.$store.state.test.options;
      let nextTab;
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          nextTab = tabs[index + 1] || tabs[index - 1];
        }
      });
      this.$store.dispatch('remouveMenu', { 'name': targetName }).then(() => {
        console.log("移除菜单名称:" + targetName)
      });
      if (nextTab) {
        this.$router.push({ path: nextTab.path });
      } else {
        this.$router.push({ path: '/index' });
      }
      this.$store.dispatch('remouveMenu', { 'name': targetName }).then(() => {
        console.log("移除菜单名称:" + targetName)
      });

    }
  }
}
</script>