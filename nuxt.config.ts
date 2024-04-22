// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {},
  ssr: false,
  modules: ["nuxt-primevue", "@nuxt/content"],
  $development: {
    debug: true,
  },
});
