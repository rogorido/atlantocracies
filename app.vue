<template>
  <div class="general">
    <MenuBar />
    <NuxtPage />
    <FooterGeneral />
  </div>
</template>

<script>
import "~/assets/normalize.css";
import "primevue/resources/themes/aura-light-green/theme.css";

import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
// import "bootstrap/dist/css/bootstrap-grid.css";
import "@/assets/owncontainers.css";
</script>

<style>
.general {
  display: grid;
  grid-template-rows: 60px 1fr 60px;
  min-height: 100vh;
}
</style>
