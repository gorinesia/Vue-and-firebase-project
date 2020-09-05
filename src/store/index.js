import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    displayName: '',
    user: null,
  },
  mutations: {
  setName(state, payload) {
    state.displayName = payload.displayName
  },
  setUser(state, user) {
    state.user = user
  }
  },
  actions: {
    signUpAction({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((result) => {
          result.user.updateProfile({
            displayName: payload.displayName
          })
          commit('setName', payload)
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
          router.push('/home')
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