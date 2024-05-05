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
    <div>
      <TabView>
        <TabPanel header="Related persons">
          <h2>Persons related to {{ useRoute().params.placebyid }}</h2>
          <p>
            There are {{ persons.length }} persons related to
            {{ useRoute().params.placebyid }}. You can click on a person to see
            the datails.
          </p>
          <PersonsTable :persons="persons" v-if="personsloaded" />
        </TabPanel>

        <TabPanel header="Related places">
          <h2>Places related to {{ useRoute().params.placebyid }}</h2>
          <RelatedPlaces
            :placesrelated="placesrelated"
            v-if="placesrelatedloaded"
          />
        </TabPanel>
        <TabPanel header="Related events">
          <div class="grid">
            <div class="col-6">
              <h2>Events related to {{ useRoute().params.placebyid }}</h2>
              <EventsTable
                :eventsrelated="eventsrelated.result"
                v-if="eventsrelatedloaded"
              />
            </div>
            <div class="col-6">
              <EventsGraph
                :eventsrelated="eventsrelated"
                v-if="eventsrelatedloaded"
              />
            </div>
          </div>
        </TabPanel>
      </TabView>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { usePlacesStore } from "../stores/placesStore";
import { usePersonsStore } from "../stores/personsStore";
import CardDataPlace from "~/components/CardDataPlace.vue";

//import { createSlug } from "../../utils/createSlug.ts";
//console.log(createSlug(useRoute().params.placebyid));

const places = ref([]);
const persons = ref([]);
const placesrelated = ref();
const eventsrelated = ref();

const toast = useToast();

const loaded = ref(false);
const personsloaded = ref(false);
const placesrelatedloaded = ref(false);
const eventsrelatedloaded = ref(false);

const store = usePlacesStore();
const storepersons = usePersonsStore();
const ciudad = ref();
const selectedPerson = ref(null);

// we get a array with only one obje
ciudad.value = store.nuevo;
console.log("el valor de ciudad es: ", JSON.stringify(ciudad.value, null, 2));
// tenemos que poner las coordenadas en un array creando un array de arrays
// pq es lo que tengo definidio en PlacesMap
const coordenadas = [ciudad.value.coords];

const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

const loadPlaceData = async () => {
  try {
    const data = await $fetch(`${api}/places/${useRoute().params.placebyid}`);
    places.value = data;

    loaded.value = true;
  } catch (err) {
    console.log("error en mymap5", err);
  }
};

const loadPersonsData = async () => {
  try {
    const data = await $fetch(
      `${api}/persons/personsbyplace/${useRoute().params.placebyid}`
    );

    persons.value = data;
    personsloaded.value = true;
  } catch (err) {
    console.log("error en mymap5", err);
  }
};

const loadRelatedPlacesData = async () => {
  try {
    const { data } = await $fetch(
      `${api}/places/related/${useRoute().params.placebyid}`
    );

    placesrelated.value = data;

    // console.log(
    //   "el valor de placesrelated es: ",
    //   JSON.stringify(placesrelated.value, null, 2)
    // );
    placesrelatedloaded.value = true;
  } catch (err) {
    console.log("error en loadRelatedPlaces", err);
  }
};

const loadRelatedEventsData = async () => {
  try {
    const data = await $fetch(
      `${api}/events/eventsbyplace/${useRoute().params.placebyid}`
    );

    eventsrelated.value = data;

    // console.log(
    //   "el valor de eventsrelated es: ",
    //   JSON.stringify(eventsrelated.value, null, 2)
    // );
    eventsrelatedloaded.value = true;
  } catch (err) {
    console.log("error en loadRelatedPlaces", err);
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

onMounted(() => {
  loadPlaceData();
  loadPersonsData();
  loadRelatedPlacesData();
  loadRelatedEventsData();
});

// TODO: la cuestioón es qué hacer con el slug. Tengo una función de chatgpt
// pero si lo paso así luego en la página [placebyid] no puedo acceder al nombre
// con lo que debería meterlo en un store... o pasarlo con un parámetro, pero no
// veo cómo es posible... es posible con query, pero eso es otra cosa...
function probar() {
  // return navigateTo(`/place/${selectedPlace.value}`, {
  //   open: { target: "_blank" },
  // });

  return navigateTo(`/person/${selectedPerson.value}`);
}

const onRowSelect = (event) => {
  toast.add({
    severity: "info",
    summary: "Person",
    detail: event.data.name,
    life: 2000,
  });
  selectedPerson.value = event.data._id;
  storepersons.selectPerson(selectedPerson.value);
  probar();
};
</script>
