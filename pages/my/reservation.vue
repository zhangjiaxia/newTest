<template>
	<view class="">
		<view class="list">
			<view class="uni-flex uni-row vertical item" v-for="(item, index) in myReservations" :key="index">
				<view class="uni-flex">
					<image :src="item.class_cover_img" class="head"></image>
				</view>
				<view class="uni-flex uni-column rest">
					<view class="uni-flex title">{{item.class_name}}</view>
					<view class="uni-flex subtitle">{{item.teacher_name}}</view>
				</view>
				<view class="uni-flex uni-column" style="margin-right: 20rpx;">
					<view class="uni-flex date">{{item.create_time}}</view>
					<view class="uni-flex horizontalright msg">预约成功</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import interfaceurl from '@/utils/interface.js'
	export default {
		data() {
			return {
				myReservations: [] //我的预约列表
			}
		},
		onLoad() {

		},
		onShow() {
			this.getMyReservation()
		},
		methods: {
			getMyReservation() {
				let that = this;
				interfaceurl.checkAuth(interfaceurl.myReservation, {}).then((res) => {
					that.myReservations = res.data
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F6F6F6;
	}
	.list {
		padding-top: 20rpx;
		.item {
			margin: 0 auto;
			margin-bottom: 20rpx;
			width:710rpx;
			height:120rpx;
			background:rgba(255,255,255,1);
			box-shadow:0px 1px 5px 0px rgba(4,0,0,0.08);
			border-radius:10rpx;
			.head {
				width: 80rpx;
				height: 80rpx;
				margin-left: 25rpx;
				margin-right: 20rpx;
			}
			.title, .subtitle {
				color: #333333;
				font-size: 30rpx;
			}
			.subtitle {
				font-size: 24rpx;
			}
			.date {
				color: #999999;
				font-size: 24rpx;
			}
			.msg {
				font-size: 24rpx;
				color: #FF4747;
			}
		}
	}
</style>
