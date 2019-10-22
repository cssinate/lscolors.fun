<template>
  <section
    ref="terminal"
    class="terminal"
  >
    <component
      v-for="(result, index) in $parent.$data.inodes"
      :key="index"
      :class="{
        active: result.code == currentlyEditing.code && isScheme
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
      :is="isScheme ? 'button' : 'div'"
      :title="changedCodes.includes(result.code) ? 'Modified from default' : ''" >
      {{result.short ? result.short : result.description}}{{changedCodes.includes(result.code) ? '*' : ''}}
    </component>
  </section>
</template>

<script>
export default {
  props: {
    currentlyEditing: Object,
    isScheme: {
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
      if (this.isScheme) {
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
  margin-left: 2ch;
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

<!--/*

https://gist.github.com/jmoz/280005/3dca508fb193b6ae5d1f4a3f21efc7d90ecb0bde

# di=5;34;43 Setting the LS_COLORS di parameter to the above example will make directories appear in flashing blue text with an orange background
#0 =  Default Colour
#1 = Bold
#4 = Underlined
#5 = Flashing Text
#7 = Reverse Field
#31 =    Red
#32 =    Green
#33 =    Orange
#34 =    Blue
#35 =    Purple
#36 =    Cyan
#37 =    Grey
#40 =    Black Background
#41 =    Red Background
#42 =    Green Background
#43 =    Orange Background
#44 =    Blue Background
#45 =    Purple Background
#46 =    Cyan Background
#47 =    Grey Background
#90 =    Dark Grey
#91 =    Light Red
#92 =    Light Green
#93 =    Yellow
#94 =    Light Blue
#95 =    Light Purple
#96 =    Turquoise
#1'00 =   Dark Grey Backgroun'd
#1'01' =   Light Red Background
#102 =   Light Green Background
#103 =   Yellow Background
#104 =   Light Blue Background
#105 =   Light Purple Background
#106 =   Turquoise Background

# http://www.bigsoft.co.uk/blog/index.php/2'008/04/11/configuring-ls_color's
#no NORMAL, NORM        Global default, although everything should be something
#fi FILE                Normal file
#di DIR                 Directory
#ln SYMLINK, LINK, LNK  Symbolic link. If you set this to .target. instead of a numerical value, the color is as for the file pointed to.
#pi FIFO, PIPE          Named pipe
#do DOOR                Door
#bd BLOCK, BLK          Black device
#cd CHAR, CHR           Character device
#or ORPHAN              Symbolic link pointing to a non-existent file
#so SOCK                Socket
#su SETUID              File that is setuid (u+s)
#sg SETGID              File that is setgid (g+s)
#tw STICKY_OTHER_WRITABLE   Directory that is sticky and other-writable (+t,o+w)
#ow OTHER_WRITABLE      Directory that is other-writable (o+w) and not sticky
#st STICKY              Directory with the sticky bit set (+t) and not other-writable
#ex EXEC                Executable file (i.e. has .x. set in permissions)
#mi MISSING             Non-existent file pointed to by a symbolic link (visible when you type ls -l)
#lc LEFTCODE, LEFT      Opening terminal code
#rc RIGHTCODE, RIGHT    Closing terminal code
#ec ENDCODE, END        Non-filename text
#*.extension            Every file using this extension e.g. *.jpg

*/-->
