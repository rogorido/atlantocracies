<template>
  <div>
    <h1 class="text-center">{{ useRoute().params.placebyid }}</h1>
    <div class="grid">
      <div class="col-6">
        <div class="grid">
          <CardDataPlace :place="ciudad" />
        </div>
      </div>
      <div class="col-6">
        <ClientOnly>
          <PlacesMap
            :coordenadas="coordenadas"
            :multipoint="false"
            v-if="loaded"
          />

          <template #fallback> Loading map... </template>
        </ClientOnly>
      </div>
    </div>
    <div v-if="pending">Loading data...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <TabView>
        <TabPanel header="Related persons">
          <h2>Persons related to {{ useRoute().params.placebyid }}</h2>
          <p>
            There are {{ data.personsall.length }} persons related to
            {{ useRoute().params.placebyid }}. You can click on a person to see
            the datails.
          </p>
          <PersonsTable :persons="data.personsall" />
        </TabPanel>

        <TabPanel header="Related places">
          <h2>Places related to {{ useRoute().params.placebyid }}</h2>
          <RelatedPlaces :placesrelated="data.placesrelated" />
        </TabPanel>
        <TabPanel header="Related events">
          <div class="grid">
            <div class="col-6">
              <h2>Events related to {{ useRoute().params.placebyid }}</h2>
              <EventsTable :eventsrelated="data.eventsrelated.eventsplace" />
            </div>
            <div class="col-6">
              <EventsGraph :eventsrelated="data.eventsrelated" />
            </div>
          </div>
        </TabPanel>
      </TabView>
    </div>
  </div>
</template>

<script setup>
import { usePlacesStore } from "../stores/placesStore";
import CardDataPlace from "~/components/CardDataPlace.vue";

//import { createSlug } from "../../utils/createSlug.ts";
//console.log(createSlug(useRoute().params.placebyid));

const loaded = ref(false);
const store = usePlacesStore();
const ciudad = ref();

// we get a array with only one obje
ciudad.value = store.nuevo;
// console.log("el valor de ciudad es: ", JSON.stringify(ciudad.value, null, 2));

// tenemos que poner las coordenadas en un array creando un array de arrays
// pq es lo que tengo definido en PlacesMap
const coordenadas = [ciudad.value.coords];

if (coordenadas) {
  loaded.value = true;
}

const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

// with useLazyFetch the page is loaded while the data is being fetched
const { data, pending, error } = await useLazyFetch(
  `${api}/places/placeid/${useRoute().params.placebyid}`
);
</script>
