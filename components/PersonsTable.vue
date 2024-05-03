<template>
  <DataTable
    :value="persons"
    paginator
    stripedRows
    :rows="10"
    :rowsPerPageOptions="[5, 10, 20, 50]"
    selectionMode="single"
    dataKey="_id"
    :selection="selectedPerson"
    @rowSelect="onRowSelect"
    tableStyle="min-width: 50rem"
  >
    <Column
      v-for="col of columns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
    ></Column>
    <Column
      field="hasFather"
      header="Has Father"
      dataType="boolean"
      style="min-width: 6rem"
    >
      <template #body="{ data }">
        <i
          class="pi"
          :class="{
            'pi-check-circle text-green-500': data.hasFather,
            'pi-times-circle text-red-400': !data.hasFather,
          }"
        ></i>
      </template>
    </Column>
  </DataTable>
  <Toast />
</template>

<script setup>
import { usePersonsStore } from "../stores/personsStore";

const props = defineProps({
  persons: {
    type: Array,
    required: true,
  },
});

const storepersons = usePersonsStore();
const toast = useToast();
const selectedPerson = ref();

// TODO: la cuestioón es qué hacer con el slug. Tengo una función de chatgpt
// pero si lo paso así luego en la página [placebyid] no puedo acceder al nombre
// con lo que debería meterlo en un store... o pasarlo con un parámetro, pero no
// veo cómo es posible... es posible con query, pero eso es otra cosa...
function probar() {
  // return navigateTo(`/place/${selectedPlace.value}`, {
  //   open: { target: "_blank" },
  // });

  return navigateTo(`/person/${selectedPerson.value}`);
}

const onRowSelect = (event) => {
  toast.add({
    severity: "info",
    summary: "Person",
    detail: event.data.name,
    life: 2000,
  });
  selectedPerson.value = event.data._id;
  storepersons.selectPerson(selectedPerson.value);
  probar();
};

const columns = [
  { field: "name", header: "Name" },
  { field: "gender", header: "Gender" },
  { field: "histBirth", header: "Birth territory" },
  { field: "wasMarried", header: "Was married" },
  //  { field: "hasFather", header: "Has father" },
  { field: "hasMother", header: "Has mother" },
  { field: "birthyear", header: "Birth year" },
  //  { field: "tiposEventos", header: "Eventos" },
];
</script>
