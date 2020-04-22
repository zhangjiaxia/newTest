import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    //modules,
    //严格模式启用后，数据状态的修改就必须通过mutations的方式提交，这样也便于查看状态变更
    strict: process.env.NODE_ENV !== 'production',
    state: {
        //用户登录后记录
		token: '', //用户登录后接口传回的token
		userInfos: {}, //拉取的用户信息
		chooseCourse: {}, //用户选择的课程
		chooseGoods: {}, //用户选择的商品
		coachBook: [], //教练预约信息
		dynamicDesc: {} //动态富文本
    },
	//数据修改，非异步
    mutations: {
		updateToken(state, newValue) {
			state.token = newValue
		},
		setUserInfos(state, newValue) {
			state.userInfos = newValue
		},
		setChooseCourse(state, newValue) {
			state.chooseCourse = newValue
		},
		setChooseGoods(state, newValue) {
			state.chooseGoods = newValue
		},
		setCoachBook(state, newValue) {
			state.coachBook = newValue
		},
		setDynamicDesc(state, newValue) {
			state.dynamicDesc = newValue
		}
    },
	//异步方法，如果需要修改state中的数据，必须调用mutations里的方法
	actions: {
		// updateTokens(state, newValue) {
		// 	console.log('actions')
		// 	console.log(state, newValue)
		// 	//state.state.token = 'zjxs:' + newValue
		// 	state.commit('updateToken', 'zjxs:' + newValue)
		// }
	}
})