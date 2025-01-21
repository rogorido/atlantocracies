<template>
  <div>
    <DataTable
      :value="continents"
      paginator
      stripedRows
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      selectionMode="single"
      dataKey="_id"
      tableStyle="min-width: 50rem"
    >
      <template #empty> No continents found. </template>
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
  continents: { type: Array, required: true, default: () => [] },
});

const columns = [
  { field: "_id", header: "Continent" },
  { field: "count", header: "Total" },
  { field: "percent", header: "%" },
];
</script>
