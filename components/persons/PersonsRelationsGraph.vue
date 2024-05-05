<template>
  <div>
    <div id="cyto" ref="cyto"></div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";

import { Network } from "vis-network/esnext";
import { DataSet } from "vis-data/esnext";
import "vis-network/styles/vis-network.css";
import { layouts } from "chart.js";

const props = defineProps({
  personsrelated: { type: Object, required: true, default: {} },
});

let network = null;

const cyto = ref(null);

onMounted(() => {
  console.log("the props are: ", JSON.stringify(props, null, 2));
  var data = {
    nodes: props.personsrelated.nodes,
    edges: props.personsrelated.edges,
  };
  var options = { layout: { randomSeed: 2 } };
  network = new Network(cyto.value, data, options);
});
</script>

<style scoped>
#cyto {
  width: 800px;
  height: 400px;
  border: 1px solid lightgray;
}
</style>
