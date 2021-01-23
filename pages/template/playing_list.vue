<template>
	<view class="playing-list" :class="{'showDisplay':showBoolen}" @click.stop="onShows">
		<view class="music-playing-list" >
			<view class="music-swiper-item">
				<view class="m-p-top">
					<view class="m-titile">
						<text>当前播放</text>
						<text class="m-l-num">({{playlist.length}})</text>
					</view>
					<view class="m-l-r">
						<view class="m-mode font-color">
							<view class="icon iconfont icon-width-40  icon-color" :class="[{'icon-xunhuan':modeNum===0},{'icon-hanhan-01-01':modeNum===1},{'icon-suijibofang':modeNum===2}]"></view>
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
						<view class="m-play-list" >
							<view class="m-list-item" v-for="(item,index) in playlist" :key="item.id" :class="{'m-list-play-color':index == playIndex}">
								<view class="iconfont icon icon-width-40 icon-zhengzaibofang"></view>
								<view class="m-item-title" :data-id="item.id" :data-index="index">
									<text>{{item.name}}</text>
									<text class="m-item-a"> - {{item.alName}}</text>
								</view>
								<view class="m-play-source" >播放来源</view>
								<view class="icon iconfont icon-width-40 icon-quxiao icon-color" :data-index="index"></view>
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
				playlist:[],
				showBoolen:false,
				playIndex:0,
				modeNum:0
			}
		},
		props:{
			playListData:{
				type:Array,
				default:[]
			},
			show:{
				type:Boolean,
				default:false
			},
			listIndex:{
				type:Number,
				default:0
			},
			playMode:{
				type:Number,
				default:0
			}
		},
		created() {
			console.log(typeof this.listIndex)
			this.playlist = this.playListData;
			this.showBoolen = this.show;
			this.playIndex = this.listIndex;
			this.modeNum = this.playMode;
			this.alName(this.playlist)
		},
		methods:{
			onplaySong($event){
				console.log($event)
				// uni.$emit('playListSong',{data:$event.constructor})
			},
			onShows(){
				this.showBoolen = false;
				uni.$emit('clickshow', this.showBoolen)
			},
			alName(arr){
				arr.forEach(item=>{
					let alNames="";
					item.ar.forEach((el,index)=>{
						index === 0 ? alNames = alNames + el.name : alNames = alNames +'/' +el.name ;
					})
					item.alName = alNames;
				})
			},
			
		},
		watch:{
			listIndex: {
			    immediate: true,    // 这句重要
			    handler (val) {
			        this.playIndex=val
		      },
			  deep: true
			},
			show: {
			    immediate: true,  
			    handler (val) {
			        this.showBoolen=val
			  },
			  deep: true
			},
			playMode:{
				immediate: true,
				  handler (val) {
				      this.modeNum=val
				},
				deep: true
			}
		},
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
		display: none;
		flex-direction: column-reverse;
		padding: 0 40rpx;
		box-sizing: border-box;
		z-index: 99;
	}
	.showDisplay{
		display: flex;
	}
	.music-playing-list{
		margin-bottom: 120rpx;
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
	.m-list-play-color,.m-list-play-color .icon-zhengzaibofang{
		color: #fe3a3b;
	}
	.icon-zhengzaibofang,.m-play-source{
		display: none;
	}
	.m-list-play-color .icon-zhengzaibofang,.m-list-play-color .m-play-source{
		display: block;
	}
	.m-play-source{
			border: 2rpx solid #e6e6e6;
			color: #333333;
			font-size: 21rpx;
			padding:12rpx  19rpx 8rpx 18rpx;
			border-radius: 15rpx;
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
	.m-list-play-color .m-item-title{
		width:327rpx;
	}
	.m-item-title .m-item-a{
		font-size: 21rpx;
		color: #808080;
		align-self: center;
		flex-wrap: nowrap;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 133rpx;
	}
	.m-item-title text{
		flex-wrap: nowrap;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.m-list-play-color .m-item-a,.m-list-play-color .m-item-title {
		color: #fe3a3b;
	}
</style>
