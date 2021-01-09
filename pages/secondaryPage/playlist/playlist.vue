<template>
	<view class="playlist" >
		<view class="uni-header" v-if="playlistData" :style="{'background':headerBackground?headerBackground:'url('+jianjieBackgrund+')',}">
			<!-- <view class="backgroundFilter" :style="{'background':'url('+jianjieBackgrund+') '+headerBackground +''}"></view> -->
			<!-- <view class="status_bar"> -->
			          <!-- 这里是状态栏 -->
			<!-- </view> -->
			<uni-nav-bar class="padding-top" @clickLeft="goBack" @clickRight="clickSearch" left-icon="back" :leftText="text"  :title="title"  :statusBar="statusBar" :rightIcon="rightIcon" :color="color" :backgroundColor="backgroundColor"></uni-nav-bar>
		</view>
		<scroll-view scroll-y :style="{'height': scrollHeigh+'px'}" >
			<view v-if="playlistData" :style="{'background':headerBackground?headerBackground:'url('+jianjieBackgrund+')',}">
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
						<view class="play-song" @click="allPlay" :data-id="playlistData.id">
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
								<view class="songlist" v-for="(item,index) in playlistData.tracks" :key="index" :data-id="item.id" @click="allPlay">
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
			<songSplayer ref="songsPlayer" :playListId="playListId" :playIndex="playIndex"></songSplayer>
		</view>
	</view>
</template>

