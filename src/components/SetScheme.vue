<template>
  <section>
    <div>
      {{currentlyEditing.description}}
    </div>
    <!-- <color-popup @current-color="receiveEmission($event)" @hide-tip="hideTip = true" v-if="editing" :editing="editing" /> -->
    <!-- <div class="inode" v-for="(result, index) in $parent.$data.inodes" :key="index" :data-code="result.code">
      <span class="description"
            :class="{selected: $parent.$data.currentScheme == result.code}"
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
                @focus="$parent.$data.currentScheme = result.code"
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
    </div> -->
  </section>
</template>

<script>
import ColorPopup from './ColorPopup'
// import { inodes as inodesCopy } from './inodes.js'

export default {
  name: 'SetScheme',
  props: {
    currentlyEditing: Object
  },
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
      isBold: false,
      changes: []
    }
  },
  watch: {
    editing: function () {
      this.checkIfBold()
    }
  },
  methods: {
    receiveEmission (event) {
      var copy = this.$parent.$data.inodes
      var original = this.$parent.$data.inodesDefault
      var code = original[event.index].code
      var find = this.changes.find(o => { return o.code === code })
      copy[event.index][event.representing] = event.color
      if (copy[event.index][event.representing] != original[event.index][event.representing]) {
        var obj
        var push
        if (find) {
          obj = find
          push = false
        } else {
          obj = new Object()
          push = true
        }
        obj.code = code
        obj[event.representing] = event.color
        push && this.changes.push(obj)
      } else {
        if (find) {
          delete find[event.representing]
          if (!find.fg && !find.bg && !find.eff) {
            console.log(`${find} is empty`)
            var index = this.changes.findIndex(o => { return o.code === code })
            console.log(index)
            this.changes.splice(index, 1)
          } else {
            console.log(find.fg, find.bg, find.eff)
          }
        }
      }
    },
    setEditing (representing, currentValue, index) {
      if (this.editing) {
        this.editing = null
      }
      this.$nextTick(() => {
        this.editing = { representing: representing, currentValue: currentValue, index: index }
        this.$parent.$data.currentScheme = this.$parent.$data.inodes[index].code
      })
    },
    evalCurrentScheme () {
      if (!this.editing) {
        this.$parent.$data.$currentScheme = null
      }
    },
    checkIfBold () {
      if (this.editing) {
        var index = this.editing.index
        if (this.$parent.$data.inodes[index].eff === '01') {
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
  grid-column: 3 / 4;
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
  grid-column: 2 / 3;
  display: grid;
  display: none;
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
