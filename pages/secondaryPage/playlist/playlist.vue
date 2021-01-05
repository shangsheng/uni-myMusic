<template>
	<view class="playlist" >
		<view class="uni-header" v-if="playlistData" :style="{'background-image':'url('+headerBackground+')'}">
			<view class="backgroundFilter" :style="{'background-image':'url('+headerBackground+')'}"></view>
			<!-- <view class="status_bar"> -->
			          <!-- 这里是状态栏 -->
			<!-- </view> -->
			<uni-nav-bar class="padding-top" @clickLeft="goBack" @clickRight="clickSearch" left-icon="back" :leftText="text"  :title="title"  :statusBar="statusBar" :rightIcon="rightIcon" :color="color" :backgroundColor="backgroundColor"></uni-nav-bar>
		</view>
		<scroll-view scroll-y :style="{'height': scrollHeigh+'px'}" >
			<view v-if="playlistData" :style="{'background-image':'url('+headerBackground+')'}">
				<view class="m-info">
					<view class="m-coverImg">
						<image :src="playlistData.coverImgUrl" class="coverImg"></image>
						<view class="recommend-playData">
							<view class="icon icon-icon-bofang iconfont icon-width-12"></view>
							<text class="count">{{playlistData.playCount | countNumber}}</text>
						</view>
					</view>
					<view class="m-cnt">
						<view class="m-cnt-name">
							<text class="des-name">{{playlistData.name}}</text>
						</view>
						<view class="m-cnt-creator">
							<view class="creator-img">
								<image :src="playlistData.creator.avatarUrl" class="avatar-img"></image>
							</view>
							<view class="creator-name"><text>{{playlistData.creator.nickname}}</text></view>
							<view class="creator-gz" @click="clickTag">
								<uni-icons type="plusempty" size="30" color="#c9c9c9"></uni-icons>
							</view>
						</view>
						<view class="m-cnt-description">
							<text class="des-title" selectable="true">{{playlistData.description}}</text>
							<uni-icons type="arrowright" size="18" color="#8e8f8a"></uni-icons>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-container">
				<view class="uni-fexiang " :class="{'uni-fexiang-color':!playlistData}">
					<view class="uni-li">
						<view class="icon iconfont icon-width-56 icon-wenjianjia"></view>
						<text>收藏</text>
					</view>
					<view class="uni-line"></view>
					<view class="uni-li">
						<view class="icon iconfont icon-width-56 icon-xinxi"></view>
						<text>评论</text>
					</view>
					<view class="uni-line"></view>
					<view class="uni-li">
						<view class="icon iconfont icon-width-56 icon-fenxiang"></view>
						<text>分享</text>
					</view>
				</view>
				<view class="uni-section" v-if="playlistData">
					<view class="uni-VIP-song">
						<view class="VIP-number">
							<image src="@/static/images/vip-logo_03.png" class="vipLogo"></image>
							<text class="main-color">含8首VIP专享歌曲</text>
						</view>
						<view class="VIP-kt">
							<text class="color">开通VIP仅5元</text>
							<view class="icon iconfont icon-width-40 icon-chevron-copy"></view>
						</view>
					</view>
					<view class="uni-play">
						<view class="play-song">
							<view class="icon iconfont icon-icon_play icon-width-40"></view>
							<text class="main-color">播放全部</text>
							<text class="uni-listNumber">({{playlistData.tracks.length}})</text>
						</view>
						<view class="uni-down-xz">
							<view class="icon iconfont icon-Download_icon icon-width-40"></view>
							<view class="icon iconfont icon-iconset0126 icon-width-40"></view>
						</view>
					</view>
					<view class="uni-song-list">
						<scroll-view scroll-y :style="{'height': songsHeigh+'px'}">
							
							<view class="uniSong">
								<view class="songlist" v-for="(item,index) in playlistData.tracks" :key="index" :data-id="item.id">
									<view class="songNumber">
										<text>{{index+1}}</text>
									</view>
									<view class="nameAr">
										<view class="name"><text class="main-color">{{item.name}}</text></view>
										<view class="ar">
											<view class="dujia">独家</view>
											<view class="SQ">SQ</view>
											<view class="ar-al">
												<text v-for="(arItem,arIndex) in item.ar" :key="arIndex">{{arIndex===0?arItem.name:'/'+arItem.name}}</text>
												<text v-if="item.al">-{{item.al.name}}</text>
											</view>
										</view>
									</view>
									<view class="vm-xq">
										<view class="vmVideo">
											<view class="icon iconfont icon-icon_play icon-width-53"></view>
										</view>
										<view class="moreDetails">
											<view class="icon iconfont icon-ziyuan icon-width-10"></view>
										</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			
		</scroll-view>
		
		<view class="playerSongs">
			<songSplayer ref="songsPlayer" :songsData="songsData"></songSplayer>
		</view>
	</view>
</template>

