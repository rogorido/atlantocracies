import { defineStore } from "pinia";

const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

export const useHistBirthsStore = defineStore("histBirths", {
  state: () => ({
    histBirths: [],
    initialized: false,
  }),

  getters: {
    // Positions ordered alphabetically for multiselect
    histbirthsList: (state) => getComboLists(state.histBirths),
  },

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
