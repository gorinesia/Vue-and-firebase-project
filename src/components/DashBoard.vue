<template>
  <div>
    <div>
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
    <div>
      <h2>こんにちは {{ name }} さん</h2>
    </div>
    <div>
      <button @click="signOut">サインアウト</button>
    </div>
    <div>
      <hr>
      <ul>ユーザー名
        <li v-for="user in loginUsers" :key=user>
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
          otherUsers.push(doc.data().displayName)
          console.log(doc.id, '=>', doc.data().displayName);
          this.loginUsers = otherUsers
      })
    })
  },
  methods: {
    signOut() {
      this.$store.dispatch("signOutAction");
    },
  },
};
</script>

<style>
li {
  list-style: none;
}
</style>