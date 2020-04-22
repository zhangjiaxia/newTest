<template>
	<view v-if="dynamicDesc">
		<!-- <rich-text :nodes="dynamicDesc.banner_detail"></rich-text> -->
		<view v-html="dynamicDesc.banner_detail"></view>
	</view>
</template>

<script>
	//引入store的内容
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	export default {
		computed: mapState(['dynamicDesc']),
		data() {
			return {
				
			}
		},
		onLoad(options) {
			let item = this.deepCopy(this.dynamicDesc)
			//处理富文本图片自适应
			item.banner_detail = item.banner_detail.replace(/<img/gi, '<img width="100%!important" ')
			this.$store.commit('setDynamicDesc', item)
		},
		onShow() {
			
		},
		methods: {
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

<style>
</style>
