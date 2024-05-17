<template>
  <MultiSelect
    v-model="selectedItems"
    display="chip"
    filter
    :options="items"
    optionLabel="_id"
    placeholder="Select relations"
    :maxSelectedLabels="3"
    class="mb-3 w-full"
  />
</template>

<script setup>
import { useRelationsStore } from "../stores/relationsStore";
import { useSelectManagement } from "~/composables/SelectManagement";

const storerelations = useRelationsStore();
const { filter, selectedItems, items } = useSelectManagement();

if (!storerelations.initialized === true) {
  await storerelations.fetchRelations();
}

items.value = storerelations.relationsList;

watch(selectedItems, () => {
  if (selectedItems.value != null && Array.isArray(selectedItems.value)) {
    if (selectedItems.value.length === 0) {
      delete filter.value.tiposRelations;
    } else {
      filter.value.tiposRelations = selectedItems.value.map(
        (position) => position._id
      );
    }
  }
});
</script>
