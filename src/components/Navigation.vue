<template>
  <nav class="nav">
    <a v-for="link in navItems"
            :key="link.short"
            @click="setActiveNav(link.short)"
            @keydown.space="setActiveNav(link.short)"
            @keydown.enter="setActiveNav(link.short)"
            :tabindex="value === link.short ? -1 : 0"
            :class="{ active: value === link.short }">{{link.name}}</a>
  </nav>
</template>

<script>
export default {
  props: {
    value: String
  },
  data: function () {
    return {
      activeNav: this.value,
      navItems: [
        {
          name: 'Introduction',
          short: 'intro'
        },
        {
          name: 'Set Scheme',
          short: 'scheme'
        },
        {
          name: 'Set Theme',
          short: 'theme'
        },
        {
          name: 'Export',
          short: 'export'
        }
      ]
    }
  },
  methods: {
    setActiveNav: function (item) {
      this.activeNav = item
      this.$emit('input', item)
    }
  },
  mounted: function () {
  }
}
</script>
