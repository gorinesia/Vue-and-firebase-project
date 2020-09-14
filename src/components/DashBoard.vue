<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="4">
          <h2> {{ name }} さんようこそ！！</h2>
        </v-col>
        <v-col cols="2">
          <v-btn class="teal" @click="updateWalletAmount">更新</v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn class="cyan" @click="catchChangingWalletAmount">取得</v-btn>
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

      <h3 style="margin-left: 20px;">ユーザー名</h3>
      <ul>
        <li v-for="getUser in getUsers" :key="getUser.id">
          <v-row>
            <v-col cols="1">
              <div></div>
            </v-col>
            <v-col cols="6">
              <p>{{ getUser.displayName }}</p>
            </v-col>
            <v-col cols="5">
              <v-btn class="primary mr-2" @click="openModal(getUser.displayName, getUser.newBarance)" >walletを見る</v-btn>
                <div id="overlay" v-show="showContent" @click="closeModal">
                  <div id="content">
                    <v-form>
                      <div>{{ postUser }}の残高: {{ postBarance }}</div>
                      <v-btn small class="primary" >close</v-btn>
                    </v-form>
                  </div>
              </div>
              <v-btn class="accent" @click="openModal2">送る</v-btn>
              <div id="overlay" v-show="showContent2" @click="closeModal2">
                <div id="content">
                  <v-form>
                    <p>あなたの残高: {{ barance }}</p>
                    <v-text-field type="number" label="送る金額" />
                    <v-btn small class="primary" >送信</v-btn>
                  </v-form>
                </div>
              </div>
            </v-col>
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
      showContent2: false,
      postUser: '',
      postBarance: '',
      getUsers: []
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
        snapshot.forEach((doc)  => {
          otherUsers.push(doc.data().displayName);
          this.loginUsers = otherUsers;
          this.barance = doc.data().wallet;
        });
      });
      
  },
  methods: {
    signOut() {
      this.$store.dispatch("signOutAction");
    },
    openModal(id, barance) {
      console.log(barance)
      this.showContent = true;
      this.postUser = id
      this.postBarance = barance
    },
    closeModal() {
      this.showContent = false;
    },
    openModal2() {
      this.showContent2 = true;
    },
    closeModal2() {
      this.showContent2 = false;
    },
    updateWalletAmount() {
      const db = firebase.firestore();
      db.collection('users').doc("1FVhYRGLfiKD1MTbhAmm").update({
        wallet: 500 + 3000
      })
    },
    catchChangingWalletAmount() {
    const db = firebase.firestore();
    db.collection('users')
      .where("displayName", "!=", this.currentUser.displayName)
      .onSnapshot((querySnapshot) => {
        console.log('検知!!!!');
        this.getUsers = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.data().wallet);
          this.getUsers.push({
            id: doc.id,
            displayName: doc.data().displayName,
            newBarance: doc.data().wallet
          })
        })
      })
    }
  }
}
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