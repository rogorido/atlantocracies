<template>
  <div>
    <Dropdown
      v-model="graphtype"
      :options="graphTypes"
      placeholder="Select a graph type"
      @change="mostrar"
      class="w-full md:w-14rem"
    />

    <Chart
      :type="graphtype"
      :data="data"
      :options="options"
      class="w-full md:w-30rem"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Chart from "primevue/chart";

const props = defineProps({ eventsrelated: { type: Array, required: true } });
const options = ref({ responsive: true });

const data = ref();
const graphtype = ref("pie");
const graphTypes = ref(["pie", "bar"]);

data.value = props.eventsrelated.dataChart;
// console.log("el valor de data es: ", JSON.stringify(data.value, null, 2));

// TODO: no sé por qué funciona esto... en teoría no deberían salir scales tp con el bar...
function mostrar() {
  console.log("el valor de data es: ", JSON.stringify(options.value, null, 2));

  options.value = { responsive: true, plugins: {}, scales: {} };

  console.log("el valor de data es: ", JSON.stringify(options.value, null, 2));
}
</script>
