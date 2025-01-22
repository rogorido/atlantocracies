<template>
  <DataTable
    :value="positions"
    paginator
    stripedRows
    :rows="10"
    filterDisplay="row"
    v-model:filters="filters"
    :rowsPerPageOptions="[5, 10, 20, 50]"
    selectionMode="single"
    dataKey="_id"
    tableStyle="min-width: 50rem"
  >
    <Column field="_id" header="Title" sortable>
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          type="text"
          @input="filterCallback()"
          class="p-column-filter"
          placeholder="Search by position"
        />
      </template>
    </Column>

    <Column field="count" header="Total" style="min-width: 3rem" sortable />
  </DataTable>
</template>

<script setup>
import { FilterMatchMode } from "@primevue/core/api";

const props = defineProps({
  positions: {
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
// function goToSite()() {
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
//   goToSite()();
// };

// const columns = [
//   { field: "_id", header: "Position" },
//   { field: "count", header: "Total" },
// ];
const filters = ref({
  _id: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
</script>
