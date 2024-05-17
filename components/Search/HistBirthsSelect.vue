<template>
  <MultiSelect
    v-model="selectedItems"
    display="chip"
    filter
    :options="items"
    optionLabel="_id"
    placeholder="Select historical birth
  country"
    :maxSelectedLabels="3"
    class="w-full"
  />
</template>

<script setup>
import { useHistBirthsStore } from "@/stores/histBirthsStore";
import { useSelectManagement } from "~/composables/SelectManagement";

const storehistbirths = useHistBirthsStore();
const { filter, selectedItems, items } = useSelectManagement();

if (!storehistbirths.initialized === true) {
  await storehistbirths.fetchHistBirths();
}

items.value = storehistbirths.histbirthsList;

// TODO este if es un lío pq al principio está en undefined o en null creo
// y luego si borramos todos queda como [ ]
watch(selectedItems, () => {
  if (selectedItems.value != null && Array.isArray(selectedItems.value)) {
    if (selectedItems.value.length === 0) {
      delete filter.value.histBirths;
    } else {
      filter.value.histBirths = selectedItems.value.map(
        (histBirth) => histBirth._id
      );
    }
  }
});
</script>
