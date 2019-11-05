<template>
  <header>
    <pre aria-hidden="true" v-html="headerContent[0]"></pre>
    <!-- <pre aria-hidden="true" v-html=""></pre> -->
    <pre>Styles and color styles for LS_COLORS and your favourite terminal!</pre>
    <h1 class="sr-only">LSCOLORS.FUN</h1>
  </header>
</template>

<script>
import { headerDirs } from '../mixins/headerText.js'

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
  padding-left: 3ch;
  background-color: var(--t-bg);
  padding-bottom: 1rem;
  grid-area: header;
  user-select: none;
}

pre:first-of-type {
  font-size: calc(.6em + .125vmin);
  padding-bottom: 1em;
  line-height: 1;
  animation: colorshift 500s linear infinite;
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

@keyframes colorshift {
  from {
    filter: hue-rotate(0deg)
  }
  to {
    filter: hue-rotate(360deg)
  }
}
</style>
