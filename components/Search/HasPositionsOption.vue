<template>
  <div class="flex gap-3 mb-3">
    <div
      v-for="hasposition in haspositions"
      :key="hasposition.key"
      class="flex align-items-center"
    >
      <RadioButton
        v-model="selectedItems"
        :inputId="hasposition.key"
        name="dynamic"
        :value="hasposition.name"
      />
      <label :for="hasposition.key" class="ml-2">{{ hasposition.name }}</label>
    </div>
  </div>
</template>

<script setup>
import { useSelectManagement } from "~/composables/SelectManagement";

const { filter, selectedItems } = useSelectManagement("options");

selectedItems.value = "All";

const haspositions = ref([
  { name: "All", key: "A" },
  { name: "Has positions", key: "Y" },
  { name: "Does not have positions", key: "N" },
]);

watch(selectedItems, () => {
  if (selectedItems.value === "Has positions") {
    filter.value.hasPositions = true;
  } else if (selectedItems.value === "Does not have positions") {
    filter.value.hasPositions = false;
  } else {
    delete filter.value.hasPositions;
  }
});

onMounted(() => {
  // TODO: esto tiene que haber otra forma de hacerlo...
  if (Object.keys(filter.value).length != 0) {
    if (filter.value.hasPositions === true) {
      selectedItems.value = "Has positions";
    } else if (filter.value.hasPositions === false) {
      selectedItems.value = "Does not have positions";
    }
  }
});
</script>
