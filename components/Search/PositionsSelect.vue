<template>
  <MultiSelect
    v-model="selectedItems"
    display="chip"
    filter
    :loading="loading"
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

const loading = ref(true);
const storepositions = usePositionsStore();

const { filter, selectedItems, items } = useSelectManagement(true);

if (!storepositions.initialized === true) {
  await storepositions.fetchPositions();
}

items.value = storepositions.positionsList;

loading.value = false;

watch(selectedItems, () => {
  console.log("selectedItems", JSON.stringify(selectedItems.value, null, 2));
  if (selectedItems.value != null && Array.isArray(selectedItems.value)) {
    if (selectedItems.value.length === 0) {
      delete filter.value.tiposPositions;
    } else {
      filter.value.tiposPositions = selectedItems.value.map(
        (position) => position._id,
      );
    }
  }
});

onMounted(() => {
  console.log("onMounted y ", filter.value.tiposPositions);
  if (Object.keys(filter.value).length != 0) {
    selectedItems.value = filter.value.tiposPositions.map((position) => {
      return { _id: position };
    });
  }
});
</script>
