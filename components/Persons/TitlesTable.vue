<template>
  <div>
    <DataTable
      :value="titles"
      paginator
      stripedRows
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      selectionMode="single"
      dataKey="_id"
    >
      <template #empty> No titles found. </template>
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
  titles: { type: Array, required: true, default: () => [] },
});

const columns = [
  { field: "namePos", header: "Position" },
  { field: "posYearF", header: "From" },
  { field: "posYearT", header: "To" },
];
</script>
