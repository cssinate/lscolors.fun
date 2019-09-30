<template>
  <div style="display: contents;">
    <div class="overlay">
    </div>
    <div class="container">
      <button class="popup-tile"
              v-for="(tile, index) in tileSet"
              :key="index"
              :data-representing="representing"
              :data-output="tile"
              @click="setColor(representing, tile)"></button>
      <button class="popup-tile done"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColorPopup',
  props: {
    tiles: {
      type: String,
      required: true
    },
    inodeIndex: Number,
    initialValue: null,
    defaults: Object,
    orientation: String
  },
  data () {
    return {
      tileSet: [],
      representing: ''
    }
  },
  mounted: function () {
    let defaultValue = this.defaults[this.tiles]
    if (defaultValue === 0 || defaultValue === '00') {
      defaultValue = 'none'
    }
    let initialValue = this.defaults[this.tiles]
    if (initialValue === 0 || initialValue === '00') {
      initialValue = 'none'
    }
    this.generateTileSet(this.tiles).then(() => {let defaultTile = document.querySelector(`[data-output="${defaultValue}"]`)
        defaultTile.classList.add('default')
        defaultTile.setAttribute('title', 'This is the default value')
        let initialTile = document.querySelector(`[data-output="${initialValue}"]`)
        initialTile.classList.add('selected')})

  },
  methods: {
    setColor(prop, val) {
      this.$emit(console.log("testing"))
    },
    generateTileSet(tiles, defaultValue, initialValue) {
      if (tiles === 'fg') {
        this.tileSet = ['none', '30', '31', '32', '33', '34', '35', '36', '37', '90', '91', '92', '93', '94', '95', '96', '97']
        this.representing = 'fg'
      };
    }
  }
}
</script>

<style scoped lang="scss">

@import '../scss/vars';

  .overlay {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
    // clip-path: polygon(0% 0%, 0% 100%, 150px 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0%);
  }
  .container {
    position: absolute;
    background-color: var(--t-bg);
    color: var(--t-fg);
    border: solid 3px currentColor;
    display: grid;
    grid-template-columns: repeat(2, 1.5em);
    grid-auto-rows: 1.5em;
    grid-auto-flow: column;
    grid-gap: .5em;
    padding: .5em;
    z-index: 2;

  }

  .popup-tile {
    cursor: pointer;
    color: var(--t-fg);
    border: solid 1px currentColor;

    &.default {
      border: dotted 2px var(--t-fg);
    }
    &.selected {
      outline: solid 2px var(--t-fg);

    }
  }

  [data-output^="3"],
  [data-output^="4"] {
    grid-column: 1;
  }

  [data-output^="9"],
  [data-output^="1"] {
    grid-column: 2;
  }

  [data-output="40"] {
    background-image: $clear;
    background-repeat: no-repeat;
  }

  [data-output="none"] {
    grid-column: 1;
    background-image: $clear;
    background-repeat: no-repeat;

    &[data-representing="fg"] {
      grid-column: 1 / 3;
    }
  }

  .popup-tile.done {
    grid-column: 1 / 3;

    &::after {
      content: 'done';
    }
  }

</style>
