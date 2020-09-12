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
      <div>
        <h2>ユーザー一覧</h2>
      </div>
      <div>
        <h3>ユーザー名</h3>
        <ul>
          <li v-for="user in loginUsers" :key="user">
            {{ user }}
            <button @click="openModal">walletを見る</button>
            <div id="overlay" v-show="showContent" @click="closeModal">
              <div id="content">
                <p>あなたの残高: {{ barance }}</p>
                <p>送る金額</p>
                <input type="text" />
                <button @click="closeModal">送信</button>
              </div>
            </div>
            <button>送る</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      name: "",
      barance: "",
      currentUser: {},
      loginUsers: [],
      showContent: false,
    };
  },
  created() {
    this.currentUser = firebase.auth().currentUser;
    this.name = this.currentUser.displayName;
    const db = firebase.firestore();
    db.collection("users")
      .where("displayName", "!=", this.currentUser.displayName)
      .get()
      .then((snapshot) => {
        const otherUsers = [];
        snapshot.forEach((doc) => {
          otherUsers.push(doc.data().displayName);
          console.log(doc.data());
          // console.log(doc.id, '=>', doc.data());
          this.loginUsers = otherUsers;
          this.barance = doc.data().wallet;
        });
      });
  },
  methods: {
    signOut() {
      this.$store.dispatch("signOutAction");
    },
    openModal() {
      this.showContent = true;
    },
    closeModal() {
      this.showContent = false;
    },
  },
};
</script>

<style scoped>
li {
  list-style: none;
}

#overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

#content {
  z-index: 2;
  width: 30%;
  padding: 1em;
  background: #fff;
}
</style>