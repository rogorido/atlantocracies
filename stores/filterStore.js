import { defineStore } from "pinia";

export const useFilterStore = defineStore("filter", {
  state: () => ({
    filter: {},
    initialized: false,
  }),

  actions: {
    setFilter(filter) {
      this.filter = filter;
    },
  },
});
