import { defineStore } from "pinia";

const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

export const useEventsStore = defineStore("events", {
  state: () => ({
    events: [],
    initialized: false,
    hostias: "",
  }),

  actions: {
    positionSelected(position) {
      this.hostias = position;
    },

    // NOTE atención: muy importante es que data, pending etc. que devuelve useFetch son refs()!!!
    async fetchEvents() {
      if (!this.initialized) {
        const data = await $fetch(`${api}/general/eventstypes`);
        this.events = data;
        this.initialized = true;
      }
    },
  },
});
