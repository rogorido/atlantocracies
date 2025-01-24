import { definePreset } from "@primevue/themes";
import Aura from "@primevue/themes/aura";
const isProdEnv = process.env.NODE_ENV === "production";

// Nuestras modificaciones del tema Aura:
// https://primevue.org/theming/styled/#extend
// 1. tablist con los nombres centrados
//
// ver tb q lo tengo que usar en app.vue!
// esto crea una variable --p-tabs-tablist-justify-content
const ownAura = definePreset(Aura, {
  components: {
    tabs: {
      tablist: {
        extend: {
          justifyContent: "center",
        },
      },
    },
  },
});

// console.log(ownAura.components.tabs);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  devtools: { enabled: false },
  build: {},
  site: {
    url: "https://atlantocracies.digitalhumanities.digital",
    name: "Atlantocracies UI",
  },
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
    "@pinia/nuxt",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    "@nuxtjs/sitemap",
  ],

  googleFonts: {
    families: {
      // Roboto: true,
      "Noto+Sans": [400, 500, 600],
    },
    subsets: ["latin-ext", "latin"],
  },

  // primevue: { options: { theme: { preset: Aura } } },
  primevue: { options: { theme: { preset: ownAura } } },

  $development: {
    debug: true,
  },

  robots: { rules: { UserAgent: "*", Disallow: "/" } },
  compatibilityDate: "2025-01-17",
});
