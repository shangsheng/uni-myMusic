<template>
	<view class="login">
		<view class="uni-ul">
			<view class="uni-li uni-li-active">
				<text>登录</text>
			</view>
			<view class="uni-li">
				<text>注册</text>
			</view>
		</view>
		<view class="nui-from">
			<uni-forms ref="form" :form-rules="loginData"    :rules="rules">
				<uni-forms-item  name="email">
				    <uni-easyinput class="input" v-model="loginData.email" type="email" placeholder="请输入邮箱" @input="binddata('email',$event)" />
				</uni-forms-item>
				<uni-forms-item  name="password">
				    <uni-easyinput class="input" type="password" v-model="loginData.password" placeholder="请输入密码" />
				</uni-forms-item>
				<button  @click="submit">登录</button>
			</uni-forms>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				loginData:{
					email:'',
					password:''
				},
				rules: {
				    // 对name字段进行必填验证
				    password: {
				        rules: [{
				                required: true,
				                errorMessage: '请输入密码',
				            }
				        ]
				    },
				    // 对email字段进行必填验证
				    email: {
				        rules: [{
				            format: 'email',
				            errorMessage: '请输入正确的邮箱地址',
				        },{
							required:true,
							errorMessage:'请输入邮箱'
						}]
				    }
				}
			}
		},
		mounted() {
			// this.$http.get(this.$_logout).then(res=>{
			// 	console.log(res)
			// })
		},
		methods:{
			submit(e){
				console.log(e)
				this.$refs.form.submit().then(res=>{
				    console.log('表单数据信息：', res);
					this.$http.get(this.$_emailLogin,{params:{email:res.email,password:res.password}}).then(res=>{
						console.log(res)
						uni.setStorage({
							key:'token',
							data:res.token,
							success:function(mse){
								console.log(mse)
								uni.navigateTo({
									url:'/pages/tabBar/home/home',
									success(e) {
										console.log(e)
									}
								})
							}
						})
						
					})
				}).catch(err =>{
				    console.log('表单错误信息：', err);
				})
			},
			binddata(name,e){
				console.log(name)
				console.log(e)
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
	.uni-error-message{
		color: #FFFFFF;
	}
</style>
