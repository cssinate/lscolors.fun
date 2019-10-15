<template>
  <div>
    <div class="saturation">
      <saturation v-model="colors" @change="childChange"/>
    </div>
    <div class="hue">
      <hue v-model="colors" @change="childChange"/>
    </div>
  </div>
</template>

<script>
import { Saturation, ColorMixin, Hue } from "vue-color";

export default {
  name: "ColorPicker",
  components: { Saturation, Hue },
  mixins: [ColorMixin],
  data() {
    return {
      currentColor: "#FFF"
    };
  },
  computed: {
    hex() {
      const hex = this.colors.hex;
      return hex && hex.replace("#", "");
    }
  },
  created() {
    this.currentColor = this.colors.hex;
  },
  methods: {
    childChange(data) {
      this.colorChange(data);
    },
    clickCurrentColor() {
      this.colorChange({
        hex: this.currentColor,
        source: "hex"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.saturation {
  height: 9rem;
  width: 100%;
  margin-bottom: 0.5rem;
  position: relative;
}

.hue {
  position: relative;
  height: 1rem;
  width: 100%;
}

/deep/ .vc-hue-picker {
  all: unset;
  height: 1rem;
  border: solid 1px var(--t-bg);
  outline: solid 1px var(--t-fg);
  background: transparent;
  // margin-top: 0;
  width: 1ch;
}
</style>
