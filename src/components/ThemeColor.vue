<template>
  <div class="changeColor">
    <span class="name">{{meta.friendly}}</span>
    <span class="hex">{{colors.hex}}</span>
    <color-picker v-model="colors" />
  </div>
</template>

<script>
import ColorPicker from './ColorPicker'

import 'verte/dist/verte.css'

export default {
  components: {
    ColorPicker
  },
  props: {
    value: String,
    meta: Object
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
  }
}
</script>

<style scoped lang="scss">
.changeColor {
  display: contents;

  span {
    color: var(--t-bg);
  }

  .hex {
    font-family: "SFMono-Regular", "Liberation Mono", Menlo, Courier, monospace;
  }

  .name {
    user-select: none;
    white-space: nowrap;
  }
}

/deep/ .verte__input {
    font-family: "SFMono-Regular", "Liberation Mono", Menlo, Courier, monospace;
}

/deep/ .verte__menu {
  outline: solid 3px var(--t-bg);
}

/deep/ .verte {
  border: solid 1px var(--t-bg);
  cursor: pointer;
  height: 1.5rem;
  width: 1.5rem;
}

/deep/ .verte__model {
  display: none;
}

.changeColor:nth-child(odd) {
  /deep/ .verte {
    grid-column: 2;
  }
  .name {
    grid-column: 1;
  }
  .hex {
   grid-column: 3;
  }
}

.changeColor:nth-child(even) {
  /deep/ .verte {
    grid-column: 6;
  }
  .name {
    grid-column: 5;
  }
  .hex {
   grid-column: 7;
  }
}
</style>
