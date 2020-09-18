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
        <li v-for="user in loginUsers" :key="user.id">
          {{ user.displayName }}
          <button
            id="btn"
            @click="getLoginUserWalletAmount(user.displayName, user.barance, user.id)"
          >walletを見る</button>
          <div
            id="overlay"
            v-show="modalForCheckWallets"
            @click="closeModalForCheckEachUsersWallets"
          >
            <div id="content">
              <form>
                <p>{{ loginUser.name }}さんの残高</p>
                <p>{{ loginUser.wallet }}円</p>
              </form>
              <button @click="closeModalForCheckEachUsersWallets">close</button>
            </div>
          </div>
          <button id="btn" @click="openModalForSendMoney">送る</button>
          <div id="overlay" v-show="modalForSendMoney" @click="closeModalForSendMoney">
            <div id="content" v-for="currentUser in currentUser" :key="currentUser.id" @click.stop>
              <form>
                <p>あなたの残高: {{ currentUser.barance }}</p>
                <p>送る金額</p>
                <input type="number" label="金額" v-model.number="sendMoneyAmount" />
                <button
                  @click.prevent="sendMoneyForOtherUsers(currentUser.id, currentUser.barance, sendMoneyAmount)"
                >送信</button>
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
      sendMoneyAmount: this.$store.state.sendMoneyAmount,
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
    loginUser() {
      return this.$store.getters.loginUser;
    },
  },
  mounted() {
    this.$store.dispatch("loginUserDisplay");
  },
  methods: {
    signOut() {
      this.$store.dispatch("signOutAction");
    },
    setLoginUser(name, barance, id) {
      this.$store.dispatch("setLoginUser", {
        name: name,
        wallet: barance,
        id: id,
      });
    },
    closeModalForCheckEachUsersWallets() {
      this.$store.dispatch("closeModalForCheckEachUsersWallets");
      this.sendMoneyAmount = 0;
    },
    openModalForSendMoney() {
      this.$store.dispatch("openModalForSendMoney");
    },
    closeModalForSendMoney() {
      this.$store.dispatch("closeModalForSendMoney");
      this.sendMoneyAmount = 0;
    },
    sendMoneyForOtherUsers(id, barance) {
      this.$store.dispatch("sendMoneyForOtherUsers", {
        id: id,
        barance: barance,
        sendMoneyAmount: this.sendMoneyAmount,
      });
    },
    getLoginUserWalletAmount(name, barance, id) {
      console.log(barance);
      this.$store.dispatch("getLoginUserWalletAmount", {
        name: name,
        barance: barance,
        id: id,
        receivedMoneyAmount: this.sendMoneyAmount,
      });
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

#btn {
  margin: 5px;
}
</style>