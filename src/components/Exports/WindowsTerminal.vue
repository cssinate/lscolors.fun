<template>
  <section @click="focusInput()">
    <div class="export_prompt">
      <p>Windows Terminal themes require a theme name.</p>
      <div style="display: flex;">
        <span>$ &gt; </span><label><input type="text" ref="themeName" v-model="themeName" class="sr-only" maxlength="20">{{themeName}}</label>
      </div>
    </div>
    <div class="export_instructions"></div>
    <div class="export">
      <div class="export_terminalInstructions">

      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'WindowsTerminal',
    friendlyName: 'Windows Terminal',
    data () {
      return {
        themeName: null,
        exportingTo: this.$parent.activeNav
      }
    },
    watch: {
      exportingTo: function () {
        if (this.$parent.exportingTo === this.$options.data.name) {
          console.log("Exporting")
          this.$nextTick(() => {
            if (!this.themeName) {

            }
          })
        }
      }
    },
    mounted () {
      this.focusInput()
    },
    methods: {
      focusInput () {
        if (!this.themeName) {
          this.$refs.themeName.focus()
        }
      }
    }
  }
</script>

<style scoped>
  section {
    display: contents;
  }

</style>
