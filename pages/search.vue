<template>
  <div>
    <h1 class="text-center">Search</h1>

    <div class="grid">
      <div class="col-4">
        <div class="flex gap-3 mb-3">
          <div
            v-for="gender in genders"
            :key="gender.key"
            class="flex align-items-center"
          >
            <RadioButton
              v-model="selectedGender"
              :inputId="gender.key"
              name="dynamic"
              :value="gender.name"
              @change="onGenderChange"
            />
            <label :for="gender.key" class="ml-2">{{ gender.name }}</label>
          </div>
        </div>

        <!-- married  -->
        <div class="flex gap-3 mb-3">
          <div
            v-for="married in marriedclasses"
            :key="married.key"
            class="flex align-items-center"
          >
            <RadioButton
              v-model="selectedMarried"
              :inputId="married.key"
              name="dynamic"
              :value="married.name"
              @change="onMarriedChange"
            />
            <label :for="married.key" class="ml-2">{{ married.name }}</label>
          </div>
        </div>

        <!-- Hasevents  -->
        <div class="flex gap-3 mb-3">
          <div
            v-for="hasevent in hasevents"
            :key="hasevent.key"
            class="flex align-items-center"
          >
            <RadioButton
              v-model="selectedHasEvent"
              :inputId="hasevent.key"
              name="dynamic"
              :value="hasevent.name"
              @change="onHasEventChange"
            />
            <label :for="hasevent.key" class="ml-2">{{ hasevent.name }}</label>
          </div>
        </div>

        <!-- HasTitles  -->
        <div class="flex gap-3 mb-3">
          <div
            v-for="hastitle in hastitles"
            :key="hastitle.key"
            class="flex align-items-center"
          >
            <RadioButton
              v-model="selectedHasTitle"
              :inputId="hastitle.key"
              name="dynamic"
              :value="hastitle.name"
              @change="onHasTitleChange"
            />
            <label :for="hastitle.key" class="ml-2">{{ hastitle.name }}</label>
          </div>
        </div>

        <!-- HasPositions  -->
        <div class="flex gap-3 mb-3">
          <div
            v-for="hasposition in haspositions"
            :key="hasposition.key"
            class="flex align-items-center"
          >
            <RadioButton
              v-model="selectedHasPosition"
              :inputId="hasposition.key"
              name="dynamic"
              :value="hasposition.name"
              @change="onHasPositionChange"
            />
            <label :for="hasposition.key" class="ml-2">{{
              hasposition.name
            }}</label>
          </div>
        </div>
      </div>

      <div class="col-4">
        <!-- Places  -->
        <div>
          <MultiSelect
            v-model="selectedPlace"
            display="chip"
            :options="places"
            optionLabel="place"
            placeholder="Select places"
            :maxSelectedLabels="3"
            @change="onPlaceChange"
            class="mb-3 w-full"
          />
        </div>
        <!-- Positions  -->
        <div>
          <MultiSelect
            v-model="selectedPosition"
            display="chip"
            filter
            :options="positions"
            optionLabel="_id"
            placeholder="Select positions"
            :maxSelectedLabels="3"
            @change="onPositionChange"
            class="mb-3 w-full"
          />
        </div>
        <!-- Relations  -->
        <div>
          <MultiSelect
            v-model="selectedRelation"
            display="chip"
            filter
            :options="relations"
            optionLabel="_id"
            placeholder="Select relations"
            :maxSelectedLabels="3"
            @change="onRelationChange"
            class="mb-3 w-full"
          />
        </div>

        <!-- Titles  -->
        <div>
          <MultiSelect
            v-model="selectedTitle"
            display="chip"
            filter
            :options="titles"
            optionLabel="_id"
            placeholder="Select titles"
            :maxSelectedLabels="3"
            @change="onTitleChange"
            class="mb-3 w-full"
          />
        </div>

        <!-- Histbirths  -->
        <div>
          <MultiSelect
            v-model="selectedHistBirth"
            display="chip"
            filter
            :options="histbirths"
            optionLabel="_id"
            placeholder="Select historical birth country"
            :maxSelectedLabels="3"
            @change="onHistbirthChange"
            class="w-full"
          />
        </div>
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
    </div>

    <div id="selectedpersons" v-if="persons.length > 0">
      <section>
        <SearchMacroTablePersons />
      </section>
      <section><SearchInsights /></section>
    </div>
    <ScrollTop target="window" :threshold="100" icon="pi pi-arrow-up" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

