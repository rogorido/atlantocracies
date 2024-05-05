import { defineStore } from "pinia";

const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

export const useTitlesStore = defineStore("titles", {
  state: () => ({
    titles: [],
    initialized: false,
    hostias: "",
  }),

  actions: {
    titleSelected(title) {
      this.hostias = title;
    },

    // NOTE atención: muy importante es que data, pending etc. que devuelve useFetch son refs()!!!
    async fetchTitles() {
      if (!this.initialized) {
        const data = await $fetch(`${api}/general/titlestypes`);
        this.titles = data;
        this.initialized = true;
      }
    },
  },
});
