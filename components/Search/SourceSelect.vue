<template>
  <MultiSelect
    v-model="selectedItems"
    display="chip"
    filter
    :loading="loading"
    :options="items"
    optionLabel="_id"
    placeholder="Select the historical source(s) to filter on"
    :maxSelectedLabels="3"
    class="mb-3 w-full"
  />
</template>

<script setup>
import { useSourcesStore } from "../stores/sourcesStore";
import { useSelectManagement } from "~/composables/SelectManagement";

const loading = ref(true);
const storesources = useSourcesStore();
const { filter, selectedItems, items } = useSelectManagement("multiselect");

if (!storesources.initialized === true) {
  await storesources.fetchSources();
}

items.value = storesources.sourcesList;
loading.value = false;

watch(selectedItems, () => {
  if (selectedItems.value != null && Array.isArray(selectedItems.value)) {
    if (selectedItems.value.length === 0) {
      delete filter.value.source;
    } else {
      filter.value.source = selectedItems.value.map((source) => source._id);
    }
  }
});

onMounted(() => {
  if (Object.keys(filter.value).length != 0) {
    if (filter.value.source != undefined) {
      selectedItems.value = filter.value.source.map((source) => {
        return { _id: source };
      });
    }
  }
});
</script>
