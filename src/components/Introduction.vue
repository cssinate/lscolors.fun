<template>
  <div>
    <h2>What is this thing?</h2>
    <p>When you type <code>ls</code> into your bash terminal, it lists files and directories. On most installations, those files and directories are styled to indicate some of their properties. The terminal can use 16 available colors. And the defaults are kind of ugly.</p>

    <p>Most modern terminal applications map an rgb color to each of the 16 colors. Instead of displaying <span style="color: var(--a-brightGreen)">Bright Green</span> as <span style="color: #00ff00">#00ff00</span>, the terminal is capabale of mapping it to <span style="color: #c0ffee;">#c0ffee</span> or <span style="color: #bada55;">#bada55</span>.</p>

    <p>This application helps you style different types of files and folders, AND it helps you generate a theme for your terminal application.</p>

    <h2>How do I get started?</h2>

    <p>Click one of the items on the right to edit its styling. Then you can move on to mapping your theme colors.</p>

    <button class="action" @click="hideMe()">Hide this panel</button>
  </div>
</template>

<script>
  export default {
    name: "Introduction",
    methods: {
      hideMe: function () {
        this.$emit('hide-me');
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

  code {
    color: var(--a-brightMagenta);
  }

  div {
    width: 40ch;
  }

  .action {
    margin-top: 1.5rem;
  }
</style>
