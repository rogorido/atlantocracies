<template>
  <MultiSelect
    v-model="selectedItems"
    display="chip"
    filter
    :loading="loading"
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

const loading = ref(true);
const storerelations = useRelationsStore();
const { filter, selectedItems, items } = useSelectManagement("multiselect");

if (!storerelations.initialized === true) {
  await storerelations.fetchRelations();
}

items.value = storerelations.relationsList;
loading.value = false;

watch(selectedItems, () => {
  if (selectedItems.value != null && Array.isArray(selectedItems.value)) {
    if (selectedItems.value.length === 0) {
      delete filter.value.tiposRelations;
    } else {
      filter.value.tiposRelations = selectedItems.value.map(
        (position) => position._id,
      );
    }
  }
});

onMounted(() => {
  if (Object.keys(filter.value).length != 0) {
    if (filter.value.tiposRelations != undefined) {
      selectedItems.value = filter.value.tiposRelations.map((relation) => {
        return { _id: relation };
      });
    }
  }
});
</script>
