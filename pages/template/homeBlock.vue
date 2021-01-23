<template>
	<view class="block">
		<view class="homePage uni-card-modular" v-for="(pageItem,index) in blockData" :key="index" v-if="pageItem.type !== 'banners'">
			<view class="recommended" >
				<text class="uni-mainTitle" v-if="pageItem.uiElement.mainTitle">{{pageItem.uiElement.mainTitle.title}}</text>
				<view class="uni-header">
					<view class="uni-h3" :class="{'uniScallop':pageItem.type === 'scallop'}" v-if="pageItem.type !== 'songsDiscsalbums' && pageItem.type !== 'podcast' ">
						<text class="text" v-if="pageItem.uiElement.subTitle">{{pageItem.uiElement.subTitle.title}}</text>
						<view class="icon iocn-yun" v-if="pageItem.type === 'scallop' "></view>
					</view>
					<view class="uni-h3 songsAlums-h3" v-else-if="pageItem.type === 'podcast' ">
						<view class="songsAlbums" :class="{'active':podcastTitleIndex === 0}" data-index="0" @click="podcastTab">
							<text class="text">
								{{pageItem.uiElement.subTitle.title}}
							</text>
						</view>
						<view class="songsAlbums" :class="{'active':podcastTitleIndex === 1}" data-index="1" @click="podcastTab">
							<text class="text">
								广播电台
							</text>
						</view>
					</view>
					<view class="uni-h3 songsAlums-h3" v-else>
						<view class="songsAlbums" :class="{'active':songsTitleIndex === songsAlbumsIndex}" v-for="(songsTitleItem,songsTitleIndex) in pageItem.songsDiscsalbums" :key="songsTitleIndex" :data-index="songsTitleIndex" @click="AlbumsTab">
							<text class="text">
								{{ songsTitleItem.title}}
							</text>
							<navigator url="/playlistCollection" class="songsGd"><text class="text-gd icon-chevron-copy icon iconfont ">{{songsTitleItem.url.text}}</text></navigator>
						</view>
					</view>
					<navigator url="/playlistCollection" v-if=" pageItem.uiElement.button && pageItem.uiElement.button.actionType === 'orpheus'"><text class="text-gd icon-chevron-copy icon iconfont ">{{pageItem.uiElement.button.text}}</text></navigator>
					
					<button type="button" class="plays" v-else-if="pageItem.uiElement.button && pageItem.uiElement.button.actionType === 'client_customized'" :data-type="pageItem.type"><view class="icon icon-icon_play iconfont icon-width-14"></view>{{pageItem.uiElement.button.text}}</button>
					
				</view>
				
				<view class="uni-songList" v-if="pageItem.type === 'songList'">
					<view class="songList" v-for="item in pageItem.creatives" :key="item.creativeId">
						<navigator :url="'/pages/secondaryPage/playlist/playlist?id='+item.creativeId">
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
				<!--新歌 新碟  数字专辑 -->
				<view class="uni-songsAlbums" v-if="pageItem.type === 'songsDiscsalbums'">
					<view class="uni-albumsTab" v-show="songsAlbumsIndex === songsDiscsIndex"  v-for="( songsAlbumsItem,songsDiscsIndex ) in pageItem.songsDiscsalbums" :key="songsDiscsIndex">
						<swiper class="swiper-private" :previousMargin="previousMargin" :nextMargin="nextMargin" :circular="circular" :autoplay="autoplay">
							<swiper-item class="personalTailor" v-for="(item,bucketindex) in songsAlbumsItem.bucket" :key="bucketindex">
								<view class="private-item uni-flex" v-for="(privateItem,albumsNum) in item" :key="albumsNum">
										<view class="private-left" :data-id="privateItem.resourceId">
											<image :src="privateItem.uiElement.image.imageUrl" class="private-img"></image>
										<view class="icon icon-icon_play iconfont icon-width-18 bofang-color" v-if="privateItem.resourceType === 'song'"></view>
										</view>
									<view class="private-middle">
										<view class="uni-p">
											<text class="p-color">{{privateItem.uiElement.mainTitle.title}}</text>
										<text class="ellipsis" v-for="(artistsItem,AlbumsartistsIndex) in privateItem.resourceExtInfo.artists" :key="AlbumsartistsIndex">{{AlbumsartistsIndex===0?' - '+artistsItem.name:'/'+artistsItem.name}}</text>
										</view>
										<view class="uni-span" v-if="privateItem.uiElement.subTitle">
											<uni-tag type="error" size="12px" text="SQ" inverted="true" v-if="privateItem.uiElement.subTitle.titleType === 'songRcmdFromComment'"></uni-tag>
											<uni-tag type="error" size="12px" text="独家" inverted="true" v-else-if="privateItem.uiElement.subTitle.titleType !== 'songRcmdTag'"></uni-tag>
											<text class="title-color ellipsis" v-if="privateItem.uiElement.subTitle.titleType === 'songRcmdTag'">{{privateItem.uiElement.subTitle.title}}</text>
											<text v-else class="ellipsis text-w">{{privateItem.uiElement.subTitle.title}}</text>
										</view>
									</view>
									
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
				<view class="scallop" v-if="pageItem.type === 'scallop'">
					<swiper class="swiper-private" :previousMargin="previousMargin" :nextMargin="nextMargin" :circular="circular" :autoplay="autoplay">
						<swiper-item class="personalTailor" v-for="(item,scallopindex) in pageItem.creatives" :key="scallopindex">
							<view class="private-item uni-flex" v-for="(privateItem,scallopNum) in item.resources" :key="scallopNum">
									<view class="private-left" :data-id="privateItem.resourceId">
										<image :src="privateItem.uiElement.image.imageUrl" class="private-img"></image>
									<view class="icon icon-icon_play iconfont icon-width-18 bofang-color" v-if="privateItem.resourceType === 'song'"></view>
									</view>
								<view class="private-middle">
									<view class="uni-p">
										<text class="p-color">{{privateItem.uiElement.mainTitle.title}}</text>
										<view class="icon" v-if="privateItem.resourceExtInfo">
											<text class="ellipsis" v-for="(artistsItem,scallopArtistsIndex) in privateItem.resourceExtInfo.artists" :key="scallopArtistsIndex">{{scallopArtistsIndex===0?' - '+artistsItem.name:'/'+artistsItem.name}}</text>
										</view>
									</view>
									<view class="uni-span" v-if="privateItem.uiElement.subTitle">
										<uni-tag type="error" size="12px" text="SQ" inverted="true" v-if="privateItem.uiElement.subTitle.titleType === 'songRcmdFromComment'"></uni-tag>
										<uni-tag type="error" size="12px" text="独家" inverted="true" v-else-if="privateItem.uiElement.subTitle.titleType !== 'songRcmdTag'"></uni-tag>
										<text class="title-color ellipsis" v-if="privateItem.uiElement.subTitle.titleType === 'songRcmdTag'">{{privateItem.uiElement.subTitle.title}}</text>
										<text v-else class="ellipsis text-w">{{privateItem.uiElement.subTitle.title}}</text>
									</view>
								</view>
								
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="podcast" v-if="pageItem.type === 'podcast' ">
					<view class="podcast-tab" :class="{'podcast-active':podcastTitleIndex === 0}">
						<swiper class="swiper-podcast" :previousMargin="previousMargin" :nextMargin="nextMargin" :circular="circular" :autoplay="autoplay" :display-multiple-items="3">
							<swiper-item class="podcast-item" v-for="(item,podcastIndex) in pageItem.creatives" :key="podcastIndex" :data-action="item.action">
								<view class="podcast-img">
									<image :src="item.uiElement.image.imageUrl" class="podcastImg"></image>
									<view class=" podcastPlay">
										<view class="icon icon-icon_play iconfont icon-width-18 bofang-color"></view>
									</view>
								</view>
								<view class="podcast-title">
									<text class="ellipsis podcast-text">{{item.uiElement.mainTitle.title}}</text>
								</view>
							</swiper-item>
						</swiper>
					</view>
					<view class="podcast-tab" :class="{'podcast-active':podcastTitleIndex === 1}">
						<swiper class="swiper-podcast" :previousMargin="previousMargin" :nextMargin="nextMargin" :circular="circular" :autoplay="autoplay" :display-multiple-items="3">
							<swiper-item class="podcast-item" v-for="(item,broadcastIndex) in broadcastData.list" :key="broadcastIndex" :data-id="item.program.id">
								<view class="podcast-img">
									<image :src="item.program.coverUrl" class="podcastImg"></image>
									<view class=" podcastPlay">
										<view class="icon icon-icon_play iconfont icon-width-18 bofang-color"></view>
									</view>
								</view>
								<view class="podcast-title">
									<text class="ellipsis podcast-text">{{item.program.name}}</text>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
				<view class="podcast" v-if="pageItem.type === 'podcast24' ">
					<view class="podcast-tab podcast-active">
						<swiper class="swiper-podcast" :previousMargin="previousMargin" :nextMargin="nextMargin" :circular="circular" :autoplay="autoplay" :display-multiple-items="3">
							<swiper-item class="podcast-item" v-for="(item,podcastIndex) in pageItem.creatives" :key="podcastIndex" :data-action="item.action">
								<view class="podcast-img">
									<image :src="item.uiElement.image.imageUrl" class="podcastImg"></image>
									<view class=" podcastPlay">
										<view class="icon icon-icon_play iconfont icon-width-18 bofang-color"></view>
									</view>
								</view>
								<view class="podcast-title">
									<text class="ellipsis podcast-text">{{item.uiElement.mainTitle.title}}</text>
								</view>
							</swiper-item>
						</swiper>
					</view>
					
				</view>
				<view class="yuncunKTV" v-if="pageItem.type === 'yuncunKTV' ">
					<swiper class="swiper-yuncunKtv" :previousMargin="previousMargin" :nextMargin="nextMargin" :circular="circular" :autoplay="autoplay" :display-multiple-items="3">
						<swiper-item class="podcast-item" v-for="(item,yuncunKTVIndex) in pageItem.extInfo.roomInfoList" :key="yuncunKTVIndex" :data-liveId="item.liveId">
							<view class="podcast-img">
								<image :src="item.bgUrl" class="podcastImg"></image>
								<view class="yuncunKTV-bgc">
									<view class="recommend-playData">
										<view class="yinyuepinpu">
											<view class="li" v-for="anItem in animateNum" :key="anItem"></view>
										</view>
										<text class="count">{{item.label}}</text>
									</view>
									<view class="ktv-title"><text>{{item.title}}</text></view>
									<view class="ktv-avatar">
										<view class="avatar-border" v-for="avatarItem in item.onlineUserList" :key="avatarItem.userId" :data-userId="avatarItem.userId">
											<image :src="avatarItem.avatarUrl" class="avatar-img"></image>
										</view>
									</view>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="podcastCollection" v-if="pageItem.type === 'podcastCollection' ">
					<swiper class="swiper-podcastCollection" :previousMargin="previousMargin" :nextMargin="nextMargin" :circular="circular" :autoplay="autoplay" :display-multiple-items="3">
						<swiper-item class="podcastCollection-item" v-for="(item,podcastCollectionIndex) in pageItem.creatives" :key="podcastCollectionIndex" >
							<view class="songList">
								<navigator :url="'/djradio?id='+item.creativeId">
									<view class="recommendList">
										<image :src="item.uiElement.image.imageUrl" class="songImg"></image>
										<view class="recommend-playData">
											<view class="icon icon-icon-bofang iconfont icon-width-12"></view>
											<text class="count">{{item.creativeExtInfoVO.playCount | countNumber}}</text>
										</view>
									</view>
									<text class="titleSong">{{item.uiElement.mainTitle.title}}</text>
								</navigator>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="videoCollection" v-if="pageItem.type === 'videoCollection' ">
					<swiper class="swiper-videoCollection" :previousMargin="previousMargin" :nextMargin="nextMargin" :circular="circular" :autoplay="autoplay" :display-multiple-items="3">
						<swiper-item class="podcastCollection-item videoCollection-item" v-for="(item,videoCollectionIndex) in pageItem.creatives" :key="videoCollectionIndex" >
							<view class="songList">
								<navigator :url="'/djradio?id='+videoCollectionItem.creativeId" v-for="videoCollectionItem in item.resources" :key="videoCollectionItem.creativeId">
									<view class="recommendList">
										<image :src="videoCollectionItem.uiElement.image.imageUrl" class="songImg"></image>
										<view class="recommend-playData">
											<view class="icon icon-icon-bofang iconfont icon-width-12"></view>
											<text class="count">{{videoCollectionItem.resourceExtInfo.playCount | countNumber}}</text>
										</view>
									</view>
									<text class="titleSong">{{videoCollectionItem.uiElement.mainTitle.title}}</text>
								</navigator>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="videoCollection" v-if="pageItem.type === 'videoShuffle' ">
					<swiper class="swiper-videoCollection" :previousMargin="previousMargin" :nextMargin="nextMargin" :circular="circular" :autoplay="autoplay" :display-multiple-items="3">
						<swiper-item class="podcastCollection-item videoCollection-item" v-for="(item,videoShuffleIndex) in pageItem.extInfo" :key="videoShuffleIndex" >
							<view class="songList">
								<navigator :url="item.resource.shareUrl"  >
									<view class="recommendList">
										<image :src="item.resource.mlogExtVO.song.coverUrl" class="songImg"></image>
										<view class="recommend-playData">
											<view class="icon icon-icon-bofang iconfont icon-width-12"></view>
											<text class="count">{{item.resource.mlogExtVO.playCount | countNumber}}</text>
										</view>
									</view>
									<text class="titleSong">{{item.resource.mlogExtVO.song.name}}</text>
								</navigator>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view class="playerSongs">
			<songSplayer ref="songsPlayer" :playListId="playListId" :playerIndex="playIndex" v-if="playerShow" :titles="titles"></songSplayer>
		</view>
	</view>
