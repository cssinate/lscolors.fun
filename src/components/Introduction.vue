<template>
  <div>
    <h2>What is this thing?</h2>
    <p>When you type <code>ls</code> into your bash terminal, it lists files and directories. On most installations, those files and directories are styled to indicate some of their properties. The terminal can use 16 available colors.</p>

    <p>And the defaults are kind of ugly.</p>

    <p>Most modern terminal applications map a hex color to each of the 16 colors. Instead of displaying <span style="color: var(--a-brightGreen)">Bright Green</span> as <span style="color: #00ff00">#00ff00</span>, the terminal is capable of mapping it to <span style="color: #c0ffee;">#c0ffee</span> or <span style="color: #bada55;">#bada55</span>.</p>

    <p>This application helps you generate a <strong>SCHEME</strong> for files and folders, and a <strong>THEME</strong> for your terminal application.</p>

    <button class="action" @click="goToScheme">Get Started</button>
  </div>
</template>

<script>
export default {
  name: 'Introduction',
  methods: {
    goToScheme: function () {
      this.$emit('go-to-scheme')
    }
  }
}
</script>

<style lang="scss" scoped>
  p + h2 {
    margin-top: 1.5rem;
  }

  p + p {
    margin-top: 1.5rem;
  }

  div {
    width: 40ch;
  }

  .action {
    margin-top: 1.5rem;
  }
</style>
