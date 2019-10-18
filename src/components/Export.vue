<template>
  <div>
    <section v-if="schemeChanges.length">
      <h2>Export to bash</h2>
      <p>Copy the following string, and paste it into the file <code>~/.bash_profile</code></p>
      <div class="export">
        LS_COLORS="{{groupSchemeStyles}}"
      </div>
    </section>
    <section v-else>
      <h2>Export to bash</h2>
      <p>You made no changes to your color scheme. There's nothing to export.</p>
    </section>
    <section>
      <nav>
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
  computed: {
    groupSchemeStyles: function () {
      var schemeStyles = new Array
      this.schemeChanges.forEach(change => {
        var schemeStyle = new String
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
    }
  }
}
</script>

<style scoped>

</style>
