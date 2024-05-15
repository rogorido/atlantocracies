<template>
  <div>
    <h2 class="mt-5 text-center uppercase">Selected Persons</h2>
    <DataTable
      :value="persons"
      ref="dt"
      paginator
      stripedRows
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      selectionMode="single"
      dataKey="_id"
      :selection="selectedPerson"
      @rowSelect="onRowSelect"
      v-model:filters="filters"
      filterDisplay="row"
      tableStyle="min-width: 25rem"
    >
      <template #header>
        <div style="text-align: right">
          <Button
            icon="pi pi-external-link"
            label="Export"
            @click="exportCSV($event)"
          />
        </div>
      </template>

      <Column field="name" header="Name" sortable>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
            placeholder="Search by name"
          />
        </template>
      </Column>
      <Column
        field="birthyear"
        header="Birth Year"
        dataType="numeric"
        style="min-width: 3rem"
        sortable
      />
      <Column
        field="placebirth"
        header="Birth Place"
        dataType="string"
        style="min-width: 6rem"
        sortable
      />
      <Column
        field="datedeath"
        header="Death date"
        dataType="string"
        style="min-width: 6rem"
        sortable
      />
      <Column
        field="placeDeath"
        header="Death Place"
        dataType="string"
        style="min-width: 6rem"
        sortable
      />
      <Column
        field="gender"
        header="Gender"
        dataType="boolean"
        style="min-width: 3rem"
      >
        <template #body="{ data }">
          <i
            class="pi"
            :class="{
              'pi-mars text-green-500': data.gender === 'H',
              'pi-venus text-green-500': data.gender === 'M',
            }"
          ></i>
        </template>
      </Column>
      <Column
        field="wasMarried"
        header="Married"
        dataType="boolean"
        style="min-width: 3rem"
      >
        <template #body="{ data }">
          <i
            class="pi"
            :class="{
              'pi-check-circle text-green-500': data.wasMarried,
              'pi-times-circle text-red-400': !data.wasMarried,
            }"
          ></i>
        </template>
      </Column>
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
      <Column
        field="hizoTestamento"
        header="Made will"
        dataType="boolean"
        style="min-width: 3rem"
      >
        <template #body="{ data }">
          <i
            class="pi"
            :class="{
              'pi-check-circle text-green-500': data.hizoTestamento,
              'pi-times-circle text-red-400': !data.hizoTestamento,
            }"
          ></i>
        </template>
      </Column>
      <Column
        field="numberOfEvents"
        header="# Events"
        dataType="numeric"
        style="min-width: 3rem"
        sortable
      />
      <Column
        field="numberofRelations"
        header="# Relations"
        dataType="numeric"
        style="min-width: 3rem"
        sortable
      />
      <Column
        field="numberofPositions"
        header="# Positions"
        dataType="numeric"
        style="min-width: 3rem"
        sortable
      />
      <Column
        field="numberofTitles"
        header="# Titles"
        dataType="numeric"
        style="min-width: 3rem"
        sortable
      />
    </DataTable>
  </div>
</template>

<script setup>
import { usePersonsStore } from "../stores/personsStore";

import { FilterMatchMode } from "primevue/api";

const dt = ref(); // reference to the datatable to export!

const persons = inject("persons", []);

const selectedPerson = ref();

const storepersons = usePersonsStore();

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
  selectedPerson.value = event.data._id;
  storepersons.selectPerson(selectedPerson.value);
  probar();
};

const columns = [
  // { field: "name", header: "Name" },
  // { field: "gender", header: "Gender" },
  { field: "histBirth", header: "Birth territory" },
  // { field: "wasMarried", header: "Was married" },
  //  { field: "hasFather", header: "Has father" },
  //  { field: "hasMother", header: "Has mother" },
  { field: "birthyear", header: "Birth year" },
  //  { field: "tiposEventos", header: "Eventos" },
];

// I dont really understand how this works...
const filters = ref({
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const exportCSV = () => {
  dt.value.exportCSV();
};
</script>
