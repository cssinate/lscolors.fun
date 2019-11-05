<template>
  <section>
    <div
      class="inode currentlyEditing"
      :data-fg="currentlyEditing.fg"
      :data-bg="currentlyEditing.bg"
      :data-eff="currentlyEditing.eff">
      {{currentlyEditing.description}}
    </div>

    <style-selection
      area="Foreground"
      v-model="currentlyEditing.fg"
      :tiles="fgTiles"
      :default="currentDefaults.fg" />

    <style-selection
      area="Background"
      v-model="currentlyEditing.bg"
      :tiles="bgTiles"
      :default="currentDefaults.bg" />

    <style-selection
      area="Effect"
      v-model="currentlyEditing.eff"
      :tiles="effTiles"
      :default="currentDefaults.eff" />

    <button
      class="action"
      @click="setToDefault()"
      v-show="styleChanges.length && currentIsChanged">
      Reset to Default
    </button>

    <aside v-if="!hideTip && isBold" style="width: 40ch;">
      <h2>Note:</h2>
      <p>When the Bold effect is applied, the Bright variant of the color is shown by the terminal.</p>
      <button class="action" @click="hideTip = true">Don't show this tip again</button>
    </aside>
  </section>
</template>

<script>
import StyleSelection from './StyleSelection'

export default {
  name: 'SetStyle',
  props: {
    currentlyEditing: Object,
    currentDefaults: Object,
    styleChanges: {
      type: Array,
      required: true
    }
  },
  components: {
    StyleSelection
  },
  data () {
    return {
      defaults: this.currentDefaults,
      hideTip: false,
      isBold: false,
      fgTiles: [
        { value: '0', name: 'None' },
        { value: '30', name: 'Black' },
        { value: '31', name: 'Red' },
        { value: '32', name: 'Green' },
        { value: '33', name: 'Yellow' },
        { value: '34', name: 'Blue' },
        { value: '35', name: 'Magenta' },
        { value: '36', name: 'Cyan' },
        { value: '37', name: 'White' },
        { value: '90', name: 'Bright Black' },
        { value: '91', name: 'Bright Red' },
        { value: '92', name: 'Bright Green' },
        { value: '93', name: 'Bright Yellow' },
        { value: '94', name: 'Bright Blue' },
        { value: '95', name: 'Bright Magenta' },
        { value: '96', name: 'Bright Cyan' },
        { value: '97', name: 'Bright White' }
      ],
      bgTiles: [
        { value: '0', name: 'None' },
        { value: '41', name: 'Red' },
        { value: '42', name: 'Green' },
        { value: '43', name: 'Yellow' },
        { value: '44', name: 'Blue' },
        { value: '45', name: 'Magenta' },
        { value: '46', name: 'Cyan' },
        { value: '47', name: 'White' },
        { value: '100', name: 'Bright Black' },
        { value: '101', name: 'Bright Red' },
        { value: '102', name: 'Bright Green' },
        { value: '103', name: 'Bright Yellow' },
        { value: '104', name: 'Bright Blue' },
        { value: '105', name: 'Bright Magenta' },
        { value: '106', name: 'Bright Cyan' },
        { value: '107', name: 'Bright White' }
      ],
      effTiles: [
        { value: '00', name: 'None' },
        { value: '01', name: 'Bold' },
        { value: '04', name: 'Underline' }
      ]
    }
  },
  computed: {
    currentFg: function () {
      return this.currentlyEditing.fg
    },
    currentBg: function () {
      return this.currentlyEditing.bg
    },
    currentEff: function () {
      return this.currentlyEditing.eff
    },
    currentIsChanged: function () {
      if (this.styleChanges.find(({ code }) => code === this.currentlyEditing.code)) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    currentlyEditing: function () {
      this.checkIfBold()
    },
    currentFg: function () {
      this.checkIfBold()
      this.$nextTick(() => this.$emit('style-change', 'fg'))
    },
    currentBg: function () {
      this.$nextTick(() => this.$emit('style-change', 'bg'))
    },
    currentEff: function () {
      this.$nextTick(() => this.$emit('style-change', 'eff'))
    }
  },
  methods: {
    checkIfBold () {
      if (this.currentlyEditing) {
        if (this.currentlyEditing.eff === '01' && this.currentlyEditing.fg >= 30 && this.currentlyEditing.fg < 38) {
          this.isBold = true
        } else {
          this.isBold = false
        }
      } else {
        this.isBold = false
      }
    },
    setToDefault () {
      this.currentlyEditing.fg = this.currentDefaults.fg
      this.currentlyEditing.bg = this.currentDefaults.bg
      this.currentlyEditing.eff = this.currentDefaults.eff
    }

  }
}
</script>

<style lang="scss" scoped>

@import '../scss/vars';

.currentlyEditing {
  max-width: max-content;
  margin-bottom: 1.5rem;
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

[data-eff="01"] {
  font-weight: bold;
}

[data-eff="04"] {
  text-decoration: underline;
}

</style>
