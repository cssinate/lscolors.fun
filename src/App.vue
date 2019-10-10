<template>
  <div id="app">
    <Header />
    <!-- <PageContent /> -->
    <navigation :nav-states="shownPanels" ref="nav" @nav-states="updatePanels($event)" />
    <main class="content">
      <introduction class="panel" v-if="shownPanels.intro" @hide-me="hidePanel('intro')" />
      <scheme-preview @edit-change="currentScheme = $event"
                      :currently-editing="currentScheme"
                      v-if="shownPanels.preview" />
      <Scheme :currently-editing="currentScheme" ref="setScheme" />
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

import { inodes as results } from './components/inodes.js'

export default {
  name: 'app',
  components: {
    // PageContent,
    Header,
    Navigation,
    Introduction,
    Scheme,
    SchemePreview
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
      currentScheme: {}
    }
  },
  watch: {
    evalScheme: function(val, oldVal) {
      console.log(val, oldVal)
      if (!val.preview && oldVal.scheme) {
        this.shownPanels.scheme = false
      }
      if (!oldVal.preview && !oldVal.scheme) {
        this.shownPanels.preview = true
      }
    }
  },
  computed: {
    evalScheme() {
      return { preview: this.shownPanels.preview, scheme: this.shownPanels.scheme }
    }
  },
  methods: {
    hidePanel (comp) {
      console.log(comp)
      this.shownPanels[comp] = false
    },
    updatePanels (event) {
      this.shownPanels = event
    }
  },
  mounted: function () {
    this.currentScheme = this.inodes[0]
    console.log(this.inodes[0])
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
