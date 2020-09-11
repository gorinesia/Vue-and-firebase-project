import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    // displayName: '',
    name: '',
    barance: '',
    currentUser: {
      displayName: '',
      // wallet: '',
    },
    loginUsers: [],
  },
  mutations: {
    setUser(state, user) {
      console.log(state,user)
      state.user = user
    },
    setCurrentUser(state) {
      console.log(state)
      state.name = firebase.auth().currentUser.displayName;
      // state.barance = firebase.auth().currentUser.wallet
      console.log(state.name)
    },
    // setName(state, displayName) {
    //   console.log(state, displayName)
    //   state.name = displayName;
    //   console.log(state.name)
    // }
  },
  actions: {
    signUpAction({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((result) => {
          console.log(result)
          result.user.updateProfile({
            displayName: payload.displayName
          })
          // commit('setName', payload.displayName)
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
    createdUser(context, currentUser) {
      console.log(context, currentUser)
      // state.currentUser = firebase.auth().currentUser;
      // state.name = state.currentUser.displayName;
      context.commit('setCurrentUser', currentUser)
      console.log(currentUser)
      // commit('setName', payload.displayName)
      const db = firebase.firestore();
      db.collection('users')
        .where('displayName', '!=', currentUser.displayName)
        .get()
        .then((snapshot) => {
          console.log(snapshot)
          const otherUsers = [];
          snapshot.forEach(doc => {
            otherUsers.push(doc.data())
            console.log(doc.data())
            context.state.loginUsers = otherUsers
            context.state.barance = doc.data().wallet;
        })
      })
    },
    signOutAction({commit}) {
      firebase.auth().signOut()
        .then(() => {
          commit('setUser', null)
          router.push('signin')
        })
    },
  }
})