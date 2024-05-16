import { defineStore } from "pinia";

import { getComboLists } from "~/utils/comboLists";

const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

export const useRelationsStore = defineStore("relations", {
  state: () => ({
    relations: [],
    initialized: false,
    hostias: "",
  }),

  getters: {
    // Positions ordered alphabetically for multiselect
    relationsList: (state) => getComboLists(state.relations),
  },

  actions: {
    relationSelected(relation) {
      this.hostias = relation;
    },

    async fetchRelations() {
      if (!this.initialized) {
        const data = await $fetch(`${api}/general/relationstypes`);
        this.relations = data;
        this.initialized = true;
      }
    },
  },
});
