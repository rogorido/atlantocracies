import { defineStore } from "pinia";

const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

export const usePlacesStore = defineStore("places", {
  state: () => ({
    places: [],
    coordinates: [],
    place: "",
    initialized: false,
  }),

  getters: {
    // we use find since it returns the first object and not an array (like filter)
    nuevo: (state) => state.places.find((item) => item.place === state.place),
  },

  actions: {
    placeSelected(place) {
      this.place = place;
    },

    // NOTE atención: muy importante es que data, pending etc. que devuelve useFetch son refs()!!!
    async fetchPlaces() {
      if (!this.initialized) {
        const data = await $fetch(`${api}/places/`);
        this.places = data;
        this.coordinates = this.places.map((obj) => obj.coords);
        this.initialized = true;
      }
    },
  },
});
