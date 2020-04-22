<template>
	<view class="">
		<view class="space">
			<view class="goods" :style="{'margin-right': index % 2 == 0 ? '20rpx' : '0'}" @click="turnShopDetail(item)"
				v-for="(item, index) in goodsList" :key="index">
				<view style="width: 100%;">
					<image :src="item.goods_cover_img" class="goodsimg"></image>
				</view>
				<view class="title">{{item.goods_name}}</view>
				<view class="uni-flex uni-row price">
					<view class="uni-flex rest">
						<text style="font-size: 24rpx;">￥</text>
						<text>{{item.goods_price}}</text>
					</view>
					<view class="uni-flex">
						<image src="/static/add.png" class="add"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="empty-text" v-if="(goodsList.length == goodsData.total) && goodsList.length > 0">已经到底了</view>
		<view class="empty-text" v-if="goodsList.length == 0">暂无数据</view>
	</view>
</template>

<script>
	import interfaceurl from '@/utils/interface.js'
	export default {
		data() {
			return {
				childrenGoodsList: [{
					name: 'FL男子短袖T恤FL男子短袖T恤 FL男子短袖T恤',
					price: 10,
					mainImgUrl: 'https://yd-imgs.380star.com/hl/upload/32420/store/1593/7aa07ef2-ff93-42fb-a890-8c9d11d3b40d.jpg'
				},{
					name: 'FL男子短袖T恤FL男子短袖T恤 FL男子短袖T恤',
					price: 10,
					mainImgUrl: 'https://yd-imgs.380star.com/hl/upload/32420/store/1593/7aa07ef2-ff93-42fb-a890-8c9d11d3b40d.jpg'
				},{
					name: 'FL男子短袖T恤FL男子短袖T恤 FL男子短袖T恤',
					price: 10,
					mainImgUrl: 'https://yd-imgs.380star.com/hl/upload/32420/store/1593/7aa07ef2-ff93-42fb-a890-8c9d11d3b40d.jpg'
				},{
					name: 'FL男子短袖T恤FL男子短袖T恤 FL男子短袖T恤',
					price: 10,
					mainImgUrl: 'https://yd-imgs.380star.com/hl/upload/32420/store/1593/7aa07ef2-ff93-42fb-a890-8c9d11d3b40d.jpg'
				},{
					name: 'FL男子短袖T恤FL男子短袖T恤 FL男子短袖T恤',
					price: 10,
					mainImgUrl: 'https://yd-imgs.380star.com/hl/upload/32420/store/1593/7aa07ef2-ff93-42fb-a890-8c9d11d3b40d.jpg'
				}],
				goodsData: {}, //商品数据
				goodsList: [], //商品列表
				currentPage: 1 //分页参数，第几页
			}
		},
		onLoad() {

		},
		onShow() {
			this.initData()
		},
		//到达页面底部时触发的事件
		onReachBottom() {
			if (this.goodsList.length >= this.goodsData.total) {
				return;
			}
			this.currentPage++;
			this.getGoodsList()
		},
		methods: {
			initData() {
				//重置分页参数
				this.goodsData = {}
				this.goodsList = []
				this.currentPage = 1
				this.getGoodsList();
			},
			//获取首页课程列表
			getGoodsList() {
				let that = this;
				interfaceurl.checkAuth(interfaceurl.goodsList, {page: this.currentPage}, false).then((res) => {
					that.goodsData = res.data
					if(that.currentPage == 1) {
						that.goodsList = res.data.data
					} else {
						that.goodsList = that.goodsList.concat(res.data.data)
					}
				});
			},
			turnShopDetail(goods) {
				this.$store.commit('setChooseGoods', goods)
				uni.navigateTo({
				    url: '/pages/shop/shop-detail'
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #EFEFEF;
	}
	.space {
		//-webkit-overflow-scrolling: touch;
		width: 700rpx;
		margin: 0rpx auto;
		padding-top: 20rpx;
		margin-bottom: 40rpx;
		//父级div高度同子级高度
		height: auto;
		overflow: auto;
		.goods {
			width: 340rpx;
			background: #FFFFFF;
			border-radius: 20rpx;
			float: left;
			margin-bottom: 20rpx;
			.goodsimg {
				width: 340rpx;
				height: 340rpx;
				border-top-left-radius: 20rpx;
				border-top-right-radius: 20rpx;
			}
			.title {
				font-size: 24rpx;
				color: #333333;
				margin: 10rpx;
			}
			.price {
				font-size: 30rpx;
				color: #FF4747;
				margin-left: 10rpx;
				margin-bottom: 20rpx;
				.add {
					width: 32rpx;
					height: 32rpx;
					margin-right: 20rpx;
				}
			}
			view {
				line-height: 1.2;
			}
		}
	}
</style>
