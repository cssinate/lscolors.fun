<template>
  <div id="app">
    <Header />
    <PageContent />
  </div>
</template>

<script>
import PageContent from './components/PageContent.vue'
import Header from './components/Header.vue'

export default {
  name: 'app',
  components: {
    PageContent,
    Header
  }
}
</script>

<style scoped>
  #app {
    display: contents;
  }
</style>
