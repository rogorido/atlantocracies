<template>
  <MultiSelect
    v-model="selectedHistBirth"
    display="chip"
    filter
    :options="histbirths"
    optionLabel="_id"
    placeholder="Select historical birth
  country"
    :maxSelectedLabels="3"
    class="w-full"
  />
</template>

<script setup>
import { useHistBirthsStore } from "@/stores/histBirthsStore";
import { useFilterStore } from "@/stores/filterStore";

const storefilter = useFilterStore();
const { filter } = storeToRefs(storefilter);

const storehistbirths = useHistBirthsStore();

const histbirths = ref([]);
const selectedHistBirth = ref();

if (!storehistbirths.initialized === true) {
  await storehistbirths.fetchHistBirths();
}

histbirths.value = storehistbirths.histBirths;

// TODO este if es un lío pq al principio está en undefined o en null creo
// y luego si borramos todos queda como [ ]
watch(selectedHistBirth, () => {
  if (
    selectedHistBirth.value != null &&
    Array.isArray(selectedHistBirth.value)
  ) {
    if (selectedHistBirth.value.length === 0) {
      delete filter.value.histBirths;
    } else {
      filter.value.histBirths = selectedHistBirth.value.map(
        (histBirth) => histBirth._id
      );
    }
  }
});

// es mejor que watch(filter)
// https://pinia.vuejs.org/core-concepts/state.html
storefilter.$subscribe((mutation, state) => {
  if (Object.keys(storefilter.filter).length === 0) {
    selectedHistBirth.value = [];
  }
});
</script>
