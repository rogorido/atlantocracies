<template>
  <div class="flex gap-3 mb-3">
    <div
      v-for="married in marriedclasses"
      :key="married.key"
      class="flex align-items-center"
    >
      <RadioButton
        v-model="selectedItems"
        :inputId="married.key"
        name="dynamic"
        :value="married.name"
      />
      <label :for="married.key" class="ml-2">{{ married.name }}</label>
    </div>
  </div>
</template>

<script setup>
import { useSelectManagement } from "~/composables/SelectManagement";

const { filter, selectedItems } = useSelectManagement("options");

selectedItems.value = "All";

const marriedclasses = ref([
  { name: "All", key: "A" },
  { name: "Married", key: "M" },
  { name: "Not married", key: "N" },
]);

watch(selectedItems, () => {
  if (selectedItems.value === "Married") {
    filter.value.wasMarried = true;
  } else if (selectedItems.value === "Not married") {
    filter.value.wasMarried = false;
  } else {
    delete filter.value.wasMarried;
  }
});
onMounted(() => {
  // TODO: esto tiene que haber otra forma de hacerlo...
  if (Object.keys(filter.value).length != 0) {
    if (filter.value.wasMarried === true) {
      selectedItems.value = "Married";
    } else if (filter.value.wasMarried === false) {
      selectedItems.value = "Not married";
    }
  }
});
</script>
