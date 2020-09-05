<template>
  <div class="signin">
    <div>
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
    <div>
      <h2>ログイン画面</h2>
    </div>
    <div>
      <form>
        <div>
          <label for="email">メールアドレス</label>
          <input type="email" id="email" placeholder="Email" v-model="email" />
        </div>
        <div>
          <label for="password">パスワード</label>
          <input type="password" id="password" placeholder="Password" v-model="password" />
        </div>
      </form>
    </div>
    <div>
      <button @click="signIn">ログイン</button>
    </div>
    <div>
      <router-link to="/signup">新規登録はこちらから</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signin',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    signIn() {
      this.$store.dispatch('signInAction', {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style scoped>
.signin {
  margin-top: 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

input {
  margin: 10px;
  padding: 10px;
}
</style>