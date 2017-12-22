import AsyncComputed from 'vue-async-computed'
import Vue from "vue";
import Vuex from "vuex";
import "babel-polyfill";
import "whatwg-fetch";

import App from "./App.vue";

import WebEnvironment from "./js/environment.web.js";

Vue.use(AsyncComputed)
Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		loggedIn: false,
		username: '',
		credit: 0,
		eventCredit: 0
	},

	mutations: {
		login(state, userData) {
			state.loggedIn = true;
			state.username = userData.username;
			state.credit = userData.credit;
			state.eventCredit = userData.eventCredit;
			state.emailHash = userData.emailHash;
		}
	}
});

new Vue({
	el: '#app',
	store,
	render(h){
		return h(App);
	}
});

if(!window.environment) window.environment = WebEnvironment;
