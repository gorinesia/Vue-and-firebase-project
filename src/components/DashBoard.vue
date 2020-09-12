<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="8">
          <h2> {{ name }} さんようこそ！！</h2>
        </v-col>
        <v-col cols="2">
          <p>残高: {{ barance }} 円</p>
        </v-col>
        <v-col cols="2">
          <v-card-actions>
            <v-btn class="info" @click="signOut">サインアウト</v-btn>
        </v-card-actions>
        </v-col>
      </v-row>

      <h2 style="text-align: center">ユーザー一覧</h2>

      <h3>ユーザー名</h3>
      <ul>
        <li v-for="user in loginUsers" :key="user">
          <v-row>
            <v-col cols="7">
              {{ user }}
            </v-col>
            <v-cols cols="5">
                <v-btn @click="openModal">walletを見る</v-btn>
              <div id="overlay" v-show="showContent" @click="closeModal">
                <div id="content">
                  <p>あなたの残高: {{ barance }}</p>
                  <p>送る金額</p>
                  <input type="text" />
                  <button @click="closeModal">送信</button>
                </div>
              </div>
              <v-btn>送る</v-btn>
            </v-cols>
          </v-row>
        </li>
      </ul>

      <br>
      <div>
        <footer>
          <p style="text-align: center;">Copyright &copy;2019 Inc. All rights reserved</p>
        </footer>
      </div>
    </v-container>
  </v-app>
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
v-btn {
  margin: 1px;
}

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