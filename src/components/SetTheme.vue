<template>
  <div>
    <div>
      <theme-color
        ref="themeColor"
        v-for="(color, index) in colorProperties"
        :meta="color"
        :key="index"
        :index="index"
        :changed="changedThemeColors.includes(color.name)"
        :title="changedThemeColors.includes(color.name) ? 'Modified from default' : ''"
        @color-selected="setEditingColor($event)"
        v-show="!currentlyEditing || currentlyEditing['index'] === index" />
    </div>
    <color-picker v-model="currentColor" v-if="currentColor"/>

    <button
      v-if="currentlyEditing"
      class="action"
      @click="doneEditing()">
        Save
    </button>

    <button
      v-if="currentlyEditing && returnToDefault"
      class="action"
      @click="setToDefault()">
        Reset to Default
    </button>

    <button
      v-if="!currentlyEditing"
      class="action"
      @click="resetAllToDefault()"
      style="margin-top: 1.5rem;">
        Reset All to Default
    </button>

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
      currentlyEditing: null,
      changedThemeColors: [],
      returnToDefault: false
    }
  },
  methods: {
    setEditingColor: function (data) {
      this.currentlyEditing = this.colorProperties[data.index]
      this.currentlyEditing['index'] = data.index
      data.event.target.closest('button').setAttribute('tabindex', -1)
    },
    setToDefault: function () {
      this.currentColor = this.colorProperties[this.currentlyEditing.index]
    },
    doneEditing: function () {
      this.currentlyEditing = null
      document.querySelector('.themeSetColor[tabindex="-1"').removeAttribute('tabindex')
    },
    resetAllToDefault: function () {
      this.$refs.themeColor.forEach(color => {
        document.documentElement.style.setProperty(`--${color.meta.prefix}-${color.meta.name}`, color.meta.hex)
      })
    },
    getChangedThemeColors: function () {
      var colorObj = themeProps.find(({ name }) => name === this.currentlyEditing.name)
      var currentColor = this.currentColor
      if (colorObj.hex !== currentColor) {
        if (!this.changedThemeColors.includes(colorObj.name)) {
          this.changedThemeColors.push(colorObj.name)
        }
        this.returnToDefault = true
      } else {
        if (this.changedThemeColors.includes(colorObj.name)) {
          this.changedThemeColors = this.changedThemeColors.filter(function (oldColor) {
            return oldColor !== colorObj.name
          })
        }
        this.returnToDefault = false
      }
      var appValue = this.$parent.themeValues.find(({ name }) => name === this.currentlyEditing.name)
      appValue.hex = currentColor
    }
  },
  computed: {
    currentColor: {
      cache: false,
      get: function () {
        if (this.currentlyEditing) {
          return window.getComputedStyle(document.documentElement).getPropertyValue(`--${this.currentlyEditing.prefix}-${this.currentlyEditing.name}`).toLowerCase().trim()
        } else {
          return null
        }
      },
      set: function (color) {
        document.documentElement.style.setProperty(`--${this.currentlyEditing.prefix}-${this.currentlyEditing.name}`, color.hex.toLowerCase().trim())
        this.$nextTick(() => {
          this.getChangedThemeColors()
        })
      }
    }
  }
}
</script>
