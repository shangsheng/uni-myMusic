<template>
	<view class="login">
		<view class="uni-ul">
			<view class="uni-li " :class="{'uni-li-active':fromBoolen === 0}" @click="tabForm" data-index="0">
				<text>登录</text>
			</view>
			<view class="uni-li" :class="{'uni-li-active':fromBoolen === 1}" @click="tabForm" data-index="1">
				<text>注册</text>
			</view>
		</view>
		<view class="nui-from" v-if="fromBoolen === 0">
			<uni-forms ref="form" :form-rules="loginData"    :rules="rulesLogin">
				<uni-forms-item  name="email" class="eSuffix">
				    <uni-easyinput class="input" v-model="loginData.email" type="email" placeholder="请输入邮箱" @input="binddata('email',$event)"  @blur="bindInput('email',$event)"/>
					<view class="uni-ul uni-email-ul"  :class="{'uni-emailActive':selTips}">
						<scroll-view scroll-y :style="{height: eHeight}">
							<view class="uni-li uni-email-item" v-for="(item,index) in emailSuffix" :key="index" :data-index="index" @tap="onClickTips">
								<text>{{item.eSuffix}}</text>
							</view>
						</scroll-view>
						
					</view>
				</uni-forms-item>
				<uni-forms-item  name="password">
				    <uni-easyinput class="input" type="password" v-model="loginData.password" placeholder="请输入密码" />
				</uni-forms-item>
				<button  @click="submit">登录</button>
			</uni-forms>
		</view>
		<view class="nui-from" v-else>
			<uni-forms ref="registerform" :form-rules="registerData"    :rules="registeRules">
				<uni-forms-item  name="nickname">
				    <uni-easyinput class="input" v-model="registerData.nickname" type="text" placeholder="请输入昵称"  />
				</uni-forms-item>
				<uni-forms-item  name="phone">
				    <uni-easyinput class="input" v-model="registerData.phone" type="phone" placeholder="请输入手机号"  />
				</uni-forms-item>
				<uni-forms-item  name="passwords">
				    <uni-easyinput class="input" type="password" v-model="registerData.passwords" placeholder="请输入密码" />
				</uni-forms-item>
				<uni-forms-item  name="captcha" class="from-captcha">
				    <uni-easyinput class="input-captcha" type="text" v-model="registerData.captcha" placeholder="请输入验证码" />
					<button class="captcha" @click="onClickCaptcha" :disabled="captchaBoolen">{{captchaBoolen?captchaNum+'s后重新发送':'获取验证码'}}</button>
				</uni-forms-item>
				<button  @click="register">注册</button>
			</uni-forms>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				emailSuffix:[],
				selTips:false,
				fromBoolen:0,
				captchaNum:60,
				captchaBoolen:false,
				eHeight:'300rpx',
				registerData:{
					captcha:'',
					phone:'',
					passwords:'',
					nickname:''
				},
				loginData:{
					email:'',
					password:''
				},
				registeRules:{
					nickname:{
						rules:[{
						        required: true,
						        errorMessage: '请输入手机号',
						    },{
								maxLength: 20,
								errorMessage: ' 昵称长度最大 {maxLength} 个字符',
							}]
					},
					phone:{
						rules: [{
						        required: true,
						        errorMessage: '请输入手机号',
						    },{
								validateFunction:function(rule, value, data, callback) {
									let iphoneReg = /^1[0-9]{10}$/
									if (!iphoneReg.test(value)) {
										callback('手机号码格式不正确，请重新填写')
									}
									return true
								}
							}
						]
					},
					passwords: {
					    rules: [{
					            required: true,
					            errorMessage: '请输入密码',
					        },
							{
								minLength: 6,
								maxLength: 20,
								errorMessage: '密码长度在 {minLength} 到 {maxLength} 个字符',
							}
					    ]
					},
					captcha:{
						rules: [{
						        required: true,
						        errorMessage: '请输入验证码',
						    },
							{
								minLength: 6,
								maxLength: 6,
								errorMessage: '验证码的长度为6',
							}
						]
					}
				},
				rulesLogin: {
				    // 对name字段进行必填验证
				    password: {
				        rules: [{
				                required: true,
				                errorMessage: '请输入密码',
				            },{
								minLength: 6,
								maxLength: 20,
								errorMessage: '密码长度在 {minLength} 到 {maxLength} 个字符',
							}
				        ]
				    },
				    // 对email字段进行必填验证
				    email: {
				        rules: [
							{
							required:true,
							errorMessage:'请输入邮箱'
						},{
							format: 'email',
							errorMessage: '请输入正确的邮箱地址',
						}]
				    }
				}
			}
		},
		onLoad(options){
			this.fromBoolen = Number(options.num);
		},
		onReady(){
			
		},
		mounted() {
			// this.$http.get(this.$_logout).then(res=>{
			// 	console.log(res)
			// 	uni.removeStorage({
			// 		key:'token',
			// 		success:function(mse){
			// 			console.log(mse)
			// 		}
			// 	})
			// })
		},
		methods:{
			submit(e){
				console.log(e)
				 uni.showLoading()
				this.$refs.form.submit().then(res=>{
				    console.log('表单数据信息：', res);
					this.$http.get(this.$_emailLogin,{params:{email:res.email,password:res.password}}).then(res=>{
						console.log(res)
						uni.setStorage({
							key:'token',
							data:res.token,
							success:function(mse){
								console.log(mse)
								
								uni.reLaunch({
									url:'/pages/tabBar/home/home',
									
								})
								uni.hideLoading()
							}
						})
						
					})
				}).catch(err =>{
					uni.hideLoading()
				    console.log('表单错误信息：', err);
				})
			},
			binddata(name,e){
				console.log(name)
				console.log(e)
				if(name === 'email'){
					this.eValues(e)
				}
			},
			tabForm(e){
				this.fromBoolen = Number(e.currentTarget.dataset.index);
			},
			register(e){
				 uni.showLoading()
				this.$refs.registerform.submit().then(res => {
				     
				     console.log('表单数据信息：', res);
					 this.$http.get(this.$_registerCellphone,{params:{phone:res.phone,password:res.passwords,captcha:res.captcha,nickname:res.nickname}}).then(res=>{
						 this.fromBoolen = 0;
						 uni.hideLoading()
					 })
				}).catch(err => {
				     uni.hideLoading()
				     console.log('表单错误信息：', err);
				})
			},
			onClickCaptcha(e){
				if(this.registerData.phone == undefined){
					uni.showToast({
					    title: '手机号不能为空',
					    duration: 2000
					});
				}else{
					this.$http.get(this.$_captchaSent,{params:{phone:this.registerData.phone}}).then(res=>{
						console.log(res)
						this.captchaBoolen = res.data;
						let time = setInterval(()=>{
							this.captchaNum = this.captchaNum - 1; 
							if(this.captchaNum == 0){
								clearInterval(time);
								this.captchaBoolen = false;
							}
						},1000)
					})
				}
				
			},
			eValues(eValue){
			        		
			   	var selectedArr=[]
			   	var selected=[
					{eSuffix:'@163.com'},
					{eSuffix:'@126.com'},
					{eSuffix:'@yeah.net'},
					{eSuffix:'@vip.163.com'},
					{eSuffix:'@vip.126.com'},
					{eSuffix:'@188.com'},
					{eSuffix:'@popo.163.com'},
					{eSuffix:'@qq.com'},
					{eSuffix:'@yahoo.com'},
					{eSuffix:'@sina.com'},
					{eSuffix:'@soho.com'},
					{eSuffix:'@live.com'}
				]		
			    
			   	var  flag = '';
			        		
				      if(eValue.indexOf("@")>0){
				          flag=eValue.substring(eValue.indexOf("@")-1);//获取的输入的@开始的内容
				                
				          eValue=eValue.substring(0,eValue.indexOf("@"));
				               
				      }else{
				          flag="";
				                
				          //首字符是@
				          if(eValue.substring(0,1) == '@'){
				          	eValue=eValue.substring(0,eValue.indexOf("@"));
				          }
				      }
				       var val="";
				      //将输入内容和后缀链接
				     
			   	for(var i=0;i<selected.length;i++){
			   		val=selected[i].eSuffix;
				          val=val.substring(val.indexOf("@"));
				          
			   		var eSuffix = {eSuffix:eValue+val}
			   	
			   		selectedArr.push(eSuffix)
			   		
			   	}
			   	
			   	var eArr = []//检查满足条件的内容
			   	if(flag!=""){
			          var reg=new RegExp(flag,"i");
			          	
				          for(var i=0;i<selectedArr.length;i++){
				          	
				              if(reg.test(selectedArr[i].eSuffix)){
				              	
				              	eArr.push(selectedArr[i])
				              	
				              	this.selTips = true;
				                  
				              }else{
				              	 selectedArr.splice(i, 1);
				                  this.selTips = false;
				                 
				              }
				          }
				          selectedArr = eArr
				      }
			   	
				this.emailSuffix = selectedArr;
				this.emailSuffix.length <4?this.eHeight = 'auto':'300rpx';
			   	if(this.loginData.email.length<1){
			   		this.selTips = false;
			   	}else{
			        this.selTips = true;
			   	}
			    
			},
			bindInput(name,e){
				setTimeout(()=>{
					if(name == 'email'){
						this.selTips = false;
					}
				},1)
			},
			onClickTips(e){
				console.log(e)
				this.loginData.email = this.emailSuffix[e.currentTarget.dataset.index].eSuffix;
			}
		}
	}
