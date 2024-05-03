import { defineStore } from "pinia";

export const usePositionsStore = defineStore("positions", {
  state: () => ({
    positions: [],
    initialized: false,
    hostias: "",
  }),

  actions: {
    positionSelected(position) {
      this.hostias = position;
    },

    // NOTE atención: muy importante es que data, pending etc. que devuelve useFetch son refs()!!!
    async fetchPositions() {
      if (!this.initialized) {
        const { data } = await useFetch(
          "http://127.0.0.1:8008/general/positionstypes"
        );
        this.positions = data.value;
        this.initialized = true;
      }
    },
  },
});
