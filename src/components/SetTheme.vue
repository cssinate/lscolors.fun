<template>
  <div class="grid">
    <theme-color v-model="color.hex" :meta="color"
                 v-for="(color, index) in colorProperties" :key="index" />
  </div>
</template>

<script>
import ColorPicker from './ColorPicker'
import ThemeColor from './ThemeColor'
import { themeProps } from './themeProperties.js'

export default {
  components: {
    ThemeColor
  },
  data () {
    return {
      colorProperties: themeProps
    }
  },
  methods: {

  },
  watch: {

  },
  mounted: function () {
  },
  computed: {

  }

}
</script>

<style lang="scss" scoped>
  .grid {
    display: grid;
    grid-template-columns: auto max-content max-content 3rem auto max-content max-content;
    grid-auto-rows: min-content;
    grid-gap: .5rem;
    align-items: center;
    height: 100%;
    padding: 1rem;
    width: min-content;
    margin-left: auto;
  }
</style>
