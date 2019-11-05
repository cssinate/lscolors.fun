<template>
  <section>
    <p>Open your <code>settings.json</code> by pressing <code>CTRL / CMD + SHIFT + P</code> and searching for <code>Open Settings (JSON)</code>. Paste this in. If you paste it in the top of the file, add a <code>,</code> after, or if you're pasting it at the bottom, put one at the end of the previous line.</p>
    <pre class="export" ref="export" v-if="!boundTheme">"workbench.colorCustomizations" {
  {{exportText}}
}
</pre>
    <pre class="export" ref="export" v-else>"workbench.colorCustomizations" {
  "[{{boundTheme}}]": {
  <span style="margin-left: 2ch">{{exportText}}</span>
  }
}
</pre>
    <p>If you'd like to bind these customizations to only one VSCode color theme, enter the theme's name below.</p>
    <div class="export export_prompt" style="display: flex;" @keydown.enter="finishBoundTheme()" @click="focusInput()">
      <span>$ &gt; </span><input type="text" ref="schemeName" v-model="tempBoundTheme" maxlength="20" :style="`width: ${tempBoundTheme.length}ch`">
    </div>
    <button class="action" v-if="tempBoundTheme !== boundTheme" @click="finishBoundTheme()">Done</button>
  </section>
</template>

<script>
export default {
  name: 'VSCode',
  friendlyName: 'VSCode',
  props: {
    terminalColors: Array,
    ansiColors: Array
  },
  data () {
    return {
      tempBoundTheme: '',
      boundTheme: ''
    }
  },
  computed: {
    exportText () {
      let o = ``
      let spaces = `  `
      if (this.boundTheme) {
        spaces = `    `
      }
      this.terminalColors.forEach(color => {
        o = o + `"terminal.${color.name.replace('f', 'fore').replace('b', 'back').replace('g', 'ground')}": "${color.hex}",\n${spaces}`
      })
      this.ansiColors.forEach((color, index) => {
        let colorName = color.name.charAt(0).toUpperCase() + color.name.slice(1)
        o = o + `"terminal.ansi${colorName}": ${color.hex}"`
        if (index < this.ansiColors.length - 1) {
          o = o + `,\n${spaces}`
        }
      })
      return o
    }
  },
  methods: {
    focusInput () {
      if (!this.schemeName) {
        this.$refs.schemeName.focus()
      }
    },
    finishBoundTheme () {
      this.boundTheme = this.tempBoundTheme
      this.$refs.schemeName.blur()
      window.scrollTo(0, this.$refs.export.getBoundingClientRect().top)
    }
  },
  watch: {
    tempBoundTheme (newVal, oldVal) {
      if (oldVal === this.boundTheme && newVal !== this.boundTheme) {
        this.$nextTick(() => { window.scroll(0, document.body.scrollHeight) })
      }
    }
  }
}
</script>

<style scoped>

</style>
