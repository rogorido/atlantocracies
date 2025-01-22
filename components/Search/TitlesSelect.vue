<template>
  <MultiSelect
    v-model="selectedItems"
    display="chip"
    filter
    :loading="loading"
    :options="items"
    optionLabel="_id"
    placeholder="Select titles"
    :maxSelectedLabels="3"
    class="mb-3 w-full"
  />
  <!-- We have to use v-if and not v-show because if v-show is only for elements.  -->
  <div v-if="checked" class="gap-3 mb-3">
    <MultiSelect
      v-model="selectedContinents"
      display="chip"
      filter
      :loading="loading"
      :options="titlescontinents"
      optionLabel="_id"
      placeholder="Select continent"
      :maxSelectedLabels="3"
      class="mb-3 w-full"
    />
  </div>
  <div v-if="checked" class="flex gap-3 mb-3">
    <p>Event happened between</p>
    <InputNumber
      v-model="selectedYears[0]"
      showButtons
      buttonLayout="horizontal"
      :min="1400"
      :max="1900"
    >
      <template #incrementbuttonicon>
        <span class="pi pi-plus" />
      </template>
      <template #decrementbuttonicon>
        <span class="pi pi-minus" />
      </template>
    </InputNumber>
    <p>and</p>
    <InputNumber
      v-model="selectedYears[1]"
      showButtons
      buttonLayout="horizontal"
      :min="1400"
      :max="1900"
    >
      <template #incrementbuttonicon>
        <span class="pi pi-plus" />
      </template>
      <template #decrementbuttonicon>
        <span class="pi pi-minus" />
      </template>
    </InputNumber>
    <Button label="Reset dates" @click="resetYears" />
  </div>
</template>

<script setup>
import { useTitlesStore } from "../stores/titlesStore";
import { useSelectManagement } from "~/composables/SelectManagement";

const selectedContinents = ref([]);
const loading = ref(true);
const storetitles = useTitlesStore();
const { filter, selectedItems, items } = useSelectManagement("multiselect");

if (!storetitles.initialized === true) {
  await storetitles.fetchTitles();
}

const checked = ref(false);
const selectedYears = ref([1400, 1900]);

items.value = storetitles.titlesList;
const titlescontinents = storetitles.titlesContinentsList;
loading.value = false;

watch(selectedItems, () => {
  if (selectedItems.value != null && Array.isArray(selectedItems.value)) {
    if (selectedItems.value.length === 0) {
      delete filter.value.titles;
      selectedContinents.value = [];
      // no reinicializo seelectedYears porque me da un error tal y como está ahora...
      checked.value = false;
    } else {
      // Initialize filter.titles if it doesn't exist
      filter.value.titles = filter.value.titles || {};

      // Initialize filter.titles.nomTit if it doesn't exist
      filter.value.titles.nomTit = filter.value.titles.nomTit || [];

      // Update filter.titles.nomTit with selected titles
      filter.value.titles.nomTit = selectedItems.value.map(
        (title) => title._id,
      );

      // esto realmente hace falta aquí?
      if (selectedYears.value[0] != 1400 && selectedYears.value[1] != 1900) {
        filter.value.titles.yearsrange = selectedYears.value;
      }

      checked.value = true;
    }
  }
});

watch(selectedContinents, () => {
  if (
    selectedContinents.value != null &&
    Array.isArray(selectedContinents.value)
  ) {
    if (selectedContinents.value.length === 0) {
      // hay que comgoToSite() que exista porque al hacer reset desaparece y da un error
      if (filter.value.titles) delete filter.value.titles.continental;
    } else {
      // Initialize filter.titles.nomTit if it doesn't exist
      filter.value.titles.continental = filter.value.titles.continental || [];

      // Update filter.titles.nomTit with selected titles
      filter.value.titles.continental = selectedContinents.value.map(
        (continent) => continent._id,
      );
      console.log("el filtro es:", filter.value);
    }
  }
});

watch(
  selectedYears,
  () => {
    if (selectedYears.value[0] != 1400 || selectedYears.value[1] != 1900) {
      filter.value.titles.yearsrange = selectedYears.value;
    } else if (
      selectedYears.value[0] === 1400 &&
      selectedYears.value[1] === 1900
    ) {
      if (filter.value.titles?.yearsrange) {
        delete filter.value.titles.yearsrange;
      }
    }
  },
  { deep: true },
);
//
// TODO: habría que cargar tb el valor de los otros campos (continentes, etc.)
onMounted(() => {
  // IMPORTANT: we have to add "&& filter.value.titles" because otherwise
  // the check filter.value.titles.nomTit gives an error because filter.value.title
  // does not exist.
  // TODO: creo que hay otra forma de hacer esto...
  if (Object.keys(filter.value).length != 0 && filter.value.titles) {
    if (filter.value.titles.nomTit != undefined) {
      selectedItems.value = filter.value.titles.nomTit.map((title) => {
        return { _id: title };
      });
    }

    if (filter.value.titles.continental) {
      selectedContinents.value = filter.value.titles.continental.map(
        (continent) => {
          return { _id: continent };
        },
      );
    }

    if (filter.value.titles.yearsrange) {
      selectedYears.value = filter.value.titles.yearsrange;
    }
  }
});

function resetYears() {
  selectedYears.value = [1400, 1900];
}
</script>
