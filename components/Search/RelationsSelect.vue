<template>
  <MultiSelect
    v-model="selectedRelation"
    display="chip"
    filter
    :options="relations"
    optionLabel="_id"
    placeholder="Select relations"
    :maxSelectedLabels="3"
    class="mb-3 w-full"
  />
</template>

<script setup>
import { useRelationsStore } from "../stores/relationsStore";
import { useFilterStore } from "@/stores/filterStore";

const storefilter = useFilterStore();
const { filter } = storeToRefs(storefilter);

const relations = ref([]);

const storerelations = useRelationsStore();
const selectedRelation = ref();

if (!storerelations.initialized === true) {
  await storerelations.fetchRelations();
}

relations.value = storerelations.relationsList;

console.log("the relations are: ", JSON.stringify(relations.value, null, 2));

watch(selectedRelation, () => {
  if (selectedRelation.value != null && Array.isArray(selectedRelation.value)) {
    if (selectedRelation.value.length === 0) {
      delete filter.value.tiposRelations;
    } else {
      filter.value.tiposRelations = selectedRelation.value.map(
        (position) => position._id
      );
    }
  }
});

// es mejor que watch(filter)
// https://pinia.vuejs.org/core-concepts/state.html
storefilter.$subscribe((mutation, state) => {
  if (Object.keys(storefilter.filter).length === 0) {
    selectedRelation.value = [];
  }
});
</script>

<style></style>
