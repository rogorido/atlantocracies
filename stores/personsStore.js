import { defineStore } from "pinia";
import Insights from "~/components/Search/Insights.vue";

export const usePersonsStore = defineStore("persons", {
  state: () => ({
    persons: [],
    insightsData: {},
    personSelected: "",
  }),

  actions: {
    selectPerson(person) {
      this.personSelected = person;
    },
  },
});
