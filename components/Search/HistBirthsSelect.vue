<template>
  <MultiSelect
    v-model="selectedItems"
    display="chip"
    filter
    v-tooltip="'Select the historical place of birth to filter on.'"
    :loading="loading"
    :options="items"
    optionLabel="_id"
    placeholder="Select historical birth country"
    :maxSelectedLabels="3"
    class="mb-3 w-full"
  />
</template>

<script setup>
import { useHistBirthsStore } from "@/stores/histBirthsStore";
import { useSelectManagement } from "~/composables/SelectManagement";

const loading = ref(true);
const storehistbirths = useHistBirthsStore();
const { filter, selectedItems, items } = useSelectManagement("multiselect");

if (!storehistbirths.initialized === true) {
  await storehistbirths.fetchHistBirths();
}

items.value = storehistbirths.histbirthsList;
loading.value = false;

// TODO este if es un lío pq al principio está en undefined o en null creo
// y luego si borramos todos queda como [ ]
watch(selectedItems, () => {
  if (selectedItems.value != null && Array.isArray(selectedItems.value)) {
    if (selectedItems.value.length === 0) {
      delete filter.value.histBirths;
    } else {
      filter.value.histBirths = selectedItems.value.map(
        (histBirth) => histBirth._id,
      );
    }
  }
});

onMounted(() => {
  if (Object.keys(filter.value).length != 0) {
    if (filter.value.histBirths != undefined) {
      selectedItems.value = filter.value.histBirths.map((histbirth) => {
        return { _id: histbirth };
      });
    }
  }
});
</script>
