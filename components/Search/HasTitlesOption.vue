<template>
  <div class="flex gap-3 mb-3">
    <div
      v-for="hastitle in hastitles"
      :key="hastitle.key"
      class="flex align-items-center"
    >
      <RadioButton
        v-model="selectedItems"
        :inputId="hastitle.key"
        name="dynamic"
        :value="hastitle.name"
      />
      <label :for="hastitle.key" class="ml-2">{{ hastitle.name }}</label>
    </div>
  </div>
</template>

<script setup>
import { useSelectManagement } from "~/composables/SelectManagement";

const { filter, selectedItems } = useSelectManagement(false);

selectedItems.value = "All";

const hastitles = ref([
  { name: "All", key: "A" },
  { name: "Has titles", key: "Y" },
  { name: "Does not have titles", key: "N" },
]);

watch(selectedItems, () => {
  if (selectedItems.value === "Has titles") {
    filter.value.hasTitles = true;
  } else if (selectedItems.value === "Does not have titles") {
    filter.value.hasTitles = false;
  } else {
    delete filter.value.hasTitles;
  }
});

onMounted(() => {
  // TODO: esto tiene que haber otra forma de hacerlo...
  if (Object.keys(filter.value).length != 0) {
    if (filter.value.hasTitles === true) {
      selectedItems.value = "Has titles";
    } else if (filter.value.hasTitles === false) {
      selectedItems.value = "Does not have titles";
    }
  }
});
</script>
