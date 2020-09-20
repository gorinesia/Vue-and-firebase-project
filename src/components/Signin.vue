<template>
  <v-app>
    <v-card width="400px" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">ログイン</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field type="email" prepend-icon="mdi-email" label="メールアドレス" v-model="email" />
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            append-icon="mdi-eye-off"
            label="パスワード"
            @click:append="showPassword = !showPassword"
            v-model="password"
          />
          <v-card-actions>
            <v-btn class="info" @click="signIn">ログイン</v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn to="/signup">新規登録はこちら</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: "Signin",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
    };
  },
  methods: {
    signIn() {
      this.$store.dispatch("signInAction", {
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