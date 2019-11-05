<template>
  <section
    ref="terminal"
    class="terminal"
  >
    <component
      v-for="(result, index) in $parent.$data.inodes"
      :key="index"
      :class="{
        active: result.code == currentlyEditing.code && isStyle
      }"
      class="inode"
      @click="emitEditing(result)"
      @keydown.down="nextNode($event, index)"
      @keydown.up="previousNode($event, index)"
      :id="`b-${result.code}`"
      :data-fg="result.fg"
      :data-bg="result.bg"
      :data-eff="result.eff"
      :ref="`inode-${result.code}`"
      :is="isStyle ? 'button' : 'div'"
      :title="changedCodes.includes(result.code) ? 'Modified from default' : ''" >
      {{result.short ? result.short : result.description}}{{changedCodes.includes(result.code) ? '*' : ''}}
    </component>
  </section>
</template>

<script>
export default {
  props: {
    currentlyEditing: Object,
    isStyle: {
      type: Boolean,
      default: false
    },
    changes: Array
  },
  data: function () {
    return {
      changedCodes: []
    }
  },
  methods: {
    emitEditing (obj) {
      if (this.isStyle) {
        this.$emit('edit-change', obj)
      }
    },
    previousNode (event, index) {
      if (event.target.previousElementSibling) {
        event.target.previousElementSibling.focus()
        this.emitEditing(this.$parent.$data.inodes[index - 1])
      }
    },
    nextNode (event, index) {
      if (event.target.nextElementSibling) {
        event.target.nextElementSibling.focus()
        this.emitEditing(this.$parent.$data.inodes[index + 1])
      }
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      this.$refs.terminal.style.setProperty('--inode-count', this.$parent.$data.inodes.length)
    })
  },
  watch: {
    changes: function () {
      this.changedCodes = []
      this.changes.forEach(change => {
        this.changedCodes.push(change.code)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/vars';

.terminal {
  min-width: 22ch;
}

.terminal > * {
  white-space: nowrap;
  user-select: none;
}

.inode {
  color: var(--t-fg);
  width: min-content;
  position: relative;
  box-sizing: border-box;
  line-height: 1.5;
  display: block;
  // margin-left: 2ch;
}

button.inode {
  cursor: pointer;
}

[data-eff="01"] {
  font-weight: bold;
}

[data-eff="04"] {
  text-decoration: underline;
}

.inode:focus::before {
  content: '$';
  color: var(--t-fg);
  background-color: var(--t-bg);
  position: absolute;
  right: calc(100% + 1ch);
}

.inode.active::after {
  content: '';
  display: inline-block;
  width: 1ch;
  height: .2rem;
  position: absolute;
  top: calc(100% - .2rem);
  left: calc(100% + .1rem);
  animation: blink 1.5s steps(2, jump-none) infinite;
  background-color: var(--a-brightGreen);
}

.changed::before {
  content: '*'
}

@keyframes blink {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

</style>
