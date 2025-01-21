<template>
  <DataTable
    :value="titles"
    paginator
    stripedRows
    :rows="10"
    :rowsPerPageOptions="[5, 10, 20, 50]"
    selectionMode="single"
    dataKey="_id"
    tableStyle="min-width: 50rem"
  >
    <Column
      v-for="col of columns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
    ></Column>
  </DataTable>
</template>

<script setup>
const props = defineProps({
  titles: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const columns = [
  { field: "_id", header: "Title" },
  { field: "count", header: "Total" },
];
</script>
