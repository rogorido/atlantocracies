<template>
  <div>
    <DataTable
      :value="places"
      paginator
      stripedRows
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      selectionMode="single"
      dataKey="_id"
    >
      <template #empty> No places found. </template>
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
  places: { type: Array, required: true, default: () => [] },
});

const columns = [
  { field: "_id", header: "Place" },
  { field: "count", header: "Total" },
  { field: "percent", header: "%" },
];
</script>
