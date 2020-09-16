<template>
  <div>
    <div>
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
    <div v-for="currentUser in currentUser" :key="currentUser.id">
      <h2>こんにちは {{ currentUser.displayName }} さん</h2>
      <p>残高: {{ currentUser.barance }} 円</p>
    </div>
    <div>
      <button @click="signOut">ログアウト</button>
    </div>
    <div>
      <hr />
      <h2>ユーザー一覧</h2>
      <h3>ユーザー名</h3>
      <ul>
        <li v-for="loginUser in loginUsers" :key="loginUser.id">
          {{ loginUser.displayName }}
          <button
            @click="updateEachUsersWalletsBarance(loginUser.displayName, loginUser.barance, loginUser.id)"
          >walletを見る</button>
          <div
            id="overlay"
            v-show="modalForCheckWallets"
            @click="closeModalForCheckEachUsersWallets"
          >
            <div id="content">
              <form>
                <p>{{ loginUserName }}さんの残高</p>
                <p>{{ loginUserBarance }}円</p>
              </form>
              <button @click="closeModalForCheckEachUsersWallets">close</button>
            </div>
          </div>
          <button @click="openModalForSendMoney">送る</button>
          <div
            id="overlay"
            v-show="modalForSendMoney"
            v-for="currentUser in currentUser"
            :key="currentUser.id"
            @click="closeModalForSendMoney"
          >
            <div id="content" @click.stop>
              <form>
                <p>あなたの残高: {{ currentUser.barance }}</p>
                <p>送る金額</p>
                <input type="number" label="金額" />
                <button>送信</button>
              </form>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      displayName: this.$store.state.displayName,
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    loginUsers() {
      return this.$store.getters.loginUsers;
    },
    modalForCheckWallets() {
      return this.$store.getters.modalForCheckWallets;
    },
    modalForSendMoney() {
      return this.$store.getters.modalForSendMoney;
    },
    loginUserName() {
      return this.$store.getters.loginUserName;
    },
    loginUserBarance() {
      return this.$store.getters.loginUserBarance;
    },
    loginUserId() {
      return this.$store.getters.loginUserId;
    },
  },
  created() {
    this.$store.dispatch("loginUserDisplay", {
      displayName: this.displayName,
    });
  },
  methods: {
    signOut() {
      this.$store.dispatch("signOutAction");
    },
    updateEachUsersWalletsBarance(name, barance, id) {
      this.$store.dispatch("updateEachUsersWalletsBarance", {
        loginUserName: name,
        loginUserBarance: barance,
        loginUserId: id,
      });
    },
    closeModalForCheckEachUsersWallets() {
      this.$store.dispatch("closeModalForCheckEachUsersWallets");
    },
    openModalForSendMoney() {
      this.$store.dispatch("openModalForSendMoney");
    },
    closeModalForSendMoney() {
      this.$store.dispatch("closeModalForSendMoney");
    },
  },
};
</script>

<style>
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
  position: fixed;
  bottom: 5px;
  width: 25%;
  height: 30%;
  padding: 1em;
  background: #fff;
}
</style>