<template>
  <div id="app">
    <Header />
    <SchemePreview :ls-results="LsResults" />
    <PageContent />
  </div>
</template>

<script>
import PageContent from './components/PageContent.vue'
import SchemePreview from './components/SchemePreview.vue'
import Header from './components/Header.vue'
import { lsResults as results } from './components/lsResults.js'

export default {
  name: 'app',
  components: {
    PageContent,
    SchemePreview,
    Header
  },
  data () {
    return {
      LsResults: results
    }
  }
}
</script>

<style scoped>
  #app {
    display: contents;
  }
</style>