</script>

<style scoped>
	.login{
		background-color:#de2e21;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: nowrap;
		flex-direction: column;
	}
	.uni-ul{
		display: flex;
		justify-content: center;
	}
	.uni-li{
		color: #FFFFFF;
		font-size: 22rpx;
		padding: 20rpx 40rpx;
		border-radius: 30rpx;
	}
	.uni-li-active{
		background-color: #c50e00;
	}
	.nui-from{
		width: 100%;
	}
	.uni-forms-item{
		background-color: transparent;
		color: #FFFFFF;
	}
	
	
	.captcha{
		width: 300rpx;
		margin: 0;
		line-height: 2;
	}
	.from-captcha .input-captcha{
		flex: 0 1 50%;
	}
	.eSuffix{
		position: relative;
	}
	.uni-email-ul{
		background-color: #FFFFFF;
		text-align: left;
		flex-wrap: wrap;
		box-shadow: 0 0 10rpx #333333;
		position: absolute;
		top: 100rpx;
		left: 0;
		width: 100%;
		z-index: 99;
		display: none;
	}
	.uni-email-item{
		text-align: left;
		border-bottom: 2rpx solid #F1F1F1;
		color: #333333;
		border-radius: 2rpx;
		width: 100%;
	}
	.uni-emailActive{
		display: block;
	}
</style>
