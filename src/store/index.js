import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    barance: '',
    currentUser: {},
    displayName: '',
    loginUsers: [],
    isAuthenticated: false
  },
  mutations: {
    setUser(state, currentUser) {
      state.user = currentUser;
    },
    setCurrentUserName(state) {
      state.displayName = firebase.auth().currentUser.displayName;
    },
    setLoginUsers(state, otherUsers) {
      state.loginUsers = otherUsers;
    },
    setBarance(state, doc) {
      state.barance = doc;
    },
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    }
  },
  actions: {
    signUpAction({commit}, payload) {
      const db = firebase.firestore().collection('users');
      db.add(payload)
      .then((docRef) => {
        console.log(docRef.id)
      })
      .catch((error) => {
        console.log(error)
      })
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((result) => {
          result.user.updateProfile({
            displayName: payload.displayName
          })
          commit('setCurrentUserName', payload.displayName)
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
          commit('setCurrentUserName', result.user.displayName)
          commit('setUser', result.user.uid)
          commit('setIsAuthenticated', true)
          console.log('signin!!')
          router.push('/dashBoard')
        })
        .catch((error) => {
          console.log(error.message)
          commit('setIsAuthenticated', false)
        })
    },
    createdUser({commit}, payload) {
      commit('setCurrentUserName', payload)
      const db = firebase.firestore();
      db.collection('users')
        .where('displayName', '!=', payload.displayName)
        .get()
        .then((snapshot) => {
          console.log(snapshot)
          const otherUsers = [];
          snapshot.forEach(doc => {
            otherUsers.push(doc.data().displayName)
            console.log(doc.data().displayName)
            this.commit('setLoginUsers', otherUsers)
            this.commit('setBarance', doc.data().wallet);
        })
      })
    },
    signOutAction({commit}) {
      firebase.auth().signOut()
        .then(() => {
          commit('setUser', null)
          commit('setIsAuthenticated', false)
          console.log('signout!!')
          router.push('/signin')
        })
    },
  }
})