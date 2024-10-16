<template>
  <h1 class="text-center">
    Type of relation: {{ useRoute().params.relationbyid }}
  </h1>
  <div v-if="status === 'pending'">Loading data...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else>
    <section>
      <h2 class="mt-5 text-center uppercase">Aggregated data</h2>
      <div class="grid">
        <div class="col-6">
          <h2>Concrete data</h2>
          <DataTable
            paginator
            stripedRows
            :value="data.relationid"
            :rows="10"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            selectionMode="single"
            dataKey="_id"
            @rowSelect="onRowSelect"
            tableStyle="min-width: 50rem"
          >
            <Column
              v-for="col of columnsRel"
              :key="col.field"
              :field="col.field"
              :header="col.header"
              sortable
            ></Column>
          </DataTable>
        </div>
        <div class="col-6">
          <h2>Positions</h2>
          <DataTable
            paginator
            stripedRows
            :value="data.positions"
            :rows="10"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            dataKey="_id"
            tableStyle="min-width: 50rem"
          >
            <Column
              v-for="col of columnsPositions"
              :key="col.field"
              :field="col.field"
              :header="col.header"
              sortable
            ></Column>
          </DataTable>
        </div>
      </div>
      <!-- Agregados de lugares -->
      <div>
        <div class="grid">
          <div class="col-6">
            <h2>Countries of Origin (aggregated)</h2>
            <TreeTable
              :value="data.infOriginsCountries"
              :paginator="true"
              :rows="10"
              size="small"
              :rowsPerPageOptions="[10, 20, 30, 40]"
            >
              <template #empty> No positions found. </template>
              <Column
                field="place"
                header="Historical birth place"
                sortable
                expander
              ></Column>
              <Column field="count" header="Total" sortable></Column>
              <Column field="percentage" header="%" sortable></Column>
            </TreeTable>
          </div>
          <div class="col-6">
            <h2>Historical Places of Origin (aggregated)</h2>
            <TreeTable
              :value="data.infOriginsHistBirths"
              :paginator="true"
              :rows="10"
              size="small"
              :rowsPerPageOptions="[10, 20, 30, 40]"
            >
              <template #empty> No positions found. </template>
              <Column
                field="place"
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
    </section>
  </div>
  <hr />
  <!-- Detalles  -->
  <!-- we define details as ref({}) and therefore is always present and we have to check if it is void. -->
  <section v-if="Object.keys(details).length > 0" class="details-section">
    <h2 class="mt-5 text-center uppercase">Details about {{ details._id }}</h2>
    <p>Number of informations: {{ details.totalInformations }}</p>
    <div class="grid">
      <div class="col-4">
        <h3>Positions held</h3>
        <DataTable :value="details.positions">
          <Column field="info" header="Position"></Column
        ></DataTable>
      </div>
      <div class="col-4">
        <h3>Titles held</h3>
        <DataTable :value="details.titlesInf">
          <Column field="info" header="Titles"></Column
        ></DataTable>
      </div>
      <div class="col-4">
        <h3>Places</h3>
        <DataTable :value="details.placesInf">
          <Column field="info" header="Place"></Column
        ></DataTable>
      </div>
    </div>
    <SearchMacroTablePersons />
  </section>
  <ScrollTop target="window" :threshold="100" icon="pi pi-arrow-up" />
</template>

<script setup>
const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

const details = ref({});

// necesitamos esto para pasar los datos al componente SearchMacroTablePersons
const personsdetails = ref([]);
// provide tiene que ser usado en setup; no puede usarse en
// la función onrowselect de abajo.
provide("persons", readonly(personsdetails));

// with useLazyFetch the page is loaded while the data is being fetched
// TODO: atención mirar esto del status que parece que no existe ya...
const { data, status, error } = await useFetch(
  `${api}/relations/${useRoute().params.relationbyid}`,
);

// if (data) {
//   console.log(data.value.positions);
// }

const columnsRel = [
  { field: "_id", header: "Person" },
  { field: "infOrigin", header: "Origin" },
  { field: "totalInformations", header: "Informations" },
];
const columnsPositions = [
  { field: "_id", header: "Position" },
  { field: "count", header: "Total" },
];

const onRowSelect = (event) => {
  details.value = event.data;

  details.value.positions = details.value.positions.map((position) => {
    return { info: position };
  });

  details.value.titlesInf = details.value.titlesInf.map((title) => {
    return { info: title };
  });

  details.value.placesInf = details.value.placesInf.map((place) => {
    return { info: place };
  });

  // Desplazar el foco hacia la sección de detalles
  setTimeout(() => {
    const detailsSection = document.querySelector(".details-section");
    if (detailsSection) {
      detailsSection.scrollIntoView({ behavior: "smooth" });
    }
  }, 100);
  console.log(
    "el valor de data es: ",
    JSON.stringify(details.value.personsWithRelation, null, 2),
  );

  personsdetails.value = details.value.personsWithRelation;
};
</script>

<style scoped>
hr {
  border: none;
  height: 20px;
  background-color: #cd4f35; /* Color de la línea */
  margin: 20px 0; /* Espaciado superior e inferior */
}
</style>
