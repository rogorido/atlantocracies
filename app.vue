<template>
  <NuxtLayout>
    <div class="general">
      <MenuBar />
      <Hero />
      <NuxtPage />
      <FooterGeneral />
    </div>
  </NuxtLayout>
</template>

<script>
import "~/assets/normalize.css";
import "primevue/resources/themes/aura-light-green/theme.css";

import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
// import "bootstrap/dist/css/bootstrap-grid.css";
import "@/assets/owncontainers.css";
import Hero from "./components/Hero.vue";
</script>

<style>
.general {
  display: grid;
  grid-template-rows: 60px 300px 1fr 60px;
  min-height: 100vh;
}
</style>
