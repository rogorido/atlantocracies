import { defineStore } from "pinia";

const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

export const useStatsStore = defineStore("stats", {
  state: () => ({
    stats: {},
    initialized: false,
  }),

  actions: {
    // NOTE atención: muy importante es que data, pending etc. que devuelve useFetch son refs()!!!
    async fetchStats() {
      if (!this.initialized) {
        try {
          const data = await $fetch(`${api}/general/generalstats`);

          this.stats = data;
          this.initialized = true;
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
});
