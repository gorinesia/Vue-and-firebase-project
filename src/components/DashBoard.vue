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
// import firebase from 'firebase'

export default {
  data() {
    return {
      name: this.$store.state.name,
      barance: this.$store.state.barance,
      // currentUser: {},
      currentUser: this.$store.state.currentUser,
      loginUsers: this.$store.state.loginUsers,
    };
  },
  async mounted() {
    await this.$store.dispatch('createdUser', {
      displayName: this.$store.state.currentUser.displayName,
      // barance: this.barance
    })
    // this.currentUser = firebase.auth().currentUser;
    // this.name = this.currentUser.displayName;
    // const db = firebase.firestore();
    // db.collection('users')
    //   .where('displayName', '!=', this.currentUser.displayName)
    //   .get()
    //   .then((snapshot) => {
    //     const otherUsers = [];
    //     snapshot.forEach(doc => {
    //       otherUsers.push(doc.data())
    //       this.loginUsers = otherUsers
    //       this.barance = doc.data().wallet;
    //   })
    // })
  },
  methods: {
    signOut() {
      this.$store.dispatch("signOutAction");
    }
  }
};
</script>

<style>
li {
  list-style: none;
}
</style>