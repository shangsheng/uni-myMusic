<template>
	<view class="block">
		<view class="homePage" v-for="(pageItem,index) in blockData" :key="index" v-if="pageItem.type !== 'banners'">
			<view class="recommended" >
				<text class="uni-mainTitle" v-if="pageItem.uiElement.mainTitle">{{pageItem.uiElement.mainTitle.title}}</text>
				<view class="uni-header" >
					<view class="uni-h3">
						<text class="text" v-if="pageItem.uiElement.subTitle">{{pageItem.uiElement.subTitle.title}}</text>
					</view>
					<navigator url="/playlistCollection" v-if=" pageItem.uiElement.button && pageItem.uiElement.button.actionType === 'orpheus'"><text class="text-gd">{{pageItem.uiElement.button.text}}</text></navigator>
					
					<button type="button" class="plays" v-else-if="pageItem.uiElement.button && pageItem.uiElement.button.actionType === 'client_customized'" :data-type="pageItem.type"><view class="icon icon-icon_play iconfont icon-width-14"></view>{{pageItem.uiElement.button.text}}</button>
				</view>
				<view class="uni-songList" v-if="pageItem.type === 'songList'">
					<view class="songList" v-for="item in pageItem.creatives" :key="item.creativeId">
						<navigator :url="'/playlist?id='+item.creativeId">
							<view class="recommendList">
								<image :src="item.uiElement.image.imageUrl" class="songImg"></image>
								<view class="recommend-playData">
									<view class="icon icon-icon-bofang iconfont icon-width-12"></view>
									<text class="count">{{item.resources[0].resourceExtInfo.playCount | countNumber}}</text>
								</view>
							</view>
							<text class="titleSong">{{item.uiElement.mainTitle.title}}</text>
						</navigator>
					</view>
				</view>
				<view class="uni-private" v-else-if="pageItem.type === 'personalTailor'">
					 <swiper class="swiper-private" :previousMargin="previousMargin" :nextMargin="nextMargin" :circular="circular" :autoplay="autoplay">
						 <swiper-item class="personalTailor" v-for="(item,creativesindex) in pageItem.creatives" :key="creativesindex">
						 	 <view class="private-item uni-flex" v-for="(privateItem,num) in item.resources" :key="num">
						 			<view class="private-left" :data-id="privateItem.resourceId">
						 				<image :src="privateItem.uiElement.image.imageUrl" class="private-img"></image>
										<view class="icon icon-icon_play iconfont icon-width-18 bofang-color"></view>
						 			</view>
						 		<view class="private-middle">
						 			<view class="uni-p">
						 				<text class="p-color">{{privateItem.uiElement.mainTitle.title}}</text>
										<text class="ellipsis" v-for="(artistsItem,artistsIndex) in privateItem.resourceExtInfo.artists" :key="artistsIndex">{{artistsIndex===0?' - '+artistsItem.name:'/'+artistsItem.name}}</text>
						 			</view>
						 			<view class="uni-span" v-if="privateItem.uiElement.subTitle">
						 				<uni-tag type="error" size="12px" text="SQ" inverted="true" v-if="privateItem.uiElement.subTitle.titleType === 'songRcmdFromComment'"></uni-tag>
						 				<uni-tag type="error" size="12px" text="独家" inverted="true" v-else-if="privateItem.uiElement.subTitle.titleType !== 'songRcmdTag'"></uni-tag>
						 				<text class="title-color ellipsis" v-if="privateItem.uiElement.subTitle.titleType === 'songRcmdTag'">{{privateItem.uiElement.subTitle.title}}</text>
						 				<text v-else class="ellipsis text-w">{{privateItem.uiElement.subTitle.title}}</text>
						 			</view>
						 		</view>
						 		<!-- <view class="private-right"></view> -->
						 	 </view>
						 </swiper-item>
					 </swiper>
				</view>
				<!-- 音乐日历 -->
			</view>
		</view>
		
	</view>
