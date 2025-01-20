<template>
  <div class="grid">
    <div class="col-8">
      <p>
        The selected persons had relationships with many other peersons,forming
        a network. In the database there are {{ personsRelated.length }} persons
        related to the selected persons.
      </p>
      <p>Los datos pueden ser analizados desde diferentes pespectivas.</p>
      <p>
        A la derecha aparecen los tipos de relaciones en términos absolutos y
        relativos. y sus prooporciones.
      </p>
      <p>
        Podemos analizar también quiénes son las personas con las que
        entretienen relaciones. Y visualizar las relaciones con un grafo.
      </p>
    </div>
    <div class="col-4">
      <GroupsRelationsSummaryTable :personsrelated="personsRelated" />
    </div>
  </div>
  <div id="RelationshipsGraph">
    <h3 class="text-center">Graph of relationships</h3>
    <div id="cyto" ref="cyto"></div>
    <GroupsCytoPopup
      v-if="showPopup"
      :data="popupData"
      :style="popupStyle"
      @close="showPopup = false"
    />
  </div>

  <!-- Personas relacionadas -->
  <hr class="simplehr" />
  <h3 class="text-center">Related Persons</h3>
  <div>
    <DataTable
      v-model:filters="filters"
      :value="personsRelated"
      paginator
      stripedRows
      filterDisplay="row"
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      dataKey="idItem"
      tableStyle="max-width: 80rem"
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

    <DividerShape />
    <!-- <hr class="simplehr" /> -->
    <!-- <hr class="simplehr" /> -->
    <!-- Historical birthplaces  -->
    <div id="marriages">
      <GroupsRelationsHistoricalBirths :personsrelated="personsRelated" />
    </div>

    <!-- Lugares relacionados -->
    <DividerShape />
    <!-- <hr class="simplehr" /> -->
    <h3 id="places" class="text-center">Related Places</h3>
    <ClientOnly>
      <PlacesMap
        :places="placesRelated"
        :multipoint="multipoint"
        v-if="showplacesmap"
      />
      <template #fallback> Loading map... </template>
    </ClientOnly>
  </div>
</template>

<script setup>
import { FilterMatchMode } from "@primevue/core/api";
import cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";

cytoscape.use(fcose);

const props = defineProps({
  personsRelatedCyto: { type: Object, required: true, default: () => {} },
  personsRelated: { type: Array, required: true, default: () => [] },
  placesRelated: { type: Array, required: true, default: () => [] },
});

const showPopup = ref(false);
const popupData = reactive({
  id: "",
  label: "",
  otherField: "",
});
const popupStyle = reactive({
  top: "0px",
  left: "0px",
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
  // console.log("en modificación");

  // const leches = network.edges('[type != "' + selectedRelation.value + '"]');
  // // console.log(leches);
  // otros = network.remove(leches);

  // primero recupero los elementos que se han quitado
  if (removedElements) {
    removedElements.restore();
  }

  // solo si hay un valor quitamos lso edges
  if (filters.value.typeRelation.value) {
    let removedEdges = network
      .edges('[type != "' + filters.value.typeRelation.value + '"]')
      .remove();

    let removedNodes = network
      .nodes()
      .filter((node) => node.degree() === 0)
      .remove();

    removedElements = removedNodes.union(removedEdges);
  }
});

onMounted(() => {
  // console.log("the props are: ", JSON.stringify(props, null, 2));

  var elements = {
    nodes: props.personsRelatedCyto.nodes,
    edges: props.personsRelatedCyto.edges,
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
      {
        selector: ".parent",
        style: { "line-color": "green", "line-style": "dashed" },
      },
    ],
  });

  network.on("tap", "node", function (evt) {
    const node = evt.target;
    popupData.id = node.data("id");
    popupData.label = node.data("label");
    popupData.otherField = node.data("otherField");
    popupData.isNode = true;

    const position = node.renderedPosition();
    const containerRect = cyto.value.getBoundingClientRect();

    // Lío q hay que hacer para que calcule teniendo en cuenta todo el DOM
    // idea de chaptgpt
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;
    popupStyle.top = `${position.y + containerRect.top + scrollTop}px`;
    popupStyle.left = `${position.x + containerRect.left + scrollLeft}px`;

    showPopup.value = true;
  });

  network.on("tap", "edge", function (evt) {
    const edge = evt.target;
    console.log(edge.data("id"));
    popupData.type = edge.data("type");
    // para que el popup represente una cosa u otra...
    popupData.isNode = false;

    // edges no tiene una renederPosition. Hay que calcular la media de los dos nodes.
    let position;
    const sourcePos = edge.source().renderedPosition();
    const targetPos = edge.target().renderedPosition();
    position = {
      x: (sourcePos.x + targetPos.x) / 2,
      y: (sourcePos.y + targetPos.y) / 2,
    };

    const containerRect = cyto.value.getBoundingClientRect();

    // Lío q hay que hacer para que calcule teniendo en cuenta todo el DOM
    // idea de chaptgpt
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;
    popupStyle.top = `${position.y + containerRect.top + scrollTop}px`;
    popupStyle.left = `${position.x + containerRect.left + scrollLeft}px`;

    showPopup.value = true;
  });

  // esto borra el popup al pulsar fuera
  network.on("tap", (event) => {
    if (event.target === network) {
      showPopup.value = false;
    }
  });

  const typeRelsValues = props.personsRelatedCyto.edges.map(
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
if (props.placesRelated.length > 1) {
  coordinates.value = props.placesRelated.map((item) => item.coords);
  multipoint.value = true;
  showplacesmap.value = true;
  console.log(coordinates.value);
} else if (props.placesRelated.length === 1) {
  // tenemos que poner las coordenadas en un array creando un array de arrays
  // pq es lo que tengo definido en PlacesMap
  coordinates.value = [props.placesRelated.coords];
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

hr {
  border: none;
  height: 20px;
  background-color: #cd4f35; /* Color de la línea */
  margin: 20px 0; /* Espaciado superior e inferior */
}

hr.simplehr {
  border: none;
  height: 5px;
  background-color: #cd4f35; /* Color de la línea */
  margin: 20px 0; /* Espaciado superior e inferior */
}
</style>
