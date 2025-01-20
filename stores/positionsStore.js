import { defineStore } from "pinia";

import { getComboLists } from "~/utils/comboLists";

const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

export const usePositionsStore = defineStore("positions", {
  state: () => ({
    positions: [],
    initialized: false,
    position: "",
  }),

  getters: {
    // Positions ordered alphabetically for multiselect
    positionsList: (state) => getComboLists(state.positions),
  },

  actions: {
    // TODO: do I use this?
    positionSelected(position) {
      this.position = position;
    },

    // NOTE atención: muy importante es que data, pending etc. que devuelve useFetch son refs()!!!
    async fetchPositions() {
      if (!this.initialized) {
        const data = await $fetch(`${api}/general/positionstypes`);
        this.positions = data;
        this.initialized = true;
      }
    },
  },
});
