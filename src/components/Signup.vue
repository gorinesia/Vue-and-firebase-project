<template>
  <div class="signup">
    <div>
      <img alt="Vue logo" src="../assets/logo.png">
    </div>
    <div>
      <h1>新規登録画面</h1>
    </div>
    <div>
      <label for="username">ユーザー名</label>
      <input type="text" id="username" placeholder="Username" v-model="username">
    </div>
    <div>
      <label for="email">メールアドレス</label>
      <input type="email" id="email" placeholder="Email" v-model="email">
    </div>
    <div>
      <label for="password">パスワード</label>
      <input type="password" id="password" placeholder="Password" v-model="password">
    </div>
    <button @click="signUp">新規登録</button>
    <router-link to="/">ログインはこちらから</router-link>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Signup',
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    signUp() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then((result) => {
          result.user.updateProfile({
            displayName: this.username
          });
          alert('ユーザー登録完了しました！！')
          this.$router.push('/signin')
        })
        .catch(error => {
          alert(error.message)
        })
    }
  }
}
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