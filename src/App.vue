<template>
  <div id="app">
    <Header />
    <!-- <PageContent /> -->
    <navigation :nav-states="shownPanels" ref="nav" @nav-states="updatePanels($event)" />
    <main class="content">
      <introduction class="panel" v-if="shownPanels.intro" @hide-me="hidePanel('intro')" />
      <scheme-preview class="panel"
                      @edit-change="currentScheme = $event"
                      :currently-editing="currentScheme"
                      v-if="shownPanels.preview" />
      <scheme class="panel"
              :currently-editing="currentScheme"
              :current-defaults="inodesDefault[currentScheme.index]"
              ref="setScheme"
              v-if="shownPanels.scheme && currentScheme && inodesDefault[currentScheme.index]" />
      <set-theme class="panel"
                 v-if="shownPanels.theme" />
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
      shownPanels: {
        intro: true,
        preview: true,
        scheme: true,
        theme: true
      },
      inodes: JSON.parse(JSON.stringify(results)),
      inodesDefault: results,
      currentScheme: {},
      currentDefaults: {}
    }
  },
  watch: {
    evalScheme: function (val, oldVal) {
      if (!val.preview && oldVal.scheme) {
        this.shownPanels.scheme = false
      }
      if (!oldVal.preview && !oldVal.scheme) {
        this.shownPanels.preview = true
      }
    },
    currentScheme: function () {
      this.currentDefaults = this.inodesDefault[this.currentScheme.index]
    }
  },
  computed: {
    evalScheme () {
      return { preview: this.shownPanels.preview, scheme: this.shownPanels.scheme }
    }
  },
  methods: {
    hidePanel (comp) {
      this.shownPanels[comp] = false
    },
    updatePanels (event) {
      this.shownPanels = event
    }
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
