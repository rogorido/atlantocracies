<template>
  <div class="p-container">
    <BlocksDataMain :stats="stats" class="mt-5" />

    <MainPageDescriptions />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStatsStore } from "../stores/statsStore";

const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

const stats = ref({});
const store = useStatsStore();

// Variable to check whether data are loaded or not
// https://vue-chartjs.org/guide/#chart-with-api-data
const loaded = ref(false);

const options = { responsive: true };

const { data } = await useFetch(`${api}/general/generalstats`);
//console.log("data", data.value);
if (data.value) {
  stats.value = data.value;
  loaded.value = true;
}
</script>
