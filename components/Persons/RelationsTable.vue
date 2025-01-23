<template>
  <div>
    <DataTable
      :value="relations"
      paginator
      stripedRows
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      selectionMode="single"
      dataKey="_id"
    >
      <Column
        v-for="col of columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
      ></Column>
      <Column
        field="hasId"
        header="In DB"
        dataType="boolean"
        style="min-width: 6rem"
      >
        <template #body="{ data }">
          <i
            class="pi"
            :class="{
              'pi-check-circle text-green-500': data.hasId,
              'pi-times-circle text-red-400': !data.hasId,
            }"
          ></i>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
const props = defineProps({
  relations: { type: Array, required: true, default: () => [] },
});

const columns = [
  { field: "namePerson", header: "Name" },
  { field: "typeRel", header: "Type of relation" },
  // { field: "hasId", header: "In DB" },
  // { field: "histBirth", header: "Birth territory" },
  // { field: "wasMarried", header: "Was married" },
  //  { field: "hasFather", header: "Has father" },
  // { field: "hasMother", header: "Has mother" },
  // { field: "birthyear", header: "Birth year" },
  //  { field: "tiposEventos", header: "Eventos" },
];
</script>
