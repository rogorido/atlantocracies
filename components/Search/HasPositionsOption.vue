<template>
  <div class="flex gap-3 mb-3">
    <div
      v-for="hasposition in haspositions"
      :key="hasposition.key"
      class="flex align-items-center"
    >
      <RadioButton
        v-model="selectedHasPosition"
        :inputId="hasposition.key"
        name="dynamic"
        :value="hasposition.name"
      />
      <label :for="hasposition.key" class="ml-2">{{ hasposition.name }}</label>
    </div>
  </div>
</template>

<script setup>
import { useFilterStore } from "../stores/filterStore";

const storefilter = useFilterStore();
const { filter } = storeToRefs(storefilter);

const selectedHasPosition = ref("All");
const haspositions = ref([
  { name: "All", key: "A" },
  { name: "Has positions", key: "Y" },
  { name: "Does not have positions", key: "N" },
]);

watch(selectedHasPosition, () => {
  if (selectedHasPosition.value === "Has positions") {
    filter.value.hasPositions = true;
  } else if (selectedHasPosition.value === "Does not have positions") {
    filter.value.hasPositions = false;
  } else {
    delete filter.value.hasPositions;
  }
});

// es mejor que watch(filter)
// https://pinia.vuejs.org/core-concepts/state.html
storefilter.$subscribe((mutation, state) => {
  if (Object.keys(storefilter.filter).length === 0) {
    selectedHasPosition.value = "All";
  }
});
</script>
