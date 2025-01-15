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

const { filter, selectedItems } = useSelectManagement("options");

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

onMounted(() => {
  // TODO: esto tiene que haber otra forma de hacerlo...
  if (Object.keys(filter.value).length != 0) {
    if (filter.value.hasEvents === true) {
      selectedItems.value = "Has events";
    } else if (filter.value.hasEvents === false) {
      selectedItems.value = "Does not have events";
    }
  }
});
</script>
