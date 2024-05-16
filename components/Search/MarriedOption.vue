<template>
  <div class="flex gap-3 mb-3">
    <div
      v-for="married in marriedclasses"
      :key="married.key"
      class="flex align-items-center"
    >
      <RadioButton
        v-model="selectedMarried"
        :inputId="married.key"
        name="dynamic"
        :value="married.name"
      />
      <label :for="married.key" class="ml-2">{{ married.name }}</label>
    </div>
  </div>
</template>

<script setup>
import { useFilterStore } from "../stores/filterStore";

const storefilter = useFilterStore();
const { filter } = storeToRefs(storefilter);

const selectedMarried = ref("All");
const marriedclasses = ref([
  { name: "All", key: "A" },
  { name: "Married", key: "M" },
  { name: "Not married", key: "N" },
]);

watch(selectedMarried, () => {
  if (selectedMarried.value === "Married") {
    filter.value.wasMarried = true;
  } else if (selectedMarried.value === "Not married") {
    filter.value.wasMarried = false;
  } else {
    delete filter.value.wasMarried;
  }
});

// es mejor que watch(filter)
// https://pinia.vuejs.org/core-concepts/state.html
storefilter.$subscribe((mutation, state) => {
  if (Object.keys(storefilter.filter).length === 0) {
    selectedMarried.value = "All";
  }
});
</script>
