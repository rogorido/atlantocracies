import { defineStore } from "pinia";

import { getComboLists } from "~/utils/comboLists";

const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

export const useSourcesStore = defineStore("sources", {
  state: () => ({
    sources: [],
    initialized: false,
    source: "",
  }),

  getters: {
    // Positions ordered alphabetically for multiselect
    sourcesList: (state) => getComboLists(state.sources),
  },

  actions: {
    // TODO: do I use this?
    titleSelected(title) {
      this.source = title;
    },

    // NOTE: atención: muy importante es que data, pending etc. que devuelve useFetch son refs()!!!
    async fetchSources() {
      if (!this.initialized) {
        const data = await $fetch(`${api}/general/sources`);
        this.sources = data;
        this.initialized = true;
      }
    },
  },
});