import { usePlacesStore } from "../stores/placesStore";
import { usePositionsStore } from "../stores/positionsStore";
import { useRelationsStore } from "../stores/relationsStore";
import { useTitlesStore } from "../stores/titlesStore";
import { useFilterStore } from "../stores/filterStore";
// import Knob from "primevue/knob";

const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

const persons = ref([]);
const places = ref([]);
const positions = ref([]);
const relations = ref([]);
const titles = ref([]);
const histbirths = ref([]);

const insightsData = reactive({
  gendersData: null,
  gendersChartData: null,
  histBirthsChartData: null,
  histBirthsData: null,
  hasTitlesData: null,
  decadesBirthData: null,
});

const loaded = ref(false);

const filter = ref({});

const storeplaces = usePlacesStore();
const storepositions = usePositionsStore();
const storerelations = useRelationsStore();
const storetitles = useTitlesStore();
const storefilter = useFilterStore();

const selectedPlace = ref();
const selectedPosition = ref();
const selectedRelation = ref();
const selectedTitle = ref();
const selectedHistBirth = ref();

provide("persons", readonly(persons));

// Importnate: esto no puede ser readonly porque hay los datos
// de los gráficos los modifica chartjs (añade pej los colores)
provide("insightsData", insightsData);

const selectedGender = ref("All");
const genders = ref([
  { name: "All", key: "A" },
  { name: "Man", key: "M" },
  { name: "Woman", key: "W" },
]);

const selectedMarried = ref("All");
const marriedclasses = ref([
  { name: "All", key: "A" },
  { name: "Married", key: "M" },
  { name: "Not married", key: "N" },
]);

const selectedHasEvent = ref("All");
const hasevents = ref([
  { name: "All", key: "A" },
  { name: "Has events", key: "Y" },
  { name: "Does not have events", key: "N" },
]);

const selectedHasTitle = ref("All");
const hastitles = ref([
  { name: "All", key: "A" },
  { name: "Has titles", key: "Y" },
  { name: "Does not have titles", key: "N" },
]);

const selectedHasPosition = ref("All");
const haspositions = ref([
  { name: "All", key: "A" },
  { name: "Has positions", key: "Y" },
  { name: "Does not have positions", key: "N" },
]);

const onGenderChange = () => {
  // console.log("onCategoryChange", selectedGender.value);

  if (selectedGender.value === "Man") {
    filter.value.gender = "H";
  } else if (selectedGender.value === "Woman") {
    filter.value.gender = "M";
  } else {
    delete filter.value.gender;
  }
  updateData();
};

const onMarriedChange = () => {
  if (selectedMarried.value === "Married") {
    filter.value.wasMarried = true;
  } else if (selectedMarried.value === "Not married") {
    filter.value.wasMarried = false;
  } else {
    delete filter.value.wasMarried;
  }

  updateData();
};

// TODO: esto realmente no lo estoy operando como array???
const onPlaceChange = () => {
  if (selectedPlace.value != null && Array.isArray(selectedPlace.value)) {
    filter.value.place = selectedPlace.value.map((place) => place.place);
  }

  updateData();
};

const onPositionChange = () => {
  if (selectedPosition.value != null && Array.isArray(selectedPosition.value)) {
    filter.value.tiposPositions = selectedPosition.value.map(
      (position) => position._id
    );
  }

  updateData();
};

const onTitleChange = () => {
  if (selectedTitle.value != null && Array.isArray(selectedTitle.value)) {
    filter.value.tiposTitles = selectedTitle.value.map((title) => title._id);
  }

  updateData();
};

const onRelationChange = async () => {
  if (selectedRelation.value != null && Array.isArray(selectedRelation.value)) {
    filter.value.tiposRelations = selectedRelation.value.map(
      (position) => position._id
    );
  }

  updateData();
};

// TODO: esto no funcoina: devuelve un array y realmente el campo es un string...
const onHistbirthChange = () => {
  if (
    selectedHistBirth.value != null &&
    Array.isArray(selectedHistBirth.value)
  ) {
    filter.value.histBirths = selectedHistBirth.value.map(
      (histBirth) => histBirth._id
    );
  }

  updateData();
};

