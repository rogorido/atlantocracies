<template>
  <div><div id="visualization" ref="visualization"></div></div>
</template>

<script setup>
import { Timeline } from "vis-timeline/esnext";
import { DataSet } from "vis-data/esnext";
import "vis-timeline/styles/vis-timeline-graph2d.css";

const props = defineProps({
  eventstimeline: { type: Object, required: true, default: () => {} },
});

const nodes = ref();

const visualization = ref(null);
let timeline = null;

onMounted(() => {
  nodes.value = props.eventstimeline;

  console.log("el timeline", JSON.stringify(nodes.value, null, 2));
  var items = new DataSet(nodes.value);

  //console.log("the props are: ", JSON.stringify(items, null, 2));

  let options = {};

  timeline = new Timeline(visualization.value, items, options);
});
</script>

<style scoped>
#visualization {
  width: 800px;
  height: 300px;
  border: 1px solid lightgray;
}
</style>
