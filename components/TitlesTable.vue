<template>
  <DataTable
    :value="titles"
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
</template>

<script setup>
const props = defineProps({
  titles: {
    type: Array,
    required: true,
    default: () => [],
  },
});

// const storepersons = usePersonsStore();
// const toast = useToast();
// const selectedPerson = ref();

// // TODO: la cuestioón es qué hacer con el slug. Tengo una función de chatgpt
// // pero si lo paso así luego en la página [placebyid] no puedo acceder al nombre
// // con lo que debería meterlo en un store... o pasarlo con un parámetro, pero no
// // veo cómo es posible... es posible con query, pero eso es otra cosa...
// function probar() {
//   // return navigateTo(`/place/${selectedPlace.value}`, {
//   //   open: { target: "_blank" },
//   // });

//   return navigateTo(`/person/${selectedPerson.value}`);
// }

// const onRowSelect = (event) => {
//   toast.add({
//     severity: "info",
//     summary: "Person",
//     detail: event.data.name,
//     life: 2000,
//   });
//   selectedPerson.value = event.data._id;
//   storepersons.selectPerson(selectedPerson.value);
//   probar();
// };

const columns = [
  { field: "_id", header: "Relation" },
  { field: "count", header: "Total" },
];
</script>
