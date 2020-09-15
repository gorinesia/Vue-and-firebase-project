<template>
  <v-app>
    <v-container>
      <v-row v-for="item in getUsers3" :key="item.id">
        <v-col cols="4">
          <h2>{{ item.displayName }} さんようこそ！！</h2>
        </v-col>
        <v-col cols="2">
        </v-col>
        <v-col cols="2">
        </v-col>
        <v-col cols="2">
          <p>残高: {{ item.newBarance }} 円</p>
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
        <li v-for="getUser in getUsers2" :key="getUser.id">
          <v-row>
            <v-col cols="1">
              <div></div>
            </v-col>
            <v-col cols="6">
              <p>{{ getUser.displayName }}</p>
            </v-col>
            <v-col cols="5">
              <v-btn
                class="primary mr-2"
                @click="getWalletAmount(getUser.displayName, getUser.newBarance, getUser.id)"
              >walletを見る</v-btn>
              <div id="overlay" v-show="showContent" >
                <div id="content">
                  <v-form>
                    <div>{{ postUser }}の残高: {{ postBarance }}</div>
                    <v-btn small class="red mr-2" @click="closeModal">close</v-btn>
                  </v-form>
                </div>
              </div>
              <v-btn class="accent" @click="openModal2">送る</v-btn>
              <div id="overlay" v-show="showContent2" v-for="item in getUsers3" :key="item.id">
                <div id="content">
                  <v-form>
                    <p>あなたの残高: {{ item.newBarance }}</p>
                    <v-text-field type="number" label="送る金額" v-model.number="inputAmount" />
                    <v-btn small class="primary mr-2" @click="updateWalletAmount(item.id, item.newBarance)">送信</v-btn>
                  </v-form>
                </div>
              </div>
            </v-col>
          </v-row>
        </li>
      </ul>

      <br />
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
      currentUser: {},
      showContent: false,
      showContent2: false,
      postUser: "",
      postBarance: "",
      postId: '',
      getUsers: [],
      getUsers2: [],
      getUsers3: [],
      inputAmount: 0,
    };
  },
  mounted() {
    this.currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection("users").onSnapshot((querySnapshot) => {
      this.getUsers = [];
      querySnapshot.forEach((doc) => {
        this.getUsers.push({
          id: doc.id,
          displayName: doc.data().displayName,
          newBarance: doc.data().wallet,
        });
        this.getUsers2 = this.getUsers.filter((getUser) => {
          return getUser.displayName != this.currentUser.displayName;
        });
        this.getUsers3 = this.getUsers.filter((item) => {
          return item.displayName === this.currentUser.displayName;
        });
      });
    });
  },
  methods: {
    signOut() {
      this.$store.dispatch("signOutAction");
    },
    showOwnPrice(name, barance, id) {
      this.openModal()
      this.postUser = name;
      this.postBarance = barance;
      this.postId= id;
    },
    openModal() {
      this.showContent = true;
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
    updateWalletAmount(id,number) {
      console.log(id, number);
      const db = firebase.firestore();
      db.collection("users")
        .doc(id)
        .update({
          wallet: number - this.inputAmount,
        });
      this.closeModal2();
    },
    getWalletAmount(name, barance, id) {
      console.log(name, barance, id)
      const str = parseInt(barance, 10)
      console.log(str)
      const newData = {};
      newData['wallet'] = (str + this.inputAmount)
      const db = firebase.firestore();
      db.collection('users')
        .doc(id)
        .update(newData)
        const snapShot = newData
        const updateBarance = snapShot.wallet;
      this.showOwnPrice(name, updateBarance, id)
      this.inputAmount = ''
    }
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
  height: 30%;
  padding: 1em;
  background: #fff;
}
</style>