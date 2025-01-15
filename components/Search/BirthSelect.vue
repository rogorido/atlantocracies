<template>
  <div class="flex gap-3 mb-3">
    <p>Birth year between</p>
    <InputNumber
      v-model="selectedItems[0]"
      showButtons
      buttonLayout="horizontal"
      :min="1450"
      :max="1800"
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
      :min="1450"
      :max="1800"
    >
      <template #incrementbuttonicon>
        <span class="pi pi-plus" />
      </template>
      <template #decrementbuttonicon>
        <span class="pi pi-minus" />
      </template>
    </InputNumber>
    <Button label="Clear dates" @click="clearBirthYear" />
  </div>
</template>

<script setup>
import { useSelectManagement } from "~/composables/SelectManagement";

const { filter, selectedItems } = useSelectManagement("dates");
selectedItems.value = [1450, 1800];

// const valor1 = ref(selectedItems[0]);
// const valor2 = ref(selectedItems[1]);

// NOTE: imporante hay que usar deep:true. Entiendo que porque es un array
// pero por qué funciona en los otros. Yo creo que es porque cambio un valodr
// dentro del array en los componentes.
watch(
  selectedItems,
  () => {
    console.log("el valor es", JSON.stringify(selectedItems.value, null, 2));
    if (selectedItems.value.toString() === [1450, 1800].toString()) {
      delete filter.value.birthYear;
    } else {
      filter.value.birthYear = selectedItems.value;
    }
  },
  { deep: true },
);

onMounted(() => {
  // TODO: esto tiene que haber otra forma de hacerlo...
  if (Object.keys(filter.value).length != 0) {
    if (filter.value.birthYear) {
      selectedItems.value = filter.value.birthYear;
    }
  }
});

function clearBirthYear() {
  selectedItems.value = [1450, 1800];
}
</script>
