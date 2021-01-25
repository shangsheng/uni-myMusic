<template>
	<view class="drawer" >
		<uni-drawer ref="draw"  :mask="mask" :maskClick="maskClick" :mode="mode" :width="drawWid">
			<view class="logn" v-if="loginBollen">
				<button type="primary" class="van-button--primary" @click="login">登录</button>
				<button type="primary" class="van-button--primary">注册</button>
			</view>
			<view class="lognMy" v-else>
				
			</view>
		</uni-drawer>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				mask:true,
				maskClick:true,
				mode:'left',
				drawWid:300,
				loginBollen:true
			}
			
		},
		props:{
			
		},
		created() {
			uni.getStorage({
				key:'token',
				success:(res)=>{
					console.log(res)
					this.loginBollen = false;
				}
			})
		},
		methods:{
			open(){
				this.$refs.draw.open();
			},
			login(){
				console.log(1)
				uni.navigateTo({
					url:'/pages/secondaryPage/signUp/login',
					success: function(res) {
					    // 通过eventChannel向被打开页面传送数据
						console.log(res)
					    //res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
					  }
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.drawer{
		width: 100%;
	}
	.logn{
		margin-top: 100rpx;
	}
	.van-button--primary{
		margin-top: 50rpx;
	}
</style>
