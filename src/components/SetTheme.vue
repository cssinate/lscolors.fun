<template>
  <div class="grid">
    <div>
      <label>Terminal Foreground</label>
      <input type="color" v-model="fg">
    </div>
    <div>
      <label>Bg</label>
      <input type="color" v-model="bg">
    </div>
    <div>
      <label>Black</label>
      <input type="color" v-model="black">
    </div>
    <div>
      <label>Bright Black</label>
      <input type="color" v-model="brightBlack">
    </div>
    <div>
      <label>Red</label>
      <input type="color" v-model="red">
    </div>
    <div>
      <label>Bright Red</label>
      <input type="color" v-model="brightRed">
    </div>
    <div>
      <label>Green</label>
      <input type="color" v-model="green">
    </div>
    <div>
      <label>Bright Green</label>
      <input type="color" v-model="brightGreen">
    </div>
    <div>
      <label>Yellow</label>
      <input type="color" v-model="yellow">
    </div>
    <div>
      <label>Bright Yellow</label>
      <input type="color" v-model="brightYellow">
    </div>
    <div>
      <label>Blue</label>
      <input type="color" v-model="blue">
    </div>
    <div>
      <label>Bright Blue</label>
      <input type="color" v-model="brightBlue">
    </div>
    <div>
      <label>Magenta</label>
      <input type="color" v-model="magenta">
    </div>
    <div>
      <label>Bright Magenta</label>
      <input type="color" v-model="brightMagenta">
    </div>
    <div>
      <label>Cyan</label>
      <input type="color" v-model="cyan">
    </div>
    <div>
      <label>Bright Cyan</label>
      <input type="color" v-model="brightCyan">
    </div>
    <div>
      <label>White</label>
      <input type="color" v-model="white">
    </div>
    <div>
      <label>Bright White</label>
      <input type="color" v-model="brightWhite">
    </div>
  </div>
</template>

<script>
import ColorPicker from 'vue-color-picker-wheel';
export default {
  components: {
    ColorPicker
  },
  data () {
    return {

    }
  },
  computed: {
    fg: {
      get: function () {
        return this.getVal('--t-fg')
      },
      set: function (newVal) {
        this.setVal('--t-fg', newVal)
      }
    },
    bg: {
      get: function () {
        return this.getVal('--t-bg')
      },
      set: function (newVal) {
        this.setVal('--t-bg', newVal)
      }
    },
    black: {
      get: function () {
        return this.getVal('--a-black')
      },
      set: function (newVal) {
        this.setVal('--a-black', newVal)
      }
    },
    brightBlack: {
      get: function () {
        return this.getVal('--a-brightBlack')
      },
      set: function (newVal) {
        this.setVal('--a-brightBlack', newVal)
      }
    },
    red: {
      get: function () {
        return this.getVal('--a-red')
      },
      set: function (newVal) {
        this.setVal('--a-red', newVal)
      }
    },
    brightRed: {
      get: function () {
        return this.getVal('--a-brightRed')
      },
      set: function (newVal) {
        this.setVal('--a-brightRed', newVal)
      }
    },
    green: {
      get: function () {
        return this.getVal('--a-green')
      },
      set: function (newVal) {
        this.setVal('--a-green', newVal)
      }
    },
    brightGreen: {
      get: function () {
        return this.getVal('--a-brightGreen')
      },
      set: function (newVal) {
        this.setVal('--a-brightGreen', newVal)
      }
    },
    yellow: {
      get: function () {
        return this.getVal('--a-yellow')
      },
      set: function (newVal) {
        this.setVal('--a-yellow', newVal)
      }
    },
    brightYellow: {
      get: function () {
        return this.getVal('--a-brightYellow')
      },
      set: function (newVal) {
        this.setVal('--a-brightYellow', newVal)
      }
    },
    blue: {
      get: function () {
        return this.getVal('--a-blue')
      },
      set: function (newVal) {
        this.setVal('--a-blue', newVal)
      }
    },
    brightBlue: {
      get: function () {
        return this.getVal('--a-brightBlue')
      },
      set: function (newVal) {
        this.setVal('--a-brightBlue', newVal)
      }
    },
    magenta: {
      get: function () {
        return this.getVal('--a-magenta')
      },
      set: function (newVal) {
        this.setVal('--a-magenta', newVal)
      }
    },
    brightMagenta: {
      get: function () {
        return this.getVal('--a-brightMagenta')
      },
      set: function (newVal) {
        this.setVal('--a-brightMagenta', newVal)
      }
    },
    cyan: {
      get: function () {
        return this.getVal('--a-cyan')
      },
      set: function (newVal) {
        this.setVal('--a-cyan', newVal)
      }
    },
    brightCyan: {
      get: function () {
        return this.getVal('--a-brightCyan')
      },
      set: function (newVal) {
        this.setVal('--a-brightCyan', newVal)
      }
    },
    white: {
      get: function () {
        return this.getVal('--a-white')
      },
      set: function (newVal) {
        this.setVal('--a-white', newVal)
      }
    },
    brightWhite: {
      get: function () {
        return this.getVal('--a-brightWhite')
      },
      set: function (newVal) {
        this.setVal('--a-brightWhite', newVal)
      }
    }
  },
  methods: {
    getVal (prop) {
      return window.getComputedStyle(document.documentElement).getPropertyValue(prop)
    },
    setVal (prop, val) {
      document.documentElement.style.setProperty(prop, val)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
