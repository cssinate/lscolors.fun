<template>
  <div id="app">
    <Header />
    <SchemePreview />
    <PageContent />
  </div>
</template>

<script>
import PageContent from './components/PageContent.vue'
import SchemePreview from './components/SchemePreview.vue'
import Header from './components/Header.vue'

export default {
  name: 'app',
  components: {
    PageContent,
    SchemePreview,
    Header
  }
}
</script>

<style scoped>
  #app {
    display: contents;
  }
</style>
