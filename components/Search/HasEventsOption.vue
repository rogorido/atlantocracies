<template>
  <div class="flex gap-3 mb-3">
    <div
      v-for="hasevent in hasevents"
      :key="hasevent.key"
      class="flex align-items-center"
    >
      <RadioButton
        v-model="selectedItems"
        :inputId="hasevent.key"
        name="dynamic"
        :value="hasevent.name"
      />
      <label :for="hasevent.key" class="ml-2">{{ hasevent.name }}</label>
    </div>
  </div>
</template>

<script setup>
import { useSelectManagement } from "~/composables/SelectManagement";

const { filter, selectedItems } = useSelectManagement(false);

selectedItems.value = "All";
const hasevents = ref([
  { name: "All", key: "A" },
  { name: "Has events", key: "Y" },
  { name: "Does not have events", key: "N" },
]);

watch(selectedItems, () => {
  if (selectedItems.value === "Has events") {
    filter.value.hasEvents = true;
  } else if (selectedItems.value === "Does not have events") {
    filter.value.hasEvents = false;
  } else {
    delete filter.value.hasEvents;
  }
});
</script>
