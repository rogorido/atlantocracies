import { defineStore } from "pinia";

export const useStatsStore = defineStore("stats", {
  state: () => ({
    stats: {},
    initialized: false,
  }),

  actions: {
    // NOTE atención: muy importante es que data, pending etc. que devuelve useFetch son refs()!!!
    async fetchStats() {
      if (!this.initialized) {
        try {
          const { data, error, status } = await useFetch(
            "http://127.0.0.1:8008/general/generalstats",
            { immediate: true, lazy: true }
          );
          this.stats = data.value;
          console.log("esto son los valores:", this.stats);
          console.log(error.value);
          console.log("el estatus es: ", status.value);
          this.initialized = true;
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
});
