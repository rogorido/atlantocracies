<template>
  <div>
    <h2 class="text-center">Birth places and marriages</h2>
    <div class="grid">
      <div class="col-6">
        <h3 class="text-center">
          Historical birth places of the related persons married
        </h3>
        <p>This table show the geographical procedence</p>
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
      </div>
      <div class="col-6">
        <h3>Marriages and their territorial distribution</h3>
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
    </div>
  </div>
</template>

<script setup>
import { groupByHistBirth } from "@/utils/countHistBirthsGroups";

const props = defineProps({
  personsRelated: { type: Array, required: true, default: () => [] },
});

// seleccionamos solo los que son matrimonios
const matrimonios = props.personsRelated.filter(
  (item) => item.typeRelation === "Matrimonio",
);

// Contamos los lugares históricos de nacimiento.
const countMapMatrimonios = matrimonios.reduce((acc, item) => {
  acc[item.histBirthRelated] = (acc[item.histBirthRelated] || 0) + 1;
  return acc;
}, {});

// lo usamos para crear aquí abajo el campo percentage
const totalMatrimonios = matrimonios.length;

// transformamos al formato usable en DataTable.
const histBirthMatrimoniosSummary = Object.entries(countMapMatrimonios).map(
  ([histBirthRelated, count]) => ({
    histBirthRelated,
    count,
    percentage: ((count / totalMatrimonios) * 100).toFixed(1),
  }),
);

// desglosamos por países para usar un treetable
const histBirthMatrimoniosGroupBy = groupByHistBirth(matrimonios);
// console.log(
//   "histBirthMatrimoniosGroupBy",
//   JSON.stringify(histBirthMatrimoniosGroupBy, null, 2),
// );
</script>
