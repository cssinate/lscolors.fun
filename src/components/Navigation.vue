<template>
  <nav class="mainNav">
    <a v-for="link in navItems"
            :key="link.short"
            @click="setActiveNav(link.short)"
            :class="{ active: activeNav === link.short }">{{link.name}}</a>
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

<style lang="scss" scoped>
  nav {
    display: flex;
    flex-direction: column;
  }

  button {
    white-space: nowrap;
    cursor: pointer;
    color: var(--a-yellow);

    &:focus {
      text-decoration: underline;
      outline: 0;
    }
  }

  .active {
    font-weight: bold;
    color: var(--a-brightYellow);
  }

  span {
    font-weight: bold;
  }
</style>