const loadHistBirths = async () => {
  try {
    const data = await $fetch(`${api}/persons/histbirths`);

    histbirths.value = data.result;
  } catch (err) {
    console.log("error in histbirths", err);
  }
};

const onHasEventChange = () => {
  //console.log("onhaseventChange", selectedHasEvent.value);

  if (selectedHasEvent.value === "Has events") {
    filter.value.hasEvents = true;
  } else if (selectedHasEvent.value === "Does not have events") {
    filter.value.hasEvents = false;
  } else {
    delete filter.value.hasEvents;
  }

  updateData();
};

const onHasTitleChange = () => {
  if (selectedHasTitle.value === "Has titles") {
    filter.value.hasTitles = true;
  } else if (selectedHasTitle.value === "Does not have titles") {
    filter.value.hasTitles = false;
  } else {
    delete filter.value.hasTitles;
  }

  updateData();
};

const onHasPositionChange = () => {
  if (selectedHasPosition.value === "Has positions") {
    filter.value.hasPositions = true;
  } else if (selectedHasPosition.value === "Does not have positions") {
    filter.value.hasPositions = false;
  } else {
    delete filter.value.hasPositions;
  }

  updateData();
};

onMounted(async () => {
  // loadPersonsData();
  loadHistBirths();

  if (!storeplaces.initialized === true) {
    await storeplaces.fetchPlaces();
  }

  places.value = storeplaces.places;

  if (!storepositions.initialized === true) {
    await storepositions.fetchPositions();
  }

  positions.value = storepositions.positions;

  if (!storerelations.initialized === true) {
    await storerelations.fetchRelations();
  }

  relations.value = storerelations.relations;

  if (!storetitles.initialized === true) {
    await storetitles.fetchTitles();
  }

  titles.value = storetitles.titles;

  filter.value = storefilter.filter;

  updateData();

  loaded.value = true;
});

watch(selectedGender, () => {
  onGenderChange();
});

watch(selectedHasEvent, () => {
  onHasEventChange();
});

watch(selectedHasTitle, () => {
  onHasTitleChange();
});

watch(selectedHasPosition, () => {
  onHasPositionChange();
});

watch(selectedMarried, () => {
  onMarriedChange();
});

watch(selectedHistBirth, () => {
  onHistbirthChange();
});

watch(selectedPlace, () => {
  onPlaceChange();
});

watch(selectedPosition, () => {
  onPositionChange();
});

watch(selectedRelation, () => {
  onRelationChange();
});

watch(selectedTitle, () => {
  onTitleChange();
});

async function updateData() {
  const data = await $fetch(`${api}/search/`, {
    method: "POST",
    body: filter.value,
  });

  storefilter.setFilter(filter.value);

  persons.value = data.result;

  insightsData.gendersData = data.gendersData;
  insightsData.gendersChartData = data.gendersChartData;
  insightsData.histBirthsChartData = data.histBirthsChartData;
  insightsData.histBirthsData = data.histBirthsData;
  insightsData.hasTitlesData = data.hasTitlesChartData;
  insightsData.decadesBirthData = data.decadesBirthsChartData;

  //console.log(JSON.stringify(gendersData.value, null, 2));
  calculatePercentages();
}

function calculatePercentages() {
  if (Array.isArray(insightsData.gendersData)) {
    const total = insightsData.gendersData.reduce(
      (total, obj) => total + obj.count,
      0
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
      0
    );

    // Calcular el porcentaje para cada objeto en el array
    insightsData.histBirthsData.forEach((obj) => {
      let porcentaje = (obj.count / sumaTotal) * 100;
      obj.percent = porcentaje.toFixed(2);
    });
  }
}

function onReset() {
  // TODO: this is not a good solution...
  selectedGender.value = "All";
  selectedHasEvent.value = "All";
  selectedHasTitle.value = "All";
  selectedHasPosition.value = "All";
  selectedMarried.value = "All";
  selectedHistBirth.value = null;
  selectedPlace.value = null;
  selectedPosition.value = null;
  selectedRelation.value = null;
  selectedTitle.value = null;

  filter.value = {};
  storefilter.setFilter(filter.value);
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
  /* border: 3px dashed #d12f0d; */
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
