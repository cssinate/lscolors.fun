<template>
  <div id="app">
    <img width="25%" src="./assets/logo.png">
    <SchemePreview/>
  </div>
</template>

<script>
import SchemePreview from "./components/SchemePreview";

export default {
  name: "App",
  components: {
    SchemePreview
  }
};
</script>