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
			<view class="ball">
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
				<homePage :blockData="Blockpage" :personalizedData="personalizedData"></homePage>
			</view>
		</view>
	</view>
</template>

<script>
	import drawerMenu from '../../template/drawerMenu.vue';
	import homePage from '../../template/homeBlock.vue';
	
	export default {
	    components: {drawerMenu,homePage},
		data(){
			return{
				search:{
					placeholder:"请输入搜索内容",
					radius:"42",
					clearButton:"none",
					cancelButton:"none",
					bgColor:"fdfdfd",
					maxlength:120
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
				blockType:['banners','songList','personalTailor','musicCalendar','exclusive','songsDiscsalbums','scallop','podcast','yuncunKTV','podcastCollection','videoCollection'],
				pageConfig:{},
				personalizedData:[]
			}
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
				this.$http.get(this.$_homepageBlockpage).then(res=>{
					
					res.data.blocks.forEach((item,index)=>{
						item.type = this.blockType[index];
					})
					console.log(res)
					this.Blockpage =res.data.blocks;
					this.pageConfig = res.data.pageConfig;
				})
				//推荐歌单
				this.$http.get(this.$_personalized,{params:{limit:6}}).then(res=>{
					console.log(res)
					this.personalizedData = res.result
				})
			},
			 bannerChange(e) {
			    this.swiperDot.current = e.detail.current;
			},
			
		}
	}
</script>

<style scoped="scoped">
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
</style>
