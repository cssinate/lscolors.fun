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
        if (tile === this.default) {
        return 'This is the default value'
      }
    },
    emitValue () {
      this.$emit('input', this.currentStyle)
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
