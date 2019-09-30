<template>
  <section ref="allInodes">
    <div class="inode" v-for="(result, index) in $root.$data.inodes" :key="index" :data-code="result.code">
      <span tabindex="0"
            class="description"
            :class="{selected: $root.$data.currentScheme == result.code}"
            @click="selectInode(result.code)"
            @keyup.space="selectInode(result.code)"
            @keyup.enter="selectInode(result.code)">
        {{result.description}}
      </span>
      <div class="changers" v-if="$root.$data.currentScheme == result.code">
        <button @click="openPopup('fg', $event, index, result.fg, inodesCopy[index])"
                class="change color fg"
                :data-applied="result.fg" />
        <button @click="openBg($event, index)"
                class="change color bg"
                :data-applied="result.bg" />
        <button @click="openEff($event, index)"
                class="change effect"
                :data-applied="result.eff" />
      </div>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import ColorPopup from './ColorPopup'

const Popup = Vue.extend(ColorPopup)

export default {
  name: 'SetScheme',
  components: {
    // eslint-disable-next-line
    ColorPopup
  },
  data () {
    return {
      gridHeaders: `
      <h2 class="header fg"><abbr title="foreground">FG</abbr></h2>
      <h2 class="header bg"><abbr title="background">BG</abbr></h2>
      <h2 class="header effect"><abbr title="effect">Eff</abbr></h2>`,
      inodesCopy: []
    }
  },
  methods: {
    selectInode (code) {
      this.$root.$data.currentScheme = code
    },
    openPopup (type, event, code, initial, defaults) {
      let panel = this.$refs.allInodes
      var newPopup = new Popup({
        propsData: {
          tiles: 'fg',
          inodeIndex: code,
          initialValue: initial,
          defaults: defaults
        }
      })
      newPopup.$mount()
      panel.insertBefore(newPopup.$el, panel.childNodes[0])
    },
    openBg (event, code) {

    },
    openEff (event, code) {

    }
  },
  mounted: function () {
    this.inodesCopy = JSON.parse(JSON.stringify(this.$root.$data.inodes))
  }
}
</script>

<style lang="scss" scoped>

@import '../scss/vars';

button:not([class]) {
  color: var(--p-link);
  cursor: pointer;

  &:focus {
    text-decoration: underline;
  }
}

.description {
  grid-column: 1;
  width: auto;
  padding-right: 1em;
  display: flex;
  border-left-width: 3px;
  border-left-style: solid;
  border-left-color: var(--t-bg);
  margin-left: -3px;
  padding-left: calc(1em + 3px);
  transition: margin-left .3s ease-out, padding-left .3s ease-out;

  &::after {
    min-width: 2em;
    content: '';
    flex: 1;
    margin-left: 1.5em;
    border-bottom: dashed 2px currentColor;
    opacity: 0;
  }

  &:hover, &:focus {
    border-left-width: 3px;
    padding-left: 1em;
    margin-left: 0;
    outline: 0;
  }

  &.selected {
    padding-left: 1em;
    margin-left: 0;
  }

  &.selected::after {
    opacity: .5;
  }
}

.description, .change {
  cursor: pointer;
}

.changers {
  display: contents;
}

.change.fg {
  grid-column: 2;
}

.change.bg {
  grid-column: 3;
}

.change.effect {
  grid-column: 4;
}

.inode {
  display: contents;

  span {
    min-height: 1.5em;
    display: flex;
    align-items: center;
    display: inline-flex;
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-all;
    word-break: break-word;
  }
}

section {
  display: inline-grid;
  align-items: center;
  grid-template-columns: 1fr repeat(3, 5ch) auto;
  position: relative;
}

.change {
  justify-self: center;
  height: 1.5em;
  width: 1.5em;
  border: solid 1px var(--t-bg);

  &.color[data-applied="0"] {
    background-image: $clear;
  }

  &.effect[data-applied="00"]:after {
    content: 'N';
  }

  &.effect[data-applied="01"]:after {
    content: 'B';
    font-weight: bold;
  }

  &.effect[data-applied="04"]:after {
    content: 'U';
    text-decoration: underline;
  }

  &:focus {
    outline: solid 3px var(--t-bg);
  }
}
</style>
