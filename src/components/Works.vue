<template>
  <div class="page-inner">
    <h2>Works</h2>
    <p>過去の事例の一部を紹介します。</p>
      <div class="item-list" v-for="(item,index) in items" :key="index">
        <div class="card">
          <img @click="openModal(item)" :src="item.img_src" alt="Card image">
        </div>
        <modal :val="postItem" v-show="showContent" @close="closeModal" />
      </div>
  </div>
</template>

<script>
// import Modal from '~/components/Modal.vue'

export default {
  // components: {
  //   Modal
  // },
  data() {
    return {
      showContent: false,
      postItem: '',
      items: [
        {
          id: 1,
          desc: '課題で作成した美容室のHPです。',
          range: 'コーディング(レスポンシブ対応)',
          lang: 'HTML, CSS(Sass)',
          img_src: require('../assets/JS.png'),
        },
        {
          id: 2,
          desc: '実案件で作成したコーポレートサイトです。',
          range: 'コーディング(レスポンシブ対応)',
          lang: 'HTML, CSS(Sass)',
          img_src: require('../assets/logo.png'),
        },
      ]
    }
  },
  methods: {
    openModal(item) {
      this.showContent = true
      this.postItem = item
    },
    closeModal() {
      this.showContent = false
    }
  }
}
</script>

<style>

</style>