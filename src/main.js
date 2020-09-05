import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyCX5vQTv8XQq3_ZK9qMY1pcjF5onxXWLJc",
  authDomain: "fir-project-d5115.firebaseapp.com",
  databaseURL: "https://fir-project-d5115.firebaseio.com",
  projectId: "fir-project-d5115",
  storageBucket: "fir-project-d5115.appspot.com",
  messagingSenderId: "787846741356",
  appId: "1:787846741356:web:d78f2afd2c15f24d4c4749",
  measurementId: "G-918204N0C1"
};
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
