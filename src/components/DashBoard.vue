<template>
  <div>
    <div>
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
    <div>
      <h2>こんにちは {{ name }} さん</h2>
      <p>残高: {{ barance }} 円</p>
    </div>
    <div>
      <button @click="signOut">サインアウト</button>
    </div>
    <div>
      <button @click="updateButton">更新</button>
      <button @click="confirmButton">確認</button>
    </div>
    <div>
      <hr>
      <ul>ユーザー名
        <li v-for="(user, index) in loginUsers" :key="index">
          {{ user }} <button>walletを見る</button><button>送る</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      name: '',
      barance: '',
      currentUser: {},
      loginUsers: [],
    };
  },
  created() {
    this.currentUser = firebase.auth().currentUser;
    this.name = this.currentUser.displayName;
    const db = firebase.firestore();
    db.collection('users')
      .where('displayName', '!=', this.currentUser.displayName)
      .get()
      .then((snapshot) => {
        const otherUsers = [];
        snapshot.forEach(doc => {
          // otherUsers.push(doc.data().displayName)
          otherUsers.push(doc.data())
          // console.log(doc.id, '=>', doc.data());
          this.loginUsers = otherUsers
          this.barance = doc.data().wallet;
      })
    })
  },
  methods: {
    signOut() {
      this.$store.dispatch("signOutAction");
    },
    async updateButton() {
      const db = firebase.firestore();
      // await db.collection('users').add({
      //   wallet: null
      // })
      // .then(doc => {
      //   console.log(doc)
      //   db.collection('users').doc(doc.id).update({
      //     wallet: doc.id
      //   })
      // })

      await db.collection('users').doc('vs2GqF2uG9CkAKZq6ECq').update({
        wallet: 7770
      })
      // .then
      // await db.collection('users').doc('vs2GqF2uG9CkAKZq6ECq')
      // .onSnapshot((doc) => {
      //   console.log('Current data: ', doc.data());
      // })
    },
    async confirmButton() {
      const db = firebase.firestore();
      await db.collection('users').onSnapshot((querySnapshot) => {
        console.log('追加！！！！');
        console.log(querySnapshot)
        querySnapshot.forEach(doc => {
          console.log(doc.id, doc.data());
          console.log('--------------');
        })
      })
    }
  },
};
</script>

<style>
li {
  list-style: none;
}
</style>