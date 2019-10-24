<template>
  <div id="app">
    <Header />
    <!-- <PageContent /> -->

    <main class="content">

      <navigation
        :nav-items="navItems"
        v-model="activeNav" />

      <introduction
        class="panel"
        v-if="activeNav === 'intro'"
        @go-to-scheme="activeNav = 'scheme'" />

      <preview
        class="panel panel--preview"
        @edit-change="currentScheme = $event"
        :currently-editing="currentScheme"
        :isScheme="activeNav === 'scheme'"
        :changes="schemeChanges"
        v-if="activeNav === 'scheme' || activeNav === 'theme'" />

      <scheme
        class="panel panel--scheme"
        :currently-editing="currentScheme"
        :current-defaults="inodesDefault[currentScheme.index]"
        ref="setScheme"
        :scheme-changes="schemeChanges"
        @scheme-change="checkForSchemeChanges($event)"
        v-if="activeNav === 'scheme' && currentScheme && inodesDefault[currentScheme.index]" />

      <set-theme
        class="panel panel--theme"
        @new-change="currentThemeChange = $event"
        v-if="activeNav === 'theme'" />

      <export
        v-show="activeNav === 'export'"
        :theme-change="currentThemeChange"
        :scheme-changes="schemeChanges" />

    </main>
  </div>
</template>

<script>
// import PageContent from './components/PageContent.vue'
import Header from './components/Header.vue'
import Navigation from './components/Navigation.vue'
import Introduction from './components/Introduction.vue'
import Scheme from './components/SetScheme'
import Preview from './components/Preview'
import SetTheme from './components/SetTheme'
import Export from './components/Export'

import { inodes as results } from './mixins/inodes.js'

export default {
  name: 'app',
  components: {
    // PageContent,
    Header,
    Navigation,
    Introduction,
    Scheme,
    Preview,
    SetTheme,
    Export
  },
  data: function () {
    return {
      activeNav: 'intro',
      navItems: [
        {
          name: 'Introduction',
          short: 'intro'
        },
        {
          name: 'Set Scheme',
          short: 'scheme'
        },
        {
          name: 'Set Theme',
          short: 'theme'
        },
        {
          name: 'Export',
          short: 'export'
        }
      ],
      inodes: JSON.parse(JSON.stringify(results)),
      inodesDefault: results,
      currentScheme: {},
      currentDefaults: {},
      schemeChanges: [],
      currentThemeChange: {}
    }
  },
  watch: {
    currentScheme: function () {
      this.currentDefaults = this.inodesDefault[this.currentScheme.index]
    }
  },
  methods: {
    checkForSchemeChanges: function (area) {
      this.$nextTick(() => {
        var copy = this.currentScheme
        var original = this.currentDefaults
        var code = original.code
        var find = this.schemeChanges.find(obj => { return obj.code === code })
        if (copy[area] !== original[area]) {
          var obj
          var push
          if (find) {
            obj = find
            push = false
          } else {
            obj = {}
            push = true
          }
          obj.code = code
          obj[area] = copy[area]
          push && this.schemeChanges.push(obj)
        } else {
          if (find) {
            delete find[area]
            if (!find.fg && !find.bg && !find.eff) {
              var index = this.schemeChanges.findIndex(o => { return o.code === code })
              this.schemeChanges.splice(index, 1)
            }
          }
        }
      })
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
