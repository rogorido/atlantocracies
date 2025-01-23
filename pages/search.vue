<template>
  <div class="p-container-fluid">
    <h1 class="text-center">General Search</h1>

    <div class="grid">
      <div class="col-12 lg:col-8">
        <Tabs value="0" scrollable>
          <TabList>
            <Tab
              v-tooltip="'Select filters related to personal aspects.'"
              value="0"
              >Personal filters</Tab
            >
            <Tab value="1">Professional filters</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="0">
              <SearchGenderOption />
              <SearchMarriedOption />
              <SearchBirthSelect />
              <SearchDeathSelect />
              <SearchHistBirthsSelect />
              <SearchSourceSelect />
            </TabPanel>
            <TabPanel value="1">
              <SearchHasEventsOption />
              <SearchHasTitlesOption />
              <SearchHasPositionsOption />
              <SearchPositionsSelect />
              <SearchEventsSelect />
              <SearchRelationsSelect />
              <SearchTitlesSelect />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>

      <div class="col-12 lg:col-4">
        <Card>
          <template #title>Persons</template>
          <template #content>
            <p>
              {{ persons.length }}
            </p>
          </template>
        </Card>
      </div>
    </div>
    <div class="flex gap-3">
      <Button
        v-tooltip="'Reset all filters.'"
        label="Reset filters"
        icon="pi pi-filter"
        @click="onReset"
      />

      <Button
        label="Analyze the group"
        v-tooltip="'Analyze the selected group. You have to be logged in.'"
        icon="pi pi-objects-column"
        :disabled="ButtonDisabled"
        @click="goToSite"
        :loading="loadingGroups"
        rounded
      />

      <Button
        v-tooltip="'Download the used filter for using it in MongoDB Compass.'"
        icon="pi pi-download"
        :disabled="ButtonDisabled"
        label="Download filter"
        @click="downloadFilter"
      />
    </div>
  </div>

  <DividerShape class="mt-3" />

  <div class="p-container-fluid">
    <div id="selectedpersons" v-if="persons.length > 0">
      <section>
        <SearchMacroTablePersons />
      </section>
    </div>
    <ScrollTop target="window" :threshold="100" icon="pi pi-arrow-up" />
    <Toast />
  </div>
</template>

<script setup>
import { Tab } from "primevue";
import { useFilterStore } from "../stores/filterStore";
import { usePersonsStore } from "../stores/personsStore";
import { useAuthStore } from "../stores/auth";
import { DividerShape } from "#components";

const toast = useToast();

const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

const persons = ref([]);
const filterUsed = ref(); // for being downloadead
const ButtonDisabled = ref(true);

const loaded = ref(false);
const loadingGroups = ref(false);

const authStore = useAuthStore();
const storefilter = useFilterStore();
const storepersons = usePersonsStore();

// si no uso storeToRefs funciona cuando actualizo en los componentes
// pero no si actualizo directamente en el store con $reset.
// Esto obliga a usar luego .value!
// Además no sé por qué no desestructura solo el filter
// https://stackoverflow.com/questions/71676111/vue-component-doesnt-update-after-state-changes-in-pinia-store?noredirect=1&lq=1
const { filter } = storeToRefs(storefilter);

provide("persons", readonly(persons));

function goToSite() {
  loadingGroups.value = true;
  return navigateTo("/groups");
}

// NOTE:
// Importnate: esto no puede ser readonly porque luego los datos
// de los gráficos los modifica chartjs (añade pej los colores)
// provide("insightsData", insightsData);

onMounted(async () => {
  updateData();

  if (Object.keys(filter.value).length > 0) {
    console.log("estamos en el toast");
    toast.add({
      severity: "info",
      summary: "Filter activated",
      detail:
        "There is an active filter. You can reset it by clicking on the 'Reset filter' button",
      life: 3000,
    });
  }

  loaded.value = true;
});

// es mejor que watch(filter)
// https://pinia.vuejs.org/core-concepts/state.html
storefilter.$subscribe((mutation, state) => {
  updateData();
  localStorage.setItem("filter", JSON.stringify(filter.value));
});

async function updateData() {
  const data = await $fetch(`${api}/search/`, {
    method: "POST",
    body: filter.value,
  });

  persons.value = data.result;

  storepersons.insightsData = data.insightsData;

  // Analyze only avalaible under some circumstances
  if (!authStore.isAuthenticated) {
    ButtonDisabled.value = true;
  } else {
    // If there is no filter we disable analysis...
    Object.keys(filter.value).length === 0
      ? (ButtonDisabled.value = true)
      : (ButtonDisabled.value = false);
  }
}

function onReset() {
  storefilter.$reset();
}

function downloadFilter() {
  filterUsed.value = filter.value;

  // Convertir el objeto en una cadena JSON
  const jsonString = JSON.stringify(filter.value, null, 2);

  // Crear un blob con los datos
  const blob = new Blob([jsonString], { type: "application/json" });
  // Crear un enlace en memoria y disparar su descarga
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "filter-atlanto.json";
  link.style.display = "none"; // No se muestra en pantalla
  document.body.appendChild(link);
  link.click(); // Simular el clic
  document.body.removeChild(link); // Eliminar el enlace del DOM

  // Liberar memoria
  URL.revokeObjectURL(link.href);
}
</script>

<style>
.p-tablist-tab-list {
  justify-content: center;
}

.numero {
  font-size: 2.4rem;
}

.p-card {
  border: 3px dashed var(--primary-color);
}

.p-card-content > p {
  font-size: 2.4rem;
  color: #af2f14;
  text-align: center;
}

.p-card-title {
  text-align: center;
  font-size: 1.7rem;
}
</style>
