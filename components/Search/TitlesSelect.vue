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
const { filter, selectedItems, items } = useSelectManagement(true);

if (!storetitles.initialized === true) {
  await storetitles.fetchTitles();
}

items.value = storetitles.titlesList;
const titlescontinents = storetitles.titlesContinentsList;
loading.value = false;

watch(selectedItems, () => {
  if (selectedItems.value != null && Array.isArray(selectedItems.value)) {
    if (selectedItems.value.length === 0) {
      delete filter.value.tiposTitles;
      selectedContinents.value = [];
    } else {
      filter.value.tiposTitles = selectedItems.value.map((title) => title._id);
    }
  }
});

// TODO: habría que cargar tb el valor de los otros campos (continentes, etc.)
onMounted(() => {
  if (Object.keys(filter.value).length != 0) {
    if (filter.value.tiposTitles != undefined) {
      selectedItems.value = filter.value.tiposTitles.map((title) => {
        return { _id: title };
      });
    }
  }
});
</script>
