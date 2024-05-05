import { defineStore } from "pinia";

const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

export const useRelationsStore = defineStore("relations", {
  state: () => ({
    relations: [],
    initialized: false,
    hostias: "",
  }),

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