<script>
	import songSplayer from '../../template/player.vue';
	
	import { playCount, dateUtils,rgbObj } from '@/common/util.js';
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
				jianjieBackgrund:null,
				playListId:0,
				scrollHeigh:500,
				songsHeigh:400,
				playIndex:0,//播放第几条歌曲
			}
		},
		onLoad(option) {
			console.log(option)
			this.getPlaylist(option.id);
			uni.getStorage({
				key:'playlistId',
				success:(res)=>{
					this.playListId = Number(res.data)
				}
			})
			uni.getStorage({
				key:'playIndex',
				success:(res)=>{
					this.playIndex = Number(res.data)
				}
			})
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
			uni.getStorage({
				key:'playlistId',
				success:(res)=>{
					this.playListId = Number(res.data)
				}
			})
			uni.getStorage({
				key:'playIndex',
				success:(res)=>{
					this.playIndex = Number(res.data)
				}
			})
		},
		methods:{
			getPlaylist(id){
				this.$http.get(this.$_playlistDetail,{params:{id:id}}).then(res=>{
					console.log(res)
					this.playlistData = res.playlist;
					this.privileges = res.privileges;
					this.playListId = res.playlist.id;
					this.jianjieBackgrund = res.playlist.backgroundCoverUrl?res.playlist.backgroundCoverUrl + '?imageView&blur=40x20' :res.playlist.coverImgUrl + '?imageView&blur=40x20';
					// #ifdef H5
					this.$rgbaster.colors(this.jianjieBackgrund,{
						success:(respayload)=>{
							// console.log(respayload.dominant)
							// this.headerBackground = respayload.dominant;
							// console.log(respayload.secondary)
							// console.log(respayload.palette);//计算所有的颜色值得平均值
							this.headerBackground = rgbObj.rgbColor(respayload.palette)
						},
						fail:(err)=>{
							console.log(err)
						}
					})
					// #endif
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
							setTimeout(()=>{
								let view = uni.createSelectorQuery().in(_this).select('.uni-play');
								console.log(view)
								view.boundingClientRect(data => {
									console.log(data)
								    phoneHeight =data.height;
									let uniVIPsong = uni.createSelectorQuery().in(_this).select('.uni-VIP-song');
									uniVIPsong.boundingClientRect(data => {
										console.log(data)
									   phoneHeight =phoneHeight+data.height;
									   _this.songsHeigh = res.windowHeight-phoneHeight;
									}).exec();
								}).exec();
							},1000)
						}
					})
					
				})
			},
			//点击全部播放
			allPlay(event){
				console.log(event)
				uni.navigateTo({
					url:'../songDetails/songDetails?id='+event.currentTarget.dataset.id+'&songPlayIndex='+this.playIndex,
					// #ifdef APP-PLUS
					animationType:'slide-in-bottom',
					// #endif
					events:{
						songPlayIndex:(data)=>{
							console.log(data)
							this.playIndex = data.songPlayIndex;
						}
					},
					success:(res)=>{
						console.log(res)
						res.eventChannel.emit('privilegesIdprivileges', { data: this.privileges })
					},
					fail:(res)=>{
						console.log(res)
					}
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
		/* background:url('http://cms-bucket.ws.126.net/2020/1230/98d8ce59p00qm57ao0000c0001o001oc.png') no-repeat 0/cover fixed; */
		width:100%; 
		height:100%;
		/* filter:blur(20rpx); */
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
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABDgAAABaCAYAAABdY+bNAAASZ0lEQVR4Xu3d+ZN8VXkH4PeICCKriGjAJRrcMTGauMREslXWSirrv5g9qaSyWVnEREESjQq4EhUUgmyyI4v4pt7JOeTaznyZme7p7tv93Kq3zrm3u+895zn9y3xq+t4WNgIECBAgQIAAAQIECBAgQIDAzAVaZl7fWrtt5vMwfAIECBAgQIAAAQIECBAgQGCPBSrguDUi/qiqtXbnHluYOgECBAgQIECAAAECBAgQIDBTgQo4so/95oj444j4k9bafTOdj2ETIECAAAECBAgQIECAAAECeySQmVdXjjENOMb0Px4RfxoRf9Zae2CPTEyVAAECBAgQIECAAAECBAgQmIlAZl4VEX8QEX/YWrvhsIBjTOXGiPjzHnTcP5P5GSYBAgQIECBAgAABAgQIECCwwwKZ+eoebPx+RNxQU221TX6ictT0PxERfxERf9la++YOG5kaAQIECBAgQIAAAQIECBAgsKUCmfn6iPjdiPi9iPjwdJjHDTjGZz4TEX/Vg44vbel8DYsAAQIECBAgQIAAAQIECBDYIYHMfHsPNn4nIt572NROGnCMc3wlIv66qrV20w6ZmQoBAgQIECBAgAABAgQIECCwJQKZ+aGI+O1ebz3XsE4bcIxz1g1I/6aqtVatjQABAgQIECBAgAABAgQIECCwlEBm/lZEjKobib7otmzAMb3A30bEQbXW7nnRK3sDAQIECBAgQIAAAQIECBAgQKALZOY1EfGbkzqRzSoDjnHhz0bE31W11j51otF4MwECBAgQIECAAAECBAgQILBXApn5gYj4jV7vOe3kzyLgGGP5TkT8Q0T8fVVr7ZHTDtLnCBAgQIAAAQIECBAgQIAAgd0RyMzLI+LXe/1aRLxy2dmdZcAxHdvNEfHRiPjH1totyw7a5wkQIECAAAECBAgQIECAAIH5CWTm+yPiVyPiVyLig6ucwboCjjHmh3vQUWHHR1tr965yMs5FgAABAgQIECBAgAABAgQIbJdAZr62BxoValRdcRYjXHfAMZ3DbRHxT6Naa8+fxQSdkwABAgQIECBAgAABAgQIEFivQGaeFxG/PKnrz3oEmww4pnP71x50/HNr7dNnPWnnJ0CAAAECBAgQIECAAAECBFYvkJnvi4hf6sHGL6z+CkefcVsCjjHCRyPiX3pV2PHVdWK4FgECBAgQIECAAAECBAgQIHAygcx8Sw81fjEiqi472RlW8+5tCzims7o7Ij4WEfXfHR9rrd21mik7CwECBAgQIECAAAECBAgQILCMQGa+ISJ+PiLqvzSqvXaZ863is9sccEzn97UedtwYETe21u5ZxeSdgwABAgQIECBAgAABAgQIEDieQGZeExE39KpQ483H++R63jWXgGOqcUdEfLyCjmpba/WfHjYCBAgQIECAAAECBAgQIEBgxQKZWf+Z8ZEealR73YovsbLTzTHgmE6+/rPj30a11r6+MhknIkCAAAECBAgQIECAAAECeyiQmW+KiJ+b1Fb9p8ZRSzL3gGM6r/pPjn8f1Vq7fQ+/h6ZMgAABAgQIECBAgAABAgROLJCZ74qIn53Uxu+pcdJJ7FLAMZ37Iz3o+EREfLK19smTwng/AQIECBAgQIAAAQIECBDYZYHM/JmIqPpwDzYun/N8dzXgmK5JVsgxqZtaaw/NedGMnQABAgQIECBAgAABAgQInFQgM6+MiA/1UGOEG+2k59nW9+9DwLFo/5WIuGlUa+2L27o4xkWAAAECBAgQIECAAAECBJYRyMx39FCjgo2qty5zvm3+7D4GHNP1eDQibo6IT422tfbYNi+YsREgQIAAAQIECBAgQIAAgaMEMvPSiPhARHxw0l62D2L7HnAsrvEXIuKWHnjc0lq7dR++BOZIgAABAgQIECBAgAABAvMVyMx3R8T7e6BR7TvnO5vTj1zAcbTdd3vYUYHHf1S/tXbP6al9kgABAgQIECBAgAABAgQILC+Qmdf0QOOne1uhxsuXP/O8zyDgOP76VbhRQcd/jtbPWY6P550ECBAgQIAAAQIECBAgcDqB/rOTn4qICjRGWyGHbSIg4Dj916FuVlphx6dH21p79vSn80kCBAgQIECAAAECBAgQIBCRmS+LiPf1MGO0O3tz0FWtuYBjVZIRt/WwowKPz1S/tfb86k7vTAQIECBAgAABAgQIECCwiwKZeV4PNN7b2wo1rt/FuZ7lnAQcZ6f7+R50VNjxX9VvrT13dpdzZgIECBAgQIAAAQIECBCYg0Bmnh8RFWb8ZG+r/+NzGPs2j1HAsb7Vub0HHRV2fLb6rbUn1nd5VyJAgAABAgQIECBAgACBTQhk5sU9zHhPbyvYeNcmxrLL1xRwbG5174iIz/WwowKPz7XWvr254bgyAQIECBAgQIAAAQIECKxCIDNfExE/EREVaFRV/7pVnNs5jhYQcGzPt6PCjQo8Rn2+tfbl7RmekRAgQIAAAQIECBAgQIDAYQKZ+bb+E5MKMkZVyGFbo4CAY43YJ7zU0xFxa0TUvTxG3erRtCdU9HYCBAgQIECAAAECBAisUKA/svXdPdCo+2ZU1f6FK7yMU51CQMBxCrQNfuTOHnpU8HFQrbV6XK2NAAECBAgQIECAAAECBM5AIDPr8awVYEzrjWdwKadcUkDAsSTghj/+bPzf42l/oNzLY8Or4vIECBAgQIAAAQIECMxSoN87ox7Pulgvm+WE9mzQAo7dW/AHe+BRT235QkRUe3tr7dHdm6oZESBAgAABAgQIECBA4HQCmXlZf5JJPc3knb1fwcarTndGn9q0gIBj0yuwnuvf3YOOCjxeqNbak+u5vKsQIECAAAECBAgQIEBgcwKZ+YoeYlSQMaqCjWs3NypXXrWAgGPVovM5X93P44uL1Vp7fD5TMFICBAgQIECAAAECBAj8oEBmXhIR7zik3Ddjx78sAo4dX+ATTu9bEfGlXhV+HPRba/WzFxsBAgQIECBAgAABAgS2SiAz6+ckb+9Vocbov26rBmowaxEQcKyFedYXeSAivtzDjhfa1lr9B4iNAAECBAgQIECAAAECaxHIzPoPjLf1EGPaXrWWAbjI1gsIOLZ+ibZygE9HRD2etgKPquof7LfWntrKERsUAQIECBAgQIAAAQKzEMjMi3qQUY9nraowo6r6F85iEga5EQEBx0bYd/ai9ROXCjq+Om1ba9/Y2RmbGAECBAgQIECAAAECpxbIzB/twcVbFlo/MTm16v5+UMCxv2u/rpk/1wOPCj1G3VH91tp96xqE6xAgQIAAAQIECBAgsDmBzLw6IirEuK631R91/uZG5sq7JCDg2KXVnNdcHouICjqm9d+176am81pIoyVAgAABAgQIECAwBPpNPyvE+LEeZlR/1KWkCJylgIDjLHWd+zQCD0dEBR0/VK21+09zQp8hQIAAAQIECBAgQGC1Apn56h5iVJCxWFes9mrORuB4AgKO4zl51+YFHo+Ir/Xgo9oXqrV21+aHZwQECBAgQIAAAQIEdk8gM98QEW9eqAo06tgluzdjM5qzgIBjzqtn7CXwfA87vj5pq39QrbUnMBEgQIAAAQIECBAgcLRAZl4cEW9aqAow6li15/EjMAcBAcccVskYTytQP2mpJ7hU2DFtv+HJLqcl9TkCBAgQIECAAIG5CvQnltRTS6oqvJi29ZMTG4FZCwg4Zr18Br+EQAUed/bgY9re2Vq7e4nz+igBAgQIECBAgACBjQlk5rUR8cZeFWBUf9pubGwuTOCsBQQcZy3s/HMT+F4PPir0qKr7e7zQtta+NbcJGS8BAgQIECBAgMBuCWTm63pwUffHqABjtCPYeOluzdhsCBxPQMBxPCfvIlAC3++BR4UeVd9caO9qrT2DigABAgQIECBAgMAyApl5QQ8tKrh4fe+Pto5VvWSZa/gsgV0UEHDs4qqa06YE7ouI+g+PCj6mdXCstfbtTQ3MdQkQIECAAAECBLZLIDNf08OL+m+MCi+mVceu3q4RGw2B7RcQcGz/Ghnhbgg810OPCjvqHh/VTuvu1tpDuzFVsyBAgAABAgQIEMjMKyOi7odRYcW0xrEKNM4nRYDA6gQEHKuzdCYCywg81YOPCj8Oq3taa/VUGBsBAgQIECBAgMAWCGRmPXXkmh5iVGhxWF20BUM1BAJ7IyDg2JulNtGZCzwbEff08KPaxfqfOtZaq/fZCBAgQIAAAQIElhDIzJf18OJHeltBxrQqzKj9ep+NAIEtERBwbMlCGAaBFQg82IOPCjtGVRAy+ve21qpvI0CAAAECBAjstUBmVnDx2oiodoQYoz/2X7XXSCZPYIYCAo4ZLpohE1hC4N4eeFQ7qkKP0a8boVYQUo/LtREgQIAAAQIEZiWQmfV41Aou6gae1Y4QY/Sn+7Oam8ESIPDiAgKOFzfyDgL7JvBARBwEHb2t/g9Va+3hfYMxXwIECBAgQGBzApl5RQ8uKrw4rEawcdXmRunKBAhsUkDAsUl91yYwX4FnIqIei1vBR7Wjar9uhjpeu18QMt9FNnICBAgQILAOgR5c1A07K7SoR6NO+7VfNV67YB1jcg0CBOYpIOCY57oZNYG5CNRNT0fgUe1ifxyr/xqpMMRNUueyssZJgAABAgTOIdBv0llBRf03RbXTGiFGHRt9N+v0jSJAYGkBAcfShE5AgMCKBB6JiIOgo7fVP6oebK09vaLrOg0BAgQIECBwDIHMvDAi6sabFVqcq0awcfkxTustBAgQWJmAgGNllE5EgMAaBR6PiHpqTAUg1R5WD02OP9Rae36N43MpAgQIECCw9QKZeV5EXNlDiwoupv3an1YFGrV/ydZPzAAJENhbAQHH3i69iRPYK4G6IWoFHueq7/TXD9rW2hN7JWSyBAgQIDB7gcy8uIcUr1xoK7g4qurGnTYCBAjshICAYyeW0SQIEFixQN0LpIKOw6rCkjp+WPtwa+37Kx6L0xEgQIDAnglk5ksiooKHqgorjmrrtcVyL4s9+76YLgEC/y8g4PBtIECAwOoEHu3BR4UfdU+RaTv6dXz6Wn3mkdbak6sbhjMRIECAwDYIZOYrIqLuQ3FZbyuoqP1RI8So/fHaOFafsREgQIDACQQEHCfA8lYCBAickcBzPfQ4CDsiYtpW/7B6bHL8sdbad89obE5LgACBvRXIzJdHxKU9oKjAYdqv/cWahhkj1Dh/bwFNnAABAmsWEHCsGdzlCBAgcAYCFZBUCFKhx2FVN2Wt44e1deyFaq3VuWwECBCYtUBmVqhQN8NcrAoo6thhbR1brAopBBSz/jYYPAEC+yQg4Nin1TZXAgQInFugHr1bYUfdYHWxrWPnqvqJTb0+bZ/0OF9fOQIEjiPQHz9aP+eoqhtlLrZ17FxVoUW9Pm3rkaY2AgQIENgjAQHHHi22qRIgQGDNAvVo3go9nurBR4UfVWN/2lZ/cb9+djOOV1v749hB309z1ryiLre3Av2nGvVzjaqLejv6tT+OjX4FFKNf7diftiPQqNcrnKhHltoIECBAgMCpBQQcp6bzQQIECBDYsEBOQo/675MRgFRb++PYYf069szkfaM/bat/rnrWT3o2/A3Yo8v3n1zU0zEuOEbVfy7U+6btYr/2K6Co9rD+CDPGa7Xf9ojcVAkQIEBghgICjhkumiETIECAwFYI1COB65HCoyoMGf26l8n0tbFf7WJ/HKv2e/31ab+OjRrHx379l8xiv46N46M/bWvcY7/6Y3/0j2orUKrXql3sj2PV1jb2o7U2jh25aJk5/nCudrE/jlVbj84c+6Nf7bmq/itgvF79sT/60/al/fU6NvrVLvZrv+7LMF6b7tfx8droT9sKKcb+6Fc7ql4b/Qoppq/VPGwECBAgQIDAEQICDl8NAgQIECBAgAABAgQIECBAYPYCAo7ZL6EJECBAgAABAgQIECBAgAABAgIO3wECBAgQIECAAAECBAgQIEBg9gICjtkvoQkQIECAAAECBAgQIECAAAECAg7fAQIECBAgQIAAAQIECBAgQGD2AgKO2S+hCRAgQIAAAQIECBAgQIAAAQICDt8BAgQIECBAgAABAgQIECBAYPYCAo7ZL6EJECBAgAABAgQIECBAgAABAgIO3wECBAgQIECAAAECBAgQIEBg9gICjtkvoQkQIECAAAECBAgQIECAAAECAg7fAQIECBAgQIAAAQIECBAgQGD2AgKO2S+hCRAgQIAAAQIECBAgQIAAAQICDt8BAgQIECBAgAABAgQIECBAYPYCAo7ZL6EJECBAgAABAgQIECBAgAABAgcBBwYCBAgQIECAAAECBAgQIECAwNwF/hdX0tuXm3+RVwAAAABJRU5ErkJggg==);
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
		padding-bottom: 300rpx;
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
		box-sizing: border-box;
	}
	
</style>
