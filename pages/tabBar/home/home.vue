<template>
	<view class="home">
		<view class="uni-card-header">
			<!-- <view class="uni-icon uni-list"></view> -->
			<uni-icons type="list" :size="25" @click="onopen"></uni-icons>
			<uni-search-bar class="searchBar" :placeholder="search.placeholder" :radius="search.radius" :clearButton="search.clearButton" :cancelButton="search.cancelButton" :bgColor="search.bgColor" :maxlength="search.maxlength"></uni-search-bar>
			<uni-icons type="mic-filled" :size="25"></uni-icons>
		</view>
		<drawerMenu ref="drawMenu"></drawerMenu>
		<view class="uni-card-section">
			<scroll-view class="section-srcoll-y" scroll-y="true" :style="{height:scrollviewHigh+'px'}" :show-scrollbar="showScrollbar" @scrolltolower="getReach">
				<view class="srcoll-y">
					<view class="uni-padding">
						<uni-swiper-dot :info="SwiperInfo" :current="swiperDot.current"  :mode="swiperDot.mode" :dotsStyles="swiperDot.dotsStyles">
							<swiper class="swiper-box" autoplay="true"  @change="bannerChange">
							    <swiper-item v-for="(item ,index) in SwiperInfo" :key="index" >
							        <view class="swiper-item">
							                <image :src="item.pic" class="imgs"></image>
											<view class="uni-span" :style="{'background-color':item.titleColor}">{{item.typeTitle}}</view>
							        </view>
							    </swiper-item>
							</swiper>
						</uni-swiper-dot>
					</view>
					<view class="ball uni-card-modular">
						<scroll-view class="" scroll-x  :show-scrollbar="showScrollbar">
							<view class="uni-flex">
								<view class="uni-li" v-for="item in dragonBall" :key="item.id" :data-id="item.id" :data-url="item.url">
									<view class="homePage">
										<image :src="item.iconUrl" class="dragonImg"></image>
										<text class="time" v-if="item.id === -1">{{dateTime}}</text>
									</view>
									<text class="text">{{item.name}}</text>
								</view>
							</view>
						</scroll-view>
					</view>
					<view class="Blockpage">
						<homePage ref="homePage" :blockData="Blockpage" :personalizedData="personalizedData" :broadcastData="broadcastData" :playListId="playListId" :playIndex="playIndex" :titles="titlePage" :loadingShow="loadingShow"></homePage>
						<!-- 刷新 -->
						<view class="refresh">
							<view class="refresh-title">
								<view class="uni-dianji" >
									<view class="iocn iconfont icon-width-40 icon-shuaxin " :class="{'rotate':refreshRotate}" @click="refresh"></view>
									<text class="color" @click="refresh">点击刷新</text>
								</view>
								<text>换一批内容</text>
							</view>
							<view class="zdypb">
								<text>自定义排序</text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import drawerMenu from '../../template/drawerMenu.vue';
	import homePage from '../../template/homeBlock.vue';
	
	import { mergeObject, Es5duplicate } from '@/common/util.js'
	import { uniAudio, audioPlay } from '@/common/player.js';
	export default {
	    components: {drawerMenu,homePage},
		data(){
			return{
				titlePage:'my-music',
				search:{
					placeholder:"请输入搜索内容",
					radius:"42",
					clearButton:"none",
					cancelButton:"none",
					bgColor:"fdfdfd",
					maxlength:120,
				},
				swiperDot:{
					dotsStyles:{
						width:9,
						color:"#fff",
						backgroundColor:"rgba(255,255,255,0.3)",
						border:"none",
						selectedBackgroundColor:"rgba(255,255,255,0.8)",
						selectedBorder:"none"
					},
					mode:"default",
					current:0
				},
				SwiperInfo:[],
				bannerType:0,
				showScrollbar:false,
				dragonBall:[],
				dateTime:new Date().getDate(),
				Blockpage:[],
				blockType:[{type:'banners',title:'banners',blockCode:'HOMEPAGE_BANNER'},{type:'songList',title:'推荐歌单',blockCode:'HOMEPAGE_BLOCK_PLAYLIST_RCMD'},
				{type:'personalTailor',title:'私人定制',blockCode:'HOMEPAGE_BLOCK_STYLE_RCMD'},{type:'musicCalendar',title:'音乐日历',blockCode:'HOMEPAGE_MUSIC_CALENDAR'},
				{type:'exclusive',title:'专属场景歌单',blockCode:'HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST'},{type:'songsDiscsalbums',title:'',blockCode:'HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG'},
				{type:'scallop',title:'推荐以下新歌 赚双倍云贝',blockCode:'HOMEPAGE_YUNBEI_NEW_SONG'},{type:'podcast',title:'24播客合辑',blockCode:'HOMEPAGE_VOICELIST_RCMD'},
				{type:'videoCollection',title:'视频合辑',blockCode:'HOMEPAGE_BLOCK_VIDEO_PLAYLIST'},{type:'podcast24',title:'24小时播客',blockCode:'HOMEPAGE_PODCAST24'},
				{type:'videoShuffle',title:'24精选音乐视频',blockCode:'HOMEPAGE_MUSIC_MLOG'},{type:'rankingList',title:'排行榜',blockCode:'HOMEPAGE_RANKING_LIST'}],//'yuncunKTV',podcastCollection
				pageConfig:{},
				personalizedData:[],
				broadcastData:{},
				scrollviewHigh:600,
				refreshRotate:false,
				playListId:0,
				playIndex:0,
				toplistId:[{id:3779629,title:'新歌榜'},{id:2884035,title:'原创榜'},{id:3778678,title:'热歌榜'},{id:19723756,title:'飙升榜'}],
				loadingShow:false,
				page:0
			}
		},
		onReady() {
		        // 计算屏幕剩余高度  填补剩余高度
		        let _this = this;
		        uni.getSystemInfo({
		            success(res) {
		                _this.phoneHeight = res.windowHeight;
		                console.log(res.windowHeight);
		                // 计算组件的高度
		                let view = uni.createSelectorQuery().select('.uni-card-header');
		                view.boundingClientRect(data => {
		                    _this.navHeight = data.height;
		                    console.log(_this.navHeight);
		                    _this.scrollviewHigh = _this.phoneHeight - _this.navHeight;
		                }).exec();
		            }
		        });
		        console.log('w' + this.scrollviewHigh);
				
		},
		created() {
			console.log(uni.getSystemInfoSync().platform)
			switch(uni.getSystemInfoSync().platform){
			    case 'android':
			       this.bannerType = 1
			       break;
			    case 'ios':
				   this.bannerType = 2
			       break;
				case 'ipad':
				   this.bannerType = 3
				   break;
			    default:
			       console.log('运行在开发者工具上')
				   this.bannerType = 3
			       break;
			}
			this.getRequest();
		},
		onLoad(){
			let _this = this;
			this.$nextTick(()=>{
				uni.getSystemInfo({
					success:(res)=>{
						console.log(res.windowWidth)
						
					 if(_this.$refs.homePage.$refs.songsPlayer) 	_this.$refs.homePage.$refs.songsPlayer.audioArc= (res.windowWidth/750)*84/2;
					}
				})
			})
			 console.log('App onload')
			// uni.$on('timeCanvasPlay',(res)=>{
			// 	this.timeCanvas(res)
			// })
			//退出
			// this.$http.get(this.$_logout).then(res=>{
			// 	console.log(res)
			// 	uni.removeStorage({
			// 		key:'token',
			// 		success:function(mse){
			// 			console.log(mse)
			// 		}
			// 	})
			// })
			uni.getStorage({
				key:'playlistId',
				success:(res)=>{
					console.log(res)
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
		/*onReachBottom(){
			console.log('上拉加载')
			if(!this.loadingShow){  //此处判断，上锁，防止重复请求
			    this.loadingShow=true;
			    this.page+=1;
			   this.getReach();
			}
		},*/
		onShow(){
			let _this = this;
			console.log(this)
			console.log(uni)
			console.log(uniAudio.paused)
			uni.getStorage({
				key:'playlistId',
				success:(res)=>{
					console.log(res)
					this.playListId = Number(res.data)
				}
			})
			uni.getStorage({
				key:'playIndex',
				success:(res)=>{
					console.log(res)
					this.playIndex = Number(res.data)
				}
			})
			if(!uniAudio.paused&&this.$refs.homePage){
				this.$refs.homePage.$refs.songsPlayer.onCanplay();
				this.$refs.homePage.$refs.songsPlayer.onTimeUpdate();
				this.$refs.homePage.$refs.songsPlayer.onWaiting();
				this.$refs.homePage.$refs.songsPlayer.onEnded();
			}else if(this.$refs.homePage){
				this.$refs.homePage.$refs.songsPlayer.play=false;
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
						 
					   	    if(_this.$refs.homePage.$refs.songsPlayer) _this.$refs.homePage.$refs.songsPlayer.dynamic(timeNum);
					       }
					   });
				    }
				});
			}
			
		},
		methods:{
			
			onopen(){
				console.log(1)
				console.log(this)
				console.log(this.$refs)
				this.$refs.drawMenu.open();
			},
			getRequest(){
				this.$http.get(this.$_banner,{params: {type:this.bannerType}}).then(res=>{
					console.log(res)
					this.SwiperInfo = res.banners
				})
				this.$http.get(this.$_homepageDragonball).then(res=>{
					
					res.data.forEach(function(item,index){
						item.url = item.url.indexOf('https') === -1 ? item.url.substring(9,item.url.length):item.url
					})
					console.log(res)
					this.dragonBall = res.data;
				})
				this.homePage();
			},
			//homepageBlockpage
			homePage(){
				this.$http.get(this.$_homepageBlockpage,{params:{refresh:true}}).then(res=>{
					res.data.blocks.forEach((item,index)=>{
						
						this.blockType.forEach((key,nums)=>{
							if(key.blockCode == item.blockCode){
								item.type = key.type;
							}
							if( item.type === 'songsDiscsalbums'){
								let creatives = item.creatives;
								creatives.forEach((el,num)=>{
									el.title = el.uiElement.mainTitle.title;
									el.url = el.uiElement.button;
								})
								let getData = mergeObject(creatives,'title','resources','uiElement','url');
								item.songsDiscsalbums = Es5duplicate(getData,'title');
							}
						})
					})
					console.log(res)
					this.Blockpage =res.data.blocks;
					this.pageConfig = res.data.pageConfig;
					this.refreshRotate = false;
				})
				//专属场景歌单
				
				//排行榜详情
				this.$http.get(this.$_topList).then(res=>{
					console.log(res)
				})
				//24小时节目榜
				this.$http.get(this.$_djProgramtoplistHours,{params:{limit:6}}).then(res=>{
					console.log(res)
					this.broadcastData = res.data
				})
			},
			 bannerChange(e) {
			    this.swiperDot.current = e.detail.current;
			},
			//刷新
			refresh(){
				this.refreshRotate = true;
				console.log(this.refreshRotate)
				let time = setTimeout(()=>{
					this.homePage();
				},1000)
				
			},
			//下拉加载
			getReach(){
				console.log('滚动到底部')
				if(!this.loadingShow){  //此处判断，上锁，防止重复请求
				    this.page+=1;
						if(this.page == 1){
							this.loadingShow=true;
							let playlistData=[];
							let songNums = 0;
							this.toplistId.forEach((item,index)=>{
								this.$http.get(this.$_playlistDetail,{params:{id:item.id}}).then(res=>{
									res.playlist.songs=[];
									return res;
								}).then(comments=>{
									let flog = false;
									comments.playlist.trackIds.forEach((el,num)=>{
										if(num<3){
											this.$http.get(this.$_songDetail,{params:{ids:el.id}}).then(resSong=>{
												console.log(resSong)
												console.log(resSong.songs[0].name);
												resSong.songs[0].arName = '';
												resSong.songs[0].ar.forEach(((arName,arIndex)=>{
													resSong.songs[0].arName = arIndex<resSong.songs[0].ar.length-1? resSong.songs[0].arName+arName.name+'/':resSong.songs[0].arName+arName.name;
												}))
												comments.playlist.songs.push(resSong.songs[0])
												
											}).then(post=>{
												songNums++;
												if(songNums%3 == 0){
													if(flog){
														playlistData.push(comments);
														if(playlistData.length===4){
															let playlistObj = {
																type : 'rankingList',
																uiElement:{
																	button:{action:'playlist/toplist',text:'更多',actionType:'orpheus'},
																	subTitle:{title:'排行榜'}
																},
																playlistData:playlistData
															};
															this.loadingShow=false;
															this.Blockpage.push(playlistObj)
															console.log(this.Blockpage)
														}
													}
												}
											})
										}else{
											flog = true;
											return false;
										}
									})
									
								})
							})
							
						}
					   
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.section-srcoll-y{
		height: 100vh;
	}
	.uni-card-header{
		background-color: #f3ebe8;
	}
	.searchBar{
		width: 100%;
	}
	.imgs{
		width: 100%;
		height:150px;
		border-radius: 0.5rem;
	}
	.swiper-item{
		border-radius: 0.5rem;
	}
	.swiper-item .uni-span{
		display: inline;
		border-bottom-right-radius: 0.5rem;
		border-top-left-radius: 0.5rem;
		color: #FFFFFF;
		position: absolute;
		right: 0;
		bottom: 0;
		padding: 0.25rem;
	}
	.uni-padding{
		padding:0 15px;
		background: -webkit-linear-gradient(to top ,#ffffff,#f3ebe8);
		background: -o-linear-gradient(to top ,#ffffff,#f3ebe8);
		background: -mos-linear-gradient(to top ,#ffffff,#f3ebe8);
		background: -moz-linear-gradient(to top ,#ffffff,#f3ebe8);
		background: linear-gradient(to top ,#ffffff,#f3ebe8);
	}
	.uni-card-header:after{
		background-color: transparent;
	}
	.uni-li{
		width: 4rem;
		padding: 0.5rem 0.7rem;
		text-align: center;
	}
	.homePage{
		width: 3rem;
		height: 3rem;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #ff1c0f;
		border-radius: 50%;
		position: relative;
	}
	.dragonImg{
		width: 3rem;
		height: 3rem;
	}
	.text{
		font-size: 0.7rem;
		color: #3b3b3b;
	}
	.time{
		position: absolute;
		top: 50%;
		left: 50%;
		display: inline-block;
		width: 1.8rem;
		height: 1rem;
		color: #fb5847;
		font-size: 1rem;
		margin-top: -0.8rem;
		margin-left: -0.9rem;
	}
	.refresh{
		background-color: #FFFFFF;
		padding-bottom: 150rpx;
		font-size: 32rpx;
		color: #999999;
		text-align: center;
		padding-top: 46rpx;
	}
	.refresh-title{
		color: #999999;
		display: flex;
		justify-content: center;
		flex-direction: row;
	}
	.uni-dianji{
		display: flex;
		color: #4e7cae;
	}
	.icon-shuaxin{
		font-size: 32rpx;
	}
	.uni-dianji .color{
		margin: 0 16rpx;
	}
	.zdypb{
		display: inline-block;
		border: 4rpx solid #d9d9d9;
		padding: 20rpx 40rpx;
		border-radius: 40rpx;
		color: #666666;
		font-size: 38rpx;
		margin-top: 60rpx;
	}
</style>
