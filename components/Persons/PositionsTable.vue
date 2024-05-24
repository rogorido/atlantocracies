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
      tableStyle="min-width: 50rem"
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
  { field: "posYearF", header: "YearF" },
  { field: "posYearT", header: "YearT" },
  // { field: "eventYear", header: "Year" },
  // { field: "histBirth", header: "Birth territory" },
  // { field: "wasMarried", header: "Was married" },
  //  { field: "hasFather", header: "Has father" },
  // { field: "hasMother", header: "Has mother" },
  // { field: "birthyear", header: "Birth year" },
  //  { field: "tiposEventos", header: "Eventos" },
];
</script>
