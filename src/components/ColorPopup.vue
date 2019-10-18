<template>
  <div class="container"
       :class="{bright: representing === 'fg' && isBold}"
       @keydown.esc="$parent.editing = null">

    <button class="popup-tile done" @click="closePopup"></button>
    <aside class="boldInfo" v-if="isBold && !hideTip && representing === 'fg'">
      <header>
        <h3>FYI</h3>
        <svg viewBox="0 0 14 14" @click="emitHideTip()">
          <line x1="4" y1="4" x2="10" y2="10" />
          <line x1="10" y1="4" x2="4" y2="10" />
        </svg>
      </header>
      <p>Dark colors will render as bright in the terminal if the Bold effect is applied.</p>
    </aside>
  </div>
</template>

<script>

export default {
  name: 'ColorPopup',
  props: {
    editing: {
      type: Object,
    },
    defaults: {
      type: Object,
    }
  },
  data () {
    return {
      hideTip: this.$parent.hideTip,
      isBold: this.$parent.isBold
    }
  },
  watch: {

  },
  directives: {

  },
  mounted: function () {

  },
  computed: {
    representing: function () {
      if (this.editing) {
        return this.editing.representing
      }
    },
    currentColor: function () {
      if (this.editing) {
        return this.editing.value
      }
    },
    tileSet: function () {
      if (this.representing === 'fg') {
        return [
          { value: '0', name: 'None' },
          { value: '30', name: 'Black' },
          { value: '31', name: 'Red' },
          { value: '32', name: 'Green' },
          { value: '33', name: 'Yellow' },
          { value: '34', name: 'Blue' },
          { value: '35', name: 'Magenta' },
          { value: '36', name: 'Cyan' },
          { value: '37', name: 'White' },
          { value: '90', name: 'Bright Black' },
          { value: '91', name: 'Bright Red' },
          { value: '92', name: 'Bright Green' },
          { value: '93', name: 'Bright Yellow' },
          { value: '94', name: 'Bright Blue' },
          { value: '95', name: 'Bright Magenta' },
          { value: '96', name: 'Bright Cyan' },
          { value: '97', name: 'Bright White' }
         ]
      } else if (this.currentColor === 'bg') {
        return [
          { value: '40', name: 'None' },
          { value: '41', name: 'Red' },
          { value: '42', name: 'Green' },
          { value: '43', name: 'Yellow' },
          { value: '44', name: 'Blue' },
          { value: '45', name: 'Magenta' },
          { value: '46', name: 'Cyan' },
          { value: '47', name: 'White' },
          { value: '100', name: 'Bright Black' },
          { value: '101', name: 'Bright Red' },
          { value: '102', name: 'Bright Green' },
          { value: '103', name: 'Bright Yellow' },
          { value: '104', name: 'Bright Blue' },
          { value: '105', name: 'Bright Magenta' },
          { value: '106', name: 'Bright Cyan' },
          { value: '107', name: 'Bright White' }
      ]
      } else {
        return [
          { value: '00', name: 'None' },
          { value: '01', name: 'Bold' },
          { value: '04', name: 'Underline' }
        ]
      }
    }

  },
  methods: {
    getTitle (tile, representing) {
      /* eslint-disable-next-line */
      if (tile == this.defaults[this.representing]) {
        return 'This is the default value'
      }
    },
    emitColor (index, representing, color) {,
      this.$emit('current-color' { index: index, representing: representing, color: color })
    },
    emitHideTip () {
      this.$emit('hide-tip')
      this.hideTip = true
    },
    closePopup () {
      document.querySelector(`[data-code="${this.defaults.code}"] .change.${this.representing}`).focus()
      this.$parent.editing = null
    }
  }
}
</script>

<style scoped lang="scss">

@import '../scss/vars';

  .boldInfo {
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: var(--t-bg);
    padding: 1rem;

    header {
      margin-bottom: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    svg {
      height: 1.5rem;
      width: 1.5rem;
      stroke: var(--t-fg);
      cursor: pointer;
    }

    p {
      width: 20ch;
    }
  }





  @mixin none {
    background-image: $clear, linear-gradient(#FFF, #FFF);
    background-repeat: no-repeat, no-repeat;
    background-size: 1.75rem, 100%;
    background-position: 50% 50%, 0% 0%;
  }

  [data-output="0"],
  [data-output="40"] {
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
