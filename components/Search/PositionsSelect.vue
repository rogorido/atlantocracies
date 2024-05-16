<template>
  <MultiSelect
    v-model="selectedPosition"
    display="chip"
    filter
    :options="positions"
    optionLabel="_id"
    placeholder="Select positions"
    :maxSelectedLabels="3"
    class="mb-3 w-full"
  />
</template>

<script setup>
import { usePositionsStore } from "@/stores/positionsStore";
import { useFilterStore } from "@/stores/filterStore";

const storefilter = useFilterStore();
const { filter } = storeToRefs(storefilter);

const positions = ref([]);
const storepositions = usePositionsStore();

const selectedPosition = ref();

if (!storepositions.initialized === true) {
  await storepositions.fetchPositions();
}

positions.value = storepositions.positionsList;

watch(selectedPosition, () => {
  if (selectedPosition.value != null && Array.isArray(selectedPosition.value)) {
    if (selectedPosition.value.length === 0) {
      delete filter.value.tiposPositions;
    } else {
      filter.value.tiposPositions = selectedPosition.value.map(
        (position) => position._id
      );
    }
  }
});
// es mejor que watch(filter)
// https://pinia.vuejs.org/core-concepts/state.html
storefilter.$subscribe((mutation, state) => {
  if (Object.keys(storefilter.filter).length === 0) {
    selectedPosition.value = [];
  }
});
</script>

<style></style>
