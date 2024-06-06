<template>
  <div>
    <DataTable :value="typeRelationsSummary" paginator stripedRows :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]"
      dataKey="idItem" tableStyle="max-width: 30rem">
      <template #empty> No relations found. </template>
      <Column field="typeRel" header="Relation type" sortable></Column>
      <Column field="count" header="Total" sortable></Column>
      <Column field="percentage" header="%" sortable> </Column>
    </DataTable>
    <div>
      <div id="cyto" ref="cyto"></div>
      <GroupsCytoPopup v-if="showPopup" :data="popupData" :style="popupStyle" @close="showPopup = false" />
    </div>
  </div>
  <div>
    <DataTable v-model:filters="filters" :value="personsrelated" paginator stripedRows filterDisplay="row" :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]" dataKey="idItem" tableStyle="max-width: 80rem">
      <template #empty> No relations found. </template>
      <Column field="nameMainPerson" header="Main Person" sortable></Column>
      <Column field="genderMainPerson" header="Gender" sortable></Column>
      <Column field="typeRelation" header="Relation" sortable>
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown v-model="filterModel.value" :options="tiposrels" @change="filterCallback()" class="p-column-filter"
            placeholder="Search by relation" />
        </template>
      </Column>
      <Column field="namePersonRelated" header="Related person" sortable></Column>
      <Column field="placeRelation" header="Place of relation" sortable></Column>
    </DataTable>
    <h3>Historical birth places</h3>
    <DataTable :value="histBirthMatrimoniosSummary" paginator stripedRows :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]" dataKey="idItem" tableStyle="max-width: 30rem">
      <template #empty> No relations found. </template>
      <Column field="histBirthRelated" header="Historical birth place" sortable></Column>
      <Column field="count" header="Total" sortable></Column>
      <Column field="percentage" header="%" sortable> </Column>
    </DataTable>
    <h2>Marriages and their territorial distribution</h2>
    <TreeTable :value="histBirthMatrimoniosGroupBy" :paginator="true" :rows="10" :rowsPerPageOptions="[10, 20, 30, 40]">
      <template #empty> No positions found. </template>
      <Column field="histBirth" header="Historical birth place" sortable expander></Column>
      <Column field="count" header="Total" sortable></Column>
      <Column field="percentage" header="%" sortable></Column>
    </TreeTable>
    <ClientOnly>
      <PlacesMap :places="placesrelated" :multipoint="multipoint" v-if="showplacesmap" />
      <template #fallback> Loading map... </template>
    </ClientOnly>
  </div>
</template>

<script setup>
import { FilterMatchMode } from "primevue/api";
import cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";
import { groupByHistBirth } from "@/utils/countHistBirthsGroups";

cytoscape.use(fcose);

const props = defineProps({
  personsrelatedcyto: { type: Object, required: true, default: () => { } },
  personsrelated: { type: Array, required: true, default: () => [] },
  placesrelated: { type: Array, required: true, default: () => [] },
});

const showPopup = ref(false);
const popupData = reactive({
  id: '',
  label: '',
  otherField: ''
});
const popupStyle = reactive({
  top: '0px',
  left: '0px'
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

// desglosamos por países para usar un treetable
const histBirthMatrimoniosGroupBy = groupByHistBirth(matrimonios);
console.log("histBirthMatrimoniosGroupBy", histBirthMatrimoniosGroupBy);

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
    const node = evt.target;
    popupData.id = node.data('id');
    popupData.label = node.data('label');
    popupData.otherField = node.data('otherField');
    popupData.isNode = true;

    const position = node.renderedPosition();
    const containerRect = cyto.value.getBoundingClientRect();

    // Lío q hay que hacer para que calcule teniendo en cuenta todo el DOM 
    // idea de chaptgpt
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    popupStyle.top = `${position.y + containerRect.top + scrollTop}px`;
    popupStyle.left = `${position.x + containerRect.left + scrollLeft}px`;

    showPopup.value = true;
  });

  network.on("tap", "edge", function (evt) {
    const edge = evt.target;
    console.log(edge.data('id'));
    popupData.type = edge.data('type');
    // para que el popup represente una cosa u otra...
    popupData.isNode = false;

    // edges no tiene una renederPosition. Hay que calcular la media de los dos nodes.
    let position;
    const sourcePos = edge.source().renderedPosition();
    const targetPos = edge.target().renderedPosition();
    position = {
      x: (sourcePos.x + targetPos.x) / 2,
      y: (sourcePos.y + targetPos.y) / 2
    };

    const containerRect = cyto.value.getBoundingClientRect();

    // Lío q hay que hacer para que calcule teniendo en cuenta todo el DOM 
    // idea de chaptgpt
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    popupStyle.top = `${position.y + containerRect.top + scrollTop}px`;
    popupStyle.left = `${position.x + containerRect.left + scrollLeft}px`;

    showPopup.value = true;
  });

  // esto borra el popup al pulsar fuera
  network.on('tap', (event) => {
    if (event.target === network) {
      showPopup.value = false;
    }
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

// asuntos de las places... realmente esto es una pequeña chapuza.
// TODO: realmente habría que desgajar por tipos, etc. Ver en backend.

const coordinates = ref();
const multipoint = ref(false);
const showplacesmap = ref(false);

// tengo que ver si tiene una o más por ellío de multipoint
if (props.placesrelated.length > 1) {
  coordinates.value = props.placesrelated.map((item) => item.coords);
  multipoint.value = true;
  showplacesmap.value = true;
  console.log(coordinates.value);
} else if (props.placesrelated.length === 1) {
  // tenemos que poner las coordenadas en un array creando un array de arrays
  // pq es lo que tengo definido en PlacesMap
  coordinates.value = [props.placesrelated.coords];
  multipoint.value = false;
  showplacesmap.value = true;
} else {
  showplacesmap.value = false;
}
</script>

<style scoped>
#cyto {
  width: 100%;
  height: 600px;
  border: 1px solid lightgray;
  margin-bottom: 4em;
  position: relative;
}

.popup {
  position: absolute;
  background-color: white;
  border: 1px solid black;
  padding: 10px;
  z-index: 1000;
}
</style>
