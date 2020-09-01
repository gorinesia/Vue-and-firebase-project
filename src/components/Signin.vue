<template>
  <div class="signin">
    <div>
      <img alt="Vue logo" src="../assets/logo.png">
    </div>
    <div>
      <h2>ログイン画面</h2>
    </div>
    <div>
      <label for="email">メールアドレス</label>
      <input type="email" id="email" placeholder="Email" v-model="email">
    </div>
    <div>
      <label for="password">パスワード</label>
      <input type="password" id="password" placeholder="Password" v-model="password">
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
import firebase from 'firebase'

export default {
  name: 'Signin',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn() {
      firebase.auth().signInWithEmailAndPassword(this.username, this.password).then(user => {
          alert('Success!', user.email)
          this.$router.push('/')
        },
        error => {
          alert(error.message)
        }
      )
    }
  }
}
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