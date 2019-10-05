<template>
  <div class="container" tabindex="-1" v-focus @keydown.esc="$parent.editing = null">
    <label :data-output="tile"
            v-for="(tile, index) in tileSet"
            :key="index"
            :class="[{default: tile === defaults[representing], selected: tile === currentColor}, representing]"
            class="popup-tile"
            v-on:change="emitColor(callerIndex, representing, currentColor)"
            :title="getTitle(tile, representing)"
            >
      <input type="radio"
            :value="tile"
            v-model="currentColor">
    </label>
    <button class="popup-tile done" @click="emitDone"></button>
  </div>
</template>

<script>
export default {
  name: 'ColorPopup',
  props: {
    editing: {
      type: Object,
      required: true
    }
    // tiles: {
    //   type: String,
    //   required: true
    // },
    // initialValue: null,
    // defaults: Object,
    // orientation: String
  },
  data () {
    return {
      tileSet: [],
      representing: this.editing.representing,
      currentColor: this.editing.currentValue,
      defaults: this.editing.defaults,
      callerIndex: this.editing.index
    }
  },
  directives: {
    focus: {
      bind: function (el) {
        // BAD HACK - I can't figure out how else to get focus here
        setTimeout(function () {
          el.focus()
        }, 50)
      }
    }
  },
  mounted: function () {
    if (this.representing === 'fg') {
      this.tileSet = ['0', '30', '31', '32', '33', '34', '35', '36', '37', '90', '91', '92', '93', '94', '95', '96', '97']
      this.representing = 'fg'
      this.getRows(12)
    } else if (this.representing === 'bg') {
      this.tileSet = ['0', '41', '42', '43', '44', '45', '46', '47', '100', '101', '102', '103', '104', '105', '106', '107']
      this.representing = 'bg'
      this.getRows(11)
    } else {
      this.tileSet = ['00', '01', '04']
      this.representing = 'eff'
      this.getRows(6)
    }
  },
  methods: {
    getTitle (tile, representing) {
      if (tile === this.defaults[this.representing]) {
        return 'This is the default value'
      }
    },
    emitColor (index, representing, color) {
      this.$emit('current-color', { index: index, representing: representing, color: color })
    },
    emitDone () {
      this.$emit('editing')
    },
    getRows (height) {
      if (this.callerIndex + height <= this.$root.$data.inodes.length) {
        document.documentElement.style.setProperty('--popup-row-start', this.callerIndex + 3)
        document.documentElement.style.setProperty('--popup-row-end', this.callerIndex + height + 1)
      } else {
        document.documentElement.style.setProperty('--popup-row-start', this.callerIndex + 4 - height)
        document.documentElement.style.setProperty('--popup-row-end', this.callerIndex + 2)
      }
    },
  }
}
</script>

<style scoped lang="scss">

@import '../scss/vars';

  .container {
    grid-column: 2 / 3;
    grid-row: var(--popup-row-start) / var(--popup-row-end);
    background-color: var(--t-bg);
    color: var(--t-fg);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 2rem;
    grid-auto-flow: column;
    z-index: 2;
    align-items: center;
    justify-items: center;
    margin: 0 .25rem;
  }

  .popup-tile {
    cursor: pointer;
    color: var(--t-fg);
    border: solid 1px currentColor;
    height: calc(100% - .75rem);
    width: calc(100% - .75rem);

    &.default {
      border: dotted 2px var(--t-fg);
    }
    &:focus-within {
      outline: dashed 2px var(--t-fg);
    }
    &.selected {
      outline: solid 2px var(--t-fg);
    }
  }

  input {
    opacity: 0;
    cursor: pointer;
    position: absolute;
  }

  [data-output^="3"],
  [data-output^="4"] {
    grid-column: 1;
  }

  [data-output^="9"],
  [data-output^="1"] {
    grid-column: 2;
  }

  @mixin none {
    background-image: $clear, linear-gradient(#FFF, #FFF);
    background-repeat: no-repeat, no-repeat;
    background-size: 1.75rem, 100%;
    background-position: 50% 50%, 0% 0%;
  }

  [data-output="0"] {
    @include none;
    grid-column: 1;

    &.fg {
      grid-column: 1 / 3;
    }
  }

  [data-output="00"],
  [data-output="01"],
  [data-output="04"] {
    grid-column: 1 / 3;
    text-align: center;
  }

  [data-output="00"]::after {
    content: "Normal"
  }

  [data-output="01"]::after {
    content: "Bold";
    font-weight: bold;
  }

  [data-output="04"]::after {
    content: "Underline";
    text-decoration: underline;
  }
  .popup-tile.done {
    grid-column: 1 / 3;

    &::after {
      content: 'done';
    }
  }

</style>
