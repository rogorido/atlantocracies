<template>
  <div class="flex gap-3 mb-3">
    <div
      v-for="gender in genders"
      :key="gender.key"
      class="flex align-items-center"
    >
      <RadioButton
        v-model="selectedItems"
        :inputId="gender.key"
        name="dynamic"
        :value="gender.name"
      />
      <label :for="gender.key" class="ml-2">{{ gender.name }}</label>
    </div>
  </div>
</template>

<script setup>
import { useSelectManagement } from "~/composables/SelectManagement";

const { filter, selectedItems } = useSelectManagement(false);

selectedItems.value = "All";

const genders = ref([
  { name: "All", key: "A" },
  { name: "Man", key: "M" },
  { name: "Woman", key: "W" },
]);

watch(selectedItems, () => {
  if (selectedItems.value === "Man") {
    filter.value.gender = "H";
  } else if (selectedItems.value === "Woman") {
    filter.value.gender = "M";
  } else {
    delete filter.value.gender;
  }
});
</script>
