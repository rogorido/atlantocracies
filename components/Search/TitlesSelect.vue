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
  <MultiSelect
    v-model="selectedContinents"
    display="chip"
    v-show="showContinent"
    filter
    :loading="loading"
    :options="titlescontinents"
    optionLabel="_id"
    placeholder="Select continent"
    :maxSelectedLabels="3"
    class="mb-3 w-full"
  />
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

const showContinent = ref(false);

items.value = storetitles.titlesList;
const titlescontinents = storetitles.titlesContinentsList;
loading.value = false;

watch(selectedItems, () => {
  if (selectedItems.value != null && Array.isArray(selectedItems.value)) {
    if (selectedItems.value.length === 0) {
      delete filter.value.titles;
      selectedContinents.value = [];
      showContinent.value = false;
    } else {
      // Initialize filter.titles if it doesn't exist
      filter.value.titles = filter.value.titles || {};

      // Initialize filter.titles.nomTit if it doesn't exist
      filter.value.titles.nomTit = filter.value.titles.nomTit || [];

      // Update filter.titles.nomTit with selected titles
      filter.value.titles.nomTit = selectedItems.value.map(
        (title) => title._id,
      );

      showContinent.value = true;
    }
  }
});

watch(selectedContinents, () => {
  if (
    selectedContinents.value != null &&
    Array.isArray(selectedContinents.value)
  ) {
    if (selectedContinents.value.length === 0) {
      // hay que comprobar que exista porque al hacer reset desaparece y da un error
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
  }
});
</script>
