<template>
  <div>
    <Button label="test" @click="test" />
    <Button label="recuperar" @click="recup" />
    <Button label="recuperar" @click="recup2" />
    <div>
      <p>{{ tiposrels }}</p>
    </div>
    <Dropdown
      v-model="filters.typeRelation.value"
      :options="tiposrels"
      placeholder="Select relations"
      :maxSelectedLabels="1"
      class="w-full md:w-20rem"
    />
    <div id="cyto" ref="cyto"></div>
  </div>
  <div>
    <DataTable
      v-model:filters="filters"
      :value="personsrelated"
      paginator
      stripedRows
      filterDisplay="row"
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      dataKey="idItem"
      tableStyle="max-width: 30rem"
    >
      <template #empty> No relations found. </template>
      <Column field="nameMainPerson" header="Main Person" sortable></Column>
      <Column field="genderMainPerson" header="Gender" sortable></Column>
      <Column field="typeRelation" header="Relation" sortable>
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown
            v-model="filterModel.value"
            :options="tiposrels"
            @change="filterCallback()"
            class="p-column-filter"
            placeholder="Search by relation"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script setup>
import { FilterMatchMode } from "primevue/api";
import cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";

cytoscape.use(fcose);

const props = defineProps({
  personsrelatedcyto: { type: Object, required: true, default: () => {} },
  personsrelated: { type: Array, required: true, default: () => [] },
});

let network = null;
let col = null;
let otros = null;

const cyto = ref(null);

const tiposrels = ref([]);
const selectedRelation = ref("");

const filters = ref({
  typeRelation: { value: null, matchMode: FilterMatchMode.EQUALS },
});

console.log("hola y es así.");

function probar2() {
  return network.nodes().filter(function (ele) {
    return ele.data("label")?.includes("Bernard") ?? false;
  });
}

watch(selectedRelation, () => {
  console.log("hola");

  // const leches = network.edges('[type != "' + selectedRelation.value + '"]');
  // // console.log(leches);
  // otros = network.remove(leches);

  // esto tb funciona.
  otros = network
    .edges('[type != "' + filters.value.typeRelation.selected + '"]')
    .remove();
});
watch(filters, () => {
  console.log("en modificación");

  // const leches = network.edges('[type != "' + selectedRelation.value + '"]');
  // // console.log(leches);
  // otros = network.remove(leches);

  // esto tb funciona.
  otros = network
    .edges('[type != "' + filters.value.typeRelation.value + '"]')
    .remove();
});

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
    nodes: props.personsrelatedcyto.nodes,
    edges: props.personsrelatedcyto.edges,
  };

  network = cytoscape({
    container: cyto.value,
    elements,
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
        selector: ".mainperson",
        style: {
          "background-color": "red",
          shape: "square",
        },
      },
      {
        selector: ".Matrimonio",
        style: { "line-color": "red", "line-style": "dashed" },
      },
    ],
  });

  network.on("tap", "node", function (evt) {
    var node = evt.target;
    console.log("tapped " + node.id());
    evt.target.connectedEdges().animate({
      style: { lineColor: "red" },
    });
  });
  const typeRelsValues = props.personsrelatedcyto.edges.map(
    (item) => item.data.type,
  );
  const uniqueSet = new Set(typeRelsValues);

  tiposrels.value = Array.from(uniqueSet);
});

onUnmounted(() => {
  network.removeAllListeners();
});
</script>

<style scoped>
#cyto {
  width: 1000px;
  height: 600px;
  border: 1px solid lightgray;
  margin-bottom: 4em;
}
</style>
