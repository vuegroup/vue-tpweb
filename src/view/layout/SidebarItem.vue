<template>
	<div class='menu-wrapper'>

		<!-- <el-submenu index="1">
					<template slot="title">
						<i class="el-icon-message"></i>导航一</template>
					<el-menu-item-group>
						<template slot="title">分组一</template>
						<el-menu-item index="1-1">选项1</el-menu-item>
						<el-menu-item index="1-2">选项2</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group title="分组2">
						<el-menu-item index="1-3">选项3</el-menu-item>
					</el-menu-item-group>
					<el-submenu index="1-4">
						<template slot="title">选项4</template>
						<el-menu-item index="1-4-1">选项1</el-menu-item>
					</el-submenu>
				</el-submenu>
				<el-menu-item index="2">
					<i class="el-icon-menu"></i>导航二</el-menu-item>
				<el-menu-item index="3">
					<i class="el-icon-setting"></i>导航三</el-menu-item> -->

		<template v-for="item in routes">
			<!-- <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path+'/'+item.children[0].path" :key="item.path"> -->
			<el-menu-item v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :index="item.path+'/'+item.children[0].path" class='submenu-title-noDropdown' :key="item.path">
				<icon-svg v-if='item.icon' :icon-class="item.icon"></icon-svg>
				<span slot="title">{{item.children[0].name}}</span>
			</el-menu-item>
			<!-- </router-link> -->

			<el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden" :key="item.path">
				<template slot="title">
					<icon-svg v-if='item.icon' :icon-class="item.icon"></icon-svg>
					<span>{{item.name}}</span>
				</template>
				<template v-for="child in item.children" v-if='!child.hidden'>

					<sidebar-item class='nest-menu' v-if='child.children&&child.children.length>0' :routes='[child]' :key="child.path"> </sidebar-item>

					<!-- <router-link v-else :to="item.path+'/'+child.path" :key="child.path"> -->
					<el-menu-item :index="item.path+'/'+child.path" :key="child.path" @click="addMenu(item,child)">
						<icon-svg v-if='child.icon' :icon-class="child.icon"></icon-svg>
						<span>{{child.name}}</span>
					</el-menu-item>
					<!-- </router-link> -->

				</template>

			</el-submenu>

		</template>
	</div>
</template>

<script>
export default {
	name: 'SidebarItem',
	props: {
		routes: {
			type: Array
		}
	},
	methods: {
		addMenu(item, child) {
			// console.log(JSON.stringify(item))
			console.log(item.path + '/' + child.path)
			 this.$store.dispatch('addMenu', { 'name': child.name, 'path': item.path+'/'+child.path }).then(() => { // 生成可访问的路由表
			// router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
			// next({ ...to }); // hack方法 确保addRoutes已完成
			  })
			//   router.go({name: 'user', params: {userId: 1}});
		}
	}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

