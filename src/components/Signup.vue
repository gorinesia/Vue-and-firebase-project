<template>
  <div class="signup">
    <div>
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
    <div>
      <h1>新規登録画面</h1>
    </div>
    <div>
      <label for="username">ユーザー名</label>
      <input type="text" id="username" placeholder="Username" v-model="displayName" />
    </div>
    <div>
      <label for="email">メールアドレス</label>
      <input type="email" id="email" placeholder="Email" v-model="email" required />
    </div>
    <div>
      <label for="password">パスワード</label>
      <input type="password" id="password" placeholder="Password" v-model="password" />
    </div>
    <button @click="signUp">新規登録</button>
    <router-link to="/signin">ログインはこちらから</router-link>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data() {
    return {
      displayName: '',
      email: '',
      password: '',
    };
  },
  methods: {
    signUp() {
      this.$store.dispatch('signUpAction', {
        displayName: this.displayName,
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style scoped>
.signup {
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