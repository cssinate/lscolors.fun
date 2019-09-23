<template>
  <header>
    <pre><span v-html="headerContent[0]"></span></pre>
    <pre>Color schemes and themes for LS_COLORS and your favourite terminal!</pre>
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
  padding-bottom: 1em;
  grid-area: header;
  user-select: none;

  /deep/ pre {
    color: white;
  }
}

pre {
  margin-bottom: 1.5em;
}

pre:last-child {
  color: var(--a-brightMagenta);
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
