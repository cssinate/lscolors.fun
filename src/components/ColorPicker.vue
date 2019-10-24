<template>
  <div>
    <div class="saturation"
      @keydown.left.exact.prevent="saturationLeft(false)"
      @keydown.left.shift.exact.prevent="saturationLeft(true)"
      @keydown.right.exact.prevent="saturationRight(false)"
      @keydown.right.shift.exact.prevent="saturationRight(true)"
      @keydown.up.exact.prevent="saturationUp(false)"
      @keydown.up.shift.exact.prevent="saturationUp(true)"
      @keydown.down.exact.prevent="saturationDown(false)"
      @keydown.down.shift.exact.prevent="saturationDown(true)"
      >
      <saturation
        v-model="colors"
        @change="childChange"
        tabindex="0"
        ref="saturation" />
    </div>
    <div
      class="hue"
      @keydown.left.exact.prevent="hueLeft(false)"
      @keydown.left.shift.exact.prevent="hueLeft(true)"
      @keydown.right.exact.prevent="hueRight(false)"
      @keydown.right.shift.exact.prevent="hueRight(true)">
      <hue
        v-model="colors"
        @change="childChange"
        tabindex="0"/>
    </div>
  </div>
</template>

<script>
import { Saturation, ColorMixin, Hue } from 'vue-color'

export default {
  name: 'ColorPicker',
  components: { Saturation, Hue },
  mixins: [ColorMixin],
  data () {
    return {
      currentColor: '#FFF'
    }
  },
  computed: {
    hex: function () {
      const hex = this.colors.hex
      return hex && hex.replace('#', '')
    }
  },
  created () {
    this.currentColor = this.colors.hex
  },
  mounted: function () {
    this.hueBar(24)
    this.whiteOverlay(12)
    this.blackOverlay(6)
    this.$nextTick(() => { this.$refs.saturation.$el.focus() })
  },
  methods: {
    childChange (data) {
      this.colorChange(data)
    },
    clickCurrentColor () {
      this.colorChange({
        hex: this.currentColor,
        source: 'hex'
      })
    },
    hueBar (steps) {
      let gradient = ''
      for (let p = 1; p < steps + 1; p++) {
        let firstPercent = Math.floor((p - 1) / steps * 100)
        let lastPercent = Math.ceil(p / steps * 100)
        let color = Math.floor(360 / steps * p)
        gradient = `${gradient}hsl(${color}, 100%, 50%) ${firstPercent}%, hsl(${color}, 100%, 50%) ${lastPercent}%`
        if (p < steps) {
          gradient = gradient + ', '
        }
      }
      document.documentElement.style.setProperty('--steppedHue', gradient)
    },
    whiteOverlay (steps) {
      let gradient = ''
      for (let p = 1; p < steps + 1; p++) {
        let firstPercent = Math.floor((p - 1) / steps * 100)
        let lastPercent = Math.ceil(p / steps * 100)
        let opacity = Math.floor(p / steps * 100) / 100
        gradient = `${gradient}rgba(255,255,255,${opacity}) ${firstPercent}%, rgba(255,255,255,${opacity}) ${lastPercent}%`
        if (p < steps) {
          gradient = gradient + ', '
        }
      }
      document.documentElement.style.setProperty('--steppedWhite', gradient)
    },
    blackOverlay (steps) {
      let gradient = ''
      for (let p = 1; p < steps + 1; p++) {
        let firstPercent = Math.floor((p - 1) / steps * 100)
        let lastPercent = Math.ceil(p / steps * 100)
        let opacity = Math.floor(p / steps * 100) / 100
        gradient = `${gradient}rgba(0,0,0,${opacity}) ${firstPercent}%, rgba(0,0,0,${opacity}) ${lastPercent}%`
        if (p < steps) {
          gradient = gradient + ', '
        }
      }
      document.documentElement.style.setProperty('--steppedBlack', gradient)
    },
    updateVueColorHue () {
      this.childChange({
        h: this.colors.hsl.h,
        s: this.colors.hsl.s,
        l: this.colors.hsl.l,
        source: 'hsl'
      })
    },
    updateVueColorSat () {
      this.childChange({
        h: this.colors.hsv.h,
        s: this.colors.hsv.s,
        v: this.colors.hsv.v,
        source: 'hsv'
      })
    },
    hueLeft (fast) {
      let speed
      fast ? speed = 20 : speed = 4
      if (this.colors.hsl.h > speed) {
        this.colors.hsl.h = this.colors.hsl.h - speed
      } else {
        this.colors.hsl.h = 1
      }
      this.updateVueColorHue()
    },
    hueRight (fast) {
      let speed
      fast ? speed = 20 : speed = 4
      if (this.colors.hsl.h < (360 - speed)) {
        this.colors.hsl.h = this.colors.hsl.h + speed
      } else {
        this.colors.hsl.h = 360
      }
      this.updateVueColorHue()
    },
    saturationLeft (fast) {
      let speed
      fast ? speed = 0.15 : speed = 0.02
      if (this.colors.hsv.s > speed) {
        this.colors.hsv.s = this.colors.hsv.s - speed
      } else {
        this.colors.hsv.s = 0
      }
      this.updateVueColorSat()
    },
    saturationRight (fast) {
      let speed
      fast ? speed = 0.15 : speed = 0.02
      if (this.colors.hsv.s < (1 - speed)) {
        this.colors.hsv.s = this.colors.hsv.s + speed
      } else {
        this.colors.hsv.s = 1
      }
      this.updateVueColorSat()
    },
    saturationUp (fast) {
      let speed
      fast ? speed = 0.15 : speed = 0.02
      if (this.colors.hsv.v < (1 - speed)) {
        this.colors.hsv.v = this.colors.hsv.v + speed
      } else {
        this.colors.hsv.v = 1
      }
      this.updateVueColorSat()
    },
    saturationDown (fast) {
      let speed
      fast ? speed = 0.15 : speed = 0.02
      if (this.colors.hsv.v > speed) {
        this.colors.hsv.v = this.colors.hsv.v - speed
      } else {
        this.colors.hsv.v = 0
      }
      this.updateVueColorSat()
    }
  }
}
</script>

<style lang="scss" scoped>
.saturation {
  height: 9rem;
  width: 100%;
  position: relative;
  margin-top: 1.5rem;
  margin-bottom: 1.75rem;
}

.hue {
  position: relative;
  height: 1rem;
  width: 100%;
  margin-bottom: 2rem;
}

/deep/ .vc-hue-picker,
/deep/ .vc-saturation-circle {
  all: unset;
  height: 1rem;
  border: solid 1px var(--t-bg);
  outline: solid 1px var(--t-fg);
  background: transparent;
  box-sizing: content-box;
  width: 1ch;
  display: block;
}

/deep/ .vc-hue-picker {
  margin-left: -.5ch;
}

/deep/ .vc-saturation-circle {
  margin-top: -.6rem;
  margin-left: -.5ch;
}

/deep/ .vc-hue {
  background-image: linear-gradient(to right, var(--steppedHue)) !important;
}

/deep/ .vc-hue:focus {
  outline: 0;

  & .vc-hue-picker {
    outline-width: 3px;
  }
}

/deep/ .vc-saturation:focus {
  outline: 0;

  & .vc-saturation-circle {
    outline-width: 3px;
  }
}

/deep/ .vc-saturation--white {
  background-image: linear-gradient(to left, var(--steppedWhite)) !important;
}

/deep/ .vc-saturation--black {
  background-image: linear-gradient(to bottom, var(--steppedBlack)) !important;
}
</style>
