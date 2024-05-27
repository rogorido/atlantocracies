<template>
  <div>
    <h1 class="text-center">Persons</h1>
    <div class="grid">
      <div class="col-6">
        <h2>Gender</h2>

        <GendersChart
          v-if="loaded"
          :chartData="gendersData"
          :chartOptions="options"
        />
      </div>

      <div class="col-6">
        <h2>Birth places (historical)</h2>

        <Chart
          v-if="loaded"
          type="pie"
          :data="histbirths"
          :options="optionshistbirths"
        />
      </div>
    </div>
    <Chart v-if="loaded" type="bar" :data="birthyears" class="w-full" />

    <!-- I should use searchmacrotablepersons -->
    <!-- <PersonsTable :persons="persons" v-if="loaded" /> -->
  </div>
</template>

<script setup>
import Chart from "primevue/chart";

import { useStatsStore } from "../stores/statsStore";

const statsstore = useStatsStore();

const persons = ref();
const histbirths = ref();
const birthyears = ref();

const loaded = ref(false);
const gendersData = statsstore.stats.gendersChartData;

const options = { responsive: true };

// https://www.chartjs.org/docs/latest/configuration/legend.html
// pies need plugins, legned, etc.
const optionshistbirths = {
  responsive: true,
  plugins: { legend: { display: true, position: "right" } },
};

const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

const loadPersonsData = async () => {
  try {
    const { data: cojones } = await useFetch(`${api}/persons/`);
    const { data: leches } = await useFetch(`${api}/persons/histbirths`);
    const { data: puta } = await useFetch(`${api}/persons/birthyears`);

    persons.value = cojones.value;
    histbirths.value = leches.value.chartData;
    birthyears.value = puta.value;

    loaded.value = true;
  } catch (err) {
    console.log("error en mymap5", err);
  }
};

loadPersonsData();
</script>
