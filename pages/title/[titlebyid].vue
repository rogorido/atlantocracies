<template>
  <h1 class="text-center">
    Type of relation: {{ useRoute().params.titlebyid }}
  </h1>
  <div v-if="status === 'pending'">Loading data...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else>
    <SearchMacroTablePersons />
    <DividerShape />
    <h2 class="text-center">Geographical distribution</h2>
    <div class="grid">
      <div class="col-6">
        <h2>Per continents</h2>
        <TitlesContinentsTable :continents="data.continentsAll" />
      </div>
      <div class="col-6">
        <h2>Per countries</h2>
        <TitlesCountriesTable :countries="data.countriesAll" />
      </div>
    </div>
    <DividerShape />
    <h2 class="text-center">Temporal distribution</h2>
    <div class="grid">
      <div class="col-6">
        <h2>Decades Graph</h2>
        <Chart class="graph" type="bar" :options="options" :data="chartData" />
      </div>
      <div class="col-5">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At,
          reiciendis exercitationem! Illo sunt, natus adipisci quo rem eveniet
          optio! Esse nobis necessitatibus nihil temporibus laborum! Voluptas
          neque optio veritatis incidunt.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat
          voluptates voluptatem reiciendis in asperiores quo quia quam
          blanditiis, temporibus assumenda corrupti omnis maiores enim. Ipsum
          accusamus aliquam aperiam rerum doloremque?
        </p>
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
  `${api}/titles/${useRoute().params.titlebyid}`,
);

const chartData = createDataChart(data.value.titleDecades);

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
