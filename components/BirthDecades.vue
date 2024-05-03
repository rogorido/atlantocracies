<template>
  <Chart type="bar" :data="chartData" :options="chartOptions" />
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
