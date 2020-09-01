<template>
  <div>
    <h2>こんにちは  {{ name }}さん</h2>
    <button @click="signOut">サインアウト</button>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      name: firebase.auth().currentUser.displayName
    }
  },
  methods: {
    signOut() {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
      })
    }
  }
}
</script>

<style>

</style>