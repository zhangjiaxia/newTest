<template>
	<view style="padding-top: 20rpx;">
		<view class="space">
			<view class="uni-flex uni-row course" style="position: relative;" @click="turnCourseDetail(item)"
				v-for="(item, index) in classList" :key="index">
				<image :src="item.class_cover_img" class="course posi"></image>
				<view class="uni-flex uni-column content info">
					<view class="uni-flex">
						<image :src="item.teacher_avatar_url" class="head"></image>
					</view>
					<view class="uni-flex name">{{item.teacher_name}}</view>
					<view class="uni-flex price">{{item.class_name}}￥{{item.class_price}}/节</view>
				</view>
				<view class="uni-flex rest"></view>
			</view>
			<view class="empty-text" v-if="(classList.length == classData.total) && classList.length > 0">已经到底了</view>
			<view class="empty-text" v-if="classList.length == 0">暂无数据</view>
		</view>
	</view>
</template>

<script>
	import interfaceurl from '@/utils/interface.js'
	export default {
		data() {
			return {
				classData: {}, //课程数据
				classList: [], //课程列表
				currentPage: 1 //分页参数，第几页
			}
		},
		onLoad() {
			this.userLogin()
		},
		onShow() {
			this.initData()
		},
		//到达页面底部时触发的事件
		onReachBottom() {
			if (this.classList.length >= this.classData.total) {
				return;
			}
			this.currentPage++;
			this.getClassesList()
		},
		methods: {
			userLogin() {
				let that = this
				let baseUrl = 'https://fitness.bidou88.cn/api'
				uni.login({
				  success (res) {
				    if (res.code) {
						//这里直接用原生请求就行了
						uni.request({
							url: `${baseUrl}/v1/login/getToken`,
							data: {
							  code: res.code
							},
							success (res) {
								if(res.data.code != 0) {
									uni.showToast({
										title: res.data.msg,
										icon: 'none',
										duration: 2000
									});
									return;
								}
								console.log('授权成功')
								let loginResp = res.data.data;
								uni.setStorageSync('token', loginResp.token)
								that.$store.commit('updateToken', loginResp.token)
							},
							fail(res) {
								interfaceurl.showErr(res)
							}
						})
				    } else {
				      uni.showToast({
						  title: '登录失败！' + res.errMsg,
						  icon: 'none',
						  duration: 2000
				      });
				    }
				  }
				})
			},
			initData() {
				//重置分页参数
				this.classData = {}
				this.classList = []
				this.currentPage = 1
				this.getClassesList()
			},
			//获取首页课程列表
			getClassesList() {
				let that = this;
				interfaceurl.checkAuth(interfaceurl.classesList, {page: 1}, false).then((res) => {
					that.classData = res.data
					if(that.currentPage == 1) {
						that.classList = res.data.data
					} else {
						that.classList = that.classList.concat(res.data.data)
					}
				});
			},
			turnCourseDetail(course) {
				this.$store.commit('setChooseCourse', course)
				uni.navigateTo({
				    url: '/pages/shop/course-detail'
				});
			}
		}
	}
</script>

<style lang="scss">
	.space {
		width: 700rpx;
		margin: 0 auto;
		.posi {
			position: absolute;
			top: 0;
			z-index: -1;
		}
		.course {
			width: 700rpx;
			height: 350rpx;
			margin-bottom: 20rpx;
			.info {
				width: 240rpx;
				.head {
					width: 158rpx;
					height: 158rpx;
				}
				.name {
					color: #FFFFFF;
					font-size: 30rpx;
					margin-top: 14rpx;
				}
				.price {
					color: #FFFFFF;
					font-size: 24rpx;
					text-align: center;
				}
			}
		}
	}
</style>
