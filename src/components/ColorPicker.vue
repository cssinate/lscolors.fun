<template>
    <section class="lsItems">
        <div class="lsItem" v-for="(result, index) in lsResults" :key="index">
            <h2 class="lsItem_title">{{result.description}}</h2>
            <dt>Foreground:</dt><dd>{{numberToReadable(result.fg)}}</dd>
            <div class="colorPicker">
            </div>
            <dt>Background:</dt><dd>{{numberToReadable(result.bg)}}</dd>
            <div class="colorPicker">
            </div>
            <dt>Effect:</dt><dd>{{numberToReadable(result.eff)}}</dd>
            <div class="effectPicker">
            </div>
        </div>
    </section>
</template>

<script>
export default {
  props: ['lsResults'],
  data: function () {
    return {
      readableValue: {
        '00': 'None',
        '01': 'Bold',
        '04': 'Underline',
        0: 'Terminal Default',
        // Foregrounds
        30: 'Black',
        31: 'Red',
        32: 'Green',
        33: 'Yellow',
        34: 'Blue',
        35: 'Magenta',
        36: 'Cyan',
        37: 'White',
        90: 'Bright Black',
        91: 'Bright Red',
        92: 'Bright Green',
        93: 'Bright Yellow',
        94: 'Bright Blue',
        95: 'Bright Magenta',
        96: 'Bright Cyan',
        97: 'Bright White',
        // Backgorunds
        40: 'Black',
        41: 'Red',
        42: 'Green',
        43: 'Yellow',
        44: 'Blue',
        45: 'Magenta',
        46: 'Cyan',
        47: 'White',
        190: 'Bright Black',
        101: 'Bright Red',
        102: 'Bright Green',
        103: 'Bright Yellow',
        104: 'Bright Blue',
        105: 'Bright Magenta',
        106: 'Bright Cyan',
        107: 'Bright White'
      }
    }
  },
  methods: {
    numberToReadable: function (number) {
      return this.readableValue[number]
    }
  }
}
</script>

<style lang="scss" scoped>
.lsItem_title::first-letter {
    text-transform: uppercase;
}

.lsItems {
  grid-area: tabs;
}
</style>
