import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    displayName: '',
    user: null,
    error: null
  },
  mutations: {
    setName(state, payload) {
      state.displayName = payload.displayName
    },
    setUser(state, user) {
      state.user = user
    },
    setError(state, payload) {
      state.error = payload;
    }
  },
  actions: {
    signUpAction({commit}, payload) {
      console.log(payload)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((result) => {
          result.user.updateProfile({
            displayName: payload.displayName
          })
          commit('setName', payload)
          commit('setUser', result.user.uid)
          commit('setError', null)
          router.push('/signin')
        })
        .catch((error) => {
          commit('setError', error.message)
        })
    },
    signInAction({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          commit('setUser', response.user.uid)
          commit('setError', null)
          router.push('/home')
        })
        .catch((error) => {
          commit('setError', error.message)
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