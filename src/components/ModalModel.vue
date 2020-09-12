<template>
  <div id="app">
    <button @click="openModal">Click</button>
    <div id="overlay" v-show="showContent" @click="closeModal">
      <div id="content">
        <p>これがモーダルウィンドウです。</p>
        <input type="text">
        <button @click="closeModal">close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showContent: false
    }
  },
  methods: {
    openModal() {
      this.showContent = true
    },
    closeModal() {
      this.showContent = false
    }
  }
}
</script>

<style scoped>
  #overlay {
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #content {
    z-index: 2;
    width: 50%;
    padding: 1em;
    background: #fff;
  }
</style>