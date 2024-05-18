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
</template>

<script setup>
import { useTitlesStore } from "../stores/titlesStore";
import { useSelectManagement } from "~/composables/SelectManagement";

const loading = ref(true);
const storetitles = useTitlesStore();
const { filter, selectedItems, items } = useSelectManagement(true);

if (!storetitles.initialized === true) {
  await storetitles.fetchTitles();
}

items.value = storetitles.titlesList;
loading.value = false;

watch(selectedItems, () => {
  if (selectedItems.value != null && Array.isArray(selectedItems.value)) {
    if (selectedItems.value.length === 0) {
      delete filter.value.tiposTitles;
    } else {
      filter.value.tiposTitles = selectedItems.value.map((title) => title._id);
    }
  }
});

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
