<template>
  <div>
    <div>
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
    <div>
      <h2>こんにちは {{ displayName }} さん</h2>
    </div>
    <div>
      <button @click="signOut">サインアウト</button>
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
  methods: {
    signOut() {
      this.$store.dispatch("signOutAction");
    },
  },
};
</script>

<style>
</style>