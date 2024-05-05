const isProdEnv = process.env.NODE_ENV === "production";

// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {},
  //ssr: true,
  ssr: false,
  runtimeConfig: {
    public: {
      apiBaseUrl: isProdEnv
        ? process.env.API_BASE_URL
        : "http://localhost:8008",
    },
  },
  modules: ["nuxt-primevue", "@nuxt/content", "@pinia/nuxt"],
  $development: {
    debug: true,
  },
});
