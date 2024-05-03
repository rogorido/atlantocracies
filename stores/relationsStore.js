import { defineStore } from "pinia";

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

    // NOTE atención: muy importante es que data, pending etc. que devuelve useFetch son refs()!!!
    async fetchRelations() {
      if (!this.initialized) {
        const { data } = await useFetch(
          "http://127.0.0.1:8008/general/relationstypes"
        );
        this.relations = data.value;
        this.initialized = true;
      }
    },
  },
});
