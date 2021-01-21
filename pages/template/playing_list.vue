<template>
	<view class="playing-list">
		<view class="music-playing-list">
			<view class="music-swiper-item">
				<view class="m-p-top">
					<view class="m-titile">
						<text>当前播放</text>
						<text class="m-l-num">(36)</text>
					</view>
					<view class="m-l-r">
						<view class="m-mode font-color">
							<view class="icon iconfont icon-width-40 icon-xunhuan icon-color"></view>
							<text>循环列表</text>
						</view>
						<view class="m-coll-del">
							<view class="m-collection font-color">
								<view class="icon iconfont icon-width-40 icon-wenjianjia icon-color"></view>
								<text>全部收藏</text>
							</view>
							<view class="m-line"></view>
							<view class="m-delete">
								<view class="icon iconfont icon-width-40 icon-shanchu icon-color"></view>
							</view>
						</view>
					</view>
				</view>
				<view class="m-p-button">
					<scroll-view scroll-y="true" style="height: 600rpx;">
						<view class="m-play-list">
							<view class="m-list-item">
								<view class="iconfont icon icon-width-40 icon-zhengzaibofang"></view>
								<view class="m-item-title">
									<text>等你爱我</text>
									<text class="m-item-a"> - 陈奕迅</text>
								</view>
								<view class="m-play-source">播放来源</view>
								<view class="icon iconfont icon-width-40 icon-quxiao icon-color"></view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			
		}
	}
</script>

<style scoped>
	.playing-list{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(115,116,111,0.5);
		display: flex;
		flex-direction: column-reverse;
		padding: 0 40rpx;
		box-sizing: border-box;
	}
	.music-swiper-item{
		background-color: #FFFFFF;
		border-radius: 44rpx;
		padding: 0 30rpx;
	}
	.m-p-top{
		padding: 40rpx 0;
	}
	.m-titile{
		font-size: 36rpx;
		color: #333333;
	}
	.m-titile .m-l-num{
		font-size: 22rpx;
		color: #999999;
	}
	.m-l-r{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
	}
	.icon-color{
		color: #999999;
	}
	.m-coll-del{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
	}
	 .m-line{
		width: 1rpx;
		height: 40rpx;
		background-color: #e6e6e6;
		margin: 0 31rpx;
	}
	.m-list-item{
		padding: 33rpx 0;
		display: flex;
		justify-content: space-between;
		flex-wrap: nowrap;
	}
	.m-list-play-color{
		color: #fe3a3b;
	}
	.icon-zhengzaibofang,.m-play-source{
		display: none;
	}
	.m-list-play-color .icon-zhengzaibofang,.m-list-play-color .m-play-source{
		display: block;
	}
	.m-list-play-color{
			border: 2rpx solid #e6e6e6;
			color: #333333;
			font-size: 21rpx;
			padding:12rpx  19rpx 8rpx 18rpx;
	}
	.m-item-title{
		overflow: hidden;
		display: flex;
		flex-wrap: nowrap;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #333333;
		font-size: 28rpx;
	}
	.m-item-title .m-item-a{
		font-size: 21rpx;
		color: #808080;
	}
	.m-list-play-color .m-item-a,.m-list-play-color .m-item-title {
		color: #fe3a3b;
	}
</style>