<script>
	import songSplayer from '../../template/player.vue';
	
	import { playCount, dateUtils } from '@/common/util.js';
	import { uniAudio, audioPlay } from '@/common/player.js';
	export default{
		components:{songSplayer},
		data(){
			return{
				text:"歌单",
				title:'菜单',
				color:"#ffffff",
				backgroundColor:"transparent",
				//#ifndef MP-WEIXIN
				rightIcon:"search",
				//#endif
				statusBar:true,
				playlistData:null,
				privileges:null,
				headerBackground:null,
				songsData:{},
				scrollHeigh:500,
				songsHeigh:400
			}
		},
		onLoad(option) {
			console.log(option)
			this.getPlaylist(option.id);
			
		},
		onReady(){
			this.getInof();
		},
		onShow(){
			let _this = this;
			console.log(this)
			console.log(uni)
			if(!uniAudio.paused&&this.$refs.songsPlayer){
				this.$refs.songsPlayer.onCanplay();
				this.$refs.songsPlayer.onTimeUpdate();
				this.$refs.songsPlayer.onWaiting();
				this.$refs.songsPlayer.onEnded();
			}else if(this.$refs.songsPlayer){
				this.$refs.songsPlayer.play=false;
				let audioDuration;
				uni.getStorage({
				    key: 'audioDuration',
				    success: function (res) {
						console.log(res)
				       audioDuration=res.data;
					   let currentTime = 0;
					   uni.getStorage({
					       key: 'currentTime',
					       success: function (res) {
					   		console.log(res)
					        currentTime=res.data;
					   	   let timeNum = audioDuration? currentTime/audioDuration*2:0;
					   	   console.log(timeNum)
					   	   _this.$refs.songsPlayer.dynamic(timeNum);
					       }
					   });
				    }
				});
				
			}
		},
		methods:{
			getPlaylist(id){
				this.$http.get(this.$_playlistDetail,{params:{id:id}}).then(res=>{
					console.log(res)
					this.playlistData = res.playlist;
					this.privileges = res.privileges;
					this.headerBackground = res.playlist.backgroundCoverUrl?res.playlist.backgroundCoverUrl:res.playlist.coverImgUrl;
				})
			},
			goBack(){
				uni.navigateBack({                         //uni.navigateTo跳转的返回，默认1为返回上一级
					    delta: 1
				});
			},
			//搜索
			clickSearch(){
				
			},
			//点击关注
			clickTag(){
			},
			//顶部距离
			scrolltoupper(e){
				console.log(e)
			},
			//获取高度
			getInof(){
				const _this = this;
				this.$nextTick(()=>{
					uni.getSystemInfo({
						success(res){
							console.log(res.windowWidth)
							_this.$refs.songsPlayer.audioArc= (res.windowWidth/750)*84/2;
							_this.scrollHeigh = res.windowHeight;
							let phoneHeight = 0;
							console.log(res.windowHeight);
							// 计算组件的高度
							let view = uni.createSelectorQuery().in(_this).select('.m-info');
							console.log(view)
							view.boundingClientRect(data => {
								console.log(data)
							    phoneHeight =data.height;
							}).exec();
							// let uniFexiang = uni.createSelectorQuery().select('.uni-fexiang');
							// uniFexiang.boundingClientRect(data => {
							//     phoneHeight =phoneHeight+data.height;
							// }).exec();
							// let uniVIPsong = uni.createSelectorQuery().select('.uni-VIP-song');
							// uniVIPsong.boundingClientRect(data => {
							//    phoneHeight =phoneHeight+data.height;
							//    this.songsHeigh = res.windowHeight-phoneHeight;
							// }).exec();
						}
					})
					
				})
			}
		},
		filters:{
			countNumber(num){
				return playCount(num)
			},
			noticeTime(time){
				return dateUtils.noticeTime(time)
			}
		},
	}
</script>

