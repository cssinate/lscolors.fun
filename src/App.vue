<template>
  <div id="app">
    <Header />
    <!-- <PageContent /> -->

    <main class="content">
      <navigation v-model="activeNav" />
      <introduction class="panel" v-if="activeNav === 'intro'" @go-to-scheme="activeNav = 'scheme'" />
      <scheme-preview class="panel"
                      @edit-change="currentScheme = $event"
                      :currently-editing="currentScheme"
                      :isScheme="activeNav === 'scheme'"
                      v-if="activeNav === 'scheme' || activeNav === 'theme'" />
      <scheme class="panel"
              :currently-editing="currentScheme"
              :current-defaults="inodesDefault[currentScheme.index]"
              ref="setScheme"
              @scheme-changes="schemeChanges = $event"
              v-if="activeNav === 'scheme' && currentScheme && inodesDefault[currentScheme.index]" />
      <set-theme class="panel"
                 v-if="activeNav === 'theme'" />
                 {{schemeChanges}}
    </main>
  </div>
</template>

<script>
// import PageContent from './components/PageContent.vue'
import Header from './components/Header.vue'
import Navigation from './components/Navigation.vue'
import Introduction from './components/Introduction.vue'
import Scheme from './components/SetScheme'
import SchemePreview from './components/SchemePreview'
import SetTheme from './components/SetTheme'

import { inodes as results } from './mixins/inodes.js'

export default {
  name: 'app',
  components: {
    // PageContent,
    Header,
    Navigation,
    Introduction,
    Scheme,
    SchemePreview,
    SetTheme
  },
  data: function () {
    return {
      activeNav: 'intro',
      inodes: JSON.parse(JSON.stringify(results)),
      inodesDefault: results,
      currentScheme: {},
      currentDefaults: {},
      schemeChanges: null,
      themeChanges: null
    }
  },
  watch: {

    currentScheme: function () {
      this.currentDefaults = this.inodesDefault[this.currentScheme.index]
    }
  },
  computed: {

  },
  methods: {
  },
  mounted: function () {
    var inodeIndex = 0
    this.inodes.forEach(inode => {
      inode.index = inodeIndex
      inodeIndex++
    })
    this.currentScheme = this.inodes[0]
    this.currentDefaults = this.inodesDefault[0]
  }
}
</script>

<style scoped lang="scss">
  #app {
    display: contents;
  }

  .content {
    display: flex;
  }
</style>
