<template>
  <div>
    <div id="cyto" ref="cyto"></div>
    <Button label="test" @click="test" />
    <Button label="recuperar" @click="recup" />
    <Button label="recuperar" @click="recup2" />
    <div>
      <p>{{ tiposrels }}</p>
    </div>
    <Dropdown v-model="selectedRelation" :options="tiposrels" placeholder="Select relations" :maxSelectedLabels="1"
      class="w-full md:w-20rem" />
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
let otros = null;

const cyto = ref(null);

const tiposrels = ref([]);
const selectedRelation = ref('');


function probar2() {

  return network.nodes().filter(function (ele) {
    return ele.data('label')?.includes('Bernard') ?? false;
  });
}


watch(selectedRelation, () => {
  console.log("hola");

  // const leches = network.edges('[type != "' + selectedRelation.value + '"]');
  // // console.log(leches);
  // otros = network.remove(leches);

  // esto tb funciona. 
  otros = network.edges('[type != "' + selectedRelation.value + '"]').remove();
})

function test() {
  col = network.remove(probar2());
}

function recup() {
  col.restore();
}
function recup2() {
  otros.restore();
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
  const typeRelsValues = props.personsrelated.edges.map(item => item.data.type)
  const uniqueSet = new Set(typeRelsValues);

  tiposrels.value = Array.from(uniqueSet);
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
