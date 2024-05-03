<template>
  <Chart
    type="pie"
    :data="chartData"
    :options="chartOptions"
    class="w-full md:w-30rem"
  />
</template>

<script setup>
import Chart from "primevue/chart";

const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
  chartOptions: {
    type: Object,
    default: () => {
      responsive: true;
      maintainAspectRatio: false;
    },
  },
});
</script>
