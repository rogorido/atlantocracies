<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script>
import "~/assets/normalize.css";

import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primeflex/themes/primeone-light.css";
import "@/assets/owncontainers.css";
</script>

<style>
html {
  /* font-family: "Roboto Slab", sans-serif; */
  font-family: "Noto Sans", sans-serif;
  line-height: 1.3;
}

.p-tablist-tab-list {
  justify-content: var(--p-tabs-tablist-justify-content);
}
</style>
