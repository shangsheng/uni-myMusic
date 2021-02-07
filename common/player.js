let uniAudio = uni.createInnerAudioContext();
function audioPlay(src,callback){
	// uniAudio.autoplay = true;
	uniAudio.src = src;
	callback(uniAudio.paused)
}
export{
	uniAudio,
	audioPlay
}