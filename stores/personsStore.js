import { defineStore } from "pinia";

export const usePersonsStore = defineStore("persons", {
  state: () => ({
    personSelected: "",
  }),

  actions: {
    selectPerson(person) {
      this.personSelected = person;
    },
  },
});
