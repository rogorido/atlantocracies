import { defineStore } from "pinia";

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
        const { data } = await useFetch(
          "http://127.0.0.1:8008/general/titlestypes"
        );
        this.titles = data.value;
        this.initialized = true;
      }
    },
  },
});