</template>

<script>
	// import carousel from '@/components/vear-carousel/vear-carousel'
	import { playCount } from '@/common/util.js'
	export default{
		// components:{carousel},
		data(){
			return{
				previousMargin:"30rpx",
				nextMargin:'30rpx',
				circular:false,
				autoplay:false
			}
		},
		props:{
			blockData:{
				type:Array,
				default:[]
			},
			personalizedData:{
				type:Array,
				default:[]
			}
		},
		filters:{
			countNumber(num){
				return playCount(num)
			}
		}
	}
</script>

<style scoped="scoped">
	.block{
		width: 100%;
	}
	.homePage{
		width: 100%;
		padding: 40rpx 0;
	}
	.recommended{
		width: 100%;
	}
	.uni-header{
		display: flex;
		justify-content: space-between;
		padding: 0 30rpx;
		align-items: center;
	}
	.uni-h3 .text{
		font-size: 36rpx;
		color: #333333;
	}
	.text-gd{
		padding: 9rpx 22rpx;
		border: 1px solid #e8e8e8;
		border-radius: 32rpx;
		color: #424242;
		font-size:36rpx;
		display: block;
	}
	.uni-songList{
		padding-top:36rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 20px 30px;
	}
	.songList{
		width: 194rpx;
		border-radius: 36rpx;
		padding: 20px 0;
	}
	.recommendList{
		width: 194rpx;
		border-radius: 36rpx;
		position: relative;
	}
	.songImg{
		width: 194rpx;
		height: 194rpx;
		border-radius: 36rpx;
	}
	.recommend-playData{
		position: absolute;
		right: 0;
		top: 0;
		display: flex;
		justify-content: flex-end;
		color: #FFFFFF;
		font-size: 26rpx;
		background-color: rgba(0,0,0,0.3);
		padding:3.6rpx 7rpx;
		border-radius: 36rpx;
	}
	.titleSong{
		font-size: 28rpx;
		color: #373737;
		-o-text-overflow: ellipsis;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.count,.icon-icon-bofang{
		line-height: inherit;
	}
	.count{
		margin-left: 7rpx;
	}
	.plays{
		margin: 0;
		padding: 9rpx 22rpx;
		background-color: transparent;
		border-color: #e6e6e6;
		font-size: 26rpx;
		height: auto;
	}
	.icon-icon_play{
		margin-right: 7.2rpx;
	}
	.plays::after{
		border-radius: 144rpx;
	}
	.uni-mainTitle{
		padding-left: 30rpx;
		color: #afafaf;
		font-size: 26rpx;
	}
	.uni-private{
		width: 100%;
		margin-top: 36rpx;
	}
	.private-item{
		margin-bottom: 36rpx;
	}
	.private-left{
		width: 144rpx;
		height: 144rpx;
		border-radius: 18rpx;
		position: relative;
	}
	.private-img{
		width: 144rpx;
		height: 144rpx;
		border-radius:18rpx;
	}
	.bofang-color{
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -54rpx;
		margin-left: -36rpx;
		color: rgba(255,255,255,0.6);
		width: 72rpx;
		height:72rpx;
		font-size: 72rpx;
	}
	.private-middle{
		margin-left:28.8rpx;
		width: 468rpx;
		flex-shrink: 1;
	}
	.uni-p{
		color: #aaaaaa;
		font-size: 28.8rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.p-color{
		color: #404040;
		font-size:36rpx;
	}
	.uni-span{
		color: #808080;
		font-size: 25.2rpx;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.swiper-private{
		height: 580rpx;
	}
	.uni-tag--12px{
		padding: 4rpx 8rpx;
		height: 25.2rpx;
		line-height: 25.2rpx;
		margin-right: 10.8rpx;
	}
	.title-color{
		background-color: #f7e2e7;
		color: #dd4a5a;
		padding: 0 7.2rpx;
	}
	.ellipsis{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.text-w{
		width: 360rpx;
	}
</style>
