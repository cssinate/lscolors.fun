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
  height: 30px;
  width: 30px;
  position: relative;
}

.hue {
  position: relative;
  height: 30px;
  width: 30px;
}
</style>
