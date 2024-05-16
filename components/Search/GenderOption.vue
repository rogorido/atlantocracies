<template>
  <div class="flex gap-3 mb-3">
    <div
      v-for="gender in genders"
      :key="gender.key"
      class="flex align-items-center"
    >
      <RadioButton
        v-model="selectedGender"
        :inputId="gender.key"
        name="dynamic"
        :value="gender.name"
      />
      <label :for="gender.key" class="ml-2">{{ gender.name }}</label>
    </div>
  </div>
</template>

<script setup>
import { useFilterStore } from "../stores/filterStore";

const storefilter = useFilterStore();
const { filter } = storeToRefs(storefilter);

const selectedGender = ref("All");
const genders = ref([
  { name: "All", key: "A" },
  { name: "Man", key: "M" },
  { name: "Woman", key: "W" },
]);

watch(selectedGender, () => {
  if (selectedGender.value === "Man") {
    filter.value.gender = "H";
  } else if (selectedGender.value === "Woman") {
    filter.value.gender = "M";
  } else {
    delete filter.value.gender;
  }
});

// es mejor que watch(filter)
// https://pinia.vuejs.org/core-concepts/state.html
storefilter.$subscribe((mutation, state) => {
  if (Object.keys(filter.value).length === 0) {
    selectedGender.value = "All";
  }
});
</script>
