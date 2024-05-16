<template>
  <MultiSelect
    v-model="selectedTitle"
    display="chip"
    filter
    :options="titles"
    optionLabel="_id"
    placeholder="Select titles"
    :maxSelectedLabels="3"
    class="mb-3 w-full"
  />
</template>

<script setup>
import { useTitlesStore } from "../stores/titlesStore";
import { useFilterStore } from "@/stores/filterStore";

const storefilter = useFilterStore();
const { filter } = storeToRefs(storefilter);

const titles = ref([]);

const storetitles = useTitlesStore();
const selectedTitle = ref();

if (!storetitles.initialized === true) {
  await storetitles.fetchTitles();
}

titles.value = storetitles.titles;

watch(selectedTitle, () => {
  if (selectedTitle.value != null && Array.isArray(selectedTitle.value)) {
    if (selectedTitle.value.length === 0) {
      delete filter.value.tiposTitles;
    } else {
      filter.value.tiposTitles = selectedTitle.value.map((title) => title._id);
    }
  }
});

// es mejor que watch(filter)
// https://pinia.vuejs.org/core-concepts/state.html
storefilter.$subscribe((mutation, state) => {
  if (Object.keys(storefilter.filter).length === 0) {
    selectedTitle.value = [];
  }
});
</script>

<style></style>
