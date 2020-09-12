import Vue from 'vue'
import VueRouter from 'vue-router'
import DashBoard from '@/components/DashBoard.vue'
import Signup from '@/components/Signup.vue'
import Signin from '@/components/Signin.vue'
import Works from '@/components/Works.vue'
import Modal from '@/components/Modal.vue'
import ModalModel from '@/components/ModalModel.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

  const routes = [
    // {
    //   path: '*',
    //   redirect: 'signin',
    // },
    {
      path: '/dashBoard',
      name: 'DashBoard',
      component: DashBoard,
      meta: { requiresAuth: true }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/works',
      name: 'Works',
      component: Works
    },
    {
      path: '/modal',
      name: 'Modal',
      component: Modal
    },
    {
      path: '/modalModel',
      name: 'ModalModel',
      component: ModalModel
    }
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        next()
      } else {
        next({ name: 'Signin' })
      }
    })
  } else {
    next();
  }
})

export default router
