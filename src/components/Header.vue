<template>
  <header>
    <pre role="presentation"><span v-html="headerContent[0]"></span></pre>
    <pre>Color schemes and themes for LS_COLORS and your favourite terminal!</pre>
    <h1 class="sr-only">LSCOLORS.FUN</h1>
  </header>
</template>

<script>
import { headerDirs } from '../headerText.js'

export default {
  data () {
    return {
      headerContent: headerDirs
    }
  },
  mounted: function () {
    var times = 0
    let animation = window.setInterval(() => {
      this.nextHeader()
      times++
      if (times === 8) {
        clearInterval(animation)
      }
    }, 600)
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // eslint-disable-next-line
      animation
    }
  },
  methods: {
    nextHeader () {
      const first = this.headerContent.shift()
      this.headerContent = this.headerContent.concat(first)
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--t-bg);
  padding-bottom: 1rem;
  grid-area: header;
  user-select: none;
}

pre:first-of-type {
  font-size: .7em;
  padding-bottom: 1em;
  line-height: 1;
}

pre:last-of-type {
  color: var(--a-brightMagenta);
  font-size: 1em;
  padding-bottom: 1em;
}

/deep/ .header-fill {
  color: var(--a-brightCyan);
  font-weight: bold;
}
/deep/ .header-outline {
  color: var(--a-cyan);
  font-weight: bold;
}
</style>
