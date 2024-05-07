<template>
  <div v-if="pending">Loading data</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else>
    <h1 class="text-center">
      {{ data.persondetails ? data.persondetails.name : "" }}
    </h1>
    <div class="grid">
      <div class="col-6">
        <h2>Relations</h2>
        <PersonsRelationsTable :relations="data.persondetails.relations" />
      </div>
      <div class="col-6">
        <h2>Titles</h2>
        <PersonsTitlesTable :titles="data.persondetails.titles" />
      </div>
    </div>
    <div class="grid">
      <div class="col-6">
        <h2>Events</h2>
        <PersonsEventsTable :events="data.persondetails.events" />
      </div>
      <div class="col-6">
        <h2>Positions</h2>
        <PersonsPositionsTable :positions="data.persondetails.positions" />
      </div>
    </div>
    <PersonsEventsTimeLine :eventstimeline="data.personeventstimeline" />
    <PersonsRelationsGraph :personsrelated="data.personnetwork" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { usePersonsStore } from "../../stores/personsStore";

//import { createSlug } from "../../utils/createSlug.ts";
//console.log(createSlug(useRoute().params.placebyid));

const loaded = ref(false);
const store = usePersonsStore();

const eventstimeline = ref({});
const relationsnetwork = ref({});

const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

// with useLazyFetch the page is loaded while the data is being fetched
const { data, pending, error } = await useLazyFetch(
  `${api}/persons/personsbyid/${useRoute().params.personbyid}`
);
const loadPersonsData = async () => {
  try {
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

const getName = computed(() => {
  personData.value.name;
});
</script>
