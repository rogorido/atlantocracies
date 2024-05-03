import { defineStore } from "pinia";

export const usePlacesStore = defineStore("places", {
  state: () => ({
    places: [],
    coordinates: [],
    hostias: "",
    initialized: false,
  }),

  getters: {
    // we use find since it returns the first object and not an array (like filter)
    nuevo: (state) => state.places.find((item) => item.place === state.hostias),
  },

  actions: {
    placeSelected(place) {
      this.hostias = place;
    },

    // NOTE atención: muy importante es que data, pending etc. que devuelve useFetch son refs()!!!
    async fetchPlaces() {
      if (!this.initialized) {
        const { data } = await useFetch("http://127.0.0.1:8008/places/");
        this.places = data.value;
        this.coordinates = this.places.map((obj) => obj.coords);
        this.initialized = true;
      }
    },
  },
});
