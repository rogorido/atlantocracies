<template>
  <div class="flex gap-3 mb-3">
    <div
      v-for="hastitle in hastitles"
      :key="hastitle.key"
      class="flex align-items-center"
    >
      <RadioButton
        v-model="selectedHasTitle"
        :inputId="hastitle.key"
        name="dynamic"
        :value="hastitle.name"
      />
      <label :for="hastitle.key" class="ml-2">{{ hastitle.name }}</label>
    </div>
  </div>
</template>

<script setup>
import { useFilterStore } from "../stores/filterStore";

const storefilter = useFilterStore();
const { filter } = storeToRefs(storefilter);

const selectedHasTitle = ref("All");
const hastitles = ref([
  { name: "All", key: "A" },
  { name: "Has titles", key: "Y" },
  { name: "Does not have titles", key: "N" },
]);

watch(selectedHasTitle, () => {
  if (selectedHasTitle.value === "Has titles") {
    filter.value.hasTitles = true;
  } else if (selectedHasTitle.value === "Does not have titles") {
    filter.value.hasTitles = false;
  } else {
    delete filter.value.hasTitles;
  }
});

// es mejor que watch(filter)
// https://pinia.vuejs.org/core-concepts/state.html
storefilter.$subscribe((mutation, state) => {
  if (Object.keys(storefilter.filter).length === 0) {
    selectedHasTitle.value = "All";
  }
});
</script>

<style></style>
