<template>
  <div>
    <h3>Historical birth places</h3>
    <DataTable
      :value="histBirthMatrimoniosSummary"
      paginator
      stripedRows
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      dataKey="idItem"
      tableStyle="max-width: 30rem"
    >
      <template #empty> No relations found. </template>
      <Column
        field="histBirthRelated"
        header="Historical birth place"
        sortable
      ></Column>
      <Column field="count" header="Total" sortable></Column>
      <Column field="percentage" header="%" sortable> </Column>
    </DataTable>
    <h2>Marriages and their territorial distribution</h2>
    <TreeTable
      :value="histBirthMatrimoniosGroupBy"
      :paginator="true"
      :rows="10"
      :rowsPerPageOptions="[10, 20, 30, 40]"
    >
      <template #empty> No positions found. </template>
      <Column
        field="histBirth"
        header="Historical birth place"
        sortable
        expander
      ></Column>
      <Column field="count" header="Total" sortable></Column>
      <Column field="percentage" header="%" sortable></Column>
    </TreeTable>
  </div>
</template>

<script setup>
import { groupByHistBirth } from "@/utils/countHistBirthsGroups";

const props = defineProps({
  personsrelated: { type: Array, required: true, default: () => [] },
});

const matrimonios = props.personsrelated.filter(
  (item) => item.typeRelation === "Matrimonio",
);

const countMapMatrimonios = matrimonios.reduce((acc, item) => {
  acc[item.histBirthRelated] = (acc[item.histBirthRelated] || 0) + 1;
  return acc;
}, {});
const totalMatrimonios = matrimonios.length;
const histBirthMatrimoniosSummary = Object.entries(countMapMatrimonios).map(
  ([histBirthRelated, count]) => ({
    histBirthRelated,
    count,
    percentage: ((count / totalMatrimonios) * 100).toFixed(1),
  }),
);

// desglosamos por países para usar un treetable
const histBirthMatrimoniosGroupBy = groupByHistBirth(matrimonios);
console.log(
  "histBirthMatrimoniosGroupBy",
  JSON.stringify(histBirthMatrimoniosGroupBy, null, 2),
);
</script>
