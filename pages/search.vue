<template>
  <div>
    <h1 class="text-center">General Search</h1>

    <div class="grid">
      <div class="col-8">
        <Tabs value="0">
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
              <SearchRelationsSelect />
              <SearchTitlesSelect />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>

      <div class="col-4">
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
        @click="onReset"
      />

      <NuxtLink to="/groups">
        <Button
          label="Analyze the group"
          v-tooltip="'Analyze the selected group. You have to be logged in.'"
          :disabled="analyzeButtonDisabled"
          rounded
        />
      </NuxtLink>
    </div>

    <div id="selectedpersons" v-if="persons.length > 0">
      <section>
        <SearchMacroTablePersons />
      </section>
    </div>
    <ScrollTop target="window" :threshold="100" icon="pi pi-arrow-up" />
  </div>
</template>

<script setup>
import { Tab } from "primevue";
import { useFilterStore } from "../stores/filterStore";
import { usePersonsStore } from "../stores/personsStore";
import { useAuthStore } from "../stores/auth";

const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

const persons = ref([]);
const analyzeButtonDisabled = ref(true);

const insightsData = reactive({
  sourcesData: null,
  sourcesChartData: null,
  gendersData: null,
  gendersChartData: null,
  histBirthsChartData: null,
  histBirthsData: null,
  hasTitlesData: null,
  decadesBirthData: null,
});

const loaded = ref(false);

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

// NOTE:
// Importnate: esto no puede ser readonly porque luego los datos
// de los gráficos los modifica chartjs (añade pej los colores)
// provide("insightsData", insightsData);

onMounted(async () => {
  updateData();

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

  // TODO:: actualizamos todo esto que en principio lo usa Insights que antes estaba aquí
  // no sé si quitarlo de aquí?
  insightsData.sourcesData = data.sourcesData;
  insightsData.sourcesChartData = data.sourcesChartData;
  insightsData.gendersData = data.gendersData;
  insightsData.gendersChartData = data.gendersChartData;
  insightsData.histBirthsChartData = data.histBirthsChartData;
  insightsData.histBirthsData = data.histBirthsData;
  insightsData.hasTitlesChartData = data.hasTitlesChartData;
  insightsData.hasTitlesData = data.hasTitlesData;
  insightsData.hasPositionsData = data.hasPositionsData;
  insightsData.hasPositionsChartData = data.hasPositionsChartData;
  insightsData.positionsTableTree = data.positionsTableTree;
  insightsData.decadesBirthData = data.decadesBirthsChartData;

  calculatePercentages();

  storepersons.insightsData = insightsData;

  // Analyze only avalaible under some circumstances
  if (!authStore.isAuthenticated) {
    analyzeButtonDisabled.value = true;
  } else {
    // If there is no filter we disable analysis...
    Object.keys(filter.value).length === 0
      ? (analyzeButtonDisabled.value = true)
      : (analyzeButtonDisabled.value = false);
  }
}

// TODO: aquí hay mucho código repetido...
function calculatePercentages() {
  if (Array.isArray(insightsData.gendersData)) {
    const total = insightsData.gendersData.reduce(
      (total, obj) => total + obj.count,
      0,
    );
    insightsData.gendersData.forEach((obj) => {
      let porcentaje = (obj.count / total) * 100;
      obj.percent = porcentaje.toFixed(2);
    });
  }

  // sources data
  if (Array.isArray(insightsData.sourcesData)) {
    const total = insightsData.sourcesData.reduce(
      (total, obj) => total + obj.count,
      0,
    );
    insightsData.sourcesData.forEach((obj) => {
      let porcentaje = (obj.count / total) * 100;
      obj.percent = porcentaje.toFixed(2);
    });
  }

  // histBirthsData
  if (Array.isArray(insightsData.histBirthsData)) {
    const sumaTotal = insightsData.histBirthsData.reduce(
      (total, obj) => total + obj.count,
      0,
    );

    // Calcular el porcentaje para cada objeto en el array
    insightsData.histBirthsData.forEach((obj) => {
      let porcentaje = (obj.count / sumaTotal) * 100;
      obj.percent = porcentaje.toFixed(2);
    });
  }

  if (Array.isArray(insightsData.hasTitlesData)) {
    const sumaTotal = insightsData.hasTitlesData.reduce(
      (total, obj) => total + obj.count,
      0,
    );

    // Calcular el porcentaje para cada objeto en el array
    insightsData.hasTitlesData.forEach((obj) => {
      let porcentaje = (obj.count / sumaTotal) * 100;
      obj.percent = porcentaje.toFixed(2);
    });
  }

  // positions
  if (Array.isArray(insightsData.hasPositionsData)) {
    const sumaTotal = insightsData.hasPositionsData.reduce(
      (total, obj) => total + obj.count,
      0,
    );

    // Calcular el porcentaje para cada objeto en el array
    insightsData.hasPositionsData.forEach((obj) => {
      let porcentaje = (obj.count / sumaTotal) * 100;
      obj.percent = porcentaje.toFixed(2);
    });
  }
}

function onReset() {
  storefilter.$reset();
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
