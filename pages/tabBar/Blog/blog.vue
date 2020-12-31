<template>
	<view class="blog">
		 <showCanvas></showCanvas>
	</view>
</template>

<script>
	import showCanvas from '../../template/canvas.vue';
	export default{
		components:{showCanvas},
		onReady: function (e) {
		  //       var context = uni.createCanvasContext('firstCanvas',this);
		  //       context.setLineWidth(2);
				// context.setStrokeStyle("#ff0000");
				// context.arc(23,23,20,0,1 * Math.PI, true);
				// context.stroke();
				// context.draw();
		    },
		    methods: {
		        canvasIdErrorCallback: function (e) {
		            console.error(e.detail.errMsg)
		        }
		    }
	}
</script>

<style>
</style>
