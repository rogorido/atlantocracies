// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {},
  // ssr: true,
  ssr: false,
  modules: ["nuxt-primevue", "@nuxt/content", "@pinia/nuxt"],
  $development: {
    debug: true,
  },
});
