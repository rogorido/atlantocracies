<template>
  <div>
    <h1 class="text-center">Places</h1>
    <ClientOnly>
      <PlacesMap
        :places="places"
        :coordenadas="coordenadas"
        :multipoint="true"
        v-if="loaded"
      />

      <template #fallback> Loading map... </template>
    </ClientOnly>

    <div class="grid">
      <div class="col-6">
        <h2 class="text-center">List of places</h2>
        <DataTable
          :value="places"
          paginator
          stripedRows
          :rows="10"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          selectionMode="single"
          dataKey="place"
          :selection="selectedPlace"
          @rowSelect="onRowSelect"
          v-model:filters="filters"
          filterDisplay="row"
          tableStyle="min-width: 50rem"
          v-if="loaded"
        >
          <Column field="place" header="Place" sortable>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                v-model="filterModel.value"
                type="text"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by name"
              />
            </template>
          </Column>
          <Column field="totalevents" header="Total events" sortable></Column>
          <Column
            field="totalrelations"
            header="Total relations"
            sortable
          ></Column>
          <Column
            field="totalpositions"
            header="Total positions"
            sortable
          ></Column>
          <Column field="totalbirths" header="Total births" sortable></Column>
          <Column field="totaldeaths" header="Total deaths" sortable></Column>
          <Column field="totalplaces" header="Total" sortable></Column>
        </DataTable>
      </div>
      <div class="col-6">
        <h2 class="text-center">Some information</h2>
        <p>Places are important etc.</p>

        <p>
          Our datababase contains information about the titles held by the
          persons. If you click on a row, you will get details about the
          selected title (which persons held it, where and when was it granted,
          etc.).
        </p>
        <p v-show="!authStore.isAuthenticated">
          You have to be
          <Button as="router-link" label="logged in" to="/login" />logged in
          order to see the details!
        </p>
        <p>You can click on a place to see the details.</p>
        <p>You can search by place with the filter option.</p>
        <p>You can sort the table by any column.</p>
      </div>
    </div>
    <Toast />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { usePlacesStore } from "../stores/placesStore";
import { useAuthStore } from "../stores/auth";
import { FilterMatchMode } from "@primevue/core/api";

// es imporante lo de v-if con loaded pq si no locarga antes de tener los datos...
// https://vue-chartjs.org/guide/#chart-with-api-data
const loaded = ref(false);
const places = ref([]);
const coordenadas = ref([]);

const store = usePlacesStore();
const selectedPlace = ref(null);
const authStore = useAuthStore();

const toast = useToast();

const loadData = async () => {
  try {
    if (!store.initialized) {
      await store.fetchPlaces();
    }
    places.value = store.places;
    coordenadas.value = store.coordinates;

    loaded.value = true;
  } catch (err) {
    console.log("Error loading map data.", err);
  }
};

// TODO: la cuestioón es qué hacer con el slug. Tengo una función de chatgpt
// pero si lo paso así luego en la página [placebyid] no puedo acceder al nombre
// con lo que debería meterlo en un store... o pasarlo con un parámetro, pero no
// veo cómo es posible... es posible con query, pero eso es otra cosa...
function goToSite() {
  return navigateTo(`/place/${selectedPlace.value}`);
}

const onRowSelect = (event) => {
  if (!authStore.isAuthenticated) {
    toast.add({
      severity: "error",
      summary: "Not authenticated!",
      detail: "You have to log in to see the details!",
      life: 3500,
    });
  } else {
    selectedPlace.value = event.data.place;
    store.placeSelected(selectedPlace.value);
    goToSite();
  }
};

onMounted(() => {
  loadData();
});

// I dont really understand how this works...
const filters = ref({
  place: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
</script>
