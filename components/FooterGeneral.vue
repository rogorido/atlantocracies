<template>
  <footer>AtlantoUI version: {{ uiversion }}</footer>
</template>

<script setup>
const config = useRuntimeConfig();
const uiversion = config.public.uiVersion;
</script>

<style scoped>
footer {
  grid-row-start: 4;
  grid-row-end: 5;
  background-color: #f5f5f5;
}
</style>
