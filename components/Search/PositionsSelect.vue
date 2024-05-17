<template>
  <MultiSelect
    v-model="selectedItems"
    display="chip"
    filter
    :options="items"
    optionLabel="_id"
    placeholder="Select positions"
    :maxSelectedLabels="3"
    class="mb-3 w-full"
  />
</template>

<script setup>
import { usePositionsStore } from "@/stores/positionsStore";
import { useSelectManagement } from "~/composables/SelectManagement";

const storepositions = usePositionsStore();

const { filter, selectedItems, items } = useSelectManagement();

if (!storepositions.initialized === true) {
  await storepositions.fetchPositions();
}

items.value = storepositions.positionsList;

watch(selectedItems, () => {
  if (selectedItems.value != null && Array.isArray(selectedItems.value)) {
    if (selectedItems.value.length === 0) {
      delete filter.value.tiposPositions;
    } else {
      filter.value.tiposPositions = selectedItems.value.map(
        (position) => position._id
      );
    }
  }
});
</script>
