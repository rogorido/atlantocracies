<template>
  <div class="p-container-fluid">
    <h1 class="text-center">{{ useRoute().params.placebyid }}</h1>
    <div class="grid">
      <div class="col-12 md:col-4">
        <PlacesCardDataPlace :place="ciudad" />
      </div>
      <div class="col-12 md:col-8">
        <ClientOnly>
          <PlacesMap :places="[ciudad]" :multipoint="false" v-if="loaded" />

          <template #fallback> Loading map... </template>
        </ClientOnly>
      </div>
    </div>
  </div>

  <DividerShape />

  <div class="p-container-fluid">
    <div v-if="status === 'pending'">Loading data...</div>
    <div v-if="status === 'error'">{{ error }}</div>
    <div v-else>
      <Tabs value="0" scrollable>
        <TabList :dt="cojones">
          <Tab value="0">Related persons</Tab>
          <!-- <Tab value="1">Related places</Tab> -->
          <Tab value="1">Related events</Tab>
        </TabList>

        <!-- Related persons -->
        <TabPanel value="0">
          <h2>Persons related to {{ useRoute().params.placebyid }}</h2>
          <p>
            There are {{ data.personsall.length }} persons related to
            {{ useRoute().params.placebyid }}. You can click on a person to see
            the datails.
          </p>
          <SearchMacroTablePersons />
        </TabPanel>

        <!-- Related places -->
        <!-- <TabPanel value="1"> -->
        <!--   <h2>Places related to {{ useRoute().params.placebyid }}</h2> -->
        <!--   <PlacesRelatedPlaces :placesrelated="data.placesrelated" /> -->
        <!-- </TabPanel> -->

        <!-- Related events -->
        <TabPanel value="1">
          <div class="grid">
            <div class="col-6">
              <h2>Events related to {{ useRoute().params.placebyid }}</h2>
              <EventsTable :eventsrelated="data.eventsplace" />
            </div>
            <!-- <div class="col-6"> -->
            <!--   <EventsGraph :eventsrelated="data.eventsrelated" /> -->
            <!-- </div> -->
          </div>
        </TabPanel>
      </Tabs>
    </div>
  </div>
</template>

<script setup>
import { usePlacesStore } from "../stores/placesStore";

const loaded = ref(false);
const store = usePlacesStore();
const ciudad = ref();
const persons = ref([]);

const cojones = ref({ "justify-content": "center" });
// we get a array with only one obje
ciudad.value = store.nuevo;
console.log(
  "el valor de ciudad es: ",
  JSON.stringify(ciudad.value.coords, null, 2),
);

// tenemos que poner las coordenadas en un array creando un array de arrays
// pq es lo que tengo definido en PlacesMap
const coordenadas = [ciudad.value.coords];

console.log("el valor de corrods es: ", coordenadas);
if (coordenadas) {
  loaded.value = true;
}

const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

// with useLazyFetch the page is loaded while the data is being fetched
const { data, status, error } = await useFetch(
  `${api}/places/placeid/${useRoute().params.placebyid}`,
);

if (data) {
  persons.value = data.value.personsall;
  provide("persons", readonly(persons.value));
  console.log(persons.value);
}
</script>
