<template>
  <div>
    <DataTable
      :value="typeRelationsSummary"
      paginator
      stripedRows
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      dataKey="idItem"
      tableStyle="max-width: 30rem"
    >
      <template #empty> No relations found. </template>
      <Column field="typeRel" header="Relation type" sortable></Column>
      <Column field="count" header="Total" sortable></Column>
      <Column field="percentage" header="%" sortable> </Column>
    </DataTable>
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
      <Column
        field="namePersonRelated"
        header="Related person"
        sortable
      ></Column>
      <Column
        field="placeRelation"
        header="Place of relation"
        sortable
      ></Column>
    </DataTable>
    <h3>Historical birth places</h3>
    <DataTable
      :value="histBirthMatrimoniosSummary"
      paginator
      stripedRows
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      dataKey="idItem"
      tableStyle="max-width: 30rem"
    >
      <template #empty> No relations found. </template>
      <Column
        field="histBirthRelated"
        header="Historical birth place"
        sortable
      ></Column>
      <Column field="count" header="Total" sortable></Column>
      <Column field="percentage" header="%" sortable> </Column>
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
let removedElements = null;

const cyto = ref(null);

const tiposrels = ref([]);
// const selectedRelation = ref("");

const filters = ref({
  typeRelation: { value: null, matchMode: FilterMatchMode.EQUALS },
});

watch(filters, () => {
  console.log("en modificación");

  // const leches = network.edges('[type != "' + selectedRelation.value + '"]');
  // // console.log(leches);
  // otros = network.remove(leches);

  // primero recupero los elementos que se han quitado
  if (removedElements) {
    removedElements.restore();
  }

  // solo si hay un valor quitamos lso edges
  if (filters.value.typeRelation.value) {
    removedElements = network
      .edges('[type != "' + filters.value.typeRelation.value + '"]')
      .remove();
  }
});

// Paso 1: Contar las ocurrencias de cada valor de `typeRel`
const countMap = props.personsrelated.reduce((acc, item) => {
  acc[item.typeRelation] = (acc[item.typeRelation] || 0) + 1;
  return acc;
}, {});

// Paso 2: Calcular el porcentaje de cada valor
const totalItems = props.personsrelated.length;
const typeRelationsSummary = Object.entries(countMap).map(
  ([typeRel, count]) => ({
    typeRel,
    count,
    percentage: ((count / totalItems) * 100).toFixed(1),
  }),
);

const matrimonios = props.personsrelated.filter(
  (item) => item.typeRelation === "Matrimonio",
);

const countMapMatrimonios = matrimonios.reduce((acc, item) => {
  acc[item.histBirthRelated] = (acc[item.histBirthRelated] || 0) + 1;
  return acc;
}, {});
const totalMatrimonios = matrimonios.length;
const histBirthMatrimoniosSummary = Object.entries(countMapMatrimonios).map(
  ([histBirthRelated, count]) => ({
    histBirthRelated,
    count,
    percentage: ((count / totalMatrimonios) * 100).toFixed(1),
  }),
);

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
