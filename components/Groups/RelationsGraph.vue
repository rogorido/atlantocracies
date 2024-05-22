<template>
  <div>
    <div id="cyto" ref="cyto"></div>
    <Button label="test" @click="test" />
    <Button label="recuperar" @click="recup" />
  </div>
</template>
<script setup>
import cytoscape from "cytoscape";
// import klay from "cytoscape-klay";
import fcose from "cytoscape-fcose";

// cytoscape.use(klay);
cytoscape.use(fcose);

const props = defineProps({
  personsrelated: { type: Object, required: true, default: () => { } },
});

let network = null;
let col = null;

const cyto = ref(null);

function probar() {

  return network.nodes().filter(function (ele) {
    const nombre = ele.data('label');
    // console.log(nombre);
    if (nombre === undefined) {
      return false;
    } else {
      // console.log(nombre.includes('Bernard'));
      return nombre.includes('Bernard');
      // return ele.data('label').includes('Bernard');
    }
  });
}

function test() {
  console.log(probar());
  col = network.remove(probar());
}

function recup() {
  col.restore();
}

onMounted(() => {
  // console.log("the props are: ", JSON.stringify(props, null, 2));

  var elements = {
    nodes: props.personsrelated.nodes,
    edges: props.personsrelated.edges,
  };

  network = cytoscape({
    container: cyto.value, elements,
    layout: {
      name: "fcose",
    },
    style: [
      // the stylesheet for the graph
      {
        selector: "node",
        style: {
          "background-color": "#666",
          // label: "data(namePerson)",
        },
      },

      {
        selector: '.mainperson',
        style: {
          'background-color': 'red',
          'shape': 'square'
        }
      },
      { selector: '.Matrimonio', style: { 'line-color': 'red', 'line-style': 'dashed' } }
    ],
  });

  network.on('tap', 'node', function (evt) {
    var node = evt.target;
    console.log('tapped ' + node.id());
    evt.target.connectedEdges().animate({
      style: { lineColor: "red" }
    })
  });
})

onUnmounted(() => {
  network.removeAllListeners();

})
</script>

<style scoped>
#cyto {
  width: 1000px;
  height: 600px;
  border: 1px solid lightgray;
}
</style>
