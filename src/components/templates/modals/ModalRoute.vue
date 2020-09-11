<template>
  <div class="modal-route">
    <div class="bg" />
    <div class="modal-wrap">
      <button class="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" /></svg>
      </button>
      <p class="text">Hello Nuxt.js</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal'
}
</script>

<style scoped>
.modal-route {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
}

.bg {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-wrap {
  border-radius: 8px;
  background-color: #ffffff;
  width: 50%;
  height: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  padding: 30px;
}
</style>