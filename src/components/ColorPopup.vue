<template>
  <div class="container">
    <button v-for="(tile, index) in tileSet" :key="index" :data-representing="representing" :data-output="tile">{{tile}}</button>
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
    orientation: String
  },
  data () {
    return {
      tileSet: [],
      representing: ''
    }
  },
  mounted: function () {
    if (this.tiles === 'fg') {
      this.tileSet = ['30', '31', '32', '33', '34', '35', '36', '37', '90', '91', '92', '93', '94', '95', '96', '97', 'none', 'done']
      this.representing = 'fg'
    }
  }
}
</script>

<style scoped lang="scss">

@import '../scss/vars';
  .container {
    position: absolute;
    background-color: var(--t-bg);
    color: var(--t-fg);
    border: solid 3px currentColor;
    display: grid;
    grid-template-columns: repeat(2, 1.5em);
    grid-auto-flow: column;
    grid-gap: .5em;
    padding: .5em;

    button {
      color: var(--t-fg);
      border: solid 1px currentColor;
      height: 1.5em;
      width: 1.5em;
    }
  }

  [data-output^="3"] {
    grid-column: 1;
  }

  [data-output^="9"] {
    grid-column: 2;
  }

  [data-output="none"] {
    grid-column: 1;
  }

  [data-output="done"] {
    grid-column: 2;
  }

</style>
