<template>
  <section>
    <div class="inode">
      <h2>inode description</h2>
      <h2>FG</h2>
      <h2>BG</h2>
      <h2>Eff</h2>
    </div>
    <div class="inode" v-for="(result, index) in $root.$data.inodes" :key="index">
      <h2>{{result.description}}</h2>
      <div>{{result.fg}}</div>
      <div>{{result.bg}}</div>
      <div>{{result.eff}}</div>
    </div>
  </section>
</template>

<script>
export default {
  mounted: function () {
    this.$root.$data.currentScheme = '';
    // console.log(`green emitted`)
  }
}
</script>

<style lang="scss" scoped>
.inode {
  display: contents;
}

section {
  max-width: 50em;
  display: grid;
  grid-template-columns: 1fr repeat(3, 5ch);
}
</style>
