<template>
  <button class="themeSetColor"
          @click="$emit('color-selected', index)">
    <span class="themeSetColor_name">{{meta.friendly}}</span>
    <div class="themeSetColor_preview" :style="`background-color: var(--${meta.prefix}-${meta.name})`"></div>
    <span class="hex" v-show="false">{{colors.hex}}</span>
    <!-- <color-picker v-model="colors" /> -->
  </button>
</template>

<script>
// import ColorPicker from './ColorPicker'

export default {
  components: {
    // ColorPicker
  },
  props: {
    value: String,
    meta: Object,
    index: Number
  },
  data () {
    return {
      colors: { hex: this.value }
    }
  },
  watch: {
    colors: function () {
      this.value = this.colors.hex
      document.documentElement.style.setProperty(`--${this.meta.prefix}-${this.meta.name}`, this.colors.hex)
      this.$emit('input', this.value)
    }
  },
  methods: {
    editingThis: function (index) {
      this.$emit('color-selected', index)
    }
  }
}
</script>

<style scoped lang="scss">
// .changeColor {
//   display: contents;

//   span {
//     color: var(--t-bg);
//   }

//   .hex {
//     font-family: "SFMono-Regular", "Liberation Mono", Menlo, Courier, monospace;
//   }

//   .name {
//     user-select: none;
//     white-space: nowrap;
//   }
// }

// /deep/ .verte__input {
//     font-family: "SFMono-Regular", "Liberation Mono", Menlo, Courier, monospace;
// }

// /deep/ .verte__menu {
//   outline: solid 3px var(--t-bg);
// }

// /deep/ .verte {
//   border: solid 1px var(--t-bg);
//   cursor: pointer;
//   height: 1.5rem;
//   width: 1.5rem;
// }

// /deep/ .verte__model {
//   display: none;
// }

// .changeColor:nth-child(odd) {
//   /deep/ .verte {
//     grid-column: 2;
//   }
//   .name {
//     grid-column: 1;
//   }
//   .hex {
//    grid-column: 3;
//   }
// }

// .changeColor:nth-child(even) {
//   /deep/ .verte {
//     grid-column: 6;
//   }
//   .name {
//     grid-column: 5;
//   }
//   .hex {
//    grid-column: 7;
//   }
// }
</style>
