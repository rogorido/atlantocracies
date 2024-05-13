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
      <div>
        <Button label="Reset filters" @click="onReset" />
        <Button label="Save filter" disabled />
        <Button label="Load filter" disabled />
      </div>
      <div>
        <Button label="Save results" disabled />
      </div>
    </div>

    <div v-if="persons.length > 0">
      <h2 class="mt-5 text-center">Selected Persons</h2>
      <!-- Este código está repetido en compenente! -->
      <DataTable
        :value="persons"
        ref="dt"
        paginator
        stripedRows
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        selectionMode="single"
        dataKey="_id"
        :selection="selectedPerson"
        @rowSelect="onRowSelect"
        v-model:filters="filters"
        filterDisplay="row"
        tableStyle="min-width: 25rem"
      >
        <template #header>
          <div style="text-align: right">
            <Button
              icon="pi pi-external-link"
              label="Export"
              @click="exportCSV($event)"
            />
          </div>
        </template>

        <Column field="name" header="Name" sortable>
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
        <Column
          field="birthyear"
          header="Birth Year"
          dataType="numeric"
          style="min-width: 3rem"
          sortable
        />
        <Column
          field="placebirth"
          header="Birth Place"
          dataType="string"
          style="min-width: 6rem"
          sortable
        />
        <Column
          field="datedeath"
          header="Death date"
          dataType="string"
          style="min-width: 6rem"
          sortable
        />
        <Column
          field="placeDeath"
          header="Death Place"
          dataType="string"
          style="min-width: 6rem"
          sortable
        />
        <Column
          field="gender"
          header="Gender"
          dataType="boolean"
          style="min-width: 3rem"
        >
          <template #body="{ data }">
            <i
              class="pi"
              :class="{
                'pi-mars text-green-500': data.gender === 'H',
                'pi-venus text-green-500': data.gender === 'M',
              }"
            ></i>
          </template>
        </Column>
        <Column
          field="wasMarried"
          header="Married"
          dataType="boolean"
          style="min-width: 3rem"
        >
          <template #body="{ data }">
            <i
              class="pi"
              :class="{
                'pi-check-circle text-green-500': data.wasMarried,
                'pi-times-circle text-red-400': !data.wasMarried,
              }"
            ></i>
          </template>
        </Column>
        <Column
          field="hasFather"
          header="Has Father"
          dataType="boolean"
          style="min-width: 6rem"
        >
          <template #body="{ data }">
            <i
              class="pi"
              :class="{
                'pi-check-circle text-green-500': data.hasFather,
                'pi-times-circle text-red-400': !data.hasFather,
              }"
            ></i>
          </template>
        </Column>
        <Column
          field="hizoTestamento"
          header="Made will"
          dataType="boolean"
          style="min-width: 3rem"
        >
          <template #body="{ data }">
            <i
              class="pi"
              :class="{
                'pi-check-circle text-green-500': data.hizoTestamento,
                'pi-times-circle text-red-400': !data.hizoTestamento,
              }"
            ></i>
          </template>
        </Column>
        <Column
          field="numberOfEvents"
          header="# Events"
          dataType="numeric"
          style="min-width: 3rem"
          sortable
        />
        <Column
          field="numberofRelations"
          header="# Relations"
          dataType="numeric"
          style="min-width: 3rem"
          sortable
        />
        <Column
          field="numberofPositions"
          header="# Positions"
          dataType="numeric"
          style="min-width: 3rem"
          sortable
        />
        <Column
          field="numberofTitles"
          header="# Titles"
          dataType="numeric"
          style="min-width: 3rem"
          sortable
        />
      </DataTable>
      <TabView>
        <TabPanel header="Birth years in decades">
          <div class="grid">
            <div class="col-6">
              <h2>Birth years</h2>
              <Chart v-if="loaded" type="bar" :data="decadesBirthData" />
            </div>
            <div class="col-5">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At,
                reiciendis exercitationem! Illo sunt, natus adipisci quo rem
                eveniet optio! Esse nobis necessitatibus nihil temporibus
                laborum! Voluptas neque optio veritatis incidunt.
              </p>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat
                voluptates voluptatem reiciendis in asperiores quo quia quam
                blanditiis, temporibus assumenda corrupti omnis maiores enim.
                Ipsum accusamus aliquam aperiam rerum doloremque?
              </p>
            </div>
          </div>
        </TabPanel>
        <TabPanel header="Gender">
          <div class="grid">
            <div class="col-6">
              <h2>Table</h2>
              <DataTable
                :value="gendersData"
                stripedRows
                :rows="10"
                selectionMode="single"
                dataKey="_id"
                tableStyle="min-width: 50rem"
                v-if="loaded"
              >
                <Column key="gender" field="gender" header="Gender"></Column>
                <Column key="country" field="count" header="Total"></Column>
                <Column key="percent" field="percent" header="%"></Column>
              </DataTable>
            </div>
            <div class="col-3">
              <h2>Gender</h2>
              <GendersChart v-if="loaded" :chartData="gendersChartData" />
            </div>
          </div>
        </TabPanel>
        <TabPanel header="Birth places (historical)">
          <div class="grid">
            <div class="col-6">
              <h2>Birth places (historical)</h2>

              <Chart
                v-if="loaded"
                type="pie"
                :data="histBirthsChartData"
                :options="options"
              />
            </div>
            <div class="col-6">
              <h2>Table</h2>
              <DataTable
                :value="histBirthsData"
                paginator
                stripedRows
                :rows="10"
                :rowsPerPageOptions="[5, 10, 20, 50]"
                selectionMode="single"
                dataKey="_id"
                tableStyle="min-width: 50rem"
              >
                <Column key="_id" field="_id" header="Country"></Column>
                <Column key="country" field="count" header="Total"></Column>
                <Column key="percent" field="percent" header="%"></Column>
              </DataTable>
            </div>
          </div>
        </TabPanel>
        <TabPanel header="Titles">
          <div class="grid">
            <div class="col-6">
              <h2>Has titles</h2>

              <Chart
                v-if="loaded"
                type="pie"
                :data="hasTitlesData"
                :options="options"
              />
            </div>
          </div>
        </TabPanel>
      </TabView>
    </div>
  </div>
