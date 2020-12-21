<template>
	<view class="home">
		<view class="uni-card-header">
			<!-- <view class="uni-icon uni-list"></view> -->
			<uni-icons type="list" :size="25" @click="onopen"></uni-icons>
			<uni-search-bar :placeholder="placeholder" :radius="radius" :clearButton="clearButton" :cancelButton="cancelButton" :bgColor="bgColor" :maxlength="maxlength"></uni-search-bar>
			<uni-icons type="mic-filled" :size="25"></uni-icons>
		</view>
		<drawerMenu ref="drawMenu"></drawerMenu>
	</view>
</template>

<script>
	import drawerMenu from '../../template/drawerMenu.vue'
	export default {
	    components: {drawerMenu},
		data(){
			return{
				placeholder:"请输入搜索内容",
				radius:"42",
				clearButton:"none",
				cancelButton:"none",
				bgColor:"fdfdfd",
				maxlength:120
			}
		},
		methods:{
			onopen(){
				console.log(1)
				console.log(this)
				console.log(this.$refs)
				this.$refs.drawMenu.open();
			}
		}
	}
</script>

<style>
	.uni-card-header{
		background-color: #f3ebe8;
	}
</style>