</template>

<script>
	import songSplayer from './player.vue';
	// import carousel from '@/components/vear-carousel/vear-carousel'
	import { playCount, dateUtils } from '@/common/util.js';
	export default{
		components:{songSplayer},
		data(){
			return{
				previousMargin:"30rpx",
				nextMargin:'30rpx',
				circular:false,
				autoplay:false,
				songsAlbumsIndex:0,
				podcastTitleIndex:0,
				animateNum:5,
				songsData:{},
				playerShow:false
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
			},
			broadcastData:{
				type:Object,
				default:{}
			},
			playListId:{
				type:Number,
				default:0
			},
			playIndex:{
				type:Number,
				default:0
			},
			titles:{
				type:String,
				default:''
			}
		},
		created() {
			console.log(this.playListId)
			console.log(this.playIndex)
			this.playerShow = true;
		},
		filters:{
			countNumber(num){
				return playCount(num)
			},
			noticeTime(time){
				return dateUtils.noticeTime(time)
			}
		},
		methods:{
			AlbumsTab($event){
				this.songsAlbumsIndex = Number($event.currentTarget.dataset.index);
			},
			podcastTab($event){
				this.podcastTitleIndex = Number($event.currentTarget.dataset.index);
				console.log(this.broadcastData)
			},
		},
		watch:{
			playIndex(newIndex){
				console.log(newIndex)
				 this.playerShow = false;
				this.$nextTick(() => {
				       this.playerShow = true;
				  })
			}
		}
	}
