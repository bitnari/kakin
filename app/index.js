import AsyncComputed from 'vue-async-computed'
import Vue from "vue";
import Vuex from "vuex";
import "babel-polyfill";
import "whatwg-fetch";

import "typeface-nanum-square";

import App from "./App.vue";

import ElectronEnvironment from "./js/environment.electron.js";
import WebEnvironment from "./js/environment.web.js";

Vue.use(AsyncComputed)
Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		loggedIn: false,
		username: '',
		credit: 0,
		eventCredit: 0,
		environment: null
	},

	mutations: {
		login(state, userData) {
			state.loggedIn = true;
			state.username = userData.username;
			state.credit = userData.credit;
			state.eventCredit = userData.eventCredit;
			state.emailHash = userData.emailHash;
		},

		environment(state, env) {
			state.environment = env;
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

window.setEnvironment = (env)  => store.commit('environment', env);
window.ElectronEnvironment = ElectronEnvironment;
window.WebEnvironment = WebEnvironment;
