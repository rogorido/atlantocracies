<template>
  <div>
    <DataTable
      :value="typeRelationsSummary"
      ref="dt"
      paginator
      stripedRows
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      dataKey="idItem"
    >
      <template #empty> No relations found. </template>
      <template #header>
        <div style="text-align: right">
          <Button
            icon="pi pi-external-link"
            label="Export"
            @click="exportCSV($event)"
          />
        </div>
      </template>
      <Column field="typeRel" header="Relation type" sortable></Column>
      <Column field="count" header="Total" sortable></Column>
      <Column field="percentage" header="%" sortable> </Column>
    </DataTable>
  </div>
</template>

<script setup>
const props = defineProps({
  personsRelated: { type: Array, required: true, default: () => [] },
});

const dt = ref(); // reference to the datatable to export!

// Paso 1: Contar las ocurrencias de cada valor de `typeRel`
const countMap = props.personsRelated.reduce((acc, item) => {
  acc[item.typeRelation] = (acc[item.typeRelation] || 0) + 1;
  return acc;
}, {});

// Paso 2: Calcular el porcentaje de cada valor
const totalItems = props.personsRelated.length;
const typeRelationsSummary = Object.entries(countMap).map(
  ([typeRel, count]) => ({
    typeRel,
    count,
    percentage: ((count / totalItems) * 100).toFixed(1),
  }),
);

const exportCSV = () => {
  dt.value.exportCSV();
};
</script>
