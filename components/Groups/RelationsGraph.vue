<template>
  <div>
    <div id="cyto" ref="cyto"></div>
  </div>
</template>
<script setup>
import cytoscape from "cytoscape";

const props = defineProps({
  personsrelated: { type: Object, required: true, default: () => { } },
});

let network = null;

const cyto = ref(null);

onMounted(() => {
  // console.log("the props are: ", JSON.stringify(props, null, 2));

  var elements = {
    nodes: props.personsrelated.nodes,
    edges: props.personsrelated.edges,
  };

  network = cytoscape({
    container: cyto.value, elements,
    layout: {
      name: "random",
    },
    style: [
      // the stylesheet for the graph
      {
        selector: "node",
        style: {
          "background-color": "#666",
          label: "data(namePerson)",
        },
      },

      {
        selector: '.H',
        style: {
          'background-color': 'red',
          'shape': 'square'
        }
      }, {
        selector: "edge",
        style: {
          width: 3,
          "line-color": "gray",
          "curve-style": "bezier",
          "target-arrow-color": "#ccc",
          "target-arrow-shape": "triangle",
        },
      },
    ],
  });
})
</script>

<style scoped>
#cyto {
  width: 800px;
  height: 400px;
  border: 1px solid lightgray;
}
</style>
