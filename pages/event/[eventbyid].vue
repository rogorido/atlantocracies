<template>
  <div class="p-container-fluid">
    <h1 class="text-center">
      Type of relation: {{ useRoute().params.eventbyid }}
    </h1>
    <div v-if="status === 'pending'">Loading data...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <SearchMacroTablePersons />
      <DividerShape />
      <div class="grid">
        <div class="col-12 xl:col-6">
          <h2>Per places</h2>
          <EventsPlacesTable :places="data.placesAll" />
        </div>
        <div class="col-12 xl:col-6">
          <h2>Decades Graph</h2>
          <Chart
            class="graph"
            type="bar"
            :options="options"
            :data="chartData"
          />
        </div>
      </div>
    </div>
  </div>
  <ScrollTop target="window" :threshold="100" icon="pi pi-arrow-up" />
</template>

<script setup>
definePageMeta({
  middleware: ["protected"],
});

import Chart from "primevue/chart";
import { createDataChart } from "@/utils/createDataChart";

const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

// with useLazyFetch the page is loaded while the data is being fetched
// TODO: atención mirar esto del status que parece que no existe ya...
const { data, status, error } = await useFetch(
  `${api}/events/${useRoute().params.eventbyid}`,
);

const chartData = createDataChart(data.value.eventDecades);

const options = {
  responsive: true,
  plugins: { legend: { display: false } },
};
// provide tiene que ser usado en setup
provide("persons", readonly(data.value.personsAll));
</script>

<style scoped>
.graph {
  width: 100%;
}
</style>
