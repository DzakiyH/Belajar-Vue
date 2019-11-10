import Vue from 'vue'
import Firebase from 'firebase'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ToggleButton from 'vue-js-toggle-button'

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(ToggleButton);
let app = '';

const firebaseConfig = {
  apiKey: "AIzaSyDy1GHVd2FV1hUxa1Tc1GJdf4TSlH7z8XM",
  authDomain: "belajarlagi-3bc1c.firebaseapp.com",
  databaseURL: "https://belajarlagi-3bc1c.firebaseio.com",
  projectId: "belajarlagi-3bc1c",
  storageBucket: "belajarlagi-3bc1c.appspot.com",
  messagingSenderId: "615489663766",
  appId: "1:615489663766:web:f534c84f2295171c465637"
};
// const firestoreConfig = {timestampsInSnapshots: true};

Firebase.initializeApp(firebaseConfig);
// Firebase.firestore().settings(firestoreConfig);

Firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});
