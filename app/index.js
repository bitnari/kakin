import AsyncComputed from 'vue-async-computed'
import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import "babel-polyfill";
import "whatwg-fetch";

import App from "./App.vue";

import routes from "./js/routes";
import WebEnvironment from "./js/environment.web.js";

Vue.use(AsyncComputed)
Vue.use(Vuex);
Vue.use(VueRouter);

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

const router = new VueRouter({routes, mode: 'history'});

new Vue({
	el: '#app',
	store,
	router,
	render(h){
		return h(App);
	}
});

if(!window.environment) window.environment = WebEnvironment;
