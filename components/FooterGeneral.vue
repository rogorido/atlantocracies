<template>
  <footer>Component: FooterGeneral: {{ uiversion }}</footer>
</template>

<script setup>
const config = useRuntimeConfig();
const uiversion = config.public.uiVersion;
</script>

<style scoped>
footer {
  grid-row-start: 3;
  grid-row-end: 4;
  background-color: #f5f5f5;
}
</style>
