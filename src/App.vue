<template>
  <div id="app">
    <Header />
    <!-- <PageContent /> -->

    <main class="content">

      <navigation
        :nav-items="navItems"
        v-model="activeNav"
        class="nav--main" />

      <introduction
        class="panel"
        v-if="activeNav === 'intro'"
        @go-to-style="activeNav = 'style'" />

      <preview
        class="panel panel--preview"
        @edit-change="currentStyle = $event"
        :currently-editing="currentStyle"
        :isStyle="activeNav === 'style'"
        :changes="styleChanges"
        v-if="activeNav === 'style' || activeNav === 'scheme' || activeNav === 'presets'" />

      <presets
        v-if="activeNav === 'presets'" />

      <Style
        class="panel panel--style"
        :currently-editing="currentStyle"
        :current-defaults="inodesDefault[currentStyle.index]"
        ref="setStyle"
        :style-changes="styleChanges"
        @style-change="checkForStyleChanges($event)"
        v-if="activeNav === 'style' && currentStyle && inodesDefault[currentStyle.index]" />

      <set-scheme
        class="panel panel--scheme"
        @new-change="currentSchemeChange = $event"
        v-if="activeNav === 'scheme'" />

      <export
        v-show="activeNav === 'export'"
        :scheme-change="currentSchemeChange"
        :style-changes="styleChanges" />

      <about
        v-if="activeNav ==='about'" />

    </main>
  </div>
</template>

<script>
// import PageContent from './components/PageContent.vue'
import Header from './components/Header.vue'
import Navigation from './components/Navigation.vue'
import Introduction from './components/Introduction.vue'
import Preview from './components/Preview'
import Presets from './components/Presets.vue'
import Style from './components/SetStyle'
import SetScheme from './components/SetScheme'
import Export from './components/Export'
import About from './components/About'

import { inodes as results } from './mixins/inodes.js'

export default {
  name: 'app',
  components: {
    // PageContent,
    Header,
    Navigation,
    Introduction,
    Preview,
    Presets,
    Style,
    SetScheme,
    Export,
    About
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
          name: 'Presets',
          short: 'presets'
        },
        {
          name: 'Set Style',
          short: 'style'
        },
        {
          name: 'Set Scheme',
          short: 'scheme'
        },
        {
          name: 'Export',
          short: 'export'
        },
        {
          name: 'About',
          short: 'about'
        }
      ],
      inodes: JSON.parse(JSON.stringify(results)),
      inodesDefault: results,
      currentStyle: {},
      currentDefaults: {},
      styleChanges: [],
      currentSchemeChange: {}
    }
  },
  watch: {
    currentStyle: function () {
      this.currentDefaults = this.inodesDefault[this.currentStyle.index]
    }
  },
  methods: {
    checkForStyleChanges: function (area) {
      this.$nextTick(() => {
        var copy = this.currentStyle
        var original = this.currentDefaults
        var code = original.code
        var find = this.styleChanges.find(obj => { return obj.code === code })
        /* eslint-disable-next-line */
        if (copy[area] != original[area]) {
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
          push && this.styleChanges.push(obj)
        } else {
          if (find) {
            delete find[area]
            if (!find.fg && !find.bg && !find.eff) {
              var index = this.styleChanges.findIndex(o => { return o.code === code })
              this.styleChanges.splice(index, 1)
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
    this.currentStyle = this.inodes[0]
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
    padding-right: 2ch;
    width: max-content;
  }
</style>
