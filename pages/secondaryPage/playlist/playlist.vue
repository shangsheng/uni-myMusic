<template>
	<view class="playlist" >
		<view class="uni-header" v-if="playlistData" :style="{'background-image':'url('+headerBackground+')'}">
			<view class="backgroundFilter" :style="{'background-image':'url('+headerBackground+')'}"></view>
			<!-- <view class="status_bar"> -->
			          <!-- 这里是状态栏 -->
			<!-- </view> -->
			<uni-nav-bar class="padding-top" @clickLeft="goBack" @clickRight="clickSearch" left-icon="back" :leftText="text"  :title="title"  :statusBar="statusBar" :rightIcon="rightIcon" :color="color" :backgroundColor="backgroundColor"></uni-nav-bar>
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
			<view class="uni-fexiang"></view>
			<view class="uni-section"></view>
		</view>
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
			}
		},
		onLoad(option) {
			console.log(option)
			this.getPlaylist(option.id);
			this.$nextTick(()=>{
				uni.getSystemInfo({
					success:(res)=>{
						console.log(res.windowWidth)
						this.$refs.songsPlayer.audioArc= (res.windowWidth/750)*84/2;
					}
				})
			})
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
	}
</style>
