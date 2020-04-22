<template>
	<view>
		<view class="bar-sticky">
			<navigationBar :navigationBarStyle="navigationBarStyle"></navigationBar>
		</view>
		<view class="layout">
			<view class="uni-flex uni-row" style="margin: 28rpx 0;">
				<view class="uni-flex rest content" @click="selectTab(index, item.val)" v-for="(item, index) in tabList" :key="index">
					<text :class="{active: tabIndex == index}">{{item.text}}</text>
				</view>
			</view>
			<view class="order" v-for="(item, index) in orderPageList" :key="index">
				<view class="uni-flex uni-row time">
					<view class="uni-flex rest date">
						{{item.goods_order_no}}
					</view>
					<view class="uni-flex tip">
						{{setStatusText(item.status)}}
					</view>
				</view>
				<view class="uni-flex uni-row orderitem" v-for="(subItem, i) in item.goods_cart" :key="i">
					<view class="uni-flex">
						<image :src="subItem.goods_cover_img" class="goodsimg"></image>
					</view>
					<view class="uni-flex uni-column rest goodsinfo">
						<view class="title">{{subItem.goods_name}}</view>
					</view>
					<view class="uni-flex uni-column goodsdata">
						<view class="title">￥{{subItem.goods_price}}</view>
						<view class="horizontalright number">x{{subItem.buy_number}}</view>
					</view>
				</view>
				<view class="uni-flex settle">
					<view class="uni-flex rest horizontalright totaldesc">
						共1件商品
					</view>
					<view class="uni-flex totalspace">
						<text class="total">合计:</text>
						<text class="totalnum">￥{{item.total_price}}</text>
					</view>
				</view>
			</view>
			<view style="margin-top: 50rpx;">
				<view class="empty-text" v-if="(orderPageList.length == orderPageData.total) && orderPageList.length > 0">已经到底了</view>
				<view class="empty-text" v-if="orderPageList.length == 0">暂无数据</view>
			</view>
		</view>
	</view>
</template>

<script>
	import interfaceurl from '@/utils/interface.js'
	export default {
		data() {
			return {
				tabIndex: 0, //订单状态索引
				tabList: [{
					text: '全部',
					val: ''
				},{
					text: '待支付',
					val: '0'
				},{
					text: '待发货',
					val: '1'
				},{
					text: '已收货',
					val: '2'
				}],
				params: {
					page: 1, //页数
					//status: ''
				}, //分页参数
				orderPageData: {}, //订单数据
				orderPageList: [], //订单列表
				orderCount: [] //每个订单的商品个数
			}
		},
		onLoad(options) {
			
		},
		onShow() {
			this.initData()
		},
		//到达页面底部时触发的事件
		onReachBottom() {
			if (this.orderPageList.length >= this.orderPageData.total) {
				return;
			}
			this.params.page++;
			this.getOrderList()
		},
		methods: {
			initData() {
				//重置分页参数
				this.orderPageData = {}
				this.orderPageList = []
				this.params.page = 1
				this.getOrderList();
			},
			getOrderList() {
				let that = this;
				interfaceurl.checkAuth(interfaceurl.orderList, this.params, false).then((res) => {
					that.orderPageData = res.data
					if(that.params.page == 1) {
						that.orderPageList = res.data.data
					} else {
						that.orderPageList = that.orderPageList.concat(res.data.data)
					}
				});
			},
			selectTab(index, status) {
				this.tabIndex = index
				this.params.status = index == 0 ? '' : index
				this.initData()
			},
			setStatusText(status) {
				let text = ''
				if(status == 1) {
					text = '待支付'
				} else if(status == 2) {
					text = '待发货'
				} else if(status == 3) {
					text = '已收货'
				}
				return text
			}
		}
	}
</script>

<style lang="scss">
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import '/common/uni.css';
	/*自定义公共样式*/
	@import '/common/custom.css';
	page {
		background: #F7F4F8;
	}
	.layout {
		margin: 0 auto;
		width: 700rpx;
		padding-top: 20rpx;
	}
	.notice {
		color: #999999;
		margin-top: 30rpx;

		.line {
			width: 50rpx;
			height: 4rpx;
			background: #999999;
		}

		.space {
			margin: 0 10rpx;
		}
	}
	.active {
		color: #FF4747;
		border-bottom: 1px solid #FF4747;
	}
	.searchbar {
		// margin-top: 20rpx;
		width: 100%;
		height: 70rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 2px 3px 0px rgba(255, 255, 255, 0.2);
		border-radius: 35rpx;
		.search {
			font-size: 28rpx;
			margin-left: 41rpx;
			margin-right: 15rpx;
		}
		.searchorder {
			font-size: 24rpx;
			color: #AAAAAA;
		}
	}
	.order {
		width: 710rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
		border-radius: 15rpx;
		margin-top: 20rpx;
		padding-bottom: 24rpx;
	}
	.time {
		padding: 20rpx;
		font-size: 24rpx;

		.date {
			color: #999999;
		}

		.tip {
			color: #FF4747;
		}
	}
	.orderitem {
		// padding-top: 50rpx;
		margin-bottom: 27rpx;
		.goodsimg {
			width: 159rpx;
			height: 159rpx;
			margin-left: 20rpx;
			margin-right: 30rpx;
		}
		.goodsinfo {
			.prop {
				background: #F3F0F3;
				.size {
					color: #A09DA1;
					margin-right: 10rpx;
					padding: 6rpx;
					display: inline-flex;
					margin-bottom: 10rpx;
					font-size: 23rpx;
					border-radius: 6rpx;
				}
			}
		}
		.goodsdata {
			margin-left: 40rpx;
			margin-right: 30rpx;
			.number {
				color: #999999;
				font-size: 20rpx;
				text-align: right;
			}
		}
	}
	.settle {
		font-size: 24rpx;

		.totaldesc {
			color: #999999;
		}
		.totalspace {
			margin-left: 10px;
			margin-right: 20px;
			margin-bottom: 40rpx;
			.total {
				color: #333333;
			}
			.totalnum {
				color: #FF0808;
			}
		}
	}
	.btnop {
		font-size: 26rpx;
		.btnleft {
			width: 164rpx;
			height: 55rpx;
			color: #868387;
			border: 1px solid #EBE8EB;
			border-radius: 40rpx;
		}
		.btnright {
			width: 160rpx;
			height: 50rpx;
			color: #FFFFFF;
			background: #FF4747;
			border-radius: 40rpx;
			margin-left: 16rpx;
			margin-right: 25rpx;
		}
	}
</style>
