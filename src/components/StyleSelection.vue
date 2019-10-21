<template>
  <div>
    <h3>{{area}}: {{styleName}}</h3>
    <div class="style-tile-wrapper" :class="area">
      <label :data-output="tile.value"
              v-for="(tile) in tileSet"
              :key="tile.value"
              :class="[{'selected': tile.value == currentStyle, 'default': tile.value == typeDefault, 'style-tile--none': tile.value === '0' || tile.value === '00' }, tileClass]"
              class="style-tile"
              :title="getTitle(tile.value)"
              @keydown.left="moveLeft()"
              @keydown.right="moveRight()"
              @keydown.down="moveDown(tile.value)"
              @keydown.up="moveUp(tile.value)"
              >
        <span v-if="tile.value === '0' || tile.value === '00'">X</span>
        <span v-if="tile.value === '01'" style="font-weight: bold;">B</span>
        <span v-if="tile.value === '04'" style="text-decoration: underline;">U</span>
        <div class="selector" v-if="tile.value == currentStyle"></div>
        <input type="radio"
               :value="tile.value"
               v-model="currentStyle"
               :ref="`${area}-input`"
               :data-name="tile.name"
               @change="emitValue()">
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    default: null,
    tiles: Array,
    value: null,
    area: {
      type: String,
      required: true
    }
  },
  data: function () {
    return {
      tileSet: null,
      currentStyle: null,
      typeDefault: null,
      currentValue: null,
      styleName: 'None'
    }
  },
  mounted: function () {
    this.tileSet = this.tiles
    this.typeDefault = this.default
    this.currentStyle = this.value
  },
  methods: {
    getTitle (tile) {
      /* eslint-disable-next-line */
      if (tile == this.typeDefault) {
        return 'This is the default value'
      }
    },
    emitValue () {
      this.$emit('input', this.currentStyle)
    },
    moveLeft (event) {
      if (document.activeElement.closest('label').previousElementSibling) {
        document.activeElement.closest('label').previousElementSibling.querySelector('input').focus()
      } else {
        if (document.activeElement.closest('label').classList.contains('bg')) {
          document.querySelector('.fg[data-output="97"] input').focus()
        } else if (document.activeElement.closest('label').classList.contains('eff')) {
          document.querySelector('.bg[data-output="107"] input').focus()
        }
      }
    },
    moveRight (event) {
      if (document.activeElement.closest('label').nextElementSibling) {
        document.activeElement.closest('label').nextElementSibling.querySelector('input').focus()
      } else {
        if (document.activeElement.closest('label').classList.contains('fg')) {
          document.querySelector('.bg[data-output="0"] input').focus()
        } else if (document.activeElement.closest('label').classList.contains('bg')) {
          document.querySelector('.eff[data-output="00"] input').focus()
        }
      }
    },
    moveUp (value) {
      if (value >= 90 && value < 110 && value != 100) {
        document.querySelector(`[data-output="${parseInt(value) - 60}"] input`).focus()
      } else if (value == 100) {
        document.querySelector(`.bg[data-output="0"] input`).focus()
      } else if (value > 40 && value < 50) {
        document.querySelector(`[data-output="${parseInt(value) + 49}"] input`).focus()
      } else if (value == '00' || value === '01') {
        document.querySelector(`[data-output="${parseInt(value) + 100}"] input`).focus()
      } else if (value === '04') {
        document.querySelector(`[data-output="102"] input`).focus()
      } else if (document.activeElement.closest('label').classList.contains('bg')) {
        document.querySelector('.fg[data-output="0"] input').focus()
      }
    },
    moveDown (value) {
      if (value >= 90 && value < 100) {
        document.querySelector(`[data-output="${parseInt(value) - 49}"] input`).focus()
      } else if ((value >= 40 && value < 50) || (value >= 30 && value < 40)) {
        document.querySelector(`[data-output="${parseInt(value) + 60}"] input`).focus()
      } else if (value == 100) {
        document.querySelector(`[data-output="00"] input`).focus()
      } else if (value == 101) {
        document.querySelector(`[data-output="01"] input`).focus()
      } else if (value == 102) {
        document.querySelector(`[data-output="04"] input`).focus()
      } else if (document.activeElement.closest('label').classList.contains('fg')) {
        document.querySelector('.bg[data-output="0"] input').focus()
      } else if (document.activeElement.closest('label').classList.contains('bg')) {
        document.querySelector('[data-output="100"] input').focus()
      }
    }
  },
  computed: {
    tileClass: function () {
      if (this.area === 'Foreground') {
        return 'fg'
      } else if (this.area === 'Background') {
        return 'bg'
      } else {
        return 'eff'
      }
    }
  },
  watch: {
    value: function () {
      this.currentStyle = this.value
      this.$nextTick(function () {
        let inputs = this.$refs[`${this.area}-input`]
        let checkedInput = inputs.find(({ checked }) => checked === true)
        this.styleName = checkedInput.getAttribute('data-name')
      })
    }
  }
}
</script>

<style lang="scss">

</style>