</script>

<style scoped="scoped">
	view{
		box-sizing: border-box;
	}
	.block{
		width: 100%;
	}
	.homePage{
		width: 100%;
		padding: 40rpx 0;
		margin-bottom: 30rpx;
		border-radius: 15rpx;
	}
	.homePage:first-of-type{
		border-top-left-radius: 0;
		border-top-right-radius: 0;
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
		font-weight: 100;
		position: relative;
		padding-right: 30rpx;
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
		height: 40rpx;
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
	.icon-chevron-copy::before{
		position: absolute;
		top: 50%;
		right:10rpx;
		width: 21.6rpx;
		height: 21.6rpx;
		display: block;
		margin-top: -26rpx;
	}
	.songsAlums-h3{
		width: 80%;
		display: flex;
		align-items: center;
		position: relative;
	}
	.songsAlbums .text{
		padding-right: 50rpx;
		color: #9c9c9c;
		position: relative;
	}
	.songsAlbums .text::after{
		content: '';
		display: block;
		width: 2rpx;
		height: 50rpx;
		background-color: #e3e3e3;
		position: absolute;
		top: 0;
		right: 25rpx;
	}
	.songsAlbums:last-of-type .text::after{
		display: none;
	}
	.songsAlbums.active .text{
		color: #333333;
	}
	.songsGd{
		position: absolute;
		right: 0;
		top: 0;
		display: none;
	}
	.songsAlbums.active .songsGd{
		display: block;
	}
	.uni-albumsTab{
		margin-top: 38rpx;
	}
	.uniScallop{
		position: relative;
	}
	.uniScallop .text{
		font-size: 28rpx;
	}
	.iocn-yun{
		position: absolute;
		top: 16rpx;
		right: -32rpx;
		width: 32rpx;
		height: 32rpx;
		background: url(../../static/icon-yun.png) no-repeat;
		background-size: 32rpx 32rpx;
	}
	.scallop .swiper-private{
		height: 190rpx;
	}
	.podcast-tab{
		width: 100%;
		margin-top: 40rpx;
		display: none;
	}
	.podcast-active{
		display: block;
	}
	.swiper-podcast{
		width: 100%;
		height: 340rpx;
	}
	.podcast-item{
		width: 280rpx;
		text-align: center;
	}
	.podcast-img{
		width: 220rpx;
		height: 220rpx;
		border-radius: 50%;
		position: relative;
	}
	.podcastImg{
		width: 220rpx;
		height: 220rpx;
		border-radius: 50%;
	}
	.podcastPlay{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba(0,0,0,0.3);
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
	}
	.podcast-title{
		width: 100%;
		margin-top: 25rpx;
	}
	.podcast-title .podcast-text{
		display: inline-block;
		width: 100%;
	}
	.yuncunKTV{
		margin-top: 45rpx;
		width: 100%;
	}
	.swiper-yuncunKtv{
		height: 440rpx;
	}
	.swiper-yuncunKtv .podcast-img{
		width: 220rpx;
		position: relative;
		height: 100%;
		border-radius: 28rpx;
	}
	.swiper-yuncunKtv .podcastImg{
		width: 220rpx;
		height: 100%;
		border-radius: 28rpx;
	}
	.yuncunKTV-bgc{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.3);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border-radius: 28rpx;
		padding: 15rpx;
		box-sizing: border-box;
	}
	.yuncunKTV-bgc .recommend-playData{
		align-items: flex-end;
		position: relative;
		display: inline-block;
	}
	.ktv-title{
		font-size: 42rpx;
		color: #FFFFFF;
		text-align: center;
	}
	.ktv-avatar{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}
	.avatar-border{
		position: relative;
		margin-left: -15rpx;
		width: 54rpx;
		height: 45rpx;
		border-radius: 50%;
	}
	.avatar-img{
		width: 54rpx;
		height: 54rpx;
		border-radius: 50%;
	}
	.avatar-border::after{
		content: '';
		width: 54rpx;
		height: 54rpx;
		display: block;
		box-sizing: border-box;
		border: 3rpx solid rgba(255,255,255,0.3);
		position: absolute;
		top: 0;
		left: 0;
		z-index: 5;
		border-radius: 50%;
	}
	.avatar-border:first-of-type{
		margin: 0;
		z-index: 4;
	}
	.avatar-border:nth-of-type(2){
		z-index: 3;
	}
	.avatar-border:nth-of-type(3){
		z-index: 2;
	}
	.yuncunKTV-bgc .recommend-playData .yinyuepinpu{
		width: 72rpx;
	}
	.yuncunKTV-bgc .recommend-playData .count{
		position: absolute;
		right: 8rpx;
		top: 0;
	}
	.yuncunKTV-bgc .recommend-playData .yinyuepinpu .li{
		margin-top: 20rpx;
	}
	.podcastCollection{
		width: 100%;
	}
	.podcastCollection .swiper-podcastCollection{
		height: 400rpx;
	}
	.podcastCollection-item{
		width: 100%;
	}
	.videoCollection{
		width: 100%;
	}
	.videoCollection .swiper-videoCollection{
		height: 400rpx;
	}
</style>
