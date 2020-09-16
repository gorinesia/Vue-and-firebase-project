import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    displayName: '',
    currentUser: [],
    loginUsers: [],
    isAuthenticated: false,
    modalForCheckWallets: false,
    modalForSendMoney: false,
    loginUserName: '',
    loginUserBarance: '',
    loginUserId: ''
  },
  getters: {
    currentUser: state => state.currentUser,
    loginUsers: state => state.loginUsers,
    modalForCheckWallets: state => state.modalForCheckWallets,
    modalForSendMoney: state => state.modalForSendMoney,
    loginUserName: state => state.loginUserName,
    loginUserBarance: state => state.loginUserBarance,
    loginUserId: state => state.loginUserId,
  },
  mutations: {
    setUser(state, currentUser) {
      state.user = currentUser;
    },
    setCurrentUserName(state) {
      state.displayName = firebase.auth().currentUser.displayName;
    },
    setCurrentUser(state, currentUser) {
      state.currentUser = currentUser;
    },
    setLoginUsers(state, otherLoginUsers) {
      state.loginUsers = otherLoginUsers;
    },
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    },
    openModalForCheckEachUsersWallets(state) {
      state.modalForCheckWallets = true
    },
    closeModalForCheckEachUsersWallets(state) {
      state.modalForCheckWallets = false
    },
    openModalForSendMoney(state) {
      state.modalForSendMoney = true
    },
    closeModalForSendMoney(state) {
      state.modalForSendMoney = false
    },
    setLoginUserName(state, loginUserName) {
      state.loginUserName = loginUserName
    },
    setLoginUserBarance(state, loginUserBarance) {
      state.loginUserBarance = loginUserBarance
    },
    setLoginUserId(state, loginUserId) {
      state.loginUserId = loginUserId
    },
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
    loginUserDisplay({commit}, payload) {
      commit('setCurrentUserName', payload)
      const db = firebase.firestore();
      db.collection('users')
        .onSnapshot((querySnapshot) => {
          const allUsers = [];
          querySnapshot.forEach((doc) => {
            allUsers.push({
              displayName: doc.data().displayName,
              barance: doc.data().wallet,
              id: doc.id
            })
            const otherLoginUsers = allUsers.filter((otherUsers) => {
              return otherUsers.displayName != payload.displayName
            })
            const currentLoginUser = allUsers.filter((currentUser) => {
              return currentUser.displayName === payload.displayName
            })
            commit('setCurrentUser', currentLoginUser)
            commit('setLoginUsers', otherLoginUsers)
          })
        })
    },
    updateEachUsersWalletsBarance({commit}, payload) {
      commit('setLoginUserName', payload.loginUserName)
      commit('setLoginUserBarance', payload.loginUserBarance)
      commit('setLoginUserId', payload.loginUserId)
      commit('openModalForCheckEachUsersWallets')
    },
    closeModalForCheckEachUsersWallets({commit}) {
      commit('closeModalForCheckEachUsersWallets')
    },
    openModalForSendMoney({commit}) {
      commit('openModalForSendMoney')
    },
    closeModalForSendMoney({commit}) {
      commit('closeModalForSendMoney')
    },
    signOutAction({commit}) {
      firebase.auth().signOut()
        .then(() => {
          commit('setUser', null)
          commit('setLoginUsers', null)
          commit('setIsAuthenticated', false)
          console.log('signout!!')
          router.push('/signin')
        })
    },
  }
})