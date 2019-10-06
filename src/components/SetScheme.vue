<template>
  <section>
    <color-popup @current-color="receiveEmission($event)" @hide-tip="hideTip = true" v-if="editing" :editing="editing" />
    <h2 class="description" style="grid-row: 1;">Description</h2>
    <div class="changers" style="grid-row: 1;">
      <h2>FG</h2>
      <h2>BG</h2>
      <h2>Eff</h2>
    </div>
    <div class="inode" v-for="(result, index) in $root.$data.inodes" :key="index" :data-code="result.code">
      <span class="description"
            :class="{selected: $root.$data.currentScheme == result.code}"
            :style="`grid-row: ${index + 2}`"
            @click="setEditing('fg', result.bg, index)">
        {{result.description}}
      </span>
      <div class="changers"
           :style="`grid-row: ${index + 2}`"
           >
        <button @click="setEditing('fg', result.fg, index)"
                class="change color fg"
                :class="{ editing: editing != null && index == editing.index && editing.representing == 'fg'}"
                :data-applied="result.fg"
                @focus="$root.$data.currentScheme = result.code"
                @blur="evalCurrentScheme" />
        <button @click="setEditing('bg', result.bg, index)"
                class="change color bg"
                :class="{ editing: editing != null && index == editing.index && editing.representing == 'bg'}"
                :data-applied="result.bg" />
        <button @click="setEditing('eff', result.eff, index)"
                class="change eff"
                :class="{ editing: editing != null && index == editing.index && editing.representing == 'eff' }"
                :ref="`eff-${index}`"
                :data-applied="result.eff" />
      </div>

    </div>
  </section>
</template>

<script>
import ColorPopup from './ColorPopup'
// import { inodes as inodesCopy } from './inodes.js'

export default {
  name: 'SetScheme',
  components: {
    // eslint-disable-next-line
    ColorPopup
  },
  data () {
    return {
      // inodesCopy: inodesCopy,
      editing: null,
      representing: null,
      currentValue: null,
      hideTip: false,
      isBold: false
    }
  },
  watch: {
    editing: function () {
      this.checkIfBold()
    }
  },
  methods: {
    receiveEmission (event) {
      this.$root.$data.inodes[event.index][event.representing] = event.color
    },
    setEditing (representing, currentValue, index) {
      if (this.editing) {
        this.editing = null
      }
      this.$nextTick(() => {
        this.editing = { representing: representing, currentValue: currentValue, index: index }
        this.$root.$data.currentScheme = this.$root.$data.inodes[index].code
      })
    },
    evalCurrentScheme () {
      if (!this.editing) {
        this.$root.$data.$currentScheme = null
      }
    },
    checkIfBold () {
      if (this.editing) {
        var index = this.editing.index
        if (this.$root.$data.inodes[index].eff === '01') {
          this.isBold = true
        }
      } else {
        this.isBold = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>

@import '../scss/vars';

section {
  display: contents;
}

h2 {
  font-size: 1.2em;
  text-align: right;
  margin: .5rem 0;
}

.description {
  grid-column: 1 / 2;
  width: max-content;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
  word-break: break-word;
  cursor: pointer;
  user-select: none;
  justify-self: self-end;
  align-self: center;

  &.selected {
    font-weight: bold;
  }
}

.change {
  cursor: pointer;
}

.editing {
  outline: solid .25rem var(--t-bg);
}

.changers {
  grid-column: 2 /3;
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: .5rem;
  align-items: center;
  padding: 0 .5rem;

  h2 {
    width: 0;
  }
}

.inode {
  display: contents;
}

.change {
  justify-self: center;
  height: 1.5em;
  width: 1.5em;
  border: solid 1px var(--t-bg);

  &.color[data-applied="0"] {
    background-image: $clear;
  }

  &.eff[data-applied="00"]:after {
    content: 'N';
  }

  &.eff[data-applied="01"]:after {
    content: 'B';
    font-weight: bold;
  }

  &.eff[data-applied="04"]:after {
    content: 'U';
    text-decoration: underline;
  }

  &:focus {
    outline: solid 3px var(--t-bg);
  }
}
</style>
