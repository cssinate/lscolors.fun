<template>
  <div id="app">
    <SchemePreview :ls-results="LsResults" />
    <ColorPicker :ls-results="LsResults" />
  </div>
</template>

<script>
import SchemePreview from './components/SchemePreview.vue';
import ColorPicker from './components/ColorPicker.vue';
import {lsResults as results} from './components/lsResults.js';

export default {
  name: 'app',
  components: {
    SchemePreview,
    ColorPicker
  },
  data() {
    return {
      LsResults: results
    }
  }
}
</script>
