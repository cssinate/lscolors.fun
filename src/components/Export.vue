<template>
  <div style="display: contents;">
    <section v-if="schemeChanges.length">
      <h2>Export to bash</h2>
      <p>Copy the following string, and paste it into the file <code>~/.bash_profile</code></p>
      <div class="export" ref="schemeExport" @click="selectScheme()">LS_COLORS="{{groupedSchemeStyles}}"</div>
    </section>
    <section v-else>
      <h2>Export to bash</h2>
      <p>You made no changes to your color scheme. There's nothing to export.</p>
    </section>
    <section>
      <nav class="nav">
        <a>VSCode</a>
        <a>Windows Terminal</a>
      </nav>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    schemeChanges: Array,
    themeColors: Array
  },
  data: function () {
    return {
      exportingThemeTo: 'VSCode'
    }
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
    },
    themeExport: function () {

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
    selectScheme () {
      var range = document.createRange()
      range.selectNode(this.$refs.schemeExport)
      window.getSelection().removeAllRanges()
      window.getSelection().addRange(range)
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
