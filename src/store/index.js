import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    currentUser: [],
    loginUsers: [],
    isAuthenticated: false,
    modalForCheckWallets: false,
    modalForSendMoney: false,
    loginUser: {
      name: '',
      wallet: '',
      id: ''
    },
    inputAmount: 0
  },
  getters: {
    currentUser: state => state.currentUser,
    loginUsers: state => state.loginUsers,
    modalForCheckWallets: state => state.modalForCheckWallets,
    modalForSendMoney: state => state.modalForSendMoney,
    loginUser: state => state.loginUser,
  },
  mutations: {
    setUser(state, currentUser) {
      state.user = currentUser;
    },
    setCurrentUser(state, currentUser) {
      state.currentUser = currentUser;
    },
    setCurrentLoginUser(state, currentLoginUser) {
      state.currentLoginUser = currentLoginUser;
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
    setLoginUser(state, loginUser) {
      state.loginUser = loginUser
    },
    setInputAmount(state, inputAmount) {
      state.inputAmount = inputAmount
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
          commit('setIsAuthenticated', true)
          console.log('signin!!')
          router.push('/dashBoard')
        })
        .catch((error) => {
          console.log(error.message)
          commit('setIsAuthenticated', false)
        })
    },
    loginUserDisplay({commit}) {
      const getUser = firebase.auth().currentUser;
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
              return otherUsers.displayName != getUser.displayName
            })
            const currentLoginUser = allUsers.filter((currentUser) => {
              return currentUser.displayName === getUser.displayName
            })
            commit('setCurrentUser', currentLoginUser)
            commit('setLoginUsers', otherLoginUsers)
          })
        })
    },
    setLoginUser({commit}, payload) {
      commit('setLoginUser', payload)
      commit('openModalForCheckEachUsersWallets')
    },
    closeModalForCheckEachUsersWallets({commit}) {
      commit('closeModalForCheckEachUsersWallets')
      commit('setInputAmount', null)
    },
    openModalForSendMoney({commit}) {
      commit('openModalForSendMoney')
    },
    closeModalForSendMoney({commit}) {
      commit('closeModalForSendMoney')
    },
    updateWalletAmount({commit}, payload) {
      console.log(payload);
      commit('setInputAmount', payload.inputAmount)
      const db = firebase.firestore();
      db.collection("users")
        .doc(payload.id)
        .update({
          wallet: payload.number - payload.inputAmount,
        });
      commit('closeModalForSendMoney')
    },
    getWalletAmount({commit}, payload) {
      console.log(payload)
      const str = parseInt(payload.barance, 10)
      console.log(str)
      const newData = {};
      newData['wallet'] = (str + payload.inputAmount)
      const db = firebase.firestore();
      db.collection('users')
        .doc(payload.id)
        .update(newData)
        const snapShot = newData
        console.log(snapShot)
        const updateBarance = snapShot.wallet;
        console.log(updateBarance)
      commit('setLoginUser', {
        name: payload.name,
        wallet: updateBarance,
        id: payload.id,
        inputAmount: payload.inputAmount
      })
      commit('openModalForCheckEachUsersWallets')
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