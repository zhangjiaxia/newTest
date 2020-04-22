<template>
	<view class="container">
		<view class="form-item">
			<view>收货人</view>
			<input class="form-input" placeholder="请输入收货人姓名" placeholder-style="color:#BFBFBF;" v-model="saveParams.contact_name" />
		</view>
		<view class="form-item">
			<view>手机号码</view>
			<input class="form-input" placeholder="请输入收货人手机号码" placeholder-style="color:#BFBFBF;" v-model="saveParams.contact_mobile" />
		</view>
		<view class="form-item">
			<view>选择地区</view>
			<view class="form-input content" @click="showMulLinkageThreePicker" style="position: relative;">
				<text style="position: absolute;right: 0;">{{saveParams.address || '请选择地区'}}</text>
			</view>
		</view>
		<view class="form-item">
			<view>详细地址</view>
			<input class="form-input" placeholder="请输入详细地址" placeholder-style="color:#BFBFBF;" v-model="saveParams.detail" />
		</view>
		<!-- <view class="form-item">
			<view>详细地址</view>
			<input class="form-input" placeholder="请填写详细地址" placeholder-style="color:#BFBFBF;" v-model="saveParams.receiverAddr" />
		</view>
		<view class="default-address">
			<view>设为默认地址</view>
			<switch :checked="saveParams.isDefault == 1 ? true : false" @change="switchChange" color="#0070D1" style="transform:scale(0.8)"/>
		</view> -->
		<view class="btn-container">
			<view class="common-btn" @click="saveAddress">保存</view>
		</view>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import interfaceurl from '@/utils/interface.js'
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '@/common/city.data.js';
	export default {
		components: {
			mpvuePicker,
			mpvueCityPicker
		},
		data() {
			return {
				//动态参数
				themeColor: '#007AFF',
				cityPickerValueDefault: [0, 0, 1],
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray:[],
				saveParams: {
					detail: '', //详细地址
					address: '',
					contact_name: '',
					contact_mobile: ''
				},
				cart_id: '' //购物车id
			}
		},
		onLoad(options) {
			this.cart_id = options.cart_id
		},
		onShow() {
      
		},
		methods: {
			// 三级联动选择
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				//console.log(e)
				this.saveParams.address = e.label.replace('-', '').replace('-', '');
			},
			onCancel(e) {
				//console.log('取消地址选择')
			},
			switchChange (val) {
				this.saveParams.isDefault = val.detail.value ? 1 : 0
			},
			// updateAddress() {
			// 	let that = this;
			// 	interfaceurl.checkAuth(interfaceurl.addressUpdate, that.saveParams, false).then((res) => {
			// 		//保存成功后关闭本页面跳到上一页
			// 		that.$turnPage('1', 'navigateBack')
			// 	});
			// },
			saveAddress() {
				if(!this.saveParams.contact_name){
				  uni.showToast({
					 title: '请填写收货人',
					 icon: 'none',
					 duration: 2000
				  });
				  return
				}
				if(!this.saveParams.contact_mobile){
				  uni.showToast({
					 title: '请填写收货人手机号码',
					 icon: 'none',
					 duration: 2000
				  });
				  return
				}
				if(!this.saveParams.address){
				  uni.showToast({
					 title: '请选择地址',
					 icon: 'none',
					 duration: 2000
				  });
				  return
				}
				if(!this.saveParams.detail){
				  uni.showToast({
					 title: '请填写详细地址',
					 icon: 'none',
					 duration: 2000
				  });
				  return
				}
				let params = {
					address: this.saveParams.address + this.saveParams.detail,
					contact_name: this.saveParams.contact_name,
					contact_mobile: this.saveParams.contact_mobile
				}
				// if(this.saveParams.addressId){
				//   this.updateAddress()
				//   return;
				// }
				let that = this;
				interfaceurl.checkAuth(interfaceurl.addressCreate, params).then((res) => {
					//下单
					let orderParams = {
						cart_id: that.cart_id,
						address_id: res.data,
						remark: ''
					}
					interfaceurl.checkAuth(interfaceurl.goodsPayment, orderParams).then((res) => {
						//保存成功后跳转到我的页面
						uni.switchTab({
						    url: '/pages/my/my'
						});
					});
				});
			}
		}
	}
</script>

<style>
	page {
		background: #F6F6F6;
	}
	/*正中*/
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.container {
		padding-top: 20rpx;
	}
.form-item{
	height: 100upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #ffffff;
	padding: 0upx 30upx;
	border-bottom: 1px solid #E0E0E0;
}
.form-input{
	text-align: right;
	height: 100%;
	flex: 1;
	padding-left: 20upx;
}
.form-label{
	text-align: right;
	height: 100%;
	display: inline-block;
	line-height: 100upx;
	flex: 1;
	padding-left: 20upx;
}
.arrow-icon{
	width: 16upx;
	height: 30upx;
	margin-left: 10upx;
}
.form-textarea{
  display: flex;
  padding: 30upx;
  background-color: #ffffff;
}
.textarea{
	min-height: 200upx;
	padding-top: 6upx;
	padding-left: 10upx;
  flex: 1;
  transform: translateY(-20upx);
}
.default-address{
	margin-top: 20upx;
	background-color: #ffffff;
	height: 100upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding:0upx 30upx;
}
.common-btn{
	background: #0070D1;
	color: #ffffff;
	font-size: 34upx;
	height: 90upx;
	line-height: 90upx;
	text-align: center;
	border-radius: 10upx;
	border: none;
	margin: 0px auto;
}
.btn-container{
	margin-top: 60upx;
	padding: 0upx 30upx;
}
</style>
