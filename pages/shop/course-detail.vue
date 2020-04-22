<template>
	<view class="">
		<view>
			<swiper class="banner-swiper" :autoplay="autoplay" circular :interval="interval" :duration="duration">
				<swiper-item v-for="(item,index) in chooseCourse.class_banner" :key="index">
					<image :src="item" class="banner"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="uni-flex uni-row vertical taste">
			<view class="uni-flex vertical rest">
				<text class="title">{{chooseCourse.class_name}}</text>
				<text class="subtitle">{{chooseCourse.class_duration || ''}}</text>
			</view>
			<view class="uni-flex price">￥{{chooseCourse.class_price}}/节</view>
		</view>
		<view class="uni-flex uni-row vertical coachdesc">
			<view class="uni-flex uni-column">
				<view class="uni-flex titlebar">教练介绍</view>
				<view class="uni-flex name">{{chooseCourse.teacher_name}}</view>
				<view class="uni-flex name">{{chooseCourse.introduction}}</view>
			</view>
		</view>
		<view class="uni-flex uni-row vertical coachdesc">
			<view class="uni-flex uni-column">
				<view class="uni-flex titlebar">上课时间</view>
				<view class="uni-flex name">{{chooseCourse.time || ''}}</view>
				<view class="uni-flex name">{{chooseCourse.position || ''}}</view>
			</view>
		</view>
		<view>
			<!-- <image src="/static/detaildesc.png" class="desc"></image> -->
			<rich-text :nodes="chooseCourse.class_details"></rich-text>
		</view>
		<view class="uni-flex content pay" @click="turnPay(chooseCourse.class_id)">立即购买</view>
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
		computed: mapState(['chooseCourse']),
		data() {
			return {
				//轮播图参数
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 500,
			}
		},
		onLoad() {
			if(this.chooseCourse.class_time) {
				let item = this.deepCopy(this.chooseCourse)
				item.class_time = item.class_time.replace(new RegExp('\n+',"gm"),',')
				item.time = item.class_time.split(',')[0]
				item.position = item.class_time.split(',')[1]
				//处理富文本图片自适应
				item.class_details = item.class_details.replace(/<img/gi, '<img width="100%!important" ')
				this.$store.commit('setChooseCourse', item)
			}
		},
		methods: {
			turnPay(class_id) {
				uni.navigateTo({
				    url: '/pages/shop/course-booking?class_id=' + class_id
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
	.banner-swiper {
		height: 360rpx;
	}
	.banner {
		height: 360rpx;
		width: 100%;
	}
	.taste {
		width: 702rpx;
		margin: 0 auto;
		border-bottom: 2rpx solid #EAE9E9;
		height: 100rpx;
		.title {
			font-size: 30rpx;
			color: #333333;
			margin-right: 10rpx;
		}
		.subtitle {
			font-size: 20rpx;
			color: #999999;
		}
		.price {
			font-size: 30rpx;
			color: #FF4747;
			margin-right: 24rpx;
		}
	}
	.coachdesc {
		width: 702rpx;
		margin: 0 auto;
		height: 170rpx;
		border-bottom: 2rpx solid #EAE9E9;
		.titlebar {
			font-size: 30rpx;
			color: #333333;
		}
		.name {
			font-size: 24rpx;
			color: #666666;
		}
	}
	.desc {
		width: 750rpx;
		height: 860rpx;
	}
	.pay {
		width:702rpx;
		height:80rpx;
		background:rgba(255,71,71,1);
		border-radius:40rpx;
		color: white;
		font-size:30rpx;
		margin: 0 auto;
		margin-top: 36rpx;
		margin-bottom: 24rpx;
	}
</style>
