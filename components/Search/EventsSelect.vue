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
  <!-- We have to use v-if and not v-show because if v-show is only for elements.  -->
  <div v-if="checked" class="flex gap-3 mb-3">
    <p>Event happened between</p>
    <InputNumber
      v-model="selectedYears[0]"
      showButtons
      buttonLayout="horizontal"
      :min="1400"
      :max="1900"
    >
      <template #incrementbuttonicon>
        <span class="pi pi-plus" />
      </template>
      <template #decrementbuttonicon>
        <span class="pi pi-minus" />
      </template>
    </InputNumber>
    <p>and</p>
    <InputNumber
      v-model="selectedYears[1]"
      showButtons
      buttonLayout="horizontal"
      :min="1400"
      :max="1900"
    >
      <template #incrementbuttonicon>
        <span class="pi pi-plus" />
      </template>
      <template #decrementbuttonicon>
        <span class="pi pi-minus" />
      </template>
    </InputNumber>
    <Button label="Reset dates" @click="resetYears" />
  </div>
</template>

<script setup>
import { useEventsStore } from "../stores/eventsStore";
import { useSelectManagement } from "~/composables/SelectManagement";

const loading = ref(true);
const storeevents = useEventsStore();
const { filter, selectedItems, items } = useSelectManagement("multiselect");

const checked = ref(false);

const selectedYears = ref([1400, 1900]);

if (!storeevents.initialized === true) {
  await storeevents.fetchEvents();
}

items.value = storeevents.eventsList;
loading.value = false;

watch(selectedItems, () => {
  if (selectedItems.value != null && Array.isArray(selectedItems.value)) {
    if (selectedItems.value.length === 0) {
      // esto tiene que ir antes por qué si no daerror en el
      // watch al intentar borrar yearsrange.
      // selectedYears.value = [1400, 1900];
      delete filter.value.events;
      checked.value = false;
    } else {
      // Initialize filter.events if it doesn't exist
      filter.value.events = filter.value.events || {};

      // Initialize filter.events.nomTit if it doesn't exist
      filter.value.events.eventtype = filter.value.events.eventtype || [];

      // Update filter.events.eventtype with selected events
      filter.value.events.eventtype = selectedItems.value.map(
        (event) => event._id,
      );

      if (selectedYears.value[0] != 1400 && selectedYears.value[1] != 1900) {
        filter.value.events.yearsrange = selectedYears.value;
      }

      checked.value = true;
    }
  }
});

watch(
  selectedYears,
  () => {
    if (selectedYears.value[0] != 1400 && selectedYears.value[1] != 1900) {
      filter.value.events.yearsrange = selectedYears.value;
    } else if (
      selectedYears.value[0] === 1400 &&
      selectedYears.value[1] === 1900
    ) {
      delete filter.value.events.yearsrange;
    }
  },
  { deep: true },
);

// TODO: habría que cargar tb el valor de los otros campos (continentes, etc.)
onMounted(() => {
  // IMPORTANT: we have to add "&& filter.value.events" because otherwise
  // the check filter.value.events.eventtype gives an error because filter.value.event
  // does not exist.
  // TODO: creo que hay otra forma de hacer esto...
  if (Object.keys(filter.value).length != 0 && filter.value.events) {
    if (filter.value.events.eventtype != undefined) {
      selectedItems.value = filter.value.events.eventtype.map((event) => {
        return { _id: event };
      });
    }
  }
});

function resetYears() {
  selectedYears.value = [1400, 1900];
}
</script>
