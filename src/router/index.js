import Vue from 'vue'
import firebase from 'firebase'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import MerchantList from '../views/MerchantList.vue'
import OrderForm from '../views/OrderForm.vue'
import OrderList from '../views/OrderList.vue'
import OrderDetailed from '../views/OrderDetailed.vue'
import Card from '../views/Card.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/index',
    name: 'Merchant List',
    component: MerchantList,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/order/:id',
    name: 'order',
    component: OrderForm,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/transactions',
    name: 'Order List',
    component: OrderList,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/transaction/:id',
    name: 'OrderDetail',
    component: OrderDetailed,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/card',
    name: 'card',
    component: Card
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) =>{
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('home');
  else next();
});

export default router
