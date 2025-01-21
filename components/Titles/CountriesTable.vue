<template>
  <div>
    <DataTable
      :value="countries"
      paginator
      stripedRows
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      selectionMode="single"
      dataKey="_id"
      tableStyle="min-width: 50rem"
    >
      <template #empty> No countries found. </template>
      <Column
        v-for="col of columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
      ></Column>
    </DataTable>
  </div>
</template>

<script setup>
const props = defineProps({
  countries: { type: Array, required: true, default: () => [] },
});

const columns = [
  { field: "_id", header: "Continent" },
  { field: "count", header: "Total" },
  { field: "percent", header: "%" },
];
</script>
