import Aura from "@primevue/themes/aura";
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
      uiVersion: process.env.npm_package_version,
    },
  },

  modules: [
    "@nuxtjs/robots",
    "@primevue/nuxt-module",
    "@nuxt/content",
    "@pinia/nuxt",
    "@nuxt/image",
  ],

  primevue: { options: { theme: { preset: Aura } } },

  $development: {
    debug: true,
  },

  robots: { rules: { UserAgent: "*", Disallow: "/" } },
  compatibilityDate: "2024-10-18",
});

