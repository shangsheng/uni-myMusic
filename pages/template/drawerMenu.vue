<template>
	<view class="drawer" >
		<uni-drawer ref="draw"  :mask="mask" :maskClick="maskClick" :mode="mode" :width="drawWid"></uni-drawer>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				mask:true,
				maskClick:true,
				mode:'left',
				drawWid:300
			}
			
		},
		props:{
			
		},
		methods:{
			open(){
				this.$refs.draw.open();
			}
		}
	}
</script>

<style lang="scss">
	.drawer{
		width: 100%;
	}
</style>
