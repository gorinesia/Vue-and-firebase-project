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
      <p>{{ email }}</p>
      <p>{{ userId }}</p>
      <hr>
      <ul>
        <li v-for="user in users" :key=user>
          {{ user }} <button>walletを見る</button><button>送る</button>
        </li>
      </ul>
      <!-- <ul v-for="firstname in users" :key="firstname">
        <li>{{ firstname }}</li>
      </ul> -->
      <p>{{ firstname }}</p>
      <p>{{ age }}</p>
      <!-- <pre>{{ user }}</pre> -->
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      // displayName: this.$store.state.displayName,
      userId: '',
      name: '',
      email: '',
      user: {},
      users: [],
      firstname: '',
      age: ''
    };
  },
  created() {
    this.user = firebase.auth().currentUser;
    if (this.user) {
      this.name = this.user.displayName;
      this.email = this.user.email;
      this.userId = this.user.uid;
    }
    const db = firebase.firestore();
    // db.collection('users').doc('6ST2JlzluleQGQ7VycM4').get().then((doc) => {
    //   console.log(doc.data());
    // })
    db.collection('users').get().then((snapshot) => {
      const array = [];
      snapshot.forEach(doc => {
        array.push(doc.data())
        console.log(doc.id, '=>', doc.data());
        this.users = array
        // this.firstname = doc.data().name
        // this.age = doc.data().age
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
</style>