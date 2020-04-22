<template>
	<view>
		<view class="container">
			<swiper class="swiper" circular :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="(item,index) in chooseGoods.goods_banner" :key="index">
					<image :src="item" class="banner-img"></image>
				</swiper-item>
			</swiper>
			<view class="shop-message">
				<view class="shop-title">{{chooseGoods.goods_name || ''}}</view>
				<view class="shop-price">
					￥{{chooseGoods.goods_price}}
					<!-- <text class="original-price">￥239</text> -->
				</view>
			</view>
			<view class="uni-flex tab-list">
				<view class="uni-flex vertical">
					<image src="/static/like.png" style="width: 40rpx;height: 38rpx;"></image>
					<text style="margin-left: 10rpx;margin-right: 40rpx;color: #32A54A;">店铺担保</text>
				</view>
				<view class="uni-flex rest" style="color: #999999;">全程护航，放心购买</view>
			</view>
			<view class="tab-list">
				<view class="uni-flex vertical tab-item">
					<image src="/static/ensure1.png" class="tab-icon"></image>
					<text>正品保证</text>
				</view>
				<view class="uni-flex vertical tab-item">
					<image src="/static/ensure2.png" class="tab-icon"></image>
					<text>全场包邮</text>
				</view>
				<view class="uni-flex vertical tab-item">
					<image src="/static/ensure3.png" class="tab-icon"></image>
					<text>全场钜惠</text>
				</view>
				<view class="uni-flex vertical tab-item">
					<image src="/static/ensure4.png" class="tab-icon"></image>
					<text>售后无忧</text>
				</view>
			</view>
			<view class="uni-flex tab-list" style="margin-bottom: -70rpx;">
				<view class="uni-flex rest horizontalright">
					<view style="background: #CCCCCC;width: 70rpx;height: 2rpx;"></view>
				</view>
				<view class="uni-flex" style="color: #999999;margin: 0 20rpx;">商品详情</view>
				<view class="uni-flex rest">
					<view style="background: #CCCCCC;width: 70rpx;height: 2rpx;"></view>
				</view>
			</view>
			<view class="detail">
				<view class="rich-text">
					<!-- <view v-html="goodsDetail.detailInfo"></view> -->
					<rich-text :nodes="chooseGoods.goods_details"></rich-text>
				</view>
			</view>
		</view>
		<view class="detail-bottom">
			<!-- <view class="detail-bottom-left">
				<view class="uni-flex content detail-bottom-item" @click="shareModal=true;getQrcode()">
					<image src="/static/tabbar/index.png" class="share-icon"></image>
					<view>首页</view>
				</view>
				<view class="uni-flex content detail-bottom-item" @click="shoppingPage">
					<image src="/static/shopping-icon.png" class="share-icon"></image>
					<view>购物车</view>
				</view>
			</view> -->
			<view class="shop-btn" @click="turnIndex">首页</view>
			<view class="pay-btn" @click="atOncePay">立即购买</view>
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
		computed: mapState(['chooseGoods']),
		data() {
			return {
				goodsDetail: {
					detailImgUrlList: ['https://yd-imgs.380star.com/hl/upload/32644/store/1679/1b980e3d-82b2-4925-875c-60b3b17f857b.jpg','https://yd-imgs.380star.com/hl/upload/32644/store/1679/d91ec6ed-5a80-4623-80d1-5ca8e580ab53.jpg'],
					name: '丹爵(DANJUE)新款头层牛皮自动扣皮带时尚豹子合金扣头皮带腰带礼盒装 皮带27',
					price: '99.00',
					detailInfo: '<div><br />'+
						'<img src="http://img30.360buyimg.com/popWaterMark/jfs/t14239/225/2021169209/355555/f9a68ddc/5a65b176N34b98045.jpg" id="1" alt="" /> <br />'+
						'<img src="http://img30.360buyimg.com/popWaterMark/jfs/t14728/210/1993621546/75450/8786f1e8/5a65b176N720700dd.jpg" id="1" alt="" /> <br />' +
						'<img src="http://img30.360buyimg.com/popWaterMark/jfs/t19240/190/241946880/342689/32b2e853/5a65b177N85e8b793.jpg" id="1" alt="" /> <br />' +
						'<img src="http://img30.360buyimg.com/popWaterMark/jfs/t19240/192/234509636/213726/825a56a7/5a65b17aN42266137.jpg" id="1" alt="" /> <br />' +
						'<img src="http://img30.360buyimg.com/popWaterMark/jfs/t14716/230/2001317458/259565/3484e0ad/5a65b176Necaae2ab.jpg" id="1" alt="" /> <br />' +
						'<img src="http://img30.360buyimg.com/popWaterMark/jfs/t15565/48/1893452029/195845/99db5fa5/5a65b176N8955a348.jpg" id="1" alt="" /> <br />' +
						'<img src="http://img30.360buyimg.com/popWaterMark/jfs/t19687/241/240566974/139080/6b9e709b/5a65b176N10aca661.jpg" id="1" alt="" /> <br />' +
						'<img src="http://img30.360buyimg.com/popWaterMark/jfs/t18043/150/232584547/129284/8bcdc1c2/5a65b176N6aeb15be.jpg" id="1" alt="" /> <br />' +
						'<img src="http://img30.360buyimg.com/popWaterMark/jfs/t16318/173/1823346756/480247/5b527966/5a65b177Nfc88201b.jpg" id="1" alt="" /> <br />' +
						'</div>'
				}, //商品详情
				//轮播参数
				indicatorDots: false,
				autoplay: true,
				interval: 3000,
				duration: 500
			}
		},
		onLoad(options) {
			let item = this.deepCopy(this.chooseGoods)
			//处理富文本图片自适应
			item.goods_details = item.goods_details.replace(/<img/gi, '<img width="100%!important" ')
			this.$store.commit('setChooseGoods', item)
		},
		onShow() {
			
		},
		methods: {
			turnIndex() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			atOncePay() {
				let that = this;
				let params = {
					goods_id: this.chooseGoods.goods_id,
					buy_number: 1
				}
				interfaceurl.checkAuth(interfaceurl.directBuy, params).then((res) => {
					uni.navigateTo({
					    url: '/pages/my/address-add?cart_id='+res.data.cart_id
					});
				});
			},
			deepCopy(obj) {
				var result = Array.isArray(obj) ? [] : {};
				for (var key in obj) {
					if (obj.hasOwnProperty(key)) {
						if (typeof obj[key] === 'object' && obj[key] !== null) {
							result[key] = this.deepCopy(obj[key]); //递归复制
						} else {
							result[key] = obj[key];
						}
					}
				}
				return result;
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background: #ffffff;
		padding-bottom: 130upx;
	}

	.swiper {
		width: 100%;
		height: 750upx;
	}

	.banner-img {
		width: 100%;
		height: 100%;
	}

	.shop-message {
		padding: 30upx;
		background: #ffffff;
	}

	.shop-title {
		font-size: 32upx;
		font-weight: bold;
		color: #4D3A42;
	}

	.shop-price {
		font-size: 36upx;
		margin-top: 20upx;
		color: #031F5E;
	}
	
	.original-price {
		font-size: 24rpx;
		text-decoration:line-through;
		color:rgba(153,153,153,1);
		margin-left: 10rpx;
	}
	
	.shop-postage {
		color: #999999;
		font-size: 24rpx;
		margin-top: 28rpx;
	}

	.advantage {
		height: 80upx;
		padding: 0upx 30upx;
		background: #F5F5FA;
		color: #999999;
		font-size: 26upx;
		display: flex;
		align-items: center;
	}

	.advantage-text {
		color: #22AC38;
		margin-right: 30upx;
	}

	.advantage-icon {
		width: 39upx;
		height: 39upx;
		margin-right: 10upx;
	}

	.detail {
		margin-top: 70rpx;
	}

	.detail-title {
		text-align: center;
		height: 80upx;
		line-height: 80upx;
		color: #CCCCCC;
		background: #D6F2F9;
	}

	.tab-list {
		display: flex;
		height: 80upx;
		padding: 0upx 30upx;
		background: #F5F5FA;
		margin-top: 20upx;
		align-items: center;
	}

	.tab-item {
		flex: 1;
		font-size: 26upx;
		color: #999999;
	}

	.tab-icon {
		width: 28rpx;
		height: 28rpx;
		margin-right: 10rpx;
	}

	.detail-bottom {
		width: 100%;
		height: 100upx;
		position: fixed;
		left: 0px;
		bottom: 0px;
		background: #f5f5f5;
		box-sizing: border-box;
		display: flex;
	}

	.shop-btn {
		width: 50%;
		height: 100%;
		color: #5D421F;
		line-height: 100rpx;
		text-align: center;
		background: #FFDF2A;
	}

	.pay-btn {
		width: 50%;
		height: 100%;
		color: #ffffff;
		line-height: 100upx;
		text-align: center;
		background: #EA6100;
	}

	.detail-bottom-left {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #666666;
		background: white;
	}

	.share-icon {
		width: 36rpx;
		height: 36rpx;
	}

	.detail-bottom-item {
		width: 130upx;
		text-align: center;
		font-size: 26upx;
		position: relative;
		line-height: 1.2;
	}

	.mask {
		background: #4B4B4B;
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 1;
		opacity: 0.9;
		/*避免其他页面元素使用定位引发的位置偏移*/
		top: 0;
	}
	.confirm-modal-content {
		width: 100%;
		background: #ffffff;
		box-sizing: border-box;
		position: fixed;
		left: 0px;
		bottom: 0px;
		padding: 30upx;
		border-radius: 20upx 20upx 0upx 0upx;
		z-index: 100;
	}

	.modal-shop-message {
		display: flex;
		align-items: center;
	}

	.modal-shop-img {
		width: 160upx;
		height: 160upx;
		border-radius: 10upx;
		margin-right: 30upx;
	}

	.modal-shop-close {
		font-size: 30rpx !important;
	}

	.modal-shop-content {
		flex: 1;
	}

	.amount {
		font-size: 26upx;
		color: #999999;
		margin-top: 10upx;
	}

	.spec-content {
		margin-top: 10rpx;
		padding: 10rpx 0rpx;
	}

	.spec-list {
		display: flex;
		flex-wrap: wrap;
	}

	.spec-item {
		display: inline-block;
		height: 50upx;
		line-height: 50upx;
		padding: 0upx 20upx;
		border-radius: 10upx;
		margin-right: 10upx;
		background-color: #EEEEEE;
		color: #CCCCCC;
		font-size: 26upx;
		margin: 10rpx;
	}

	.spec-active {
		color: #F39800;
		background: #FFF6E4;
	}

	.shop-item-bottom {
		margin-top: 30upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.shop-num {
		height: 39upx;
		line-height: 39upx;
		border: 1px solid #cccccc;
		border-radius: 10upx;
		text-align: center;
	}

	.reduct-btn {
		display: inline-block;
		width: 42upx;
		border-right: 1px solid #cccccc;
	}

	.num {
		display: inline-block;
		width: 65upx;
	}

	.add-btn {
		display: inline-block;
		width: 42upx;
		border-left: 1px solid #cccccc;
	}

	.modal-bottom {
		margin-top: 50upx;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		display: flex;
		justify-content: center;
		background: #0070D1;
		border-radius: 40rpx;
		color: #FFFFFF;
	}

	.modal-bottom-left {
		display: inline-block;
		flex: 1;
		background: #FFDE2A;
		border-radius: 0upx 30upx 30upx 0upx;
	}

	.modal-bottom-right {
		display: inline-block;
		flex: 1;
		background: #EB6100;
		color: #ffffff;
		border-radius: 30upx 0upx 0upx 30upx;
	}

	.rich-text {
		width: 100%;
		overflow: hidden;
	}

	.rich-text image {
		width: 100%;
		height: auto;
	}

	p {
		margin: 0px;
		padding: 0px;
	}

	.search-btn {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0px;
		bottom: 0px;
		opacity: 0;
		z-index: 999;
	}
</style>
