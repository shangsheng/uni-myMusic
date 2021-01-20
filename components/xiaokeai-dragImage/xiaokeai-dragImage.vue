<template>
	<view @touchmove.stop.prevent="moveHandle">
		<movable-area class="movarea" ref="areaBox" id="areaBox">
			<view class="imgBox">
				<view class="imgItem" v-for="(item, idx) in scopeImgList" :key="idx"  :style="{ width: imgSize + 'px', height: imgSize + 'px' }">
					<image
						:id="'img' + idx"
						:ref="'img' + idx"
						:src="item.url"
						mode="aspectFill"
						@touchstart="tstr(idx, $event)"
						@touchmove="tsmo"
						@touchend="toend"
						:class="(hoverImgIdx==='img'+idx)?'select':''"
					></image>
					<!-- 删除对应图片按钮 -->
					<view class="closeBtn" @click="closeImg(idx)">
						x 
					</view>
				</view>
				<view class="imgItem  addImgBtn"  @click="addImgBtn"  :style="{ width: imgSize + 'px', height: imgSize + 'px' }">
					<slot  name="addBtn"></slot>
				</view>
			</view>
			<movable-view v-if="moveSrc" :animation="false" class="moveV" :x="x" :y="y" direction="all" @change="onChange"  :style="{ width: imgSize + 'px', height: imgSize + 'px' }">
				<image :src="moveSrc" mode="aspectFill" ></image>
			</movable-view>
		</movable-area>
	</view>
</template>

<script>
export default {
	props: {
		imgList: {
			type: Array,
			default: function() {
				return [];
			}
		},
		imgSize: {
			type: Number,
			default: function() {
				return 80;
			}
		}
	},
	components: {},
	data() {
		return {
			scopeImgList:this.imgList,
			areaBoxInfo: {},
			x: 0,
			y: 0,
			idx: 0,
			moveSrc: '',
			areaBoxTop: 0,
			hoverImgIdx:'',
			inBoxXY:{}
		};
	},
	methods: {
		moveHandle() {
			return;
		},
		onChange(e) {
			// console.log(e.detail)
		},
		tstr(e, s) {
			const _this = this;
			//获取拖拽区域的上边距和下边距
			let areaBoxTop = this.areaBoxInfo.top;
			let areaBoxLeft = this.areaBoxInfo.left;
			// console.log(this.areaBoxInfo)
			
			// 设置可移动方块的初始位置为当前所选中图片的位置坐标
			this.x = this.scopeImgList[e].x;
			this.y = this.scopeImgList[e].y;
			//显示可移动方块
			this.moveSrc = this.scopeImgList[e].url;
			//保存当前所选择的图片索引
			this.idx = e;
			var x = s.changedTouches[0].clientX-areaBoxLeft;
			var y = s.changedTouches[0].clientY-areaBoxTop;
			// 保存鼠标在图片内的坐标
			this.inBoxXY={
				x:x-this.scopeImgList[e].x,
				y:y-this.scopeImgList[e].y,
			}
		},
		tsmo(e) {
			const _this = this;
			let areaBoxTop = this.areaBoxInfo.top;
			let areaBoxLeft = this.areaBoxInfo.left;
			let  imgSize= this.imgSize;
			//重置为以拖拽盒子左上角为坐标原点
			var x = e.changedTouches[0].clientX-areaBoxLeft;
			var y = e.changedTouches[0].clientY-areaBoxTop;
			this.x = x-this.inBoxXY.x;
			this.y = y-this.inBoxXY.y;
			
			this.scopeImgList.forEach((item, idx) => {
				if (x>item.x&&x<item.x+imgSize&&y>item.y&&y<item.y+imgSize) {
					_this.hoverImgIdx='img'+idx
				}
			});
		},
		toend(e) {
			const _this = this;
			let areaBoxTop = this.areaBoxInfo.top;
			let areaBoxLeft = this.areaBoxInfo.left;
			let  imgSize= this.imgSize;
			//重置为以拖拽盒子左上角为坐标原点
			var x = e.changedTouches[0].clientX-areaBoxLeft;
			var y = e.changedTouches[0].clientY-areaBoxTop;
			for(let idx in this.scopeImgList){
				let item=this.scopeImgList[idx];
				if (x>item.x&&x<item.x+imgSize&&y>item.y&&y<item.y+imgSize) {
					_this.scopeImgList[_this.idx].url = _this.scopeImgList[idx].url;
					_this.scopeImgList[idx].url = _this.moveSrc;
					break;
				}
			}
			// 移动结束隐藏可移动方块
			this.moveSrc = '';
			this.hoverImgIdx=''
			this.$emit('moveEndList', this.scopeImgList);
		},
		addImgBtn(){
			this.$emit('addImg');
		},
		closeImg(e) {
			this.$emit('delImgIdx', e);
		},
		getDomInfo(id, callBack) {
			const query = uni.createSelectorQuery().in(this);
			// console.log(query)
			query.select('#' + id)
				.boundingClientRect()
				.exec(function(res) {
					callBack(res[0]);
				});
		} 
	},
	mounted() {
		let _this = this;
		this.getDomInfo('areaBox', info => {
			_this.areaBoxInfo = info;
			// 设置区域内所有图片的左上角坐标
			_this.scopeImgList.forEach((item, idx) => {
				_this.getDomInfo('img' + idx, res => {
					item.x = res.left-info.left;
				});
				_this.getDomInfo('img' + idx, res => {
					item.y = res.top-info.top;
				});
			});
		});
		
	}
};
</script>

<style lang="less" scoped>
.movarea {
	width: 100%;
	height: 160px;
	// background-color: #0901ff;
	display: flex;
	flex-direction: row;
}

.imgBox {
	width: 100%;
	height: 160px;
	// background-color: #09BB07;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	.imgItem {
		
		position: relative;
		image {
			width: 80px;
			height: 80px;
			transition: all 0.5s;
			vertical-align: top;
		}
		.closeBtn {
			background-color: red;
			color: #FFFFFF;
			border-radius: 50%;
			text-align: center;
			position: absolute;
			top: 0;
			right: 0;
			width: 20px;
			height: 20px;
			line-height: 20px;
			z-index: 3;
			transform: translate(50%, -50%);
		}
	}

	// .addImgBtn {
	// 	background-color: #d0d0d0;
	// }
}

.moveV {
	opacity: 0.8;
	z-index: 999;
	image {
		width: 80px;
		height: 80px;
	}
}
.select{
	transform: scale(1.3);
}
</style>
