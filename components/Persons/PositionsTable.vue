<template>
  <div>
    <DataTable
      :value="positions"
      paginator
      stripedRows
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      selectionMode="single"
      dataKey="_id"
    >
      <template #empty> No positions found. </template>
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
  positions: { type: Array, required: true, default: () => [] },
});

const columns = [
  { field: "namePos", header: "Position" },
  { field: "posYearF", header: "From" },
  { field: "posYearT", header: "To" },
];
</script>
