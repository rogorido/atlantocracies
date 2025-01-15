<template>
  <div class="flex gap-3 mb-3">
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
</template>

<script setup>
import { useSelectManagement } from "~/composables/SelectManagement";

const { filter, selectedItems } = useSelectManagement("dates");

// we put the initial values
selectedItems.value = [1400, 1900];

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
