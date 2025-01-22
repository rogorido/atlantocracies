<template>
  <DataTable
    :value="titles"
    paginator
    stripedRows
    :rows="10"
    :rowsPerPageOptions="[5, 10, 20, 50]"
    v-model:filters="filters"
    selectionMode="single"
    dataKey="_id"
    filterDisplay="row"
  >
    <Column field="_id" header="Title" sortable>
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          type="text"
          @input="filterCallback()"
          class="p-column-filter"
          placeholder="Search by title"
        />
      </template>
    </Column>
    <Column field="count" header="Total" style="min-width: 3rem" sortable />
  </DataTable>
</template>

<script setup>
import { FilterMatchMode } from "@primevue/core/api";

const props = defineProps({
  titles: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const filters = ref({
  _id: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
</script>
