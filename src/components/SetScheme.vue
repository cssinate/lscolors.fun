<template>
  <div>
    <div>
      <scheme-color
        ref="schemeColor"
        v-for="(color, index) in colorProperties"
        :meta="color"
        :key="index"
        :index="index"
        :changed="changedSchemeColors.includes(color.name)"
        :title="changedSchemeColors.includes(color.name) ? 'Modified from default' : ''"
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
import SchemeColor from './SchemeColor'
import { schemeProps } from '../mixins/schemeProperties.js'

export default {
  components: {
    SchemeColor,
    ColorPicker
  },
  data () {
    return {
      colorProperties: schemeProps,
      currentlyEditing: null,
      changedSchemeColors: [],
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
      document.querySelector('.schemeSetColor[tabindex="-1"').removeAttribute('tabindex')
    },
    resetAllToDefault: function () {
      this.$refs.schemeColor.forEach(color => {
        document.documentElement.style.setProperty(`--${color.meta.prefix}-${color.meta.name}`, color.meta.hex)
      })
    },
    getChangedSchemeColors: function () {
      var colorObj = schemeProps.find(({ name }) => name === this.currentlyEditing.name)
      var currentColor = this.currentColor
      if (colorObj.hex !== currentColor) {
        if (!this.changedSchemeColors.includes(colorObj.name)) {
          this.changedSchemeColors.push(colorObj.name)
        }
        this.returnToDefault = true
      } else {
        if (this.changedSchemeColors.includes(colorObj.name)) {
          this.changedSchemeColors = this.changedSchemeColors.filter(function (oldColor) {
            return oldColor !== colorObj.name
          })
        }
        this.returnToDefault = false
      }
      this.$emit('new-change', { area: this.currentlyEditing.prefix, name: this.currentlyEditing.name, color: this.currentColor })
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
          this.getChangedSchemeColors()
        })
      }
    }
  },
  watch: {
    currentColor: function () {

    }
  }
}
</script>
