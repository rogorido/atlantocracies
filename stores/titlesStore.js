import { defineStore } from "pinia";

import { getComboLists } from "~/utils/comboLists";

const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

export const useTitlesStore = defineStore("titles", {
  // NOTE: titles is an array of objects: titlestypes and titlescontinents
  state: () => ({
    titles: [],
    initialized: false,
    title: "",
  }),

  getters: {
    // Positions ordered alphabetically for multiselect
    titlesList: (state) => getComboLists(state.titles.titlestypes),
    titlesContinentsList: (state) =>
      getComboLists(state.titles.titlescontinents),
  },

  actions: {
    // TODO: do I use this?
    titleSelected(title) {
      this.title = title;
    },

    // NOTE: atención: muy importante es que data, pending etc. que devuelve useFetch son refs()!!!
    async fetchTitles() {
      if (!this.initialized) {
        const data = await $fetch(`${api}/general/titlestypes`);
        this.titles = data;
        this.initialized = true;
      }
    },
  },
});
