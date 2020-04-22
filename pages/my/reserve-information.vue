<template>
	<view>
		<view class="info" v-for="(item, index) in coachBook" :key="index">
			<view class="uni-flex uni-row vertical" style="margin-bottom: 20rpx;padding: 0 40rpx;">
				<view class="uni-flex rest course">{{item.class_name}}</view>
				<view class="uni-flex">
					<text class="base">预约人数：</text>
					<text class="num">{{item.count}}</text>
				</view>
			</view>
			<view class="orderinfo">
				<view class="uni-flex uni-row item" v-for="(subItem, i) in item.reservations" :key="i">
					<view class="uni-flex content rank">
						{{index + 1}}
					</view>
					<view class="uni-flex content">
						<image :src="subItem.user_avatar_url" class="head"></image>
					</view>
					<view class="uni-flex uni-column content rest nick">
						<view>{{subItem.name}}</view>
						<view>{{subItem.mobile}}</view>
					</view>
					<view class="uni-flex content num">
						{{subItem.create_time}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import interfaceurl from '@/utils/interface.js'
	//引入store的内容
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	export default {
		computed: mapState(['coachBook']),
		data() {
			return {
				bookList: []
			}
		},
		onLoad() {
			
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		background: #F7F5F6;
	}
	.info {
		padding-top: 20rpx;
		.course {
			font-size: 30rpx;
			color: #333333;
		}
		.base {
			color: #333333;
			font-size: 24rpx;
		}
		.num {
			font-size: 24rpx;
			color: #FF4747;
		}
	}
	.orderinfo {
		margin: 0 auto;
		width:710rpx;
		background:rgba(255,255,255,1);
		border-radius:10rpx;
		.item {
			height:160rpx;
			background:rgba(255,255,255,1);
			border-bottom: 1px solid #E8E5E8;
			.rank {
				font-size: 30rpx;
				color: #333333;
				margin-left: 30rpx;
				margin-right: 62rpx;
			}
			.head {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
			}
			.nick {
				font-size: 30rpx;
				color: #333333;
			}
			.num {
				color: #999999;
				font-size: 24rpx;
				margin-right: 30rpx;
			}
		}
	}
</style>
