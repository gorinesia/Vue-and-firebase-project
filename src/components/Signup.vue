<template>
  <div class="signup">
    <div>
      ユーザー名<input type="text" placeholder="Username" v-model="username">
    </div>
    <div>
      メールアドレス<input type="email" placeholder="Email" v-model="email">
    </div>
    <div>
      パスワード<input type="password" placeholder="Password" v-model="password">
    </div>
    <button @click="signUp">新規登録</button>
    <router-link to="/signin">ログインはこちらから</router-link>
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
ul {
  list-style: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.signup {
  margin-top: 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

input {
  margin: 10px 0;
  padding: 10px;
}


</style>