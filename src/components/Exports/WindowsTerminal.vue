<template>
  <section @click="focusInput()">
    <div class="export_prompt" v-if="!schemeName" @keydown.enter="schemeName = tempSchemeName" @click="focusInput()">
      <p>Windows Terminal schemes require a scheme name.</p>
      <div class="export" style="display: flex;">
        <span>$ &gt; </span><input type="text" ref="schemeName" v-model="tempSchemeName" maxlength="20" :style="`width: ${tempSchemeName.length}ch`">
      </div>
      <button class="action" v-if="tempSchemeName" @click="schemeName = tempSchemeName">Done</button>
    </div>
    <p class="export_instructions" v-if="schemeName">Press <code>CTRL + ,</code> to open your Settings. A settings file will open in your default text editor. Copy the following, and enter it under <code>schemes</code>. Then under <code>profiles</code>, set <code>colorStyle</code> for your Ubuntu distro to <code>{{schemeName}}</code></p>
    <pre class="export" v-if="schemeName">{
  {{exportText}}
},
</pre>
  <button class="action" @click="schemeName = ''" v-if="schemeName">Change scheme name</button>
  </section>
</template>

<script>
export default {
  name: 'WindowsTerminal',
  friendlyName: 'Windows Terminal',
  props: {
    terminalColors: Array,
    ansiColors: Array
  },
  data () {
    return {
      // schemeName: null,
      schemeName: '',
      tempSchemeName: 'My Scheme',
      exportingTo: this.$parent.exportingTo
    }
  },
  activated () {
    if (!this.schemeName) {
      this.focusInput()
    }
  },
  methods: {
    focusInput () {
      if (!this.schemeName) {
        this.$refs.schemeName.focus()
      }
    }
  },
  computed: {
    exportText: function () {
      let o = `"name" : "${this.schemeName}",\n  `
      this.terminalColors.forEach(color => {
        o = o + `"${color.name.replace('f', 'fore').replace('b', 'back').replace('g', 'ground')}" : "${color.hex}",\n  `
      })
      this.ansiColors.forEach((color, index) => {
        o = o + `"${color.name}" : "${color.hex}"`
        if (index < this.ansiColors.length - 1) {
          o = o + `,\n  `
        }
      })
      return o
    }
  }
}
</script>
