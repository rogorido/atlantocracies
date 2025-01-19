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
    //"@nuxtjs/robots",
    "@primevue/nuxt-module",
    "@pinia/nuxt",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
  ],
  googleFonts: {
    families: {
      Roboto: true,
    },
  },
  // }fonts: {
  //     families: [
  //       // do not resolve this font with any provider from `@nuxt/fonts`
  //       // { name: "Custom Font", provider: "none" },
  //       // only resolve this font with the `google` provider
  //       { name: "Roboto", provider: "google" },
  //       // specify specific font data - this will bypass any providers
  //       // {
  //       //   name: "Other Font",
  //       //   src: "https://example.com/font.woff2",
  //       //   weight: "bold",
  //       // },
  //     ],
  //   },
  primevue: { options: { theme: { preset: Aura } } },

  $development: {
    debug: true,
  },

  robots: { rules: { UserAgent: "*", Disallow: "/" } },
  compatibilityDate: "2025-01-17",
});

