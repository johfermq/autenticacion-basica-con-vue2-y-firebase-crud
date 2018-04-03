// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import Vuikit from 'vuikit'
import VuikitIcons from '@vuikit/icons'
import '@vuikit/theme'

Vue.use(Vuikit)
Vue.use(VuikitIcons)

Vue.config.productionTip = false

// Initialize Firebase
let app;

let config = {
	apiKey: "YOUR_API_KEY",
	authDomain: "YOUR_AUTH_DOMAIN",
	databaseURL: "YOUR_DATABASE_URL",
	projectId: "YOUR_PROJECT_ID",
	storageBucket: "",
	messagingSenderId: "YOUR_MESSAGING_SENDER_ID"
};

firebase.initializeApp(config)

firebase.auth().onAuthStateChanged(function (user)
{
	if (!app)
	{
		/* eslint-disable no-new */
		app = new Vue({
		  el: '#app',
		  router,
		  components: { App },
		  template: '<App/>'
		})
  	}
})
