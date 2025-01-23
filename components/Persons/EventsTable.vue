<template>
  <div>
    <DataTable
      :value="events"
      paginator
      stripedRows
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      selectionMode="single"
      dataKey="_id"
    >
      <template #empty> No events found. </template>
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
  events: { type: Array, required: true, default: () => [] },
});

const columns = [
  { field: "typeEv", header: "Type" },
  // { field: "dateEv", header: "Date" },
  { field: "eventYear", header: "Year" },
];
</script>
