<template>
  <div class="flex gap-3 mb-3">
    <div
      v-for="hasevent in hasevents"
      :key="hasevent.key"
      class="flex align-items-center"
    >
      <RadioButton
        v-model="selectedHasEvent"
        :inputId="hasevent.key"
        name="dynamic"
        :value="hasevent.name"
      />
      <label :for="hasevent.key" class="ml-2">{{ hasevent.name }}</label>
    </div>
  </div>
</template>

<script setup>
import { useFilterStore } from "../stores/filterStore";

const storefilter = useFilterStore();
const { filter } = storeToRefs(storefilter);

const selectedHasEvent = ref("All");
const hasevents = ref([
  { name: "All", key: "A" },
  { name: "Has events", key: "Y" },
  { name: "Does not have events", key: "N" },
]);

watch(selectedHasEvent, () => {
  if (selectedHasEvent.value === "Has events") {
    filter.value.hasEvents = true;
  } else if (selectedHasEvent.value === "Does not have events") {
    filter.value.hasEvents = false;
  } else {
    delete filter.value.hasEvents;
  }
});

// es mejor que watch(filter)
// https://pinia.vuejs.org/core-concepts/state.html
storefilter.$subscribe((mutation, state) => {
  // selectedHasEvent.value = "All";
  if (Object.keys(storefilter.filter).length === 0) {
    selectedHasEvent.value = "All";
  }
});
</script>
