<template>
	<view class="">
		<view class="uni-flex uni-column info" v-for="(item, index) in bannerList" :key="index" @click="turnDetail(item)">
			<view class="uni-flex">
				<image :src="item.banner" class="dynamic"></image>
			</view>
			<view class="uni-flex title">
				<!-- 【原创定制】专注企业歌曲视频、音频制作，经历十年的经验积累和文化沉淀 -->{{item.banner_title}}
			</view>
		</view>
		<!-- <view class="uni-flex uni-column info">
			<view class="uni-flex">
				<image src="../../static/dynamic.png" class="dynamic"></image>
			</view>
			<view class="uni-flex title">
				【原创定制】专注企业歌曲视频、音频制作，经历十年的经验积累和文化沉淀
			</view>
		</view>
		<view class="uni-flex uni-column info">
			<view class="uni-flex">
				<image src="../../static/dynamic.png" class="dynamic"></image>
			</view>
			<view class="uni-flex title">
				【原创定制】专注企业歌曲视频、音频制作，经历十年的经验积累和文化沉淀
			</view>
		</view> -->
	</view>
</template>

<script>
	import interfaceurl from '@/utils/interface.js'
	export default {
		data() {
			return {
				bannerList: [] //动态列表
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.getBannerList()
		},
		methods: {
			//获取首页课程列表
			getBannerList() {
				let that = this;
				interfaceurl.checkAuth(interfaceurl.bannerList, {}).then((res) => {
					that.bannerList = res.data
					console.log(that.bannerList)
				});
			},
			turnDetail(detail) {
				this.$store.commit('setDynamicDesc', detail)
				uni.navigateTo({
				    url: '/pages/dynamic/desc'
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F6F6F6;
	}
	.info {
		width: 702rpx;
		margin: 0 auto;
		background: white;
		margin-bottom: 15rpx;
		.dynamic {
			width: 702rpx;
			height: 440rpx;
		}
		.title {
			color: #312E31;
			font-weight: bold;
			font-size: 30rpx;
		}
	}
</style>
