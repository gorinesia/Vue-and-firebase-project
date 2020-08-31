<template>
  <div class="home">
    <div>
      <img alt="Vue logo" src="../assets/logo.png">
    </div>
    <div>
      <h1>新規登録画面</h1>
    </div>
    <div>
      <Signup />
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Signup from '@/components/Signup.vue';

export default {
  name: 'Home',
  components: {
    Signup
    // HelloWorld
  }
}
</script>
