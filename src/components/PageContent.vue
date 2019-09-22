<template>
  <tabs>
      <tab name="Set LS_COLORS scheme">
          <Scheme />
      </tab>
      <tab name="Set terminal theme">
          <Theme />
      </tab>
      <tab name="FAQ">
          <Faq />
      </tab>
</tabs>
</template>

<script>
  import {Tabs, Tab} from 'vue-tabs-component'
  import Faq from './FAQ'
  import Scheme from './SetScheme'
  import Theme from './SetTheme'

  export default {
    components: {
      Tab,
      Tabs,
      Faq,
      Scheme,
      Theme
    }
  }
</script>

<style lang="scss" scoped>

</style>
