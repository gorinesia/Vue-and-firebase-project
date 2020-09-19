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
    sendMoneyAmount: 0
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
      state.modalForCheckWallets = true;
    },
    closeModalForCheckEachUsersWallets(state) {
      state.modalForCheckWallets = false;
    },
    openModalForSendMoney(state) {
      state.modalForSendMoney = true;
    },
    closeModalForSendMoney(state) {
      state.modalForSendMoney = false;
    },
    setLoginUser(state, loginUser) {
      state.loginUser = loginUser;
    },
    setSendMoneyAmount(state, sendMoneyAmount) {
      state.sendMoneyAmount = sendMoneyAmount;
    }
  },
  actions: {
    signUpAction({ commit }, payload) {
      const db = firebase.firestore().collection('users');
      db.add(payload)
        .then((docRef) => {
          console.log(docRef.id);
        })
        .catch((error) => {
          console.log(error);
        })
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((result) => {
          result.user.updateProfile({
            displayName: payload.displayName
          })
          commit('setUser', result.user.uid);
          router.push('/signin');
        })
        .catch((error) => {
          console.log(error.message);
        })
    },
    signInAction({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((result) => {
          commit('setUser', result.user.uid);
          commit('setIsAuthenticated', true);
          console.log('signin!!');
          router.push('/dashBoard');
        })
        .catch((error) => {
          console.log(error.message);
          commit('setIsAuthenticated', false);
        })
    },
    loginUserDisplay({ commit }) {
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
              return otherUsers.displayName != getUser.displayName;
            })
            const currentLoginUser = allUsers.filter((currentUser) => {
              return currentUser.displayName === getUser.displayName;
            })
            commit('setCurrentUser', currentLoginUser);
            commit('setLoginUsers', otherLoginUsers);
          })
        })
    },
    setLoginUser({ commit }, payload) {
      commit('setLoginUser', payload);
      commit('openModalForCheckEachUsersWallets');
    },
    closeModalForCheckEachUsersWallets({ commit }) {
      commit('closeModalForCheckEachUsersWallets');
    },
    openModalForSendMoney({ commit }) {
      commit('openModalForSendMoney');
    },
    closeModalForSendMoney({ commit }) {
      commit('closeModalForSendMoney');
    },
    sendMoneyForOtherUsers({ commit }, payload) {
      commit('setSendMoneyAmount', payload.sendMoneyAmount);
      const db = firebase.firestore();
      db.collection("users")
        .doc(payload.id)
        .update({
          wallet: payload.barance - payload.sendMoneyAmount,
        });
      commit('closeModalForSendMoney');
    },
    getLoginUserWalletAmount({ commit }, payload) {
      const currentWalletAmount = parseInt(payload.barance, 10);
      const newWalletAmount = {};
      newWalletAmount['wallet'] = (currentWalletAmount + payload.receivedMoneyAmount);
      const db = firebase.firestore();
      db.collection('users')
        .doc(payload.id)
        .update(newWalletAmount)
      const snapShot = newWalletAmount;
      const updateWalletBarance = snapShot.wallet;
      commit('setLoginUser', {
        name: payload.name,
        wallet: updateWalletBarance,
        id: payload.id,
        sendMoneyAmount: payload.sendMoneyAmount
      })
      commit('openModalForCheckEachUsersWallets');
    },
    signOutAction({ commit }) {
      firebase.auth().signOut()
        .then(() => {
          commit('setUser', null);
          commit('setLoginUsers', null);
          commit('setIsAuthenticated', false);
          console.log('signout!!');
          router.push('/signin');
        })
    },
  }
})