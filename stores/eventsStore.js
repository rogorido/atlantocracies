import { defineStore } from "pinia";

const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

import { getComboLists } from "~/utils/comboLists";

export const useEventsStore = defineStore("events", {
  state: () => ({
    events: [],
    initialized: false,
    hostias: "",
  }),

  getters: {
    // Positions ordered alphabetically for multiselect
    // eventsList: (state) => getComboLists(state.events.eventstypes),
    eventsList: (state) => getComboLists(state.events),
  },

  actions: {
    positionSelected(position) {
      this.hostias = position;
    },

    async fetchEvents() {
      if (!this.initialized) {
        const data = await $fetch(`${api}/general/eventstypes`);
        this.events = data;
        this.initialized = true;
      }
    },
  },
});
