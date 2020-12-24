<template>
	<view class="block">
		<view class="homePage uni-card-modular" v-for="(pageItem,index) in blockData" :key="index" v-if="pageItem.type !== 'banners'">
			<view class="recommended" >
				<text class="uni-mainTitle" v-if="pageItem.uiElement.mainTitle">{{pageItem.uiElement.mainTitle.title}}</text>
				<view class="uni-header" >
					<view class="uni-h3">
						<text class="text" v-if="pageItem.uiElement.subTitle">{{pageItem.uiElement.subTitle.title}}</text>
					</view>
					<navigator url="/playlistCollection" v-if=" pageItem.uiElement.button && pageItem.uiElement.button.actionType === 'orpheus'"><text class="text-gd">{{pageItem.uiElement.button.text}} <view class="icon-chevron-copy icon iconfont icon-width-12"></view></text></navigator>
					
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
				<view class="musicCalendar" v-else-if="pageItem.type === 'musicCalendar'">
					<view class=" calendar-item" :class="{'calendar-border':calendarIndex<pageItem.creatives.length-1}" v-for="(item,calendarIndex) in pageItem.creatives" :key="calendarIndex">
						<view class="calendar-resources uni-flex" :class="{'calendar-border':resourcesIndex<item.resources.length-1}" v-for="(resourcesItem,resourcesIndex) in item.resources" :key="resourcesItem.resourceId">
							<view class="private-left calendar-img">
								<image :src="resourcesItem.uiElement.image.imageUrl" class="private-img"></image>
								<view class="icon icon-icon_play iconfont icon-width-18 bofang-color" v-if="resourcesItem.resourceType === 'SONG'"></view>
							</view>
							<view class="calendar-sub" :data-startTime="resourcesItem.resourceExtInfo.startTime" :data-endTime="resourcesItem.resourceExtInfo.endTime">
								<view class=" iconfont icon-width-84 icon-lingdang"></view>
								<text class="color">{{resourcesItem.resourceExtInfo.subCount}}</text>
							</view>
							<view class="calendar-content">
								<view class="calendar-top">
									<text class="color-time">{{resourcesItem.resourceExtInfo.startTime | noticeTime }}</text>
									<view class="uni-display" v-if="resourcesItem.uiElement.labelTexts">
										<text class="calendar-color ellipsis"  v-for="(labelTextsItem,labelTextsIndex) in resourcesItem.uiElement.labelTexts" :key="labelTextsIndex">{{labelTextsIndex>0? '/'+ labelTextsItem:labelTextsItem}}</text>
									</view>
									
								</view>
								<view class="calendar-bottom ellipsis">{{resourcesItem.uiElement.mainTitle.title}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="uni-songList uni-exclusive" v-if="pageItem.type === 'exclusive'">
					<swiper class="exclusiveSwiper" :autoplay="autoplay" :display-multiple-items="3"   :circular="circular">
						<swiper-item class="exclusiveItem" v-for="(item,exclusiveIndex) in pageItem.creatives" :key="exclusiveIndex">
							<view class="swiper-item">
								<view class="songList" >
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
						</swiper-item>
					</swiper>
					
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	// import carousel from '@/components/vear-carousel/vear-carousel'
	import { playCount, dateUtils } from '@/common/util.js'
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
			},
			noticeTime(time){
				return dateUtils.noticeTime(time)
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
		margin-bottom: 30rpx;
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
		font-size:24rpx;
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
		top: 4rpx;
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
		font-size: 24rpx;
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
	.musicCalendar{
		border-top: 2rpx solid #e6e6e6;
		margin-top: 48rpx;
	}
	.calendar-item{
		width: 100%;
		padding: 0 32rpx;
		box-sizing: border-box;
	}
	.calendar-resources{
		justify-content: space-between;
		align-items: center;
		padding: 45rpx 0;
	}
	.calendar-border{
		border-bottom: 2rpx solid #e6e6e6;
	}
	.calendar-img{
		order:3
	}
	.calendar-sub{
		order: 2;
		font-size: 28rpx;
		text-align: center;
	}
	.calendar-sub .color{
		color: #999999;
	}
	.icon-lingdang{
		font-size: 56rpx;
	}
	.calendar-content{
		order: 1;
		font-size: 44rpx;
		color: #333333;
		width: 408rpx;
	}
	.calendar-top{
		margin-bottom: 26rpx;
		display: flex;
		justify-content: flex-start;
	}
	.calendar-color{
		padding: 15rpx 10px;
		color: #e0ad38;
		background-color: #fffcf7;
		font-size: 28rpx;
	}
	.calendar-bottom{
		color: #333333;
		font-size: 28rpx;
	}
	.color-time{
		font-size: 26rpx;
		color: #999999;
		margin-right: 18rpx;
	}
	.exclusiveItem{
		width: 236rpx !important;
	}
	.exclusiveSwiper{
		width: 100%;
		display: flex;
	}
	.uni-exclusive{
		padding: 20rpx 30rpx;
	}
	.uni-exclusive>.exclusiveSwiper{
		height: 320rpx;
	}
	.uni-exclusive .songList{
		padding: 0;
	}
	.icon-chevron-copy{
		font-size: 28rpx;
		font-weight: bold;
		color: #343434;
	}
</style>
