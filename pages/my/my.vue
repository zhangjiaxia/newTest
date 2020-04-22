<template>
	<view class="">
		<authPage>
			<view class="uni-flex uni-column content userinfo">
				<view class="uni-flex">
					<image :src="userInfo.avatarUrl || '/static/head.png'" class="head"></image>
				</view>
				<view class="uni-flex nick">{{userInfo.nickName || '御翔绝瞬'}}</view>
			</view>
		</authPage>
		<view class="order">
			<view class="uni-flex uni-row vertical title" @click="turnOrder">
				<view class="uni-flex rest ordermanage">订单管理</view>
				<view class="uni-flex">
					<image src="/static/enter.png" class="enter"></image>
				</view>
			</view>
			<view class="uni-flex uni-row status" @click="turnOrder">
				<view class="uni-flex rest content">
					<view class="">
						<image src="/static/waitPay.png" style="width: 56rpx;height: 52rpx;"></image>
					</view>
					<view class="status-text">待支付</view>
				</view>
				<view class="uni-flex rest content">
					<view class="">
						<image src="/static/sendGoods.png" style="width: 59rpx;height: 53rpx;"></image>
					</view>
					<view class="status-text">待发货</view>
				</view>
				<view class="uni-flex rest content">
					<view class="">
						<image src="/static/waitGoods.png" style="width: 63rpx;height: 51rpx;"></image>
					</view>
					<view class="status-text">已收货</view>
				</view>
				<view class="uni-flex rest content" style="position: relative;" @click.stop="prevent">
					<button open-type='contact' class="chat">联系客服</button>
					<view class="">
						<image src="/static/sale.png" style="width: 57rpx;height: 52rpx;"></image>
					</view>
					<view class="status-text">售后</view>
				</view>
			</view>
			<view class="service">
				<view class="uni-flex uni-row vertical bar">
					<view class="my">我的服务</view>
				</view>
				<view class="uni-flex uni-row vertical bar" @click="turnPage">
					<view class="uni-flex rest ordermanage">
						<image src="/static/detail.png" style="width: 33rpx;height: 44rpx;margin-left: 48rpx;margin-right: 32rpx;"></image>
						预约记录
					</view>
					<view class="uni-flex">
						<image src="/static/enter.png" class="bigenter"></image>
					</view>
				</view>
				<view class="uni-flex uni-row vertical bar">
					<button open-type='contact' class="concact">联系客服</button>
					<view class="uni-flex rest ordermanage">
						<image src="/static/service.png" style="width: 45rpx;height: 44rpx;margin-left: 41rpx;margin-right: 29rpx;"></image>
						客服中心
					</view>
					<view class="uni-flex">
						<image src="/static/enter.png" class="bigenter"></image>
					</view>
				</view>
				<view class="uni-flex uni-row vertical bar" @click="turnLogin">
					<view class="uni-flex rest ordermanage">
						<image src="/static/aboutUs.png" style="width: 45rpx;height: 44rpx;margin-left: 41rpx;margin-right: 29rpx;"></image>
						教练登录
					</view>
					<view class="uni-flex">
						<image src="/static/enter.png" class="bigenter"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import interfaceurl from '@/utils/interface.js'
	import authPage from '@/components/authorization-page.vue' //引入授权窗体
	//引入store的内容
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	export default {
		components: {
			authPage
		},
		computed: mapState(['userInfos']),
		data() {
			return {
				userInfo: {}, //获取用户信息
			}
		},
		watch:{
			userInfos(val) {
				//用户的授权信息存本地，全局变量是为了第一次授权时快速响应
				if(val) {
					this.userInfo = uni.getStorageSync('userInfo')
				}
			}
		},
		onLoad() {

		},
		onShow() {
			let token = uni.getStorageSync('token')
			this.userInfo = this.userInfos.nickName ? this.userInfos : uni.getStorageSync('userInfo')
		},
		methods: {
			prevent() {},
			turnOrder() {
				uni.navigateTo({
				    url: '/pages/my/order'
				});
			},
			turnPage() {
				uni.navigateTo({
				    url: '/pages/my/reservation'
				});
			},
			turnLogin() {
				uni.navigateTo({
				    url: '/pages/index/login'
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F6F6F6;
	}
	.chat {
		position: absolute;
		width: 120rpx;
		height: 120rpx;
		opacity: 0;
	}
	.userinfo {
		height: 220rpx;
		background: #F43D4D;
		color: white;
		.head {
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
			border: 4rpx solid white;
		}
	}
	.ordermanage {
		font-size: 30rpx;
		color: #333333;
	}
	.enter {
		width: 17rpx;
		height: 26rpx;
	}
	.order {
		.title {
			background: white;
			height: 80rpx;
			border-bottom: 2rpx solid #EEEEEE;
			padding: 0 30rpx;
		}
		.status {
			background: white;
			height: 150rpx;
			margin: 20rpx 0;
			.status-text {
				color: #333333;
				font-size: 24rpx;
			}
			
		}
	}
	.service {
		background: white;
		.bar {
			position: relative;
			height: 100rpx;
			border-bottom: 2rpx solid #EEEEEE;
			.bigenter {
				width: 17rpx;
				height: 31rpx;
				margin-right: 30rpx;
			}
			.concact {
				position: absolute;
				width: 100%;
				height: 110rpx;
				top: 0;
				opacity: 0;
			}
		}
		.my {
			font-size: 30rpx;
			color: #333333;
			margin-left: 30rpx;
		}
	}
</style>
