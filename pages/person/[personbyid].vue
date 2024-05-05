<template>
  <div v-if="pending">Loading data</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else>
    <h1 class="text-center">{{ personData ? personData.name : "" }}</h1>
    <div class="grid">
      <div class="col-6">
        <h2>Relations</h2>
        <PersonsRelationsTable :relations="relations" />
      </div>
      <div class="col-6">
        <h2>Titles</h2>
        <PersonsTitlesTable :titles="titles" />
      </div>
    </div>
    <div class="grid">
      <div class="col-6">
        <h2>Events</h2>
        <PersonsEventsTable :events="events" />
      </div>
      <div class="col-6">
        <h2>Positions</h2>
        <PersonsPositionsTable :positions="positions" />
      </div>
    </div>
    <PersonsEventsTimeLine :eventstimeline="eventstimeline" v-if="loaded" />
    <PersonsRelationsGraph :personsrelated="relationsnetwork" v-if="loaded" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { usePersonsStore } from "../../stores/personsStore";

//import { createSlug } from "../../utils/createSlug.ts";
//console.log(createSlug(useRoute().params.placebyid));

const loaded = ref(false);
const store = usePersonsStore();

const personData = ref(null);
const relations = ref([]);
const events = ref([]);
const positions = ref([]);
const titles = ref([]);
const eventstimeline = ref({});
const relationsnetwork = ref({});

const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

// we get a array with only one obje
//ciudad.value = store.nuevo;
//console.log("el valor de ciudad es: ", JSON.stringify(ciudad.value, null, 2));
// tenemos que poner las coordenadas en un array creando un array de arrays
// pq es lo que tengo definidio en PlacesMap
//const coordenadas = [ciudad.value.coords];

const loadPersonsData = async () => {
  try {
    const data = await $fetch(
      `${api}/persons/personsbyid/${useRoute().params.personbyid}`
    );

    personData.value = data.persondetails;

    // console.log("la presona es: ", JSON.stringify(personData.value, null, 2));
    relations.value = personData.value.relations;
    events.value = personData.value.events;
    positions.value = personData.value.positions;
    titles.value = personData.value.titles;
    eventstimeline.value = data.personeventstimeline;
    relationsnetwork.value = data.personnetwork;

    loaded.value = true;
  } catch (err) {
    console.log("error en mymap5", err);
  }
};

const columns = [
  { field: "name", header: "Name" },
  { field: "gender", header: "Gender" },
  { field: "histBirth", header: "Birth territory" },
  { field: "wasMarried", header: "Was married" },
  //  { field: "hasFather", header: "Has father" },
  { field: "hasMother", header: "Has mother" },
  { field: "tiposEventos", header: "Eventos" },
];

loadPersonsData();

const getName = computed(() => {
  personData.value.name;
});
</script>
