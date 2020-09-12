<template>
  <div>
    <div>
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
    <div>
      <h2>こんにちは {{ displayName }} さん</h2>
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
export default {
  data() {
    return {
      displayName: this.$store.state.displayName,
      barance: this.$store.state.barance,
      currentUser: this.$store.state.currentUser,
      loginUsers: this.$store.state.loginUsers,
    };
  },
  async created() {
    await this.$store.dispatch('createdUser', {
      displayName: this.displayName,
    });
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