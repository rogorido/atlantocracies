<template>
  <MultiSelect
    v-model="selectedItems"
    display="chip"
    filter
    :loading="loading"
    :options="items"
    optionLabel="_id"
    placeholder="Select events"
    :maxSelectedLabels="3"
    class="mb-3 w-full"
  />
</template>

<script setup>
import { useEventsStore } from "../stores/eventsStore";
import { useSelectManagement } from "~/composables/SelectManagement";

const loading = ref(true);
const storeevents = useEventsStore();
const { filter, selectedItems, items } = useSelectManagement("multiselect");

if (!storeevents.initialized === true) {
  await storeevents.fetchEvents();
}

items.value = storeevents.eventsList;
loading.value = false;

watch(selectedItems, () => {
  if (selectedItems.value != null && Array.isArray(selectedItems.value)) {
    if (selectedItems.value.length === 0) {
      delete filter.value.events;
    } else {
      // Initialize filter.events if it doesn't exist
      filter.value.events = filter.value.events || {};

      // Initialize filter.events.nomTit if it doesn't exist
      filter.value.events.nomTit = filter.value.events.nomTit || [];

      // Update filter.events.nomTit with selected events
      filter.value.events.nomTit = selectedItems.value.map(
        (title) => title._id,
      );
    }
  }
});

// TODO: habría que cargar tb el valor de los otros campos (continentes, etc.)
onMounted(() => {
  // IMPORTANT: we have to add "&& filter.value.events" because otherwise
  // the check filter.value.events.nomTit gives an error because filter.value.title
  // does not exist.
  // TODO: creo que hay otra forma de hacer esto...
  if (Object.keys(filter.value).length != 0 && filter.value.events) {
    if (filter.value.events.nomTit != undefined) {
      selectedItems.value = filter.value.events.nomTit.map((title) => {
        return { _id: title };
      });
    }
  }
});
</script>
