<template>
  <main>
    <tabs :options="{ useUrlFragment: false }" @changed="clearScheme">
      <tab class="tab tab-scheme" name="Set LS_COLORS scheme">
          <Scheme />
          <SchemePreview />
      </tab>
      <tab class="tab" name="Set terminal theme">
        <Theme />
        <SchemePreview />
      </tab>
      <tab class="tab" name="FAQ">
        <Faq />
        <SchemePreview />
      </tab>
      <tab class="tab" name="Attributions">
        <Attributions />
        <SchemePreview />
      </tab>
    </tabs>
  </main>
</template>

<script>
import { Tabs, Tab } from 'vue-tabs-component'
import Faq from './FAQ'
import Scheme from './SetScheme'
import Theme from './SetTheme'
import Attributions from './Attributions'
import SchemePreview from './SchemePreview'

export default {
  components: {
    Tab,
    Tabs,
    Faq,
    Scheme,
    Theme,
    Attributions,
    SchemePreview
  },
  methods: {
    clearScheme (selectedTab) {
      if (selectedTab.tab.name !== 'Set LS_COLORS scheme') {
        this.$root.$data.currentScheme = ''
      } else {
        this.$root.$data.currentScheme = 'no'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .tab {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: 2.2rem repeat(20, 2rem) 1fr;
    grid-auto-flow: column;

    &:not(.tab-scheme) > * {
      grid-row: 1 / -1;
    }
  }

  .tab-scheme {
    display: grid;
    grid-template-columns: auto repeat(3, min-content);
  }
</style>
