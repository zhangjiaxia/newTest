<template>
	<view class="uni-flex content" style="height: 70vh;">
		<view class="uni-flex uni-column content operation">
			<view class="uni-flex title">FunFunFitness</view>
			<view class="uni-flex subtitle">教练登陆</view>
			<view class="uni-flex input-view">
				<input type="text" placeholder="教练帐号" placeholder-class="" v-model="params.account" />
			</view>
			<view class="uni-flex input-view" style="margin-top: 20rpx;margin-bottom: 50rpx;">
				<input type="text" placeholder="教练密码" placeholder-class="" v-model="params.password" />
			</view>
			<view class="uni-flex content login" @click="coachLogin">登录</view>
		</view>
	</view>
</template>

<script>
	import interfaceurl from '@/utils/interface.js'
	export default {
		data() {
			return {
				params: {
					account: '',
					password: ''
				}
			}
		},
		onLoad() {

		},
		methods: {
			coachLogin() {
				let that = this;
				interfaceurl.checkAuth(interfaceurl.teacherLogin, this.params).then((res) => {
					that.$store.commit('setCoachBook', res.msg)
					uni.navigateTo({
					    url: '/pages/my/reserve-information'
					});
				});
			}
		}
	}
</script>

<style lang="scss">
	.operation {
		.title {
			color: #333333;
			font-size: 48rpx;
		}
		.subtitle {
			color: #333333;
			font-size: 30rpx;
			margin-top: 80rpx;
			margin-bottom: 40rpx;
		}
		.input-view {
			width:710rpx;
			height:60rpx;
			background:rgba(245,245,245,1);
			border-radius:10rpx;
			input {
				width: 100%;
				height: 100%;
				margin-left: 20rpx;
			}
		}
		.login {
			width:710rpx;
			height:80rpx;
			background:rgba(255,71,71,1);
			border-radius:10rpx;
			color: white;
		}
	}
</style>
