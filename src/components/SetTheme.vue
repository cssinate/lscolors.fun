<template>
  <div>
    <div class="grid">
      <theme-color :value="color.hex"
                   ref="themeColor"
                   :meta="color"
                   v-for="(color, index) in colorProperties"
                   :key="index"
                   :index="index"
                   @color-selected="setEditingColor($event)"
                   v-show="!currentlyEditing || currentlyEditing['index'] === index" />
    </div>
    <color-picker v-model="currentColor" v-if="currentColor"/>
    <button v-if="currentlyEditing" class="action" @click="setToDefault()">Reset to Default</button>
    <button v-if="currentlyEditing" class="action" @click="doneEditing()">Save</button>
    <button v-if="!currentlyEditing" class="action" @click="resetAllToDefault()">Reset All to Default</button>
  </div>
</template>

<script>
import ColorPicker from './ColorPicker'
import ThemeColor from './ThemeColor'
import { themeProps } from '../mixins/themeProperties.js'

export default {
  components: {
    ThemeColor,
    ColorPicker
  },
  data () {
    return {
      colorProperties: themeProps,
      currentlyEditing: null
    }
  },
  methods: {
    setEditingColor: function (index) {
      this.currentlyEditing = this.colorProperties[index]
      this.currentlyEditing['index'] = index
    },
    setToDefault: function () {
      this.currentColor = this.colorProperties[this.currentlyEditing.index]
    },
    doneEditing: function () {
      this.currentlyEditing = null
    },
    resetAllToDefault: function () {
      this.$refs.themeColor.forEach(color => {
        document.documentElement.style.setProperty(`--${color.meta.prefix}-${color.meta.name}`, color.meta.hex)
      })
    }
  },
  watch: {

  },
  mounted: function () {
  },
  computed: {
    currentColor: {
      get: function () {
        if (this.currentlyEditing) {
          return window.getComputedStyle(document.documentElement).getPropertyValue(`--${this.currentlyEditing.prefix}-${this.currentlyEditing.name}`)
        } else {
          return null
        }
      },
      set: function (color) {
        document.documentElement.style.setProperty(`--${this.currentlyEditing.prefix}-${this.currentlyEditing.name}`, color.hex)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
  .grid {
    display: grid;
    grid-template-columns: auto;
    grid-auto-rows: min-content;
    grid-gap: .5rem;
    align-items: center;
    width: min-content;
  }
</style>
