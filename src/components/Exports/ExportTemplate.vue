<template>
  <section>
    <div class="instructions"></div>
    <div class="controls"></div>
    <div class="export">
      <component :is="component" />
    </div>
  </section>
</template>

<script>
  export default {
    props: {
      component: Object
    }
  }
</script>

<style lang="scss" scoped>

</style>
