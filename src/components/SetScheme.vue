<template>
  <section>
    <div class="lsResult" v-for="(result, index) in lsResults" :key="index">
      {{result.description}}
    </div>
  </section>
</template>

<script>
export default {
  props: {
    lsResults: {
      type: Array
    }
  },
  mounted: function () {
    this.$root.$data.currentScheme = '';
    // console.log(`green emitted`)
  }
}
</script>

<style lang="scss" scoped>

</style>
