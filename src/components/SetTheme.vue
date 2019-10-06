<template>
  <div class="grid">
    <theme-color :color="color"
                 v-for="(color, index) in colorProperties" :key="index" />
  </div>
</template>

<script>
import ThemeColor from './ThemeColor'
import { themeProps } from './themeProperties.js'

export default {
  components: {
    ThemeColor
  },
  data () {
    return {
      colorProperties: themeProps,
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

</style>
