<template>
  <div class="layout layout-default">
    <main class="content">
      <ModalRoute />
    </main>
  </div>
</template>

<script>
export default {
  name: 'LayoutDefault',
  components: {
    ModalRoute: () => import('@/components/templates/modals/ModalRoute.vue')
  }
}
</script>

<style>

</style>