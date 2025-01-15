<template>
  <div class="mt-3 mb-3">
    <ToggleButton
      v-model="checked"
      offLabel="Filter by death year"
      onLabel="Not filter by death year"
      onIcon="pi pi-lock"
      offIcon="pi pi-lock-open"
      class="w-36"
      aria-label="Do you confirm"
    />
    <!-- We have to use v-if and not v-show because if v-show is only for elements.  -->
    <div v-if="checked" class="flex gap-3 mb-3">
      <p>Death year between</p>
      <InputNumber
        v-model="selectedItems[0]"
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
        v-model="selectedItems[1]"
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
      <Button label="Clear dates" @click="clearDeathYear" />
    </div>
  </div>
</template>

<script setup>
import { useSelectManagement } from "~/composables/SelectManagement";

const { filter, selectedItems } = useSelectManagement("dates");

// we put the initial values
selectedItems.value = [1400, 1900];

const checked = ref(false);

// NOTE: imporante hay que usar deep:true. Entiendo que porque es un array
// pero por qué funciona en los otros. Yo creo que es porque cambio un valodr
// dentro del array en los componentes.
// NOTE: important is to convert the array to strings to compare them!
watch(
  selectedItems,
  () => {
    if (selectedItems.value.toString() === [1400, 1900].toString()) {
      delete filter.value.deathYear;
    } else {
      filter.value.deathYear = selectedItems.value;
    }
  },
  { deep: true },
);

watch(checked, () => {
  if (!checked.value) {
    clearDeathYear();
  }
});

onMounted(() => {
  // TODO: esto tiene que haber otra forma de hacerlo...
  if (Object.keys(filter.value).length != 0) {
    if (filter.value.deathYear) {
      selectedItems.value = filter.value.deathYear;
    }
  }
});

function clearDeathYear() {
  selectedItems.value = [1400, 1900];
}
</script>
