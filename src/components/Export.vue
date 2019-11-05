<template>
  <div class="panel panel--export">
    <div class="panel--bash">
      <h2>Export to bash</h2>
      <section v-if="styleChanges.length" class="export_bash">
        <p>Copy the following string, and paste it into the file <code>~/.bash_profile</code></p>
        <pre class="export" ref="styleExport">LS_COLORS="{{groupedStyleStyles}}"</pre>
      </section>
      <section v-else class="export_bash">
        <p>You made no changes to your color style. There's nothing to export.</p>
      </section>
    </div>
    <div class="panel--terminal">
      <h2>Export to terminal</h2>
      <navigation
        :nav-items="navItems"
        v-model="activeNav" />
      <keep-alive>
        <component :is="activeNav" v-if="activeNav !== ''" :terminal-colors="terminalColors" :ansi-colors="ansiColors" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { schemeProps } from '../mixins/schemeProperties'
import Navigation from './Navigation'
import terminalMixin from '../mixins/terminal'

export default {
  mixins: [terminalMixin],
  components: { Navigation },
  props: {
    styleChanges: Array,
    schemeChange: Object
  },
  data: function () {
    return {
      terminalColors: [],
      ansiColors: [],
      activeNav: ''
    }
  },
  mounted: function () {
    schemeProps.forEach(prop => {
      if (prop.prefix === 't') {
        this.terminalColors.push({ name: prop.name, hex: prop.hex })
      } else {
        this.ansiColors.push({ name: prop.name, hex: prop.hex })
      }
    })
  },
  computed: {
    groupedStyleStyles: function () {
      var styleStyles = []
      this.styleChanges.forEach(change => {
        var styleStyle = ''
        styleStyle = `${change.code}=${this.applyChangeStyles(change)}`
        styleStyles.push(styleStyle)
      })
      return styleStyles.join(':')
    }
  },
  methods: {
    applyChangeStyles: function (changes) {
      var styles = []
      if (changes.eff) {
        styles.push(changes.eff)
      }
      if (changes.fg) {
        styles.push(changes.fg)
      }
      if (changes.bg) {
        styles.push(changes.bg)
      }
      return styles.join(';')
    },
    selectText () {
      var range = document.createRange()
      range.selectNode(this.$refs.styleExport)
      window.getSelection().removeAllRanges()
      window.getSelection().addRange(range)
    },
    checkAnsi (name) {
      return this.ansiColors.find(({ colorName }) => colorName === name)
    },
    checkTerm (name) {
      return this.terminalColors.find(({ colorName }) => colorName === name)
    }
  },
  watch: {
    schemeChange:
      function () {
        if (this.schemeChange.area === 'a') {
          let objToUpdate = this.ansiColors.find(({ name }) => name === this.schemeChange.name)
          objToUpdate.hex = this.schemeChange.color
        } else {
          let objToUpdate = this.terminalColors.find(({ name }) => name === this.schemeChange.name)
          objToUpdate.hex = this.schemeChange.color
        }
      }
  }
}
</script>

<style>

</style>
