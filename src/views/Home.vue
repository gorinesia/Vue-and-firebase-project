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
  </div>
</template>

<script>
import Signup from '@/components/Signup.vue';

export default {
  name: 'Home',
  components: {
    Signup
  }
}
</script>
