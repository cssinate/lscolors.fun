<template>
  <nav>
    <span>Show/Hide:</span>
    <button v-for="link in navItems"
            :key="link.short"
            @click="currentNavStates[link.short] = !currentNavStates[link.short]"
            :class="{ active: currentNavStates[link.short] }">{{link.name}}</button>
  </nav>
</template>

<script>
  export default {
    props: {
      navStates: Object
    },
    data: function () {
      return {
        currentNavStates: this.navStates,
        navItems: [
          {
            name: 'Introduction',
            short: 'intro'
          },
          {
            name: 'Terminal Preview',
            short: 'preview'
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
    watch: {
      navStates: function () {
        this.$emit('nav-states', this.currentNavStates)
      }
    },
    mounted: function () {
    }
  }
</script>

<style lang="scss" scoped>
  nav {
    grid-area: menu;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: min-content;
    grid-gap: 3ch;
    padding: 1rem 0;
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
