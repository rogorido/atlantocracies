<template>
  <div>
    <h1 class="text-center">Search</h1>

    <div class="grid">
      <div class="col-4">
        <SearchGenderOption />
        <SearchMarriedOption />
        <SearchHasEventsOption />
        <SearchHasTitlesOption />
        <SearchHasPositionsOption />
      </div>

      <div class="col-4">
        <!-- TODO faltan lo de places  -->
        <SearchPositionsSelect />
        <SearchHistBirthsSelect />
        <SearchRelationsSelect />
        <SearchTitlesSelect />
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
      <Button label="Reset filters" @click="onReset" />
      <Button label="Save filter" disabled />
      <Button label="Load filter" disabled />
      <Button label="Save results" disabled />
    </div>

    <div class="flex gap-3 mt-4">
      <NuxtLink to="#selectedpersons">
        <Button label="View Persons" rounded />
      </NuxtLink>

      <NuxtLink to="#insights">
        <Button label="View insights" rounded />
      </NuxtLink>

      <NuxtLink to="/groups">
        <Button
          label="Analyze the group"
          :disabled="analyzeButtonDisabled"
          rounded
        />
      </NuxtLink>
    </div>

    <div id="selectedpersons" v-if="persons.length > 0">
      <section>
        <SearchMacroTablePersons />
      </section>
      <section>
        <SearchInsights />
      </section>
    </div>
    <ScrollTop target="window" :threshold="100" icon="pi pi-arrow-up" />
  </div>
</template>

<script setup>
import { useFilterStore } from "../stores/filterStore";
import { usePersonsStore } from "../stores/personsStore";

const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

const persons = ref([]);
const analyzeButtonDisabled = ref(true);

const insightsData = reactive({
  gendersData: null,
  gendersChartData: null,
  histBirthsChartData: null,
  histBirthsData: null,
  hasTitlesData: null,
  decadesBirthData: null,
});

const loaded = ref(false);

const storefilter = useFilterStore();
const storepersons = usePersonsStore();

// si no use storeToRefs funciona cuando actualizo en los componentes
// pero no si actualizo directamente en el store con $reset.
// Esto obliga a usar luego .value!
// Además no sé por qué no desestructura solo el filter
// https://stackoverflow.com/questions/71676111/vue-component-doesnt-update-after-state-changes-in-pinia-store?noredirect=1&lq=1
const { filter } = storeToRefs(storefilter);

provide("persons", readonly(persons));

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

  insightsData.gendersData = data.gendersData;
  insightsData.gendersChartData = data.gendersChartData;
  insightsData.histBirthsChartData = data.histBirthsChartData;
  insightsData.histBirthsData = data.histBirthsData;
  insightsData.hasTitlesData = data.hasTitlesChartData;
  insightsData.decadesBirthData = data.decadesBirthsChartData;

  calculatePercentages();

  // storepersons.persons = persons.value;
  storepersons.insightsData = insightsData;
  if (Object.keys(filter.value).length === 0) {
    analyzeButtonDisabled.value = true;
  } else {
    analyzeButtonDisabled.value = false;
  }
}

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

  // Calcular la suma total de todos los valores
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
}

function onReset() {
  storefilter.$reset();
}
</script>

<style>
ul.p-tabview-nav {
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
