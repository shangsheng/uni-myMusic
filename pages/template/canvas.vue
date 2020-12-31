<template>
	<view class="ec-canvas">
		 <canvas style="width: 84rpx; height: 84rpx;" canvas-id="firstCanvass" id="firstCanvass"></canvas>
	</view>
</template>

<script>
	export default{
		onReady: function (e) {
				this.$nextTick(function(){
					var context = uni.createCanvasContext('firstCanvass',this);
					context.setLineWidth(2);
					context.setStrokeStyle("#ff0000");
					context.arc(23,23,20,0,1 * Math.PI, true);
					context.stroke();
					context.draw();
				})
		        
		    },
	}
</script>

<style>
</style>
