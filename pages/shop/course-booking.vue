<template>
	<view style="padding-top: 20rpx;">
		<view class="uni-flex uni-row vertical linebar">
			<view class="uni-flex name">姓名</view>
			<view class="uni-flex rest">
				<input type="text" placeholder="请填写姓名" v-model="params.name" />
			</view>
		</view>
		<view class="uni-flex uni-row vertical linebar">
			<view class="uni-flex name">手机号码</view>
			<view class="uni-flex rest">
				<input type="text" placeholder="请填写手机号码" v-model="params.mobile" />
			</view>
		</view>
		<view class="uni-flex content directpay" @click="courseBooking">立即购买</view>
	</view>
</template>

<script>
	import interfaceurl from '@/utils/interface.js'
	export default {
		data() {
			return {
				params: {
					class_id: '', //课程id
					name: '', //姓名
					mobile: '' //手机号
				}
			}
		},
		onLoad(options) {
			this.params.class_id = options.class_id
		},
		methods: {
			courseBooking() {
				let that = this;
				interfaceurl.checkAuth(interfaceurl.reservation, this.params).then((res) => {
					uni.showToast({
					    title: '课程预约成功',
					    icon: 'success',
					    duration: 2000
					});
					uni.switchTab({
					    url: '/pages/index/index'
					});
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F7F4F8;
	}
	.linebar {
		height:100rpx;
		background:rgba(255,255,255,1);
		border-bottom: 2rpx solid #F7F4F8;
		.name {
			width: 148rpx;
			color: #333333;
			font-size: 30rpx;
			padding-left: 29rpx;
		}
		input {
			font-size: 30rpx;
			color: #333333;
		}
	}
	.directpay {
		width:702rpx;
		height:80rpx;
		background:rgba(255,71,71,1);
		border-radius:40px;
		color: white;
		font-size: 30rpx;
		margin: 0 auto;
		margin-top: 245rpx;
	}
</style>
