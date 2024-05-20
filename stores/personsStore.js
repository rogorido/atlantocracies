import { defineStore } from "pinia";

export const usePersonsStore = defineStore("persons", {
  state: () => ({
    persons: [],
    personSelected: "",
  }),

  actions: {
    selectPerson(person) {
      this.personSelected = person;
    },
  },
});
