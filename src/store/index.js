import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    signUpAction({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((result) => {
          console.log(result.user.uid)
          result.user.updateProfile({
            displayName: payload.displayName
          })
          commit('setUser', result.user.uid)
          router.push('/signin')
        })
        .catch((error) => {
          console.log(error.message)
        })
    },
    signInAction({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((result) => {
          commit('setUser', result.user.uid)
          router.push('/dashBoard')
        })
        .catch((error) => {
          console.log(error.message)
        })
    },
    signOutAction() {
      firebase.auth().signOut()
        .then(() => {
          router.push('signin')
        })
    },
  }
})