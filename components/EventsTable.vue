<template>
  <div>
    <DataTable
      :value="eventsrelated"
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
  </div>
</template>

<script setup>
const props = defineProps({
  eventsrelated: { type: Array, required: true },
});

const columns = [
  { field: "_id", header: "Event" },
  { field: "count", header: "Total" },
];
</script>

<style></style>