<style scoped>
	.playerSongs{
		bottom: 0;
	}
	.status_bar {
	      height: var(--status-bar-height);
	      width: 100%;
	  }
	.uni-header{
		background-color: #666666;
		background-position: center;
		background-repeat: no-repeat;
		background-size: 100%;
		position: relative;
		padding-bottom: 25rpx;
	}
	.backgroundFilter{
		position: absolute;
		top: 0;
		left: 0;
		background:url('http://cms-bucket.ws.126.net/2020/1230/98d8ce59p00qm57ao0000c0001o001oc.png') no-repeat 0/cover fixed;
		width:100%; 
		height:100%;
		filter:blur(20rpx);
		z-index: 0;
	}
	.m-info{
		position: relative;
		z-index: 2;
		padding: 80rpx 30rpx;
		display: flex;
		justify-content: space-between;
	}
	.m-coverImg{
		width: 183rpx;
		height:183rpx;
		position: relative;
	}
	.m-coverImg::before{
		content: '';
		position: absolute;
		top: -18rpx;
		left: 50%;
		margin-left: -75rpx;
		width: 150rpx;
		height: 18rpx;
		background-color: #616566;
		border-top-left-radius: 23rpx;
		border-top-right-radius: 23rpx;
	}
	.coverImg{
		width: 183rpx;
		height: 183rpx;
		border-radius: 23rpx;
	}
	.m-cnt{
		width: 400rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.m-cnt-description{
		width: 100%;
		display: flex;
		align-items: center;
		height: 40rpx;
	}
	.m-cnt-description .des-title{
		font-size:32rpx;
		color: #9b9c97;
		width: 100%;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: inline-block;
		height: 50rpx;
		overflow: hidden;
	}
	.m-cnt-creator{
		display: flex;
		margin: 30rpx 0;
	}
	.creator-img{
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
	}
	.avatar-img{
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
	}
	.creator-name{
		font-size: 32rpx;
		color: #999997;
		margin-left: 30rpx;
		margin-right: 10rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.m-cnt-name{
		width: 100%;
	} 
	.m-cnt-name .des-name{
		font-size: 36rpx;
		color: #FFFFFF;
		-o-text-overflow: ellipsis;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		width: 100%;
	}
	.recommend-playData {
	    position: absolute;
	    right: 0;
	    top: 4rpx;
	    display: flex;
	    justify-content: flex-end;
	    color: #FFFFFF;
	    font-size: 26rpx;
	    background-color: rgba(0,0,0,0.3);
	    padding: 3.6rpx 7rpx;
	    -webkit-border-radius: 36rpx;
	    border-radius: 36rpx;
	}
	.creator-gz{
		    display: flex;
		    padding: 0px 32rpx;
		    height: 60rpx;
		    line-height: 60rpx;
		    justify-content: center;
		    color: #787974;
		    border-radius: 30rpx;
		    background-color: #787974;
		    border-width: 0.5rpx;
		    border-style: solid;
		    border-color: #787974;
	}
	.uni-container{
		position: relative;
		padding-top: 130rpx;
		background-color: #FFFFFF;
	}
	.uni-container::before{
		content: '';
		position: absolute;
		top:-70rpx;
		left: 0;
		width: 100%;
		height: 90rpx;
		background-image: url(../../../static/hx.png);
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100% auto;
	}
	.uni-section{
		padding: 30rpx;
	}
	.uni-fexiang{
		position: absolute;
		width: 520rpx;
		height: 87rpx;
		border-radius: 44rpx;
		background-color: #FFFFFF;
		box-shadow: 0 4rpx 14rpx #f5f5f5;
		top: -44rpx;
		left: 50%;
		margin-left: -260rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		color: #333333;
		font-size: 32rpx;
	}
	.uni-line{
		background-color: #e4e4e4;
		width: 3rpx;
		height: 40rpx;
	}
	.uni-fexiang .icon-width-56{
		font-size: 32rpx;
		text-align: center;
	}
	.uni-VIP-song{
		font-size: 27rpx;
		display: flex;
		justify-content: space-between;
		padding: 30rpx 20rpx;
		border: 2rpx solid #e9e9e9;
		border-radius: 20rpx;
	}
	.vipLogo{
		width: 39rpx;
		height: 30rpx;
		vertical-align: middle;
		margin-right: 23rpx;
	}
	.VIP-kt .color{
		color: #999999;
	}
	.VIP-kt .icon-chevron-copy{
		font-size: 30rpx;
		color: #999999;
		text-align: center;
	}
	.uni-song-list{
		width: 100%;
		
	}
	.uni-play{
		margin:39rpx 0;
		display: flex;
		justify-content: space-between;
	}
	.play-song{
		font-size: 25rpx;
		display: flex;
		flex-wrap: wrap;
		font-weight: bold;
	}
	.play-song .icon-icon_play{
		background-color: #ff4a3d;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		border-radius: 50%;
		margin-right: 27rpx;
	}
	.uni-down-xz{
		display: flex;
		flex-wrap: wrap;
		color: #323232;
	}
	.uni-down-xz .icon{
		font-size: 25rpx;
		color: #333333;
		font-weight: bold;
	}
	.uni-listNumber{
		color: #999999;
		margin-left: 20rpx;
	}
	.uni-fexiang-color{
		    background: #f7f7f7 !important;
		    color: #cbced2;
		    cursor: not-allowed;
	}
	.uniSong{
		width: 100%;
		padding-bottom: 100rpx;
	}
	.songlist{
		width: 100%;
		padding: 30rpx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.nameAr{
		width: 100%;
		flex-shrink:1;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.nameAr .name{
		font-size: 25rpx;
		margin-bottom: 20rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.vm-xq{
		width: 100rpx;
		display: flex;
		align-items: center;
		flex-shrink:0;
	}
	.songNumber{
		width: 53rpx;
		flex-shrink:0;
	}
	.ar{
		display: flex;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.ar .dujia{
		padding: 2rpx 4rpx;
		border: 3rpx solid #ddabaa;
		color: #db494a;
		font-size:13rpx;
		margin-right: 6rpx;
		border-radius: 4rpx;
		display: inline-block;
	}
	.ar .SQ{
		padding: 2rpx 4rpx;
		border: 3rpx solid #e2bdad;
		color: #f66933;
		font-size:13rpx;
		margin-right: 6rpx;
		border-radius: 4rpx;
		display: inline-block;
	}
	.ar .ar-al{
		font-size: 18rpx;
		color: #808080;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.uni-song-list{
		position: relative;
	}
	
</style>
