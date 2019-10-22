<template>
  <div>
    <h2>Export to bash</h2>
    <section v-if="schemeChanges.length">
      <p>Copy the following string, and paste it into the file <code>~/.bash_profile</code></p>
      <div class="export" ref="schemeExport" @click="selectScheme()">LS_COLORS="{{groupedSchemeStyles}}"</div>
    </section>
    <section v-else>
      <p>You made no changes to your color scheme. There's nothing to export.</p>
    </section>
    <h2>Export to terminal</h2>
    <section>
      <nav class="nav">
        <a v-for="(terminal, index) in terminals"
           :key="index"
           :class="{active: exportingThemeTo === terminal}"
           @click="exportingThemeTo = terminal">
          {{ terminal }}
        </a>
      </nav>
      <div class="export" ref="schemeExport" @click="selectText()">
        <component :is="exportingThemeTo" />
      </div>
    </section>
  </div>
</template>

<script>
import { themeProps } from '../mixins/themeProperties'
import terminalMixin from '../mixins/terminal'

export default {
  props: {
    schemeChanges: Array,
    themeChange: Object
  },
  mixins: [terminalMixin],
  data: function () {
    return {
      exportingThemeTo: '',
      terminalColors: [],
      ansiColors: []
    }
  },
  mounted: function () {
    this.exportingThemeTo = this.terminals[0]
    this.$nextTick(() => {themeProps.forEach(prop => {
      if (prop.prefix === 't') {
          this.terminalColors.push({ name: prop.name, hex: prop.hex })
        } else {
          this.ansiColors.push({ name: prop.name, hex: prop.hex })
        }
      })
    })
  },
  computed: {
    groupedSchemeStyles: function () {
      var schemeStyles = []
      this.schemeChanges.forEach(change => {
        var schemeStyle = ''
        schemeStyle = `${change.code}=${this.applyChangeStyles(change)}`
        schemeStyles.push(schemeStyle)
      })
      return schemeStyles.join(':')
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
      range.selectNode(this.$refs.schemeExport)
      window.getSelection().removeAllRanges()
      window.getSelection().addRange(range)
    },
    checkAnsi (name) {
      return this.ansiColors.find( ({colorName}) => colorName === color)
    },
    checkTerm (name) {
      return this.terminalColors.find( ({colorName}) => colorName === color)
    }
  },
  watch: {
    themeChange:
      function () {
        if (this.themeChange.area === 'a') {
          let objToUpdate = this.ansiColors.find( ({name}) => name === this.themeChange.name)
          console.log(objToUpdate)
          objToUpdate.hex = this.themeChange.color
        } else {
          let objToUpdate = this.terminalColors.find( ({name}) => name === this.themeChange.name)
          objToUpdate.hex = this.themeChange.color
        }
    }
  }
}
</script>

<style>

</style>

<style scoped>
.export {
  margin: 1.5rem 0;
  padding: 1rem 1ch;
  border: solid 1px var(--t-fg);
}
</style>

<style scoped>
.export {
  margin: 1.5rem 0;
  padding: 1rem 1ch;
  border: solid 1px var(--t-fg);
}
</style>