</template>

<script setup>
import Chart from "primevue/chart";

import { ref, onMounted, watch } from "vue";
import { usePersonsStore } from "../stores/personsStore";
import { usePlacesStore } from "../stores/placesStore";
import { usePositionsStore } from "../stores/positionsStore";
import { useRelationsStore } from "../stores/relationsStore";
import { useTitlesStore } from "../stores/titlesStore";
import { useFilterStore } from "../stores/filterStore";
// import Knob from "primevue/knob";
import { FilterMatchMode } from "primevue/api";

const dt = ref(); // reference to the datatable to export!

const persons = ref([]);
const places = ref([]);
const positions = ref([]);
const relations = ref([]);
const titles = ref([]);
const histbirths = ref([]);

const options = { responsive: true };

const gendersData = ref(null);
const gendersChartData = ref(null);
const histBirthsChartData = ref(null);
const histBirthsData = ref(null);
const hasTitlesData = ref(null);
const decadesBirthData = ref(null);

const loaded = ref(false);

const filter = ref({});

const storepersons = usePersonsStore();
const storeplaces = usePlacesStore();
const storepositions = usePositionsStore();
const storerelations = useRelationsStore();
const storetitles = useTitlesStore();
const storefilter = useFilterStore();

const selectedPerson = ref();
const selectedPlace = ref();
const selectedPosition = ref();
const selectedRelation = ref();
const selectedTitle = ref();
const selectedHistBirth = ref();

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
  selectedPerson.value = event.data._id;
  storepersons.selectPerson(selectedPerson.value);
  probar();
};

const columns = [
  // { field: "name", header: "Name" },
  // { field: "gender", header: "Gender" },
  { field: "histBirth", header: "Birth territory" },
  // { field: "wasMarried", header: "Was married" },
  //  { field: "hasFather", header: "Has father" },
  //  { field: "hasMother", header: "Has mother" },
  { field: "birthyear", header: "Birth year" },
  //  { field: "tiposEventos", header: "Eventos" },
];

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

// const loadPersonsData = async () => {
//   try {
//     const { data } = await useFetch("http://127.0.0.1:8008/persons/");

//     persons.value = data.value;
//     loaded.value = true;
//   } catch (err) {
//     console.log("error en mymap5", err);
//   }
// };

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
  // console.log("onmarriedChange", selectedMarried.value);

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
  // console.log("onPlaceChange", selectedPlace.value);

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
    const data = await $fetch("http://127.0.0.1:8008/persons/histbirths");

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
  //console.log("onhaseventChange", selectedHasEvent.value);

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
  //console.log("onhaseventChange", selectedHasEvent.value);

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
  const data = await $fetch("http://127.0.0.1:8008/search/", {
    method: "POST",
    body: filter.value,
  });

  storefilter.setFilter(filter.value);

  persons.value = data.result;
  gendersData.value = data.gendersData;
  gendersChartData.value = data.gendersChartData;
  histBirthsChartData.value = data.histBirthsChartData;
  histBirthsData.value = data.histBirthsData;
  hasTitlesData.value = data.hasTitlesChartData;
  decadesBirthData.value = data.decadesBirthsChartData;

  //console.log(JSON.stringify(gendersData.value, null, 2));
  calculatePercentages();
}

function calculatePercentages() {
  if (Array.isArray(gendersData.value)) {
    const total = gendersData.value.reduce(
      (total, obj) => total + obj.count,
      0
    );
    gendersData.value.forEach((obj) => {
      let porcentaje = (obj.count / total) * 100;
      obj.percent = porcentaje.toFixed(2);
    });
  }

  // Calcular la suma total de todos los valores
  if (Array.isArray(histBirthsData.value)) {
    const sumaTotal = histBirthsData.value.reduce(
      (total, obj) => total + obj.count,
      0
    );

    // Calcular el porcentaje para cada objeto en el array
    histBirthsData.value.forEach((obj) => {
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

// I dont really understand how this works...
const filters = ref({
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const exportCSV = () => {
  dt.value.exportCSV();
};
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
