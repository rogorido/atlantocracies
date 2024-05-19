<template>
  <div class="p-container">
    <div v-if="loading">Loading...</div>
    <div v-else>
      <BlocksDataMain :stats="stats" class="mt-5" />
    </div>
    <MainPageDescriptions />
  </div>
</template>

<script setup>
import { useStatsStore } from "../stores/statsStore";
import { usePlacesStore } from "../stores/placesStore";
import { useFilterStore } from "../stores/filterStore";

const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

const stats = ref({});
const places = ref([]);
const placesstore = usePlacesStore();
const store = useStatsStore();
const filterstore = useFilterStore();

const { filter } = storeToRefs(filterstore);

const loading = ref(true);

// const options = { responsive: true };

const { data } = await useFetch(`${api}/general/generalstats`);
if (data.value) {
  stats.value = data.value;
}

if (!placesstore.initialized) {
  await placesstore.fetchPlaces();
  places.value = placesstore.places;
  stats.value.totalPlaces = places.value.length;
  loading.value = false;
}

// TODO: en teoría habría que hacerlo con el callOnce de <nuxt>
// pero no sé si es posible con el async?
onMounted(() => {
  if (process.client) {
    if (localStorage.getItem("filter")) {
      const filterstring = localStorage.getItem("filter");

      if (filterstring) {
        filter.value = JSON.parse(filterstring);
      }
    }
  }
});
</script>
