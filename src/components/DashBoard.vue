<template>
  <v-app>
    <v-container>
      <v-row v-for="currentUser in currentUser" :key="currentUser.id">
        <v-col cols="4">
          <h2>{{ currentUser.displayName }} さんようこそ！</h2>
        </v-col>
        <v-col cols="2">
        </v-col>
        <v-col cols="2">
        </v-col>
        <v-col cols="2">
          <p>残高: {{ currentUser.barance }} 円</p>
        </v-col>
        <v-col cols="2">
          <v-card-action>
            <v-btn class="info" @click="signOut">ログアウト</v-btn>
          </v-card-action>
        </v-col>
      </v-row>
      <h2 style="text-align: center">ユーザー一覧</h2>
      <h3 style="margin-left: 20px">ユーザー名</h3>
      <ul>
        <li v-for="user in loginUsers" :key="user.id">
          <v-row>
            <v-col cols="1">
              <div></div>
            </v-col>
            <v-col cols="6">
              <p>{{ user.displayName }}</p>
            </v-col>
            <v-col cols="5">
              <v-btn
                class="primary mr-2"
                id="btn"
                @click="getLoginUserWalletAmount(user.displayName, user.barance, user.id)"
              >walletを見る</v-btn>
              <div
                id="overlay"
                v-show="modalForCheckWallets"
                @click="closeModalForCheckEachUsersWallets"
              >
                <div id="content" >
                  <v-form>
                    <p>{{ loginUser.name }}さんの残高</p>
                    <p>{{ loginUser.wallet }}円</p>
                    <v-btn small class="red mr-2" @click="closeModalForCheckEachUsersWallets">close</v-btn>
                  </v-form>
                </div>
              </div>
              <v-btn class="accent" @click="openModalForSendMoney">送る</v-btn>
              <div id="overlay" v-show="modalForSendMoney" @click="closeModalForSendMoney">
                <div id="content" v-for="currentUser in currentUser" :key="currentUser.id" @click.stop>
                  <v-form>
                    <p>あなたの残高: {{ currentUser.barance }}</p>
                    <p>送る金額</p>
                    <v-text-field type="number" label="金額" v-model.number="sendMoneyAmount" />
                    <v-btn
                      small
                      class="red mr-2"
                      @click.prevent="sendMoneyForOtherUsers(currentUser.id, currentUser.barance, sendMoneyAmount)"
                    >送信</v-btn>
                  </v-form>
                </div>
              </div>
            </v-col>
          </v-row>
        </li>
      </ul>
    </v-container>
  </v-app>
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
    this.$store.dispatch('loginUserDisplay');
  },
  methods: {
    signOut() {
      this.$store.dispatch('signOutAction');
    },
    setLoginUser(name, barance, id) {
      this.$store.dispatch('setLoginUser', {
        name: name,
        wallet: barance,
        id: id,
      });
    },
    closeModalForCheckEachUsersWallets() {
      this.$store.dispatch('closeModalForCheckEachUsersWallets');
      this.sendMoneyAmount = 0;
    },
    openModalForSendMoney() {
      this.$store.dispatch('openModalForSendMoney');
    },
    closeModalForSendMoney() {
      this.$store.dispatch('closeModalForSendMoney');
      this.sendMoneyAmount = 0;
    },
    sendMoneyForOtherUsers(id, barance) {
      this.$store.dispatch('sendMoneyForOtherUsers', {
        id: id,
        barance: barance,
        sendMoneyAmount: this.sendMoneyAmount,
      });
    },
    getLoginUserWalletAmount(name, barance, id) {
      console.log(barance);
      this.$store.dispatch('getLoginUserWalletAmount', {
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