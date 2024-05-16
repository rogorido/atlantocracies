import { defineStore } from "pinia";

const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

export const useHistBirthsStore = defineStore("histBirths", {
  state: () => ({
    histBirths: [],
    initialized: false,
  }),

  actions: {
    async fetchHistBirths() {
      if (!this.initialized) {
        const data = await $fetch(`${api}/persons/histbirths`);
        this.histBirths = data.result;
        this.initialized = true;
      }
    },
  },
});
